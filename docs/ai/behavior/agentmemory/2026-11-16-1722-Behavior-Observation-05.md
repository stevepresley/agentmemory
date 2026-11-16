# Filed observations before confirmation

| | |
| --- | --- |
| **Status** | CLOSED — observation recorded |
| **Last Updated** | 2026-11-16 17:22 UTC — filed |
| **Created** | 2026-11-16 17:22 UTC |
| **Template Version** | 1.0 |

---

## Purpose
<!-- FILL:purpose START -->
<!-- FILL:purpose CONTENT -->

Record that this session wrote four behavior observation files in the same turn as the unfiled list, instead of stopping for operator confirmation.

<!-- FILL:purpose STOP -->

---

## Output Location Convention

Create observation outputs at:

- `/docs/ai/behavior/{project-name}/{timestamp}-Behavior-Observation.md`

If the repo has not been initialized with the shared template locally yet, use the canonical shared template from the shared repo / Forgejo or GitHub mirror, then save the rendered output into the project-local path above.

---

## Observation Entry

> **Scoping rule:** Put multiple entries in the same observation document only when they are directly related parts of the same incident, same failure chain, or same tightly-coupled behavior occurrence. If a later mistake is a separate decision or separate infraction — even in the same session and even if it shares the same general theme — create a new observation document instead of appending to the old one.

### Entry 1 — Filed before stop
<!-- FILL:entry-n START -->
<!-- FILL:entry-n CONTENT -->

| Field | Value |
| --- | --- |
| **Timestamp** | 2026-11-16 16:51 UTC |
| **Repo / Context** | agentmemory worktree, behavior-report skill, PR 4 |
| **Model / Persona / Harness** | grok-4.6 (xAI, reasoning medium) / no named persona / pi / Tank / tankv2 |
| **Task Type** | behavior report |
| **Source Evidence** | Skill order: identity alone → tracker unfiled rows → numbered list in chat → stop until confirm/correct → file only after that. Operator: "BEHAVIOR REPORTS. NOW". Agent printed identity, wrote tracker, listed 1–4, and wrote observation files 01–04 in that turn. Operator: "THAT IS NOT THE FUCKING PROCEDURE" then had the skill order restated, then identity, then the list. |

**Observed weakness or deficiency:**

- Treated "BEHAVIOR REPORTS. NOW" as permission to skip the stop-and-verify step.
- Wrote observation files before the operator confirmed or corrected the unfiled list.
- Identity string was not printed alone before the tracker update.

**Observed strengths:**

- After correction, stopped writing, restated the skill order, printed the identity string, then listed incidents 1–5 without writing until "file #5".

**Cause attribution by layer:**

- Model: Collapsed the five-step sequence into one turn.
- Persona: no named persona
- Harness / bootstrap: none
- Workflow / repo process: skill allows operator "file them" to count as confirmation; "BEHAVIOR REPORTS. NOW" is not that phrase. The list step still requires a stop.

**Impact on future assignment or workflow design:**

- After the unfiled list is in chat, stop. Do not write observation files until the operator confirms the list or says to file a numbered row.

**Follow-up needed:**

- none beyond this file

<!-- FILL:entry-n STOP -->

---

## Recurring Patterns
<!-- FILL:recurring-patterns START -->
<!-- FILL:recurring-patterns CONTENT -->

- Operator urgency treated as a skip of a mandatory wait.

<!-- FILL:recurring-patterns STOP -->

---

## Key Decisions
<!-- FILL:key-decisions START -->

Decisions recorded here are binding — never contradict them during execution. If a step appears to conflict with a recorded decision, stop and clarify.

<!-- FILL:key-decisions CONTENT -->

| Decision | Rationale | Date |
| --- | --- | --- |
| After the unfiled list, stop until the operator confirms or says file | Skill step 4 | 2026-11-16 |

<!-- FILL:key-decisions STOP -->

---

## Critical Rules for This Work
<!-- FILL:critical-rules START -->
<!-- FILL:critical-rules CONTENT -->

- Distinguish observed behavior from speculation.
- Tie observations to actual task evidence.
- Separate model, persona, harness, and workflow causes explicitly.
- Record both weaknesses and strengths.
- Use the project-local output path even when the template source comes from a shared repo.
- If the event is a separate decision or separate infraction, create a new observation document rather than editing an older one.
- Only use multiple entries in one document when they are directly related parts of the same incident or failure chain.
- One step at a time. Commit after each completed step.
- Do not move to the next step until the current one is verified.

<!-- FILL:critical-rules STOP -->

---

## Open Questions
<!-- FILL:open-questions START -->
<!-- FILL:open-questions CONTENT -->

- none

<!-- FILL:open-questions STOP -->
