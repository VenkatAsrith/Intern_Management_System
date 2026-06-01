import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface NoteComment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  status: "approved" | "needs_clarification" | "";
  createdAt: number;
}

export interface DailyNote {
  id: string;
  internId: string;
  internName: string;
  date: string;
  workedOn: string;
  blockers: string;
  progress: string;
  learningUpdates: string;
  createdAt: number;
  adminComments: NoteComment[];
}

function convertNote(raw: {
  id: string;
  internId: string;
  internName?: string;
  date: string;
  workedOn: string;
  blockers: string;
  progress: string;
  learningUpdates: string;
  createdAt: bigint;
  adminComments: Array<{
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    status: string;
    createdAt: bigint;
  }>;
}): DailyNote {
  return {
    id: raw.id,
    internId: raw.internId,
    internName: raw.internName ?? "",
    date: raw.date,
    workedOn: raw.workedOn,
    blockers: raw.blockers,
    progress: raw.progress,
    learningUpdates: raw.learningUpdates,
    createdAt: Number(raw.createdAt) / 1_000_000,
    adminComments: raw.adminComments.map((c) => ({
      id: c.id,
      authorId: c.authorId,
      authorName: c.authorName,
      content: c.content,
      status: c.status as NoteComment["status"],
      createdAt: Number(c.createdAt) / 1_000_000,
    })),
  };
}

export function useDailyNotes(internId: string | null | undefined) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<DailyNote[]>({
    queryKey: ["dailyNotes", internId],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      try {
        const results = await (
          actor as unknown as {
            getDailyNotesByIntern: (
              t: string,
              id: string,
            ) => Promise<unknown[]>;
          }
        ).getDailyNotesByIntern(sessionToken, internId ?? "all");
        return (results as Parameters<typeof convertNote>[0][]).map(
          convertNote,
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken,
  });
}

export function useAllDailyNotes() {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery<DailyNote[]>({
    queryKey: ["allDailyNotes"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      try {
        const results = await (
          actor as unknown as {
            getDailyNotesByIntern: (
              t: string,
              id: string,
            ) => Promise<unknown[]>;
          }
        ).getDailyNotesByIntern(sessionToken, "all");
        return (results as Parameters<typeof convertNote>[0][]).map(
          convertNote,
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken,
  });
}

export function useCreateDailyNote() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      date: string;
      workedOn: string;
      blockers: string;
      progress: string;
      learningUpdates: string;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await (
        actor as unknown as {
          createDailyNote: (
            t: string,
            p: typeof payload,
          ) => Promise<
            { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: string }
          >;
        }
      ).createDailyNote(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertNote(result.ok as Parameters<typeof convertNote>[0]);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dailyNotes"] });
      qc.invalidateQueries({ queryKey: ["allDailyNotes"] });
      toast.success("Note saved");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to save note"),
  });
}

export function useAddNoteComment() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      noteId,
      content,
      status,
    }: {
      noteId: string;
      content: string;
      status: string;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await (
        actor as unknown as {
          addNoteComment: (
            t: string,
            noteId: string,
            content: string,
            status: string,
          ) => Promise<
            { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: string }
          >;
        }
      ).addNoteComment(sessionToken, noteId, content, status);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertNote(result.ok as Parameters<typeof convertNote>[0]);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dailyNotes"] });
      qc.invalidateQueries({ queryKey: ["allDailyNotes"] });
      toast.success("Comment added");
    },
    onError: (e: Error) => toast.error(e.message || "Failed to add comment"),
  });
}
