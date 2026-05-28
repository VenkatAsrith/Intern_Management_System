import Types "../types/clients";
import NotifTypes "../types/notifications";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";

mixin (
  clients : Map.Map<Text, Types.Client>,
  clientActivities : List.List<Types.ClientActivity>,
  notifications : Map.Map<Text, NotifTypes.Notification>,
  invoices : Map.Map<Text, Types.Invoice>,
  slaRules : Map.Map<Text, Nat>,
  workflowExecutions : List.List<Types.WorkflowExecution>,
  automationCounter : { var n : Nat },
) {

  // ─── Helpers ────────────────────────────────────────────────────────────────

  func nextAutoId() : Text {
    automationCounter.n += 1;
    "auto-" # Time.now().toText() # "-" # automationCounter.n.toText()
  };

  func isTerminalStatus(s : Types.ClientStatus) : Bool {
    switch s {
      case (#closedWon or #closedLost or #onHold) true;
      case (_) false;
    }
  };

  func stageKey(s : Types.ClientStatus) : Text {
    switch s {
      case (#leadCaptured)      "leadCaptured";
      case (#contacted)         "contacted";
      case (#discoveryCallDone) "discoveryCallDone";
      case (#proposalSent)      "proposalSent";
      case (#negotiation)       "negotiation";
      case (#closedWon)         "closedWon";
      case (#closedLost)        "closedLost";
      case (#onHold)            "onHold";
    }
  };

  func addNotification(
    userId : Text,
    ntype : NotifTypes.NotificationType,
    title : Text,
    message : Text,
    relatedId : ?Text,
    priority : NotifTypes.NotificationPriority,
  ) {
    let id = nextAutoId();
    let notif : NotifTypes.Notification = {
      id;
      userId;
      notificationType = ntype;
      title;
      message;
      isRead = false;
      relatedId;
      createdAt = Time.now();
      priority = ?priority;
    };
    notifications.add(id, notif);
  };

  func addAutoClientActivity(
    clientId : Text,
    description : Text,
  ) {
    let act : Types.ClientActivity = {
      id = nextAutoId();
      clientId;
      activityType = #noteAdded;
      description;
      timestamp = Time.now();
      adminName = "System";
      metadata = null;
    };
    clientActivities.add(act);
  };

  func recordExecution(
    ruleName : Text,
    status : { #success; #failed; #running },
    recordsProcessed : Nat,
    errorMessage : ?Text,
  ) {
    let exec : Types.WorkflowExecution = {
      id = nextAutoId();
      ruleName;
      triggeredAt = Time.now();
      status;
      recordsProcessed;
      errorMessage;
    };
    workflowExecutions.add(exec);
  };

  // ─── Job 1: Overdue Follow-Up ────────────────────────────────────────────────

  func runOverdueFollowUpJob() {
    let now = Time.now();
    let twoDaysNs : Int = 2 * 24 * 60 * 60 * 1_000_000_000;
    var processed : Nat = 0;
    for ((id, client) in clients.entries()) {
      if (not isTerminalStatus(client.currentStatus)) {
        let isOverdue : Bool = switch (client.followUpDate) {
          case (?fd) fd < now;
          case null false;
        };
        let isInactive : Bool = switch (client.lastActivity) {
          case (?la) (now - la) > twoDaysNs;
          case null true;
        };
        if (isOverdue and isInactive) {
          // Escalate priority if not already high/urgent
          let newPriority : Types.PriorityLevel = switch (client.priorityLevel) {
            case (#low or #medium) #high;
            case (p) p;
          };
          let updated : Types.Client = {
            client with
            priorityLevel = newPriority;
            updatedAt = now;
          };
          clients.add(id, updated);
          addAutoClientActivity(id, "Follow-up overdue — auto-escalated");
          addNotification(
            client.assignedTeamMember,
            #overdueFollowUp,
            "Follow-up Overdue",
            "Follow-up for " # client.companyName # " is overdue and has been escalated.",
            ?id,
            #high,
          );
          processed += 1;
        };
      };
    };
    recordExecution("overdueFollowUp", #success, processed, null);
  };

  // ─── Job 2: Proposal Expiry ──────────────────────────────────────────────────

  func runProposalExpiryJob() {
    let now = Time.now();
    let threeDaysNs : Int = 3 * 24 * 60 * 60 * 1_000_000_000;
    var processed : Nat = 0;
    for ((_, client) in clients.entries()) {
      switch (client.proposalExpiry) {
        case (?expiry) {
          let timeToExpiry : Int = expiry - now;
          let proposalActive : Bool = switch (client.proposalStatus) {
            case (?s) s != "accepted" and s != "rejected";
            case null false;
          };
          if (proposalActive and timeToExpiry >= 0 and timeToExpiry <= threeDaysNs) {
            addNotification(
              client.assignedTeamMember,
              #proposalExpiring,
              "Proposal Expiring Soon",
              "Proposal for " # client.companyName # " expires within 3 days.",
              ?client.id,
              #high,
            );
            processed += 1;
          };
        };
        case null {};
      };
    };
    // Also check invoices with proposals
    for ((_, inv) in invoices.entries()) {
      switch (inv.dueDate) {
        case (?dd) {
          let timeLeft : Int = dd - now;
          if (
            (inv.status == #sent or inv.status == #viewed) and
            timeLeft >= 0 and
            timeLeft <= threeDaysNs
          ) {
            // find client for this invoice to notify owner
            switch (clients.get(inv.clientId)) {
              case (?c) {
                addNotification(
                  c.assignedTeamMember,
                  #proposalExpiring,
                  "Invoice Due Soon",
                  "Invoice " # inv.invoiceNumber # " for " # c.companyName # " is due within 3 days.",
                  ?inv.id,
                  #high,
                );
                processed += 1;
              };
              case null {};
            };
          };
        };
        case null {};
      };
    };
    recordExecution("proposalExpiry", #success, processed, null);
  };

  // ─── Job 3: Inactive Lead (Stale Deal) ───────────────────────────────────────

  func runInactiveLeadJob() {
    let now = Time.now();
    let fourteenDaysNs : Int = 14 * 24 * 60 * 60 * 1_000_000_000;
    var processed : Nat = 0;
    for ((id, client) in clients.entries()) {
      let isStale = switch (client.isStale) { case (?v) v; case null false };
      if (not isTerminalStatus(client.currentStatus) and not isStale) {
        let lastAct : Int = switch (client.lastActivity) {
          case (?la) la;
          case null client.createdAt;
        };
        if ((now - lastAct) > fourteenDaysNs) {
          let updated : Types.Client = {
            client with
            isStale = ?true;
            updatedAt = now;
          };
          clients.add(id, updated);
          addAutoClientActivity(id, "Lead marked stale — no activity in 14 days");
          addNotification(
            client.assignedTeamMember,
            #staleDeal,
            "Deal Gone Stale",
            client.companyName # " has had no activity in 14+ days.",
            ?id,
            #medium,
          );
          processed += 1;
        };
      };
    };
    recordExecution("inactiveLead", #success, processed, null);
  };

  // ─── Job 4: Invoice Overdue ───────────────────────────────────────────────────

  func runInvoiceOverdueJob() {
    let now = Time.now();
    var processed : Nat = 0;
    for ((id, inv) in invoices.entries()) {
      let isOverdueStatus : Bool = switch (inv.status) {
        case (#paid or #draft) false;
        case (_) true;
      };
      if (isOverdueStatus) {
        switch (inv.dueDate) {
          case (?dd) {
            if (dd < now and inv.status != #overdue) {
              let updated : Types.Invoice = { inv with status = #overdue };
              invoices.add(id, updated);
              // Notify the client's owner
              switch (clients.get(inv.clientId)) {
                case (?c) {
                  addNotification(
                    c.assignedTeamMember,
                    #invoiceOverdue,
                    "Invoice Overdue",
                    "Invoice " # inv.invoiceNumber # " for " # c.companyName # " is now overdue.",
                    ?id,
                    #high,
                  );
                };
                case null {};
              };
              processed += 1;
            };
          };
          case null {};
        };
      };
    };
    recordExecution("invoiceOverdue", #success, processed, null);
  };

  // ─── Job 5: SLA Breach ────────────────────────────────────────────────────────

  func runSLABreachJob() {
    let now = Time.now();
    var processed : Nat = 0;
    for ((id, client) in clients.entries()) {
      let slaStatus = switch (client.slaStatus) { case (?v) v; case null #notBreached };
      if (not isTerminalStatus(client.currentStatus) and slaStatus == #notBreached) {
        let key = stageKey(client.currentStatus);
        switch (slaRules.get(key)) {
          case (?maxHours) {
            let slaNs : Int = maxHours * 60 * 60 * 1_000_000_000;
            let stageEnteredAt : Int = switch (client.stageEnteredAt) { case (?v) v; case null client.createdAt };
            if ((now - stageEnteredAt) > slaNs) {
              let updated : Types.Client = {
                client with
                slaStatus = ?#breached;
                slaBreachedAt = ?now;
                updatedAt = now;
              };
              clients.add(id, updated);
              addNotification(
                client.assignedTeamMember,
                #dealSLABreached,
                "Deal SLA Breached",
                client.companyName # " has exceeded the SLA for stage '" # key # "'.",
                ?id,
                #critical,
              );
              processed += 1;
            };
          };
          case null {};
        };
      };
    };
    recordExecution("slaBreachCheck", #success, processed, null);
  };

  // ─── Exposed job runners (called from main.mo via runAutomationJobs) ──────────

  public func runAllAutomationJobs() : () {
    runOverdueFollowUpJob();
    runSLABreachJob();
    runProposalExpiryJob();
    runInactiveLeadJob();
    runInvoiceOverdueJob();
  };

  // ─── Public API ───────────────────────────────────────────────────────────────

  public query func listWorkflowExecutions(ruleName : ?Text, limit : Nat) : async [Types.WorkflowExecution] {
    let all = workflowExecutions.toArray();
    let filtered : [Types.WorkflowExecution] = switch ruleName {
      case (?rn) all.filter(func(e : Types.WorkflowExecution) : Bool { e.ruleName == rn });
      case null all;
    };
    // Return the last `limit` entries (most recent)
    let total = filtered.size();
    if (limit == 0 or total <= limit) {
      filtered
    } else {
      let start : Nat = total - limit;
      Array.tabulate<Types.WorkflowExecution>(limit, func i = filtered[start + i])
    }
  };

  public query func getSLARules() : async [(Text, Nat)] {
    slaRules.entries().toArray()
  };

  public func setSLARule(stageName : Text, maxHours : Nat) : async { #ok : (); #err : Text } {
    slaRules.add(stageName, maxHours);
    #ok ()
  };

};
