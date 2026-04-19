# Design System Inspired by Claude (Anthropic)

## 1. Visual Theme & Atmosphere

Claude's interface is a literary salon reimagined as a product page — warm, unhurried, and quietly intellectual. The entire experience is built on a parchment-toned canvas (`#f5f4ed`) that deliberately evokes the feeling of high-quality paper rather than a digital surface. Where most AI product pages lean into cold, futuristic aesthetics, Claude's design radiates human warmth, as if the AI itself has good taste in interior design.

The signature move is the custom Fraunces typeface — a medium-weight serif with generous proportions that gives every headline the gravitas of a book title. Combined with organic, hand-drawn-feeling illustrations in terracotta (`#c96442`), black, and muted green, the visual language says "thoughtful companion" rather than "powerful tool." The serif headlines breathe at tight-but-comfortable line-heights (1.10–1.30), creating a cadence that feels more like reading an essay than scanning a product page.

What makes Claude's design truly distinctive is its warm neutral palette. Every gray has a yellow-brown undertone (`#5e5d59`, `#87867f`, `#4d4c48`) — there are no cool blue-grays anywhere. Borders are cream-tinted (`#f0eee6`, `#e8e6dc`), shadows use warm transparent blacks, and even the darkest surfaces (`#141413`, `#30302e`) carry a barely perceptible olive warmth. This chromatic consistency creates a space that feels lived-in and trustworthy.

**Key Characteristics:**
- Warm parchment canvas (`#f5f4ed`) evoking premium paper, not screens
- Custom Anthropic type family: Serif for headlines, Sans for UI, Mono for code
- Terracotta brand accent (`#c96442`) — warm, earthy, deliberately un-tech
- Exclusively warm-toned neutrals — every gray has a yellow-brown undertone
- Organic, editorial illustrations replacing typical tech iconography
- Ring-based shadow system (`0px 0px 0px 1px`) creating border-like depth without visible borders
- Magazine-like pacing with generous section spacing and serif-driven hierarchy

## 2. Color Palette & Roles

### Primary
- **Anthropic Near Black** (`#141413`): The primary text color and dark-theme surface — not pure black but a warm, almost olive-tinted dark that's gentler on the eyes. The warmest "black" in any major tech brand.
- **Terracotta Brand** (`#c96442`): The core brand color — a burnt orange-brown used for primary CTA buttons, brand moments, and the signature accent. Deliberately earthy and un-tech.
- **Coral Accent** (`#d97757`): A lighter, warmer variant of the brand color used for text accents, links on dark surfaces, and secondary emphasis.

### Secondary & Accent
- **Error Crimson** (`#b53333`): A deep, warm red for error states — serious without being alarming.
- **Focus Blue** (`#3898ec`): Standard blue for input focus rings — the only cool color in the entire system, used purely for accessibility.

### Surface & Background
- **Parchment** (`#f5f4ed`): The primary page background — a warm cream with a yellow-green tint that feels like aged paper. The emotional foundation of the entire design.
- **Ivory** (`#faf9f5`): The lightest surface — used for cards and elevated containers on the Parchment background. Barely distinguishable but creates subtle layering.
- **Pure White** (`#ffffff`): Reserved for specific button surfaces and maximum-contrast elements.
- **Warm Sand** (`#e8e6dc`): Button backgrounds and prominent interactive surfaces — a noticeably warm light gray.
- **Dark Surface** (`#30302e`): Dark-theme containers, nav borders, and elevated dark elements — warm charcoal.
- **Deep Dark** (`#141413`): Dark-theme page background and primary dark surface.

### Neutrals & Text
- **Charcoal Warm** (`#4d4c48`): Button text on light warm surfaces — the go-to dark-on-light text.
- **Olive Gray** (`#5e5d59`): Secondary body text — a distinctly warm medium-dark gray.
- **Stone Gray** (`#87867f`): Tertiary text, footnotes, and de-emphasized metadata.
- **Dark Warm** (`#3d3d3a`): Dark text links and emphasized secondary text.
- **Warm Silver** (`#b0aea5`): Text on dark surfaces — a warm, parchment-tinted light gray.

### Semantic & Accent
- **Border Cream** (`#f0eee6`): Standard light-theme border — barely visible warm cream, creating the gentlest possible containment.
- **Border Warm** (`#e8e6dc`): Prominent borders, section dividers, and emphasized containment on light surfaces.
- **Border Dark** (`#30302e`): Standard border on dark surfaces — maintains the warm tone.
- **Ring Warm** (`#d1cfc5`): Shadow ring color for button hover/focus states.
- **Ring Subtle** (`#dedc01`): Secondary ring variant for lighter interactive surfaces.
- **Ring Deep** (`#c2c0b6`): Deeper ring for active/pressed states.

### Gradient System
- Claude's design is **gradient-free** in the traditional sense. Depth and visual richness come from the interplay of warm surface tones, organic illustrations, and light/dark section alternation. The warm palette itself creates a "gradient" effect as the eye moves through cream → sand → stone → charcoal → black sections.

## 3. Typography Rules

### Font Family
- **Headline**: `Fraunces`, with fallback: `Georgia`
- **Body / UI**: `DM Sans`, with fallback: `system-ui, Inter`
- **Code**: `JetBrains Mono`, with fallback: `ui-monospace, Menlo`

*All three fonts are free on Google Fonts, with full Latin Extended + Vietnamese diacritics support.*

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Fraunces | 64px (4rem) | 500 | 1.10 (tight) | normal | Maximum impact, book-title presence |
| Section Heading | Fraunces | 52px (3.25rem) | 500 | 1.20 (tight) | normal | Feature section anchors |
| Sub-heading Large | Fraunces | 36–36.8px (~2.3rem) | 500 | 1.30 | normal | Secondary section markers |
| Sub-heading | Fraunces | 32px (2rem) | 500 | 1.10 (tight) | normal | Card titles, feature names |
| Sub-heading Small | Fraunces | 25–25.6px (~1.6rem) | 500 | 1.20 | normal | Smaller section titles |
| Feature Title | Fraunces | 20.8px (1.3rem) | 500 | 1.20 | normal | Small feature headings |
| Body Serif | Fraunces | 17px (1.06rem) | 400 | 1.60 (relaxed) | normal | Serif body text (editorial passages) |
| Body Large | DM Sans | 20px (1.25rem) | 400 | 1.60 (relaxed) | normal | Intro paragraphs |
| Body / Nav | DM Sans | 17px (1.06rem) | 400–500 | 1.00–1.60 | normal | Navigation links, UI text |
| Body Standard | DM Sans | 16px (1rem) | 400–500 | 1.25–1.60 | normal | Standard body, button text |
| Body Small | DM Sans | 15px (0.94rem) | 400–500 | 1.00–1.60 | normal | Compact body text |
| Caption | DM Sans | 14px (0.88rem) | 400 | 1.43 | normal | Metadata, descriptions |
| Label | DM Sans | 12px (0.75rem) | 400–500 | 1.25–1.60 | 0.12px | Badges, small labels |
| Overline | DM Sans | 10px (0.63rem) | 400 | 1.60 | 0.5px | Uppercase overline labels |
| Micro | DM Sans | 9.6px (0.6rem) | 400 | 1.60 | 0.096px | Smallest text |
| Code | JetBrains Mono | 15px (0.94rem) | 400 | 1.60 | -0.32px | Inline code, terminal |

### Principles
- **Serif for authority, sans for utility**: Fraunces carries all headline content with medium weight (500), giving every heading the gravitas of a published title. DM Sans handles all functional UI text — buttons, labels, navigation — with quiet efficiency.
- **Single weight for serifs**: All Fraunces headings use weight 500 — no bold, no light. This creates a consistent "voice" across all headline sizes, as if the same author wrote every heading.
- **Relaxed body line-height**: Most body text uses 1.60 line-height — significantly more generous than typical tech sites (1.4–1.5). This creates a reading experience closer to a book than a dashboard.
- **Tight-but-not-compressed headings**: Line-heights of 1.10–1.30 for headings are tight but never claustrophobic. The serif letterforms need breathing room that sans-serif fonts don't.
- **Micro letter-spacing on labels**: Small sans text (12px and below) uses deliberate letter-spacing (0.12px–0.5px) to maintain readability at tiny sizes.

## 4. Component Stylings

### Buttons

**Warm Sand (Secondary)**
- Background: Warm Sand (`#e8e6dc`)
- Text: Charcoal Warm (`#4d4c48`)
- Padding: 0px 12px 0px 8px (asymmetric — icon-first layout)
- Radius: comfortably rounded (8px)
- Shadow: ring-based (`#e8e6dc 0px 0px 0px 0px, #d1cfc5 0px 0px 0px 1px`)
- The workhorse button — warm, unassuming, clearly interactive

**White Surface**
- Background: Pure White (`#ffffff`)
- Text: Anthropic Near Black (`#141413`)
- Padding: 8px 16px 8px 12px
- Radius: generously rounded (12px)
- Hover: shifts to secondary background color
- Clean, elevated button for light surfaces

**Dark Charcoal**
- Background: Dark Surface (`#30302e`)
- Text: Ivory (`#faf9f5`)
- Padding: 0px 12px 0px 8px
- Radius: comfortably rounded (8px)
- Shadow: ring-based (`#30302e 0px 0px 0px 0px, ring 0px 0px 0px 1px`)
- The inverted variant for dark-on-light emphasis

**Brand Terracotta**
- Background: Terracotta Brand (`#c96442`)
- Text: Ivory (`#faf9f5`)
- Radius: 8–12px
- Shadow: ring-based (`#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px`)
- The primary CTA — the only button with chromatic color

**Dark Primary**
- Background: Anthropic Near Black (`#141413`)
- Text: Warm Silver (`#b0aea5`)
- Padding: 9.6px 16.8px
- Radius: generously rounded (12px)
- Border: thin solid Dark Surface (`1px solid #30302e`)
- Used on dark theme surfaces

### Cards & Containers
- Background: Ivory (`#faf9f5`) or Pure White (`#ffffff`) on light surfaces; Dark Surface (`#30302e`) on dark
- Border: thin solid Border Cream (`1px solid #f0eee6`) on light; `1px solid #30302e` on dark
- Radius: comfortably rounded (8px) for standard cards; generously rounded (16px) for featured; very rounded (32px) for hero containers and embedded media
- Shadow: whisper-soft (`rgba(0,0,0,0.05) 0px 4px 24px`) for elevated content
- Ring shadow: `0px 0px 0px 1px` patterns for interactive card states
- Section borders: `1px 0px 0px` (top-only) for list item separators

### Inputs & Forms
- Text: Anthropic Near Black (`#141413`)
- Padding: 1.6px 12px (very compact vertical)
- Border: standard warm borders
- Focus: ring with Focus Blue (`#3898ec`) border-color — the only cool color moment
- Radius: generously rounded (12px)

### Navigation
- Sticky top nav with warm background
- Logo: Claude wordmark in Anthropic Near Black
- Links: mix of Near Black (`#141413`), Olive Gray (`#5e5d59`), and Dark Warm (`#3d3d3a`)
- Nav border: `1px solid #30302e` (dark) or `1px solid #f0eee6` (light)
- CTA: Terracotta Brand button or White Surface button
- Hover: text shifts to foreground-primary, no decoration

### Image Treatment
- Product screenshots showing the Claude chat interface
- Generous border-radius on media (16–32px)
- Embedded video players with rounded corners
- Dark UI screenshots provide contrast against warm light canvas
- Organic, hand-drawn illustrations for conceptual sections

### Distinctive Components

**Model Comparison Cards**
- Opus 4.5, Sonnet 4.5, Haiku 4.5 presented in a clean card grid
- Each model gets a bordered card with name, description, and capability badges
- Border Warm (`#e8e6dc`) separation between items

**Organic Illustrations**
- Hand-drawn-feeling vector illustrations in terracotta, black, and muted green
- Abstract, conceptual rather than literal product diagrams
- The primary visual personality — no other AI company uses this style

**Dark/Light Section Alternation**
- The page alternates between Parchment light and Near Black dark sections
- Creates a reading rhythm like chapters in a book
- Each section feels like a distinct environment

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 3px, 4px, 6px, 8px, 10px, 12px, 16px, 20px, 24px, 30px
- Button padding: asymmetric (0px 12px 0px 8px) or balanced (8px 16px)
- Card internal padding: approximately 24–32px
- Section vertical spacing: generous (estimated 80–120px between major sections)

### Grid & Container
- Max container width: approximately 1200px, centered
- Hero: centered with editorial layout
- Feature sections: single-column or 2–3 column card grids
- Model comparison: clean 3-column grid
- Full-width dark sections breaking the container for emphasis

### Whitespace Philosophy
- **Editorial pacing**: Each section breathes like a magazine spread — generous top/bottom margins create natural reading pauses.
- **Serif-driven rhythm**: The serif headings establish a literary cadence that demands more whitespace than sans-serif designs.
- **Content island approach**: Sections alternate between light and dark environments, creating distinct "rooms" for each message.

### Border Radius Scale
- Sharp (4px): Minimal inline elements
- Subtly rounded (6–7.5px): Small buttons, secondary interactive elements
- Comfortably rounded (8–8.5px): Standard buttons, cards, containers
- Generously rounded (12px): Primary buttons, input fields, nav elements
- Very rounded (16px): Featured containers, video players, tab lists
- Highly rounded (24px): Tag-like elements, highlighted containers
- Maximum rounded (32px): Hero containers, embedded media, large cards

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, no border | Parchment background, inline text |
| Contained (Level 1) | `1px solid #f0eee6` (light) or `1px solid #30302e` (dark) | Standard cards, sections |
| Ring (Level 2) | `0px 0px 0px 1px` ring shadows using warm grays | Interactive cards, buttons, hover states |
| Whisper (Level 3) | `rgba(0,0,0,0.05) 0px 4px 24px` | Elevated feature cards, product screenshots |
| Inset (Level 4) | `inset 0px 0px 0px 1px` at 15% opacity | Active/pressed button states |

**Shadow Philosophy**: Claude communicates depth through **warm-toned ring shadows** rather than traditional drop shadows. The signature `0px 0px 0px 1px` pattern creates a border-like halo that's softer than an actual border — it's a shadow pretending to be a border, or a border that's technically a shadow. When drop shadows do appear, they're extremely soft (0.05 opacity, 24px blur) — barely visible lifts that suggest floating rather than casting.

### Decorative Depth
- **Light/Dark alternation**: The most dramatic depth effect comes from alternating between Parchment (`#f5f4ed`) and Near Black (`#141413`) sections — entire sections shift elevation by changing the ambient light level.
- **Warm ring halos**: Button and card interactions use ring shadows that match the warm palette — never cool-toned or generic gray.

## 7. Do's and Don'ts

### Do
- Use Parchment (`#f5f4ed`) as the primary light background — the warm cream tone IS the Claude personality
- Use Fraunces at weight 500 for all headlines — the single-weight consistency is intentional
- Use Terracotta Brand (`#c96442`) only for primary CTAs and the highest-signal brand moments
- Keep all neutrals warm-toned — every gray should have a yellow-brown undertone
- Use ring shadows (`0px 0px 0px 1px`) for interactive element states instead of drop shadows
- Maintain the editorial serif/sans hierarchy — serif for content headlines, sans for UI
- Use generous body line-height (1.60) for a literary reading experience
- Alternate between light and dark sections to create chapter-like page rhythm
- Apply generous border-radius (12–32px) for a soft, approachable feel

### Don't
- Don't use cool blue-grays anywhere — the palette is exclusively warm-toned
- Don't use bold (700+) weight on Fraunces — weight 500 is the ceiling for serifs
- Don't introduce saturated colors beyond Terracotta — the palette is deliberately muted
- Don't use sharp corners (< 6px radius) on buttons or cards — softness is core to the identity
- Don't apply heavy drop shadows — depth comes from ring shadows and background color shifts
- Don't use pure white (`#ffffff`) as a page background — Parchment (`#f5f4ed`) or Ivory (`#faf9f5`) are always warmer
- Don't use geometric/tech-style illustrations — Claude's illustrations are organic and hand-drawn-feeling
- Don't reduce body line-height below 1.40 — the generous spacing supports the editorial personality
- Don't use monospace fonts for non-code content — JetBrains Mono is strictly for code
- Don't mix in sans-serif for headlines — the serif/sans split is the typographic identity

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Small Mobile | <479px | Minimum layout, stacked everything, compact typography |
| Mobile | 479–640px | Single column, hamburger nav, reduced heading sizes |
| Large Mobile | 640–767px | Slightly wider content area |
| Tablet | 768–991px | 2-column grids begin, condensed nav |
| Desktop | 992px+ | Full multi-column layout, expanded nav, maximum hero typography (64px) |

### Touch Targets
- Buttons use generous padding (8–16px vertical minimum)
- Navigation links adequately spaced for thumb navigation
- Card surfaces serve as large touch targets
- Minimum recommended: 44x44px

### Collapsing Strategy
- **Navigation**: Full horizontal nav collapses to hamburger on mobile
- **Feature sections**: Multi-column → stacked single column
- **Hero text**: 64px → 36px → ~25px progressive scaling
- **Model cards**: 3-column → stacked vertical
- **Section padding**: Reduces proportionally but maintains editorial rhythm
- **Illustrations**: Scale proportionally, maintain aspect ratios

### Image Behavior
- Product screenshots scale proportionally within rounded containers
- Illustrations maintain quality at all sizes
- Video embeds maintain 16:9 aspect ratio with rounded corners
- No art direction changes between breakpoints

## 9. Agent Prompt Guide

### Quick Color Reference
- Brand CTA: "Terracotta Brand (#c96442)"
- Page Background: "Parchment (#f5f4ed)"
- Card Surface: "Ivory (#faf9f5)"
- Primary Text: "Anthropic Near Black (#141413)"
- Secondary Text: "Olive Gray (#5e5d59)"
- Tertiary Text: "Stone Gray (#87867f)"
- Borders (light): "Border Cream (#f0eee6)"
- Dark Surface: "Dark Surface (#30302e)"

### Example Component Prompts
- "Create a hero section on Parchment (#f5f4ed) with a headline at 64px Fraunces weight 500, line-height 1.10. Use Anthropic Near Black (#141413) text. Add a subtitle in Olive Gray (#5e5d59) at 20px DM Sans with 1.60 line-height. Place a Terracotta Brand (#c96442) CTA button with Ivory text, 12px radius."
- "Design a feature card on Ivory (#faf9f5) with a 1px solid Border Cream (#f0eee6) border and comfortably rounded corners (8px). Title in Fraunces at 25px weight 500, description in Olive Gray (#5e5d59) at 16px DM Sans. Add a whisper shadow (rgba(0,0,0,0.05) 0px 4px 24px)."
- "Build a dark section on Anthropic Near Black (#141413) with Ivory (#faf9f5) headline text in Fraunces at 52px weight 500. Use Warm Silver (#b0aea5) for body text. Borders in Dark Surface (#30302e)."
- "Create a button in Warm Sand (#e8e6dc) with Charcoal Warm (#4d4c48) text, 8px radius, and a ring shadow (0px 0px 0px 1px #d1cfc5). Padding: 0px 12px 0px 8px."
- "Design a model comparison grid with three cards on Ivory surfaces. Each card gets a Border Warm (#e8e6dc) top border, model name in Fraunces at 25px, and description in Olive Gray at 15px DM Sans."

### Iteration Guide
1. Focus on ONE component at a time
2. Reference specific color names — "use Olive Gray (#5e5d59)" not "make it gray"
3. Always specify warm-toned variants — no cool grays
4. Describe serif vs sans usage explicitly — "Fraunces for the heading, DM Sans for the label"
5. For shadows, use "ring shadow (0px 0px 0px 1px)" or "whisper shadow" — never generic "drop shadow"
6. Specify the warm background — "on Parchment (#f5f4ed)" or "on Near Black (#141413)"
7. Keep illustrations organic and conceptual — describe "hand-drawn-feeling" style

---

# 10. Mobile Execution Layer (Atoms-inspired)

Sections 1–9 above define **Layer 1 — the Claude/Anthropic foundation**: warm parchment, serif-driven editorial voice, terracotta brand, ring shadows, muted palette. This is the DNA. It is **immutable**.

Section 10 defines **Layer 2 — mobile execution rhythm**, inspired by Atoms. (The official Atomic Habits app, Refero app_id 99). Layer 2 governs how Layer 1 is expressed on a phone-sized canvas: component sizing, spacing density, primary navigation pattern. Layer 2 never overrides Layer 1 semantics — it only adapts shape.

## 10.1 When Layer 2 Applies

- All React Native / Expo screens in Ambient.
- Any mobile-first surface (bottom sheets, full-screen modals, onboarding).
- **Layer 1 still wins on:** palette, font families, illustration style, semantic color usage.
- **Layer 2 wins on:** component dimensions, touch targets, sheet-vs-modal choice, CTA placement.

## 10.2 Mobile Typography Scale

Keep Fraunces + DM Sans pairing from §3. Resize for mobile:

| Role | Font | Mobile Size | Weight | Line Height |
|---|---|---|---|---|
| Hero / Screen Title | Fraunces | 32px | 500 | 1.15 |
| H1 | Fraunces | 28px | 500 | 1.20 |
| H2 | Fraunces | 22px | 500 | 1.25 |
| Body Large (journal) | DM Sans | 17px | 400 | 1.60 |
| Body | DM Sans | 15px | 400 | 1.50 |
| Caption | DM Sans | 13px | 500 | 1.40 |
| Pill / Badge | DM Sans | 12px | 600 | 1.20 |

Serif heading + sans body split is preserved. No bold serif (weight 500 max — from §3).

## 10.3 Mobile Spacing

| Token | Value | Use |
|---|---|---|
| `space-3` | 12px | Tight stack |
| `space-4` | 16px | Card inner min |
| `space-5` | 24px | **Screen horizontal padding** |
| `space-6` | 32px | **Section gap** |
| `space-7` | 48px | Hero top padding |

- Screen horizontal padding: **24px minimum** (generous, editorial — consistent with §5 whitespace philosophy)
- Section gap: **32px**
- Touch target minimum: **56px height** (exceeds §8's 44px — mobile demands more)

## 10.3a Vertical Rhythm

Token scale (px): `4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 64`

All element `y` must snap to multiples of `4`.

**Consecutive-element gap table:**

| Between | Gap |
|---|---|
| Status bar bottom → header title | 32 |
| Title → subtitle | 24 |
| Subtitle → first card / body | 32 |
| Overline label → headline | 16 |
| Headline → body | 24 |
| Body → bullet list / card | 32 |
| Section header → section content | 28 |
| Section → section | 48 |
| List row → list row | 12 (with 1px Warm Silver divider) |
| Card → Card (stacked) | 16 |
| Card bottom → CTA | 32 (min) |
| CTA bottom → secondary link | 14 |
| Secondary link → footer note | 24 |
| Footer → bottom safe area | 40 |

**Screen anchor constants (390×844 viewport):**

| Element | y anchor |
|---|---|
| Status bar | 0 |
| Status bar height | 54 |
| Header title top | 72 |
| CTA top (bottom-pinned) | 724 |
| Secondary link below CTA | 794 |
| Home indicator top | 830 |

Screen-level layout = VERTICAL auto-layout frame with `itemSpacing` drawn from the gap table. Absolute positioning allowed only for status bar, home indicator, overlay sheets, and bottom-pinned CTAs.

## 10.4 Primary CTA — Full-width, Chunky

Layer 1 §4 allows small Warm Sand buttons for desktop workhorse. On mobile, **primary CTA is always full-width and tall**.

| Variant | Shape | Background | Text | Height |
|---|---|---|---|---|
| Primary (brand) | Full-width, radius 12px | Terracotta Brand `#c96442` | Ivory `#faf9f5`, 16pt semibold | 60px |
| Primary (dark) | Full-width, radius 12px | Anthropic Near Black `#141413` | Ivory `#faf9f5`, 16pt semibold | 60px |
| Secondary | Full-width, radius 12px | Warm Sand `#e8e6dc` | Charcoal Warm `#4d4c48`, 16pt medium | 60px |
| Tertiary (text) | No bg | — | Olive Gray `#5e5d59`, 15pt medium | 44px |

**Rule:** primary CTA pinned to bottom of sheet/screen, full-width, above safe area. No tiny "Save" buttons in top-right corner. Ring shadow from §6 still applies.

## 10.5 Bottom Sheet — The Default Container

Atoms' signature pattern: bottom sheet replaces center-screen modal for **every** non-system interaction.

- Radius top corners: **28px** (from §5 "highly rounded" scale)
- Drag handle: 36×4px, Warm Silver `#b0aea5`, 8px from top
- Content padding: 24px horizontal, 24px top, 32px bottom (safe area)
- Height: **60–85% viewport**, never full-screen unless keyboard present
- Backdrop: blur 20px + `rgba(20,20,19,0.3)` dim (warm, from Near Black)
- Primary CTA pinned bottom, full-width

**Variants:**
- **Light sheet:** Ivory `#faf9f5` — default, forms/actions.
- **Dark sheet:** Near Black `#141413` — paywall, celebratory moments, AI insight reveals.

**Rule:** if you're about to design a centered modal on mobile, rewrite as a bottom sheet. Only system alerts (`UIAlertController`) stay centered.

## 10.6 Cards on Mobile

Extends §4 Cards & Containers:

- Radius: **24px** (bumped from 8–16px for mobile editorial feel)
- Padding: 24px (20px min)
- Background: Ivory `#faf9f5` or 2-tone warm gradient (Parchment → Warm Sand)
- Optional pill label top-left (Label 12pt from §3) + status dot top-right
- Shadow: whisper from §6 (`rgba(0,0,0,0.05) 0px 4px 24px`) — barely there
- Gradient rule: 2 stops only, low saturation, warm→warm (never cool tones)

## 10.7 Status Signaling — No Aggression

Atoms uses red `#EB495C` "NEW" badges. **Ambient does not.** Replacements:

| Need | Ambient solution |
|---|---|
| "New" indicator | 8px terracotta dot `#c96442`, no text |
| Concern / support alert | Terracotta accent + serif heading, never error red |
| Error state | Error Crimson `#b53333` (§2) — reserved for true errors only |
| Positive signal | Muted green accent (aligned with illustration palette §1) |
| Neutral info | Stone Gray `#87867f` text, no color |

Error Crimson is for form validation failures, network errors. Never for "you missed a day" or "3 people are low."

## 10.8 Icons

Reaffirming the memory rule: **Lucide only.** No emoji (✨🔒✍). No custom glyphs unless it's a true illustration per §4.

- Stroke: 1.75px
- Size: 20px inline, 24px standalone, 32px hero
- Color: inherit from text, or Olive Gray `#5e5d59` decorative

## 10.9 Key Mobile Patterns

### Daily Entry screen
- Serif H1 prompt (28px Fraunces, weight 500) — top, Parchment bg
- Full-bleed text input, 17pt DM Sans, line-height 1.60, no border
- Optional mood chips in bottom sheet (never forced inline)
- Primary CTA "Save entry" — full-width Terracotta at bottom

### Group Pulse
- Ivory card per member, radius 24px
- **No raw content** — AI signal only, 1–2 sentences third-person (per CLAUDE.md privacy rule)
- Avatar 40px, name in Caption 13pt, signal in Body 15pt
- No timestamps visible unless tapped — avoids surveillance feel

### AI Insight / Suggestion
- Dark bottom sheet (Near Black `#141413`)
- Serif heading in Ivory, Terracotta accent for key phrase
- Primary CTA Ivory bg with Near Black text ("Suggest a meetup")
- Tertiary "Remind me later" — Olive Gray text button, no guilt copy

### 365-day grid
Cell 40×40, radius 4, 7 cols × 53 rows, gap 6. Empty Warm Sand #e8e6dc. Written: illustration variant (see below) on gradient tint. Today: 1.5px ring Terracotta #c96442. Tap → bottom sheet with entry preview. Never red "missed" marker.

### Garden Illustrations
12 variants, 40×40, hand-drawn feel, tones terracotta/sage/sand/ochre (no saturated colors): `seedling`, `leaf`, `sun`, `cloud`, `moon`, `petal`, `stone`, `drop`, `spark`, `crescent`, `fern`, `acorn`. Pick deterministic from `hash(userId + dayOfYear + moodBucket) % 12`. Same day always renders same variant.

### Tab Bar (Glass)

Bottom nav, cross-platform glass. 4 tabs: Vườn (Home), Nhật ký (BookOpen), Nhóm (Users), Bạn (User).

**Layers (bottom→top):** platform blur (iOS 40 / Android 24 real-blur) → warm tint `rgba(250,249,245,0.72)` iOS, `0.88` Android → top hairline `rgba(240,238,230,0.9)` → tab row 56px.

**Tab:** icon wrap 40×28 r14; icon Lucide 22px stroke 1.75; label DM Sans Medium 10/15, ls 0.3; gap 4; hit-slop 8.

**States:** inactive `#87867f`, no wrap bg. Active Terracotta `#c96442` + wrap bg `rgba(201,100,66,0.10)`.

**Layout:** `position: absolute`, bottom 0, full width. Bottom padding `max(safe-area.bottom, 12)`. Screens reserve ≥80px bottom.

### Pulse Card
Size 380×190, padding 22, radius 16, bg Ivory #faf9f5 or gradient cream→sand. Avatar 32 circular, 10px gap to name. Name DM Sans Medium 13/17 Near Black. Signal DM Sans Regular 18/1.45 Near Black, 2–3 lines, top 64. Overline Stone #87867f, DM Sans SemiBold 12, ls 0.5, uppercase, top 130.

### Mood Dots (1–5)
Row of 5 × 36px circles, gap 14. Inactive: 1.5px border Warm Sand #e8e6dc, no fill. Selected: fill Terracotta #c96442, intensity scaled by value `rgba(201,100,66, 0.2→1.0)`. Hit slop 8.

### Privacy Badges
Pill, h30, radius 999, px12 py6, icon→text gap 6. Label DM Sans SemiBold 12, ls 0.5, uppercase. Icon Lucide 14 stroke 1.75.
- Only-you: icon `lock`, bg Warm Sand #e8e6dc, text Charcoal #4d4c48.
- AI-signal: icon `sparkles`, bg `rgba(201,100,66,0.10)`, text Terracotta #c96442.
- Shared: icon `eye`, bg Warm Sand #e8e6dc, text Charcoal #4d4c48.
Never emoji — Lucide only.

---

## §10.5 Spacing Rhythm Contract

**Source of truth:** `src/design-system/tokens/spacing.ts` → `rhythm`.

Screens MUST NOT pick raw `spacing.*` for card / row / header / sheet contexts. Use `t.rhythm.*` instead. Raw tokens remain legal for free-form custom layouts only.

| Context | Token | Value |
|---|---|---|
| Card padding (H/V) | `rhythm.card.padH/padV` | 12 |
| Card inner gap | `rhythm.card.gap` | 12 |
| List row padding H | `rhythm.row.padH` | 20 |
| List row padding V | `rhythm.row.padV` | 12 |
| List row inner gap | `rhythm.row.gap` | 12 |
| Stream gap (card↔card, row↔row) | `rhythm.list` | 20 |
| Section gap | `rhythm.section` | 32 |
| Screen padding H | `rhythm.screen` | 24 |
| Header padTop | `rhythm.header.padTop` | 16 |
| Header title↔subtitle gap | `rhythm.header.gap` | 12 |
| Sheet content padding | `rhythm.sheet.pad` | 24 |
| Sheet block gap | `rhythm.sheet.gap` | 20 |

Primitives owning the contract (to be extracted, Phase 3–5):
`<Card>`, `<ListRow>`, `<ScreenHeader>`, `<SheetHeader>`, `ScreenLayout.bodyGap`.

Changing any value above = global rhythm shift; treat as breaking.

---

# 11. Using External Design Tools with This System

## 11.1 Figma MCP

When Claude calls `get_design_context`, `get_screenshot`, or similar:

1. **Figma output is LAYOUT REFERENCE only.** The returned React+Tailwind code is generic — never paste as-is.
2. **Remap every color** to tokens in §2 / §10.7. If Figma returns `#FF3B30`, map to Terracotta Brand or Error Crimson depending on semantics. Never ship raw hex from Figma.
3. **Remap every font** to Fraunces (headings) / DM Sans (body) per §3 and §10.2.
4. **Check component shapes.** If Figma shows a 40px button, scale to 60px height per §10.4. If Figma shows a centered modal, rewrite as bottom sheet per §10.5.
5. **Icons:** replace any raw SVG with closest Lucide equivalent.
6. **Illustrations:** never use Figma-exported stock illustrations. Use Ambient's hand-drawn-feeling style from §4 Distinctive Components.

## 11.2 Refero MCP (including Atoms app_id 99)

When referencing Refero screens/flows as inspiration:

1. **Extract shape, drop personality.** Copy the rhythm (button size, spacing, sheet pattern), never the source app's accents.
2. **Never copy Atoms orange `#FBBD6A`, red badge `#EB495C`, or aggressive paywall copy.** Map to Ambient palette + honest copy.
3. **Never copy dark patterns:** streak shame, FOMO badges, urgency timers, guilt copy.
4. **Honor the 2-layer rule:** if a Refero pattern contradicts §1–§9, it does not ship.

---

# 12. Pre-Ship Checklist

Before marking a screen complete:

- [ ] Background uses Parchment `#f5f4ed` or Ivory `#faf9f5` (never pure white as page bg)
- [ ] Every color maps to a token in §2 or §10.7
- [ ] Headings Fraunces weight 500; body DM Sans
- [ ] Screen horizontal padding ≥ 24px; section gap ≥ 32px
- [ ] Primary CTA full-width, ≥ 60px tall, pinned bottom
- [ ] Modals are bottom sheets (unless system alert)
- [ ] Icons are Lucide — zero emoji glyphs
- [ ] No cool blue-grays anywhere; no saturated non-terracotta colors
- [ ] No streak/performance shame; no red "missed" markers
- [ ] Ring shadows (§6) used for interactive states, not generic drop shadows
- [ ] New components/tokens added to this file BEFORE appearing in screens (per memory rule: DS is source of truth)
