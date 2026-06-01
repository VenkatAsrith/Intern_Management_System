import { c as createLucideIcon, r as reactExports, av as useControllableState, j as jsxRuntimeExports, aw as useId, a8 as useComposedRefs, a9 as Primitive, ac as composeEventHandlers, aa as Presence, ax as Portal$1, ay as hideOthers, az as ReactRemoveScroll, ab as createContextScope, aA as createSlot, aB as useFocusGuards, aC as FocusScope, aD as DismissableLayer, af as cn, x as useNavigate, aE as usePinnedClients, an as useLogQuickActivity, aF as PRIORITY_COLORS, m as Button, s as Badge, at as PRIORITY_LABELS, h as Calendar, K as User, e as useClients, ap as useUpdateClientStatus, aG as useKanbanViewMode, aH as useUpdateClient, t as ClientStatus, S as STATUS_LABELS, aI as SquareKanban, au as PriorityLevel, q as Skeleton, i as STATUS_COLORS, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle } from "./index-BMeK9e6q.js";
import { R as Root2$1, A as Anchor, c as createPopperScope, C as Content, a as Arrow } from "./index-CKQkaznJ.js";
import { P as Plus } from "./plus-DcOsLG2a.js";
import { P as Phone, F as Flame } from "./phone-DnZz6tRl.js";
import { M as Mail } from "./mail-DSPkbPx0.js";
import { V as Video, L as LayoutList } from "./video-m-e-Xlp4.js";
import { S as Star } from "./star-DrtMCmTX.js";
import { C as CircleAlert } from "./circle-alert-OEcBqI8h.js";
import { M as MessageCircle } from "./message-circle-BYDu4QJj.js";
import { T as Thermometer } from "./thermometer-BWaQbItU.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuLabel, e as DropdownMenuCheckboxItem, d as DropdownMenuSeparator } from "./dropdown-menu-C4Th6WK3.js";
import { T as Textarea } from "./textarea-DLaPF2KD.js";
import { F as Funnel } from "./funnel-B9aSgJOR.js";
import { C as ChevronDown } from "./chevron-down-DGBe83Kh.js";
import { C as CalendarDays } from "./calendar-days-DpHmX_Oh.js";
import "./index-NDr7xJHf.js";
import "./index-Caxnbhfp.js";
import "./index-r27OJ7K6.js";
import "./index-w2GhN1KG.js";
import "./check-Bu_kUyWO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
];
const Maximize2 = createLucideIcon("maximize-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m14 10 7-7", key: "oa77jy" }],
  ["path", { d: "M20 10h-6V4", key: "mjg0md" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M4 14h6v6", key: "rmj7iw" }]
];
const Minimize2 = createLucideIcon("minimize-2", __iconNode);
var POPOVER_NAME = "Popover";
var [createPopoverContext] = createContextScope(POPOVER_NAME, [
  createPopperScope
]);
var usePopperScope = createPopperScope();
var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
var Popover$1 = (props) => {
  const {
    __scopePopover,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = false
  } = props;
  const popperScope = usePopperScope(__scopePopover);
  const triggerRef = reactExports.useRef(null);
  const [hasCustomAnchor, setHasCustomAnchor] = reactExports.useState(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: POPOVER_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PopoverProvider,
    {
      scope: __scopePopover,
      contentId: useId(),
      triggerRef,
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      hasCustomAnchor,
      onCustomAnchorAdd: reactExports.useCallback(() => setHasCustomAnchor(true), []),
      onCustomAnchorRemove: reactExports.useCallback(() => setHasCustomAnchor(false), []),
      modal,
      children
    }
  ) });
};
Popover$1.displayName = POPOVER_NAME;
var ANCHOR_NAME = "PopoverAnchor";
var PopoverAnchor = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...anchorProps } = props;
    const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
    reactExports.useEffect(() => {
      onCustomAnchorAdd();
      return () => onCustomAnchorRemove();
    }, [onCustomAnchorAdd, onCustomAnchorRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
  }
);
PopoverAnchor.displayName = ANCHOR_NAME;
var TRIGGER_NAME = "PopoverTrigger";
var PopoverTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...triggerProps } = props;
    const context = usePopoverContext(TRIGGER_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    const trigger = /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: trigger });
  }
);
PopoverTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "PopoverPortal";
var [PortalProvider, usePortalContext] = createPopoverContext(PORTAL_NAME, {
  forceMount: void 0
});
var PopoverPortal = (props) => {
  const { __scopePopover, forceMount, children, container } = props;
  const context = usePopoverContext(PORTAL_NAME, __scopePopover);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopePopover, forceMount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children }) }) });
};
PopoverPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "PopoverContent";
var PopoverContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopePopover);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
PopoverContent$1.displayName = CONTENT_NAME;
var Slot = createSlot("PopoverContent.RemoveScroll");
var PopoverContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const isRightClickOutsideRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          if (!isRightClickOutsideRef.current) (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(
          props.onPointerDownOutside,
          (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            isRightClickOutsideRef.current = isRightClick;
          },
          { checkForDefaultPrevented: false }
        ),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault(),
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
var PopoverContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var PopoverContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopePopover,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...contentProps
    } = props;
    const context = usePopoverContext(CONTENT_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      FocusScope,
      {
        asChild: true,
        loop: true,
        trapped: trapFocus,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DismissableLayer,
          {
            asChild: true,
            disableOutsidePointerEvents,
            onInteractOutside,
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onDismiss: () => context.onOpenChange(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Content,
              {
                "data-state": getState(context.open),
                role: "dialog",
                id: context.contentId,
                ...popperScope,
                ...contentProps,
                ref: forwardedRef,
                style: {
                  ...contentProps.style,
                  // re-namespace exposed content custom properties
                  ...{
                    "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                  }
                }
              }
            )
          }
        )
      }
    );
  }
);
var CLOSE_NAME = "PopoverClose";
var PopoverClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...closeProps } = props;
    const context = usePopoverContext(CLOSE_NAME, __scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
PopoverClose.displayName = CLOSE_NAME;
var ARROW_NAME = "PopoverArrow";
var PopoverArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
PopoverArrow.displayName = ARROW_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Popover$1;
var Trigger = PopoverTrigger$1;
var Portal = PopoverPortal;
var Content2 = PopoverContent$1;
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
function LeadScoreBadge({ score }) {
  if (score >= 70) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-500/15 text-red-400 border-red-500/30 border text-[10px] px-1.5 py-0 flex items-center gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-2.5 w-2.5" }),
      " ",
      score,
      " Hot"
    ] });
  }
  if (score >= 40) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-500/15 text-amber-400 border-amber-500/30 border text-[10px] px-1.5 py-0 flex items-center gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { className: "h-2.5 w-2.5" }),
      " ",
      score,
      " Warm"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted text-muted-foreground border-border border text-[10px] px-1.5 py-0", children: [
    score,
    " Cold"
  ] });
}
function KanbanCard({
  client,
  index,
  stageKey,
  isDragging,
  onDragStart,
  mode
}) {
  const navigate = useNavigate();
  const [activityPopoverOpen, setActivityPopoverOpen] = reactExports.useState(false);
  const { togglePin, isPinned } = usePinnedClients();
  const logActivity = useLogQuickActivity();
  const pinned = isPinned(client.id);
  const now = /* @__PURE__ */ new Date();
  const isOverdue = client.followUpDate ? client.followUpDate < now : false;
  const overdueDays = isOverdue && client.followUpDate ? Math.floor(
    (now.getTime() - client.followUpDate.getTime()) / (1e3 * 60 * 60 * 24)
  ) : 0;
  const pc = PRIORITY_COLORS[client.priorityLevel];
  const lastActivity = client.lastActivityDate || client.updatedAt;
  const daysInactive = Math.floor(
    (Date.now() - lastActivity.getTime()) / (1e3 * 60 * 60 * 24)
  );
  const isStale = daysInactive >= 7;
  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const num = client.whatsappNumber || client.phone;
    const cleaned = num.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Hi ${client.contactPersonName}, this is TechMecha Torque reaching out regarding ${client.serviceInterested}. `
    );
    window.open(
      `https://wa.me/${cleaned}?text=${msg}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const handlePin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePin(client.id);
  };
  const handleLogActivity = (e, activityType) => {
    e.preventDefault();
    e.stopPropagation();
    logActivity.mutate({
      clientId: client.id,
      activityType,
      notes: `Quick ${activityType} logged`
    });
    setActivityPopoverOpen(false);
  };
  if (mode === "compact") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": `clients.kanban.${stageKey}.item.${index + 1}`,
        draggable: true,
        onDragStart: () => onDragStart(client.id),
        onClick: () => navigate({ to: "/clients/$id", params: { id: client.id } }),
        className: [
          "w-full text-left rounded-lg border px-3 py-2 cursor-pointer select-none transition-all duration-150",
          isDragging ? "opacity-50 border-primary/60 bg-primary/5" : "bg-card border-border hover:border-primary/40 hover:-translate-y-0.5"
        ].join(" "),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-xs truncate flex-1", children: client.companyName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary flex-shrink-0", children: [
              "₹",
              client.dealValue >= 1e3 ? `${(client.dealValue / 1e3).toFixed(0)}K` : client.dealValue.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadScoreBadge, { score: client.leadScore }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `clients.kanban.${stageKey}.item.${index + 1}`,
      draggable: true,
      onDragStart: () => onDragStart(client.id),
      onClick: () => navigate({ to: "/clients/$id", params: { id: client.id } }),
      className: [
        "group relative w-full text-left rounded-xl border p-3.5 cursor-pointer select-none transition-all duration-150",
        isDragging ? "opacity-50 scale-95 rotate-1 border-primary/60 bg-primary/5 shadow-lg shadow-primary/20" : "bg-card border-border hover:border-primary/40 hover:bg-card/80 hover:shadow-md hover:shadow-black/20 hover:-translate-y-0.5"
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Popover,
            {
              open: activityPopoverOpen,
              onOpenChange: setActivityPopoverOpen,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Log activity",
                    "data-ocid": `clients.kanban.${stageKey}.log_activity.${index + 1}`,
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActivityPopoverOpen(true);
                    },
                    className: "opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PopoverContent,
                  {
                    className: "w-40 p-1",
                    align: "end",
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    },
                    children: [
                      { label: "Log Call", type: "call", icon: Phone },
                      { label: "Log Email", type: "email", icon: Mail },
                      { label: "Log Meeting", type: "meeting", icon: Video }
                    ].map(({ label, type, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        className: "w-full justify-start gap-2 text-xs h-8",
                        onClick: (e) => handleLogActivity(e, type),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
                          label
                        ]
                      },
                      type
                    ))
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": pinned ? "Unpin client" : "Pin client",
              "data-ocid": `clients.kanban.${stageKey}.pin.${index + 1}`,
              onClick: handlePin,
              className: [
                "transition-opacity p-0.5 rounded hover:bg-muted",
                pinned ? "opacity-100 text-amber-400" : "opacity-0 group-hover:opacity-60 text-muted-foreground hover:text-amber-400"
              ].join(" "),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-3.5 w-3.5 ${pinned ? "fill-amber-400" : ""}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-0 group-hover:opacity-40 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4 text-muted-foreground" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm leading-tight pr-16 truncate", children: client.companyName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: [
          client.contactPersonName,
          client.designation ? ` · ${client.designation}` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-bold text-primary mt-2", children: [
          "₹",
          client.dealValue.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2.5 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `${pc.bg} ${pc.text} ${pc.border} border text-[10px] px-1.5 py-0`,
              children: PRIORITY_LABELS[client.priorityLevel]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LeadScoreBadge, { score: client.leadScore }),
          client.industryType && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded-md truncate max-w-[80px]", children: client.industryType })
        ] }),
        isStale && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-500/15 text-red-400 border-red-500/30 border text-[10px] px-1.5 py-0 mt-1.5", children: [
          daysInactive,
          "d stale"
        ] }),
        isOverdue && overdueDays > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            className: "bg-red-500/20 text-red-400 border-red-500/40 border text-[10px] px-1.5 py-0 mt-1 flex items-center gap-0.5 w-fit",
            "data-ocid": `clients.kanban.${stageKey}.overdue.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-2.5 w-2.5" }),
              overdueDays,
              "d overdue"
            ]
          }
        ),
        client.followUpDate && !isOverdue && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2 text-[11px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
            "Follow-up ·",
            " ",
            client.followUpDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short"
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3 pt-2.5 border-t border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-2.5 w-2.5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground truncate max-w-[90px]", children: client.assignedTeamMember || "Unassigned" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "aria-label": "Open WhatsApp",
              onClick: handleWhatsApp,
              "data-ocid": `clients.kanban.${stageKey}.whatsapp.${index + 1}`,
              className: "flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors px-1.5 py-0.5 rounded-md hover:bg-emerald-500/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden group-hover:inline", children: "WhatsApp" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const PIPELINE_STAGES = [
  ClientStatus.leadCaptured,
  ClientStatus.contacted,
  ClientStatus.discoveryCallDone,
  ClientStatus.proposalSent,
  ClientStatus.negotiation,
  ClientStatus.closedWon,
  ClientStatus.closedLost,
  ClientStatus.onHold
];
const STAGE_ICONS = {
  [ClientStatus.leadCaptured]: "📥",
  [ClientStatus.contacted]: "💬",
  [ClientStatus.discoveryCallDone]: "🤝",
  [ClientStatus.proposalSent]: "📄",
  [ClientStatus.negotiation]: "⚡",
  [ClientStatus.closedWon]: "✅",
  [ClientStatus.closedLost]: "❌",
  [ClientStatus.onHold]: "⏸️"
};
const STAGE_PROBABILITY = {
  [ClientStatus.leadCaptured]: 10,
  [ClientStatus.contacted]: 20,
  [ClientStatus.discoveryCallDone]: 35,
  [ClientStatus.proposalSent]: 55,
  [ClientStatus.negotiation]: 75,
  [ClientStatus.closedWon]: 100,
  [ClientStatus.closedLost]: 0,
  [ClientStatus.onHold]: 20
};
const PRIORITY_OPTIONS = [
  { value: PriorityLevel.urgent, label: "Urgent" },
  { value: PriorityLevel.high, label: "High" },
  { value: PriorityLevel.medium, label: "Medium" },
  { value: PriorityLevel.low, label: "Low" }
];
function formatCurrency(value) {
  if (value >= 1e6) return `₹${(value / 1e6).toFixed(1)}L`;
  if (value >= 1e3) return `₹${(value / 1e3).toFixed(0)}K`;
  return `₹${value.toLocaleString()}`;
}
function ClientsKanbanPage() {
  const navigate = useNavigate();
  const { data: clients, isLoading } = useClients();
  const updateStatus = useUpdateClientStatus();
  const { mode, setMode } = useKanbanViewMode();
  const [draggingId, setDraggingId] = reactExports.useState(null);
  const [dragOverStage, setDragOverStage] = reactExports.useState(
    null
  );
  const dragCounterRef = reactExports.useRef({});
  const [closureModal, setClosureModal] = reactExports.useState(null);
  const [closureReason, setClosureReason] = reactExports.useState("");
  const updateClient = useUpdateClient();
  const [filterAssigned, setFilterAssigned] = reactExports.useState("all");
  const [filterPriorities, setFilterPriorities] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [filterPanelOpen, setFilterPanelOpen] = reactExports.useState(false);
  const assigneeOptions = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Set();
    for (const c of clients ?? []) {
      if (c.assignedTeamMember) seen.add(c.assignedTeamMember);
    }
    return Array.from(seen).sort();
  }, [clients]);
  const activeFilterCount = (filterAssigned !== "all" ? 1 : 0) + (filterPriorities.size > 0 ? 1 : 0);
  const filteredClients = reactExports.useMemo(() => {
    return (clients ?? []).filter((c) => {
      if (filterAssigned !== "all" && c.assignedTeamMember !== filterAssigned)
        return false;
      if (filterPriorities.size > 0 && !filterPriorities.has(c.priorityLevel))
        return false;
      return true;
    });
  }, [clients, filterAssigned, filterPriorities]);
  const byStatus = reactExports.useCallback(
    (status) => filteredClients.filter((c) => c.currentStatus === status),
    [filteredClients]
  );
  const totalDealValue = (clients ?? []).reduce((s, c) => s + c.dealValue, 0);
  const handleDragStart = reactExports.useCallback((clientId) => {
    setDraggingId(clientId);
  }, []);
  const handleDragEnter = reactExports.useCallback(
    (stage, e) => {
      e.preventDefault();
      dragCounterRef.current[stage] = (dragCounterRef.current[stage] ?? 0) + 1;
      setDragOverStage(stage);
    },
    []
  );
  const handleDragLeave = reactExports.useCallback((stage) => {
    dragCounterRef.current[stage] = Math.max(
      (dragCounterRef.current[stage] ?? 1) - 1,
      0
    );
    if (dragCounterRef.current[stage] === 0) {
      setDragOverStage((prev) => prev === stage ? null : prev);
    }
  }, []);
  const handleDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);
  const handleDrop = reactExports.useCallback(
    (targetStage) => {
      dragCounterRef.current[targetStage] = 0;
      setDragOverStage(null);
      if (!draggingId) return;
      const client = (clients ?? []).find((c) => c.id === draggingId);
      if (!client || client.currentStatus === targetStage) {
        setDraggingId(null);
        return;
      }
      if (targetStage === ClientStatus.closedWon || targetStage === ClientStatus.closedLost) {
        setClosureModal({ clientId: draggingId, targetStage });
        setDraggingId(null);
        return;
      }
      updateStatus.mutate({
        id: draggingId,
        status: targetStage,
        note: `Moved to ${STATUS_LABELS[targetStage]}`
      });
      setDraggingId(null);
    },
    [draggingId, clients, updateStatus]
  );
  const handleDragEnd = reactExports.useCallback(() => {
    setDraggingId(null);
    setDragOverStage(null);
    dragCounterRef.current = {};
  }, []);
  async function confirmClosure() {
    if (!closureModal) return;
    const { clientId, targetStage } = closureModal;
    await updateStatus.mutateAsync({
      id: clientId,
      status: targetStage,
      note: closureReason.trim() || `Moved to ${STATUS_LABELS[targetStage]}`
    });
    if (closureReason.trim()) {
      await updateClient.mutateAsync({
        id: clientId,
        req: { closedReason: closureReason.trim() }
      });
    }
    setClosureModal(null);
    setClosureReason("");
  }
  function togglePriority(p) {
    setFilterPriorities((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full min-h-0",
      "data-ocid": "clients.kanban.page",
      onDragEnd: handleDragEnd,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 px-6 pt-6 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareKanban, { className: "h-5 w-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Pipeline Board" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  (clients ?? []).length,
                  " clients",
                  " · ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: formatCurrency(totalDealValue) }),
                  " total pipeline"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "h-8 px-3 text-xs border-border gap-1.5",
                  onClick: () => setMode(mode === "compact" ? "expanded" : "compact"),
                  "data-ocid": "clients.kanban.view_mode_toggle",
                  children: mode === "compact" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-3.5 w-3.5" }),
                    "Expanded"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "h-3.5 w-3.5" }),
                    "Compact"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenu,
                {
                  open: filterPanelOpen,
                  onOpenChange: setFilterPanelOpen,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        className: "h-8 px-3 text-xs border-border gap-1.5 relative",
                        "data-ocid": "clients.kanban.filter_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5" }),
                          "Filters",
                          activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center", children: activeFilterCount }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 ml-0.5 opacity-60" })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      DropdownMenuContent,
                      {
                        align: "end",
                        className: "w-56 bg-card border-border",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-xs text-muted-foreground", children: "Assigned To" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            DropdownMenuCheckboxItem,
                            {
                              checked: filterAssigned === "all",
                              onCheckedChange: () => setFilterAssigned("all"),
                              className: "text-sm",
                              children: "All members"
                            }
                          ),
                          assigneeOptions.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            DropdownMenuCheckboxItem,
                            {
                              checked: filterAssigned === name,
                              onCheckedChange: () => setFilterAssigned(filterAssigned === name ? "all" : name),
                              className: "text-sm",
                              children: name
                            },
                            name
                          )),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-xs text-muted-foreground", children: "Priority" }),
                          PRIORITY_OPTIONS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            DropdownMenuCheckboxItem,
                            {
                              checked: filterPriorities.has(value),
                              onCheckedChange: () => togglePriority(value),
                              className: "text-sm",
                              children: label
                            },
                            value
                          )),
                          activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                className: "w-full text-left text-xs px-2 py-1.5 text-primary hover:bg-primary/10 rounded",
                                onClick: () => {
                                  setFilterAssigned("all");
                                  setFilterPriorities(/* @__PURE__ */ new Set());
                                },
                                "data-ocid": "clients.kanban.clear_filters_button",
                                children: "Clear all filters"
                              }
                            )
                          ] })
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-lg border border-border bg-card p-0.5 gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground",
                    onClick: () => navigate({ to: "/clients" }),
                    "data-ocid": "clients.kanban.view_table_toggle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutList, { className: "h-3.5 w-3.5 mr-1" }),
                      "Table"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 px-2.5 text-xs bg-primary/15 text-primary hover:bg-primary/20",
                    "data-ocid": "clients.kanban.view_kanban_toggle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SquareKanban, { className: "h-3.5 w-3.5 mr-1" }),
                      "Kanban"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground",
                    onClick: () => navigate({ to: "/clients/calendar" }),
                    "data-ocid": "clients.kanban.view_calendar_toggle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5 mr-1" }),
                      "Calendar"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  className: "bg-primary hover:bg-primary/90 gap-1.5 h-8 px-3 text-xs",
                  onClick: () => navigate({ to: "/clients" }),
                  "data-ocid": "clients.kanban.add_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                    "Add Client"
                  ]
                }
              )
            ] })
          ] }),
          activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Filters:" }),
            filterAssigned !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-primary/20 border text-[10px] px-2 gap-1", children: [
              "Assigned: ",
              filterAssigned,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setFilterAssigned("all"),
                  className: "ml-0.5 hover:text-foreground",
                  children: "x"
                }
              )
            ] }),
            Array.from(filterPriorities).map((p) => {
              var _a;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: "bg-primary/10 text-primary border-primary/20 border text-[10px] px-2 gap-1",
                  children: [
                    (_a = PRIORITY_OPTIONS.find((o) => o.value === p)) == null ? void 0 : _a.label,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => togglePriority(p),
                        className: "ml-0.5 hover:text-foreground",
                        children: "x"
                      }
                    )
                  ]
                },
                p
              );
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-x-auto px-6 pb-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: PIPELINE_STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 w-72", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full mb-3 rounded-xl" }),
          [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full mb-2 rounded-xl" }, i))
        ] }, s)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 h-full", children: PIPELINE_STAGES.map((stage) => {
          const cols = STATUS_COLORS[stage];
          const stageClients = byStatus(stage);
          const stageDealTotal = stageClients.reduce(
            (s, c) => s + c.dealValue,
            0
          );
          const stageProbability = STAGE_PROBABILITY[stage];
          const stageWeighted = Math.round(
            stageDealTotal * stageProbability / 100
          );
          const isOver = dragOverStage === stage;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `clients.kanban.${stage}_column`,
              onDragEnter: (e) => handleDragEnter(stage, e),
              onDragLeave: () => handleDragLeave(stage),
              onDragOver: handleDragOver,
              onDrop: () => handleDrop(stage),
              className: [
                "flex-shrink-0 flex flex-col rounded-2xl border transition-all duration-150",
                mode === "compact" ? "w-60" : "w-72",
                isOver ? `${cols.border} bg-card/90 shadow-lg shadow-black/20 ring-1 ring-inset ${cols.border}` : "border-border bg-card/50"
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex-shrink-0 p-3 rounded-t-2xl border-b ${cols.border}/30 border-l-[3px] ${cols.border}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm shrink-0", children: STAGE_ICONS[stage] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `text-sm font-semibold ${cols.text} truncate`,
                              children: STATUS_LABELS[stage]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            className: `${cols.bg} ${cols.text} ${cols.border} border text-xs px-1.5 shrink-0 ml-1`,
                            children: stageClients.length
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mt-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-bold ${cols.text}`, children: formatCurrency(stageDealTotal) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                            stageClients.length,
                            " ",
                            stageClients.length === 1 ? "client" : "clients"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Weighted" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground", children: [
                            formatCurrency(stageWeighted),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: `ml-1 text-[10px] font-normal ${cols.text}`,
                                children: [
                                  stageProbability,
                                  "%"
                                ]
                              }
                            )
                          ] })
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-2 space-y-2 min-h-[120px]", children: [
                  stageClients.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-ocid": `clients.kanban.${stage}.empty_state`,
                      className: [
                        "flex flex-col items-center justify-center h-24 rounded-xl border-2 border-dashed transition-colors",
                        isOver ? `${cols.border} ${cols.bg}` : "border-border/40"
                      ].join(" "),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl mb-1", children: STAGE_ICONS[stage] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isOver ? "Drop here" : "No clients" })
                      ]
                    }
                  ) : stageClients.map((client, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    KanbanCard,
                    {
                      client,
                      index: i,
                      stageKey: stage,
                      isDragging: draggingId === client.id,
                      onDragStart: handleDragStart,
                      mode
                    },
                    client.id
                  )),
                  isOver && stageClients.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-1.5 rounded-full ${cols.bg} border ${cols.border} transition-all`
                    }
                  )
                ] })
              ]
            },
            stage
          );
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!closureModal,
            onOpenChange: (o) => {
              if (!o) {
                setClosureModal(null);
                setClosureReason("");
              }
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DialogContent,
              {
                className: "bg-card border-border max-w-sm",
                "data-ocid": "clients.kanban.closure_dialog",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-foreground", children: (closureModal == null ? void 0 : closureModal.targetStage) === ClientStatus.closedWon ? "Mark as Closed Won" : "Mark as Closed Lost" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Please provide a reason for closing this deal." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        value: closureReason,
                        onChange: (e) => setClosureReason(e.target.value),
                        placeholder: "e.g., Client signed contract, Budget constraints...",
                        rows: 3,
                        className: "bg-background border-border resize-none text-sm",
                        "data-ocid": "clients.kanban.closure_reason_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        onClick: () => {
                          setClosureModal(null);
                          setClosureReason("");
                        },
                        "data-ocid": "clients.kanban.closure_cancel_button",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        onClick: confirmClosure,
                        disabled: updateStatus.isPending,
                        "data-ocid": "clients.kanban.closure_confirm_button",
                        children: "Confirm"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  ClientsKanbanPage as default
};
