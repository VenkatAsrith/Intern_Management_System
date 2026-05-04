import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

module {

  // Hardcoded admin users: (username, password, displayName)
  let USERS : [(Text, Text, Text)] = [
    ("Venkat",     "Venkat2629",      "Venkat Asrith"),
    ("Jaychandra", "Jaychandra2288",  "Jay Chandra"),
  ];

  public type SessionInfo = { username : Text; displayName : Text };

  func findUser(username : Text, password : Text) : ?Text {
    var found : ?Text = null;
    for ((u, p, d) in USERS.values()) {
      if (u == username and p == password) { found := ?d };
    };
    found
  };

  public func login(
    sessions : Map.Map<Text, SessionInfo>,
    username : Text,
    password : Text,
  ) : { #ok : { sessionToken : Text; displayName : Text }; #err : Text } {
    switch (findUser(username, password)) {
      case null { #err("Invalid username or password") };
      case (?displayName) {
        let token = Time.now().toText() # "-" # username # "-session";
        sessions.add(token, { username; displayName });
        #ok({ sessionToken = token; displayName })
      };
    }
  };

  public func logout(sessions : Map.Map<Text, SessionInfo>, sessionToken : Text) {
    sessions.remove(sessionToken);
  };

  public func validateSession(
    sessions : Map.Map<Text, SessionInfo>,
    sessionToken : Text,
  ) : { #ok : { username : Text; displayName : Text }; #err : Text } {
    switch (sessions.get(sessionToken)) {
      case null { #err("Invalid or expired session") };
      case (?info) { #ok({ username = info.username; displayName = info.displayName }) };
    }
  };

  public func requireSession(
    sessions : Map.Map<Text, SessionInfo>,
    sessionToken : Text,
  ) : Text {
    switch (sessions.get(sessionToken)) {
      case null { Runtime.trap("Unauthorized") };
      case (?info) { info.username };
    }
  };

};
