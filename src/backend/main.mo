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
import WorkspaceMixin "mixins/workspace-api";
import WsTypes "types/workspace";
import DocumentsMixin "mixins/documents-api";
import ProjectsMixin "mixins/projects-api";





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
  // --- Workspace domain state ---
  let wsTasks = Map.empty<Text, WsTypes.Task>();
  let wsDailyNotes = Map.empty<Text, WsTypes.DailyNote>();
  let wsChannels = Map.empty<Text, WsTypes.Channel>();
  let wsChannelMessages = Map.empty<Text, WsTypes.ChannelMessage>();
  let wsDirectMessages = Map.empty<Text, WsTypes.DirectMessage>();
  let wsSubmissions = Map.empty<Text, WsTypes.WorkSubmission>();
  let wsMeetings = Map.empty<Text, WsTypes.Meeting>();
  let wsMilestones = Map.empty<Text, WsTypes.TimelineMilestone>();
  let wsCounter = { var n : Nat = 0 };
  let notifCounter = { var n : Nat = 0 };

  // V3.5 state: document records, project participations, composite scores
  let documentRecords       = Map.empty<Text, Types.DocumentRecord>();
  let projectParticipations = Map.empty<Text, [Types.ProjectParticipation]>();
  let compositeScores       = Map.empty<Text, Types.CompositePerformanceScore>();
  let docCounter            = { var n : Nat = 0 };
  let projCounter           = { var n : Nat = 0 };

  // Seed default SLA rules on first init
  slaRules.add("leadCaptured", 48);
  slaRules.add("contacted", 72);
  slaRules.add("discoveryCallDone", 96);
  slaRules.add("proposalSent", 168);
  slaRules.add("negotiation", 240);

  // Include all intern domain API
  include InternsMixin(interns, performances, activities, idCounter, sessions, stageHistories, notifications, compositeScores, wsTasks, wsDailyNotes, wsSubmissions, wsMeetings);
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
  // Include workspace domain API
  include WorkspaceMixin(wsTasks, wsDailyNotes, wsChannels, wsChannelMessages, wsDirectMessages, wsSubmissions, wsMeetings, wsMilestones, wsCounter, sessions, notifications, notifCounter);
  // Include documents management API (V3.5)
  include DocumentsMixin(documentRecords, docCounter, sessions);
  // Include project participation API (V3.5)
  include ProjectsMixin(projectParticipations, projCounter, sessions);

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
  // --- Workspace automation timer jobs ---

  // Single heartbeat — Motoko only allows one system func heartbeat.
  // All periodic workspace automation jobs are called from here.
  system func heartbeat() : async () {
    wsJobDeadlineReminder();
    wsJobInactivityAlert();
    wsJobOverdueTask();
    wsJobWeeklySummary();
  };

  // Deadline reminder helper
  func wsJobDeadlineReminder() {
    let now = Time.now();
    let in24hNs : Int = 24 * 3_600 * 1_000_000_000;
    for ((_, task) in wsTasks.entries()) {
      switch (task.deadline) {
        case null {};
        case (?dl) {
          if (task.status != "Completed" and dl > now and dl - now <= in24hNs) {
            automationCounter.n += 1;
            let nid = "notif-dl-" # now.toText() # "-" # automationCounter.n.toText();
            notifications.add(nid, {
              id               = nid;
              userId           = task.assignedInternId;
              notificationType = #taskAssigned;
              title            = "Deadline Reminder";
              message          = "Task \"" # task.title # "\" is due within 24 hours";
              isRead           = false;
              relatedId        = ?task.id;
              createdAt        = now;
              priority         = ?(#high);
            });
          };
        };
      };
    };
  };

  // Inactivity alert helper
  func wsJobInactivityAlert() {
    let now = Time.now();
    let threeDaysNs : Int = 3 * 24 * 3_600 * 1_000_000_000;
    let internsSeen = Map.empty<Text, Bool>();
    for ((_, note) in wsDailyNotes.entries()) {
      if (now - note.createdAt < threeDaysNs) {
        internsSeen.add(note.internId, true);
      };
    };
    let taskedInterns = Map.empty<Text, Bool>();
    for ((_, task) in wsTasks.entries()) {
      if (task.assignedInternId != "") {
        taskedInterns.add(task.assignedInternId, true);
      };
    };
    for ((iid, _) in taskedInterns.entries()) {
      if (internsSeen.get(iid) == null) {
        automationCounter.n += 1;
        let nid = "notif-ia-" # now.toText() # "-" # automationCounter.n.toText();
        notifications.add(nid, {
          id               = nid;
          userId           = "Venkat";
          notificationType = #overdueFollowUp;
          title            = "Intern Inactivity Alert";
          message          = "Intern " # iid # " has not submitted a daily note in 3+ days";
          isRead           = false;
          relatedId        = ?iid;
          createdAt        = now;
          priority         = ?(#medium);
        });
      };
    };
  };

  // Overdue task escalation helper
  func wsJobOverdueTask() {
    let now = Time.now();
    for ((tid, task) in wsTasks.entries()) {
      switch (task.deadline) {
        case null {};
        case (?dl) {
          if (
            dl < now and
            (task.status == "Pending" or task.status == "In Progress")
          ) {
            if (task.priority != "High" and task.priority != "Critical") {
              let escalated : WsTypes.Task = { task with priority = "High"; updatedAt = now };
              wsTasks.add(tid, escalated);
            };
            automationCounter.n += 1;
            let nid = "notif-ot-" # now.toText() # "-" # automationCounter.n.toText();
            notifications.add(nid, {
              id               = nid;
              userId           = "Venkat";
              notificationType = #taskOverdue;
              title            = "Overdue Task Escalated";
              message          = "Task \"" # task.title # "\" (" # task.assignedInternId # ") is past its deadline";
              isRead           = false;
              relatedId        = ?tid;
              createdAt        = now;
              priority         = ?(#high);
            });
          };
        };
      };
    };
  };

  // Weekly summary helper
  func wsJobWeeklySummary() {
    let now = Time.now();
    let oneWeekNs : Int = 7 * 24 * 3_600 * 1_000_000_000;
    let internStats = Map.empty<Text, { var completed : Nat; var total : Nat; var notes : Nat; var subs : Nat }>();
    for ((_, task) in wsTasks.entries()) {
      if (task.assignedInternId != "") {
        let stats = switch (internStats.get(task.assignedInternId)) {
          case (?s) s;
          case null {
            let s = { var completed = 0; var total = 0; var notes = 0; var subs = 0 };
            internStats.add(task.assignedInternId, s);
            s;
          };
        };
        stats.total += 1;
        if (task.status == "Completed") stats.completed += 1;
      };
    };
    for ((_, note) in wsDailyNotes.entries()) {
      if (now - note.createdAt <= oneWeekNs) {
        switch (internStats.get(note.internId)) {
          case (?s) s.notes += 1;
          case null {
            let s = { var completed = 0; var total = 0; var notes = 1; var subs = 0 };
            internStats.add(note.internId, s);
          };
        };
      };
    };
    for ((_, sub) in wsSubmissions.entries()) {
      if (now - sub.createdAt <= oneWeekNs) {
        switch (internStats.get(sub.internId)) {
          case (?s) s.subs += 1;
          case null {
            let s = { var completed = 0; var total = 0; var notes = 0; var subs = 1 };
            internStats.add(sub.internId, s);
          };
        };
      };
    };
    for ((iid, stats) in internStats.entries()) {
      let rate = if (stats.total == 0) "N/A" else stats.completed.toText() # "/" # stats.total.toText();
      automationCounter.n += 1;
      let nid = "notif-wsum-" # now.toText() # "-" # automationCounter.n.toText();
      notifications.add(nid, {
        id               = nid;
        userId           = "Venkat";
        notificationType = #announcement;
        title            = "Weekly Summary: " # iid;
        message          = "Tasks: " # rate # " | Notes: " # stats.notes.toText() # " | Submissions: " # stats.subs.toText();
        isRead           = false;
        relatedId        = ?iid;
        createdAt        = now;
        priority         = ?(#low);
      });
    };
  };
};


