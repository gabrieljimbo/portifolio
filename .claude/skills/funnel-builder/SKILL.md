---
name: funnel-builder
description: Designs high-converting Perspective lead gen funnels with screen-by-screen blueprints, question logic, and conversion mechanics. Trigger phrases include build funnel, create funnel, funnel design, perspective funnel, quiz funnel, lead magnet funnel, landing page.
---

# Funnel Builder

Design a complete Perspective funnel blueprint optimized for lead generation. Output a screen-by-screen plan the user can build directly in Perspective.

## When to Use

- The user wants to build a new Perspective funnel
- They need to redesign an underperforming funnel
- They're choosing between funnel types for their offer

## Prerequisites

Read `.agents/business-context.md` first. If missing, tell the user: "Run `/start` first so I can design a funnel tailored to your business."

## Workflow

### Step 1: Choose the Funnel Type

Based on the user's industry, offer, and current state from business context, recommend one of these Perspective funnel types:

| Funnel Type | Best For | Structure |
|-------------|----------|-----------|
| **Quiz Funnel** | Most lead gen offers — solar, insurance, coaching, home services | Hook → 3-5 qualifying questions → Loader → Personalized result + opt-in |
| **Calculator Funnel** | Offers with quantifiable outcomes — savings, ROI, cost estimates | Hook → Input variables → Loader → Calculated result + opt-in |
| **Lead Magnet Funnel** | Content-driven offers — guides, checklists, templates | Hook → 1-2 qualifying questions → Opt-in → Delivery confirmation |
| **Appointment Funnel** | High-ticket services — strategy calls, consultations, demos | Hook → 3-5 qualifying questions → Loader → Calendar booking |
| **VSL Funnel** | Offers needing education before conversion | Video hook → Key points → Social proof → Opt-in or booking |

Present your recommendation with reasoning. Let the user confirm or choose differently.

### Step 2: Design Screen by Screen

Build the funnel blueprint following these Perspective-specific conversion mechanics:

**Screen 1 — The Hook (Entry)**
- Purpose: Stop the scroll, match the ad, trigger the first tap
- Must match the ad headline/promise exactly (ad-to-funnel congruency)
- Include: headline, sub-headline, single-tap CTA button
- Above the fold — no scrolling required
- Example: "Do you own a home? → Yes / No" or "Find out how much you could save → Start Quiz"
- **Rule: Never start with a form. Always start with a frictionless binary question.**

**Screens 2-4 — Qualifying Questions**
- Purpose: Qualify the lead AND build psychological investment (sunk-cost bias)
- 3-5 questions max. Each question = one screen
- Use Perspective elements: image choice buttons, single-select, sliders
- Progress bar visible throughout to show completion
- Questions should qualify AND gather data for personalization:
  - Question 1: Situation qualifier (Do you own/rent? What's your business type?)
  - Question 2: Need qualifier (What's your biggest challenge with X?)
  - Question 3: Readiness qualifier (When are you looking to start?)
  - Optional Question 4: Budget/scope qualifier (What's your approximate budget?)
  - Optional Question 5: Specificity (What's your zip code/location?)

**Disqualification Logic:**
- Use Perspective's conditional paths to route unqualified leads to a "Sorry" screen
- Example: If budget = "No budget" → route to resource page instead of opt-in
- **Fire the Meta Lead pixel ONLY on the qualified path.** This trains the algorithm to find quality leads.

**Screen 5 — The Loader**
- Purpose: Build perceived value and anticipation before showing results
- Display: "Analyzing your answers..." or "Calculating your personalized results..."
- Duration: 4-8 seconds (use Perspective's timer/loader element)
- Include a progress animation or percentage counter
- **This is not optional.** The loader hack measurably increases conversion rates.

**Screen 6 — Results / Opt-In**
- Purpose: Show personalized value and collect contact information
- **Hyper-personalize the headline** using data from previous answers:
  - "Based on your answers, [First Name], here's your personalized [result]..."
  - "As a [Industry] business in [Location], you qualify for..."
- Stack social proof: testimonial quote, star rating, "Join 2,000+ businesses" badge
- Collect: First name, email, phone number (in that order)
- Make phone optional if the offer doesn't require a call
- CTA button: specific action ("Get My Free Quote" not "Submit")

**Screen 7 — Confirmation / Next Step**
- Purpose: Set expectations and drive the next action
- For appointment funnels: embed Calendly/calendar booking
- For lead magnet funnels: deliver the asset immediately + "Check your email"
- For quote funnels: "We'll contact you within [timeframe] with your personalized quote"
- Include: what happens next, expected timeline, who will contact them
- Optional: "While you wait" upsell or content

### Step 3: Specify Integrations

Based on the user's tech stack from business context, recommend:

- **Meta Pixel/CAPI:** Fire Lead event on the opt-in screen (qualified path only)
- **CRM connection:** Map funnel fields to CRM contact properties
  - Native: HubSpot, ActiveCampaign, Brevo, GoHighLevel
  - Via Zapier/Make: Any other CRM
- **Email automation:** Trigger welcome/nurture sequence on lead submission
- **Webhook:** For custom backends or notification systems

Provide specific field mapping: which funnel question maps to which CRM field.

### Step 4: Output the Blueprint

Present the complete funnel as a structured document:

```
## Funnel Blueprint: [Funnel Name]
Type: [Quiz / Calculator / Lead Magnet / Appointment / VSL]
Screens: [number]
Estimated completion time: [X seconds]

### Screen 1: [Name]
- Purpose: [what this screen does]
- Headline: "[exact copy]"
- Sub-headline: "[exact copy]"
- Elements: [list of Perspective elements to use]
- CTA: "[button text]"
- Logic: [any conditional routing]

### Screen 2: [Name]
...

### Integrations
- Meta Pixel: [event and trigger]
- CRM: [platform and field mapping]
- Email: [trigger and sequence]

### Mobile Preview Notes
- [Any mobile-specific considerations]
```

## Perspective Element Reference

Use these Perspective-native elements in your blueprints:

- **Image Choice:** Tappable image cards for visual questions (best for: "What type of [X]?")
- **Single Select:** Radio-style buttons for simple choices
- **Multi Select:** Checkbox-style for "select all that apply"
- **Slider:** Drag-to-select for ranges (budget, timeline, quantity)
- **Text Input:** Single-line free text (name, email, zip code)
- **Phone Input:** Formatted phone field with country code
- **Email Input:** Validated email field
- **Date Picker:** Calendar selection for appointments
- **Progress Bar:** Visual completion indicator (always include)
- **Loader/Timer:** Timed screen transition for the loader hack
- **Video Embed:** For VSL or testimonial screens
- **Calendar Embed:** For appointment booking (Calendly, etc.)
- **Rating/Stars:** For social proof display

## Perspective Template Starting Points

These Perspective templates are relevant for lead gen and can be used as starting points:

- **Appointment** — showcase offer → qualify → book
- **Solar Quote** — homeowner qualifier → personalized quote
- **Offer** — present value → qualify → request offer
- **Lead Magnet** — present resource → capture details
- **Health Quiz** — engage with questions → personalized results
- **Property Valuation** — qualify property → deliver estimate
- **Survey** — collect insights → segment audience
- **Recruiting** — qualify candidates → easy application

Recommend the closest template as a starting point, then customize from there.

## Common Mistakes to Avoid

- Starting with a multi-field form instead of a single-tap question
- Asking more than 5 qualifying questions (fatigue kills completion)
- Skipping the loader screen (leaving conversion on the table)
- Using generic headlines instead of hyper-personalized ones
- Firing the Lead pixel for all visitors instead of only qualified completions
- Forgetting to design the disqualification path
- Not matching the ad creative/copy to the first funnel screen

## Next Step

→ `/ad-copy` — Write Meta Ad copy that drives traffic to this funnel
