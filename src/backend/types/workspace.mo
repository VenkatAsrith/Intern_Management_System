import Debug "mo:core/Debug";

module {

  // -------------------------------------------------------
  // Task domain
  // -------------------------------------------------------

  /// Allowed task-status strings:
  /// "Pending" | "In Progress" | "Under Review" | "Completed" | "Rejected" | "Rework Needed"
  public type Task = {
    id : Text;
    title : Text;
    description : Text;
    priority : Text; // "Low" | "Medium" | "High" | "Critical"
    deadline : ?Int;
    assignedInternId : Text; // intern id; empty string means self-created unassigned
    teamSpace : Text; // "Org" | "Marketing" | "Learning"
    status : Text; // see allowed values above
    tags : [Text];
    createdBy : Text; // username of creator (admin or intern)
    createdAt : Int;
    updatedAt : Int;
  };

  public type CreateTaskPayload = {
    title : Text;
    description : Text;
    priority : Text;
    deadline : ?Int;
    assignedInternId : Text;
    teamSpace : Text;
    tags : [Text];
  };

  public type UpdateTaskPayload = {
    title : ?Text;
    description : ?Text;
    priority : ?Text;
    deadline : ?Int;
    assignedInternId : ?Text;
    teamSpace : ?Text;
    status : ?Text;
    tags : ?[Text];
  };

  // -------------------------------------------------------
  // Daily Notes domain
  // -------------------------------------------------------

  /// Allowed comment status strings: "open" | "approved" | "needs_clarification"
  public type NoteComment = {
    id : Text;
    authorId : Text; // username
    authorName : Text;
    content : Text;
    createdAt : Int;
    status : Text; // "open" | "approved" | "needs_clarification"
  };

  public type DailyNote = {
    id : Text;
    internId : Text;
    date : Text; // ISO date "YYYY-MM-DD"
    workedOn : Text;
    blockers : Text;
    progress : Text;
    learningUpdates : Text;
    createdAt : Int;
    adminComments : [NoteComment];
  };

  public type CreateDailyNotePayload = {
    internId : Text;
    date : Text;
    workedOn : Text;
    blockers : Text;
    progress : Text;
    learningUpdates : Text;
  };

  // -------------------------------------------------------
  // Channel Messaging domain
  // -------------------------------------------------------

  /// A channel scoped to a space; only members can see messages.
  public type Channel = {
    id : Text;
    name : Text;
    spaceId : Text; // "Org" | "Marketing" | "Learning"
    memberIds : [Text]; // usernames
    createdAt : Int;
    createdBy : Text;
  };

  public type ChannelMessage = {
    id : Text;
    channelId : Text;
    senderId : Text; // username
    senderName : Text;
    content : Text;
    mentions : [Text]; // usernames mentioned via @
    createdAt : Int;
  };

  // -------------------------------------------------------
  // Direct Messaging domain
  // -------------------------------------------------------

  public type DirectMessage = {
    id : Text;
    fromUserId : Text; // username
    toUserId : Text; // username
    content : Text;
    createdAt : Int;
    isRead : Bool;
  };

  // -------------------------------------------------------
  // Work Submission domain
  // -------------------------------------------------------

  /// Allowed status strings:
  /// "Pending" | "Approved" | "Rejected" | "Needs Revision"
  public type WorkSubmission = {
    id : Text;
    internId : Text;
    taskId : ?Text; // linked task, if any
    title : Text;
    description : Text;
    githubLink : ?Text;
    driveLink : ?Text;
    fileUrls : [Text];
    status : Text;
    adminFeedback : ?Text;
    reviewedBy : ?Text; // username
    createdAt : Int;
    reviewedAt : ?Int;
  };

  public type CreateSubmissionPayload = {
    internId : Text;
    taskId : ?Text;
    title : Text;
    description : Text;
    githubLink : ?Text;
    driveLink : ?Text;
    fileUrls : [Text];
  };

  // -------------------------------------------------------
  // Meeting & Session domain
  // -------------------------------------------------------

  /// Allowed type strings:
  /// "mentor" | "standup" | "review" | "training" | "other"
  public type Meeting = {
    id : Text;
    title : Text;
    meetingType : Text;
    scheduledAt : Int;
    durationMinutes : Nat;
    joinLink : ?Text;
    participantIds : [Text]; // usernames
    createdBy : Text;
    createdAt : Int;
    reminderSentAt : ?Int;
  };

  public type CreateMeetingPayload = {
    title : Text;
    meetingType : Text;
    scheduledAt : Int;
    durationMinutes : Nat;
    joinLink : ?Text;
    participantIds : [Text];
  };

  // -------------------------------------------------------
  // Internship Timeline / Milestones
  // -------------------------------------------------------

  /// Allowed milestoneType strings:
  /// "joined" | "project_assigned" | "milestone" | "certificate" | "completed"
  public type TimelineMilestone = {
    id : Text;
    internId : Text;
    title : Text;
    description : ?Text;
    completedAt : ?Int;
    milestoneType : Text;
    createdAt : Int;
  };

  // -------------------------------------------------------
  // Aggregate workspace view
  // -------------------------------------------------------

  public type WorkspaceData = {
    tasks : [Task];
    notes : [DailyNote];
    channelMessages : [ChannelMessage];
    directMessages : [DirectMessage];
    meetings : [Meeting];
    milestones : [TimelineMilestone];
    submissions : [WorkSubmission];
  };

};
