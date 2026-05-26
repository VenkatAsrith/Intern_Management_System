# Design Brief — TechMecha Torque IMS + CRMS (Extended)

**Purpose**: Enterprise platform for intern management (Org, Marketing, Learning spaces) + Client Relationship & Lead Management System. 8 integrated modules: intern lifecycle Kanban, task management, attendance QR + leave, full LMS, upgraded client pipeline, global search palette, notifications center, announcement board. Unified dark theme, red-dominant branding, SaaS-quality UX with color-coded status systems.

**Tone**: Professional, authoritative, clean. TechMecha Red signals urgency and key actions. Multiple Kanban pipelines, activity timelines, QR codes, progress cards, and analytics are the focal interactive zones. Each module has distinct color coding for instant visual recognition.

**Differentiation**: TechMecha Red (#e71514 / `0.54 0.25 21` OKLCH dark) dominates CTAs, badges, and active states. Intern pipeline (13 stages), task pipeline (5 stages), client pipeline (7 B2B stages), attendance, and LMS each have distinct color-coded status systems. Glassmorphic hover effects and smooth 0.3s transitions maintain enterprise polish across all modules.

## Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|--------|
| Background | `0.995 0 0` | `0.06 0 0` | Base surface |
| Card | `0.99 0 0` | `0.065 0 0` | Contained content |
| Foreground | `0.12 0 0` | `1.0 0 0` | Primary text |
| Primary/Accent | `0.65 0.15 35` | `0.54 0.25 21` | CTAs, highlights |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Delete, rejected |
| Intern Applied | `0.60 0.18 250` | `0.65 0.20 250` | Blue |
| Intern Screened | `0.58 0.20 280` | `0.70 0.22 280` | Purple |
| Intern Interview | `0.75 0.19 90` | `0.80 0.22 90` | Amber |
| Intern Offer Sent | `0.65 0.19 140` | `0.75 0.22 140` | Green |
| Intern Active | `0.72 0.22 140` | `0.72 0.22 140` | Green |
| Intern Alumni | `0.65 0 0` | `0.65 0 0` | Muted |
| Task Draft | `0.65 0 0` | `0.65 0 0` | Muted |
| Task Submitted | `0.68 0.22 280` | `0.70 0.22 280` | Purple |
| Task Under Review | `0.75 0.19 90` | `0.80 0.22 90` | Amber |
| Task Approved | `0.72 0.22 140` | `0.72 0.22 140` | Green |
| Task Revision | `0.55 0.22 25` | `0.65 0.19 22` | Red |
| Attendance Present | `0.72 0.22 140` | `0.72 0.22 140` | Green |
| Attendance Absent | `0.55 0.22 25` | `0.65 0.19 22` | Red |
| Attendance Leave Req | `0.75 0.19 90` | `0.80 0.22 90` | Amber |
| LMS In Progress | `0.75 0.19 90` | `0.80 0.22 90` | Amber |
| LMS Completed | `0.72 0.22 140` | `0.72 0.22 140` | Green |
| LMS Certificate | `0.54 0.25 21` | `0.54 0.25 21` | Red/TechMecha |
| Client Lead Captured | `0.60 0.18 250` | `0.65 0.20 250` | Blue |
| Client Contacted | `0.68 0.22 280` | `0.70 0.22 280` | Purple |
| Client Discovery | `0.75 0.19 90` | `0.80 0.22 90` | Amber |
| Client Proposal | `0.78 0.19 60` | `0.85 0.22 60` | Amber-Gold |
| Client Negotiation | `0.72 0.22 160` | `0.75 0.22 160` | Cyan |
| Client Won | `0.72 0.22 140` | `0.72 0.22 140` | Green |
| Client Lost | `0.55 0.22 25` | `0.65 0.19 22` | Red |
| Client On Hold | `0.65 0 0` | `0.65 0 0` | Muted |

## Typography

- **Display**: General Sans, 500–600 weight, page titles, section headers, module titles
- **Body**: General Sans, 400 weight, all body text, labels, metadata, card content
- **Mono**: Geist Mono, 400 weight, timestamps, technical content, QR scanner feedback
- **Scale**: 12px (xs), 14px (sm), 16px (base), 20px (lg), 24px (xl), 32px (2xl)

## Structural Zones

| Zone | Surface | Border | Purpose |
|------|---------|--------|--------|
| Sidebar | `bg-sidebar` (#111111) | `border-r border-border` | Space nav, intern/client/task sections |
| Header | `bg-card` (#111111) | `border-b border-border` | Title, global search, notifications |
| Main Content | `bg-background` (#0a0a0a) | none | Kanban boards, tables, forms, QR scanner |
| Kanban Column | `bg-card/30` | subtle border | Pipeline stage container |
| Command Palette | `bg-popover` (#1a1a1a) | `border border-border` | Global search/command input (modal overlay) |
| Notification Center | `bg-card` | `border-l-4 border-accent` | Toast/drawer with activity feed |
| Announcement | `bg-card border-l-4 border-accent` | left accent color | Broadcast message card |

## Component Patterns

- **Kanban Cards**: `bg-card` with left accent stripe (4px) in stage color, hover shadow elevation
- **Status Badges**: `bg-*-status/20` with `text-*-status` and `border border-*-status/30`, 4px radius
- **Pipeline Headers**: Stage name + count badge, muted text, 12px colored bottom border
- **Buttons**: Primary = TechMecha Red, Secondary = muted, Tertiary = ghost
- **Forms & Modals**: `bg-popover` with `border-t` in accent color
- **Activity Timeline**: Vertical line + icons + cards for intern/task/client actions
- **Comment Threads**: Nested, Slack-style, timestamps in mono
- **QR Code Interface**: Large centered scanner, fallback manual entry, session countdown
- **LMS Progress Card**: Title, progress bar (colored), completion %, resource count
- **Analytics Cards**: White text on dark bg, mini Recharts with chart-* palette

## Motion & Interaction

- **Smooth transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` on hover/active
- **Drag**: Kanban cards lift on drag; shadow elevation to `shadow-kanban-drag`
- **Fade-in**: 300ms entrance for modals, cards, timeline items, badges
- **Pulse**: Subtle 2s pulse on follow-up reminders, attendance deadlines, incomplete tasks
- **Slide-in**: 300ms slide from left/right for notifications and sidesheets

## Constraints

- Dark mode only, no full-page gradients (flat surfaces only)
- Max 12px border radius (sharp, modern)
- Red sparingly: CTAs, badges, active nav, rejected/absent status only
- All pipeline colors distinct and accessible (WCAG AA+ contrast)
- Sidebar collapses to icon-only on `sm` breakpoint; tables collapse to card view
- QR code region scales responsively; fallback input always available

## Responsive

- Mobile (`sm`): Icon sidebar, single-column Kanban, full-width table cards, 48px touch targets
- Tablet (`md`): Labeled sidebar, 2-column Kanban/grid, 2-col table
- Desktop (`lg`+): Full sidebar, multi-column Kanban + table, generous spacing, side-by-side

## Accessibility

- Foreground ≥ 0.7 L difference in OKLCH (WCAG AAA)
- Status badges never color-alone; use icons, text labels, or patterns
- Focus rings: 2px brand red on all interactive elements
- Min 44px touch target on mobile, 48px on tablet, 40px on desktop
- QR scanner: keyboard fallback, clear instructions, high contrast
- Announcements and notifications: dismissible, always readable
