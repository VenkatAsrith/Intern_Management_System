import Map "mo:core/Map";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Auth "../lib/auth";
import Types "../types/interns";

/// Project participation management mixin (V3.5).
mixin (
  projectParticipations : Map.Map<Text, [Types.ProjectParticipation]>,
  projCounter           : { var n : Nat },
  sessions              : Map.Map<Text, Auth.SessionInfo>,
) {

  // -------------------------------------------------------
  // Internal helpers
  // -------------------------------------------------------

  func isProjAdminSession(sessionToken : Text) : Bool {
    switch (Auth.getSessionRole(sessions, sessionToken)) {
      case (?(#superAdmin)) true;
      case (?(#admin))      true;
      case (?(#manager))    true;
      case _                false;
    }
  };

  func nextProjId() : Text {
    projCounter.n += 1;
    "proj-" # Time.now().toText() # "-" # projCounter.n.toText()
  };

  func nextMilestoneId() : Text {
    projCounter.n += 1;
    "ms-" # Time.now().toText() # "-" # projCounter.n.toText()
  };

  // -------------------------------------------------------
  // Project participation CRUD
  // -------------------------------------------------------

  /// Create a new project participation entry for an intern.
  public func createProjectParticipation(
    sessionToken  : Text,
    internId      : Text,
    projectName   : Text,
    role          : Text,
    startDate     : Text,
    deliverables  : [Text],
  ) : async { #ok : Types.ProjectParticipation; #err : Text } {
    ignore Auth.requireSession(sessions, sessionToken);
    if (not isProjAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can assign projects");
    };
    let participation : Types.ProjectParticipation = {
      id               = nextProjId();
      internId;
      projectName;
      role;
      startDate;
      status           = "Active";
      milestones       = [];
      deliverables;
      completionPercent = 0;
    };
    let existing = switch (projectParticipations.get(internId)) {
      case null [];
      case (?ps) ps;
    };
    projectParticipations.add(internId, existing.concat([participation]));
    #ok participation
  };

  /// Update fields of an existing project participation.
  public func updateProjectParticipation(
    sessionToken      : Text,
    internId          : Text,
    projId            : Text,
    status            : ?Text,
    completionPercent : ?Nat,
    deliverables      : ?[Text],
  ) : async { #ok : Types.ProjectParticipation; #err : Text } {
    ignore Auth.requireSession(sessions, sessionToken);
    if (not isProjAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can update project participation");
    };
    switch (projectParticipations.get(internId)) {
      case null { #err("No projects found for intern") };
      case (?projects) {
        var found : ?Types.ProjectParticipation = null;
        let updated = projects.map(func(p : Types.ProjectParticipation) : Types.ProjectParticipation {
          if (p.id == projId) {
            let u : Types.ProjectParticipation = {
              p with
              status            = switch (status) { case (?s) s; case null p.status };
              completionPercent = switch (completionPercent) { case (?c) c; case null p.completionPercent };
              deliverables      = switch (deliverables) { case (?d) d; case null p.deliverables };
            };
            found := ?u;
            u
          } else p
        });
        switch (found) {
          case null { #err("Project not found") };
          case (?proj) {
            projectParticipations.add(internId, updated);
            #ok proj
          };
        }
      };
    }
  };

  /// Return all project participations for an intern.
  public query func getProjectsByIntern(
    sessionToken : Text,
    internId     : Text,
  ) : async [Types.ProjectParticipation] {
    ignore Auth.requireSession(sessions, sessionToken);
    switch (projectParticipations.get(internId)) {
      case null [];
      case (?ps) ps;
    }
  };

  /// Add a milestone to a project participation.
  public func addProjectMilestone(
    sessionToken  : Text,
    internId      : Text,
    projId        : Text,
    milestoneName : Text,
  ) : async { #ok : Types.ProjectParticipation; #err : Text } {
    ignore Auth.requireSession(sessions, sessionToken);
    if (not isProjAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can add milestones");
    };
    switch (projectParticipations.get(internId)) {
      case null { #err("No projects found for intern") };
      case (?projects) {
        var found : ?Types.ProjectParticipation = null;
        let ms : Types.ProjectMilestone = {
          id          = nextMilestoneId();
          name        = milestoneName;
          status      = "Pending";
          completedAt = null;
        };
        let updated = projects.map(func(p : Types.ProjectParticipation) : Types.ProjectParticipation {
          if (p.id == projId) {
            let u : Types.ProjectParticipation = { p with milestones = p.milestones.concat([ms]) };
            found := ?u;
            u
          } else p
        });
        switch (found) {
          case null { #err("Project not found") };
          case (?proj) {
            projectParticipations.add(internId, updated);
            #ok proj
          };
        }
      };
    }
  };

  /// Update the status of a specific milestone.
  public func updateMilestone(
    sessionToken  : Text,
    internId      : Text,
    projId        : Text,
    milestoneId   : Text,
    status        : Text,
  ) : async { #ok : Types.ProjectParticipation; #err : Text } {
    ignore Auth.requireSession(sessions, sessionToken);
    switch (projectParticipations.get(internId)) {
      case null { #err("No projects found for intern") };
      case (?projects) {
        var found : ?Types.ProjectParticipation = null;
        let now = Time.now();
        let updated = projects.map(func(p : Types.ProjectParticipation) : Types.ProjectParticipation {
          if (p.id == projId) {
            let updatedMs = p.milestones.map(func(m : Types.ProjectMilestone) : Types.ProjectMilestone {
              if (m.id == milestoneId) {
                {
                  m with
                  status;
                  completedAt = if (status == "Completed") ?now else m.completedAt;
                }
              } else m
            });
            // Recompute completion percent from milestone statuses
            let total = updatedMs.size();
            let done  = updatedMs.filter(func(m : Types.ProjectMilestone) : Bool { m.status == "Completed" }).size();
            let pct   : Nat = if (total == 0) p.completionPercent else done * 100 / total;
            let u : Types.ProjectParticipation = { p with milestones = updatedMs; completionPercent = pct };
            found := ?u;
            u
          } else p
        });
        switch (found) {
          case null { #err("Project not found") };
          case (?proj) {
            projectParticipations.add(internId, updated);
            #ok proj
          };
        }
      };
    }
  };

};
