import Debug "mo:core/Debug";

module {

  public type NotificationType = {
    // Existing variants
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
    // V2 event variants
    #followUpOverdue;
    #proposalExpiringUrgent;
    #newClientAssigned;
    #internDocumentSent;
    #announcementPosted;
    #dealClosedWon;
    #healthScoreLow;
    #approvalRequestCreated;
  };

  public type NotificationPriority = {
    #critical;
    #high;
    #medium;
    #low;
  };

  public type Notification = {
    id : Text;
    userId : Text;
    notificationType : NotificationType;
    title : Text;
    message : Text;
    isRead : Bool;
    relatedId : ?Text;
    createdAt : Int;
    priority : ?NotificationPriority;
  };

  public type Announcement = {
    id : Text;
    title : Text;
    content : Text;
    createdBy : Text;
    createdAt : Int;
    isActive : Bool;
    targetSpaces : ?[Text];
    expiresAt : ?Int;
  };

  public type NotificationPreference = {
    userId : Text;
    eventType : Text;
    digestEnabled : Bool;
    digestFrequency : { #immediate; #hourly; #daily };
  };

};
