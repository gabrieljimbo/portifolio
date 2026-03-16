---
name: ad-copy
description: Writes high-converting Meta Ad copy for lead gen campaigns driving traffic to Perspective funnels. Generates multiple angles, hooks, primary text, headlines, and descriptions with character counts. Trigger phrases include ad copy, write ads, facebook ads, meta ads, ad text, headlines, hooks, ad angles.
---

# Ad Copy

Write platform-ready Meta Ad copy that drives qualified clicks to a Perspective funnel. Output organized by angle with character counts, ready for upload.

## When to Use

- The user needs ad copy for a new campaign
- They want fresh angles or variations for existing ads
- Creative fatigue is setting in and they need a copy refresh
- They've built a funnel with `/funnel-builder` and need ads to drive traffic

## Prerequisites

1. Read `.agents/business-context.md`. If missing, tell the user: "Run `/start` first so I can write ads tailored to your business."
2. Ask: "Do you have a Perspective funnel already? What's the first screen headline?" — this is critical for ad-to-funnel congruency.

## Workflow

### Step 1: Develop Angles

An "angle" is a distinct emotional or logical entry point into the offer. Every campaign needs 3-5 angles to test. Develop angles from the business context:

| Angle Type | Derives From | Example (Solar) |
|-----------|-------------|-----------------|
| **Pain Point** | Audience pain points | "Tired of energy bills eating your paycheck?" |
| **Outcome** | Core offer + customer value | "Homeowners are saving $2,400/year with solar" |
| **Social Proof** | Proof assets | "Join 12,000+ families who switched to solar" |
| **Curiosity/Quiz** | Funnel type | "Take the 30-second quiz to see if your home qualifies" |
| **Urgency/Scarcity** | Time-sensitive offers | "2024 solar tax credit expires — check eligibility now" |

Present all angles to the user. Let them pick 3 to develop into full copy, or accept your recommendation.

### Step 2: Write Copy for Each Angle

For each selected angle, produce a complete Meta Ad copy set:

**Primary Text (3 variations per angle)**

Write in the audience's actual language (from business context "Their Language" field). Three lengths:

- **Short** (40-80 characters): Punchy, curiosity-driven. For Reels/Stories placements.
- **Medium** (80-200 characters): Hook + one benefit + CTA. The workhorse.
- **Long** (200-500 characters): Hook + story/proof + benefit + CTA. For Feed placements.

Structure every primary text as:
1. **Hook** (first line — this is all they see before "See more"): Pattern interrupt, question, or bold claim
2. **Body**: One benefit, one proof point, or one story beat
3. **CTA**: Direct action that matches the funnel ("Take the free quiz", "Get your quote in 30 seconds")

**Headlines (5 per angle)**
- Max 40 characters (Meta truncates beyond this)
- Must match or closely echo the first screen of the Perspective funnel
- Action-oriented: start with a verb or question
- Include the offer: "Free Quote", "Free Consultation", "30-Second Quiz"

**Descriptions (2 per angle)**
- Max 30 characters
- Reinforce urgency or social proof
- Examples: "Takes 30 seconds", "No obligation", "2,847 homeowners chose us"

### Step 3: Write Hooks

The hook (first line of primary text) determines whether someone reads or scrolls. Write 5 standalone hooks per angle using these formulas:

| Hook Type | Formula | Example |
|-----------|---------|---------|
| **Question** | Ask about their pain/desire | "Still paying over $200/month for electricity?" |
| **Bold Claim** | State a specific, provable result | "We helped 340 homeowners cut energy bills by 60%" |
| **Curiosity Gap** | Create an information gap | "There's a reason your neighbor just installed solar panels" |
| **Call-Out** | Name the exact audience | "Homeowners in [City] — this is for you" |
| **If/Then** | Conditional relevance | "If your energy bill is over $150/month, read this" |

### Step 4: Enforce Ad-to-Funnel Congruency

This is non-negotiable. For every ad variation, verify:

- [ ] The ad's main promise matches the funnel's first screen headline
- [ ] The CTA language matches (if ad says "Take the quiz", funnel says "quiz")
- [ ] The tone/voice is consistent between ad and funnel
- [ ] If the ad mentions a specific number/stat, the funnel reinforces it

If the user has shared their funnel's first screen, call out any mismatches. If they haven't, ask for it.

### Step 5: Output the Copy Bank

Format as a structured document the user can work from:

```
## Ad Copy Bank: [Company Name]
Date: [date]
Funnel: [funnel name/URL]

---

### Angle 1: [Angle Name]
**Theme:** [one-sentence description]

#### Primary Text

**Short (XX chars)**
[copy]

**Medium (XXX chars)**
[copy]

**Long (XXX chars)**
[copy]

#### Headlines
1. [headline] (XX chars)
2. [headline] (XX chars)
3. [headline] (XX chars)
4. [headline] (XX chars)
5. [headline] (XX chars)

#### Descriptions
1. [description] (XX chars)
2. [description] (XX chars)

#### Hooks
1. [hook] (XX chars)
2. [hook] (XX chars)
3. [hook] (XX chars)
4. [hook] (XX chars)
5. [hook] (XX chars)

---

### Angle 2: [Angle Name]
...
```

Include character counts on every line — Meta has strict limits and the user needs to verify at a glance.

## Copy Rules

These rules are non-negotiable for performance lead gen copy:

1. **Write in their language, not yours.** Use the exact phrases from the "Their Language" field in business context. Marketing speak kills CTR.
2. **One message per ad.** Don't stack three benefits into one primary text. Each ad = one angle, one hook, one CTA.
3. **Specific beats vague.** "$2,400/year" beats "save money." "340 homeowners" beats "many customers." "30 seconds" beats "quick."
4. **The hook does 80% of the work.** If the first line doesn't stop the scroll, nothing else matters.
5. **CTA must match the funnel action.** If the funnel is a quiz, say "Take the quiz." If it's a calculator, say "Calculate your savings." Never use generic "Learn more."
6. **No clickbait.** The ad must deliver on its promise. Misleading hooks get clicks but tank lead quality and waste budget.
7. **Assume mobile.** Short sentences. Line breaks between ideas. Front-load the hook before the "See more" truncation.

## Meta Ad Specs Quick Reference

| Element | Character Limit | Notes |
|---------|----------------|-------|
| Primary Text | 125 before "See more" | First line is everything |
| Headline | 40 recommended | Truncates on mobile beyond 40 |
| Description | 30 recommended | Often hidden on mobile |
| URL display | 40 | Auto-generated from URL |

## Next Step

→ `/account-structure` — Set up your Meta ad account to run these ads
