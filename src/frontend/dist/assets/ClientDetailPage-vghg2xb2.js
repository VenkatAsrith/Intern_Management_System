import { c as createLucideIcon, ar as useClientActivities, a3 as useAddClientActivity, r as reactExports, j as jsxRuntimeExports, k as Button, l as Skeleton, h as Calendar, F as FileText, a4 as ActivityType, as as shimExports, at as Primitive, a6 as cn, au as useClientComments, av as useAddClientComment, aw as useUpdateClientComment, ax as useDeleteClientComment, ay as usePinClientComment, a5 as useComposedRefs, Q as useParams, q as useNavigate, az as useClient, aA as useClientInvoices, a7 as useDeleteClient, aB as useUpdateInvoiceStatus, aC as useUpdateProposalStatus, ad as useLogQuickActivity, g as useRecentlyViewedClients, L as Link, A as ArrowLeft, n as ClientStatus, U as Users, i as STATUS_COLORS, ab as TriangleAlert, S as STATUS_LABELS, aD as Separator, a9 as PRIORITY_LABELS, aE as InvoicePaymentStatus, m as Badge, a8 as useUpdateClientStatus, aF as useAddContact } from "./index-Cx0SFoKr.js";
import { T as Textarea } from "./textarea-h8IksRvN.js";
import { M as Mail } from "./mail-CgNYElTN.js";
import { P as Phone, F as Flame } from "./phone-Om3UKbVn.js";
import { M as MessageCircle } from "./index-C73v2j7e.js";
import { S as StatusBadge, P as PriorityBadge, C as ClientForm } from "./StatusBadge-BJP5YXyI.js";
import { g as useCallbackRef, j as useLayoutEffect2, u as useControllableState, P as Primitive$1, c as composeEventHandlers, a as createContextScope$1 } from "./index-t2AFSBRW.js";
import { S as Send, T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BHPlKwqC.js";
import { P as Pencil } from "./pencil-BOlCHWBq.js";
import { T as Trash2, A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-C1aDMVnY.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-CLk8W9-n.js";
import { I as Input } from "./input-DGvN6Bpn.js";
import { L as Label } from "./label-Mcr_69bu.js";
import { u as usePrevious } from "./select-B8J2Sdiv.js";
import { u as useSize } from "./index-pB3Femft.js";
import { B as Building2 } from "./building-2-C_1yYSzW.js";
import { C as CircleCheck, a as CircleX } from "./circle-x-DvuSR1A-.js";
import { T as TrendingUp } from "./trending-up-BBd65Ege.js";
import { P as Plus } from "./plus-QwDbQIee.js";
import { T as Thermometer } from "./thermometer-WL3EDIiC.js";
import { U as UserPlus } from "./user-plus-Cff9KRPL.js";
import "./index-AnWvD9gK.js";
import "./zap-CtjPSRtY.js";
import "./circle-BfbLHcck.js";
import "./chevron-down-BAVyvl7E.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "M8 3 4 7l4 4", key: "9rb6wj" }],
  ["path", { d: "M4 7h16", key: "6tx8e3" }],
  ["path", { d: "m16 21 4-4-4-4", key: "siv7j2" }],
  ["path", { d: "M20 17H4", key: "h6l3hr" }]
];
const ArrowLeftRight = createLucideIcon("arrow-left-right", __iconNode$8);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  ["path", { d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89", key: "znwnzq" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
      key: "c9qhm2"
    }
  ]
];
const PinOff = createLucideIcon("pin-off", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
];
const Pin = createLucideIcon("pin", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z", key: "qazsjp" }],
  ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4", key: "40519r" }]
];
const StickyNote = createLucideIcon("sticky-note", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    return new argument.constructor(+argument);
  } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
    return new Date(argument);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
}
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}
const millisecondsInDay = 864e5;
const minutesInMonth = 43200;
const minutesInDay = 1440;
let defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function startOfDay(date) {
  const _date = toDate(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = startOfDay(dateLeft);
  const startOfDayRight = startOfDay(dateRight);
  const timestampLeft = +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  const timestampRight = +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
}
function compareAsc(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const diff = _dateLeft.getTime() - _dateRight.getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
}
function constructNow(date) {
  return constructFrom(date, Date.now());
}
function differenceInCalendarMonths(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const yearDiff = _dateLeft.getFullYear() - _dateRight.getFullYear();
  const monthDiff = _dateLeft.getMonth() - _dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}
function differenceInDays(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const sign = compareLocalAsc(_dateLeft, _dateRight);
  const difference = Math.abs(differenceInCalendarDays(_dateLeft, _dateRight));
  _dateLeft.setDate(_dateLeft.getDate() - sign * difference);
  const isLastDayNotFull = Number(
    compareLocalAsc(_dateLeft, _dateRight) === -sign
  );
  const result = sign * (difference - isLastDayNotFull);
  return result === 0 ? 0 : result;
}
function compareLocalAsc(dateLeft, dateRight) {
  const diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
}
function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    return result === 0 ? 0 : result;
  };
}
function differenceInMilliseconds(dateLeft, dateRight) {
  return +toDate(dateLeft) - +toDate(dateRight);
}
function endOfDay(date) {
  const _date = toDate(date);
  _date.setHours(23, 59, 59, 999);
  return _date;
}
function endOfMonth(date) {
  const _date = toDate(date);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}
function isLastDayOfMonth(date) {
  const _date = toDate(date);
  return +endOfDay(_date) === +endOfMonth(_date);
}
function differenceInMonths(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const sign = compareAsc(_dateLeft, _dateRight);
  const difference = Math.abs(
    differenceInCalendarMonths(_dateLeft, _dateRight)
  );
  let result;
  if (difference < 1) {
    result = 0;
  } else {
    if (_dateLeft.getMonth() === 1 && _dateLeft.getDate() > 27) {
      _dateLeft.setDate(30);
    }
    _dateLeft.setMonth(_dateLeft.getMonth() - sign * difference);
    let isLastMonthNotFull = compareAsc(_dateLeft, _dateRight) === -sign;
    if (isLastDayOfMonth(toDate(dateLeft)) && difference === 1 && compareAsc(dateLeft, _dateRight) === 1) {
      isLastMonthNotFull = false;
    }
    result = sign * (difference - Number(isLastMonthNotFull));
  }
  return result === 0 ? 0 : result;
}
function differenceInSeconds(dateLeft, dateRight, options) {
  const diff = differenceInMilliseconds(dateLeft, dateRight) / 1e3;
  return getRoundingMethod(options == null ? void 0 : options.roundingMethod)(diff);
}
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
const formatDistance$1 = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options == null ? void 0 : options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}
const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
const formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}
const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
const localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;
const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
const match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const enUS = {
  code: "en-US",
  formatDistance: formatDistance$1,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function formatDistance(date, baseDate, options) {
  const defaultOptions2 = getDefaultOptions();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const minutesInAlmostTwoDays = 2520;
  const comparison = compareAsc(date, baseDate);
  if (isNaN(comparison)) {
    throw new RangeError("Invalid time value");
  }
  const localizeOptions = Object.assign({}, options, {
    addSuffix: options == null ? void 0 : options.addSuffix,
    comparison
  });
  let dateLeft;
  let dateRight;
  if (comparison > 0) {
    dateLeft = toDate(baseDate);
    dateRight = toDate(date);
  } else {
    dateLeft = toDate(date);
    dateRight = toDate(baseDate);
  }
  const seconds = differenceInSeconds(dateRight, dateLeft);
  const offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft)) / 1e3;
  const minutes = Math.round((seconds - offsetInSeconds) / 60);
  let months;
  if (minutes < 2) {
    if (options == null ? void 0 : options.includeSeconds) {
      if (seconds < 5) {
        return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return locale.formatDistance("halfAMinute", 0, localizeOptions);
      } else if (seconds < 60) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", minutes, localizeOptions);
      }
    }
  } else if (minutes < 45) {
    return locale.formatDistance("xMinutes", minutes, localizeOptions);
  } else if (minutes < 90) {
    return locale.formatDistance("aboutXHours", 1, localizeOptions);
  } else if (minutes < minutesInDay) {
    const hours = Math.round(minutes / 60);
    return locale.formatDistance("aboutXHours", hours, localizeOptions);
  } else if (minutes < minutesInAlmostTwoDays) {
    return locale.formatDistance("xDays", 1, localizeOptions);
  } else if (minutes < minutesInMonth) {
    const days = Math.round(minutes / minutesInDay);
    return locale.formatDistance("xDays", days, localizeOptions);
  } else if (minutes < minutesInMonth * 2) {
    months = Math.round(minutes / minutesInMonth);
    return locale.formatDistance("aboutXMonths", months, localizeOptions);
  }
  months = differenceInMonths(dateRight, dateLeft);
  if (months < 12) {
    const nearestMonth = Math.round(minutes / minutesInMonth);
    return locale.formatDistance("xMonths", nearestMonth, localizeOptions);
  } else {
    const monthsSinceStartOfYear = months % 12;
    const years = Math.trunc(months / 12);
    if (monthsSinceStartOfYear < 3) {
      return locale.formatDistance("aboutXYears", years, localizeOptions);
    } else if (monthsSinceStartOfYear < 9) {
      return locale.formatDistance("overXYears", years, localizeOptions);
    } else {
      return locale.formatDistance("almostXYears", years + 1, localizeOptions);
    }
  }
}
function formatDistanceToNow(date, options) {
  return formatDistance(date, constructNow(date), options);
}
const ACTIVITY_ICONS = {
  [ActivityType.statusChange]: {
    icon: ArrowLeftRight,
    color: "text-blue-400",
    bg: "bg-blue-500/15"
  },
  [ActivityType.noteAdded]: {
    icon: StickyNote,
    color: "text-amber-400",
    bg: "bg-amber-500/15"
  },
  [ActivityType.whatsappMessage]: {
    icon: Phone,
    color: "text-green-400",
    bg: "bg-green-500/15"
  },
  [ActivityType.callScheduled]: {
    icon: Phone,
    color: "text-purple-400",
    bg: "bg-purple-500/15"
  },
  [ActivityType.proposalUploaded]: {
    icon: FileText,
    color: "text-sky-400",
    bg: "bg-sky-500/15"
  },
  [ActivityType.invoiceGenerated]: {
    icon: Receipt,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  [ActivityType.documentShared]: {
    icon: Share2,
    color: "text-indigo-400",
    bg: "bg-indigo-500/15"
  },
  [ActivityType.commentAdded]: {
    icon: MessageCircle,
    color: "text-teal-400",
    bg: "bg-teal-500/15"
  },
  // Extended quick-log activity types (client-side only)
  quickCall: {
    icon: Phone,
    color: "text-violet-400",
    bg: "bg-violet-500/15"
  },
  quickMeeting: {
    icon: Calendar,
    color: "text-cyan-400",
    bg: "bg-cyan-500/15"
  },
  quickEmail: {
    icon: Mail,
    color: "text-pink-400",
    bg: "bg-pink-500/15"
  }
};
function ActivityTimeline({ clientId }) {
  const { data: activities = [], isLoading } = useClientActivities(clientId);
  const addActivity = useAddClientActivity();
  const [noteText, setNoteText] = reactExports.useState("");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  async function handleAddNote() {
    if (!noteText.trim()) return;
    await addActivity.mutateAsync({
      clientId,
      activityType: ActivityType.noteAdded,
      description: noteText.trim()
    });
    setNoteText("");
    setShowAdd(false);
  }
  const sorted = [...activities].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "client_detail.activity_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Activity Timeline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          onClick: () => setShowAdd((v) => !v),
          "data-ocid": "client_detail.add_note_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "h-3.5 w-3.5 mr-1.5" }),
            "Add Note"
          ]
        }
      )
    ] }),
    showAdd && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: noteText,
          onChange: (e) => setNoteText(e.target.value),
          placeholder: "Add a note about this client interaction...",
          rows: 3,
          className: "bg-background border-border resize-none",
          "data-ocid": "client_detail.note_textarea"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: () => {
              setShowAdd(false);
              setNoteText("");
            },
            "data-ocid": "client_detail.note_cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleAddNote,
            disabled: addActivity.isPending || !noteText.trim(),
            "data-ocid": "client_detail.note_submit_button",
            children: "Save Note"
          }
        )
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" })
      ] })
    ] }, i)) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 text-center",
        "data-ocid": "client_detail.activity_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "h-5 w-5 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No activity yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Activity will appear here as you interact with this client." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[15px] top-0 bottom-0 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sorted.map((activity, idx) => {
        const style = ACTIVITY_ICONS[activity.activityType] ?? ACTIVITY_ICONS[ActivityType.noteAdded];
        const Icon = style.icon;
        const isQuick = [
          "quickCall",
          "quickMeeting",
          "quickEmail"
        ].includes(activity.activityType);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex gap-4 pl-2",
            "data-ocid": `client_detail.activity_item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isQuick ? `${style.bg} ring-2 ring-offset-1 ring-offset-background ring-${style.color.replace("text-", "")}/30` : style.bg}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-3.5 w-3.5 ${style.color}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    isQuick && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[10px] font-bold uppercase tracking-wider ${style.color} block mb-0.5`,
                        children: activity.activityType === "quickCall" ? "Call Logged" : activity.activityType === "quickMeeting" ? "Meeting Logged" : "Email Logged"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-sm leading-snug ${isQuick ? "text-foreground font-medium" : "text-foreground"}`,
                        children: activity.description
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap flex-shrink-0", children: formatDistanceToNow(activity.timestamp, {
                    addSuffix: true
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "by ",
                  activity.adminName
                ] }),
                activity.metadata && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1 italic", children: activity.metadata })
              ] })
            ]
          },
          activity.id
        );
      }) })
    ] })
  ] });
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
function useIsHydrated() {
  return shimExports.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}
var AVATAR_NAME = "Avatar";
var [createAvatarContext] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AvatarProvider,
      {
        scope: __scopeAvatar,
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...avatarProps, ref: forwardedRef })
      }
    );
  }
);
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {
    }, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
    const handleLoadingStatusChange = useCallbackRef((status) => {
      onLoadingStatusChange(status);
      context.onImageLoadingStatusChange(status);
    });
    useLayoutEffect2(() => {
      if (imageLoadingStatus !== "idle") {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [imageLoadingStatus, handleLoadingStatusChange]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
  }
);
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = reactExports.useState(delayMs === void 0);
    reactExports.useEffect(() => {
      if (delayMs !== void 0) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
  }
);
AvatarFallback$1.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
  if (!image) {
    return "idle";
  }
  if (!src) {
    return "error";
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
  const isHydrated = useIsHydrated();
  const imageRef = reactExports.useRef(null);
  const image = (() => {
    if (!isHydrated) return null;
    if (!imageRef.current) {
      imageRef.current = new window.Image();
    }
    return imageRef.current;
  })();
  const [loadingStatus, setLoadingStatus] = reactExports.useState(
    () => resolveLoadingStatus(image, src)
  );
  useLayoutEffect2(() => {
    setLoadingStatus(resolveLoadingStatus(image, src));
  }, [image, src]);
  useLayoutEffect2(() => {
    const updateStatus = (status) => () => {
      setLoadingStatus(status);
    };
    if (!image) return;
    const handleLoad = updateStatus("loaded");
    const handleError = updateStatus("error");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [image, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
var Root$2 = Avatar$1;
var Fallback = AvatarFallback$1;
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$2,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function getInitials(name) {
  return name.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}
function CommentItem({
  comment,
  clientId,
  depth = 0,
  replies = []
}) {
  const updateComment = useUpdateClientComment();
  const deleteComment = useDeleteClientComment();
  const pinComment = usePinClientComment();
  const addComment = useAddClientComment();
  const [editing, setEditing] = reactExports.useState(false);
  const [editText, setEditText] = reactExports.useState(comment.content);
  const [replying, setReplying] = reactExports.useState(false);
  const [replyText, setReplyText] = reactExports.useState("");
  async function handleSaveEdit() {
    if (!editText.trim() || editText === comment.content) {
      setEditing(false);
      return;
    }
    await updateComment.mutateAsync({
      commentId: comment.id,
      content: editText.trim(),
      clientId
    });
    setEditing(false);
  }
  async function handleDelete() {
    await deleteComment.mutateAsync({ commentId: comment.id, clientId });
  }
  async function handlePin() {
    await pinComment.mutateAsync({
      commentId: comment.id,
      isPinned: !comment.isPinned,
      clientId
    });
  }
  async function handleReply() {
    if (!replyText.trim()) return;
    await addComment.mutateAsync({
      clientId,
      content: replyText.trim(),
      parentId: comment.id
    });
    setReplyText("");
    setReplying(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: depth > 0 ? "ml-8 border-l border-border pl-4" : "", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `rounded-xl border p-3.5 ${comment.isPinned ? "bg-primary/5 border-primary/25" : "bg-card border-border"}`,
        "data-ocid": "client_detail.comment_item",
        children: [
          comment.isPinned && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-primary mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pinned" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-8 w-8 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/15 text-primary text-xs font-semibold", children: getInitials(comment.authorName) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: comment.authorName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(comment.timestamp, { addSuffix: true }) })
              ] }),
              editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: editText,
                    onChange: (e) => setEditText(e.target.value),
                    rows: 2,
                    className: "bg-background border-border resize-none text-sm",
                    "data-ocid": "client_detail.comment_edit_textarea"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      onClick: handleSaveEdit,
                      disabled: updateComment.isPending,
                      "data-ocid": "client_detail.comment_save_button",
                      children: "Save"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "ghost",
                      onClick: () => {
                        setEditing(false);
                        setEditText(comment.content);
                      },
                      "data-ocid": "client_detail.comment_cancel_button",
                      children: "Cancel"
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90 leading-relaxed break-words", children: comment.content }),
              !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
                depth === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-6 px-2 text-xs text-muted-foreground hover:text-foreground",
                    onClick: () => setReplying((v) => !v),
                    "data-ocid": "client_detail.comment_reply_button",
                    children: "Reply"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-6 px-2 text-xs text-muted-foreground hover:text-foreground",
                    onClick: () => {
                      setEditing(true);
                      setEditText(comment.content);
                    },
                    "data-ocid": "client_detail.comment_edit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3 mr-1" }),
                      "Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-6 px-2 text-xs text-muted-foreground hover:text-foreground",
                    onClick: handlePin,
                    disabled: pinComment.isPending,
                    "data-ocid": "client_detail.comment_pin_button",
                    children: [
                      comment.isPinned ? /* @__PURE__ */ jsxRuntimeExports.jsx(PinOff, { className: "h-3 w-3 mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-3 w-3 mr-1" }),
                      comment.isPinned ? "Unpin" : "Pin"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-6 px-2 text-xs text-muted-foreground hover:text-red-400",
                    onClick: handleDelete,
                    disabled: deleteComment.isPending,
                    "data-ocid": "client_detail.comment_delete_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 mr-1" }),
                      "Delete"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    ),
    replying && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 ml-8 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: replyText,
          onChange: (e) => setReplyText(e.target.value),
          placeholder: "Write a reply...",
          rows: 2,
          className: "bg-background border-border resize-none text-sm",
          "data-ocid": "client_detail.reply_textarea"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleReply,
            disabled: addComment.isPending || !replyText.trim(),
            "data-ocid": "client_detail.reply_submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Reply"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "ghost",
            onClick: () => {
              setReplying(false);
              setReplyText("");
            },
            "data-ocid": "client_detail.reply_cancel_button",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    replies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-2", children: replies.map((reply) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentItem,
      {
        comment: reply,
        clientId,
        depth: depth + 1,
        replies: []
      },
      reply.id
    )) })
  ] });
}
function CommentThread({ clientId }) {
  const { data: allComments = [], isLoading } = useClientComments(clientId);
  const addComment = useAddClientComment();
  const [newComment, setNewComment] = reactExports.useState("");
  const topLevel = allComments.filter((c) => !c.parentId);
  const replies = allComments.filter((c) => !!c.parentId);
  const pinnedFirst = [
    ...topLevel.filter((c) => c.isPinned),
    ...topLevel.filter((c) => !c.isPinned)
  ];
  function getReplies(parentId) {
    return replies.filter((r) => r.parentId === parentId);
  }
  async function handleSubmit() {
    if (!newComment.trim()) return;
    await addComment.mutateAsync({ clientId, content: newComment.trim() });
    setNewComment("");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "client_detail.comments_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Discussion" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" })
      ] })
    ] }, i)) }) : pinnedFirst.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 text-center",
        "data-ocid": "client_detail.comments_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Be the first to leave a note" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Comments and notes help your team stay aligned." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pinnedFirst.map((comment) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentItem,
      {
        comment,
        clientId,
        depth: 0,
        replies: getReplies(comment.id),
        allComments
      },
      comment.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: newComment,
          onChange: (e) => setNewComment(e.target.value),
          placeholder: "Add a comment or note for your team...",
          rows: 3,
          className: "bg-background border-border resize-none",
          "data-ocid": "client_detail.comment_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: handleSubmit,
          disabled: addComment.isPending || !newComment.trim(),
          size: "sm",
          "data-ocid": "client_detail.comment_submit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5 mr-1.5" }),
            "Post Comment"
          ]
        }
      ) })
    ] })
  ] });
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root$1 = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope$1(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive$1.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const STATUS_ORDER = [
  ClientStatus.leadCaptured,
  ClientStatus.contacted,
  ClientStatus.discoveryCallDone,
  ClientStatus.proposalSent,
  ClientStatus.negotiation,
  ClientStatus.closedWon,
  ClientStatus.closedLost,
  ClientStatus.onHold
];
const STATUS_STEP_ICONS = {
  [ClientStatus.leadCaptured]: Phone,
  [ClientStatus.contacted]: MessageCircle,
  [ClientStatus.discoveryCallDone]: ArrowLeftRight,
  [ClientStatus.proposalSent]: FileText,
  [ClientStatus.negotiation]: ArrowLeftRight,
  [ClientStatus.closedWon]: CircleCheck,
  [ClientStatus.closedLost]: CircleX,
  [ClientStatus.onHold]: TriangleAlert
};
function InfoField({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: value || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 italic", children: "Not set" }) })
  ] });
}
function LeadScoreBadge({ score }) {
  if (score >= 70)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3 w-3" }),
      " Hot · ",
      score
    ] });
  if (score >= 40)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { className: "h-3 w-3" }),
      " Warm · ",
      score
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted/20 text-muted-foreground border border-muted/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { className: "h-3 w-3" }),
    " Cold · ",
    score
  ] });
}
function DealProbabilityBar({ value }) {
  const color = value >= 70 ? "bg-emerald-500" : value >= 40 ? "bg-amber-500" : "bg-red-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-all ${color}`,
        style: { width: `${Math.min(value, 100)}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground tabular-nums", children: [
      value,
      "%"
    ] })
  ] });
}
function HealthGauge({ score }) {
  const color = score >= 70 ? "text-emerald-400" : score >= 40 ? "text-amber-400" : "text-red-400";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-[80px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: score, className: "h-1.5 flex-1 bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold tabular-nums ${color}`, children: score })
  ] });
}
const INVOICE_STATUS_CONFIG = {
  draft: {
    label: "Draft",
    classes: "bg-muted/20 text-muted-foreground border-muted/30"
  },
  sent: {
    label: "Sent",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/30"
  },
  viewed: {
    label: "Viewed",
    classes: "bg-purple-500/15 text-purple-400 border-purple-500/30"
  },
  paid: {
    label: "Paid",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
  },
  overdue: {
    label: "Overdue",
    classes: "bg-red-500/15 text-red-400 border-red-500/30"
  },
  partial: {
    label: "Partial",
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/30"
  },
  pending: {
    label: "Pending",
    classes: "bg-muted/20 text-muted-foreground border-muted/30"
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-muted/20 text-muted-foreground border-muted/30"
  }
};
const PROPOSAL_STATUS_CONFIG = {
  sent: {
    label: "Sent",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/30"
  },
  viewed: {
    label: "Viewed",
    classes: "bg-purple-500/15 text-purple-400 border-purple-500/30"
  },
  accepted: {
    label: "Accepted",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
  },
  rejected: {
    label: "Rejected",
    classes: "bg-red-500/15 text-red-400 border-red-500/30"
  }
};
function StatusHistoryItem({
  entry,
  idx
}) {
  const colors = STATUS_COLORS[entry.status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex gap-3 items-start",
      "data-ocid": `client_detail.status_history.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${colors.bg}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${colors.dot}` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-semibold ${colors.text}`, children: STATUS_LABELS[entry.status] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(entry.timestamp, { addSuffix: true }) })
          ] }),
          entry.note && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 italic", children: [
            "“",
            entry.note,
            "”"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70", children: [
            "by ",
            entry.adminName
          ] })
        ] })
      ]
    }
  );
}
function StatusChangeDialog({
  open,
  onOpenChange,
  currentStatus,
  clientId
}) {
  const updateStatus = useUpdateClientStatus();
  const [selected, setSelected] = reactExports.useState(currentStatus);
  const [note, setNote] = reactExports.useState("");
  async function handleSave() {
    if (selected !== currentStatus) {
      await updateStatus.mutateAsync({ id: clientId, status: selected, note });
    }
    setNote("");
    onOpenChange(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border max-w-sm",
      "data-ocid": "client_detail.status_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-foreground", children: "Update Pipeline Status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: STATUS_ORDER.map((s) => {
          const colors = STATUS_COLORS[s];
          const isSelected = s === selected;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelected(s),
              className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all ${isSelected ? `${colors.bg} ${colors.border} border` : "border-border hover:bg-muted/40"}`,
              "data-ocid": `client_detail.status_option.${s}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${colors.dot}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-sm font-medium ${isSelected ? colors.text : "text-foreground"}`,
                    children: STATUS_LABELS[s]
                  }
                ),
                isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: `ml-auto h-4 w-4 ${colors.text}` })
              ]
            },
            s
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Note (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: note,
              onChange: (e) => setNote(e.target.value),
              placeholder: "Reason for status change...",
              rows: 2,
              className: "bg-background border-border resize-none text-sm",
              "data-ocid": "client_detail.status_note_input"
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
              onClick: () => onOpenChange(false),
              "data-ocid": "client_detail.status_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: handleSave,
              disabled: updateStatus.isPending,
              "data-ocid": "client_detail.status_save_button",
              children: "Update Status"
            }
          )
        ] })
      ]
    }
  ) });
}
function WAModal({
  open,
  onOpenChange,
  phone,
  companyName,
  contactName
}) {
  const clean = phone.replace(/\D/g, "");
  const templates = [
    {
      label: "Follow-up",
      text: `Hi ${contactName}, just following up regarding our discussion about services for ${companyName}. Would love to connect soon!`
    },
    {
      label: "Meeting Request",
      text: `Hi ${contactName}, hope you are well! I would like to schedule a quick meeting to discuss how TechMecha Torque can assist ${companyName}. Are you free this week?`
    },
    {
      label: "Proposal Sent",
      text: `Hi ${contactName}, I have sent our detailed proposal for ${companyName}. Please review it and share any questions.`
    }
  ];
  const [message, setMessage] = reactExports.useState(templates[0].text);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border max-w-lg",
      "data-ocid": "client_detail.whatsapp_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-green-400" }),
          " WhatsApp —",
          " ",
          contactName
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: templates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => setMessage(t.text),
              className: "text-xs",
              "data-ocid": `client_detail.whatsapp_template.${t.label}`,
              children: t.label
            },
            t.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: message,
              onChange: (e) => setMessage(e.target.value),
              rows: 4,
              className: "bg-background border-border resize-none text-sm",
              "data-ocid": "client_detail.whatsapp_message_textarea"
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
              onClick: () => onOpenChange(false),
              "data-ocid": "client_detail.whatsapp_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              className: "bg-green-700 hover:bg-green-800 text-white border-0",
              onClick: () => window.open(
                `https://wa.me/${clean}?text=${encodeURIComponent(message)}`,
                "_blank",
                "noopener,noreferrer"
              ),
              "data-ocid": "client_detail.whatsapp_send_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 mr-1.5" }),
                " Open WhatsApp"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function AddContactDialog({
  open,
  onOpenChange,
  clientId
}) {
  const addContact = useAddContact();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    isPrimary: false
  });
  function reset() {
    setForm({ name: "", email: "", phone: "", role: "", isPrimary: false });
  }
  async function handleSave() {
    if (!form.name.trim()) return;
    const contact = {
      id: `c-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      role: form.role.trim(),
      isPrimary: form.isPrimary,
      addedAt: Date.now()
    };
    await addContact.mutateAsync({ clientId, contact });
    reset();
    onOpenChange(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (v) => {
        onOpenChange(v);
        if (!v) reset();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          className: "bg-card border-border max-w-sm",
          "data-ocid": "client_detail.add_contact_dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4 text-primary" }),
              " Add Contact"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              [
                { key: "name", label: "Full Name *", placeholder: "Jane Smith" },
                { key: "email", label: "Email", placeholder: "jane@company.com" },
                { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
                { key: "role", label: "Role / Title", placeholder: "CTO" }
              ].map(({ key, label, placeholder }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form[key],
                    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
                    placeholder,
                    className: "bg-background border-border h-8 text-sm",
                    "data-ocid": `client_detail.add_contact_${key}_input`
                  }
                )
              ] }, key)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    checked: form.isPrimary,
                    onCheckedChange: (v) => setForm((p) => ({ ...p, isPrimary: v })),
                    "data-ocid": "client_detail.add_contact_primary_switch"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground", children: "Set as primary contact" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => onOpenChange(false),
                  "data-ocid": "client_detail.add_contact_cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: handleSave,
                  disabled: addContact.isPending || !form.name.trim(),
                  "data-ocid": "client_detail.add_contact_save_button",
                  children: "Add Contact"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function ClientDetailPage() {
  var _a, _b, _c;
  const { id } = useParams({ from: "/protected/layout/clients/$id" });
  const navigate = useNavigate();
  const { data: client, isLoading } = useClient(id);
  const { data: invoices = [] } = useClientInvoices(id);
  const deleteClient = useDeleteClient();
  const updateInvoiceStatus = useUpdateInvoiceStatus();
  const updateProposalStatus = useUpdateProposalStatus();
  const logQuickActivity = useLogQuickActivity();
  const { addRecent } = useRecentlyViewedClients();
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [waOpen, setWaOpen] = reactExports.useState(false);
  const [statusOpen, setStatusOpen] = reactExports.useState(false);
  const [addContactOpen, setAddContactOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (id) addRecent(id);
  }, [id, addRecent]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", "data-ocid": "client_detail.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-28 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-2xl" })
    ] });
  }
  if (!client) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", "data-ocid": "client_detail.error_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/clients",
          className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Back to Clients"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-12 w-12 text-muted-foreground/30 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground", children: "Client not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "This client may have been deleted." })
      ] })
    ] });
  }
  const currentIdx = STATUS_ORDER.indexOf(client.currentStatus);
  const sortedHistory = [...client.statusHistory].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 sm:p-6 space-y-5 max-w-5xl mx-auto",
      "data-ocid": "client_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/clients",
            "data-ocid": "client_detail.back_link",
            className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              " Back to Clients"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-5 sm:p-6 space-y-4", children: [
          (client.currentStatus === ClientStatus.closedWon || client.currentStatus === ClientStatus.closedLost) && client.wonLostReason && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-xl px-4 py-3 flex flex-wrap items-center gap-3 ${client.currentStatus === ClientStatus.closedWon ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-red-500/10 border border-red-500/30"}`,
              "data-ocid": "client_detail.won_lost_banner",
              children: [
                client.currentStatus === ClientStatus.closedWon ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-400 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-red-400 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `text-sm font-medium ${client.currentStatus === ClientStatus.closedWon ? "text-emerald-300" : "text-red-300"}`,
                    children: [
                      client.currentStatus === ClientStatus.closedWon ? "Won" : "Lost",
                      ":"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground flex-1", children: client.wonLostReason }),
                client.closedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
                  "Closed",
                  " ",
                  formatDistanceToNow(new Date(client.closedAt), {
                    addSuffix: true
                  })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-7 w-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-bold text-foreground", children: client.companyName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: client.currentStatus }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { priority: client.priorityLevel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(LeadScoreBadge, { score: client.leadScore })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                client.contactPersonName,
                client.designation ? ` · ${client.designation}` : "",
                client.source ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-muted-foreground/70", children: [
                  "via ",
                  client.source
                ] }) : null
              ] }),
              client.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: client.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20",
                  children: tag
                },
                tag
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `mailto:${client.email}`,
                    className: "inline-flex items-center gap-1.5 hover:text-foreground transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
                      client.email
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `tel:${client.phone}`,
                    className: "inline-flex items-center gap-1.5 hover:text-foreground transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
                      client.phone
                    ]
                  }
                ),
                client.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                  client.location
                ] }),
                client.website && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: client.website.startsWith("http") ? client.website : `https://${client.website}`,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "inline-flex items-center gap-1.5 hover:text-foreground transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5" }),
                      client.website
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 space-y-2 min-w-[140px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-primary", children: [
                  "₹",
                  client.dealValue.toLocaleString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Deal Value" }),
                client.assignedTeamMember && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
                  client.assignedTeamMember
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
                  " Close Probability"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DealProbabilityBar, { value: client.dealProbability })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Health Score" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(HealthGauge, { score: client.healthScore })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "text-xs h-8 border-purple-500/30 text-purple-400 hover:bg-purple-500/10",
                onClick: () => logQuickActivity.mutate({
                  clientId: client.id,
                  activityType: "quickCall",
                  notes: "Quick call logged"
                }),
                "data-ocid": "client_detail.log_call_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3 mr-1.5" }),
                  " Log Call"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "text-xs h-8 border-pink-500/30 text-pink-400 hover:bg-pink-500/10",
                onClick: () => logQuickActivity.mutate({
                  clientId: client.id,
                  activityType: "quickEmail",
                  notes: "Email interaction logged"
                }),
                "data-ocid": "client_detail.log_email_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3 mr-1.5" }),
                  " Log Email"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "text-xs h-8 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10",
                onClick: () => logQuickActivity.mutate({
                  clientId: client.id,
                  activityType: "quickMeeting",
                  notes: "Meeting logged"
                }),
                "data-ocid": "client_detail.log_meeting_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 mr-1.5" }),
                  " Log Meeting"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-stretch gap-0.5", children: STATUS_ORDER.map((s, i) => {
            const colors = STATUS_COLORS[s];
            const Icon = STATUS_STEP_ICONS[s];
            const isActive = i === currentIdx;
            const isPast = i < currentIdx;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setStatusOpen(true),
                className: `group flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all cursor-pointer hover:bg-muted/50 ${isActive ? colors.bg : isPast ? "opacity-50" : "opacity-25"}`,
                "data-ocid": `client_detail.pipeline_stage.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Icon,
                    {
                      className: `h-4 w-4 ${isActive || isPast ? colors.text : "text-muted-foreground"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-[10px] font-medium hidden sm:block ${isActive ? colors.text : "text-muted-foreground"}`,
                      children: STATUS_LABELS[s]
                    }
                  )
                ]
              },
              s
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: () => setEditOpen(true),
                "data-ocid": "client_detail.edit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: () => setStatusOpen(true),
                "data-ocid": "client_detail.change_status_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Change Status"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "border-green-500/30 text-green-400 hover:bg-green-500/10",
                onClick: () => setWaOpen(true),
                "data-ocid": "client_detail.whatsapp_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "WhatsApp"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "border-red-500/30 text-red-400 hover:bg-red-500/10",
                  "data-ocid": "client_detail.delete_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 mr-1.5" }),
                    "Delete"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                AlertDialogContent,
                {
                  className: "bg-card border-border",
                  "data-ocid": "client_detail.delete_dialog",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "text-foreground", children: [
                        "Delete ",
                        client.companyName,
                        "?"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This will permanently remove the client and all associated data." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AlertDialogCancel,
                        {
                          className: "bg-muted border-border text-foreground",
                          "data-ocid": "client_detail.delete_cancel_button",
                          children: "Cancel"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AlertDialogAction,
                        {
                          className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                          onClick: async () => {
                            await deleteClient.mutateAsync(client.id);
                            navigate({ to: "/clients" });
                          },
                          "data-ocid": "client_detail.delete_confirm_button",
                          children: "Delete Client"
                        }
                      )
                    ] })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "profile", "data-ocid": "client_detail.tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-card border border-border w-full justify-start gap-1 p-1 h-auto flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "profile", "data-ocid": "client_detail.profile_tab", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Profile"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "documents",
                "data-ocid": "client_detail.documents_tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Documents"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "activity",
                "data-ocid": "client_detail.activity_tab_trigger",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Activity"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "comments",
                "data-ocid": "client_detail.comments_tab_trigger",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Comments"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-5 sm:p-6 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-4", children: "Company Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Company Name", value: client.companyName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Industry", value: client.industryType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Company Size", value: client.companySize }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Location", value: client.location }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Website", value: client.website }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "GST Number", value: client.gstNumber })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider", children: [
                  "Contacts (",
                  client.contacts.length || 1,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    className: "h-7 text-xs",
                    onClick: () => setAddContactOpen(true),
                    "data-ocid": "client_detail.add_contact_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 mr-1" }),
                      " Add Contact"
                    ]
                  }
                )
              ] }),
              client.contacts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: client.contacts.map((contact, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `rounded-xl p-4 border flex flex-col sm:flex-row sm:items-center gap-3 ${contact.isPrimary ? "bg-primary/5 border-primary/20" : "bg-muted/20 border-border"}`,
                  "data-ocid": `client_detail.contact_card.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: contact.name.charAt(0).toUpperCase() }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: contact.name }),
                        contact.isPrimary && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/30", children: "Primary" })
                      ] }),
                      contact.role && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: contact.role }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-1", children: [
                        contact.email && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "a",
                          {
                            href: `mailto:${contact.email}`,
                            className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3" }),
                              " ",
                              contact.email
                            ]
                          }
                        ),
                        contact.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "a",
                          {
                            href: `tel:${contact.phone}`,
                            className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
                              " ",
                              contact.phone
                            ]
                          }
                        )
                      ] })
                    ] })
                  ]
                },
                contact.id
              )) }) : (
                // Primary contact from flat fields as fallback
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-4 border bg-primary/5 border-primary/20 flex flex-col sm:flex-row sm:items-center gap-3",
                    "data-ocid": "client_detail.contact_card.1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: client.contactPersonName.charAt(0).toUpperCase() }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: client.contactPersonName }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/30", children: "Primary" })
                        ] }),
                        client.designation && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: client.designation }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "a",
                            {
                              href: `mailto:${client.email}`,
                              className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3" }),
                                " ",
                                client.email
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "a",
                            {
                              href: `tel:${client.phone}`,
                              className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
                                " ",
                                client.phone
                              ]
                            }
                          )
                        ] })
                      ] })
                    ]
                  }
                )
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-4", children: "Business Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoField,
                  {
                    label: "Service Interested In",
                    value: client.serviceInterested
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoField,
                  {
                    label: "Deal Value",
                    value: `INR ${client.dealValue.toLocaleString()}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Lead Source", value: client.leadSource }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoField,
                  {
                    label: "Priority",
                    value: PRIORITY_LABELS[client.priorityLevel]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoField,
                  {
                    label: "Assigned Team Member",
                    value: client.assignedTeamMember
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoField,
                  {
                    label: "Follow-up Date",
                    value: (_a = client.followUpDate) == null ? void 0 : _a.toLocaleDateString()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoField,
                  {
                    label: "Next Meeting Date",
                    value: (_b = client.nextMeetingDate) == null ? void 0 : _b.toLocaleDateString()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoField,
                  {
                    label: "Client Since",
                    value: client.createdAt.toLocaleDateString()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoField,
                  {
                    label: "Last Activity",
                    value: (_c = client.lastActivityDate) == null ? void 0 : _c.toLocaleDateString()
                  }
                )
              ] })
            ] }),
            (client.currentStatus === ClientStatus.closedWon || client.currentStatus === ClientStatus.closedLost) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-4", children: "Closure Information" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoField,
                  {
                    label: "Closed Reason",
                    value: client.closedReason
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: () => setEditOpen(true),
                "data-ocid": "client_detail.profile_edit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Edit Profile"
                ]
              }
            ) }),
            sortedHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-4", children: "Status History" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sortedHistory.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatusHistoryItem,
                  {
                    entry,
                    idx
                  },
                  `${entry.status}-${entry.timestamp.getTime()}`
                )) })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "documents", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-5 sm:p-6 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-4", children: "Proposal Tracking" }),
              client.proposalStatus ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${(PROPOSAL_STATUS_CONFIG[client.proposalStatus] ?? PROPOSAL_STATUS_CONFIG.sent).classes}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3" }),
                        (PROPOSAL_STATUS_CONFIG[client.proposalStatus] ?? PROPOSAL_STATUS_CONFIG.sent).label
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "Version",
                    " ",
                    client.proposalVersion > 0 ? client.proposalVersion : 1
                  ] }),
                  client.proposalExpiry && (() => {
                    const daysLeft = differenceInDays(
                      new Date(client.proposalExpiry),
                      /* @__PURE__ */ new Date()
                    );
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs font-medium ${daysLeft < 0 ? "text-red-400" : daysLeft <= 3 ? "text-amber-400" : "text-muted-foreground"}`,
                        children: daysLeft < 0 ? `Expired ${Math.abs(daysLeft)}d ago` : daysLeft === 0 ? "Expires today" : daysLeft <= 3 ? `⚠ Expires in ${daysLeft}d` : `Expires in ${daysLeft}d`
                      }
                    );
                  })()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["sent", "viewed", "accepted", "rejected"].map(
                  (s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateProposalStatus.mutate({
                        clientId: client.id,
                        status: s,
                        version: BigInt(client.proposalVersion)
                      }),
                      className: `px-3 py-1 rounded-full text-xs font-medium border transition-all ${client.proposalStatus === s ? `${(PROPOSAL_STATUS_CONFIG[s] ?? PROPOSAL_STATUS_CONFIG.sent).classes} opacity-100` : "border-border text-muted-foreground hover:bg-muted/40"}`,
                      "data-ocid": `client_detail.proposal_status.${s}`,
                      children: (PROPOSAL_STATUS_CONFIG[s] ?? PROPOSAL_STATUS_CONFIG.sent).label
                    },
                    s
                  )
                ) })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl border border-dashed border-border p-6 text-center",
                  "data-ocid": "client_detail.proposal_empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 text-muted-foreground/40 mx-auto mb-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No proposal sent yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        className: "mt-3 text-xs",
                        onClick: () => updateProposalStatus.mutate({
                          clientId: client.id,
                          status: "sent",
                          version: BigInt(1)
                        }),
                        "data-ocid": "client_detail.mark_proposal_sent_button",
                        children: "Mark Proposal as Sent"
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-4", children: "Invoices" }),
              invoices.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: invoices.map((inv, idx) => {
                const statusCfg = INVOICE_STATUS_CONFIG[inv.status] ?? INVOICE_STATUS_CONFIG.sent;
                const isOverdue = inv.status === "overdue";
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${isOverdue ? "border-red-500/30 bg-red-500/5" : "border-border bg-muted/20"}`,
                    "data-ocid": `client_detail.invoice_card.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Receipt,
                        {
                          className: `h-5 w-5 flex-shrink-0 ${isOverdue ? "text-red-400" : "text-primary"}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: inv.invoiceNumber }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${statusCfg.classes}`,
                              children: statusCfg.label
                            }
                          ),
                          inv.status === "partial" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-400", children: [
                            "₹",
                            inv.amountPaid.toLocaleString(),
                            " / ₹",
                            inv.total.toLocaleString(),
                            " paid"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                            "Total: ₹",
                            inv.total.toLocaleString()
                          ] }),
                          inv.dueDate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: isOverdue ? "text-red-400 font-medium" : "",
                              children: [
                                "Due:",
                                " ",
                                new Date(inv.dueDate).toLocaleDateString()
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                            "Created: ",
                            inv.createdAt.toLocaleDateString()
                          ] })
                        ] })
                      ] }),
                      inv.status !== "paid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          variant: "outline",
                          className: "text-xs h-7 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 flex-shrink-0",
                          onClick: () => updateInvoiceStatus.mutate({
                            clientId: client.id,
                            invoiceId: inv.id,
                            status: InvoicePaymentStatus.paid
                          }),
                          "data-ocid": `client_detail.mark_paid_button.${idx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 mr-1" }),
                            " Mark Paid"
                          ]
                        }
                      )
                    ]
                  },
                  inv.id
                );
              }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center py-8 text-center",
                  "data-ocid": "client_detail.invoices_empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-8 w-8 text-muted-foreground/30 mb-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No invoices yet" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-4", children: "Documents" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center py-10 text-center rounded-xl border border-dashed border-border",
                  "data-ocid": "client_detail.documents_empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Document Center" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs mb-3", children: "Upload proposals, agreements, contracts, and presentations." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 justify-center max-w-xs", children: [
                      "Proposals",
                      "Quotations",
                      "Agreements",
                      "Contracts",
                      "Presentations"
                    ].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs text-muted-foreground border-border",
                        children: cat
                      },
                      cat
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/50 mt-3", children: "Enable the object-storage extension to activate uploads." })
                  ]
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "activity", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card border border-border p-5 sm:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTimeline, { clientId: client.id }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "comments", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card border border-border p-5 sm:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommentThread, { clientId: client.id }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClientForm, { open: editOpen, onOpenChange: setEditOpen, client }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WAModal,
          {
            open: waOpen,
            onOpenChange: setWaOpen,
            phone: client.whatsappNumber || client.phone,
            companyName: client.companyName,
            contactName: client.contactPersonName
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatusChangeDialog,
          {
            open: statusOpen,
            onOpenChange: setStatusOpen,
            currentStatus: client.currentStatus,
            clientId: client.id
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AddContactDialog,
          {
            open: addContactOpen,
            onOpenChange: setAddContactOpen,
            clientId: client.id
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "py-4 text-center text-xs text-muted-foreground/50", children: [
          "Last updated",
          " ",
          formatDistanceToNow(client.updatedAt, { addSuffix: true }),
          " · Created ",
          client.createdAt.toLocaleDateString(),
          " by ",
          client.createdBy
        ] })
      ]
    }
  );
}
export {
  ClientDetailPage as default
};
