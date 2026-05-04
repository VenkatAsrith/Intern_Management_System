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

};
