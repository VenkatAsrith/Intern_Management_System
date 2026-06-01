import { c as createLucideIcon, Q as useBackend, u as useAuth, R as useQuery, V as useQueryClient, W as useMutation, P as ue } from "./index-BMeK9e6q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]
];
const GitBranch = createLucideIcon("git-branch", __iconNode);
function convertSubmission(raw) {
  const toOpt = (v) => {
    if (v === null || v === void 0) return null;
    if (Array.isArray(v)) return v.length > 0 ? String(v[0]) : null;
    return String(v);
  };
  return {
    id: raw.id,
    internId: raw.internId,
    internName: raw.internName ?? "",
    taskId: toOpt(raw.taskId),
    title: raw.title,
    description: raw.description,
    githubLink: toOpt(raw.githubLink),
    driveLink: toOpt(raw.driveLink),
    fileUrls: raw.fileUrls,
    notes: raw.notes ?? "",
    status: raw.status,
    adminFeedback: toOpt(raw.adminFeedback),
    reviewedBy: toOpt(raw.reviewedBy),
    createdAt: Number(raw.createdAt) / 1e6,
    reviewedAt: raw.reviewedAt ? (() => {
      const v = raw.reviewedAt;
      if (Array.isArray(v))
        return v.length > 0 ? Number(v[0]) / 1e6 : null;
      if (typeof v === "bigint") return Number(v) / 1e6;
      return null;
    })() : null
  };
}
function useSubmissions(internId) {
  const { actor, isFetching } = useBackend();
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["submissions", internId ?? "all"],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      try {
        const results = await actor.getSubmissionsByIntern(sessionToken, internId ?? "all");
        return results.map(
          convertSubmission
        );
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!sessionToken
  });
}
function useCreateSubmission() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.createSubmission(sessionToken, payload);
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertSubmission(
        result.ok
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["submissions"] });
      ue.success("Submission created");
    },
    onError: (e) => ue.error(e.message || "Failed to create submission")
  });
}
function useUpdateSubmissionStatus() {
  const { actor } = useBackend();
  const { sessionToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      feedback
    }) => {
      if (!actor || !sessionToken) throw new Error("Not connected");
      const result = await actor.updateSubmissionStatus(sessionToken, id, status, feedback ?? "");
      if (result.__kind__ === "err") throw new Error(result.err);
      return convertSubmission(
        result.ok
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["submissions"] });
      ue.success("Submission updated");
    },
    onError: (e) => ue.error(e.message || "Failed to update submission")
  });
}
export {
  GitBranch as G,
  useCreateSubmission as a,
  useUpdateSubmissionStatus as b,
  useSubmissions as u
};
