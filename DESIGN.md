# Design Brief — TechMecha Torque

**Purpose**: Enterprise intern management system for three organizational spaces (Org, Marketing, Learning). Tracks onboarding, documents, performance, and communication at scale.

**Tone**: Professional, authoritative, enterprise-grade. Bold brand red accents signal urgency and key actions. Clean, predictable hierarchy for rapid scanning.

**Differentiation**: TechMecha Red (#e71514 / `0.54 0.25 21` OKLCH) as the dominant accent — appears on CTAs, badges, active states, and error highlights. High contrast against deep black backgrounds ensures visibility and impact.

## Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|----------|
| Background | `0.995 0 0` | `0.06 0 0` (#0a0a0a) | Base surface |
| Card | `0.99 0 0` | `0.065 0 0` (#111111) | Contained content |
| Foreground | `0.12 0 0` | `1.0 0 0` (#ffffff) | Primary text |
| Primary/Accent | `0.65 0.15 35` | `0.54 0.25 21` (#e71514) | CTAs, highlights, active nav |
| Muted | `0.9 0 0` | `0.65 0 0` (#a1a1aa) | Secondary text, disabled states |
| Border | `0.88 0 0` | `0.15 0 0` | Subtle dividers, input strokes |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Delete, cancel actions |

## Typography

- **Display**: General Sans, 500–600 weight, used for page titles, section headers
- **Body**: General Sans, 400 weight, all body text, metadata, labels
- **Mono**: Geist Mono, 400 weight, technical content, code snippets, timestamps
- **Scale**: 12px (xs), 14px (sm), 16px (base), 20px (lg), 24px (xl), 32px (2xl)

## Elevation & Depth

- **Base**: `bg-background` (#0a0a0a)
- **L1 Cards**: `bg-card` (#111111) with `border-b border-border`
- **L2 Popovers**: `bg-popover` (#121212) with shadow
- **Interactive**: Primary red on hover, ring on focus (brand red, 2px)

## Structural Zones

| Zone | Surface | Border | Purpose |
|------|---------|--------|----------|
| Sidebar | `bg-sidebar` (#111111) | `border-r border-border` | Space nav, logo, brand |
| Header | `bg-card` (#111111) | `border-b border-border` | Breadcrumb, title, quick actions |
| Main Content | `bg-background` (#0a0a0a) | none | Grid, tables, large forms |
| Footer | `bg-muted/5` (transparent) | `border-t border-border` | Sparse, muted, metadata only |

## Component Patterns

- **Buttons**: Primary = brand red on dark, white text. Secondary = muted bg, inverted on hover.
- **Badges**: Red accent for "active"/"urgent", muted for "inactive"/"archived"
- **Tables**: Alternating row backgrounds (card, transparent) with red accent on hover
- **Forms**: Input stroke = border color, focus ring = brand red, 2px
- **Navigation**: Active item = brand red text + underline, inactive = muted text
- **Modals**: Popover bg with border-t in brand red

## Motion

- **Smooth transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` for hover/active states
- **No bounce**: Avoid spring animations; favor easing for professional tone
- **Entrance**: Subtle fade-in (200ms) on page load or modal open

## Constraints

- Dark mode only (no light mode toggle)
- No gradients (flat, solid colors)
- No rounded corners > 12px (maintains sharp, modern look)
- Red used sparingly: CTAs, badges, active states only (not background fills)
- Sidebar collapses to icon-only on mobile (`sm` breakpoint)
- Table collapses to card view on mobile

## Responsive

- Mobile (`sm`): Sidebar icon-only, single-column content, larger touch targets (48px min)
- Tablet (`md`): Sidebar with labels, two-column grid, compact spacing
- Desktop (`lg`+): Full sidebar, multi-column layout, generous spacing

## Accessibility

- Foreground-on-background ≥ 0.7 lightness difference in OKLCH (exceeds WCAG AA)
- Red accent used with text or icon, never color alone for status
- Focus ring: 2px brand red, visible on all interactive elements
- All interactive elements ≥ 44px touch target on mobile
