import Map "mo:core/Map";
import Time "mo:core/Time";
import Auth "../lib/auth";
import Types "../types/interns";

/// Document records management mixin (V3.5).
/// Manages document versions, approval status, and archiving per intern.
mixin (
  documentRecords : Map.Map<Text, Types.DocumentRecord>,
  docCounter      : { var n : Nat },
  sessions        : Map.Map<Text, Auth.SessionInfo>,
) {

  // -------------------------------------------------------
  // Internal helpers
  // -------------------------------------------------------

  func isDocAdminSession(sessionToken : Text) : Bool {
    switch (Auth.getSessionRole(sessions, sessionToken)) {
      case (?(#superAdmin)) true;
      case (?(#admin))      true;
      case (?(#manager))    true;
      case (?(#hr))         true;
      case _                false;
    }
  };

  func nextDocId() : Text {
    docCounter.n += 1;
    "doc-" # Time.now().toText() # "-" # docCounter.n.toText()
  };

  func nextVersionId() : Text {
    docCounter.n += 1;
    "dv-" # Time.now().toText() # "-" # docCounter.n.toText()
  };

  // -------------------------------------------------------
  // CRUD
  // -------------------------------------------------------

  /// Create a new document record for an intern with an initial version.
  public func createDocumentRecord(
    sessionToken  : Text,
    internId      : Text,
    category      : Text,
    docType       : Text,
    fileName      : Text,
    versionLabel  : Text,
    notes         : Text,
  ) : async { #ok : Types.DocumentRecord; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    let now      = Time.now();
    let vId      = nextVersionId();
    let firstVersion : Types.DocumentVersion = {
      id             = vId;
      docType;
      version        = versionLabel;
      generatedAt    = now;
      generatedBy    = username;
      approvalStatus = "Pending";
      notes;
    };
    let docId = nextDocId();
    let record : Types.DocumentRecord = {
      docId;
      internId;
      category;
      docType;
      fileName;
      currentVersion = versionLabel;
      versions       = [firstVersion];
      isArchived     = false;
    };
    documentRecords.add(docId, record);
    #ok record
  };

  /// Return all non-archived document records for a given intern.
  public query func getDocumentsByIntern(
    sessionToken : Text,
    internId     : Text,
  ) : async [Types.DocumentRecord] {
    ignore Auth.requireSession(sessions, sessionToken);
    documentRecords.toArray()
      .filter(func((_, d) : (Text, Types.DocumentRecord)) : Bool {
        d.internId == internId and not d.isArchived
      })
      .map<(Text, Types.DocumentRecord), Types.DocumentRecord>(func((_, d)) = d)
  };

  /// Return a single document record by its docId.
  public query func getDocumentById(
    sessionToken : Text,
    docId        : Text,
  ) : async ?Types.DocumentRecord {
    ignore Auth.requireSession(sessions, sessionToken);
    documentRecords.get(docId)
  };

  /// Append a new version to an existing document record.
  public func addDocumentVersion(
    sessionToken : Text,
    docId        : Text,
    versionLabel : Text,
    notes        : Text,
  ) : async { #ok : Types.DocumentRecord; #err : Text } {
    let username = Auth.requireSession(sessions, sessionToken);
    switch (documentRecords.get(docId)) {
      case null { #err("Document not found") };
      case (?doc) {
        let now = Time.now();
        let newVersion : Types.DocumentVersion = {
          id             = nextVersionId();
          docType        = doc.docType;
          version        = versionLabel;
          generatedAt    = now;
          generatedBy    = username;
          approvalStatus = "Pending";
          notes;
        };
        let updated : Types.DocumentRecord = {
          doc with
          currentVersion = versionLabel;
          versions       = doc.versions.concat([newVersion]);
        };
        documentRecords.add(docId, updated);
        #ok updated
      };
    }
  };

  /// Update the approval status of a specific document version.
  public func updateDocumentApproval(
    sessionToken   : Text,
    docId          : Text,
    versionLabel   : Text,
    approvalStatus : Text,
  ) : async { #ok : Types.DocumentRecord; #err : Text } {
    ignore Auth.requireSession(sessions, sessionToken);
    if (not isDocAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can approve documents");
    };
    switch (documentRecords.get(docId)) {
      case null { #err("Document not found") };
      case (?doc) {
        let updatedVersions = doc.versions.map(func(v : Types.DocumentVersion) : Types.DocumentVersion {
          if (v.version == versionLabel) { { v with approvalStatus } }
          else v
        });
        let updated : Types.DocumentRecord = { doc with versions = updatedVersions };
        documentRecords.add(docId, updated);
        #ok updated
      };
    }
  };

  /// Archive a document record (soft delete).
  public func archiveDocument(
    sessionToken : Text,
    docId        : Text,
  ) : async { #ok : Bool; #err : Text } {
    ignore Auth.requireSession(sessions, sessionToken);
    if (not isDocAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can archive documents");
    };
    switch (documentRecords.get(docId)) {
      case null { #err("Document not found") };
      case (?doc) {
        documentRecords.add(docId, { doc with isArchived = true });
        #ok true
      };
    }
  };

  /// Permanently delete a document record.
  public func deleteDocument(
    sessionToken : Text,
    docId        : Text,
  ) : async { #ok : Bool; #err : Text } {
    ignore Auth.requireSession(sessions, sessionToken);
    if (not isDocAdminSession(sessionToken)) {
      return #err("Forbidden: only admins can delete documents");
    };
    switch (documentRecords.get(docId)) {
      case null { #err("Document not found") };
      case (?_) {
        documentRecords.remove(docId);
        #ok true
      };
    }
  };

  /// Return the full version history for a document.
  public query func getDocumentVersionHistory(
    sessionToken : Text,
    docId        : Text,
  ) : async { #ok : [Types.DocumentVersion]; #err : Text } {
    ignore Auth.requireSession(sessions, sessionToken);
    switch (documentRecords.get(docId)) {
      case null { #err("Document not found") };
      case (?doc) {
        let arr = doc.versions;
        #ok arr
      };
    }
  };

};
