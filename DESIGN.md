# Design Brief — TechMecha Torque IMS + CRM (V3 Workspace Edition)

**Purpose**: Enterprise platform for intern management (Org, Marketing, Learning spaces), client relationship management, task assignment, daily work journals, team communication, and performance analytics. Unified dark luxury SaaS theme with TechMecha Red accents. V3 introduces intern workspaces, task management (6 statuses), daily notes journals, team channels with member visibility, work submissions, internship timeline tracking, meeting scheduler, and expanded performance metrics.

**Tone**: Professional, authoritative, minimalist. TechMecha Red signals urgency, active tasks, and key CTAs. Task pipelines, daily journals, team channels, and timelines are the focal interactive zones. Each module has distinct badge and color coding for instant recognition.

**Differentiation**: Intern workspace dashboard consolidates all assigned work, communication, and progress into one unified view. Task status badges (6 colors), channel-scoped messaging (members see only their channel details), daily notes as internal work journals, and vertical internship timelines with milestone tracking create a cohesive productivity layer. Premium dark aesthetic inspired by Linear, Notion, ClickUp.

## Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|----------|
| Background | `0.995 0 0` | `0.06 0 0` | Base surface |
| Card | `0.99 0 0` | `0.065 0 0` | Contained content |
| Foreground | `0.12 0 0` | `1.0 0 0` | Primary text |
| Primary/Accent | `0.65 0.15 35` | `0.54 0.25 21` | CTAs, highlights, active states |
| Task Pending | `0.78 0.19 60` | `0.78 0.19 60` | Yellow/gold badge |
| Task In Progress | `0.70 0.17 250` | `0.70 0.17 250` | Blue badge |
| Task Under Review | `0.75 0.19 60` | `0.75 0.19 60` | Orange badge |
| Task Completed | `0.72 0.22 140` | `0.72 0.22 140` | Green badge |
| Task Rejected | `0.65 0.19 22` | `0.65 0.19 22` | Red badge |
| Task Rework Needed | `0.62 0.22 300` | `0.62 0.22 300` | Purple badge |
| Channel Sidebar | `0.08 0 0` | `0.08 0 0` | Dark charcoal messaging area |
| Notes Timestamp | `0.55 0 0` | `0.55 0 0` | Muted time metadata |
| Timeline Track | `0.15 0 0` | `0.15 0 0` | Vertical progress line |
| Timeline Milestone | `0.54 0.25 21` | `0.54 0.25 21` | Active/upcoming milestone node |
| Timeline Completed | `0.72 0.22 140` | `0.72 0.22 140` | Finished milestone node |
| Submission Pending | `0.65 0.2 250` | `0.65 0.2 250` | Blue submission awaiting review |
| Submission Approved | `0.72 0.22 140` | `0.72 0.22 140` | Green approved submission |
| Submission Rejected | `0.65 0.19 22` | `0.65 0.19 22` | Red rejected submission |

## Typography

- **Display**: Inter 500–600 weight, workspace titles, section headers, task names
- **Body**: Inter 400 weight, all body text, labels, metadata, card content, chat messages
- **Mono**: Geist Mono 400 weight, timestamps, technical content, submission links
- **Scale**: 12px (xs), 14px (sm), 16px (base), 20px (lg), 24px (xl), 32px (2xl)

## Structural Zones

| Zone | Surface | Border | Purpose |
|------|---------|--------|----------|
| Workspace Sidebar | `bg-channel-sidebar` (#151515) | `border-r border-border` | Channel list, member badges |
| Workspace Header | `bg-card` (#111111) | `border-b border-border` | Title, quick actions, member count |
| Main Content | `bg-background` (#0a0a0a) | none | Task cards, notes, timeline, submissions |
| Task Card | `bg-card` (#111111) | `border border-border` | Individual task with status badge |
| Notes Card | `bg-card` (#111111) | `border border-border` | Daily journal entry with comments |
| Timeline Container | `bg-background` (#0a0a0a) | none | Vertical milestone track |
| Chat Message Bubble | `bg-card` (#111111) | `border-l border-channel-member-badge` | Team message with avatar |
| Submission Card | `bg-card` (#111111) | `border-l-4 border-submission-*` | Work submission with status |

## Component Patterns

- **Task Badges**: 6 distinct badge colors (Pending yellow, In Progress blue, Under Review orange, Completed green, Rejected red, Rework purple). Background 15% opacity with full-opacity text and 30% opacity border.
- **Daily Notes Card**: Timestamp in small mono text, content area, threaded comment section with left accent stripe.
- **Channel Sidebar**: Dark charcoal background, member avatar badges (red accent for admin/owner), channel item hover state lifts with bg-card.
- **Timeline Track**: Vertical line (15% opacity), milestone nodes (red primary color active, green when completed), hover scale 1.25.
- **Submission Card**: Thin left border stripe in status color (pending blue, approved green, rejected red), hover shadow elevation.
- **Chat Bubbles**: Sender name + avatar, timestamp in mono, message text, reaction/reply controls.
- **Performance Widget**: Circular gauge with percentage, label, trend indicator.
- **Meeting Schedule Widget**: Calendar grid, upcoming meeting cards with time, attendee count, join button.

## Motion & Interaction

- **Smooth transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` on hover/active across all interactive elements
- **Card elevation**: Hover shadow elevation on task, notes, submission, and chat cards
- **Timeline node hover**: Scale 1.25, subtle glow from `timeline-node` shadow
- **Channel item hover**: Background to `bg-card`, smooth transition
- **Fade-in**: 300ms entrance for new task cards, notes, timeline milestones, messages
- **Slide-in**: 300ms slide from left for chat messages, from right for new task notifications

## Constraints

- Dark mode only, no full-page gradients (flat matte surfaces)
- 0.625rem border radius (sharp, modern) on cards; 0.5rem on badges
- Red used sparingly: urgent task statuses, CTAs, active navigation, rejected/rework badges only
- Task status badges must have distinct hue and be color + icon distinguishable (not color-alone for accessibility)
- Channel sidebar collapses to icon-only on `sm` breakpoint
- All chat bubbles and notes remain readable with AA+ contrast
- Timeline track responsive: full-width on mobile, left-aligned in 80px gutter on desktop
- Meeting calendar grid collapses to vertical list on mobile

## Responsive

- Mobile (`sm`): Icon-only sidebar, single-column task list and notes, full-width timeline, stacked chat messages, 48px touch targets
- Tablet (`md`): Labeled sidebar with abbreviations, 1-column cards, timeline with left gutter, 44px touch targets
- Desktop (`lg`+): Full sidebar labels, 2-column card grid for tasks/submissions, timeline with 80px left gutter, generous spacing

## Accessibility

- Foreground ≥ 0.7 L difference from background in OKLCH (WCAG AAA)
- Task status badges combine color + icon + text label (never color-alone)
- Focus rings: 2px TechMecha Red on all interactive elements (tasks, channels, submissions, timeline nodes)
- Min 44px touch target on mobile, 48px on tablet, 40px on desktop
- Daily notes comment threads: high contrast text, clear author attribution, timestamps
- Channel members list: readable on all screen sizes, avatar fallbacks for missing images
- Timeline milestones: hover tooltip shows milestone name/date, keyboard navigation (arrow keys)

## Notes for Frontend Engineers

- All V3 workspace UI (tasks, notes, channels, timeline) uses new CSS token prefixes: `--task-*`, `--channel-*`, `--notes-*`, `--timeline-*`, `--submission-*`
- Existing CRM, V2 RBAC, automation engine, and admin console designs are preserved unchanged
- Task status badges apply `.status-badge` base class + status-specific class (e.g., `status-badge task-badge-pending`)
- Channel chat uses `.channel-sidebar` container + `.channel-item` per channel + `.chat-bubble` for messages
- Daily notes use `.notes-card` + `.notes-timestamp` + `.notes-comment` for threaded replies
- Timeline uses `.timeline-track` vertical line + `.timeline-milestone` nodes (with `.completed` modifier)
- All shadows use new `task-card`, `notes-card`, `chat-hover`, `timeline-node` shadow tokens from Tailwind
- Intern workspace route: `/workspace/:internId` (new)
- Task creation keyboard shortcut: `T` key
- Daily note creation: `N` key
- Channel message: `M` key
