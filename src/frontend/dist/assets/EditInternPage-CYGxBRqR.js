import { Q as useParams, q as useNavigate, T as useIntern, X as useUpdateIntern, p as useDeleteIntern, j as jsxRuntimeExports, L as Link, k as Button, A as ArrowLeft, Y as internUpdatePayload } from "./index-Cx0SFoKr.js";
import { I as InternForm } from "./InternForm-CrauCyT7.js";
import { A as AlertDialog, h as AlertDialogTrigger, T as Trash2, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-C1aDMVnY.js";
import "./card-Cv07JjGR.js";
import "./input-DGvN6Bpn.js";
import "./label-Mcr_69bu.js";
import "./select-B8J2Sdiv.js";
import "./index-t2AFSBRW.js";
import "./index-pB3Femft.js";
import "./chevron-down-BAVyvl7E.js";
import "./textarea-h8IksRvN.js";
import "./index-AnWvD9gK.js";
function EditInternPage() {
  const { id } = useParams({ from: "/protected/layout/interns/$id/edit" });
  const navigate = useNavigate();
  const { data: intern, isLoading } = useIntern(id);
  const updateIntern = useUpdateIntern();
  const deleteIntern = useDeleteIntern();
  const handleSubmit = async (data) => {
    const profilePicCid = data.profilePicBlob ? data.profilePicBlob.getDirectURL() : intern == null ? void 0 : intern.profilePicCid;
    try {
      await updateIntern.mutateAsync({
        id,
        payload: internUpdatePayload({
          name: data.name,
          email: data.email,
          phone: data.phone,
          department: data.department,
          space: data.space,
          status: data.status,
          experienceLevel: data.experienceLevel,
          joiningDate: new Date(data.joiningDate),
          adminNotes: data.adminNotes,
          profilePicCid
        })
      });
      navigate({ to: "/interns/$id", params: { id } });
    } catch {
    }
  };
  const handleDelete = async () => {
    try {
      await deleteIntern.mutateAsync(id);
      navigate({ to: "/interns" });
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-2xl mx-auto", "data-ocid": "edit_intern.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/interns/$id", params: { id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "h-8 w-8",
            "data-ocid": "edit_intern.back_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: isLoading ? "Edit Intern" : `Edit Intern — ${(intern == null ? void 0 : intern.name) ?? ""}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Update intern profile and settings" })
        ] })
      ] }),
      !isLoading && intern && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10",
            "data-ocid": "edit_intern.delete_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              " Delete"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "edit_intern.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Intern" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to permanently delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: intern.name }),
              "? This will also remove all performance records. This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "edit_intern.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                className: "bg-destructive hover:bg-destructive/90",
                "data-ocid": "edit_intern.confirm_button",
                disabled: deleteIntern.isPending,
                children: deleteIntern.isPending ? "Deleting…" : "Delete Intern"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InternForm,
      {
        mode: "edit",
        initialData: intern,
        isLoading,
        isPending: updateIntern.isPending,
        onSubmit: handleSubmit,
        onCancel: () => navigate({ to: "/interns/$id", params: { id } }),
        ocidPrefix: "edit_intern"
      }
    )
  ] });
}
export {
  EditInternPage
};
