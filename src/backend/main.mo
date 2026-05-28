import List "mo:core/List";
import Map "mo:core/Map";
import InternsMixin "mixins/interns-api";
import Auth "lib/auth";
import Types "types/interns";
import InternLib "lib/interns";
import ClientsMixin "mixins/clients-api";
import ClientTypes "types/clients";
import NotificationsMixin "mixins/notifications-api";
import NotifTypes "types/notifications";
import AutomationMixin "mixins/automation-api";
import Time "mo:core/Time";
import RbacApi "mixins/rbac-api";
import AuditApi "mixins/audit-api";
import RbacTypes "types/rbac";
import Migration "migration";



(with migration = Migration.run)
actor {

  // --- Stable state ---
  let interns = Map.empty<Text, Types.Intern>();
  let performances = Map.empty<Text, Types.Performance>();
  let activities = List.empty<Types.Activity>();
  let idCounter = { var n : Nat = 0 };
  let sessions = Map.empty<Text, Auth.SessionInfo>();

  // Lazy init flag: seed sample data once on first run
  var seeded : Bool = false;

  // Stable state for clients domain
  let clients = Map.empty<Text, ClientTypes.Client>();
  let clientActivities = List.empty<ClientTypes.ClientActivity>();
  let clientComments = Map.empty<Text, ClientTypes.ClientComment>();
  let invoices = Map.empty<Text, ClientTypes.Invoice>();
  let clientIdCounter = { var n : Nat = 0 };
  let invoiceCounter = { var n : Nat = 0 };

  // Tasks domain state
  // (removed — tasks module retired)

  // Attendance domain state
  // (removed — attendance module retired)

  // LMS domain state
  // (removed — LMS module retired)

  // --- RBAC / Users ---
  let users = Map.empty<Text, RbacTypes.UserAccount>();
  let userIdCounter = { var n : Nat = 0 };

  // --- Audit log (append-only) ---
  let auditEvents = List.empty<RbacTypes.AuditEvent>();
  let auditIdCounter = { var n : Nat = 0 };

  // --- Approval requests ---
  let approvalRequests = Map.empty<Text, RbacTypes.ApprovalRequest>();
  let approvalCounter = { var n : Nat = 0 };

  // Notifications domain state
  let notifications = Map.empty<Text, NotifTypes.Notification>();
  let announcements = Map.empty<Text, NotifTypes.Announcement>();
  let notificationPreferences = Map.empty<Text, NotifTypes.NotificationPreference>();

  // Dashboard snapshot state (mutable ref shared with ClientsMixin)
  let dashboardSnapshotState = { var snap : ?ClientTypes.DashboardSnapshot = null };

  // Intern pipeline stage history
  let stageHistories = Map.empty<Text, Types.InternPipelineStageHistory>();

  // Automation engine state
  let workflowExecutions = List.empty<ClientTypes.WorkflowExecution>();
  let slaRules = Map.empty<Text, Nat>();
  let automationCounter = { var n : Nat = 0 };

  // Seed default SLA rules on first init
  slaRules.add("leadCaptured", 48);
  slaRules.add("contacted", 72);
  slaRules.add("discoveryCallDone", 96);
  slaRules.add("proposalSent", 168);
  slaRules.add("negotiation", 240);

  // Include all intern domain API
  include InternsMixin(interns, performances, activities, idCounter, sessions, stageHistories, notifications);
  // Include all client domain API
  include ClientsMixin(clients, clientActivities, clientComments, invoices, clientIdCounter, invoiceCounter, sessions, dashboardSnapshotState);
  // Include all notifications domain API
  include NotificationsMixin(notifications, announcements, sessions, notificationPreferences);
  // Include automation engine
  include AutomationMixin(clients, clientActivities, notifications, invoices, slaRules, workflowExecutions, automationCounter);
  // Include RBAC user management API
  include RbacApi(sessions, users, userIdCounter);
  // Include audit + approval API
  include AuditApi(sessions, auditEvents, approvalRequests, approvalCounter);

  // --- Auth endpoints ---

  public func login(username : Text, password : Text) : async {
    #ok : { sessionToken : Text; displayName : Text; role : Text; permissions : [Text] };
    #err : Text
  } {
    Auth.login(sessions, users, username, password)
  };

  public func logout(sessionToken : Text) : async () {
    Auth.logout(sessions, sessionToken);
  };

  public query func validateSession(sessionToken : Text) : async {
    #ok : { username : Text; displayName : Text; role : Text; permissions : [Text] };
    #err : Text
  } {
    Auth.validateSession(sessions, sessionToken)
  };

  // Seed sample data on first use (idempotent guard, no auth needed)
  public func initSampleData() : async Nat {
    if (seeded) return 0;
    seeded := true;
    InternLib.seedSampleData(interns, performances, activities, idCounter)
  };

  // --- Private audit helper ---
  func appendAuditEvent(
    actorId      : Text,
    actorRole    : Text,
    action       : Text,
    resourceType : Text,
    resourceId   : Text,
    beforeState  : ?Text,
    afterState   : ?Text,
  ) {
    auditIdCounter.n += 1;
    let ev : RbacTypes.AuditEvent = {
      id           = "audit-" # Time.now().toText() # "-" # auditIdCounter.n.toText();
      timestamp    = Time.now();
      actorId;
      actorRole;
      action;
      resourceType;
      resourceId;
      beforeState;
      afterState;
      ipAddress    = null;
    };
    auditEvents.add(ev);
  };

  func sessionRoleText(sessionToken : Text) : Text {
    switch (Auth.getSessionRole(sessions, sessionToken)) {
      case null "unknown";
      case (?r) Auth.roleToText(r);
    }
  };

  func isAdminRole(sessionToken : Text) : Bool {
    switch (Auth.getSessionRole(sessions, sessionToken)) {
      case (?(#superAdmin)) true;
      case (?(#admin))      true;
      case _                false;
    }
  };

  // --- Admin-triggered automation jobs runner ---
  public func runAutomationJobs(sessionToken : Text) : async () {
    ignore Auth.requireSession(sessions, sessionToken);
    runAllAutomationJobs();
  };

  // --- Intern delete with audit + approval gate ---
  public func deleteInternWithAudit(
    sessionToken : Text,
    id           : Text,
  ) : async { #ok : { deleted : Bool; approvalId : ?Text }; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let roleText = sessionRoleText(sessionToken);
    switch (interns.get(id)) {
      case null { #err("Intern not found") };
      case (?intern) {
        let beforeSnap = "{ id: " # intern.id # ", name: " # intern.name # " }";
        if (isAdminRole(sessionToken)) {
          let ok = InternLib.deleteIntern(interns, performances, activities, idCounter, id, username);
          if (ok) {
            appendAuditEvent(username, roleText, "DELETE", "intern", id, ?beforeSnap, null);
            #ok({ deleted = true; approvalId = null })
          } else {
            #err("Delete failed")
          }
        } else {
          let payload = "delete intern id=" # id # " name=" # intern.name;
          approvalCounter.n += 1;
          let aprId = "apr-" # Time.now().toText() # "-" # approvalCounter.n.toText();
          let req : RbacTypes.ApprovalRequest = {
            id           = aprId;
            requesterId  = username;
            requesterRole = roleText;
            actionType   = "DELETE";
            resourceType = "intern";
            resourceId   = id;
            requestPayload = payload;
            status       = #pending;
            approverId   = null;
            createdAt    = Time.now();
            resolvedAt   = null;
            notes        = null;
          };
          approvalRequests.add(aprId, req);
          appendAuditEvent(username, roleText, "DELETE_REQUESTED", "intern", id, ?beforeSnap, null);
          #ok({ deleted = false; approvalId = ?aprId })
        }
      };
    }
  };

  // --- Client delete with audit + approval gate ---
  public func deleteClientWithAudit(
    sessionToken : Text,
    id           : Text,
  ) : async { #ok : { deleted : Bool; approvalId : ?Text }; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let roleText = sessionRoleText(sessionToken);
    switch (clients.get(id)) {
      case null { #err("Client not found") };
      case (?client) {
        let beforeSnap = "{ id: " # client.id # ", company: " # client.companyName # " }";
        if (isAdminRole(sessionToken)) {
          clients.remove(id);
          appendAuditEvent(username, roleText, "DELETE", "client", id, ?beforeSnap, null);
          #ok({ deleted = true; approvalId = null })
        } else {
          let payload = "delete client id=" # id # " company=" # client.companyName;
          approvalCounter.n += 1;
          let aprId = "apr-" # Time.now().toText() # "-" # approvalCounter.n.toText();
          let req : RbacTypes.ApprovalRequest = {
            id           = aprId;
            requesterId  = username;
            requesterRole = roleText;
            actionType   = "DELETE";
            resourceType = "client";
            resourceId   = id;
            requestPayload = payload;
            status       = #pending;
            approverId   = null;
            createdAt    = Time.now();
            resolvedAt   = null;
            notes        = null;
          };
          approvalRequests.add(aprId, req);
          appendAuditEvent(username, roleText, "DELETE_REQUESTED", "client", id, ?beforeSnap, null);
          #ok({ deleted = false; approvalId = ?aprId })
        }
      };
    }
  };

  // --- Audited intern create/update ---
  public func createInternAudited(
    sessionToken : Text,
    payload      : Types.CreateInternPayload,
  ) : async { #ok : Types.Intern; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let roleText = sessionRoleText(sessionToken);
    let intern = InternLib.createIntern(interns, activities, idCounter, payload, username);
    appendAuditEvent(username, roleText, "CREATE", "intern", intern.id, null, ?("{ id: " # intern.id # ", name: " # intern.name # " }"));
    #ok intern
  };

  public func updateInternAudited(
    sessionToken : Text,
    id           : Text,
    payload      : Types.UpdateInternPayload,
  ) : async { #ok : Types.Intern; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let roleText = sessionRoleText(sessionToken);
    let beforeSnap = switch (interns.get(id)) {
      case null null;
      case (?i) ?("{ id: " # i.id # ", name: " # i.name # " }");
    };
    switch (InternLib.updateIntern(interns, activities, idCounter, id, payload, username)) {
      case null { #err("Intern not found") };
      case (?intern) {
        appendAuditEvent(username, roleText, "UPDATE", "intern", id, beforeSnap, ?("{ id: " # intern.id # ", name: " # intern.name # " }"));
        #ok intern
      };
    }
  };
};


