import Types "../types/clients";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

mixin (
  clients : Map.Map<Text, Types.Client>,
  clientActivities : List.List<Types.ClientActivity>,
  clientComments : Map.Map<Text, Types.ClientComment>,
  invoices : Map.Map<Text, Types.Invoice>,
  clientIdCounter : { var n : Nat },
  invoiceCounter : { var n : Nat },
) {

  // --- Internal helpers ---

  func nextId() : Text {
    clientIdCounter.n += 1;
    Time.now().toText() # "-" # clientIdCounter.n.toText()
  };

  func nextInvoiceNumber() : Text {
    invoiceCounter.n += 1;
    let num = invoiceCounter.n;
    let padded = if (num < 10) "000" # num.toText()
                 else if (num < 100) "00" # num.toText()
                 else if (num < 1000) "0" # num.toText()
                 else num.toText();
    "INV-" # padded
  };

  func getMonthLabel(ts : Int) : Text {
    // ts is nanoseconds; convert to seconds
    let secs = ts / 1_000_000_000;
    let days = secs / 86400;
    // Days since epoch (1970-01-01). Approximate month/year.
    let year = 1970 + (days / 365);
    let dayOfYear = days % 365;
    let month = dayOfYear / 30 + 1;
    let mStr = if (month < 10) "0" # month.toText() else month.toText();
    year.toText() # "-" # mStr
  };

  func isActiveStatus(s : Types.ClientStatus) : Bool {
    switch s {
      case (#leadCaptured or #contacted or #discoveryCallDone or #proposalSent or #negotiation) true;
      case (_) false;
    }
  };

  func purgeActivitiesForClient(clientId : Text) {
    let kept = clientActivities.filter(func(a) = a.clientId != clientId);
    clientActivities.clear();
    for (a in kept.values()) { clientActivities.add(a) };
  };

  // --- CRM scoring helpers (stubs — implement in develop) ---

  func calcLeadScore(client : Types.Client) : Nat {
    // dealValue score 0-30
    let dvScore : Nat = if (client.dealValue < 10_000.0) 5
                        else if (client.dealValue < 50_000.0) 15
                        else if (client.dealValue < 100_000.0) 20
                        else if (client.dealValue < 500_000.0) 25
                        else 30;

    // engagement recency score 0-25 (days since lastActivity)
    let engScore : Nat = switch (client.lastActivity) {
      case null 0;
      case (?la) {
        let now = Time.now();
        let diffNs : Int = now - la;
        let daysDiff : Int = diffNs / 86_400_000_000_000;
        if (daysDiff <= 0) 25
        else if (daysDiff < 7) 20
        else if (daysDiff < 30) 15
        else if (daysDiff < 90) 10
        else 5
      };
    };

    // follow-up recency score 0-25
    let fuScore : Nat = switch (client.followUpDate) {
      case null 10;
      case (?fu) {
        let now = Time.now();
        let diffNs : Int = fu - now;
        let daysDiff : Int = diffNs / 86_400_000_000_000;
        if (daysDiff < 0) 0        // overdue
        else if (daysDiff == 0) 25 // today
        else if (daysDiff < 7) 20
        else if (daysDiff < 30) 15
        else 10
      };
    };

    // priority score 0-20
    let prScore : Nat = switch (client.priorityLevel) {
      case (#urgent) 20;
      case (#high)   15;
      case (#medium) 10;
      case (#low)     5;
    };

    dvScore + engScore + fuScore + prScore
  };

  func calcHealthScore(client : Types.Client) : Nat {
    let now = Time.now();
    // Months since creation (at least 1 to avoid division by zero)
    let ageNs : Int = now - client.createdAt;
    let monthsAge : Nat = Int.abs(ageNs) / 2_592_000_000_000_000;
    let months : Nat = if (monthsAge < 1) 1 else monthsAge;

    // Activity rate per month (capped at ~5 for scoring)
    let rate : Nat = client.activityCount / months;
    let activityScore : Nat = if (rate >= 5) 40
                               else if (rate >= 3) 30
                               else if (rate >= 1) 20
                               else 5;

    // Stage progression score
    let stageScore : Nat = switch (client.currentStatus) {
      case (#leadCaptured)      10;
      case (#contacted)         20;
      case (#discoveryCallDone) 30;
      case (#proposalSent)      40;
      case (#negotiation)       50;
      case (#closedWon)         60;
      case (#closedLost)         0;
      case (#onHold)            15;
    };

    // Recency bonus (last activity within 7 days)
    let recencyBonus : Nat = switch (client.lastActivity) {
      case null 0;
      case (?la) {
        let diffNs : Int = now - la;
        let days : Int = diffNs / 86_400_000_000_000;
        if (days <= 7) 20 else if (days <= 30) 10 else 0
      };
    };

    let raw = activityScore + stageScore + recencyBonus;
    if (raw > 100) 100 else raw
  };

  // --- Client CRUD ---

  func calcDealProbability(status : Types.ClientStatus) : Nat {
    switch status {
      case (#leadCaptured)      10;
      case (#contacted)         25;
      case (#discoveryCallDone) 40;
      case (#proposalSent)      55;
      case (#negotiation)       70;
      case (#closedWon)        100;
      case (#closedLost)          0;
      case (#onHold)            30;
    }
  };

  public func createClient(req : Types.CreateClientRequest) : async { #ok : Types.Client; #err : Text } {
    let id = nextId();
    let now = Time.now();
    // Build a partial client with zeroed scores so we can compute them
    let partial : Types.Client = {
      id;
      companyName = req.companyName;
      contactPersonName = req.contactPersonName;
      designation = req.designation;
      email = req.email;
      phone = req.phone;
      whatsappNumber = req.whatsappNumber;
      website = req.website;
      industryType = req.industryType;
      companySize = req.companySize;
      location = req.location;
      gstNumber = req.gstNumber;
      serviceInterested = req.serviceInterested;
      dealValue = req.dealValue;
      leadSource = req.leadSource;
      priorityLevel = req.priorityLevel;
      assignedTeamMember = req.assignedTeamMember;
      followUpDate = req.followUpDate;
      nextMeetingDate = req.nextMeetingDate;
      currentStatus = #leadCaptured;
      statusHistory = [];
      closedReason = null;
      lastActivityDate = null;
      pipelineValue = null;
      contacts = [];
      leadScore = 0;
      dealProbability = calcDealProbability(#leadCaptured);
      healthScore = 0;
      engagementScore = 0;
      tags = req.tags;
      source = req.source;
      customFields = [];
      lastActivity = null;
      activityCount = 0;
      proposalStatus = null;
      proposalExpiry = null;
      proposalVersion = 0;
      wonLostReason = null;
      closedAt = null;
      createdAt = now;
      updatedAt = now;
      createdBy = "Admin";
    };
    let client : Types.Client = {
      partial with
      leadScore = calcLeadScore(partial);
      healthScore = calcHealthScore(partial);
    };
    clients.add(id, client);
    #ok client
  };

  public query func getClient(id : Text) : async { #ok : Types.Client; #err : Text } {
    switch (clients.get(id)) {
      case (?c) #ok c;
      case null #err "Client not found";
    }
  };

  public query func listClients() : async [Types.Client] {
    clients.values().toArray()
  };

  public func updateClient(id : Text, req : Types.UpdateClientRequest) : async { #ok : Types.Client; #err : Text } {
    switch (clients.get(id)) {
      case null #err "Client not found";
      case (?existing) {
        let patched : Types.Client = {
          existing with
          companyName        = switch (req.companyName)        { case (?v) v; case null existing.companyName };
          contactPersonName  = switch (req.contactPersonName)  { case (?v) v; case null existing.contactPersonName };
          designation        = switch (req.designation)        { case (?v) v; case null existing.designation };
          email              = switch (req.email)              { case (?v) v; case null existing.email };
          phone              = switch (req.phone)              { case (?v) v; case null existing.phone };
          whatsappNumber     = switch (req.whatsappNumber)     { case (?v) v; case null existing.whatsappNumber };
          website            = switch (req.website)            { case (?v) v; case null existing.website };
          industryType       = switch (req.industryType)       { case (?v) v; case null existing.industryType };
          companySize        = switch (req.companySize)        { case (?v) v; case null existing.companySize };
          location           = switch (req.location)           { case (?v) v; case null existing.location };
          gstNumber          = switch (req.gstNumber)          { case (?v) ?v; case null existing.gstNumber };
          serviceInterested  = switch (req.serviceInterested)  { case (?v) v; case null existing.serviceInterested };
          dealValue          = switch (req.dealValue)          { case (?v) v; case null existing.dealValue };
          leadSource         = switch (req.leadSource)         { case (?v) v; case null existing.leadSource };
          priorityLevel      = switch (req.priorityLevel)      { case (?v) v; case null existing.priorityLevel };
          assignedTeamMember = switch (req.assignedTeamMember) { case (?v) v; case null existing.assignedTeamMember };
          followUpDate       = switch (req.followUpDate)       { case (?v) ?v; case null existing.followUpDate };
          nextMeetingDate    = switch (req.nextMeetingDate)    { case (?v) ?v; case null existing.nextMeetingDate };
          tags               = switch (req.tags)               { case (?v) v; case null existing.tags };
          source             = switch (req.source)             { case (?v) v; case null existing.source };
          updatedAt          = Time.now();
        };
        let updated : Types.Client = {
          patched with
          leadScore   = calcLeadScore(patched);
          healthScore = calcHealthScore(patched);
          dealProbability = calcDealProbability(patched.currentStatus);
        };
        clients.add(id, updated);
        #ok updated
      };
    }
  };

  public func deleteClient(id : Text) : async { #ok : (); #err : Text } {
    switch (clients.get(id)) {
      case null #err "Client not found";
      case (?_) {
        clients.remove(id);
        // Remove related activities
        purgeActivitiesForClient(id);
        // Collect comment keys then remove
        let commentKeys = clientComments.filter(func(_, c) = c.clientId == id).toArray();
        for ((cid, _) in commentKeys.values()) { clientComments.remove(cid) };
        // Collect invoice keys then remove
        let invoiceKeys = invoices.filter(func(_, inv) = inv.clientId == id).toArray();
        for ((iid, _) in invoiceKeys.values()) { invoices.remove(iid) };
        #ok ()
      };
    }
  };

  // --- Pipeline management ---

  public func updateClientStatus(id : Text, status : Types.ClientStatus, note : Text) : async { #ok : Types.Client; #err : Text } {
    switch (clients.get(id)) {
      case null #err "Client not found";
      case (?existing) {
        let now = Time.now();
        let historyEntry : Types.StatusHistoryEntry = {
          status;
          timestamp = now;
          adminName = "Admin";
          note;
        };
        let updated : Types.Client = {
          existing with
          currentStatus = status;
          statusHistory = existing.statusHistory.concat<Types.StatusHistoryEntry>([historyEntry]);
          updatedAt = now;
        };
        clients.add(id, updated);
        // Auto-log a status-change activity
        let act : Types.ClientActivity = {
          id = nextId();
          clientId = id;
          activityType = #statusChange;
          description = "Status changed to " # statusLabel(status);
          timestamp = now;
          adminName = "Admin";
          metadata = ?note;
        };
        clientActivities.add(act);
        #ok updated
      };
    }
  };

  func statusLabel(s : Types.ClientStatus) : Text {
    switch s {
      case (#leadCaptured)      "Lead Captured";
      case (#contacted)         "Contacted";
      case (#discoveryCallDone) "Discovery Call Done";
      case (#proposalSent)      "Proposal Sent";
      case (#negotiation)       "Negotiation";
      case (#closedWon)         "Closed Won";
      case (#closedLost)        "Closed Lost";
      case (#onHold)            "On Hold";
    }
  };

  // --- Activities ---

  public query func getClientActivities(clientId : Text) : async [Types.ClientActivity] {
    let filtered = clientActivities.filter(func(a) = a.clientId == clientId);
    let arr = filtered.toArray();
    arr.sort<Types.ClientActivity>(func(a, b) = Int.compare(b.timestamp, a.timestamp))
  };

  public func addClientActivity(clientId : Text, activityType : Types.ActivityType, description : Text, metadata : ?Text) : async { #ok : Types.ClientActivity; #err : Text } {
    switch (clients.get(clientId)) {
      case null #err "Client not found";
      case (?_) {
        let act : Types.ClientActivity = {
          id = nextId();
          clientId;
          activityType;
          description;
          timestamp = Time.now();
          adminName = "Admin";
          metadata;
        };
        clientActivities.add(act);
        #ok act
      };
    }
  };

  // --- Comments ---

  public query func getClientComments(clientId : Text) : async [Types.ClientComment] {
    clientComments.filter(func(_, c) = c.clientId == clientId).values().toArray()
  };

  public func addClientComment(clientId : Text, content : Text, parentId : ?Text) : async { #ok : Types.ClientComment; #err : Text } {
    switch (clients.get(clientId)) {
      case null #err "Client not found";
      case (?_) {
        let comment : Types.ClientComment = {
          id = nextId();
          clientId;
          content;
          authorName = "Admin";
          timestamp = Time.now();
          isPinned = false;
          parentId;
        };
        clientComments.add(comment.id, comment);
        #ok comment
      };
    }
  };

  public func updateClientComment(commentId : Text, content : Text) : async { #ok : Types.ClientComment; #err : Text } {
    switch (clientComments.get(commentId)) {
      case null #err "Comment not found";
      case (?existing) {
        let updated : Types.ClientComment = { existing with content };
        clientComments.add(commentId, updated);
        #ok updated
      };
    }
  };

  public func deleteClientComment(commentId : Text) : async { #ok : (); #err : Text } {
    switch (clientComments.get(commentId)) {
      case null #err "Comment not found";
      case (?_) {
        clientComments.remove(commentId);
        #ok ()
      };
    }
  };

  public func pinClientComment(commentId : Text, isPinned : Bool) : async { #ok : Types.ClientComment; #err : Text } {
    switch (clientComments.get(commentId)) {
      case null #err "Comment not found";
      case (?existing) {
        let updated : Types.ClientComment = { existing with isPinned };
        clientComments.add(commentId, updated);
        #ok updated
      };
    }
  };

  // --- Invoices ---

  public func createInvoice(clientId : Text, lineItems : [Types.InvoiceLineItem], tax : Float, notes : ?Text) : async { #ok : Types.Invoice; #err : Text } {
    switch (clients.get(clientId)) {
      case null #err "Client not found";
      case (?_) {
        let subtotal = lineItems.foldLeft(
          0.0, func(acc, item) = acc + item.amount
        );
        let total = subtotal + tax;
        let id = nextId();
        let inv : Types.Invoice = {
          id;
          clientId;
          invoiceNumber = nextInvoiceNumber();
          lineItems;
          subtotal;
          tax;
          total;
          paymentStatus = #pending;
          status = #draft;
          dueDate = null;
          amountPaid = 0;
          createdAt = Time.now();
          createdBy = "Admin";
          notes;
        };
        invoices.add(id, inv);
        // Log activity
        let act : Types.ClientActivity = {
          id = nextId();
          clientId;
          activityType = #invoiceGenerated;
          description = "Invoice " # inv.invoiceNumber # " generated";
          timestamp = inv.createdAt;
          adminName = "Admin";
          metadata = null;
        };
        clientActivities.add(act);
        #ok inv
      };
    }
  };

  public query func getClientInvoices(clientId : Text) : async [Types.Invoice] {
    invoices.filter(func(_, inv) = inv.clientId == clientId).values().toArray()
  };

  public func updateInvoicePaymentStatus(invoiceId : Text, status : Types.PaymentStatus) : async { #ok : Types.Invoice; #err : Text } {
    switch (invoices.get(invoiceId)) {
      case null #err "Invoice not found";
      case (?existing) {
        let updated : Types.Invoice = { existing with paymentStatus = status };
        invoices.add(invoiceId, updated);
        #ok updated
      };
    }
  };

  // --- Analytics ---

  public query func getClientAnalytics() : async Types.ClientAnalytics {
    let now = Time.now();
    var totalClients : Nat = 0;
    var activeLeads : Nat = 0;
    var approvedDeals : Nat = 0;
    var rejectedLeads : Nat = 0;
    var revenuePipeline : Float = 0.0;

    // Build last-6-months label buckets
    let monthLabels = Array.tabulate(6, func(i) {
      let offsetNs : Int = (5 - i) * 30 * 24 * 3600 * 1_000_000_000;
      let ts = now - offsetNs;
      getMonthLabel(ts)
    });

    let approved6 = [var 0, 0, 0, 0, 0, 0];
    let rejected6 = [var 0, 0, 0, 0, 0, 0];
    let newLeads6  = [var 0, 0, 0, 0, 0, 0];

    for ((_, client) in clients.entries()) {
      totalClients += 1;
      if (isActiveStatus(client.currentStatus)) { activeLeads += 1 };
      if (client.currentStatus == #closedWon) { approvedDeals += 1 };
      if (client.currentStatus == #closedLost) { rejectedLeads += 1 };
      if (client.currentStatus != #closedLost) { revenuePipeline += client.dealValue };

      let clientMonth = getMonthLabel(client.createdAt);
      var i = 0;
      label search for (lbl in monthLabels.values()) {
        if (lbl == clientMonth) {
          newLeads6[i] += 1;
          if (client.currentStatus == #closedWon) { approved6[i] += 1 };
          if (client.currentStatus == #closedLost) { rejected6[i] += 1 };
          break search;
        };
        i += 1;
      };
    };

    let monthlyData = Array.tabulate(6, func(i) {
      {
        month     = monthLabels[i];
        approved  = approved6[i];
        rejected  = rejected6[i];
        newLeads  = newLeads6[i];
      }
    });

    {
      totalClients;
      activeLeads;
      approvedDeals;
      rejectedLeads;
      revenuePipeline;
      monthlyData;
    }
  };

  // --- Multi-contact management (stubs) ---

  public func addContact(clientId : Text, contact : Types.ContactPerson) : async { #ok : Types.Client; #err : Text } {
    switch (clients.get(clientId)) {
      case null #err "Client not found";
      case (?existing) {
        // If new contact is primary, demote all existing primaries
        let baseContacts : [Types.ContactPerson] = if (contact.isPrimary) {
          existing.contacts.map<Types.ContactPerson, Types.ContactPerson>(func c = { c with isPrimary = false })
        } else {
          existing.contacts
        };
        let newContacts = baseContacts.concat([contact]);
        let updated : Types.Client = {
          existing with
          contacts = newContacts;
          updatedAt = Time.now();
        };
        clients.add(clientId, updated);
        #ok updated
      };
    }
  };

  public func updateContact(clientId : Text, contactId : Text, contact : Types.ContactPerson) : async { #ok : Types.Client; #err : Text } {
    switch (clients.get(clientId)) {
      case (?existing) {
        // If updated contact is primary, demote others first
        let mapped : [Types.ContactPerson] = existing.contacts.map<Types.ContactPerson, Types.ContactPerson>(
          func c {
            if (c.id == contactId) {
              { contact with id = contactId }
            } else if (contact.isPrimary) {
              { c with isPrimary = false }
            } else {
              c
            }
          }
        );
        let updated : Types.Client = { existing with contacts = mapped; updatedAt = Time.now() };
        clients.add(clientId, updated);
        #ok updated
      };
      case null #err "Client not found";
    }
  };

  public func removeContact(clientId : Text, contactId : Text) : async { #ok : Types.Client; #err : Text } {
    switch (clients.get(clientId)) {
      case null #err "Client not found";
      case (?existing) {
        let wasRemovingPrimary : Bool = switch (existing.contacts.find(func(c : Types.ContactPerson) : Bool { c.id == contactId })) {
          case (?c) c.isPrimary;
          case null false;
        };
        let remaining : [Types.ContactPerson] = existing.contacts.filter(func(c : Types.ContactPerson) : Bool { c.id != contactId });
        // If the removed contact was primary, promote the first remaining contact
        let finalContacts : [Types.ContactPerson] = if (wasRemovingPrimary and remaining.size() > 0) {
          let promoted : Types.ContactPerson = { remaining[0] with isPrimary = true };
          let restSize : Nat = if (remaining.size() > 0) remaining.size() - 1 else 0;
          let rest = Array.tabulate(restSize, func i = remaining[i + 1]);
          [promoted].concat<Types.ContactPerson>(rest)
        } else {
          remaining
        };
        let updated : Types.Client = { existing with contacts = finalContacts; updatedAt = Time.now() };
        clients.add(clientId, updated);
        #ok updated
      };
    }
  };

  // --- Quick activity logging (stubs) ---

  public func logQuickActivity(clientId : Text, activityType : Text, notes : Text) : async { #ok : Types.Client; #err : Text } {
    switch (clients.get(clientId)) {
      case null #err "Client not found";
      case (?existing) {
        let now = Time.now();
        let aType : Types.ActivityType = switch activityType {
          case "quickCall"    #quickCall;
          case "quickMeeting" #quickMeeting;
          case _              #quickEmail;
        };
        let act : Types.ClientActivity = {
          id = nextId();
          clientId;
          activityType = aType;
          description = notes;
          timestamp = now;
          adminName = "Admin";
          metadata = null;
        };
        clientActivities.add(act);
        let newCount = existing.activityCount + 1;
        let partial : Types.Client = {
          existing with
          activityCount = newCount;
          lastActivity = ?now;
          updatedAt = now;
        };
        let updated : Types.Client = {
          partial with
          leadScore   = calcLeadScore(partial);
          healthScore = calcHealthScore(partial);
        };
        clients.add(clientId, updated);
        #ok updated
      };
    }
  };

  // --- Proposal status tracking (stubs) ---

  public func updateProposalStatus(clientId : Text, status : Text, version : Nat) : async { #ok : Types.Client; #err : Text } {
    switch (clients.get(clientId)) {
      case null #err "Client not found";
      case (?existing) {
        let now = Time.now();
        let updated : Types.Client = {
          existing with
          proposalStatus = ?status;
          proposalVersion = version;
          updatedAt = now;
        };
        clients.add(clientId, updated);
        // Log proposal activity
        let act : Types.ClientActivity = {
          id = nextId();
          clientId;
          activityType = #proposalUploaded;
          description = "Proposal status updated to " # status # " (v" # version.toText() # ")";
          timestamp = now;
          adminName = "Admin";
          metadata = null;
        };
        clientActivities.add(act);
        #ok updated
      };
    }
  };

  // --- Won/Lost reason capture (stubs) ---

  public func captureWonLostReason(clientId : Text, reason : Text) : async { #ok : Types.Client; #err : Text } {
    switch (clients.get(clientId)) {
      case null #err "Client not found";
      case (?existing) {
        let now = Time.now();
        let updated : Types.Client = {
          existing with
          wonLostReason = ?reason;
          closedAt = ?now;
          updatedAt = now;
        };
        clients.add(clientId, updated);
        let act : Types.ClientActivity = {
          id = nextId();
          clientId;
          activityType = #statusChange;
          description = "Won/Lost reason captured: " # reason;
          timestamp = now;
          adminName = "Admin";
          metadata = null;
        };
        clientActivities.add(act);
        #ok updated
      };
    }
  };

  // --- Invoice status lifecycle ---

  public func updateInvoiceStatus(clientId : Text, invoiceId : Text, status : Types.InvoicePaymentStatus, amountPaid : ?Nat) : async { #ok : Types.Invoice; #err : Text } {
    ignore clientId;
    switch (invoices.get(invoiceId)) {
      case null #err "Invoice not found";
      case (?existing) {
        let now = Time.now();
        // Determine if overdue: if status is #overdue or dueDate passed
        let resolvedStatus : Types.InvoicePaymentStatus = switch (existing.dueDate) {
          case (?dd) {
            if (status == #overdue) #overdue
            else if (dd < now and status != #paid) #overdue
            else status
          };
          case null status;
        };
        let paid : Nat = switch amountPaid { case (?p) p; case null existing.amountPaid };
        let updated : Types.Invoice = {
          existing with
          status = resolvedStatus;
          amountPaid = paid;
        };
        invoices.add(invoiceId, updated);
        #ok updated
      };
    }
  };

  // --- Advanced analytics (stubs) ---

  public query func getAnalyticsDashboard() : async Types.AnalyticsData {
    var totalPipelineF : Float = 0.0;
    var weightedForecastF : Float = 0.0;
    var wonCount : Nat = 0;
    var lostCount : Nat = 0;
    var cycleDaysSum : Nat = 0;
    var cycleDaysCount : Nat = 0;

    // stage order for conversionRates
    let stages : [(Text, Types.ClientStatus)] = [
      ("Lead Captured", #leadCaptured),
      ("Contacted", #contacted),
      ("Discovery Call Done", #discoveryCallDone),
      ("Proposal Sent", #proposalSent),
      ("Negotiation", #negotiation),
      ("Closed Won", #closedWon),
      ("Closed Lost", #closedLost),
      ("On Hold", #onHold),
    ];
    let stageCounts = [var 0, 0, 0, 0, 0, 0, 0, 0];

    // wonLostReason breakdown: use a simple array of (reason, count)
    // We'll accumulate into a Map then convert
    let reasonMap = Map.empty<Text, Nat>();

    for ((_, client) in clients.entries()) {
      let prob = calcDealProbability(client.currentStatus);
      // Pipeline = non-closed deal values
      if (client.currentStatus != #closedLost) {
        totalPipelineF += client.dealValue;
      };
      weightedForecastF += client.dealValue * prob.toFloat() / 100.0;

      // Stage counts
      var si = 0;
      for ((_, s) in stages.values()) {
        if (client.currentStatus == s) { stageCounts[si] += 1 };
        si += 1;
      };

      // Won/lost
      if (client.currentStatus == #closedWon) {
        wonCount += 1;
        // deal cycle days
        switch (client.closedAt) {
          case (?ca) {
            let diffNs : Int = ca - client.createdAt;
            let days : Int = diffNs / 86_400_000_000_000;
            if (days > 0) {
              cycleDaysSum += Int.abs(days);
              cycleDaysCount += 1;
            };
          };
          case null {};
        };
      };
      if (client.currentStatus == #closedLost) { lostCount += 1 };

      // Won/lost reason
      switch (client.wonLostReason) {
        case (?r) {
          let cur = switch (reasonMap.get(r)) { case (?n) n; case null 0 };
          reasonMap.add(r, cur + 1);
        };
        case null {};
      };
    };

    let totalPipeline : Nat = Int.abs(totalPipelineF.toInt());
    let weightedForecast : Nat = Int.abs(weightedForecastF.toInt());
    let totalClosed = wonCount + lostCount;
    let winRate : Nat = if (totalClosed == 0) 0 else (wonCount * 100) / totalClosed;
    let avgDealCycleDays : Nat = if (cycleDaysCount == 0) 0 else cycleDaysSum / cycleDaysCount;

    let conversionRates : [(Text, Nat)] = Array.tabulate(stages.size(), func(i) {
      (stages[i].0, stageCounts[i])
    });
    let wonLostBreakdown : [(Text, Nat)] = reasonMap.entries().toArray();

    { totalPipeline; weightedForecast; winRate; avgDealCycleDays; conversionRates; wonLostBreakdown }
  };

  public query func getCRMFunnelData() : async [(Text, Nat)] {
    let stages : [(Text, Types.ClientStatus)] = [
      ("Lead Captured", #leadCaptured),
      ("Contacted", #contacted),
      ("Discovery Call Done", #discoveryCallDone),
      ("Proposal Sent", #proposalSent),
      ("Negotiation", #negotiation),
      ("Closed Won", #closedWon),
      ("Closed Lost", #closedLost),
      ("On Hold", #onHold),
    ];
    let counts = [var 0, 0, 0, 0, 0, 0, 0, 0];
    for ((_, client) in clients.entries()) {
      var i = 0;
      for ((_, s) in stages.values()) {
        if (client.currentStatus == s) { counts[i] += 1 };
        i += 1;
      };
    };
    Array.tabulate(stages.size(), func(i) = (stages[i].0, counts[i]))
  };

  public query func getWinRateByMember() : async [(Text, Nat, Nat)] {
    // Map member -> (wonCount, totalClosedCount)
    let wonMap = Map.empty<Text, Nat>();
    let totalMap = Map.empty<Text, Nat>();
    for ((_, client) in clients.entries()) {
      let member = client.assignedTeamMember;
      if (client.currentStatus == #closedWon or client.currentStatus == #closedLost) {
        let tc = switch (totalMap.get(member)) { case (?n) n; case null 0 };
        totalMap.add(member, tc + 1);
        if (client.currentStatus == #closedWon) {
          let wc = switch (wonMap.get(member)) { case (?n) n; case null 0 };
          wonMap.add(member, wc + 1);
        };
      };
    };
    totalMap.entries().toArray().map<(Text, Nat), (Text, Nat, Nat)>(
      func((member, total)) {
        let won = switch (wonMap.get(member)) { case (?n) n; case null 0 };
        (member, won, total)
      }
    )
  };

  public query func getDealCycleTime() : async Nat {
    var sum : Nat = 0;
    var count : Nat = 0;
    for ((_, client) in clients.entries()) {
      if (client.currentStatus == #closedWon) {
        switch (client.closedAt) {
          case (?ca) {
            let diffNs : Int = ca - client.createdAt;
            let days : Int = diffNs / 86_400_000_000_000;
            if (days > 0) { sum += Int.abs(days); count += 1 };
          };
          case null {};
        };
      };
    };
    if (count == 0) 0 else sum / count
  };

  public query func getLostDealAnalysis() : async [(Text, Nat, Nat)] {
    // Map reason -> (count, totalLostValue)
    let countMap = Map.empty<Text, Nat>();
    let valueMap = Map.empty<Text, Nat>();
    for ((_, client) in clients.entries()) {
      if (client.currentStatus == #closedLost) {
        let reason = switch (client.wonLostReason) { case (?r) r; case null "Unknown" };
        let cc = switch (countMap.get(reason)) { case (?n) n; case null 0 };
        countMap.add(reason, cc + 1);
        let vc = switch (valueMap.get(reason)) { case (?n) n; case null 0 };
        valueMap.add(reason, vc + Int.abs(client.dealValue.toInt()));
      };
    };
    countMap.entries().toArray().map<(Text, Nat), (Text, Nat, Nat)>(
      func((reason, cnt)) {
        let val = switch (valueMap.get(reason)) { case (?n) n; case null 0 };
        (reason, cnt, val)
      }
    )
  };


};
