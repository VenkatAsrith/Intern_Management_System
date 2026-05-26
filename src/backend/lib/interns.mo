import Array "mo:core/Array";
import Int "mo:core/Int";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/interns";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";

module {

  // --- UUID helpers ---

  func genId(counter : { var n : Nat }) : Text {
    counter.n += 1;
    let t = Time.now().toText();
    let c = counter.n.toText();
    t # "-" # c
  };

  // --- Activity helper ---

  func logActivity(
    activities : List.List<Types.Activity>,
    counter : { var n : Nat },
    internId : Text,
    action : Text,
    details : Text,
    caller : Text,
  ) {
    let activity : Types.Activity = {
      id = genId(counter);
      internId;
      action;
      details;
      timestamp = Time.now();
      performedBy = caller;
    };
    activities.add(activity);
  };

  // --- Score validation ---

  func validateScore(score : Float) : Bool {
    score >= 0.0 and score <= 5.0
  };

  // --- CRUD ---

  public func createIntern(
    interns : Map.Map<Text, Types.Intern>,
    activities : List.List<Types.Activity>,
    counter : { var n : Nat },
    payload : Types.CreateInternPayload,
    caller : Text,
  ) : Types.Intern {
    let now = Time.now();
    let id = genId(counter);
    let intern : Types.Intern = {
      id;
      name = payload.name;
      email = payload.email;
      phone = payload.phone;
      space = payload.space;
      status = payload.status;
      experienceLevel = payload.experienceLevel;
      joiningDate = payload.joiningDate;
      department = payload.department;
      adminNotes = payload.adminNotes;
      profilePicCid = payload.profilePicCid;
      lastContactedAt = null;
      lastWhatsAppedAt = null;
      createdAt = now;
      updatedAt = now;
      offerLetterSent = false;
      offerLetterSentAt = null;
      offerLetterOpened = false;
      offerLetterOpenedAt = null;
      certificateSent = false;
      certificateSentAt = null;
      certificateOpened = false;
      certificateOpenedAt = null;
      completionLetterSent = false;
      completionLetterSentAt = null;
      completionLetterOpened = false;
      completionLetterOpenedAt = null;
      pipelineStage = #applied;
      dob = null;
      gender = null;
      emergencyContact = null;
      college = null;
      degreeYear = null;
      domain = null;
      mentorAssigned = null;
      startDate = null;
      expectedEndDate = null;
      actualEndDate = null;
      internshipType = null;
      stipendAmount = null;
      ppoCandidate = false;
      performanceTier = null;
      isActive = true;
    };
    interns.add(id, intern);
    logActivity(activities, counter, id, "created", "Intern " # payload.name # " created", caller);
    intern
  };

  public func getIntern(
    interns : Map.Map<Text, Types.Intern>,
    id : Text,
  ) : ?Types.Intern {
    interns.get(id)
  };

  public func listInterns(
    interns : Map.Map<Text, Types.Intern>,
    filter : Types.ListInternsFilter,
  ) : [Types.Intern] {
    let all = interns.values().toArray();
    all.filter(func(intern) {
      let spaceOk = switch (filter.space) {
        case null true;
        case (?s) intern.space == s;
      };
      let statusOk = switch (filter.status) {
        case null true;
        case (?st) intern.status == st;
      };
      spaceOk and statusOk
    })
  };

  public func updateIntern(
    interns : Map.Map<Text, Types.Intern>,
    activities : List.List<Types.Activity>,
    counter : { var n : Nat },
    id : Text,
    payload : Types.UpdateInternPayload,
    caller : Text,
  ) : ?Types.Intern {
    switch (interns.get(id)) {
      case null null;
      case (?existing) {
        let updated : Types.Intern = {
          existing with
          name = payload.name;
          email = payload.email;
          phone = payload.phone;
          space = payload.space;
          status = payload.status;
          experienceLevel = payload.experienceLevel;
          joiningDate = payload.joiningDate;
          department = payload.department;
          adminNotes = payload.adminNotes;
          profilePicCid = payload.profilePicCid;
          updatedAt = Time.now();
        };
        interns.add(id, updated);
        logActivity(activities, counter, id, "updated", "Intern " # payload.name # " updated", caller);
        ?updated
      };
    }
  };

  public func deleteIntern(
    interns : Map.Map<Text, Types.Intern>,
    performances : Map.Map<Text, Types.Performance>,
    activities : List.List<Types.Activity>,
    counter : { var n : Nat },
    id : Text,
    caller : Text,
  ) : Bool {
    switch (interns.get(id)) {
      case null false;
      case (?intern) {
        interns.remove(id);
        // Cascade delete performances
        let perfIds = performances.keys().toArray().filter(func(pid) {
          switch (performances.get(pid)) {
            case (?p) p.internId == id;
            case null false;
          }
        });
        perfIds.forEach(func(pid) { performances.remove(pid) });
        // Cascade delete activities
        let toKeep = activities.filter(func(a) { a.internId != id });
        activities.clear();
        activities.append(toKeep);
        logActivity(activities, counter, id, "deleted", "Intern " # intern.name # " deleted", caller);
        true
      };
    }
  };

  // --- Document state ---

  public func updateDocumentState(
    interns : Map.Map<Text, Types.Intern>,
    activities : List.List<Types.Activity>,
    counter : { var n : Nat },
    internId : Text,
    field : Types.DocumentField,
    value : Bool,
    caller : Text,
  ) : ?Types.Intern {
    switch (interns.get(internId)) {
      case null null;
      case (?intern) {
        let now = Time.now();
        let updated : Types.Intern = switch (field) {
          case (#offerLetterSent) {
            { intern with
              offerLetterSent = value;
              offerLetterSentAt = if (value) ?now else intern.offerLetterSentAt;
              updatedAt = now;
            }
          };
          case (#offerLetterOpened) {
            { intern with
              offerLetterOpened = value;
              offerLetterOpenedAt = if (value) ?now else intern.offerLetterOpenedAt;
              updatedAt = now;
            }
          };
          case (#certificateSent) {
            { intern with
              certificateSent = value;
              certificateSentAt = if (value) ?now else intern.certificateSentAt;
              updatedAt = now;
            }
          };
          case (#certificateOpened) {
            { intern with
              certificateOpened = value;
              certificateOpenedAt = if (value) ?now else intern.certificateOpenedAt;
              updatedAt = now;
            }
          };
          case (#completionLetterSent) {
            { intern with
              completionLetterSent = value;
              completionLetterSentAt = if (value) ?now else intern.completionLetterSentAt;
              updatedAt = now;
            }
          };
          case (#completionLetterOpened) {
            { intern with
              completionLetterOpened = value;
              completionLetterOpenedAt = if (value) ?now else intern.completionLetterOpenedAt;
              updatedAt = now;
            }
          };
        };
        interns.add(internId, updated);
        let fieldName = switch (field) {
          case (#offerLetterSent) "offerLetterSent";
          case (#offerLetterOpened) "offerLetterOpened";
          case (#certificateSent) "certificateSent";
          case (#certificateOpened) "certificateOpened";
          case (#completionLetterSent) "completionLetterSent";
          case (#completionLetterOpened) "completionLetterOpened";
        };
        logActivity(activities, counter, internId, "document", "Document field " # fieldName # " updated", caller);
        ?updated
      };
    }
  };

  // --- WhatsApp ---

  public func logWhatsApp(
    interns : Map.Map<Text, Types.Intern>,
    activities : List.List<Types.Activity>,
    counter : { var n : Nat },
    internId : Text,
    caller : Text,
  ) : Bool {
    switch (interns.get(internId)) {
      case null false;
      case (?intern) {
        let now = Time.now();
        let updated : Types.Intern = {
          intern with
          lastWhatsAppedAt = ?now;
          lastContactedAt = ?now;
          updatedAt = now;
        };
        interns.add(internId, updated);
        logActivity(activities, counter, internId, "whatsapped", "WhatsApp contact logged", caller);
        true
      };
    }
  };

  // --- Performance ---

  public func addPerformance(
    performances : Map.Map<Text, Types.Performance>,
    activities : List.List<Types.Activity>,
    counter : { var n : Nat },
    payload : Types.CreatePerformancePayload,
    caller : Text,
  ) : Types.Performance {
    if (
      not validateScore(payload.taskScore) or
      not validateScore(payload.attendanceScore) or
      not validateScore(payload.communicationScore) or
      not validateScore(payload.initiativeScore) or
      not validateScore(payload.overallScore)
    ) {
      Runtime.trap("Score must be between 0 and 5")
    };
    let id = genId(counter);
    let perf : Types.Performance = {
      id;
      internId = payload.internId;
      month = payload.month;
      year = payload.year;
      taskScore = payload.taskScore;
      attendanceScore = payload.attendanceScore;
      communicationScore = payload.communicationScore;
      initiativeScore = payload.initiativeScore;
      overallScore = payload.overallScore;
      adminNotes = payload.adminNotes;
      createdAt = Time.now();
    };
    performances.add(id, perf);
    logActivity(activities, counter, payload.internId, "performed", "Performance record added for " # payload.year.toText() # "/" # payload.month.toText(), caller);
    perf
  };

  public func updatePerformance(
    performances : Map.Map<Text, Types.Performance>,
    activities : List.List<Types.Activity>,
    counter : { var n : Nat },
    id : Text,
    payload : Types.UpdatePerformancePayload,
    caller : Text,
  ) : ?Types.Performance {
    switch (performances.get(id)) {
      case null null;
      case (?existing) {
        if (
          not validateScore(payload.taskScore) or
          not validateScore(payload.attendanceScore) or
          not validateScore(payload.communicationScore) or
          not validateScore(payload.initiativeScore) or
          not validateScore(payload.overallScore)
        ) {
          Runtime.trap("Score must be between 0 and 5")
        };
        let updated : Types.Performance = {
          existing with
          month = payload.month;
          year = payload.year;
          taskScore = payload.taskScore;
          attendanceScore = payload.attendanceScore;
          communicationScore = payload.communicationScore;
          initiativeScore = payload.initiativeScore;
          overallScore = payload.overallScore;
          adminNotes = payload.adminNotes;
        };
        performances.add(id, updated);
        logActivity(activities, counter, existing.internId, "performed", "Performance record updated for " # payload.year.toText() # "/" # payload.month.toText(), caller);
        ?updated
      };
    }
  };

  public func deletePerformance(
    performances : Map.Map<Text, Types.Performance>,
    activities : List.List<Types.Activity>,
    counter : { var n : Nat },
    id : Text,
    caller : Text,
  ) : Bool {
    switch (performances.get(id)) {
      case null false;
      case (?perf) {
        performances.remove(id);
        logActivity(activities, counter, perf.internId, "performed", "Performance record deleted", caller);
        true
      };
    }
  };

  public func listPerformances(
    performances : Map.Map<Text, Types.Performance>,
    internId : Text,
  ) : [Types.Performance] {
    let all = performances.values().toArray();
    let filtered = all.filter(func(p) { p.internId == internId });
    filtered.sort(func(a, b) {
      if (a.year != b.year) {
        if (a.year > b.year) #less else #greater
      } else {
        if (a.month > b.month) #less else #greater
      }
    })
  };

  public func getActivities(
    activities : List.List<Types.Activity>,
    internId : ?Text,
  ) : [Types.Activity] {
    let filtered = switch (internId) {
      case null activities.toArray();
      case (?id) activities.filter(func(a) { a.internId == id }).toArray();
    };
    let sorted = filtered.sort(func(a, b) {
      if (a.timestamp > b.timestamp) #less else #greater
    });
    if (sorted.size() > 50) {
      sorted.sliceToArray(0, 50)
    } else {
      sorted
    }
  };

  // --- Dashboard stats ---

  public func getDashboardStats(
    interns : Map.Map<Text, Types.Intern>,
    performances : Map.Map<Text, Types.Performance>,
  ) : Types.DashboardStats {
    // Compute month boundary: approximate current month start in nanoseconds
    let nowNs : Int = Time.now();
    // 30 days in nanoseconds as an approximation for "this month"
    let thirtyDaysNs : Int = 30 * 24 * 60 * 60 * 1_000_000_000;
    let monthStart : Int = nowNs - thirtyDaysNs;

    var totalInterns : Nat = 0;
    var activeInterns : Nat = 0;
    var orgCount : Nat = 0;
    var marketingCount : Nat = 0;
    var learningCount : Nat = 0;
    var documentsSentThisMonth : Nat = 0;

    for ((_, intern) in interns.entries()) {
      totalInterns += 1;
      switch (intern.status) {
        case (#Active) { activeInterns += 1 };
        case _ {};
      };
      switch (intern.space) {
        case (#Org) { orgCount += 1 };
        case (#Marketing) { marketingCount += 1 };
        case (#Learning) { learningCount += 1 };
      };
      // Count any letter sent this month
      let offerSent = switch (intern.offerLetterSentAt) {
        case (?t) t >= monthStart;
        case null false;
      };
      let certSent = switch (intern.certificateSentAt) {
        case (?t) t >= monthStart;
        case null false;
      };
      let compSent = switch (intern.completionLetterSentAt) {
        case (?t) t >= monthStart;
        case null false;
      };
      let sentThisMonth = offerSent or certSent or compSent;
      if (sentThisMonth) { documentsSentThisMonth += 1 };
    };

    var totalScore : Float = 0.0;
    var perfCount : Nat = 0;
    for ((_, perf) in performances.entries()) {
      totalScore += perf.overallScore;
      perfCount += 1;
    };
    let avgPerformance : Float = if (perfCount == 0) 0.0 else totalScore / perfCount.toFloat();

    {
      totalInterns;
      activeInterns;
      orgCount;
      marketingCount;
      learningCount;
      documentsSentThisMonth;
      avgPerformance;
    }
  };

  // --- Sample data seeding ---

  public func seedSampleData(
    _interns : Map.Map<Text, Types.Intern>,
    _performances : Map.Map<Text, Types.Performance>,
    _activities : List.List<Types.Activity>,
    _counter : { var n : Nat },
  ) : Nat {
    // Sample data removed — no records are seeded.
    0
  };

};
