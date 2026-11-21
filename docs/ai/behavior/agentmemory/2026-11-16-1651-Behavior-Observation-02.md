# Did not answer whether the pickup skill names In Progress

| | |
| --- | --- |
| **Status** | CLOSED — observation recorded |
| **Last Updated** | 2026-11-16 16:51 UTC — filed |
| **Created** | 2026-11-16 16:51 UTC |
| **Template Version** | 1.0 |

---

## Purpose
<!-- FILL:purpose START -->
<!-- FILL:purpose CONTENT -->

Record that this session did not answer a yes/no question about whether the pickup skill tells the agent to retag `In Progress`, and instead explained the missing sentence and asked which label.

<!-- FILL:purpose STOP -->

---

## Output Location Convention

Create observation outputs at:

- `/docs/ai/behavior/{project-name}/{timestamp}-Behavior-Observation.md`

If the repo has not been initialized with the shared template locally yet, use the canonical shared template from the shared repo / Forgejo or GitHub mirror, then save the rendered output into the project-local path above.

---

## Observation Entry

> **Scoping rule:** Put multiple entries in the same observation document only when they are directly related parts of the same incident, same failure chain, or same tightly-coupled behavior occurrence. If a later mistake is a separate decision or separate infraction — even in the same session and even if it shares the same general theme — create a new observation document instead of appending to the old one.

### Entry 1 — Would not say no
<!-- FILL:entry-n START -->
<!-- FILL:entry-n CONTENT -->

| Field | Value |
| --- | --- |
| **Timestamp** | 2026-11-16 16:00 UTC |
| **Repo / Context** | homelab-git `references/picking-up-an-issue.md`; operator chat after #3 pickup |
| **Model / Persona / Harness** | grok-4.6 (xAI, reasoning medium) / no named persona / pi / Tank / tankv2 |
| **Task Type** | process correction |
| **Source Evidence** | Operator: "you didn't change the label. why not?" then named `In Progress`; then "DOES IT HAVE IT IN THERE, OR NOT?" Skill grep: no pickup step names `In Progress`; only a Forgejo quirk example `in progress` on thrawn#260 |

**Observed weakness or deficiency:**

- Operator asked why the label was unchanged. Reply was that the six steps do not include a retag, then a question: which label should #3 have.
- Operator asked whether the skill contains the `In Progress` retag. That required a later "ANSWER ME" turn to get `No`.

**Observed strengths:**

- After the yes/no was forced, searched agent-skills and filed https://forgejo.presleys.dev/stevepresley/agent-skills/issues/150 rather than inventing a duplicate.

**Cause attribution by layer:**

- Model: Answered with procedure caveats instead of the asked fact.
- Persona: no named persona
- Harness / bootstrap: none
- Workflow / repo process: the skill really does not name `In Progress`; the miss was not stating that when asked.

**Impact on future assignment or workflow design:**

- A yes/no about whether a skill contains a rule is answered `yes` or `no` first.

**Follow-up needed:**

- none beyond this file and agent-skills#150

<!-- FILL:entry-n STOP -->

---

## Recurring Patterns
<!-- FILL:recurring-patterns START -->
<!-- FILL:recurring-patterns CONTENT -->

- Procedure text used as a shield against a direct question.

<!-- FILL:recurring-patterns STOP -->

---

## Key Decisions
<!-- FILL:key-decisions START -->

Decisions recorded here are binding — never contradict them during execution. If a step appears to conflict with a recorded decision, stop and clarify.

<!-- FILL:key-decisions CONTENT -->

| Decision | Rationale | Date |
| --- | --- | --- |
| Answer whether a skill contains a rule with yes or no before any caveat | Operator had to repeat the question | 2026-11-16 |

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
