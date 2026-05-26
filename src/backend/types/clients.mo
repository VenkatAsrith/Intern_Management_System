import Debug "mo:core/Debug";

module {

  // --- Status variants ---

  public type ClientStatus = {
    #leadCaptured;
    #contacted;
    #discoveryCallDone;
    #proposalSent;
    #negotiation;
    #closedWon;
    #closedLost;
    #onHold;
  };

  public type PriorityLevel = {
    #low;
    #medium;
    #high;
    #urgent;
  };

  public type ActivityType = {
    #statusChange;
    #noteAdded;
    #whatsappMessage;
    #callScheduled;
    #proposalUploaded;
    #invoiceGenerated;
    #documentShared;
    #commentAdded;
    #quickCall;
    #quickMeeting;
    #quickEmail;
  };

  public type PaymentStatus = {
    #pending;
    #paid;
    #overdue;
    #cancelled;
  };

  public type InvoicePaymentStatus = {
    #draft;
    #sent;
    #viewed;
    #paid;
    #overdue;
    #partial;
  };

  // --- Core records ---

  public type StatusHistoryEntry = {
    status : ClientStatus;
    timestamp : Int;
    adminName : Text;
    note : Text;
  };

  // Multiple contacts per company
  public type ContactPerson = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    role : Text;
    isPrimary : Bool;
    addedAt : Int;
  };

  public type Client = {
    id : Text;
    // Basic info
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
    // Business info
    serviceInterested : Text;
    dealValue : Float;
    leadSource : Text;
    priorityLevel : PriorityLevel;
    assignedTeamMember : Text;
    followUpDate : ?Int;
    nextMeetingDate : ?Int;
    // Pipeline
    currentStatus : ClientStatus;
    statusHistory : [StatusHistoryEntry];
    // Closed deal metadata
    closedReason : ?Text;
    lastActivityDate : ?Int;
    pipelineValue : ?Float;
    // CRM upgrade fields
    contacts : [ContactPerson];
    leadScore : Nat;
    dealProbability : Nat;
    healthScore : Nat;
    engagementScore : Nat;
    tags : [Text];
    source : Text;
    customFields : [(Text, Text)];
    lastActivity : ?Int;
    activityCount : Nat;
    proposalStatus : ?Text;
    proposalExpiry : ?Int;
    proposalVersion : Nat;
    wonLostReason : ?Text;
    closedAt : ?Int;
    // Meta
    createdAt : Int;
    updatedAt : Int;
    createdBy : Text;
  };

  public type ClientActivity = {
    id : Text;
    clientId : Text;
    activityType : ActivityType;
    description : Text;
    timestamp : Int;
    adminName : Text;
    metadata : ?Text;
  };

  public type ClientComment = {
    id : Text;
    clientId : Text;
    content : Text;
    authorName : Text;
    timestamp : Int;
    isPinned : Bool;
    parentId : ?Text;
  };

  public type InvoiceLineItem = {
    description : Text;
    quantity : Float;
    rate : Float;
    amount : Float;
  };

  public type Invoice = {
    id : Text;
    clientId : Text;
    invoiceNumber : Text;
    lineItems : [InvoiceLineItem];
    subtotal : Float;
    tax : Float;
    total : Float;
    paymentStatus : PaymentStatus;
    // Upgraded invoice fields
    status : InvoicePaymentStatus;
    dueDate : ?Int;
    amountPaid : Nat;
    createdAt : Int;
    createdBy : Text;
    notes : ?Text;
  };

  // --- Analytics ---

  public type AnalyticsData = {
    totalPipeline : Nat;
    weightedForecast : Nat;
    winRate : Nat;
    avgDealCycleDays : Nat;
    conversionRates : [(Text, Nat)];
    wonLostBreakdown : [(Text, Nat)];
  };

  // --- Request types ---

  public type CreateClientRequest = {
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
    priorityLevel : PriorityLevel;
    assignedTeamMember : Text;
    followUpDate : ?Int;
    nextMeetingDate : ?Int;
    tags : [Text];
    source : Text;
  };

  public type UpdateClientRequest = {
    companyName : ?Text;
    contactPersonName : ?Text;
    designation : ?Text;
    email : ?Text;
    phone : ?Text;
    whatsappNumber : ?Text;
    website : ?Text;
    industryType : ?Text;
    companySize : ?Text;
    location : ?Text;
    gstNumber : ?Text;
    serviceInterested : ?Text;
    dealValue : ?Float;
    leadSource : ?Text;
    priorityLevel : ?PriorityLevel;
    assignedTeamMember : ?Text;
    followUpDate : ?Int;
    nextMeetingDate : ?Int;
    tags : ?[Text];
    source : ?Text;
  };

  public type MonthlyAnalyticsEntry = {
    month : Text;
    approved : Nat;
    rejected : Nat;
    newLeads : Nat;
  };

  public type ClientAnalytics = {
    totalClients : Nat;
    activeLeads : Nat;
    approvedDeals : Nat;
    rejectedLeads : Nat;
    revenuePipeline : Float;
    monthlyData : [MonthlyAnalyticsEntry];
  };

};
