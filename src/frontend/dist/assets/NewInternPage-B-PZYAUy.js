import { x as useNavigate, G as useCreateIntern, j as jsxRuntimeExports, L as Link, m as Button, H as ArrowLeft, I as internCreatePayload } from "./index-BMeK9e6q.js";
import { I as InternForm } from "./InternForm-B7LZQJoP.js";
import "./card-BNUdlcux.js";
import "./input-nhKD80eO.js";
import "./label-D89oqzVf.js";
import "./select-D791wupo.js";
import "./index-IXOTxK3N.js";
import "./index-Caxnbhfp.js";
import "./index-r27OJ7K6.js";
import "./index-CKQkaznJ.js";
import "./index-NDr7xJHf.js";
import "./index-xhjDzk0w.js";
import "./chevron-down-DGBe83Kh.js";
import "./check-Bu_kUyWO.js";
import "./textarea-DLaPF2KD.js";
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
