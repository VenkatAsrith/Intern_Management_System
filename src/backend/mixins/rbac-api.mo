import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Auth "../lib/auth";
import RbacTypes "../types/rbac";
import Perm "../lib/permissions";

mixin (
  sessions        : Map.Map<Text, Auth.SessionInfo>,
  users           : Map.Map<Text, RbacTypes.UserAccount>,
  userIdCounter   : { var n : Nat },
) {

  // ---- internal helpers -----------------------------------------------

  func nextUserId() : Text {
    userIdCounter.n += 1;
    "user-" # Time.now().toText() # "-" # userIdCounter.n.toText()
  };

  func isHardcoded(username : Text) : Bool {
    var found = false;
    for (u in Auth.HARDCODED_ADMIN_USERNAMES.values()) {
      if (u == username) found := true;
    };
    found
  };

  func roleFromText(r : Text) : ?RbacTypes.Role {
    switch r {
      case "superAdmin"  ?#superAdmin;
      case "admin"       ?#admin;
      case "manager"     ?#manager;
      case "hr"          ?#hr;
      case "sales"       ?#sales;
      case "marketing"   ?#marketing;
      case "finance"     ?#finance;
      case "operations"  ?#operations;
      case "viewer"      ?#viewer;
      case _             null;
    }
  };

  // ---- public API ------------------------------------------------------

  public func createUser(
    sessionToken : Text,
    username     : Text,
    password     : Text,
    roleText     : Text,
    spaces       : [Text],
    displayName  : Text,
  ) : async { #ok : RbacTypes.UserAccount; #err : Text } {
    switch (Auth.requirePermission(sessions, sessionToken, Perm.ADMIN_USERS)) {
      case (#err e) { #err e };
      case (#ok _) {
        if (users.get(username) != null) return #err("Username already exists");
        if (isHardcoded(username)) return #err("Cannot create user with reserved username");
        switch (roleFromText(roleText)) {
          case null { #err("Invalid role: " # roleText) };
          case (?role) {
            let acc : RbacTypes.UserAccount = {
              id          = nextUserId();
              username;
              passwordHash = password;
              role;
              spaces;
              isActive    = true;
              createdAt   = Time.now();
              displayName;
            };
            users.add(username, acc);
            #ok acc
          };
        }
      };
    }
  };

  public func updateUser(
    sessionToken : Text,
    userId       : Text,
    roleText     : Text,
    spaces       : [Text],
    isActive     : Bool,
  ) : async { #ok : RbacTypes.UserAccount; #err : Text } {
    switch (Auth.requirePermission(sessions, sessionToken, Perm.ADMIN_USERS)) {
      case (#err e) { #err e };
      case (#ok _) {
        // Find user by id
        let found = users.entries().find(func((_, acc)) { acc.id == userId });
        switch found {
          case null { #err("User not found") };
          case (?(uname, existing)) {
            if (isHardcoded(uname)) {
              // Cannot downgrade hardcoded admins
              return #err("Cannot modify hardcoded admin accounts");
            };
            switch (roleFromText(roleText)) {
              case null { #err("Invalid role: " # roleText) };
              case (?role) {
                let updated : RbacTypes.UserAccount = { existing with role; spaces; isActive };
                users.add(uname, updated);
                #ok updated
              };
            }
          };
        }
      };
    }
  };

  public func deleteUser(
    sessionToken : Text,
    userId       : Text,
  ) : async { #ok : (); #err : Text } {
    switch (Auth.requirePermission(sessions, sessionToken, Perm.ADMIN_USERS)) {
      case (#err e) { #err e };
      case (#ok _) {
        let found = users.entries().find(func((_, acc)) { acc.id == userId });
        switch found {
          case null { #err("User not found") };
          case (?(uname, _)) {
            if (isHardcoded(uname)) return #err("Cannot delete hardcoded admin accounts");
            users.remove(uname);
            #ok ()
          };
        }
      };
    }
  };

  public query func listUsers(
    sessionToken : Text,
  ) : async { #ok : [RbacTypes.UserAccount]; #err : Text } {
    switch (Auth.requirePermission(sessions, sessionToken, Perm.ADMIN_USERS)) {
      case (#err e) { #err e };
      case (#ok _) {
        let arr = users.values().toArray();
        #ok arr
      };
    }
  };

  public query func getUserById(
    sessionToken : Text,
    userId       : Text,
  ) : async { #ok : RbacTypes.UserAccount; #err : Text } {
    switch (Auth.requirePermission(sessions, sessionToken, Perm.ADMIN_USERS)) {
      case (#err e) { #err e };
      case (#ok _) {
        let found = users.entries().find(func((_, acc)) { acc.id == userId });
        switch found {
          case null { #err("User not found") };
          case (?(_, acc)) { #ok acc };
        }
      };
    }
  };

};
