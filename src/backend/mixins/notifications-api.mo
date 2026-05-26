import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import NotifTypes "../types/notifications";

mixin (
  notifications : Map.Map<Text, NotifTypes.Notification>,
  announcements : Map.Map<Text, NotifTypes.Announcement>
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
    };
    notifications.add(id, notif);
    #ok(notif)
  };

  public query func listNotifications(userId : Text) : async [NotifTypes.Notification] {
    notifications.values().toArray().filter(
      func(n) { n.userId == userId }
    )
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

  public func createAnnouncement(payload : {
    title : Text;
    content : Text;
    createdBy : Text;
  }) : async { #ok : NotifTypes.Announcement; #err : Text } {
    let id = nextNotifId("ann-");
    let ann : NotifTypes.Announcement = {
      id;
      title     = payload.title;
      content   = payload.content;
      createdBy = payload.createdBy;
      createdAt = Time.now();
      isActive  = true;
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
