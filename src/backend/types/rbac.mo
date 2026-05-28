module {

  public type Role = {
    #superAdmin;
    #admin;
    #manager;
    #hr;
    #sales;
    #marketing;
    #finance;
    #operations;
    #viewer;
  };

  public type UserAccount = {
    id : Text;
    username : Text;
    passwordHash : Text;
    role : Role;
    spaces : [Text];
    isActive : Bool;
    createdAt : Int;
    displayName : Text;
  };

  public type AuditEvent = {
    id : Text;
    timestamp : Int;
    actorId : Text;
    actorRole : Text;
    action : Text;
    resourceType : Text;
    resourceId : Text;
    beforeState : ?Text;
    afterState : ?Text;
    ipAddress : ?Text;
  };

  public type ApprovalStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type ApprovalRequest = {
    id : Text;
    requesterId : Text;
    requesterRole : Text;
    actionType : Text;
    resourceType : Text;
    resourceId : Text;
    requestPayload : Text;
    status : ApprovalStatus;
    approverId : ?Text;
    createdAt : Int;
    resolvedAt : ?Int;
    notes : ?Text;
  };

};
