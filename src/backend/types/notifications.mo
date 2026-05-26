import Debug "mo:core/Debug";

module {

  public type NotificationType = {
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

  public type Notification = {
    id : Text;
    userId : Text;
    notificationType : NotificationType;
    title : Text;
    message : Text;
    isRead : Bool;
    relatedId : ?Text;
    createdAt : Int;
  };

  public type Announcement = {
    id : Text;
    title : Text;
    content : Text;
    createdBy : Text;
    createdAt : Int;
    isActive : Bool;
  };

};
