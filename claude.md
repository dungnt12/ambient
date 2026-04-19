# Project: Ambient — AI-Powered Private Group Journal

## Vision

Ambient is a private journaling app for small, trusted groups (friends, family).
Each person writes for themselves daily. AI reads the collective context and creates
ambient awareness — the group "feels" connected without anyone having to perform for each other.

Unlike chat apps (reactive, performative), Ambient is passive and honest.
Unlike solo journaling apps, it creates real connection.

---

## Target Users

- Primary: Close friend groups (3–8 people), couples, small families
- Pain point: People who care about each other but lose track of each other's lives
  due to busy schedules and the friction of maintaining group chats

---

## Core Concept

> "You write for yourself. AI connects you to the people you care about."

Three layers:
1. **Personal journal** — private, daily, low friction
2. **Group pulse** — AI-generated ambient signal of the group's collective mood
3. **Smart coordination** — AI suggests meetups, flags when someone needs support

---

## Key Differentiators vs Competitors

| Feature | Waffle | Day One | Ambient |
|---|---|---|---|
| Shared journal | ✅ | ✅ | ✅ |
| AI prompts | ✅ (weak) | ❌ | ✅ |
| AI understands group context | ❌ | ❌ | ✅ |
| AI scheduling suggestions | ❌ | ❌ | ✅ |
| Ambient awareness | ❌ | ❌ | ✅ |
| Privacy-first (no raw sharing) | ❌ | ✅ | ✅ |

---

## User Experience Flow

### Daily (2 minutes)
1. Morning: AI asks a context-aware question based on yesterday's entry
2. User writes a few sentences — no pressure, no streaks
3. AI summarizes entry into an emotional signal (never exposes raw content to group)
4. Group pulse updates silently in background

### Passive (throughout day)
- No interruptions unless AI detects something actionable:
  - Someone in the group has been low for 3+ days
  - Everyone is free the same weekend
  - A birthday or milestone is coming up

### Weekly
- AI generates a "week in review" for the group
- Suggests one activity or meetup based on group mood
- Each member sees their personal growth over time (visual hook)

---

## Privacy Model

**Critical principle:** AI never exposes raw journal content to other group members.

```
User writes entry (private)
    ↓
AI generates emotional summary (2 sentences, anonymized signal)
    ↓
Summary added to Group Context (shared AI memory)
    ↓
AI uses Group Context to generate insights and suggestions
    ↓
Users only see: Group Pulse + AI Suggestions (never raw entries)
```

Users can optionally choose to share specific entries with the group manually.

---

## Tech Stack

### Frontend
- **React Native** (with Expo)
- **NativeWind** — Tailwind CSS for React Native
- **Tamagui** — component system
- **Expo Notifications** — push notifications
- **Expo SecureStore** — secure token storage

### Backend
- **Encore.js** (TypeScript) — services, cron jobs, pub/sub, secrets management
- **Supabase** — PostgreSQL database + auth + realtime
- **Anthropic API** — Claude Haiku (cheap tasks) + Claude Sonnet (complex reasoning)

### Infrastructure
- Encore handles deployment and infrastructure-as-code
- Supabase handles auth, database, and realtime subscriptions

---

## Data Models

```typescript
interface User {
  id: string
  name: string
  email: string
  timezone: string
  createdAt: Date
}

interface Group {
  id: string
  name: string
  members: string[]       // user IDs
  createdBy: string
  createdAt: Date
}

interface JournalEntry {
  id: string
  userId: string
  groupId: string
  content: string         // PRIVATE — never shared
  aiSummary: string       // AI-generated signal, used in group context
  mood?: number           // 1–5 optional
  createdAt: Date
}

interface GroupContext {
  groupId: string
  memberSummaries: {
    userId: string
    recentSummary: string   // rolling 7-day AI summary
    lastUpdated: Date
  }[]
  lastAnalyzedAt: Date
}

interface GroupInsight {
  groupId: string
  type: "meetup_suggestion" | "support_alert" | "weekly_digest"
  content: string
  suggestedDate?: Date
  createdAt: Date
}
```

---

## Backend Services (Encore.js)

### 1. Auth Service
- Wrap Supabase auth
- Handle invite links for group joining

### 2. Journal Service
```
POST /journal/entry        — create new entry
GET  /journal/entries      — get own entries (paginated)
GET  /journal/streak       — get current streak + visual data
```

### 3. Group Service
```
POST /group/create         — create group
POST /group/invite         — generate invite link
POST /group/join           — join via invite
GET  /group/pulse          — get current group ambient signal
GET  /group/insights       — get AI suggestions for group
```

### 4. AI Service (core)
```typescript
// Runs after every new journal entry
async function summarizeEntry(entry: JournalEntry): Promise<string>

// Cron: runs daily at 8PM per user timezone
async function generateDailyPrompt(userId: string): Promise<string>

// Cron: runs daily at 9PM, analyzes each group
async function analyzeGroupContext(groupId: string): Promise<GroupInsight | null>

// Cron: runs every Sunday 9AM
async function generateWeeklyDigest(groupId: string): Promise<GroupInsight>
```

### 5. Notification Service
- Triggered by AI Service when insight requires user action
- Daily reminder at user-configured time (default: 9PM)

---

## AI Prompts

### Summarize Entry (Claude Haiku)
```
Summarize this journal entry into an emotion-aware signal.
Rules:
- Maximum 2 sentences
- Keep emotional context (stress, happiness, excitement, fatigue)
- Remove all personal details, names, locations
- Write in third person: "This person is feeling..."
- Do not add interpretation beyond what is written

Entry: {content}
```

### Generate Daily Prompt (Claude Haiku)
```
Generate one journaling prompt for this person.
Rules:
- Be specific to their recent context, not generic
- One question only
- Conversational tone, not therapist tone
- If yesterday was difficult, acknowledge it gently

Recent summary: {last_entry_summary}
Day of week: {day}
```

### Analyze Group Context (Claude Sonnet)
```
You are analyzing a small group of close friends/family.
Based on each member's recent emotional summaries, determine:

1. MEETUP: Is there a good opportunity for the group to gather?
   - Only suggest if multiple members seem to have free energy
   - Suggest a specific type of activity matching group mood

2. SUPPORT: Is anyone showing concerning patterns?
   - Only flag if 3+ consecutive days of low/stressed signals
   - Be conservative — false positives erode trust

3. ACTION: Return null if nothing meaningful to surface.
   - It's better to stay silent than to send meaningless notifications

Member summaries (last 7 days):
{memberSummaries}

Respond in JSON:
{
  "action": "meetup" | "support" | null,
  "message": string,
  "urgency": "low" | "medium" | "high",
  "suggestedDate": ISO string | null
}
```

---

## Screens (Build Order)

### Phase 1 — Solo value (Week 1–2)
1. **Onboarding** — name, timezone, notification time
2. **Daily Entry** — text input, optional mood (1–5), AI prompt at top
3. **Home / Garden** — visual progress of streak (365-day grid or garden)
4. **Entry History** — personal timeline

### Phase 2 — Group layer (Week 3–4)
5. **Create / Join Group** — invite link flow
6. **Group Pulse** — ambient signal card per member (no raw content)
7. **Group Insights** — AI suggestions, meetup proposals

### Phase 3 — Intelligence (Week 5–6)
8. **Notification Center** — AI-triggered alerts
9. **Weekly Digest** — Sunday summary card
10. **Schedule Suggestion** — AI propose → user confirm → calendar export

---

## Visual Identity Guidelines

- **Feel**: Calm, warm, intimate — not productivity, not social media
- **Color palette**: Earthy tones (sage green, warm beige, soft terracotta)
- **Typography**: Rounded, humanist sans-serif (e.g., DM Sans, Nunito)
- **Visual hook**: 365-day grid that fills in with color/illustration as entries are made
  - Each day gets a small illustrated element (plant, weather, shape)
  - After 30 days: visible progress pattern
  - After 365 days: a complete "year in color"
- **No streaks with punishment** — missing a day doesn't break the visual, just leaves a gap

### Design execution (MANDATORY)

Follow the full 2-layer system in **`@design.md`**:
- **Layer 1 (§1–§9, IMMUTABLE):** Claude/Anthropic foundation — warm parchment canvas, Anthropic Serif/Sans, Terracotta Brand `#c96442`, warm-toned neutrals, ring shadows, editorial pacing.
- **Layer 2 (§10, Atoms-inspired):** mobile execution rhythm — 60px full-width CTAs, bottom sheet as default container (replaces centered modals), 24px screen padding, 32px section gap, 24px card radius, serif headings + sans body at mobile scale.
- **Never copy Atoms' orange, red "NEW" badges, streak shame, or aggressive paywall copy** — those violate Layer 1.

When using **Figma MCP** (`get_design_context` etc.): treat Figma output as layout reference only. Always remap colors to tokens in `@design.md §2/§10.7`, remap fonts to Anthropic Serif/Sans, scale buttons to 60px, rewrite centered modals as bottom sheets, replace SVG icons with Lucide. See `@design.md §11` for full remap rules.

When using **Refero MCP** (including Atoms app_id 99 inspiration): extract shape, drop personality. Copy rhythm; never copy accents or dark patterns.

Run the pre-ship checklist in `@design.md §12` before marking any screen complete.

---

## Monetization

**Free tier:**
- Solo journaling (unlimited entries)
- 1 group (up to 8 members)
- Basic AI prompts

**Pro — $4.99/month or $39.99/year:**
- Up to 5 groups, max 8 members each
- Full AI analysis and scheduling
- Weekly digests
- Export journal as PDF
- Custom notification schedules

**Why the caps are hard limits, not upsell gates:**
- Ambient awareness breaks down past 8 people per circle — "close friends/family" stops being the right shape.
- More than 5 circles turns passive awareness into a to-do list of relationships. Most real users have 2–3 circles (friends / family / partner).
- AI signal quality: Group Context prompts grow linearly with members; precision of meetup/support inference drops as circles multiply.
- Notification budget: max 1 AI notification/user/day. Unlimited circles → meaningful insights get crowded out → AI feels useless.
- Constants in `mobile/src/mocks/group.ts`: `MAX_GROUP_MEMBERS = 8`, `MAX_GROUPS_FREE = 1`, `MAX_GROUPS_PRO = 5`.

**Unit economics at 1,000 active Pro users:**
- Revenue: ~$4,000/month
- AI costs (Claude API): ~$40/month
- Gross margin: ~99% before infrastructure
- Infrastructure (Supabase + Encore): ~$50/month
- Net margin: ~97% at this scale

---

## MVP Scope (6–7 weeks)

### Must have
- [ ] Auth (email or Apple Sign-In)
- [ ] Daily journal entry with AI prompt
- [ ] Entry history (personal)
- [ ] 365-day visual grid
- [ ] Create and join group via invite link
- [ ] Group pulse (AI ambient signal)
- [ ] Daily reminder notification
- [ ] AI summarization pipeline

### Nice to have (post-MVP)
- [ ] Mood tracking
- [ ] Weekly digest
- [ ] Meetup scheduling suggestion
- [ ] Export to PDF
- [ ] Apple Watch quick entry

### Out of scope (v1)
- [ ] Voice entry
- [ ] Photo journal
- [ ] Public profiles
- [ ] Web version

---

## Key Risks

1. **Privacy perception** — Users may not trust AI reading their journal even with summaries.
   Mitigation: Radical transparency about what AI reads vs what group sees. On-device option later.

2. **Group onboarding friction** — App has no value alone if social layer is the pitch.
   Mitigation: Solo journaling must be genuinely valuable before inviting anyone.

3. **AI cost scaling** — Group analysis runs per-group per-day.
   Mitigation: Only analyze groups with 2+ entries in last 24h. Batch analysis.

4. **Notification fatigue** — AI sending too many suggestions kills retention.
   Mitigation: Max 1 AI-triggered notification per day per user. Strict relevance threshold.

---

## Development Notes for Claude

- Backend: Encore.js with TypeScript strict mode
- Use Encore's `secret()` for all API keys — never hardcode
- Use Encore's built-in `CronJob` for all scheduled tasks
- All AI calls go through a single `ai.service.ts` — never call Anthropic SDK directly from other services
- Journal content is NEVER logged, never stored in plaintext in logs
- All group context operations must go through `groupContext.service.ts` to enforce privacy rules
- Test AI prompts independently before integrating — prompt quality is more important than model choice
