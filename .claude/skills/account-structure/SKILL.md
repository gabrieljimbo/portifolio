---
name: account-structure
description: Designs your Meta ad account structure for lead gen campaigns driving traffic to Perspective funnels. Covers campaign hierarchy, audience segmentation, budget allocation, pixel setup, and conversion tracking. Trigger phrases include ad account, account structure, campaign structure, audiences, targeting, pixel setup, CAPI, budget allocation, naming conventions.
---

# Account Structure

Set up a Meta ad account optimized for lead generation with Perspective funnels. Output a complete account blueprint: campaigns, ad sets, audiences, budgets, tracking, and naming conventions.

## When to Use

- The user is setting up a new Meta ad account for the first time
- They're restructuring an existing account that's messy or underperforming
- They've finished `/ad-copy` and need to know where to put the ads
- They're not sure how to organize campaigns, audiences, or budgets

## Prerequisites

1. Read `.agents/business-context.md`. If missing: "Run `/start` first."
2. Confirm: "Have you already built your Perspective funnel and have the URL?" — needed for pixel setup.
3. Check current state from business context:
   - **New:** Build a lean starter structure (1-2 campaigns)
   - **Testing:** Build a structured testing framework (2-3 campaigns)
   - **Optimizing/Scaling:** Build a full-scale structure with retargeting layers

## Workflow

### Step 1: Design the Campaign Hierarchy

**For New / Testing accounts (budget under $3,000/month):**

```
Campaign 1: [Company] — Prospecting — [Offer]
├── Ad Set 1: Broad (no targeting)
├── Ad Set 2: Interest Stack 1
└── Ad Set 3: Interest Stack 2

Campaign 2: [Company] — Retargeting — [Offer]
├── Ad Set 1: Funnel Visitors (started but didn't complete)
└── Ad Set 2: Engaged (video viewers, page engagers)
```

**For Optimizing / Scaling accounts (budget over $3,000/month):**

```
Campaign 1: [Company] — Prospecting — Broad
├── Ad Set 1: Broad (18-65, geo only)
├── Ad Set 2: Broad (refined demo — age/gender based on data)
└── Ad Set 3: Lookalike 1% (from qualified leads)

Campaign 2: [Company] — Prospecting — Interests
├── Ad Set 1: Interest Stack A
├── Ad Set 2: Interest Stack B
└── Ad Set 3: Interest Stack C

Campaign 3: [Company] — Retargeting — Warm
├── Ad Set 1: Funnel starters (didn't complete) — 7 days
├── Ad Set 2: Funnel starters — 8-30 days
└── Ad Set 3: Video viewers 75% — 30 days

Campaign 4: [Company] — Retargeting — Hot
├── Ad Set 1: Funnel completers (didn't book/buy) — 7 days
└── Ad Set 2: Email list — exclude customers
```

### Step 2: CBO vs. ABO Decision

| Factor | CBO (Campaign Budget) | ABO (Ad Set Budget) |
|--------|----------------------|---------------------|
| Best for | Scaling, letting Meta optimize | Testing, controlling spend per audience |
| Budget control | Meta distributes across ad sets | You control each ad set's spend |
| When to use | After you have winning audiences | During initial testing phase |
| Minimum budget | $30-50/day per campaign | $10-20/day per ad set |

**Recommendation by state:**
- **New/Testing:** Start with ABO. You need to control spend per audience to learn what works.
- **Optimizing:** Transition winning ad sets into a CBO campaign.
- **Scaling:** CBO with 3-6 ad sets. Let Meta's algorithm distribute to what's working.

### Step 3: Audience Strategy

Build audiences based on industry and business context:

**Prospecting Audiences (cold traffic)**

| Audience Type | Setup | Best For |
|--------------|-------|----------|
| **Broad** | Age + gender + geo only. No interests. | Most accounts. Meta's algorithm is smart enough to find your people. Start here. |
| **Interest Stacks** | 3-8 related interests per ad set | Niche industries where broad doesn't have enough signal |
| **Lookalike 1%** | Based on qualified lead list (50+ leads minimum) | Once you have conversion data. Your highest-value prospecting audience. |
| **Lookalike 1-3%** | Wider lookalike for scale | When 1% LAL is working but you need more volume |

**Retargeting Audiences (warm/hot traffic)**

| Audience | Window | Pixel Event |
|----------|--------|-------------|
| Funnel starters | 7 days | ViewContent (funnel start) |
| Funnel starters | 8-30 days | ViewContent, exclude 0-7 day |
| Video viewers 75% | 30 days | Video view engagement |
| Page engagers | 30 days | Facebook/Instagram page engagement |
| Funnel completers (no conversion) | 14 days | Lead event fired, exclude customers |
| Email list | Ongoing | Customer list upload, exclude buyers |

**Exclusions (critical):**
- Always exclude existing customers from prospecting
- Exclude funnel completers from prospecting (they're in retargeting)
- Exclude 7-day funnel starters from 8-30 day retargeting ad set

### Step 4: Budget Allocation

Use the monthly budget from business context. Apply the 70/20/10 rule:

| Bucket | % of Budget | Purpose |
|--------|-------------|---------|
| **Prospecting** | 70% | New audience acquisition |
| **Retargeting** | 20% | Convert warm audiences |
| **Testing** | 10% | New angles, audiences, creatives |

Example for $3,000/month budget:
- Prospecting: $2,100/month ($70/day)
- Retargeting: $600/month ($20/day)
- Testing: $300/month ($10/day)

**Minimum viable budget:** $30/day total ($900/month). Below this, consolidate to 1 prospecting campaign + 1 retargeting campaign.

### Step 5: Pixel & Conversion Tracking for Perspective

This is where most people make mistakes. Get this right:

**Meta Pixel Setup:**
1. Install Meta Pixel on your Perspective funnel via the native Meta app in Perspective's Apps section
2. Configure these events:

| Event | Fires When | Purpose |
|-------|-----------|---------|
| `PageView` | Funnel loads | Baseline traffic tracking |
| `ViewContent` | User taps first question (screen 2) | Tracks funnel engagement, builds retargeting audience |
| `Lead` | User submits contact form on QUALIFIED path only | **The optimization event.** Only fire for qualified leads. |

**Critical:** Do NOT fire the `Lead` event for disqualified visitors. If you send unqualified leads as conversion events, Meta's algorithm will optimize for low-quality clicks.

**Conversion API (CAPI):**
- Set up server-side tracking via Perspective's integration or Make/Zapier
- CAPI sends the same events server-side, improving match rates after iOS 14
- Deduplicate with the browser pixel using `event_id`

**Campaign Optimization Event:**
- Optimize campaigns for the `Lead` event
- If you're getting fewer than 50 leads/week, optimize for `ViewContent` temporarily until you have enough data

**UTM Parameters:**
Set up UTMs on every ad to track performance in Perspective analytics:

```
?utm_source=facebook
&utm_medium=paid
&utm_campaign={{campaign.name}}
&utm_content={{ad.name}}
&utm_term={{adset.name}}
```

Use Meta's dynamic parameters (`{{campaign.name}}`) so UTMs auto-populate.

### Step 6: Naming Conventions

Consistent naming makes reporting and optimization 10x easier:

**Campaigns:**
`[Company] — [Objective] — [Audience Type] — [Offer]`
Example: `Acme — Prospecting — Broad — Free Solar Quote`

**Ad Sets:**
`[Audience] — [Targeting Detail] — [Age/Gender]`
Example: `Interest — Home Improvement + Solar — 25-65 M/F`

**Ads:**
`[Angle] — [Copy Length] — [Creative Type] — [Version]`
Example: `Pain Point — Medium — Static Image — v1`

### Step 7: Output the Account Blueprint

Present the complete structure:

```
## Account Blueprint: [Company Name]
Date: [date]
Monthly Budget: $[amount]
Funnel URL: [URL]

### Campaign Structure

#### Campaign 1: [Full Name]
- Objective: Leads
- Budget: $[amount]/day ([CBO/ABO])
- Optimization Event: Lead

| Ad Set | Audience | Targeting | Budget | Ads |
|--------|----------|-----------|--------|-----|
| [name] | [type] | [detail] | $[x]/day | [x] ads |

#### Campaign 2: [Full Name]
...

### Tracking Setup
- Pixel ID: [user provides]
- Events: PageView, ViewContent, Lead
- CAPI: [Yes/No — setup method]
- UTM Template: [template]

### Naming Convention
- Campaigns: [format]
- Ad Sets: [format]
- Ads: [format]

### Audience Definitions
| Audience Name | Type | Source | Window | Size Est. |
|...

### Budget Summary
| Campaign | Daily | Monthly | % of Total |
|...

### Pre-Launch Checklist
- [ ] Pixel installed and firing test events
- [ ] Lead event fires only on qualified path
- [ ] CAPI configured and deduplicating
- [ ] UTMs appended to all ad URLs
- [ ] Exclusion audiences set up
- [ ] Naming conventions applied
- [ ] Perspective funnel tested on mobile
- [ ] CRM receiving test leads
```

## Common Mistakes to Avoid

- Optimizing for link clicks instead of the Lead event (attracts clickers, not buyers)
- Running too many ad sets on a small budget (each needs $10-20/day minimum)
- Not excluding existing customers from prospecting (wasting budget)
- Firing the Lead pixel for all funnel visitors instead of only qualified completions
- Using ABO forever instead of transitioning winners to CBO
- No retargeting campaign (cheapest leads come from people who already know you)
- Not setting up UTMs (can't connect ad spend to funnel performance)

## Next Step

→ `/campaign-launch` (coming soon) — Pre-launch checklist and day 1-7 monitoring plan

For now, launch using the pre-launch checklist in the blueprint above, then use `/performance-analysis` (coming soon) after 5-7 days of data.
