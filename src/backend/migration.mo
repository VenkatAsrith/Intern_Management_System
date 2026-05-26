import Map "mo:core/Map";
import List "mo:core/List";
import ClientTypes "types/clients";

module {

  // ---------------------------------------------------------------------------
  // Old type definitions (inline — do NOT import from .old/)
  // ---------------------------------------------------------------------------

  type OldClientStatus = {
    #leadCaptured;
    #contacted;
    #discoveryCallDone;
    #proposalSent;
    #negotiation;
    #closedWon;
    #closedLost;
    #onHold;
  };

  type OldPriorityLevel = {
    #low;
    #medium;
    #high;
    #urgent;
  };

  // Old ActivityType had only 8 constructors (new adds quickCall/quickMeeting/quickEmail)
  // The new ActivityType is a supertype, so old records are directly assignable.
  // We alias the new type here so migration compiles without re-declaring it.
  type OldActivityType = {
    #statusChange;
    #noteAdded;
    #whatsappMessage;
    #callScheduled;
    #proposalUploaded;
    #invoiceGenerated;
    #documentShared;
    #commentAdded;
  };

  type OldPaymentStatus = {
    #pending;
    #paid;
    #overdue;
    #cancelled;
  };

  type OldStatusHistoryEntry = {
    status : OldClientStatus;
    timestamp : Int;
    adminName : Text;
    note : Text;
  };

  type OldClient = {
    id : Text;
    companyName : Text;
    contactPersonName : Text;
    designation : Text;
    email : Text;
    phone : Text;
    whatsappNumber : Text;
    website : Text;
    industryType : Text;
    companySize : Text;
    location : Text;
    gstNumber : ?Text;
    serviceInterested : Text;
    dealValue : Float;
    leadSource : Text;
    priorityLevel : OldPriorityLevel;
    assignedTeamMember : Text;
    followUpDate : ?Int;
    nextMeetingDate : ?Int;
    currentStatus : OldClientStatus;
    statusHistory : [OldStatusHistoryEntry];
    closedReason : ?Text;
    lastActivityDate : ?Int;
    pipelineValue : ?Float;
    createdAt : Int;
    updatedAt : Int;
    createdBy : Text;
  };

  type OldClientActivity = {
    id : Text;
    clientId : Text;
    activityType : OldActivityType;
    description : Text;
    timestamp : Int;
    adminName : Text;
    metadata : ?Text;
  };

  type OldClientComment = {
    id : Text;
    clientId : Text;
    content : Text;
    authorName : Text;
    timestamp : Int;
    isPinned : Bool;
    parentId : ?Text;
  };

  type OldInvoiceLineItem = {
    description : Text;
    quantity : Float;
    rate : Float;
    amount : Float;
  };

  type OldInvoice = {
    id : Text;
    clientId : Text;
    invoiceNumber : Text;
    lineItems : [OldInvoiceLineItem];
    subtotal : Float;
    tax : Float;
    total : Float;
    paymentStatus : OldPaymentStatus;
    createdAt : Int;
    createdBy : Text;
    notes : ?Text;
  };

  // ---------------------------------------------------------------------------
  // Old stable-state types for dropped domains
  // ---------------------------------------------------------------------------

  type OldTaskStatus = {
    #draft;
    #submitted;
    #underReview;
    #approved;
    #revisionRequested;
  };

  type OldTaskPriority = {
    #critical;
    #high;
    #medium;
    #low;
  };

  type OldSprint = {
    id : Text;
    title : Text;
    startDate : Text;
    endDate : Text;
    weekDuration : Nat;
    createdAt : Int;
  };

  type OldTask = {
    id : Text;
    title : Text;
    description : Text;
    assignedTo : Text;
    assignedBy : Text;
    priority : OldTaskPriority;
    status : OldTaskStatus;
    dueDate : Text;
    estimatedHours : Float;
    actualHours : Float;
    tags : [Text];
    sprintId : ?Text;
    attachments : [Text];
    createdAt : Int;
    updatedAt : Int;
    reviewNotes : Text;
  };

  type OldDayType = { #working; #holiday; #leave; #halfDay };
  type OldCheckInMethod = { #qrCode; #manual };

  type OldAttendanceRecord = {
    id : Text;
    internId : Text;
    date : Text;
    checkInTime : ?Text;
    checkOutTime : ?Text;
    method : OldCheckInMethod;
    sessionDuration : ?Float;
    isLate : Bool;
    dayType : OldDayType;
    notes : Text;
    createdAt : Int;
  };

  type OldLeaveType = { #casual; #sick; #compensatory; #lop };
  type OldLeaveStatus = { #pending; #approved; #rejected };

  type OldLeaveRequest = {
    id : Text;
    internId : Text;
    leaveType : OldLeaveType;
    startDate : Text;
    endDate : Text;
    reason : Text;
    status : OldLeaveStatus;
    reviewedBy : ?Text;
    reviewedAt : ?Int;
    createdAt : Int;
  };

  type OldQRToken = {
    token : Text;
    expiresAt : Int;
    createdAt : Int;
  };

  type OldLessonType = { #video; #article; #quiz; #assignment };
  type OldLessonCompletionStatus = { #notStarted; #inProgress; #completed };

  type OldProgram = { id : Text; title : Text; description : Text; createdAt : Int };
  type OldCourse = { id : Text; programId : Text; title : Text; description : Text; thumbnail : ?Text; createdAt : Int };
  type OldCourseModule = { id : Text; courseId : Text; title : Text; order : Nat; createdAt : Int };

  type OldLesson = {
    id : Text;
    moduleId : Text;
    title : Text;
    lessonType : OldLessonType;
    content : Text;
    videoUrl : ?Text;
    order : Nat;
    createdAt : Int;
  };

  type OldQuizQuestion = {
    id : Text;
    lessonId : Text;
    question : Text;
    questionType : Text;
    options : [Text];
    correctAnswer : Text;
    order : Nat;
  };

  type OldCourseAssignment = {
    id : Text;
    courseId : Text;
    internId : Text;
    deadline : ?Text;
    assignedAt : Int;
  };

  type OldLessonProgress = {
    id : Text;
    lessonId : Text;
    internId : Text;
    status : OldLessonCompletionStatus;
    completedAt : ?Int;
  };

  type OldQuizAttempt = {
    id : Text;
    lessonId : Text;
    internId : Text;
    answers : [Text];
    score : Float;
    attemptedAt : Int;
  };

  type OldAssignmentSubmission = {
    id : Text;
    lessonId : Text;
    internId : Text;
    submissionLink : Text;
    grade : ?Float;
    feedback : ?Text;
    submittedAt : Int;
    gradedAt : ?Int;
  };

  type OldLMSCertificate = {
    id : Text;
    courseId : Text;
    internId : Text;
    issuedAt : Int;
  };

  // ---------------------------------------------------------------------------
  // OldActor — exact stable fields from the previous canister version
  // ---------------------------------------------------------------------------

  type OldActor = {
    // Clients domain
    clients : Map.Map<Text, OldClient>;
    clientActivities : List.List<OldClientActivity>;
    clientComments : Map.Map<Text, OldClientComment>;
    invoices : Map.Map<Text, OldInvoice>;
    clientIdCounter : { var n : Nat };
    invoiceCounter : { var n : Nat };
    // Tasks domain (retired)
    tasks : Map.Map<Text, OldTask>;
    sprints : Map.Map<Text, OldSprint>;
    _taskIdCounter : { var n : Nat };
    // Attendance domain (retired)
    attendanceRecords : Map.Map<Text, OldAttendanceRecord>;
    leaveRequests : Map.Map<Text, OldLeaveRequest>;
    qrTokens : Map.Map<Text, OldQRToken>;
    _attendanceIdCounter : { var n : Nat };
    // LMS domain (retired)
    lmsPrograms : Map.Map<Text, OldProgram>;
    lmsCourses : Map.Map<Text, OldCourse>;
    lmsModules : Map.Map<Text, OldCourseModule>;
    lmsLessons : Map.Map<Text, OldLesson>;
    quizQuestions : Map.Map<Text, OldQuizQuestion>;
    courseAssignments : Map.Map<Text, OldCourseAssignment>;
    lessonProgress : Map.Map<Text, OldLessonProgress>;
    quizAttempts : Map.Map<Text, OldQuizAttempt>;
    assignmentSubmissions : Map.Map<Text, OldAssignmentSubmission>;
    lmsCertificates : Map.Map<Text, OldLMSCertificate>;
    _lmsIdCounter : { var n : Nat };
  };

  // ---------------------------------------------------------------------------
  // NewActor — only the fields that are NEW or CHANGED vs old
  // Fields that are unchanged and stable-compatible are inherited automatically.
  // We only need to produce the client/invoice maps (shape changed) and explicitly
  // consume the retired domain fields so the compiler knows they are intentionally dropped.
  // ---------------------------------------------------------------------------

  type NewActor = {
    clients : Map.Map<Text, ClientTypes.Client>;
    clientActivities : List.List<ClientTypes.ClientActivity>;
    invoices : Map.Map<Text, ClientTypes.Invoice>;
  };

  // ---------------------------------------------------------------------------
  // Migration helpers
  // ---------------------------------------------------------------------------

  func migrateClientStatus(s : OldClientStatus) : ClientTypes.ClientStatus {
    switch s {
      case (#leadCaptured)      #leadCaptured;
      case (#contacted)         #contacted;
      case (#discoveryCallDone) #discoveryCallDone;
      case (#proposalSent)      #proposalSent;
      case (#negotiation)       #negotiation;
      case (#closedWon)         #closedWon;
      case (#closedLost)        #closedLost;
      case (#onHold)            #onHold;
    }
  };

  func migratePriority(p : OldPriorityLevel) : ClientTypes.PriorityLevel {
    switch p {
      case (#low)    #low;
      case (#medium) #medium;
      case (#high)   #high;
      case (#urgent) #urgent;
    }
  };

  func migrateStatusHistory(entries : [OldStatusHistoryEntry]) : [ClientTypes.StatusHistoryEntry] {
    entries.map<OldStatusHistoryEntry, ClientTypes.StatusHistoryEntry>(
      func(e) {
        {
          status    = migrateClientStatus(e.status);
          timestamp = e.timestamp;
          adminName = e.adminName;
          note      = e.note;
        }
      }
    )
  };

  func migrateActivityType(a : OldActivityType) : ClientTypes.ActivityType {
    // Old 8-variant type maps directly; no stale variants exist.
    // New type adds quickCall/quickMeeting/quickEmail but old records only have the 8 original ones.
    switch a {
      case (#statusChange)      #statusChange;
      case (#noteAdded)         #noteAdded;
      case (#whatsappMessage)   #whatsappMessage;
      case (#callScheduled)     #callScheduled;
      case (#proposalUploaded)  #proposalUploaded;
      case (#invoiceGenerated)  #invoiceGenerated;
      case (#documentShared)    #documentShared;
      case (#commentAdded)      #commentAdded;
    }
  };

  func migratePaymentStatus(p : OldPaymentStatus) : ClientTypes.PaymentStatus {
    switch p {
      case (#pending)   #pending;
      case (#paid)      #paid;
      case (#overdue)   #overdue;
      case (#cancelled) #cancelled;
    }
  };

  func migrateClient(old : OldClient) : ClientTypes.Client {
    {
      id                 = old.id;
      companyName        = old.companyName;
      contactPersonName  = old.contactPersonName;
      designation        = old.designation;
      email              = old.email;
      phone              = old.phone;
      whatsappNumber     = old.whatsappNumber;
      website            = old.website;
      industryType       = old.industryType;
      companySize        = old.companySize;
      location           = old.location;
      gstNumber          = old.gstNumber;
      serviceInterested  = old.serviceInterested;
      dealValue          = old.dealValue;
      leadSource         = old.leadSource;
      priorityLevel      = migratePriority(old.priorityLevel);
      assignedTeamMember = old.assignedTeamMember;
      followUpDate       = old.followUpDate;
      nextMeetingDate    = old.nextMeetingDate;
      currentStatus      = migrateClientStatus(old.currentStatus);
      statusHistory      = migrateStatusHistory(old.statusHistory);
      closedReason       = old.closedReason;
      lastActivityDate   = old.lastActivityDate;
      pipelineValue      = old.pipelineValue;
      // New CRM upgrade fields — defaults
      contacts           = [];
      leadScore          = 0;
      dealProbability    = 10;
      healthScore        = 0;
      engagementScore    = 0;
      tags               = [];
      source             = "";
      customFields       = [];
      lastActivity       = null;
      activityCount      = 0;
      proposalStatus     = null;
      proposalExpiry     = null;
      proposalVersion    = 0;
      wonLostReason      = null;
      closedAt           = null;
      createdAt          = old.createdAt;
      updatedAt          = old.updatedAt;
      createdBy          = old.createdBy;
    }
  };

  func migrateActivity(old : OldClientActivity) : ClientTypes.ClientActivity {
    {
      id           = old.id;
      clientId     = old.clientId;
      activityType = migrateActivityType(old.activityType);
      description  = old.description;
      timestamp    = old.timestamp;
      adminName    = old.adminName;
      metadata     = old.metadata;
    }
  };

  func migrateInvoice(old : OldInvoice) : ClientTypes.Invoice {
    // Map OldInvoiceLineItem → new (same shape)
    let lineItems = old.lineItems.map(
      func(li) {
        {
          description = li.description;
          quantity    = li.quantity;
          rate        = li.rate;
          amount      = li.amount;
        }
      }
    );
    {
      id            = old.id;
      clientId      = old.clientId;
      invoiceNumber = old.invoiceNumber;
      lineItems;
      subtotal      = old.subtotal;
      tax           = old.tax;
      total         = old.total;
      paymentStatus = migratePaymentStatus(old.paymentStatus);
      // New upgrade fields — defaults
      status        = #draft;
      dueDate       = null;
      amountPaid    = 0;
      createdAt     = old.createdAt;
      createdBy     = old.createdBy;
      notes         = old.notes;
    }
  };

  // ---------------------------------------------------------------------------
  // run — the migration entry point
  // ---------------------------------------------------------------------------

  public func run(old : OldActor) : NewActor {
    // Migrate clients map
    let clients = old.clients.map<Text, OldClient, ClientTypes.Client>(
      func(_, c) { migrateClient(c) }
    );

    // Migrate clientActivities list
    let clientActivities = old.clientActivities.map<OldClientActivity, ClientTypes.ClientActivity>(
      func(a) { migrateActivity(a) }
    );

    // Migrate invoices map
    let invoices = old.invoices.map<Text, OldInvoice, ClientTypes.Invoice>(
      func(_, inv) { migrateInvoice(inv) }
    );

    // Dropped: tasks, sprints, _taskIdCounter,
    //          attendanceRecords, leaveRequests, qrTokens, _attendanceIdCounter,
    //          lmsPrograms, lmsCourses, lmsModules, lmsLessons,
    //          quizQuestions, courseAssignments, lessonProgress,
    //          quizAttempts, assignmentSubmissions, lmsCertificates, _lmsIdCounter
    ignore (
      old.tasks,
      old.sprints,
      old._taskIdCounter,
      old.attendanceRecords,
      old.leaveRequests,
      old.qrTokens,
      old._attendanceIdCounter,
      old.lmsPrograms,
      old.lmsCourses,
      old.lmsModules,
      old.lmsLessons,
      old.quizQuestions,
      old.courseAssignments,
      old.lessonProgress,
      old.quizAttempts,
      old.assignmentSubmissions,
      old.lmsCertificates,
      old._lmsIdCounter
    );

    { clients; clientActivities; invoices }
  };

};
