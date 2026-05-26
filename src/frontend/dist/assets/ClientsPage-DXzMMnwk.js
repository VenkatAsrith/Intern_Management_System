import { c as createLucideIcon, a3 as useAddClientActivity, r as reactExports, j as jsxRuntimeExports, z as User, k as Button, a4 as ActivityType, a5 as useComposedRefs, a6 as cn, e as useClients, a7 as useDeleteClient, a8 as useUpdateClientStatus, q as useNavigate, n as ClientStatus, S as STATUS_LABELS, a9 as PRIORITY_LABELS, m as Badge, L as Link, h as Calendar, s as Search, i as STATUS_COLORS, aa as PriorityLevel, Z as X, l as Skeleton, U as Users, ab as TriangleAlert, E as Eye } from "./index-Cx0SFoKr.js";
import { S as StatusBadge, P as PriorityBadge, C as ClientForm } from "./StatusBadge-BJP5YXyI.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-CLk8W9-n.js";
import { L as Label } from "./label-Mcr_69bu.js";
import { T as Textarea } from "./textarea-h8IksRvN.js";
import { M as MessageCircle } from "./index-C73v2j7e.js";
import { P as Phone, F as Flame } from "./phone-Om3UKbVn.js";
import { C as CircleCheck } from "./circle-x-DvuSR1A-.js";
import { T as Trash2, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-C1aDMVnY.js";
import { P as Primitive, u as useControllableState, c as composeEventHandlers, a as createContextScope } from "./index-t2AFSBRW.js";
import { u as usePrevious, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as ChevronUp } from "./select-B8J2Sdiv.js";
import { u as useSize, C as Check } from "./index-pB3Femft.js";
import { P as Presence } from "./index-AnWvD9gK.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuLabel, d as DropdownMenuSeparator, e as DropdownMenuCheckboxItem, f as DropdownMenuItem } from "./dropdown-menu-DtdHX-nr.js";
import { I as Input } from "./input-DGvN6Bpn.js";
import { L as LayoutGrid } from "./layout-grid-DoX8Om2g.js";
import { D as Download } from "./download-BM2OU4D5.js";
import { P as Plus } from "./plus-QwDbQIee.js";
import { C as Circle } from "./circle-BfbLHcck.js";
import { S as Star } from "./star-BfzHEmPw.js";
import { P as Pencil } from "./pencil-BOlCHWBq.js";
import { C as ChevronDown } from "./chevron-down-BAVyvl7E.js";
import "./zap-CtjPSRtY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 3v18", key: "108xh3" }]
];
const Columns2 = createLucideIcon("columns-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
];
const Table = createLucideIcon("table", __iconNode);
const TEMPLATES = [
  {
    key: "initial_outreach",
    label: "Initial Outreach",
    build: (c) => `Hi ${c.contactPersonName}, I'm reaching out from TechMecha Torque regarding ${c.serviceInterested}. Would you be interested in a quick call to discuss?`
  },
  {
    key: "follow_up",
    label: "Follow-up",
    build: (c) => `Hi ${c.contactPersonName}, Following up on our previous conversation about ${c.serviceInterested}. Are you available for a call this week?`
  },
  {
    key: "proposal_sent",
    label: "Proposal Sent",
    build: (c) => `Hi ${c.contactPersonName}, I've sent you a proposal for ${c.serviceInterested}. Please review and let me know if you have any questions.`
  },
  {
    key: "meeting_reminder",
    label: "Meeting Reminder",
    build: (c) => `Hi ${c.contactPersonName}, Just a reminder about our meeting regarding ${c.serviceInterested}. Looking forward to connecting!`
  }
];
function WhatsAppModal({ client, isOpen, onClose }) {
  const addActivity = useAddClientActivity();
  const [selectedKey, setSelectedKey] = reactExports.useState(TEMPLATES[0].key);
  const [message, setMessage] = reactExports.useState(TEMPLATES[0].build(client));
  const [sent, setSent] = reactExports.useState(false);
  const rawNumber = (client.whatsappNumber || client.phone).replace(/\D/g, "");
  function selectTemplate(t) {
    setSelectedKey(t.key);
    setMessage(t.build(client));
    setSent(false);
  }
  function handleOpen() {
    var _a;
    const url = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    const templateLabel = ((_a = TEMPLATES.find((t) => t.key === selectedKey)) == null ? void 0 : _a.label) ?? "Custom message";
    addActivity.mutate({
      clientId: client.id,
      activityType: ActivityType.whatsappMessage,
      description: `WhatsApp message sent via "${templateLabel}" template`,
      metadata: message.slice(0, 200)
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg bg-card border-border",
      "data-ocid": "whatsapp.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-emerald-400" }) }),
          "Send WhatsApp Message"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/40 border border-border p-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: client.contactPersonName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "· ",
              client.designation,
              " · ",
              client.companyName
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 text-emerald-400 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono text-emerald-400 font-medium", children: client.whatsappNumber || client.phone })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Message Template" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: TEMPLATES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => selectTemplate(t),
              className: `text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${selectedKey === t.key ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300" : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`,
              "data-ocid": `whatsapp.template_${t.key}`,
              children: t.label
            },
            t.key
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "wa-message",
              className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              children: "Message"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "wa-message",
              value: message,
              onChange: (e) => {
                setMessage(e.target.value);
                setSent(false);
              },
              rows: 5,
              className: "resize-none text-sm bg-background border-border focus:border-emerald-500/50",
              placeholder: "Type your message...",
              "data-ocid": "whatsapp.message_textarea"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
            message.length,
            " characters"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
          sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-emerald-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
            "Opened WhatsApp — activity logged"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Opens WhatsApp in a new tab" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: onClose,
                "data-ocid": "whatsapp.close_button",
                children: "Close"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                disabled: !message.trim() || !rawNumber,
                onClick: handleOpen,
                className: "bg-emerald-600 hover:bg-emerald-500 text-white gap-2",
                "data-ocid": "whatsapp.open_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
                  "Open WhatsApp"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const LS = {
  PINNED: "crm:pinnedClients",
  SAVED_FILTERS: "crm:savedFilters",
  ONBOARDING: "crm:onboardingDone"
};
function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
  }
}
function usePinnedClients() {
  const [pinned, setPinned] = reactExports.useState(
    () => new Set(load(LS.PINNED, []))
  );
  function togglePin(id) {
    setPinned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      save(LS.PINNED, Array.from(next));
      return next;
    });
  }
  return { pinned, togglePin };
}
function useSavedFilters() {
  const [saved, setSaved] = reactExports.useState(
    () => load(LS.SAVED_FILTERS, [])
  );
  function saveFilter(name, filters) {
    const entry = {
      id: `f_${Date.now()}`,
      name,
      filters
    };
    setSaved((prev) => {
      const next = [...prev, entry];
      save(LS.SAVED_FILTERS, next);
      return next;
    });
  }
  function deleteFilter(id) {
    setSaved((prev) => {
      const next = prev.filter((f) => f.id !== id);
      save(LS.SAVED_FILTERS, next);
      return next;
    });
  }
  return { saved, saveFilter, deleteFilter };
}
function useOnboardingChecklist(opts) {
  const [dismissed, setDismissed] = reactExports.useState(
    () => load(LS.ONBOARDING, false)
  );
  const items = [
    {
      key: "first_client",
      label: "Add your first client",
      description: "Create a client record to start tracking your pipeline",
      done: opts.hasClients
    },
    {
      key: "first_activity",
      label: "Log your first activity",
      description: "Record a call, meeting, or note on a client",
      done: opts.hasActivity
    },
    {
      key: "first_proposal",
      label: "Send a proposal",
      description: "Move a deal to Proposal Sent stage",
      done: opts.hasProposal
    },
    {
      key: "first_deal",
      label: "Close your first deal",
      description: "Mark a client as Closed Won",
      done: opts.hasWon
    }
  ];
  const doneCount = items.filter((i) => i.done).length;
  const isAllDone = doneCount === items.length;
  const progress = Math.round(doneCount / items.length * 100);
  function dismiss() {
    setDismissed(true);
    save(LS.ONBOARDING, true);
  }
  const show = !dismissed && !isAllDone;
  return { items, doneCount, isAllDone, progress, show, dismiss };
}
const INDUSTRIES = [
  "Technology",
  "Manufacturing",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Real Estate",
  "Logistics",
  "Marketing",
  "Consulting",
  "Media",
  "Hospitality",
  "Automotive",
  "Energy",
  "Other"
];
const PAGE_SIZE_OPTIONS = [10, 25, 50];
const ALL_COLUMNS = [
  { key: "company", label: "Company", defaultVisible: true },
  { key: "contact", label: "Contact", defaultVisible: true },
  { key: "status", label: "Status", defaultVisible: true },
  { key: "priority", label: "Priority", defaultVisible: true },
  { key: "dealValue", label: "Deal Value", defaultVisible: true },
  { key: "assigned", label: "Assigned To", defaultVisible: true },
  { key: "followUp", label: "Follow-up", defaultVisible: true },
  { key: "daysInactive", label: "Days Inactive", defaultVisible: false },
  { key: "industry", label: "Industry", defaultVisible: false },
  { key: "actions", label: "Actions", defaultVisible: true }
];
function getDaysInactive(client) {
  const lastActivity = client.lastActivityDate || client.updatedAt;
  return Math.floor(
    (Date.now() - lastActivity.getTime()) / (1e3 * 60 * 60 * 24)
  );
}
const DEFAULT_FILTERS = {
  search: "",
  status: "all",
  priority: "all",
  industry: "",
  assignedTo: "",
  dealValueMin: "",
  dealValueMax: "",
  dateRange: "all"
};
function exportCSV(rows) {
  const headers = [
    "Company",
    "Contact",
    "Designation",
    "Email",
    "Phone",
    "Status",
    "Priority",
    "Deal Value",
    "Industry",
    "Location",
    "Assigned To",
    "Lead Source",
    "Follow-up Date"
  ];
  const lines = rows.map(
    (r) => [
      r.companyName,
      r.contactPersonName,
      r.designation,
      r.email,
      r.phone,
      STATUS_LABELS[r.currentStatus],
      PRIORITY_LABELS[r.priorityLevel],
      r.dealValue,
      r.industryType,
      r.location,
      r.assignedTeamMember,
      r.leadSource,
      r.followUpDate ? r.followUpDate.toLocaleDateString() : ""
    ].map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")
  );
  const blob = new Blob([[headers.join(","), ...lines].join("\n")], {
    type: "text/csv"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "clients.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function exportXLSX(rows) {
  const headers = [
    "Company",
    "Contact",
    "Email",
    "Phone",
    "Status",
    "Priority",
    "Deal Value",
    "Industry",
    "Assigned To",
    "Follow-up Date"
  ];
  const lines = rows.map(
    (r) => [
      r.companyName,
      r.contactPersonName,
      r.email,
      r.phone,
      STATUS_LABELS[r.currentStatus],
      PRIORITY_LABELS[r.priorityLevel],
      r.dealValue,
      r.industryType,
      r.assignedTeamMember,
      r.followUpDate ? r.followUpDate.toLocaleDateString() : ""
    ].join("	")
  );
  const blob = new Blob([[headers.join("	"), ...lines].join("\n")], {
    type: "application/vnd.ms-excel"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "clients.xlsx";
  a.click();
  URL.revokeObjectURL(url);
}
function SortIcon({
  col,
  sortKey,
  sortDir
}) {
  if (sortKey !== col)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "h-3.5 w-3.5 text-muted-foreground/50" });
  return sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 text-primary" });
}
function ClientsPage() {
  const { data: allClients = [], isLoading } = useClients();
  const deleteClient = useDeleteClient();
  const updateStatus = useUpdateClientStatus();
  const navigate = useNavigate();
  const searchInputRef = reactExports.useRef(null);
  const { pinned, togglePin } = usePinnedClients();
  const { saved: savedFilters, saveFilter } = useSavedFilters();
  const [saveFilterName, setSaveFilterName] = reactExports.useState("");
  const [saveFilterOpen, setSaveFilterOpen] = reactExports.useState(false);
  const [_showShortcuts, setShowShortcuts] = reactExports.useState(false);
  const [filters, setFilters] = reactExports.useState(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = reactExports.useState(null);
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [page, setPage] = reactExports.useState(1);
  const [pageSize, setPageSize] = reactExports.useState(10);
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [visibleCols, setVisibleCols] = reactExports.useState(
    new Set(ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key))
  );
  const [formOpen, setFormOpen] = reactExports.useState(false);
  const [editClient, setEditClient] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = reactExports.useState(false);
  const [whatsappClient, setWhatsappClient] = reactExports.useState(null);
  const hasClients = allClients.length > 0;
  const hasActivity = false;
  const hasProposal = allClients.some(
    (c) => c.currentStatus === ClientStatus.proposalSent || c.currentStatus === ClientStatus.negotiation
  );
  const hasWon = allClients.some(
    (c) => c.currentStatus === ClientStatus.closedWon
  );
  const onboarding = useOnboardingChecklist({
    hasClients,
    hasActivity,
    hasProposal,
    hasWon
  });
  const setFilter = reactExports.useCallback(
    (k, v) => setFilters((prev) => ({ ...prev, [k]: v })),
    []
  );
  const clearFilters = reactExports.useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);
  const isFiltered = reactExports.useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS),
    [filters]
  );
  const filtered = reactExports.useMemo(() => {
    let rows = allClients;
    const q = filters.search.toLowerCase();
    if (q) {
      rows = rows.filter(
        (c) => c.companyName.toLowerCase().includes(q) || c.contactPersonName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q)
      );
    }
    if (filters.status !== "all") {
      rows = rows.filter((c) => c.currentStatus === filters.status);
    }
    if (filters.priority !== "all") {
      rows = rows.filter((c) => c.priorityLevel === filters.priority);
    }
    if (filters.industry) {
      rows = rows.filter(
        (c) => c.industryType.toLowerCase().includes(filters.industry.toLowerCase())
      );
    }
    if (filters.assignedTo) {
      rows = rows.filter(
        (c) => c.assignedTeamMember.toLowerCase().includes(filters.assignedTo.toLowerCase())
      );
    }
    const minVal = Number(filters.dealValueMin);
    const maxVal = Number(filters.dealValueMax);
    if (filters.dealValueMin && minVal > 0)
      rows = rows.filter((c) => c.dealValue >= minVal);
    if (filters.dealValueMax && maxVal > 0)
      rows = rows.filter((c) => c.dealValue <= maxVal);
    if (filters.dateRange !== "all") {
      const days = filters.dateRange === "7d" ? 7 : filters.dateRange === "30d" ? 30 : 90;
      const cutoff = new Date(Date.now() - days * 86400 * 1e3);
      rows = rows.filter((c) => c.followUpDate && c.followUpDate >= cutoff);
    }
    return rows;
  }, [allClients, filters]);
  reactExports.useEffect(() => {
    function onKey(e) {
      var _a;
      const ctrl = e.ctrlKey || e.metaKey;
      if (e.key === "?" && !ctrl) {
        setShowShortcuts((v) => !v);
        return;
      }
      if (!ctrl) return;
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setEditClient(null);
        setFormOpen(true);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        (_a = searchInputRef.current) == null ? void 0 : _a.focus();
      } else if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        exportCSV(filtered);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [filtered]);
  const sorted = reactExports.useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      let av = a[sortKey] ?? "";
      let bv = b[sortKey] ?? "";
      if (av instanceof Date) av = av.getTime();
      if (bv instanceof Date) bv = bv.getTime();
      if (typeof av === "number" && typeof bv === "number")
        return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [filtered, sortKey, sortDir]);
  const sortedWithPins = reactExports.useMemo(() => {
    if (pinned.size === 0) return sorted;
    const pinnedRows = sorted.filter((c) => pinned.has(c.id));
    const unpinnedRows = sorted.filter((c) => !pinned.has(c.id));
    return [...pinnedRows, ...unpinnedRows];
  }, [sorted, pinned]);
  const totalPages = Math.max(1, Math.ceil(sortedWithPins.length / pageSize));
  const pageRows = sortedWithPins.slice((page - 1) * pageSize, page * pageSize);
  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }
  const allPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  function toggleAllPage() {
    if (allPageSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        for (const r of pageRows) next.delete(r.id);
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        for (const r of pageRows) next.add(r.id);
        return next;
      });
    }
  }
  function toggleRow(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function openEdit(client) {
    setEditClient(client);
    setFormOpen(true);
  }
  function openWhatsApp(client) {
    setWhatsappClient(client);
  }
  async function confirmDelete() {
    if (!deleteId) return;
    await deleteClient.mutateAsync(deleteId);
    setDeleteId(null);
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(deleteId);
      return n;
    });
  }
  async function confirmBulkDelete() {
    for (const id of selected) await deleteClient.mutateAsync(id);
    setSelected(/* @__PURE__ */ new Set());
    setBulkDeleteOpen(false);
  }
  function handleBulkStatusChange(status) {
    for (const id of selected) {
      updateStatus.mutate({ id, status, note: "Bulk status update" });
    }
    setSelected(/* @__PURE__ */ new Set());
  }
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  function isOverdue(date) {
    if (!date) return false;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  }
  const col = (key) => visibleCols.has(key);
  const activeChips = [];
  if (filters.search)
    activeChips.push({
      label: `"${filters.search}"`,
      onRemove: () => setFilter("search", "")
    });
  if (filters.status !== "all")
    activeChips.push({
      label: STATUS_LABELS[filters.status],
      onRemove: () => setFilter("status", "all")
    });
  if (filters.priority !== "all")
    activeChips.push({
      label: PRIORITY_LABELS[filters.priority],
      onRemove: () => setFilter("priority", "all")
    });
  if (filters.industry)
    activeChips.push({
      label: filters.industry,
      onRemove: () => setFilter("industry", "")
    });
  if (filters.assignedTo)
    activeChips.push({
      label: `Assigned: ${filters.assignedTo}`,
      onRemove: () => setFilter("assignedTo", "")
    });
  if (filters.dealValueMin)
    activeChips.push({
      label: `Min ₹${filters.dealValueMin}`,
      onRemove: () => setFilter("dealValueMin", "")
    });
  if (filters.dealValueMax)
    activeChips.push({
      label: `Max ₹${filters.dealValueMax}`,
      onRemove: () => setFilter("dealValueMax", "")
    });
  if (filters.dateRange !== "all")
    activeChips.push({
      label: `Follow-up: last ${filters.dateRange}`,
      onRemove: () => setFilter("dateRange", "all")
    });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-0", "data-ocid": "clients.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 pt-6 pb-4 border-b border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground tracking-tight", children: "All Clients" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage your pipeline and client relationships" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/15 text-primary border border-primary/30 font-semibold text-sm px-2.5", children: allClients.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-lg border border-border bg-background overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 border-r border-border",
              "aria-current": "true",
              "data-ocid": "clients.table_view_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { className: "h-3.5 w-3.5" }),
                " Table"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/clients/kanban",
              className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border-r border-border transition-colors",
              "data-ocid": "clients.kanban_view_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-3.5 w-3.5" }),
                " Kanban"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/clients/calendar",
              className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
              "data-ocid": "clients.calendar_view_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                " Calendar"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-1.5 text-xs",
            onClick: () => exportCSV(filtered),
            "data-ocid": "clients.export_csv_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
              " CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-1.5 text-xs",
            onClick: () => exportXLSX(filtered),
            "data-ocid": "clients.export_xlsx_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
              " Excel"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "bg-primary hover:bg-primary/90 gap-1.5 text-xs",
            onClick: () => {
              setEditClient(null);
              setFormOpen(true);
            },
            "data-ocid": "clients.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " Add Client"
            ]
          }
        )
      ] })
    ] }),
    onboarding.show && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-6 mt-4 rounded-lg border border-muted/20 bg-muted/20 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Getting Started" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            onboarding.doneCount,
            "/",
            onboarding.items.length,
            " completed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onboarding.dismiss,
              className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
              children: "✕"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted/30 rounded-full h-1.5 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-1.5 rounded-full bg-primary transition-all",
          style: { width: `${onboarding.progress}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: onboarding.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm", children: [
        item.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-green-400 shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: item.done ? "text-muted-foreground line-through" : "text-foreground/80",
            children: item.label
          }
        )
      ] }, item.key)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 bg-background border-b border-border space-y-3", children: [
      (savedFilters.length > 0 || saveFilterOpen) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Saved Filters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "bg-muted border border-border rounded text-xs text-foreground px-2 py-1 focus:outline-none",
            defaultValue: "",
            onChange: (e) => {
              const f = savedFilters.find((sf) => sf.id === e.target.value);
              if (f) {
                setFilters({ ...DEFAULT_FILTERS, ...f.filters });
                setPage(1);
              }
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a saved filter..." }),
              savedFilters.map((sf) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: sf.id, children: sf.name }, sf.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSaveFilterOpen((v) => !v),
            className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border border-border rounded px-2 py-1 transition-colors",
            "data-ocid": "clients.save_filter_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3 h-3" }),
              " Save filter"
            ]
          }
        ),
        saveFilterOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: saveFilterName,
              onChange: (e) => setSaveFilterName(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter" && saveFilterName.trim()) {
                  saveFilter(saveFilterName, filters);
                  setSaveFilterName("");
                  setSaveFilterOpen(false);
                }
              },
              placeholder: "Filter name...",
              className: "bg-muted border border-border rounded text-xs text-foreground px-2 py-1 w-32 focus:outline-none focus:ring-1 focus:ring-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                if (saveFilterName.trim()) {
                  saveFilter(saveFilterName, filters);
                  setSaveFilterName("");
                  setSaveFilterOpen(false);
                }
              },
              className: "text-xs bg-primary text-primary-foreground rounded px-2 py-1 hover:bg-primary/90 transition-colors",
              children: "Save"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSaveFilterOpen(false),
              className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
              children: "Cancel"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[220px] max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "pl-8 h-8 text-sm",
              placeholder: "Search company, contact, email, phone...",
              value: filters.search,
              onChange: (e) => {
                setFilter("search", e.target.value);
                setPage(1);
              },
              "data-ocid": "clients.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filters.status,
            onValueChange: (v) => {
              setFilter("status", v);
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 w-36 text-xs",
                  "data-ocid": "clients.status_filter",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
                Object.values(ClientStatus).map((s) => {
                  const c = STATUS_COLORS[s];
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${c.dot}` }),
                    STATUS_LABELS[s]
                  ] }) }, s);
                })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filters.priority,
            onValueChange: (v) => {
              setFilter("priority", v);
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 w-32 text-xs",
                  "data-ocid": "clients.priority_filter",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Priority" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Priorities" }),
                Object.values(PriorityLevel).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: PRIORITY_LABELS[p] }, p))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filters.industry || "all",
            onValueChange: (v) => {
              setFilter("industry", v === "all" ? "" : v);
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 w-36 text-xs",
                  "data-ocid": "clients.industry_filter",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Industry" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Industries" }),
                INDUSTRIES.map((ind) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ind, children: ind }, ind))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 w-24 text-xs",
              placeholder: "Min ₹",
              type: "number",
              value: filters.dealValueMin,
              onChange: (e) => {
                setFilter("dealValueMin", e.target.value);
                setPage(1);
              },
              "data-ocid": "clients.deal_min_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "–" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 w-24 text-xs",
              placeholder: "Max ₹",
              type: "number",
              value: filters.dealValueMax,
              onChange: (e) => {
                setFilter("dealValueMax", e.target.value);
                setPage(1);
              },
              "data-ocid": "clients.deal_max_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "h-8 w-36 text-xs",
            placeholder: "Assigned to...",
            value: filters.assignedTo,
            onChange: (e) => {
              setFilter("assignedTo", e.target.value);
              setPage(1);
            },
            "data-ocid": "clients.assigned_filter_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: filters.dateRange,
            onValueChange: (v) => {
              setFilter("dateRange", v);
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 w-36 text-xs",
                  "data-ocid": "clients.date_range_filter",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Follow-up date" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Any follow-up" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "7d", children: "Last 7 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30d", children: "Last 30 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "90d", children: "Last 90 days" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 gap-1.5 text-xs",
              "data-ocid": "clients.columns_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Columns2, { className: "h-3.5 w-3.5" }),
                " Columns"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Toggle columns" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            ALL_COLUMNS.filter((c) => c.key !== "actions").map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              DropdownMenuCheckboxItem,
              {
                checked: visibleCols.has(c.key),
                onCheckedChange: (checked) => {
                  setVisibleCols((prev) => {
                    const next = new Set(prev);
                    if (checked) next.add(c.key);
                    else next.delete(c.key);
                    return next;
                  });
                },
                children: c.label
              },
              c.key
            ))
          ] })
        ] }),
        isFiltered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-8 text-xs text-muted-foreground hover:text-foreground gap-1",
            onClick: clearFilters,
            "data-ocid": "clients.clear_filters_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
              " Clear"
            ]
          }
        )
      ] }),
      activeChips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: activeChips.map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: chip.onRemove,
          className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors",
          children: [
            chip.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-2.5 w-2.5" })
          ]
        },
        chip.label
      )) })
    ] }),
    selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-6 py-2 bg-primary/5 border-b border-primary/20",
        "data-ocid": "clients.bulk_bar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
            selected.size,
            " selected"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-7 text-xs gap-1",
                  "data-ocid": "clients.bulk_status_button",
                  children: "Change Status"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { children: Object.values(ClientStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                DropdownMenuItem,
                {
                  onClick: () => handleBulkStatusChange(s),
                  children: STATUS_LABELS[s]
                },
                s
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-7 text-xs gap-1",
                onClick: () => exportCSV(allClients.filter((c) => selected.has(c.id))),
                "data-ocid": "clients.bulk_export_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" }),
                  " Export"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                size: "sm",
                className: "h-7 text-xs gap-1",
                onClick: () => setBulkDeleteOpen(true),
                "data-ocid": "clients.bulk_delete_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
                  " Delete"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-7 text-xs text-muted-foreground",
              onClick: () => setSelected(/* @__PURE__ */ new Set()),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-2", children: [1, 2, 3, 4, 5, 6, 7].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i)) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 px-6",
        "data-ocid": "clients.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-1", children: isFiltered ? "No clients match your filters" : "No clients yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 text-center max-w-sm", children: isFiltered ? "Try adjusting your search or clearing the filters." : "Add your first client to start tracking your pipeline." }),
          !isFiltered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-primary hover:bg-primary/90 gap-2",
              onClick: () => {
                setEditClient(null);
                setFormOpen(true);
              },
              "data-ocid": "clients.add_first_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                " Add First Client"
              ]
            }
          ),
          isFiltered && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: clearFilters,
              "data-ocid": "clients.clear_filters_empty_button",
              children: "Clear Filters"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-10 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: allPageSelected,
            onCheckedChange: toggleAllPage,
            "aria-label": "Select all",
            "data-ocid": "clients.select_all_checkbox"
          }
        ) }),
        col("company") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors",
            onClick: () => toggleSort("companyName"),
            "data-ocid": "clients.sort_company_button",
            children: [
              "Company",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col: "companyName",
                  sortKey,
                  sortDir
                }
              )
            ]
          }
        ) }),
        col("contact") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors",
            onClick: () => toggleSort("contactPersonName"),
            children: [
              "Contact",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col: "contactPersonName",
                  sortKey,
                  sortDir
                }
              )
            ]
          }
        ) }),
        col("status") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors",
            onClick: () => toggleSort("currentStatus"),
            "data-ocid": "clients.sort_status_button",
            children: [
              "Status",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col: "currentStatus",
                  sortKey,
                  sortDir
                }
              )
            ]
          }
        ) }),
        col("priority") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors",
            onClick: () => toggleSort("priorityLevel"),
            children: [
              "Priority",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col: "priorityLevel",
                  sortKey,
                  sortDir
                }
              )
            ]
          }
        ) }),
        col("dealValue") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors",
            onClick: () => toggleSort("dealValue"),
            "data-ocid": "clients.sort_deal_button",
            children: [
              "Deal Value",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col: "dealValue",
                  sortKey,
                  sortDir
                }
              )
            ]
          }
        ) }),
        col("assigned") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors",
            onClick: () => toggleSort("assignedTeamMember"),
            children: [
              "Assigned",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col: "assignedTeamMember",
                  sortKey,
                  sortDir
                }
              )
            ]
          }
        ) }),
        col("followUp") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors",
            onClick: () => toggleSort("followUpDate"),
            children: [
              "Follow-up",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col: "followUpDate",
                  sortKey,
                  sortDir
                }
              )
            ]
          }
        ) }),
        col("daysInactive") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Days Inactive" }),
        col("industry") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Industry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Lead Score" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Prob %" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Tags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pageRows.map((client, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: `border-b border-border/50 transition-colors hover:bg-card/60 ${selected.has(client.id) ? "bg-primary/5" : ""}`,
          "data-ocid": `clients.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: selected.has(client.id),
                onCheckedChange: () => toggleRow(client.id),
                "aria-label": `Select ${client.companyName}`,
                "data-ocid": `clients.checkbox.${i + 1}`
              }
            ) }),
            col("company") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-xs", children: client.companyName.charAt(0).toUpperCase() }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "font-semibold text-foreground hover:text-primary truncate transition-colors text-left block max-w-[180px]",
                    onClick: () => navigate({
                      to: "/clients/$id",
                      params: { id: client.id }
                    }),
                    children: client.companyName
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[180px]", children: client.location })
              ] })
            ] }) }),
            col("contact") && /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium truncate max-w-[140px]", children: client.contactPersonName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[140px]", children: client.designation })
            ] }),
            col("status") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: client.currentStatus }) }),
            col("priority") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { priority: client.priorityLevel }) }),
            col("dealValue") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground tabular-nums", children: [
              "₹",
              client.dealValue.toLocaleString("en-IN")
            ] }) }),
            col("assigned") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground flex-shrink-0", children: client.assignedTeamMember.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate max-w-[100px]", children: client.assignedTeamMember })
            ] }) }),
            col("followUp") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: client.followUpDate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-1 ${isOverdue(client.followUpDate) ? "text-red-400" : "text-muted-foreground"}`,
                children: [
                  isOverdue(client.followUpDate) && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tabular-nums", children: client.followUpDate.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  }) })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/50", children: "—" }) }),
            col("daysInactive") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: (() => {
              const days = getDaysInactive(client);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `text-xs tabular-nums ${days >= 7 ? "text-red-400 font-semibold" : "text-muted-foreground"}`,
                  children: [
                    days,
                    "d"
                  ]
                }
              );
            })() }),
            col("industry") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: client.industryType }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: (() => {
              const s = client.leadScore ?? 0;
              const cls = s >= 70 ? "bg-primary/20 text-primary" : s >= 40 ? "bg-amber-500/20 text-amber-400" : "bg-muted text-muted-foreground";
              const label = s >= 70 ? "Hot" : s >= 40 ? "Warm" : "Cold";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cls}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3" }),
                    s,
                    " ",
                    label
                  ]
                }
              );
            })() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              client.dealProbability ?? 0,
              "%"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: client.source ?? client.leadSource ?? "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              (client.tags ?? []).slice(0, 2).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground",
                  children: t
                },
                t
              )),
              (client.tags ?? []).length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground/60", children: [
                "+",
                (client.tags ?? []).length - 2
              ] }),
              (client.tags ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40 text-xs", children: "—" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  title: pinned.has(client.id) ? "Unpin client" : "Pin client",
                  className: `w-7 h-7 rounded-md flex items-center justify-center transition-colors ${pinned.has(client.id) ? "text-primary hover:bg-primary/10" : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted"}`,
                  onClick: (e) => {
                    e.stopPropagation();
                    togglePin(client.id);
                  },
                  "data-ocid": `clients.pin_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      className: `h-3.5 w-3.5 ${pinned.has(client.id) ? "fill-current" : ""}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  title: "View",
                  className: "w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                  onClick: () => navigate({
                    to: "/clients/$id",
                    params: { id: client.id }
                  }),
                  "data-ocid": `clients.view_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  title: "Edit",
                  className: "w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                  onClick: () => openEdit(client),
                  "data-ocid": `clients.edit_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  title: "WhatsApp",
                  className: "w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-emerald-400 hover:bg-emerald-400/10 transition-colors",
                  onClick: () => openWhatsApp(client),
                  "data-ocid": `clients.whatsapp_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  title: "Delete",
                  className: "w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors",
                  onClick: () => setDeleteId(client.id),
                  "data-ocid": `clients.delete_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                }
              )
            ] }) })
          ]
        },
        client.id
      )) })
    ] }) }),
    sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-3 border-t border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Rows per page:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: String(pageSize),
            onValueChange: (v) => {
              setPageSize(Number(v));
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-7 w-16 text-xs",
                  "data-ocid": "clients.page_size_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAGE_SIZE_OPTIONS.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(n), children: n }, n)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          (page - 1) * pageSize + 1,
          "–",
          Math.min(page * pageSize, sorted.length),
          " of ",
          sorted.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 w-7 p-0",
            disabled: page === 1,
            onClick: () => setPage((p) => Math.max(1, p - 1)),
            "data-ocid": "clients.pagination_prev",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 rotate-90" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
          const pg = totalPages <= 5 ? idx + 1 : Math.max(1, page - 2) + idx;
          if (pg > totalPages) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: `w-7 h-7 rounded text-xs font-medium transition-colors ${pg === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
              onClick: () => setPage(pg),
              "data-ocid": `clients.page_button.${pg}`,
              children: pg
            },
            pg
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 w-7 p-0",
            disabled: page === totalPages,
            onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
            "data-ocid": "clients.pagination_next",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 -rotate-90" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ClientForm,
      {
        open: formOpen,
        onOpenChange: (open) => {
          setFormOpen(open);
          if (!open) setEditClient(null);
        },
        client: editClient
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteId,
        onOpenChange: (o) => !o && setDeleteId(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "clients.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will permanently delete this client record and all associated data. This action cannot be undone." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "clients.delete_cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-destructive hover:bg-destructive/90",
                onClick: confirmDelete,
                "data-ocid": "clients.delete_confirm_button",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: bulkDeleteOpen, onOpenChange: setBulkDeleteOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "clients.bulk_delete_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
          "Delete ",
          selected.size,
          " clients?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will permanently delete all selected client records. This action cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "clients.bulk_delete_cancel_button", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            className: "bg-destructive hover:bg-destructive/90",
            onClick: confirmBulkDelete,
            "data-ocid": "clients.bulk_delete_confirm_button",
            children: "Delete All"
          }
        )
      ] })
    ] }) }),
    whatsappClient && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WhatsAppModal,
      {
        client: whatsappClient,
        isOpen: !!whatsappClient,
        onClose: () => setWhatsappClient(null)
      }
    )
  ] });
}
export {
  ClientsPage as default
};
