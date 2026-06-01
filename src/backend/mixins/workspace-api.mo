import Map "mo:core/Map";
import Time "mo:core/Time";
import Auth "../lib/auth";
import WsLib "../lib/workspace";
import WsTypes "../types/workspace";
import NotifTypes "../types/notifications";

/// Public API mixin for the Workspace domain.
/// Receives all workspace state slices from main.mo.
mixin (
  tasks : Map.Map<Text, WsTypes.Task>,
  dailyNotes : Map.Map<Text, WsTypes.DailyNote>,
  channels : Map.Map<Text, WsTypes.Channel>,
  channelMessages : Map.Map<Text, WsTypes.ChannelMessage>,
  directMessages : Map.Map<Text, WsTypes.DirectMessage>,
  submissions : Map.Map<Text, WsTypes.WorkSubmission>,
  meetings : Map.Map<Text, WsTypes.Meeting>,
  milestones : Map.Map<Text, WsTypes.TimelineMilestone>,
  wsCounter : { var n : Nat },
  sessions : Map.Map<Text, Auth.SessionInfo>,
  notifications : Map.Map<Text, NotifTypes.Notification>,
  notifCounter : { var n : Nat },
) {

  // -------------------------------------------------------
  // Internal helpers
  // -------------------------------------------------------

  func isAdminSession(sessionToken : Text) : Bool {
    switch (Auth.getSessionRole(sessions, sessionToken)) {
      case (?(#superAdmin)) true;
      case (?(#admin))      true;
      case (?(#manager))    true;
      case (?(#hr))         true;
      case _                false;
    }
  };

  func wsAddNotification(userId : Text, title : Text, message : Text, relatedId : ?Text) {
    notifCounter.n += 1;
    let id = "notif-ws-" # Time.now().toText() # "-" # notifCounter.n.toText();
    let notif : NotifTypes.Notification = {
      id;
      userId;
      notificationType = #taskAssigned;
      title;
      message;
      isRead    = false;
      relatedId;
      createdAt = Time.now();
      priority  = ?(#medium);
    };
    notifications.add(id, notif);
  };

  // -------------------------------------------------------
  // Tasks
  // -------------------------------------------------------

  public func createTask(
    sessionToken : Text,
    payload : WsTypes.CreateTaskPayload,
  ) : async { #ok : WsTypes.Task; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    // Admins can assign to anyone; interns can only create tasks for themselves.
    if (not isAdminSession(sessionToken)) {
      if (payload.assignedInternId != username and payload.assignedInternId != "") {
        return #err("Interns may only create tasks for themselves");
      };
    };
    let task = WsLib.createTask(tasks, wsCounter, payload, username);
    // Notify the assignee if different from creator
    if (task.assignedInternId != "" and task.assignedInternId != username) {
      wsAddNotification(task.assignedInternId, "New Task Assigned", "You have been assigned: " # task.title, ?task.id);
    };
    #ok task;
  };

  public func updateTask(
    sessionToken : Text,
    id : Text,
    payload : WsTypes.UpdateTaskPayload,
  ) : async { #ok : WsTypes.Task; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    // Permission: admins can update any task; interns can only update their own.
    if (not isAdminSession(sessionToken)) {
      switch (tasks.get(id)) {
        case null { return #err("Task not found") };
        case (?t) {
          if (t.assignedInternId != username and t.createdBy != username) {
            return #err("Forbidden: not your task");
          };
        };
      };
    };
    switch (WsLib.updateTask(tasks, id, payload, username)) {
      case null  #err("Task not found");
      case (?t)  #ok t;
    }
  };

  public func deleteTask(
    sessionToken : Text,
    id : Text,
  ) : async { #ok : Bool; #err : Text } {
    ignore Auth.requireSession(sessions, sessionToken);
    if (not isAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can delete tasks");
    };
    #ok(WsLib.deleteTask(tasks, id));
  };

  public query func getTasksByIntern(
    sessionToken : Text,
    internId : Text,
  ) : async [WsTypes.Task] {
    ignore Auth.requireSession(sessions, sessionToken);
    WsLib.getTasksByIntern(tasks, internId);
  };

  public query func getTasksBySpace(
    sessionToken : Text,
    spaceId : Text,
  ) : async [WsTypes.Task] {
    ignore Auth.requireSession(sessions, sessionToken);
    WsLib.getTasksBySpace(tasks, spaceId);
  };

  public query func getAllTasks(
    sessionToken : Text,
  ) : async [WsTypes.Task] {
    ignore Auth.requireSession(sessions, sessionToken);
    WsLib.getAllTasks(tasks);
  };

  // -------------------------------------------------------
  // Daily Notes
  // -------------------------------------------------------

  public func createDailyNote(
    sessionToken : Text,
    payload : WsTypes.CreateDailyNotePayload,
  ) : async { #ok : WsTypes.DailyNote; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    // Interns can only write their own notes
    if (not isAdminSession(sessionToken)) {
      if (payload.internId != username) {
        return #err("Interns may only write their own daily notes");
      };
    };
    #ok(WsLib.createDailyNote(dailyNotes, wsCounter, payload));
  };

  public query func getDailyNotesByIntern(
    sessionToken : Text,
    internId : Text,
  ) : async [WsTypes.DailyNote] {
    ignore Auth.requireSession(sessions, sessionToken);
    WsLib.getDailyNotesByIntern(dailyNotes, internId);
  };

  public func addNoteComment(
    sessionToken : Text,
    noteId : Text,
    content : Text,
    status : Text,
  ) : async { #ok : WsTypes.DailyNote; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let comment : WsTypes.NoteComment = {
      id         = "nc-" # Time.now().toText() # "-" # username;
      authorId   = username;
      authorName = username;
      content;
      createdAt  = Time.now();
      status;
    };
    switch (WsLib.addNoteComment(dailyNotes, noteId, comment)) {
      case null  #err("Note not found");
      case (?n)  #ok n;
    }
  };

  // -------------------------------------------------------
  // Channels
  // -------------------------------------------------------

  public func createChannel(
    sessionToken : Text,
    name : Text,
    spaceId : Text,
    memberIds : [Text],
  ) : async { #ok : WsTypes.Channel; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    if (not isAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can create channels");
    };
    #ok(WsLib.createChannel(channels, wsCounter, name, spaceId, memberIds, username));
  };

  public query func getChannelsForUser(
    sessionToken : Text,
  ) : async [WsTypes.Channel] {
    let username = Auth.requireSession(sessions, sessionToken);
    WsLib.getChannelsForUser(channels, username);
  };

  /// Only members of the channel can fetch its messages.
  public query func getChannelMessages(
    sessionToken : Text,
    channelId : Text,
  ) : async { #ok : [WsTypes.ChannelMessage]; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let msgs = WsLib.getChannelMessages(channelMessages, channelId, username, channels);
    // An empty result here can mean either no messages or non-member;
    // we explicitly check membership to surface the error.
    switch (channels.get(channelId)) {
      case null  #err("Channel not found");
      case (?ch) {
        let isMember = ch.memberIds.find(func(m : Text) : Bool { m == username }) != null;
        if (not isMember) #err("Forbidden: you are not a member of this channel")
        else #ok msgs;
      };
    }
  };

  public func sendChannelMessage(
    sessionToken : Text,
    channelId : Text,
    content : Text,
    mentions : [Text],
  ) : async { #ok : WsTypes.ChannelMessage; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    switch (WsLib.sendChannelMessage(channelMessages, channels, wsCounter, channelId, username, username, content, mentions)) {
      case null  #err("Forbidden: you are not a member of this channel");
      case (?msg) #ok msg;
    }
  };

  // -------------------------------------------------------
  // Direct Messages
  // -------------------------------------------------------

  public func sendDirectMessage(
    sessionToken : Text,
    toUserId : Text,
    content : Text,
  ) : async { #ok : WsTypes.DirectMessage; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    #ok(WsLib.sendDirectMessage(directMessages, wsCounter, username, toUserId, content));
  };

  /// Returns conversation thread between caller and peerId.
  public query func getDirectMessages(
    sessionToken : Text,
    peerId : Text,
  ) : async { #ok : [WsTypes.DirectMessage]; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    #ok(WsLib.getDirectMessages(directMessages, username, peerId));
  };

  public func markDirectMessageRead(
    sessionToken : Text,
    dmId : Text,
  ) : async { #ok : Bool; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    #ok(WsLib.markDirectMessageRead(directMessages, dmId, username));
  };

  // -------------------------------------------------------
  // Submissions
  // -------------------------------------------------------

  public func createSubmission(
    sessionToken : Text,
    payload : WsTypes.CreateSubmissionPayload,
  ) : async { #ok : WsTypes.WorkSubmission; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    // Interns can only submit for themselves
    if (not isAdminSession(sessionToken)) {
      if (payload.internId != username) {
        return #err("Interns may only create submissions for themselves");
      };
    };
    #ok(WsLib.createSubmission(submissions, wsCounter, payload));
  };

  public func updateSubmissionStatus(
    sessionToken : Text,
    id : Text,
    status : Text,
    feedback : ?Text,
  ) : async { #ok : WsTypes.WorkSubmission; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    if (not isAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can review submissions");
    };
    switch (WsLib.updateSubmissionStatus(submissions, id, status, feedback, username)) {
      case null  #err("Submission not found");
      case (?s) {
        // Notify intern on review
        wsAddNotification(s.internId, "Submission Reviewed", "Your submission \"" # s.title # "\" was marked: " # status, ?id);
        #ok s;
      };
    }
  };

  public query func getSubmissionsByIntern(
    sessionToken : Text,
    internId : Text,
  ) : async [WsTypes.WorkSubmission] {
    ignore Auth.requireSession(sessions, sessionToken);
    WsLib.getSubmissionsByIntern(submissions, internId);
  };

  // -------------------------------------------------------
  // Meetings
  // -------------------------------------------------------

  public func scheduleMeeting(
    sessionToken : Text,
    payload : WsTypes.CreateMeetingPayload,
  ) : async { #ok : WsTypes.Meeting; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    if (not isAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can schedule meetings");
    };
    let mtg = WsLib.scheduleMeeting(meetings, wsCounter, payload, username);
    // Notify all participants
    for (pid in mtg.participantIds.values()) {
      wsAddNotification(pid, "Meeting Scheduled", "You have a new meeting: " # mtg.title, ?mtg.id);
    };
    #ok mtg;
  };

  public query func getMeetingsForUser(
    sessionToken : Text,
  ) : async [WsTypes.Meeting] {
    let username = Auth.requireSession(sessions, sessionToken);
    WsLib.getMeetingsForUser(meetings, username);
  };

  public query func getMeetingsForIntern(
    sessionToken : Text,
    internId : Text,
  ) : async [WsTypes.Meeting] {
    ignore Auth.requireSession(sessions, sessionToken);
    WsLib.getMeetingsForIntern(meetings, internId);
  };

  // -------------------------------------------------------
  // Timeline Milestones
  // -------------------------------------------------------

  public func addTimelineMilestone(
    sessionToken : Text,
    internId : Text,
    title : Text,
    description : ?Text,
    milestoneType : Text,
  ) : async { #ok : WsTypes.TimelineMilestone; #err : Text } {
    ignore Auth.requireSession(sessions, sessionToken);
    if (not isAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can add timeline milestones");
    };
    let stub : WsTypes.TimelineMilestone = {
      id            = "";
      internId;
      title;
      description;
      completedAt   = null;
      milestoneType;
      createdAt     = Time.now();
    };
    #ok(WsLib.addTimelineMilestone(milestones, wsCounter, stub));
  };

  public query func getTimelineForIntern(
    sessionToken : Text,
    internId : Text,
  ) : async [WsTypes.TimelineMilestone] {
    ignore Auth.requireSession(sessions, sessionToken);
    WsLib.getTimelineForIntern(milestones, internId);
  };

  // -------------------------------------------------------
  // Aggregate workspace view
  // -------------------------------------------------------

  /// Returns all workspace data for a single intern in one call.
  public query func getWorkspaceData(
    sessionToken : Text,
    internId : Text,
  ) : async { #ok : WsTypes.WorkspaceData; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    // Interns can only see their own workspace
    if (not isAdminSession(sessionToken)) {
      if (username != internId) {
        return #err("Forbidden: you can only view your own workspace");
      };
    };
    let data : WsTypes.WorkspaceData = {
      tasks          = WsLib.getTasksByIntern(tasks, internId);
      notes          = WsLib.getDailyNotesByIntern(dailyNotes, internId);
      channelMessages = [];
      directMessages = WsLib.getDirectMessages(directMessages, internId, internId);
      meetings       = WsLib.getMeetingsForIntern(meetings, internId);
      milestones     = WsLib.getTimelineForIntern(milestones, internId);
      submissions    = WsLib.getSubmissionsByIntern(submissions, internId);
    };
    #ok data;
  };

};
