import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Auth "../lib/auth";
import InternLib "../lib/interns";
import Types "../types/interns";
import NotifTypes "../types/notifications";

mixin (
  interns : Map.Map<Text, Types.Intern>,
  performances : Map.Map<Text, Types.Performance>,
  activities : List.List<Types.Activity>,
  counter : { var n : Nat },
  sessions : Map.Map<Text, Auth.SessionInfo>,
  stageHistories : Map.Map<Text, Types.InternPipelineStageHistory>,
  notifications : Map.Map<Text, NotifTypes.Notification>,
) {

  public func createIntern(sessionToken : Text, payload : Types.CreateInternPayload) : async { #ok : Types.Intern; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    #ok(InternLib.createIntern(interns, activities, counter, payload, username))
  };

  public query func getIntern(id : Text) : async ?Types.Intern {
    InternLib.getIntern(interns, id)
  };

  public query func listInterns(filter : Types.ListInternsFilter) : async [Types.Intern] {
    InternLib.listInterns(interns, filter)
  };

  public func updateIntern(sessionToken : Text, id : Text, payload : Types.UpdateInternPayload) : async { #ok : Types.Intern; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    switch (InternLib.updateIntern(interns, activities, counter, id, payload, username)) {
      case null { #err("Intern not found") };
      case (?intern) { #ok(intern) };
    }
  };

  public func deleteIntern(sessionToken : Text, id : Text) : async { #ok : Bool; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let ok = InternLib.deleteIntern(interns, performances, activities, counter, id, username);
    if (ok) { #ok(true) } else { #err("Intern not found") }
  };

  public func updateDocumentState(sessionToken : Text, internId : Text, docType : Text, action : Text) : async { #ok : Bool; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let field : Types.DocumentField = switch (docType # "-" # action) {
      case "offerLetter-sent"             { #offerLetterSent };
      case "offerLetter-opened"           { #offerLetterOpened };
      case "certificate-sent"             { #certificateSent };
      case "certificate-opened"           { #certificateOpened };
      case "completionLetter-sent"        { #completionLetterSent };
      case "completionLetter-opened"      { #completionLetterOpened };
      case _ { return #err("Invalid docType or action") };
    };
    switch (InternLib.updateDocumentState(interns, activities, counter, internId, field, true, username)) {
      case null { #err("Intern not found") };
      case (?_) { #ok(true) };
    }
  };

  public func logWhatsApp(sessionToken : Text, internId : Text) : async { #ok : Bool; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let ok = InternLib.logWhatsApp(interns, activities, counter, internId, username);
    if (ok) { #ok(true) } else { #err("Intern not found") }
  };

  public func addPerformance(sessionToken : Text, payload : Types.CreatePerformancePayload) : async { #ok : Types.Performance; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    #ok(InternLib.addPerformance(performances, activities, counter, payload, username))
  };

  public func updatePerformance(sessionToken : Text, id : Text, payload : Types.UpdatePerformancePayload) : async { #ok : Types.Performance; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    switch (InternLib.updatePerformance(performances, activities, counter, id, payload, username)) {
      case null { #err("Performance record not found") };
      case (?perf) { #ok(perf) };
    }
  };

  public func deletePerformance(sessionToken : Text, id : Text) : async { #ok : Bool; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let ok = InternLib.deletePerformance(performances, activities, counter, id, username);
    if (ok) { #ok(true) } else { #err("Performance record not found") }
  };

  public query func listPerformances(internId : Text) : async [Types.Performance] {
    InternLib.listPerformances(performances, internId)
  };

  public query func getActivities(internId : ?Text) : async [Types.Activity] {
    InternLib.getActivities(activities, internId)
  };

  public func seedSampleData() : async () {
    ignore InternLib.seedSampleData(interns, performances, activities, counter);
  };

  public query func getDashboardStats() : async Types.DashboardStats {
    InternLib.getDashboardStats(interns, performances)
  };

  // ── Intern Pipeline Stage ────────────────────────────────────────────────

  public func updateInternPipelineStage(
    sessionToken : Text,
    internId : Text,
    newStage : Types.InternPipelineStage,
    notes : Text,
  ) : async { #ok : Types.Intern; #err : Text } {
    let changedBy = Auth.requireSession(sessions, sessionToken);
    switch (interns.get(internId)) {
      case null { #err("Intern not found") };
      case (?intern) {
        let now = Time.now();
        // Append history entry (key = internId # "-" # timestamp for uniqueness)
        let histKey = internId # "-" # now.toText();
        let entry : Types.InternPipelineStageHistory = {
          stage     = newStage;
          changedBy;
          changedAt = now;
          notes;
        };
        stageHistories.add(histKey, entry);
        // Update intern record
        let updated : Types.Intern = { intern with pipelineStage = newStage; updatedAt = now };
        interns.add(internId, updated);
        // Notify
        let notifId = "notif-" # now.toText();
        let notif : NotifTypes.Notification = {
          id               = notifId;
          userId           = internId;
          notificationType = #stageChanged;
          title            = "Pipeline stage updated";
          message          = "Your pipeline stage has been updated by " # changedBy;
          isRead           = false;
          relatedId        = ?internId;
          createdAt        = now;
          priority         = ?#medium;
        };
        notifications.add(notifId, notif);
        #ok(updated)
      };
    }
  };

  public query func getStageHistory(internId : Text) : async [Types.InternPipelineStageHistory] {
    let prefix = internId # "-";
    let all = stageHistories.entries().toArray()
      .filter(func((k, _)) { k.startsWith(#text prefix) })
      .map(func((_, h)) { h });
    all.sort(func(a, b) {
      if (a.changedAt < b.changedAt) #less
      else if (a.changedAt > b.changedAt) #greater
      else #equal
    })
  };

  public func updateInternExtendedProfile(
    sessionToken : Text,
    internId : Text,
    dob : ?Text,
    gender : ?Text,
    emergencyContact : ?Text,
    college : ?Text,
    department : ?Text,
    degreeYear : ?Text,
    domain : ?Text,
    mentorAssigned : ?Text,
    startDate : ?Text,
    expectedEndDate : ?Text,
    internshipType : ?Text,
    stipendAmount : ?Float,
    ppoCandidate : Bool,
    performanceTier : ?Text,
    isActive : Bool,
  ) : async { #ok : Types.Intern; #err : Text } {
    let _username = Auth.requireSession(sessions, sessionToken);
    switch (interns.get(internId)) {
      case null { #err("Intern not found") };
      case (?intern) {
        let updated : Types.Intern = {
          intern with
          dob;
          gender;
          emergencyContact;
          college;
          department       = switch (department) { case (?d) d; case null intern.department };
          degreeYear;
          domain;
          mentorAssigned;
          startDate;
          expectedEndDate;
          internshipType;
          stipendAmount;
          ppoCandidate;
          performanceTier;
          isActive;
          updatedAt        = Time.now();
        };
        interns.add(internId, updated);
        #ok(updated)
      };
    }
  };

};
