import List "mo:core/List";
import Map "mo:core/Map";
import InternsMixin "mixins/interns-api";
import Auth "lib/auth";
import Types "types/interns";
import InternLib "lib/interns";

actor {

  // --- Stable state ---
  let interns = Map.empty<Text, Types.Intern>();
  let performances = Map.empty<Text, Types.Performance>();
  let activities = List.empty<Types.Activity>();
  let idCounter = { var n : Nat = 0 };
  let sessions = Map.empty<Text, Auth.SessionInfo>();

  // Lazy init flag: seed sample data once on first run
  var seeded : Bool = false;

  // Include all intern domain API
  include InternsMixin(interns, performances, activities, idCounter, sessions);

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


