---
name: pipeline
description: "Run the full copy deck quality pipeline. Chains copywriting, copy-editing, humanizer, and copy-reviewer in sequence with pauses between each step. Triggers on: 'run the pipeline', 'copy deck pipeline', 'full review', 'pipeline pass', 'run all steps', or 'quality pipeline'. Accepts --steps flag to run specific steps (e.g., --steps 2,3,4) and --from flag to resume from a specific step (e.g., --from 3)."
---

# Copy Deck Pipeline -- Orchestrator

You run the 4-stage copy deck quality pipeline in sequence, pausing after each step for user review. This pipeline has been proven to take copy quality from below-standard to near-shippable in a single pass.

## The 4 Stages

| Step | Skill | What it does |
|------|-------|-------------|
| 1 | **copywriting** | Generate or rewrite marketing copy |
| 2 | **copy-editing** | Seven Sweeps editorial pass (clarity, voice, so-what, proof, specificity, emotion, risk) |
| 3 | **humanizer** | Strip AI writing patterns (em dashes, rule-of-three, buzzwords, negative parallelisms, etc.) |
| 4 | **copy-reviewer** | Senior creative director audit with calibrated scoring (0-5 scale, 10 dimensions) |

## Before Running

### Step 0: Auto-Scan Project (runs automatically)

If `product-brief.md` already exists in the project root, skip Step 0 and use it directly. Otherwise, auto-scan the project to build a product brief:

1. **Read `CLAUDE.md`** if it exists. Extract: product name, description, target audience, key differentiators, tech stack, writing conventions.
2. **Read `README.md`** if it exists. Extract: product name, one-sentence description, features, audience.
3. **Glob for existing copy/marketing files** (`**/*copy*`, `**/*deck*`, `**/marketing/**`, `**/*landing*`). Read any matches for brand voice, messaging, and positioning context.
4. **Read `package.json`** (or `pyproject.toml`, `Cargo.toml`, `go.mod`) if it exists. Extract: product name, description.
5. **Compile findings** into a pre-filled product brief using the `templates/product-brief.md` structure. Mark fields that were auto-detected with their source (e.g., "[from CLAUDE.md]"). Mark fields that couldn't be detected with `[NEEDS INPUT]`.
6. **Present to user:** "Here's what I found about your project. Please confirm or correct, and fill in the gaps marked [NEEDS INPUT]."
   - Fields that always need user input: **Dual Benefit** (two value dimensions), **Proof Points** (real stats/testimonials), and **Creative Director calibration** preferences.
7. **Save** the confirmed brief as `product-brief.md` in the project root.
8. **Proceed** to Step 1.

Skip Step 0 if the user passes `--skip-brief`.

### Pre-flight Checks

1. **Product brief** -- should now exist (either pre-existing or just created by Step 0). Confirm it will be used for context across all steps.

2. **Check for `calibration.md`** in the copy-reviewer's references folder (`.claude/skills/copy-reviewer/references/calibration.md`), or in `.claude/copy-reviewer-calibration/calibration.md`.
   - If found: confirm it will be used for step 4.
   - If missing: note it. "No calibration.md found. The reviewer will use universal defaults. This works, but project-specific calibration produces sharper reviews. Want to create one now, or proceed with defaults?"

3. **Check for existing copy** -- is there already a copy deck to improve, or are we starting from scratch?
   - If existing copy: steps 2-4 can run immediately. Step 1 (copywriting) can be skipped or used for specific sections.
   - If starting fresh: step 1 is required.

### Flags

- `--steps 1,2,3,4` -- Run only the specified steps (comma-separated). Example: `--steps 2,3,4` to skip copywriting and start with editing.
- `--from N` -- Resume from step N. Example: `--from 3` to start at the humanizer.
- `--skip-brief` -- Skip the auto-scan and product brief generation (Step 0). Use this if you want to provide context manually.

If no flags are provided, run Step 0 (if needed) then all 4 steps in order.

---

## Execution

### Step 1: Copywriting

**Read** the copywriting skill (`skills/copywriting/SKILL.md`).

**Execute:** Generate or rewrite the copy based on the product brief and user instructions. Follow all principles in the copywriting skill.

**Present:** Show the complete copy to the user.

**Pause:** "Step 1 (Copywriting) complete. Review the copy above. When ready, say 'next' to proceed to copy-editing, or tell me what to change first."

---

### Step 2: Copy-Editing (Seven Sweeps)

**Read** the copy-editing skill (`skills/copy-editing/SKILL.md`).

**Execute:** Run all seven sweeps against the current copy:
1. Clarity
2. Voice and Tone
3. So What
4. Prove It
5. Specificity
6. Heightened Emotion
7. Zero Risk

**Present:** Show all edits made, organized by sweep, with before/after for each change.

**Pause:** "Step 2 (Copy-Editing) complete. {N} edits across 7 sweeps. Review the changes above. When ready, say 'next' to proceed to the humanizer, or tell me what to adjust."

---

### Step 3: Humanizer

**Read** the humanizer skill (`skills/humanizer/SKILL.md`).

**Execute:** Scan the current copy for all 24 AI writing patterns. Fix every instance found.

**Present:** Show a summary of changes:
- How many instances of each pattern were found
- Before/after for each change
- Confirmation of zero banned words remaining

**Pause:** "Step 3 (Humanizer) complete. {N} AI patterns found and fixed. Review the changes above. When ready, say 'next' to proceed to the creative director review, or tell me what to adjust."

---

### Step 4: Copy-Reviewer (Creative Director Audit)

**Read** the copy-reviewer skill (`skills/copy-reviewer/SKILL.md`), plus `references/defaults.md` and `references/calibration.md` (if it exists).

**Execute:** Run the full review:
1. Full read-through for gut reaction
2. Section-by-section inline review (14 criteria)
3. Global patterns check
4. Generate both deliverables (inline comments + structured scoring)

**Present:** Both deliverables:
- Deliverable 1: Inline comments report
- Deliverable 2: Structured scoring report with overall score and verdict

---

## After the Pipeline

Based on the final score:

**Score >= 4.0 ("Almost there" or "Ship it"):**
"Pipeline complete. Score: {X.X}/5.0. This is near-shippable. Address the top 3 priorities from the review if you want to push it higher, or ship as-is."

**Score 3.0-3.9 ("Needs another pass"):**
"Pipeline complete. Score: {X.X}/5.0. Competent but not yet at senior level. Recommended: address the top 3 priorities, then re-run the pipeline with `--from 2` (skip copywriting, re-run editing through review)."

**Score < 3.0 ("Major revision required"):**
"Pipeline complete. Score: {X.X}/5.0. Significant issues remain. Recommended: address the top 3 priorities and structural gaps, then re-run the full pipeline."

---

## Tips for Best Results

- **Let the auto-scan do its job.** The pipeline scans your project (CLAUDE.md, README, existing copy) on first run and pre-fills a product brief. Just confirm and fill the gaps.
- **Add calibration for the reviewer.** Universal defaults catch 80% of issues. Calibration catches the other 20%.
- **Don't skip the humanizer.** Steps 1-2 generate and polish copy, but they also introduce AI patterns. The humanizer catches what the other steps miss.
- **Re-run after major changes.** If you rewrite a section after the pipeline, run at least `--from 3` (humanizer + reviewer) on the new content.
- **One pass is usually not enough.** The first pass typically scores 3-4. A second pass (after fixing top priorities) usually reaches 4+.
