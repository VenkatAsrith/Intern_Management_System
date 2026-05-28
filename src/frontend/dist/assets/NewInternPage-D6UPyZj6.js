import { w as useNavigate, F as useCreateIntern, j as jsxRuntimeExports, L as Link, l as Button, G as ArrowLeft, H as internCreatePayload } from "./index-Fes9v1FI.js";
import { I as InternForm } from "./InternForm-0HFsehK8.js";
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
function NewInternPage() {
  const navigate = useNavigate();
  const createIntern = useCreateIntern();
  const handleSubmit = async (data) => {
    const profilePicCid = data.profilePicBlob ? data.profilePicBlob.getDirectURL() : void 0;
    try {
      const result = await createIntern.mutateAsync(
        internCreatePayload({
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
      );
      navigate({ to: "/interns/$id", params: { id: result.id } });
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-2xl mx-auto", "data-ocid": "new_intern.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/interns", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          className: "h-8 w-8",
          "data-ocid": "new_intern.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Add New Intern" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Fill in the details to onboard a new intern" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InternForm,
      {
        mode: "create",
        isPending: createIntern.isPending,
        onSubmit: handleSubmit,
        onCancel: () => navigate({ to: "/interns" }),
        ocidPrefix: "new_intern"
      }
    )
  ] });
}
export {
  NewInternPage
};
