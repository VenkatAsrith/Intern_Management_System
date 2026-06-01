import Debug "mo:core/Debug";

module {

  public type Space = {
    #Org;
    #Marketing;
    #Learning;
  };

  public type Status = {
    #Active;
    #Completed;
    #OnHold;
  };

  public type InternPipelineStage = {
    #applied;
    #screened;
    #interviewScheduled;
    #interviewDone;
    #decisionPending;
    #offerSent;
    #offerAccepted;
    #offerRejected;
    #onboarding;
    #active;
    #performanceReview;
    #completed;
    #alumni;
  };

  public type InternPipelineStageHistory = {
    stage : InternPipelineStage;
    changedBy : Text;
    changedAt : Int;
    notes : Text;
  };

  public type ExperienceLevel = {
    #Junior;
    #Mid;
    #Senior;
  };

  public type Intern = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    space : Space;
    status : Status;
    experienceLevel : ExperienceLevel;
    joiningDate : Int;
    department : Text;
    adminNotes : Text;
    profilePicCid : ?Text;
    lastContactedAt : ?Int;
    lastWhatsAppedAt : ?Int;
    createdAt : Int;
    updatedAt : Int;
    // document tracking
    offerLetterSent : Bool;
    offerLetterSentAt : ?Int;
    offerLetterOpened : Bool;
    offerLetterOpenedAt : ?Int;
    certificateSent : Bool;
    certificateSentAt : ?Int;
    certificateOpened : Bool;
    certificateOpenedAt : ?Int;
    completionLetterSent : Bool;
    completionLetterSentAt : ?Int;
    completionLetterOpened : Bool;
    completionLetterOpenedAt : ?Int;
    // pipeline
    pipelineStage : InternPipelineStage;
    // extended personal info
    dob : ?Text;
    gender : ?Text;
    emergencyContact : ?Text;
    college : ?Text;
    degreeYear : ?Text;
    domain : ?Text;
    mentorAssigned : ?Text;
    // internship details
    startDate : ?Text;
    expectedEndDate : ?Text;
    actualEndDate : ?Text;
    internshipType : ?Text;
    stipendAmount : ?Float;
    ppoCandidate : Bool;
    performanceTier : ?Text;
    isActive : Bool;
  };

  public type CreateInternPayload = {
    name : Text;
    email : Text;
    phone : Text;
    space : Space;
    status : Status;
    experienceLevel : ExperienceLevel;
    joiningDate : Int;
    department : Text;
    adminNotes : Text;
    profilePicCid : ?Text;
  };

  public type UpdateInternPayload = {
    name : Text;
    email : Text;
    phone : Text;
    space : Space;
    status : Status;
    experienceLevel : ExperienceLevel;
    joiningDate : Int;
    department : Text;
    adminNotes : Text;
    profilePicCid : ?Text;
  };

  public type DocumentField = {
    #offerLetterSent;
    #offerLetterOpened;
    #certificateSent;
    #certificateOpened;
    #completionLetterSent;
    #completionLetterOpened;
  };

  public type Performance = {
    id : Text;
    internId : Text;
    month : Nat;
    year : Nat;
    taskScore : Float;
    attendanceScore : Float;
    communicationScore : Float;
    initiativeScore : Float;
    overallScore : Float;
    adminNotes : Text;
    createdAt : Int;
  };

  public type CreatePerformancePayload = {
    internId : Text;
    month : Nat;
    year : Nat;
    taskScore : Float;
    attendanceScore : Float;
    communicationScore : Float;
    initiativeScore : Float;
    overallScore : Float;
    adminNotes : Text;
  };

  public type UpdatePerformancePayload = {
    month : Nat;
    year : Nat;
    taskScore : Float;
    attendanceScore : Float;
    communicationScore : Float;
    initiativeScore : Float;
    overallScore : Float;
    adminNotes : Text;
  };

  public type Activity = {
    id : Text;
    internId : Text;
    action : Text;
    details : Text;
    timestamp : Int;
    performedBy : Text;
  };

  public type DashboardStats = {
    totalInterns : Nat;
    activeInterns : Nat;
    orgCount : Nat;
    marketingCount : Nat;
    learningCount : Nat;
    documentsSentThisMonth : Nat;
    avgPerformance : Float;
  };

  public type ListInternsFilter = {
    space : ?Space;
    status : ?Status;
  };

  // -------------------------------------------------------
  // Document versioning & records (V3.5)
  // -------------------------------------------------------

  public type DocumentVersion = {
    id            : Text;
    docType       : Text;
    version       : Text;       // e.g. "1.0", "1.1", "2.0"
    generatedAt   : Int;
    generatedBy   : Text;       // username
    approvalStatus : Text;      // "Pending" | "Approved" | "Rejected"
    notes         : Text;
  };

  /// category: "Employment" | "Progress" | "Certificate" | "ProjectFile"
  public type DocumentRecord = {
    docId          : Text;
    internId       : Text;
    category       : Text;
    docType        : Text;
    fileName       : Text;
    currentVersion : Text;
    versions       : [DocumentVersion];
    isArchived     : Bool;
  };

  // -------------------------------------------------------
  // Project participation (V3.5)
  // -------------------------------------------------------

  /// status: "Pending" | "In Progress" | "Completed"
  public type ProjectMilestone = {
    id          : Text;
    name        : Text;
    status      : Text;     // "Pending" | "In Progress" | "Completed"
    completedAt : ?Int;
  };

  /// status: "Active" | "Completed" | "Paused"
  public type ProjectParticipation = {
    id               : Text;
    internId         : Text;
    projectName      : Text;
    role             : Text;
    startDate        : Text;    // ISO date
    status           : Text;    // "Active" | "Completed" | "Paused"
    milestones       : [ProjectMilestone];
    deliverables     : [Text];
    completionPercent : Nat;
  };

  // -------------------------------------------------------
  // Composite performance score (V3.5)
  // -------------------------------------------------------

  public type CompositePerformanceScore = {
    internId              : Text;
    productivityScore     : Nat;   // 0-100: task completion rate + deadline adherence
    communicationScore    : Nat;   // 0-100: daily note submission frequency
    learningScore         : Nat;   // 0-100: submission approval rate
    attendanceScore       : Nat;   // 0-100: meeting attendance rate
    overallScore          : Nat;   // weighted average
    computedAt            : Int;
    improvementSuggestions : [Text];
  };

};
