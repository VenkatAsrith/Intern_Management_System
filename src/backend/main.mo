import List "mo:core/List";
import Map "mo:core/Map";
import InternsMixin "mixins/interns-api";
import Auth "lib/auth";
import Types "types/interns";
import InternLib "lib/interns";
import ClientsMixin "mixins/clients-api";
import ClientTypes "types/clients";
import NotificationsMixin "mixins/notifications-api";
import NotifTypes "types/notifications";
import Migration "migration";


(with migration = Migration.run)
actor {

  // --- Stable state ---
  let interns = Map.empty<Text, Types.Intern>();
  let performances = Map.empty<Text, Types.Performance>();
  let activities = List.empty<Types.Activity>();
  let idCounter = { var n : Nat = 0 };
  let sessions = Map.empty<Text, Auth.SessionInfo>();

  // Lazy init flag: seed sample data once on first run
  var seeded : Bool = false;

  // Stable state for clients domain
  let clients = Map.empty<Text, ClientTypes.Client>();
  let clientActivities = List.empty<ClientTypes.ClientActivity>();
  let clientComments = Map.empty<Text, ClientTypes.ClientComment>();
  let invoices = Map.empty<Text, ClientTypes.Invoice>();
  let clientIdCounter = { var n : Nat = 0 };
  let invoiceCounter = { var n : Nat = 0 };

  // Tasks domain state
  // (removed — tasks module retired)

  // Attendance domain state
  // (removed — attendance module retired)

  // LMS domain state
  // (removed — LMS module retired)

  // Notifications domain state
  let notifications = Map.empty<Text, NotifTypes.Notification>();
  let announcements = Map.empty<Text, NotifTypes.Announcement>();

  // Intern pipeline stage history
  let stageHistories = Map.empty<Text, Types.InternPipelineStageHistory>();

  // Include all intern domain API
  include InternsMixin(interns, performances, activities, idCounter, sessions, stageHistories, notifications);
  // Include all client domain API
  include ClientsMixin(clients, clientActivities, clientComments, invoices, clientIdCounter, invoiceCounter);
  // Include all notifications domain API
  include NotificationsMixin(notifications, announcements);

  // --- Auth endpoints ---

  public func login(username : Text, password : Text) : async { #ok : { sessionToken : Text; displayName : Text }; #err : Text } {
    Auth.login(sessions, username, password)
  };

  public func logout(sessionToken : Text) : async () {
    Auth.logout(sessions, sessionToken);
  };

  public query func validateSession(sessionToken : Text) : async { #ok : { username : Text; displayName : Text }; #err : Text } {
    Auth.validateSession(sessions, sessionToken)
  };

  // Seed sample data on first use (idempotent guard, no auth needed)
  public func initSampleData() : async Nat {
    if (seeded) return 0;
    seeded := true;
    InternLib.seedSampleData(interns, performances, activities, idCounter)
  };

};


