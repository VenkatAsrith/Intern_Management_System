import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Time "mo:core/Time";
import WsTypes "../types/workspace";
import Int "mo:core/Int";

/// Stateless domain-logic helpers for the workspace domain.
/// All functions receive state slices; no actor state is held here.
module {

  // -------------------------------------------------------
  // ID generation helper
  // -------------------------------------------------------

  public func nextId(prefix : Text, counter : { var n : Nat }) : Text {
    counter.n += 1;
    prefix # "-" # Time.now().toText() # "-" # counter.n.toText();
  };

  // -------------------------------------------------------
  // Task helpers
  // -------------------------------------------------------

  public func createTask(
    tasks : Map.Map<Text, WsTypes.Task>,
    counter : { var n : Nat },
    payload : WsTypes.CreateTaskPayload,
    createdBy : Text,
  ) : WsTypes.Task {
    let id = nextId("task", counter);
    let now = Time.now();
    let task : WsTypes.Task = {
      id;
      title        = payload.title;
      description  = payload.description;
      priority     = payload.priority;
      deadline     = payload.deadline;
      assignedInternId = payload.assignedInternId;
      teamSpace    = payload.teamSpace;
      status       = "Pending";
      tags         = payload.tags;
      createdBy;
      createdAt    = now;
      updatedAt    = now;
    };
    tasks.add(id, task);
    task;
  };

  public func updateTask(
    tasks : Map.Map<Text, WsTypes.Task>,
    id : Text,
    payload : WsTypes.UpdateTaskPayload,
    updatedBy : Text,
  ) : ?WsTypes.Task {
    ignore updatedBy;
    switch (tasks.get(id)) {
      case null null;
      case (?existing) {
        let updated : WsTypes.Task = {
          existing with
          title       = switch (payload.title)       { case (?v) v; case null existing.title };
          description = switch (payload.description) { case (?v) v; case null existing.description };
          priority    = switch (payload.priority)    { case (?v) v; case null existing.priority };
          deadline    = switch (payload.deadline)    { case (?v) ?v; case null existing.deadline };
          assignedInternId = switch (payload.assignedInternId) { case (?v) v; case null existing.assignedInternId };
          teamSpace   = switch (payload.teamSpace)   { case (?v) v; case null existing.teamSpace };
          status      = switch (payload.status)      { case (?v) v; case null existing.status };
          tags        = switch (payload.tags)        { case (?v) v; case null existing.tags };
          updatedAt   = Time.now();
        };
        tasks.add(id, updated);
        ?updated;
      };
    }
  };

  public func deleteTask(
    tasks : Map.Map<Text, WsTypes.Task>,
    id : Text,
  ) : Bool {
    switch (tasks.get(id)) {
      case null false;
      case _ { tasks.remove(id); true };
    }
  };

  public func getTasksByIntern(
    tasks : Map.Map<Text, WsTypes.Task>,
    internId : Text,
  ) : [WsTypes.Task] {
    tasks.entries()
         .map(func((_, t) : (Text, WsTypes.Task)) : WsTypes.Task = t)
         .filter(func(t : WsTypes.Task) : Bool { t.assignedInternId == internId })
         .toArray()
  };

  public func getTasksBySpace(
    tasks : Map.Map<Text, WsTypes.Task>,
    spaceId : Text,
  ) : [WsTypes.Task] {
    tasks.entries()
         .map(func((_, t) : (Text, WsTypes.Task)) : WsTypes.Task = t)
         .filter(func(t : WsTypes.Task) : Bool { t.teamSpace == spaceId })
         .toArray()
  };

  public func getAllTasks(
    tasks : Map.Map<Text, WsTypes.Task>,
  ) : [WsTypes.Task] {
    tasks.entries()
         .map(func((_, t) : (Text, WsTypes.Task)) : WsTypes.Task = t)
         .toArray()
  };

  // -------------------------------------------------------
  // Daily Notes helpers
  // -------------------------------------------------------

  public func createDailyNote(
    notes : Map.Map<Text, WsTypes.DailyNote>,
    counter : { var n : Nat },
    payload : WsTypes.CreateDailyNotePayload,
  ) : WsTypes.DailyNote {
    let id = nextId("note", counter);
    let note : WsTypes.DailyNote = {
      id;
      internId        = payload.internId;
      date            = payload.date;
      workedOn        = payload.workedOn;
      blockers        = payload.blockers;
      progress        = payload.progress;
      learningUpdates = payload.learningUpdates;
      createdAt       = Time.now();
      adminComments   = [];
    };
    notes.add(id, note);
    note;
  };

  public func getDailyNotesByIntern(
    notes : Map.Map<Text, WsTypes.DailyNote>,
    internId : Text,
  ) : [WsTypes.DailyNote] {
    notes.entries()
         .map(func((_, n) : (Text, WsTypes.DailyNote)) : WsTypes.DailyNote = n)
         .filter(func(n : WsTypes.DailyNote) : Bool { n.internId == internId })
         .toArray()
  };

  public func addNoteComment(
    notes : Map.Map<Text, WsTypes.DailyNote>,
    noteId : Text,
    comment : WsTypes.NoteComment,
  ) : ?WsTypes.DailyNote {
    switch (notes.get(noteId)) {
      case null null;
      case (?existing) {
        let updated : WsTypes.DailyNote = {
          existing with
          adminComments = existing.adminComments.concat([comment]);
        };
        notes.add(noteId, updated);
        ?updated;
      };
    }
  };

  // -------------------------------------------------------
  // Channel helpers
  // -------------------------------------------------------

  public func createChannel(
    channels : Map.Map<Text, WsTypes.Channel>,
    counter : { var n : Nat },
    name : Text,
    spaceId : Text,
    memberIds : [Text],
    createdBy : Text,
  ) : WsTypes.Channel {
    let id = nextId("ch", counter);
    // Deduplicate memberIds
    let seen = Map.empty<Text, Bool>();
    var deduped : [Text] = [];
    for (m in memberIds.values()) {
      if (seen.get(m) == null) {
        seen.add(m, true);
        deduped := deduped.concat([m]);
      };
    };
    // Ensure createdBy is a member
    if (seen.get(createdBy) == null) {
      deduped := deduped.concat([createdBy]);
    };
    let ch : WsTypes.Channel = {
      id;
      name;
      spaceId;
      memberIds = deduped;
      createdAt = Time.now();
      createdBy;
    };
    channels.add(id, ch);
    ch;
  };

  public func getChannelsForUser(
    channels : Map.Map<Text, WsTypes.Channel>,
    userId : Text,
  ) : [WsTypes.Channel] {
    channels.entries()
            .map(func((_, c) : (Text, WsTypes.Channel)) : WsTypes.Channel = c)
            .filter(func(c : WsTypes.Channel) : Bool {
              c.memberIds.find(func(m : Text) : Bool { m == userId }) != null
            })
            .toArray()
  };

  public func getChannelMessages(
    messages : Map.Map<Text, WsTypes.ChannelMessage>,
    channelId : Text,
    userId : Text,
    channels : Map.Map<Text, WsTypes.Channel>,
  ) : [WsTypes.ChannelMessage] {
    // PRIVACY: only members can read messages
    let isMember = switch (channels.get(channelId)) {
      case null false;
      case (?ch) {
        ch.memberIds.find(func(m : Text) : Bool { m == userId }) != null
      };
    };
    if (not isMember) return [];
    messages.entries()
            .map(func((_, msg) : (Text, WsTypes.ChannelMessage)) : WsTypes.ChannelMessage = msg)
            .filter(func(msg : WsTypes.ChannelMessage) : Bool { msg.channelId == channelId })
            .toArray()
  };

  public func sendChannelMessage(
    messages : Map.Map<Text, WsTypes.ChannelMessage>,
    channels : Map.Map<Text, WsTypes.Channel>,
    counter : { var n : Nat },
    channelId : Text,
    senderId : Text,
    senderName : Text,
    content : Text,
    mentions : [Text],
  ) : ?WsTypes.ChannelMessage {
    // PRIVACY: only members can send
    let isMember = switch (channels.get(channelId)) {
      case null false;
      case (?ch) {
        ch.memberIds.find(func(m : Text) : Bool { m == senderId }) != null
      };
    };
    if (not isMember) return null;
    let id = nextId("cmsg", counter);
    let msg : WsTypes.ChannelMessage = {
      id;
      channelId;
      senderId;
      senderName;
      content;
      mentions;
      createdAt = Time.now();
    };
    messages.add(id, msg);
    ?msg;
  };

  // -------------------------------------------------------
  // Direct Message helpers
  // -------------------------------------------------------

  public func sendDirectMessage(
    dms : Map.Map<Text, WsTypes.DirectMessage>,
    counter : { var n : Nat },
    fromUserId : Text,
    toUserId : Text,
    content : Text,
  ) : WsTypes.DirectMessage {
    let id = nextId("dm", counter);
    let dm : WsTypes.DirectMessage = {
      id;
      fromUserId;
      toUserId;
      content;
      createdAt = Time.now();
      isRead    = false;
    };
    dms.add(id, dm);
    dm;
  };

  public func getDirectMessages(
    dms : Map.Map<Text, WsTypes.DirectMessage>,
    userId : Text,
    peerId : Text,
  ) : [WsTypes.DirectMessage] {
    dms.entries()
       .map(func((_, dm) : (Text, WsTypes.DirectMessage)) : WsTypes.DirectMessage = dm)
       .filter(func(dm : WsTypes.DirectMessage) : Bool {
         (dm.fromUserId == userId and dm.toUserId == peerId) or
         (dm.fromUserId == peerId and dm.toUserId == userId)
       })
       .toArray()
  };

  public func markDirectMessageRead(
    dms : Map.Map<Text, WsTypes.DirectMessage>,
    dmId : Text,
    userId : Text,
  ) : Bool {
    switch (dms.get(dmId)) {
      case null false;
      case (?dm) {
        // Only the intended recipient can mark as read
        if (dm.toUserId != userId) return false;
        let updated : WsTypes.DirectMessage = { dm with isRead = true };
        dms.add(dmId, updated);
        true;
      };
    }
  };

  // -------------------------------------------------------
  // Submission helpers
  // -------------------------------------------------------

  public func createSubmission(
    submissions : Map.Map<Text, WsTypes.WorkSubmission>,
    counter : { var n : Nat },
    payload : WsTypes.CreateSubmissionPayload,
  ) : WsTypes.WorkSubmission {
    let id = nextId("sub", counter);
    let sub : WsTypes.WorkSubmission = {
      id;
      internId     = payload.internId;
      taskId       = payload.taskId;
      title        = payload.title;
      description  = payload.description;
      githubLink   = payload.githubLink;
      driveLink    = payload.driveLink;
      fileUrls     = payload.fileUrls;
      status       = "Pending";
      adminFeedback = null;
      reviewedBy   = null;
      createdAt    = Time.now();
      reviewedAt   = null;
    };
    submissions.add(id, sub);
    sub;
  };

  public func updateSubmissionStatus(
    submissions : Map.Map<Text, WsTypes.WorkSubmission>,
    id : Text,
    status : Text,
    feedback : ?Text,
    reviewedBy : Text,
  ) : ?WsTypes.WorkSubmission {
    switch (submissions.get(id)) {
      case null null;
      case (?existing) {
        let updated : WsTypes.WorkSubmission = {
          existing with
          status        = status;
          adminFeedback = feedback;
          reviewedBy    = ?reviewedBy;
          reviewedAt    = ?Time.now();
        };
        submissions.add(id, updated);
        ?updated;
      };
    }
  };

  public func getSubmissionsByIntern(
    submissions : Map.Map<Text, WsTypes.WorkSubmission>,
    internId : Text,
  ) : [WsTypes.WorkSubmission] {
    submissions.entries()
               .map(func((_, s) : (Text, WsTypes.WorkSubmission)) : WsTypes.WorkSubmission = s)
               .filter(func(s : WsTypes.WorkSubmission) : Bool { s.internId == internId })
               .toArray()
  };

  // -------------------------------------------------------
  // Meeting helpers
  // -------------------------------------------------------

  public func scheduleMeeting(
    meetings : Map.Map<Text, WsTypes.Meeting>,
    counter : { var n : Nat },
    payload : WsTypes.CreateMeetingPayload,
    createdBy : Text,
  ) : WsTypes.Meeting {
    let id = nextId("mtg", counter);
    let mtg : WsTypes.Meeting = {
      id;
      title            = payload.title;
      meetingType      = payload.meetingType;
      scheduledAt      = payload.scheduledAt;
      durationMinutes  = payload.durationMinutes;
      joinLink         = payload.joinLink;
      participantIds   = payload.participantIds;
      createdBy;
      createdAt        = Time.now();
      reminderSentAt   = null;
    };
    meetings.add(id, mtg);
    mtg;
  };

  public func getMeetingsForUser(
    meetings : Map.Map<Text, WsTypes.Meeting>,
    userId : Text,
  ) : [WsTypes.Meeting] {
    meetings.entries()
            .map(func((_, m) : (Text, WsTypes.Meeting)) : WsTypes.Meeting = m)
            .filter(func(m : WsTypes.Meeting) : Bool {
              m.participantIds.find(func(p : Text) : Bool { p == userId }) != null
            })
            .toArray()
  };

  public func getMeetingsForIntern(
    meetings : Map.Map<Text, WsTypes.Meeting>,
    internId : Text,
  ) : [WsTypes.Meeting] {
    // Same lookup — intern usernames are also participant IDs
    getMeetingsForUser(meetings, internId)
  };

  // -------------------------------------------------------
  // Timeline helpers
  // -------------------------------------------------------

  public func addTimelineMilestone(
    milestones : Map.Map<Text, WsTypes.TimelineMilestone>,
    counter : { var n : Nat },
    milestone : WsTypes.TimelineMilestone,
  ) : WsTypes.TimelineMilestone {
    let id = nextId("ms", counter);
    let ms : WsTypes.TimelineMilestone = { milestone with id };
    milestones.add(id, ms);
    ms;
  };

  public func getTimelineForIntern(
    milestones : Map.Map<Text, WsTypes.TimelineMilestone>,
    internId : Text,
  ) : [WsTypes.TimelineMilestone] {
    // Collect matching milestones then sort ascending by createdAt
    let matching : [WsTypes.TimelineMilestone] =
      milestones.entries()
                .map(func((_, ms) : (Text, WsTypes.TimelineMilestone)) : WsTypes.TimelineMilestone = ms)
                .filter(func(ms : WsTypes.TimelineMilestone) : Bool { ms.internId == internId })
                .toArray();
    matching.sort<WsTypes.TimelineMilestone>(
      func(a : WsTypes.TimelineMilestone, b : WsTypes.TimelineMilestone) = Int.compare(a.createdAt, b.createdAt)
    )
  };

};
