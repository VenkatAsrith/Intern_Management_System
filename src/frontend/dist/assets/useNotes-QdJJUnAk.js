import { Q as useBackend, u as useAuth, R as useQuery, V as useQueryClient, W as useMutation, P as ue } from "./index-BMeK9e6q.js";
function convertNote(raw) {
  return {
    id: raw.id,
    internId: raw.internId,
    internName: raw.internName ?? "",
    date: raw.date,
    workedOn: raw.workedOn,
    blockers: raw.blockers,
    progress: raw.progress,
    learningUpdates: raw.learningUpdates,
    createdAt: Number(raw.createdAt) / 1e6,
    adminComments: raw.adminComments.map((c) => ({
      id: c.id,
      authorId: c.authorId,
      authorName: c.authorName,
      content: c.content,
      status: c.status,
      createdAt: Number(c.createdAt) / 1e6
    }))
  };
}
function useDailyNotes(internId) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["dailyNotes", internId],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      try {
        const results = await actor.getDailyNotesByIntern(sessionToken, internId ?? "all");
        return results.map(
          convertNote
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken
  });
}
function useAllDailyNotes() {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["allDailyNotes"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      try {
        const results = await actor.getDailyNotesByIntern(sessionToken, "all");
        return results.map(
          convertNote
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken
  });
}
function useCreateDailyNote() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.createDailyNote(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertNote(result.ok);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dailyNotes"] });
      qc.invalidateQueries({ queryKey: ["allDailyNotes"] });
      ue.success("Note saved");
    },
    onError: (e) => ue.error(e.message || "Failed to save note")
  });
}
function useAddNoteComment() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      noteId,
      content,
      status
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.addNoteComment(sessionToken, noteId, content, status);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertNote(result.ok);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dailyNotes"] });
      qc.invalidateQueries({ queryKey: ["allDailyNotes"] });
      ue.success("Comment added");
    },
    onError: (e) => ue.error(e.message || "Failed to add comment")
  });
}
export {
  useDailyNotes as a,
  useAddNoteComment as b,
  useCreateDailyNote as c,
  useAllDailyNotes as u
};
