import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import RbacTypes "../types/rbac";
import Perm "../lib/permissions";

module {

  // Hardcoded superAdmin credentials: (username, password, displayName)
  let HARDCODED_ADMINS : [(Text, Text, Text)] = [
    ("Venkat",     "Venkat2629",      "Venkat Asrith"),
    ("Jaychandra", "Jaychandra2288",  "Jay Chandra"),
  ];

  public let HARDCODED_ADMIN_USERNAMES : [Text] = ["Venkat", "Jaychandra"];

  public type SessionInfo = {
    username : Text;
    displayName : Text;
    role : ?Text;
    permissions : ?[Text];
  };

  // ---------------------------------------------------------------------------
  // Role → permissions mapping
  // ---------------------------------------------------------------------------
  public func getPermissionsForRole(role : RbacTypes.Role) : [Text] {
    switch role {
      case (#superAdmin) {
        [
          Perm.INTERN_CREATE, Perm.INTERN_EDIT, Perm.INTERN_DELETE, Perm.INTERN_VIEW,
          Perm.CLIENT_CREATE, Perm.CLIENT_EDIT, Perm.CLIENT_DELETE, Perm.CLIENT_VIEW, Perm.CLIENT_MOVE_STAGE,
          Perm.PROPOSAL_APPROVE, Perm.INVOICE_GENERATE,
          Perm.ANALYTICS_VIEW, Perm.EXPORT_CSV,
          Perm.ADMIN_USERS, Perm.ADMIN_AUDIT, Perm.ADMIN_AUTOMATIONS, Perm.ADMIN_APPROVALS,
          Perm.ANNOUNCEMENT_POST,
        ]
      };
      case (#admin) {
        [
          Perm.INTERN_CREATE, Perm.INTERN_EDIT, Perm.INTERN_DELETE, Perm.INTERN_VIEW,
          Perm.CLIENT_CREATE, Perm.CLIENT_EDIT, Perm.CLIENT_DELETE, Perm.CLIENT_VIEW, Perm.CLIENT_MOVE_STAGE,
          Perm.PROPOSAL_APPROVE, Perm.INVOICE_GENERATE,
          Perm.ANALYTICS_VIEW, Perm.EXPORT_CSV,
          Perm.ADMIN_USERS, Perm.ADMIN_AUDIT, Perm.ADMIN_AUTOMATIONS, Perm.ADMIN_APPROVALS,
          Perm.ANNOUNCEMENT_POST,
        ]
      };
      case (#manager) {
        [
          Perm.INTERN_CREATE, Perm.INTERN_EDIT, Perm.INTERN_VIEW,
          Perm.CLIENT_CREATE, Perm.CLIENT_EDIT, Perm.CLIENT_VIEW, Perm.CLIENT_MOVE_STAGE,
          Perm.PROPOSAL_APPROVE, Perm.INVOICE_GENERATE,
          Perm.ANALYTICS_VIEW, Perm.EXPORT_CSV,
          Perm.ADMIN_APPROVALS,
          Perm.ANNOUNCEMENT_POST,
        ]
      };
      case (#hr) {
        [
          Perm.INTERN_CREATE, Perm.INTERN_EDIT, Perm.INTERN_VIEW,
          Perm.ANALYTICS_VIEW, Perm.EXPORT_CSV,
          Perm.ANNOUNCEMENT_POST,
        ]
      };
      case (#sales) {
        [
          Perm.INTERN_VIEW,
          Perm.CLIENT_CREATE, Perm.CLIENT_EDIT, Perm.CLIENT_VIEW, Perm.CLIENT_MOVE_STAGE,
          Perm.ANALYTICS_VIEW, Perm.EXPORT_CSV,
        ]
      };
      case (#marketing) {
        [
          Perm.INTERN_VIEW,
          Perm.CLIENT_CREATE, Perm.CLIENT_EDIT, Perm.CLIENT_VIEW,
          Perm.ANALYTICS_VIEW, Perm.EXPORT_CSV,
          Perm.ANNOUNCEMENT_POST,
        ]
      };
      case (#finance) {
        [
          Perm.CLIENT_VIEW,
          Perm.INVOICE_GENERATE,
          Perm.ANALYTICS_VIEW, Perm.EXPORT_CSV,
        ]
      };
      case (#operations) {
        [
          Perm.INTERN_CREATE, Perm.INTERN_VIEW,
          Perm.CLIENT_VIEW,
          Perm.ANALYTICS_VIEW, Perm.EXPORT_CSV,
          Perm.ANNOUNCEMENT_POST,
        ]
      };
      case (#viewer) {
        [ Perm.INTERN_VIEW, Perm.CLIENT_VIEW ]
      };
    }
  };

  // ---------------------------------------------------------------------------
  // Role → Text label
  // ---------------------------------------------------------------------------
  public func roleToText(role : RbacTypes.Role) : Text {
    switch role {
      case (#superAdmin)  "superAdmin";
      case (#admin)       "admin";
      case (#manager)     "manager";
      case (#hr)          "hr";
      case (#sales)       "sales";
      case (#marketing)   "marketing";
      case (#finance)     "finance";
      case (#operations)  "operations";
      case (#viewer)      "viewer";
    }
  };

  // ---------------------------------------------------------------------------
  // Internal: look up a hardcoded admin
  // ---------------------------------------------------------------------------
  func findHardcoded(username : Text, password : Text) : ?(Text, RbacTypes.Role) {
    var found : ?(Text, RbacTypes.Role) = null;
    for ((u, p, d) in HARDCODED_ADMINS.values()) {
      if (u == username and p == password) { found := ?(d, #superAdmin) };
    };
    found
  };

  // ---------------------------------------------------------------------------
  // Login — checks hardcoded admins first, then users Map
  // ---------------------------------------------------------------------------
  public func login(
    sessions : Map.Map<Text, SessionInfo>,
    users    : Map.Map<Text, RbacTypes.UserAccount>,
    username : Text,
    password : Text,
  ) : { #ok : { sessionToken : Text; displayName : Text; role : Text; permissions : [Text] }; #err : Text } {
    let role : RbacTypes.Role = switch (findHardcoded(username, password)) {
      case (?(_, r)) r;
      case null {
        switch (users.get(username)) {
          case null { return #err("Invalid username or password") };
          case (?acc) {
            if (not acc.isActive) return #err("Account is inactive");
            if (acc.passwordHash != password) return #err("Invalid username or password");
            acc.role
          };
        }
      };
    };
    let displayName : Text = switch (findHardcoded(username, password)) {
      case (?(d, _)) d;
      case null {
        switch (users.get(username)) {
          case (?acc) acc.displayName;
          case null username;
        }
      };
    };
    let perms = getPermissionsForRole(role);
    let roleText = roleToText(role);
    let token = Time.now().toText() # "-" # username # "-session";
    sessions.add(token, { username; displayName; role = ?roleText; permissions = ?perms });
    #ok({ sessionToken = token; displayName; role = roleText; permissions = perms })
  };

  // ---------------------------------------------------------------------------
  // Logout
  // ---------------------------------------------------------------------------
  public func logout(sessions : Map.Map<Text, SessionInfo>, sessionToken : Text) {
    sessions.remove(sessionToken);
  };

  // ---------------------------------------------------------------------------
  // validateSession — now returns role and permissions too
  // ---------------------------------------------------------------------------
  public func validateSession(
    sessions : Map.Map<Text, SessionInfo>,
    sessionToken : Text,
  ) : { #ok : { username : Text; displayName : Text; role : Text; permissions : [Text] }; #err : Text } {
    switch (sessions.get(sessionToken)) {
      case null { #err("Invalid or expired session") };
      case (?info) {
        let roleText : Text = switch (info.role) {
          case (?r) r;
          case null {
            if (info.username == "Venkat" or info.username == "Jaychandra") "superAdmin"
            else "viewer"
          };
        };
        let perms : [Text] = switch (info.permissions) {
          case (?p) p;
          case null {
            let derivedRole : RbacTypes.Role = if (info.username == "Venkat" or info.username == "Jaychandra") #superAdmin else #viewer;
            getPermissionsForRole(derivedRole)
          };
        };
        #ok({
          username    = info.username;
          displayName = info.displayName;
          role        = roleText;
          permissions = perms;
        })
      };
    }
  };

  // ---------------------------------------------------------------------------
  // requireSession — returns username or traps
  // ---------------------------------------------------------------------------
  public func requireSession(
    sessions : Map.Map<Text, SessionInfo>,
    sessionToken : Text,
  ) : Text {
    switch (sessions.get(sessionToken)) {
      case null { Runtime.trap("Unauthorized") };
      case (?info) { info.username };
    }
  };

  // ---------------------------------------------------------------------------
  // requirePermission — returns #ok(username) or #err(msg)
  // ---------------------------------------------------------------------------
  public func requirePermission(
    sessions   : Map.Map<Text, SessionInfo>,
    sessionToken : Text,
    permission   : Text,
  ) : { #ok : Text; #err : Text } {
    switch (sessions.get(sessionToken)) {
      case null { #err("Unauthorized: invalid session") };
      case (?info) {
        let perms : [Text] = switch (info.permissions) {
          case (?p) p;
          case null {
            let derivedRole : RbacTypes.Role = if (info.username == "Venkat" or info.username == "Jaychandra") #superAdmin else #viewer;
            getPermissionsForRole(derivedRole)
          };
        };
        var found = false;
        for (p in perms.values()) { if (p == permission) { found := true } };
        if (found) { #ok(info.username) }
        else { #err("Forbidden: missing permission " # permission) }
      };
    }
  };

  // ---------------------------------------------------------------------------
  // getSessionRole — returns the Role for a valid session or null
  // ---------------------------------------------------------------------------
  public func getSessionRole(
    sessions : Map.Map<Text, SessionInfo>,
    sessionToken : Text,
  ) : ?RbacTypes.Role {
    switch (sessions.get(sessionToken)) {
      case null null;
      case (?info) {
        switch (info.role) {
          case (?r) {
            // Parse text back to role
            switch r {
              case "superAdmin" ?#superAdmin;
              case "admin"      ?#admin;
              case "manager"    ?#manager;
              case "hr"         ?#hr;
              case "sales"      ?#sales;
              case "marketing"  ?#marketing;
              case "finance"    ?#finance;
              case "operations" ?#operations;
              case _            ?#viewer;
            }
          };
          case null {
            if (info.username == "Venkat" or info.username == "Jaychandra") ?#superAdmin
            else ?#viewer
          };
        }
      };
    }
  };

};
