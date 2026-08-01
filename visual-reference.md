# Visual Style Reference — Soft Productivity Mobile UI

---

## Core Aesthetic

**Soft Clarity UI** — a mobile-first productivity interface that combines card-based layout, generous whitespace, and a single confident accent color to make task management feel calm, scannable, and approachable.

**Design philosophy:** Reduce cognitive load through layered surfaces, rounded geometry, and strict typographic hierarchy — every screen should feel light, ordered, and immediately actionable.

**Key influences / hybrid styles:**

- **iOS Human Interface Guidelines** — system keyboard, navigation patterns, SF-style typography
- **Material Design FAB** — circular primary action button, bottom-right placement
- **Soft UI / Neumorphism-lite** — elevated white cards on neutral grey, diffused shadows (not heavy skeuomorphism)
- **Dashboard grid apps** — category tiles with icon + label + metadata count

---



## Color Palette

**Total colors: 9** (1 primary, 2 neutrals, 3 text/surface variants, 4 category accents)


| Color Name           | Hex       | Usage Context                                                                          |
| -------------------- | --------- | -------------------------------------------------------------------------------------- |
| **Primary Blue**     | `#4A7AFF` | Headers, FAB, primary buttons, decorative background circles, active category emphasis |
| **Surface White**    | `#FFFFFF` | Cards, task list container, modal sheet, checkbox backgrounds                          |
| **Canvas Grey**      | `#F5F5F7` | App background, keyboard area, inactive screen edges                                   |
| **Text Primary**     | `#1C1C1E` | Headlines ("Lists"), task titles, category names, button labels on white               |
| **Text Secondary**   | `#8E8E93` | Task counts, timestamps, section labels ("Late", "Today", "Done"), placeholders        |
| **Text on Primary**  | `#FFFFFF` | Header titles, FAB icon, "Create" button label, text over blue header block            |
| **Accent Orange**    | `#FF9500` | "Work" category icon                                                                   |
| **Accent Red/Coral** | `#FF6B6B` | "Music" category icon                                                                  |
| **Accent Green**     | `#34C759` | "Travel" / success-adjacent category icon                                              |
| **Accent Purple**    | `#AF52DE` | "Study" category icon (optional 10th if counted separately)                            |


**Contrast notes:**

- High contrast between `#4A7AFF` and `#FFFFFF` for CTAs and headers
- Low-contrast pairing of `#8E8E93` on `#FFFFFF` reserved for metadata only — never for primary actions
- Completed tasks use **strikethrough + lighter grey** to de-emphasize without removing

---



## Typography System



### Headline style

- **Family:** Geometric sans-serif (SF Pro, Inter, or similar)
- **Weight:** Bold (700)
- **Scale:** ~24–28px / 1.5–1.75rem for screen titles ("Lists", "All")
- **Tracking:** Slightly tight (-0.02em) for large titles
- **Color:** `#1C1C1E` on white; `#FFFFFF` on blue headers



### Body / secondary text

- **Task titles:** Medium (500–600), ~16–17px, `#1C1C1E`
- **Metadata** (counts, times, placeholders): Regular (400), ~13–14px, `#8E8E93`
- **Section headers** ("Late", "Today", "Done"): Medium (500), ~13px, uppercase or small-caps optional, `#8E8E93`
- **Completed tasks:** Regular + `line-through`, `#8E8E93`



### Hierarchy structure

1. **Screen title** — largest, boldest (H1)
2. **Category / context header** — bold, often inside colored block (H2)
3. **Section group labels** — small, grey, spacing above lists (H3)
4. **Task item title** — body emphasis
5. **Timestamp / count** — caption level



### Special considerations

- **Monospace:** Not used — all UI is proportional sans-serif
- **Bilingual:** Layout supports longer strings via flexible card widths; avoid fixed-width labels in metadata rows
- **Numeric data** (task counts, times) uses same family as body, not tabular figures

---



## Key Design Elements



### Textures and treatments

- **Flat color fills** — no gradients on cards or buttons (solid `#4A7AFF` only)
- **Soft drop shadows** on cards: `0 4px 24px rgba(0, 0, 0, 0.06–0.08)` — low opacity, high blur
- **No borders** on cards — depth comes from shadow + white-on-grey contrast
- **Decorative oversized circles** in primary blue, ~30–40% opacity, cropped at canvas edges (marketing/presentation layer)



### Graphic elements

- **Icons:** Thin-line, ~20–24px, single-color per category (not multicolor glyphs)
- **Checkboxes:** Square, ~20px, 1–2px border, empty default; check fill on completion
- **FAB:** 56px circle, `#4A7AFF`, white "+" centered, shadow `0 4px 12px rgba(74, 122, 255, 0.4)`
- **Avatar / category badge:** Circular white disc with icon inside blue header zone
- **Navigation:** Hamburger (left), back arrow, overflow "⋯", close "×" — all minimal line icons



### Layout structure and grid

- **Screen 1 — Lists:** 2-column card grid, ~16px gutter, ~16–20px page padding
- **Screen 2 — Task list:** Full-width blue header (~30% viewport) + white sheet overlapping with **rounded top corners only** (~24px radius)
- **Screen 3 — New task:** Full-screen modal; input top-aligned; metadata rows as icon + label pairs; full-width CTA above keyboard
- **Vertical rhythm:** ~24px between section groups; ~12–16px between task rows
- **Touch targets:** Minimum 44px height for rows and buttons



### Unique stylistic choices

- **Header-as-hero:** Category detail uses a large blue block with centered circular emblem — strong brand anchor
- **Sheet-over-header pattern:** White content card slides up over colored header (iOS modal feel)
- **Temporal grouping:** Tasks sorted by urgency state (Late → Today → Done), not just category
- **Category grid as entry point:** Dashboard metaphor before drill-down list
- **Single accent discipline:** Almost everything interactive is blue; category differentiation via small icon color only

---



## Visual Concept

**Conceptual bridge:** *"Organized calm"* — the UI treats productivity as spatial (categories as rooms, tasks as items on a shelf) rather than temporal chaos. The blue hero header signals "you are here"; the white sheet is "your work surface"; the FAB is the one always-available action.

**Relationship between elements:**

- **Grey canvas** → passive, recedes
- **White cards** → active content zones
- **Blue** → navigation, commitment, creation
- **Grey text** → context, not action
- **Icon accents** → quick scan without competing with primary blue

**Ideal use cases:**

- Personal todo / habit / list apps
- Onboarding-light productivity tools
- Mobile-first MVPs targeting iOS-native feel
- Apps where **one primary action** (add item) must always be visible
- Products needing **category browsing + detail list** without complex navigation trees

---



## Guidelines Summary


| Principle         | Rule                                                                       |
| ----------------- | -------------------------------------------------------------------------- |
| **Corner radius** | 20–24px on cards; 12–16px on buttons; full circle on FAB                   |
| **Shadow depth**  | One elevation level for cards; stronger shadow only on FAB                 |
| **Color budget**  | 1 primary + neutrals + 4 micro-accents max                                 |
| **Typography**    | Max 2 weights per screen (Bold + Regular/Medium)                           |
| **Whitespace**    | Prefer empty space over dividers; use section labels instead of lines      |
| **CTA placement** | Primary action: bottom-right FAB (lists) or full-width button (forms)      |
| **Avoid**         | Heavy borders, dark mode in this reference, gradient buttons, dense tables |


**Distinctive tension:** The design feels **soft and friendly** (rounded, shadowed) but **structurally strict** (grid, grouped lists, single accent). That balance is the signature — approachable without looking playful or childish.