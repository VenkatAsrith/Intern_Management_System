import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Auth "../lib/auth";
import NotifTypes "../types/notifications";

mixin (
  notifications : Map.Map<Text, NotifTypes.Notification>,
  announcements : Map.Map<Text, NotifTypes.Announcement>,
  sessions : Map.Map<Text, Auth.SessionInfo>,
  notificationPreferences : Map.Map<Text, NotifTypes.NotificationPreference>,
) {

  func nextNotifId(prefix : Text) : Text {
    prefix # Time.now().toText()
  };

  public func createNotification(payload : {
    userId : Text;
    notificationType : NotifTypes.NotificationType;
    title : Text;
    message : Text;
    relatedId : ?Text;
    priority : NotifTypes.NotificationPriority;
  }) : async { #ok : NotifTypes.Notification; #err : Text } {
    let id = nextNotifId("notif-");
    let notif : NotifTypes.Notification = {
      id;
      userId           = payload.userId;
      notificationType = payload.notificationType;
      title            = payload.title;
      message          = payload.message;
      isRead           = false;
      relatedId        = payload.relatedId;
      createdAt        = Time.now();
      priority         = ?payload.priority;
    };
    notifications.add(id, notif);
    #ok(notif)
  };

  public query func listNotifications(userId : Text) : async [NotifTypes.Notification] {
    notifications.values().toArray().filter(
      func(n) { n.userId == userId }
    )
  };

  public query func getNotificationsByPriority(
    sessionToken : Text,
    priority : Text,
  ) : async { #ok : [NotifTypes.Notification]; #err : Text } {
    switch (sessions.get(sessionToken)) {
      case null { #ok([]) };
      case (?info) {
        let targetPriority : NotifTypes.NotificationPriority = switch priority {
          case "critical" #critical;
          case "high"     #high;
          case "low"      #low;
          case _          #medium;
        };
        let filtered = notifications.values().toArray().filter(
          func(n) {
            n.userId == info.username and n.priority == ?targetPriority
          }
        );
        #ok(filtered)
      };
    }
  };

  public func markAsRead(id : Text) : async { #ok; #err : Text } {
    switch (notifications.get(id)) {
      case null { #err("Notification not found") };
      case (?n) {
        notifications.add(id, { n with isRead = true });
        #ok
      };
    }
  };

  public func markAllAsRead(userId : Text) : async { #ok : Nat; #err : Text } {
    var count = 0;
    for ((k, n) in notifications.entries()) {
      if (n.userId == userId and not n.isRead) {
        notifications.add(k, { n with isRead = true });
        count += 1;
      }
    };
    #ok(count)
  };

  // --- Notification preferences ---

  public func setNotificationPreference(
    sessionToken : Text,
    eventType : Text,
    digestEnabled : Bool,
    digestFrequency : Text,
  ) : async { #ok : (); #err : Text } {
    switch (sessions.get(sessionToken)) {
      case null { #err("Unauthorized") };
      case (?info) {
        let freq : { #immediate; #hourly; #daily } = switch digestFrequency {
          case "hourly" #hourly;
          case "daily"  #daily;
          case _        #immediate;
        };
        let prefKey = info.username # "-" # eventType;
        let pref : NotifTypes.NotificationPreference = {
          userId          = info.username;
          eventType;
          digestEnabled;
          digestFrequency = freq;
        };
        notificationPreferences.add(prefKey, pref);
        #ok(())
      };
    }
  };

  public query func getNotificationPreferences(
    sessionToken : Text,
  ) : async { #ok : [NotifTypes.NotificationPreference]; #err : Text } {
    switch (sessions.get(sessionToken)) {
      case null { #ok([]) };
      case (?info) {
        let prefs = notificationPreferences.values().toArray().filter(
          func(p) { p.userId == info.username }
        );
        #ok(prefs)
      };
    }
  };

  // --- Announcements ---

  public func createAnnouncementV2(
    sessionToken : Text,
    title : Text,
    body : Text,
    targetSpaces : [Text],
    expiresAt : ?Int,
  ) : async { #ok : NotifTypes.Announcement; #err : Text } {
    switch (sessions.get(sessionToken)) {
      case null { #err("Unauthorized") };
      case (?info) {
        let id = nextNotifId("ann-");
        let ann : NotifTypes.Announcement = {
          id;
          title;
          content      = body;
          createdBy    = info.username;
          createdAt    = Time.now();
          isActive     = true;
          targetSpaces = ?targetSpaces;
          expiresAt;
        };
        announcements.add(id, ann);
        #ok(ann)
      };
    }
  };

  public query func getAnnouncementsBySpace(
    sessionToken : Text,
    space : ?Text,
  ) : async { #ok : [NotifTypes.Announcement]; #err : Text } {
    switch (sessions.get(sessionToken)) {
      case null { #ok([]) };
      case (?_info) {
        let now = Time.now();
        let filtered = announcements.values().toArray().filter(
          func(a) {
            if (not a.isActive) return false;
            switch (a.expiresAt) {
              case (?exp) { if (exp < now) return false };
              case null {};
            };
            switch (space) {
              case null true;
              case (?s) {
                let spaces : [Text] = switch (a.targetSpaces) { case (?ts) ts; case null [] };
                if (spaces.size() == 0) true
                else spaces.contains(s)
              };
            }
          }
        );
        #ok(filtered)
      };
    }
  };

  public func deleteAnnouncementById(
    sessionToken : Text,
    announcementId : Text,
  ) : async { #ok : (); #err : Text } {
    switch (sessions.get(sessionToken)) {
      case null { #err("Unauthorized") };
      case (?_info) {
        switch (announcements.get(announcementId)) {
          case null { #err("Announcement not found") };
          case (?a) {
            announcements.add(announcementId, { a with isActive = false });
            #ok(())
          };
        }
      };
    }
  };

  // Legacy helpers kept for backward compatibility

  public func createAnnouncement(payload : {
    title : Text;
    content : Text;
    createdBy : Text;
  }) : async { #ok : NotifTypes.Announcement; #err : Text } {
    let id = nextNotifId("ann-");
    let ann : NotifTypes.Announcement = {
      id;
      title        = payload.title;
      content      = payload.content;
      createdBy    = payload.createdBy;
      createdAt    = Time.now();
      isActive     = true;
      targetSpaces = ?[];
      expiresAt    = null;
    };
    announcements.add(id, ann);
    #ok(ann)
  };

  public query func listAnnouncements(activeOnly : Bool) : async [NotifTypes.Announcement] {
    let all = announcements.values().toArray();
    if (activeOnly) {
      all.filter(func(a) { a.isActive })
    } else {
      all
    }
  };

  public func deleteAnnouncement(id : Text) : async { #ok; #err : Text } {
    switch (announcements.get(id)) {
      case null { #err("Announcement not found") };
      case (?a) {
        announcements.add(id, { a with isActive = false });
        #ok
      };
    }
  };

};
