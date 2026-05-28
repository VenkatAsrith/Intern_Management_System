import { X as useParams, w as useNavigate, Y as useIntern, $ as useUpdateIntern, v as useDeleteIntern, j as jsxRuntimeExports, L as Link, l as Button, G as ArrowLeft, a0 as internUpdatePayload } from "./index-Fes9v1FI.js";
import { I as InternForm } from "./InternForm-0HFsehK8.js";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BNpE8GDg.js";
import { T as Trash2 } from "./trash-2-DdreQTBL.js";
import "./card-Cv2_TPJE.js";
import "./input-c3RLJhH7.js";
import "./label-BkHoCj3b.js";
import "./select-CMxv2F83.js";
import "./index-Dty2Pq1p.js";
import "./index-BJzhuyB3.js";
import "./index-XezQyXZK.js";
import "./index-vZVdx1MD.js";
import "./chevron-down-CXO-u7hj.js";
import "./check-DNYA6atX.js";
import "./textarea-C38mBxqU.js";
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
