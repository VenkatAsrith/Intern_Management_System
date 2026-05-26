import { c as createLucideIcon, r as reactExports, w as ExperienceLevel, v as Status, t as Space, j as jsxRuntimeExports, l as Skeleton, Z as X, k as Button, _ as LoaderCircle, $ as ExternalBlob } from "./index-Cx0SFoKr.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cv07JjGR.js";
import { I as Input } from "./input-DGvN6Bpn.js";
import { L as Label } from "./label-Mcr_69bu.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B8J2Sdiv.js";
import { T as Textarea } from "./textarea-h8IksRvN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode);
function validateEmail(v) {
  if (!v) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return "Enter a valid email address";
}
function validatePhone(v) {
  if (!v.trim()) return "Phone is required";
  const stripped = v.replace(/[\s\-()]/g, "");
  if (stripped.length < 6 || stripped.length > 15 || !/^\+?\d+$/.test(stripped))
    return "Enter a valid phone number";
}
const MAX_FILE_SIZE = 5 * 1024 * 1024;
function InternForm({
  mode,
  initialData,
  isLoading,
  isPending,
  onSubmit,
  onCancel,
  ocidPrefix
}) {
  const isEdit = mode === "edit";
  const [form, setForm] = reactExports.useState(() => ({
    name: (initialData == null ? void 0 : initialData.name) ?? "",
    email: (initialData == null ? void 0 : initialData.email) ?? "",
    phone: (initialData == null ? void 0 : initialData.phone) ?? "",
    department: (initialData == null ? void 0 : initialData.department) ?? "",
    space: (initialData == null ? void 0 : initialData.space) ?? Space.Org,
    status: (initialData == null ? void 0 : initialData.status) ?? Status.Active,
    experienceLevel: (initialData == null ? void 0 : initialData.experienceLevel) ?? ExperienceLevel.Junior,
    joiningDate: (initialData == null ? void 0 : initialData.joiningDate) ? initialData.joiningDate.toISOString().split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    adminNotes: (initialData == null ? void 0 : initialData.adminNotes) ?? "",
    profilePicBlob: null
  }));
  const [errors, setErrors] = reactExports.useState({});
  const [previewUrl, setPreviewUrl] = reactExports.useState(
    (initialData == null ? void 0 : initialData.profilePicCid) ?? null
  );
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const [synced, setSynced] = reactExports.useState(false);
  if (isEdit && initialData && !synced) {
    setForm({
      name: initialData.name,
      email: initialData.email,
      phone: initialData.phone,
      department: initialData.department,
      space: initialData.space,
      status: initialData.status,
      experienceLevel: initialData.experienceLevel,
      joiningDate: initialData.joiningDate.toISOString().split("T")[0],
      adminNotes: initialData.adminNotes,
      profilePicBlob: null
    });
    setPreviewUrl(initialData.profilePicCid ?? null);
    setSynced(true);
  }
  const set = reactExports.useCallback(
    (k, v) => setForm((f) => ({ ...f, [k]: v })),
    []
  );
  const validateField = (field, value) => {
    let error;
    if (field === "name" && !value.trim()) error = "Name is required";
    if (field === "email") error = validateEmail(value);
    if (field === "phone") error = validatePhone(value);
    if (field === "department" && !value.trim())
      error = "Department is required";
    if (field === "joiningDate" && !value) error = "Joining date is required";
    setErrors((prev) => ({ ...prev, [field]: error }));
  };
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, profilePic: "File exceeds 5MB limit" }));
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        profilePic: "Only image files allowed"
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, profilePic: void 0 }));
    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result;
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);
      blob.withUploadProgress((pct) => setUploadProgress(pct));
      setPreviewUrl(
        URL.createObjectURL(new Blob([bytes], { type: file.type }))
      );
      setForm((f) => ({ ...f, profilePicBlob: blob }));
      setUploadProgress(null);
    };
    reader.readAsArrayBuffer(file);
  };
  const removePhoto = () => {
    setPreviewUrl(null);
    setForm((f) => ({ ...f, profilePicBlob: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const validateAll = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;
    const phoneErr = validatePhone(form.phone);
    if (phoneErr) newErrors.phone = phoneErr;
    if (!form.department.trim())
      newErrors.department = "Department is required";
    if (!form.joiningDate) newErrors.joiningDate = "Joining date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    await onSubmit(form);
  };
  const isFormValid = form.name.trim() && !validateEmail(form.email) && !validatePhone(form.phone) && form.department.trim() && form.joiningDate;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Profile Photo" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: previewUrl,
                alt: "Profile preview",
                className: "h-24 w-24 rounded-full object-cover border-2 border-primary/40"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: removePhoto,
                className: "absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/80 transition-colors",
                "aria-label": "Remove photo",
                "data-ocid": `${ocidPrefix}.remove_photo_button`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3 text-white" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              className: "h-24 w-24 rounded-full border-2 border-dashed border-border hover:border-primary/60 bg-muted/40 flex flex-col items-center justify-center gap-1 transition-colors group",
              "aria-label": "Upload photo",
              "data-ocid": `${ocidPrefix}.upload_photo_button`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" })
            }
          ),
          uploadProgress !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-primary", children: [
            uploadProgress,
            "%"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              className: "text-sm font-medium text-primary hover:text-primary/80 transition-colors",
              "data-ocid": `${ocidPrefix}.upload_button`,
              children: previewUrl ? "Change photo" : "Upload photo"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "JPG, PNG or WebP · max 5 MB" }),
          errors.profilePic && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": `${ocidPrefix}.photo_error`,
              children: errors.profilePic
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: handleFileChange,
            "data-ocid": `${ocidPrefix}.photo_input`
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Intern Information" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `${ocidPrefix}-name`, children: [
              "Full Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `${ocidPrefix}-name`,
                value: form.name,
                onChange: (e) => set("name", e.target.value),
                onBlur: (e) => validateField("name", e.target.value),
                placeholder: "Arjun Sharma",
                className: errors.name ? "border-destructive focus-visible:ring-destructive" : "",
                "data-ocid": `${ocidPrefix}.name_input`
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": `${ocidPrefix}.name_error`,
                children: errors.name
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `${ocidPrefix}-email`, children: [
              "Email ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `${ocidPrefix}-email`,
                type: "email",
                value: form.email,
                onChange: (e) => set("email", e.target.value),
                onBlur: (e) => validateField("email", e.target.value),
                placeholder: "arjun@example.com",
                className: errors.email ? "border-destructive focus-visible:ring-destructive" : "",
                "data-ocid": `${ocidPrefix}.email_input`
              }
            ),
            errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": `${ocidPrefix}.email_error`,
                children: errors.email
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `${ocidPrefix}-phone`, children: [
              "Phone ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `${ocidPrefix}-phone`,
                value: form.phone,
                onChange: (e) => set("phone", e.target.value),
                onBlur: (e) => validateField("phone", e.target.value),
                placeholder: "9876543210",
                maxLength: 15,
                className: errors.phone ? "border-destructive focus-visible:ring-destructive" : "",
                "data-ocid": `${ocidPrefix}.phone_input`
              }
            ),
            errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": `${ocidPrefix}.phone_error`,
                children: errors.phone
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `${ocidPrefix}-dept`, children: [
              "Department ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `${ocidPrefix}-dept`,
                value: form.department,
                onChange: (e) => set("department", e.target.value),
                onBlur: (e) => validateField("department", e.target.value),
                placeholder: "Engineering",
                className: errors.department ? "border-destructive focus-visible:ring-destructive" : "",
                "data-ocid": `${ocidPrefix}.department_input`
              }
            ),
            errors.department && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": `${ocidPrefix}.dept_error`,
                children: errors.department
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `${ocidPrefix}-joining`, children: [
              "Joining Date ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `${ocidPrefix}-joining`,
                type: "date",
                value: form.joiningDate,
                onChange: (e) => set("joiningDate", e.target.value),
                onBlur: (e) => validateField("joiningDate", e.target.value),
                className: errors.joiningDate ? "border-destructive focus-visible:ring-destructive" : "",
                "data-ocid": `${ocidPrefix}.joining_date_input`
              }
            ),
            errors.joiningDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": `${ocidPrefix}.joining_date_error`,
                children: errors.joiningDate
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Space ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.space,
                onValueChange: (v) => set("space", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": `${ocidPrefix}.space_select`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Space.Org, children: "Org" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Space.Marketing, children: "Marketing" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Space.Learning, children: "Learning" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Status ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.status,
                onValueChange: (v) => set("status", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": `${ocidPrefix}.status_select`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Status.Active, children: "Active" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Status.Completed, children: "Completed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Status.OnHold, children: "On Hold" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Experience Level ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.experienceLevel,
                onValueChange: (v) => set("experienceLevel", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": `${ocidPrefix}.exp_level_select`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ExperienceLevel.Junior, children: "Junior" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ExperienceLevel.Mid, children: "Mid" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ExperienceLevel.Senior, children: "Senior" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${ocidPrefix}-notes`, children: "Admin Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: `${ocidPrefix}-notes`,
              value: form.adminNotes,
              onChange: (e) => set("adminNotes", e.target.value),
              placeholder: "Internal notes about this intern…",
              rows: 3,
              "data-ocid": `${ocidPrefix}.notes_textarea`
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Fields marked ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" }),
        " are required"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onCancel,
            "data-ocid": `${ocidPrefix}.cancel_button`,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "bg-primary hover:bg-primary/90 min-w-[130px]",
            disabled: isPending || !isFormValid,
            "data-ocid": `${ocidPrefix}.submit_button`,
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              isEdit ? "Saving…" : "Creating…"
            ] }) : isEdit ? "Save Changes" : "Create Intern"
          }
        )
      ] })
    ] })
  ] });
}
export {
  InternForm as I
};
