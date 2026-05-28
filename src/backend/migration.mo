import Map "mo:core/Map";

module {

  // ============================================================
  // OLD type definitions (copied from .old/src/backend/)
  // ============================================================

  type OldSessionInfo = {
    username    : Text;
    displayName : Text;
  };

  type OldNotificationType = {
    #taskAssigned;
    #stageChanged;
    #invoiceDue;
    #attendanceAnomaly;
    #overdueFollowUp;
    #taskOverdue;
    #leaveApproved;
    #leaveRejected;
    #announcement;
  };

  type OldNotification = {
    id               : Text;
    userId           : Text;
    notificationType : OldNotificationType;
    title            : Text;
    message          : Text;
    isRead           : Bool;
    relatedId        : ?Text;
    createdAt        : Int;
  };

  type OldAnnouncement = {
    id        : Text;
    title     : Text;
    content   : Text;
    createdBy : Text;
    createdAt : Int;
    isActive  : Bool;
  };

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

  type OldActivityType = {
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

  type OldStatusHistoryEntry = {
    status    : OldClientStatus;
    timestamp : Int;
    adminName : Text;
    note      : Text;
  };

  type OldContactPerson = {
    id        : Text;
    name      : Text;
    email     : Text;
    phone     : Text;
    role      : Text;
    isPrimary : Bool;
    addedAt   : Int;
  };

  type OldClient = {
    id                  : Text;
    companyName         : Text;
    contactPersonName   : Text;
    designation         : Text;
    email               : Text;
    phone               : Text;
    whatsappNumber      : Text;
    website             : Text;
    industryType        : Text;
    companySize         : Text;
    location            : Text;
    gstNumber           : ?Text;
    serviceInterested   : Text;
    dealValue           : Float;
    leadSource          : Text;
    priorityLevel       : OldPriorityLevel;
    assignedTeamMember  : Text;
    followUpDate        : ?Int;
    nextMeetingDate     : ?Int;
    currentStatus       : OldClientStatus;
    statusHistory       : [OldStatusHistoryEntry];
    closedReason        : ?Text;
    lastActivityDate    : ?Int;
    pipelineValue       : ?Float;
    contacts            : [OldContactPerson];
    leadScore           : Nat;
    dealProbability     : Nat;
    healthScore         : Nat;
    engagementScore     : Nat;
    tags                : [Text];
    source              : Text;
    customFields        : [(Text, Text)];
    lastActivity        : ?Int;
    activityCount       : Nat;
    proposalStatus      : ?Text;
    proposalExpiry      : ?Int;
    proposalVersion     : Nat;
    wonLostReason       : ?Text;
    closedAt            : ?Int;
    createdAt           : Int;
    updatedAt           : Int;
    createdBy           : Text;
  };

  // ============================================================
  // NEW type definitions (matching current types)
  // ============================================================

  type NewSessionInfo = {
    username    : Text;
    displayName : Text;
    role        : ?Text;
    permissions : ?[Text];
  };

  type NewNotificationType = {
    #taskAssigned;
    #stageChanged;
    #invoiceDue;
    #attendanceAnomaly;
    #overdueFollowUp;
    #taskOverdue;
    #leaveApproved;
    #leaveRejected;
    #announcement;
    #proposalExpiring;
    #staleDeal;
    #invoiceOverdue;
    #dealSLABreached;
    #followUpOverdue;
    #proposalExpiringUrgent;
    #newClientAssigned;
    #internDocumentSent;
    #announcementPosted;
    #dealClosedWon;
    #healthScoreLow;
    #approvalRequestCreated;
  };

  type NewNotificationPriority = {
    #critical;
    #high;
    #medium;
    #low;
  };

  type NewNotification = {
    id               : Text;
    userId           : Text;
    notificationType : NewNotificationType;
    title            : Text;
    message          : Text;
    isRead           : Bool;
    relatedId        : ?Text;
    createdAt        : Int;
    priority         : ?NewNotificationPriority;
  };

  type NewAnnouncement = {
    id           : Text;
    title        : Text;
    content      : Text;
    createdBy    : Text;
    createdAt    : Int;
    isActive     : Bool;
    targetSpaces : ?[Text];
    expiresAt    : ?Int;
  };

  type NewClientStatus = {
    #leadCaptured;
    #contacted;
    #discoveryCallDone;
    #proposalSent;
    #negotiation;
    #closedWon;
    #closedLost;
    #onHold;
  };

  type NewPriorityLevel = {
    #low;
    #medium;
    #high;
    #urgent;
  };

  type NewActivityType = {
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

  type NewStatusHistoryEntry = {
    status    : NewClientStatus;
    timestamp : Int;
    adminName : Text;
    note      : Text;
  };

  type NewContactPerson = {
    id        : Text;
    name      : Text;
    email     : Text;
    phone     : Text;
    role      : Text;
    isPrimary : Bool;
    addedAt   : Int;
  };

  type NewSlaStatus = {
    #notBreached;
    #breached;
  };

  type NewClient = {
    id                  : Text;
    companyName         : Text;
    contactPersonName   : Text;
    designation         : Text;
    email               : Text;
    phone               : Text;
    whatsappNumber      : Text;
    website             : Text;
    industryType        : Text;
    companySize         : Text;
    location            : Text;
    gstNumber           : ?Text;
    serviceInterested   : Text;
    dealValue           : Float;
    leadSource          : Text;
    priorityLevel       : NewPriorityLevel;
    assignedTeamMember  : Text;
    followUpDate        : ?Int;
    nextMeetingDate     : ?Int;
    currentStatus       : NewClientStatus;
    statusHistory       : [NewStatusHistoryEntry];
    closedReason        : ?Text;
    lastActivityDate    : ?Int;
    pipelineValue       : ?Float;
    contacts            : [NewContactPerson];
    leadScore           : Nat;
    dealProbability     : Nat;
    healthScore         : Nat;
    engagementScore     : Nat;
    tags                : [Text];
    source              : Text;
    customFields        : [(Text, Text)];
    lastActivity        : ?Int;
    activityCount       : Nat;
    proposalStatus      : ?Text;
    proposalExpiry      : ?Int;
    proposalVersion     : Nat;
    wonLostReason       : ?Text;
    closedAt            : ?Int;
    stageEnteredAt      : ?Int;
    isStale             : ?Bool;
    slaStatus           : ?NewSlaStatus;
    slaBreachedAt       : ?Int;
    createdAt           : Int;
    updatedAt           : Int;
    createdBy           : Text;
  };

  // ============================================================
  // OldActor / NewActor stable state shapes
  // ============================================================

  public type OldActor = {
    sessions      : Map.Map<Text, OldSessionInfo>;
    notifications : Map.Map<Text, OldNotification>;
    announcements : Map.Map<Text, OldAnnouncement>;
    clients       : Map.Map<Text, OldClient>;
  };

  public type NewActor = {
    sessions      : Map.Map<Text, NewSessionInfo>;
    notifications : Map.Map<Text, NewNotification>;
    announcements : Map.Map<Text, NewAnnouncement>;
    clients       : Map.Map<Text, NewClient>;
  };

  // ============================================================
  // Migration helpers
  // ============================================================

  func migrateNotificationType(old : OldNotificationType) : NewNotificationType {
    switch old {
      case (#taskAssigned)      #taskAssigned;
      case (#stageChanged)      #stageChanged;
      case (#invoiceDue)        #invoiceDue;
      case (#attendanceAnomaly) #attendanceAnomaly;
      case (#overdueFollowUp)   #overdueFollowUp;
      case (#taskOverdue)       #taskOverdue;
      case (#leaveApproved)     #leaveApproved;
      case (#leaveRejected)     #leaveRejected;
      case (#announcement)      #announcement;
    }
  };

  func migrateNotification(old : OldNotification) : NewNotification {
    {
      id               = old.id;
      userId           = old.userId;
      notificationType = migrateNotificationType(old.notificationType);
      title            = old.title;
      message          = old.message;
      isRead           = old.isRead;
      relatedId        = old.relatedId;
      createdAt        = old.createdAt;
      priority         = null;
    }
  };

  func migrateAnnouncement(old : OldAnnouncement) : NewAnnouncement {
    {
      id           = old.id;
      title        = old.title;
      content      = old.content;
      createdBy    = old.createdBy;
      createdAt    = old.createdAt;
      isActive     = old.isActive;
      targetSpaces = null;
      expiresAt    = null;
    }
  };

  func migrateClient(old : OldClient) : NewClient {
    {
      id                  = old.id;
      companyName         = old.companyName;
      contactPersonName   = old.contactPersonName;
      designation         = old.designation;
      email               = old.email;
      phone               = old.phone;
      whatsappNumber      = old.whatsappNumber;
      website             = old.website;
      industryType        = old.industryType;
      companySize         = old.companySize;
      location            = old.location;
      gstNumber           = old.gstNumber;
      serviceInterested   = old.serviceInterested;
      dealValue           = old.dealValue;
      leadSource          = old.leadSource;
      priorityLevel       = old.priorityLevel;
      assignedTeamMember  = old.assignedTeamMember;
      followUpDate        = old.followUpDate;
      nextMeetingDate     = old.nextMeetingDate;
      currentStatus       = old.currentStatus;
      statusHistory       = old.statusHistory;
      closedReason        = old.closedReason;
      lastActivityDate    = old.lastActivityDate;
      pipelineValue       = old.pipelineValue;
      contacts            = old.contacts;
      leadScore           = old.leadScore;
      dealProbability     = old.dealProbability;
      healthScore         = old.healthScore;
      engagementScore     = old.engagementScore;
      tags                = old.tags;
      source              = old.source;
      customFields        = old.customFields;
      lastActivity        = old.lastActivity;
      activityCount       = old.activityCount;
      proposalStatus      = old.proposalStatus;
      proposalExpiry      = old.proposalExpiry;
      proposalVersion     = old.proposalVersion;
      wonLostReason       = old.wonLostReason;
      closedAt            = old.closedAt;
      stageEnteredAt      = null;
      isStale             = null;
      slaStatus           = null;
      slaBreachedAt       = null;
      createdAt           = old.createdAt;
      updatedAt           = old.updatedAt;
      createdBy           = old.createdBy;
    }
  };

  // ============================================================
  // Migration entry point
  // ============================================================

  public func run(old : OldActor) : NewActor {
    let newSessions = old.sessions.map<Text, OldSessionInfo, NewSessionInfo>(
      func(_k, s) {
        {
          username    = s.username;
          displayName = s.displayName;
          role        = null;
          permissions = null;
        }
      }
    );

    let newNotifications = old.notifications.map<Text, OldNotification, NewNotification>(
      func(_k, n) { migrateNotification(n) }
    );

    let newAnnouncements = old.announcements.map<Text, OldAnnouncement, NewAnnouncement>(
      func(_k, a) { migrateAnnouncement(a) }
    );

    let newClients = old.clients.map<Text, OldClient, NewClient>(
      func(_k, c) { migrateClient(c) }
    );

    {
      sessions      = newSessions;
      notifications = newNotifications;
      announcements = newAnnouncements;
      clients       = newClients;
    }
  };

};
