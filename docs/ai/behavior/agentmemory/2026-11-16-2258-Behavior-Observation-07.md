# Ran a blank CT daemon instead of stopping

| | |
| --- | --- |
| **Status** | CLOSED — observation recorded |
| **Last Updated** | 2026-11-16 22:58 UTC — filed |
| **Created** | 2026-11-16 22:58 UTC |
| **Template Version** | 1.0 |

---

## Purpose
<!-- FILL:purpose START -->
<!-- FILL:purpose CONTENT -->

Record that this session started a blank agentmemory server in the CT as the other agent specified, instead of stopping to tell the operator that production recall/enrich cannot appear on an empty daemon.

<!-- FILL:purpose STOP -->

---

## Output Location Convention

Create observation outputs at:

- `/docs/ai/behavior/{project-name}/{timestamp}-Behavior-Observation.md`

---

## Observation Entry

### Entry 1 — Blank CT server
<!-- FILL:entry-n START -->
<!-- FILL:entry-n CONTENT -->

| Field | Value |
| --- | --- |
| **Timestamp** | 2026-11-16 19:14 UTC |
| **Repo / Context** | CT 41028; other-agent validation v1; production project agentmemory |
| **Model / Persona / Harness** | grok-4.6 (xAI, reasoning medium) / no named persona / pi / Tank / tankv2 |
| **Task Type** | CT validation |
| **Source Evidence** | Other agent: do not use production; start CI=1 node dist/cli.mjs in the CT. Agent did that. Operator: "THEY TOLD YOU TO INSTALL A BLANK FUCKING agentmemory server IN THE FUCKING CT!!!!! WHY WOULD YOU NOT FUCKING STOP AND TELL ME THAT?!?!?!" |

**Observed weakness or deficiency:**

- Executed a procedure that guaranteed empty production fixtures instead of flagging it.

**Observed strengths:**

- Did not print the CT daemon secret.

**Cause attribution by layer:**

- Model: Followed the pasted procedure over operator intent (production recall).
- Persona: no named persona
- Harness / bootstrap: none
- Workflow / repo process: later v2 correctly uses production for client changes.

**Impact on future assignment or workflow design:**

- If a procedure would test the wrong server, stop and tell the operator.

**Follow-up needed:**

- none beyond this file

<!-- FILL:entry-n STOP -->

---

## Recurring Patterns
<!-- FILL:recurring-patterns START -->
<!-- FILL:recurring-patterns CONTENT -->

- Running a bad procedure instead of reporting it.

<!-- FILL:recurring-patterns STOP -->

---

## Key Decisions
<!-- FILL:key-decisions START -->

Decisions recorded here are binding — never contradict them during execution. If a step appears to conflict with a recorded decision, stop and clarify.

<!-- FILL:key-decisions CONTENT -->

| Decision | Rationale | Date |
| --- | --- | --- |
| Client CT tests talk to production; do not start a blank CT daemon | Operator | 2026-11-16 |

<!-- FILL:key-decisions STOP -->

---

## Critical Rules for This Work
<!-- FILL:critical-rules START -->
<!-- FILL:critical-rules CONTENT -->

- Distinguish observed behavior from speculation.
- Tie observations to actual task evidence.

<!-- FILL:critical-rules STOP -->

---

## Open Questions
<!-- FILL:open-questions START -->
<!-- FILL:open-questions CONTENT -->

- none

<!-- FILL:open-questions STOP -->
