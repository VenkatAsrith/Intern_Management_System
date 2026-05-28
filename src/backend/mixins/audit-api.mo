import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Auth "../lib/auth";
import RbacTypes "../types/rbac";
import Perm "../lib/permissions";

mixin (
  sessions        : Map.Map<Text, Auth.SessionInfo>,
  auditEvents     : List.List<RbacTypes.AuditEvent>,
  approvalRequests : Map.Map<Text, RbacTypes.ApprovalRequest>,
  approvalCounter : { var n : Nat },
) {

  // ---- internal helpers -----------------------------------------------

  func nextApprovalId() : Text {
    approvalCounter.n += 1;
    "apr-" # Time.now().toText() # "-" # approvalCounter.n.toText()
  };

  // ---- public API — Audit log -----------------------------------------

  public query func getAuditLog(
    sessionToken : Text,
    limit        : Nat,
    offset       : Nat,
  ) : async { #ok : [RbacTypes.AuditEvent]; #err : Text } {
    switch (Auth.requirePermission(sessions, sessionToken, Perm.ADMIN_AUDIT)) {
      case (#err e) { #err e };
      case (#ok _) {
        let all = auditEvents.toArray();
        let total = all.size();
        let start = if (offset > total) total else offset;
        let end_ = if (start + limit > total) total else start + limit;
        var result = List.empty<RbacTypes.AuditEvent>();
        var i = start;
        while (i < end_) {
          result.add(all[i]);
          i += 1;
        };
        #ok(result.toArray())
      };
    }
  };

  // ---- public API — Approval requests ---------------------------------

  public func createApprovalRequest(
    sessionToken  : Text,
    actionType    : Text,
    resourceType  : Text,
    resourceId    : Text,
    payload       : Text,
  ) : async { #ok : RbacTypes.ApprovalRequest; #err : Text } {
    switch (sessions.get(sessionToken)) {
      case null { #err "Unauthorized: invalid session" };
      case (?info) {
        let id  = nextApprovalId();
        let now = Time.now();
        let req : RbacTypes.ApprovalRequest = {
          id;
          requesterId   = info.username;
          requesterRole = switch (info.role) { case (?r) r; case null "viewer" };
          actionType;
          resourceType;
          resourceId;
          requestPayload = payload;
          status        = #pending;
          approverId    = null;
          createdAt     = now;
          resolvedAt    = null;
          notes         = null;
        };
        approvalRequests.add(id, req);
        #ok req
      };
    }
  };

  public func approveRequest(
    sessionToken : Text,
    requestId    : Text,
    notes        : ?Text,
  ) : async { #ok : RbacTypes.ApprovalRequest; #err : Text } {
    switch (Auth.requirePermission(sessions, sessionToken, Perm.ADMIN_APPROVALS)) {
      case (#err e) { #err e };
      case (#ok approver) {
        switch (approvalRequests.get(requestId)) {
          case null { #err("Approval request not found") };
          case (?req) {
            let alreadyResolved = switch (req.status) { case (#pending) false; case _ true };
            if (alreadyResolved) return #err("Request is already resolved");
            let updated : RbacTypes.ApprovalRequest = {
              req with
              status     = #approved;
              approverId = ?approver;
              resolvedAt = ?Time.now();
              notes;
            };
            approvalRequests.add(requestId, updated);
            #ok updated
          };
        }
      };
    }
  };

  public func rejectRequest(
    sessionToken : Text,
    requestId    : Text,
    notes        : ?Text,
  ) : async { #ok : RbacTypes.ApprovalRequest; #err : Text } {
    switch (Auth.requirePermission(sessions, sessionToken, Perm.ADMIN_APPROVALS)) {
      case (#err e) { #err e };
      case (#ok approver) {
        switch (approvalRequests.get(requestId)) {
          case null { #err("Approval request not found") };
          case (?req) {
            let alreadyResolved = switch (req.status) { case (#pending) false; case _ true };
            if (alreadyResolved) return #err("Request is already resolved");
            let updated : RbacTypes.ApprovalRequest = {
              req with
              status     = #rejected;
              approverId = ?approver;
              resolvedAt = ?Time.now();
              notes;
            };
            approvalRequests.add(requestId, updated);
            #ok updated
          };
        }
      };
    }
  };

  public query func listApprovalRequests(
    sessionToken  : Text,
    statusFilter  : ?Text,
  ) : async { #ok : [RbacTypes.ApprovalRequest]; #err : Text } {
    switch (Auth.requirePermission(sessions, sessionToken, Perm.ADMIN_APPROVALS)) {
      case (#err e) { #err e };
      case (#ok _) {
        let all = approvalRequests.values().toArray();
        let filtered = switch statusFilter {
          case null all;
          case (?sf) all.filter(func(r) {
            let sText = switch (r.status) {
              case (#pending)  "pending";
              case (#approved) "approved";
              case (#rejected) "rejected";
            };
            sText == sf
          });
        };
        #ok filtered
      };
    }
  };

};
