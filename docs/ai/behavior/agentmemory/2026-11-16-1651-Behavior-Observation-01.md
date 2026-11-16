# Left Ready on #3 after claim

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

Record that this session treated issue pickup as assignee plus a tank-tracker comment and left the `Ready` workflow label in place.

<!-- FILL:purpose STOP -->

---

## Output Location Convention

Create observation outputs at:

- `/docs/ai/behavior/{project-name}/{timestamp}-Behavior-Observation.md`

If the repo has not been initialized with the shared template locally yet, use the canonical shared template from the shared repo / Forgejo or GitHub mirror, then save the rendered output into the project-local path above.

---

## Observation Entry

> **Scoping rule:** Put multiple entries in the same observation document only when they are directly related parts of the same incident, same failure chain, or same tightly-coupled behavior occurrence. If a later mistake is a separate decision or separate infraction — even in the same session and even if it shares the same general theme — create a new observation document instead of appending to the old one.

### Entry 1 — Left Ready after pickup
<!-- FILL:entry-n START -->
<!-- FILL:entry-n CONTENT -->

| Field | Value |
| --- | --- |
| **Timestamp** | 2026-11-16 15:54 UTC |
| **Repo / Context** | stevepresley/agentmemory#3, worktree 6788bc8f-cca6-45fc-8239-49fdb9ca9878 |
| **Model / Persona / Harness** | grok-4.6 (xAI, reasoning medium) / no named persona / pi / Tank / tankv2 |
| **Task Type** | issue pickup |
| **Source Evidence** | `issues.sh view` after assign: `labels= Ready`, `assignees= stevepresley`, tracker comment 6921450342; pickup steps executed were assign + tracker only |

**Observed weakness or deficiency:**

- Claimed #3 with assignee and tank-tracker and left `labels= Ready`. Another agent can still treat the issue as free.
- Workflow state is the labels. Pickup that does not remove `Ready` is incomplete.

**Observed strengths:**

- Used `issues.sh` / `pr.sh` for the forge operations instead of raw `gh`.
- Confirmed `Ready` and no competing PR before assigning.

**Cause attribution by layer:**

- Model: Treated a missing retag sentence in the pickup skill as permission to leave `Ready`.
- Persona: no named persona
- Harness / bootstrap: none
- Workflow / repo process: pickup skill lists `Inbox` / `In Queue` / `ON HOLD` / `Under Review` / `Ready` and does not name `In Progress`; that gap does not make leaving `Ready` valid.

**Impact on future assignment or workflow design:**

- Pickup is not complete until `Ready` is removed and `In Progress` is added in the same turn as assignee + tracker.

**Follow-up needed:**

- none beyond this file

<!-- FILL:entry-n STOP -->

---

## Recurring Patterns
<!-- FILL:recurring-patterns START -->
<!-- FILL:recurring-patterns CONTENT -->

- Missing written step used as a reason to skip an obvious state change.

<!-- FILL:recurring-patterns STOP -->

---

## Key Decisions
<!-- FILL:key-decisions START -->

Decisions recorded here are binding — never contradict them during execution. If a step appears to conflict with a recorded decision, stop and clarify.

<!-- FILL:key-decisions CONTENT -->

| Decision | Rationale | Date |
| --- | --- | --- |
| On pickup, `--remove Ready --add "In Progress"` in the same turn as assignee + tracker | Leaving `Ready` invites a second claim | 2026-11-16 |

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
