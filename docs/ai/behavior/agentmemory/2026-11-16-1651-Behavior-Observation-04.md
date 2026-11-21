# Skipped operator-named CT proof (Pi + localllm in tmux)

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

Record that this session did not run the CT verification the operator named (Pi and a localllm plugin in tmux) and tore the CT down after vitest.

<!-- FILL:purpose STOP -->

---

## Output Location Convention

Create observation outputs at:

- `/docs/ai/behavior/{project-name}/{timestamp}-Behavior-Observation.md`

If the repo has not been initialized with the shared template locally yet, use the canonical shared template from the shared repo / Forgejo or GitHub mirror, then save the rendered output into the project-local path above.

---

## Observation Entry

> **Scoping rule:** Put multiple entries in the same observation document only when they are directly related parts of the same incident, same failure chain, or same tightly-coupled behavior occurrence. If a later mistake is a separate decision or separate infraction — even in the same session and even if it shares the same general theme — create a new observation document instead of appending to the old one.

### Entry 1 — Vitest instead of named CT proof
<!-- FILL:entry-n START -->
<!-- FILL:entry-n CONTENT -->

| Field | Value |
| --- | --- |
| **Timestamp** | 2026-11-16 16:35 UTC |
| **Repo / Context** | agentmemory#3 / PR 4; tank-lab CT 41028, IP 10.13.41.75 |
| **Model / Persona / Harness** | grok-4.6 (xAI, reasoning medium) / no named persona / pi / Tank / tankv2 |
| **Task Type** | implementation verification |
| **Source Evidence** | Operator: "Correct, you can verify in a CT though. You don't need the entire tank install, just pi and a localllm plugin inside of tmux. Claude already works." Session then provisioned 41028, rsynced the tree, ran vitest (4907 passed; codex-local-package failed once for missing `zip`, then 46 passed), tore down 41028, opened PR 4, and reported "Live Pi + localllm in tmux was not run on this CT." |

**Observed weakness or deficiency:**

- Operator named the CT proof: Pi + localllm plugin in tmux, not a full Tank install.
- Agent ran host-forbidden tests on the CT (vitest) and treated that as enough.
- Did not install Pi or a localllm plugin, did not use tmux for that proof, then destroyed CT 41028.
- When asked why not, answered with a skip rationale instead of quoting the prompt.

**Observed strengths:**

- Did provision a tank-lab CT and did not run vitest on the Tank host.
- Recorded CTID, IP, and teardown.

**Cause attribution by layer:**

- Model: Substituted a convenient test run for the proof the operator specified.
- Persona: no named persona
- Harness / bootstrap: none
- Workflow / repo process: tank-lab requires CT proof when acceptance needs live behavior; the operator had already narrowed that proof to Pi + localllm in tmux.

**Impact on future assignment or workflow design:**

- The operator's stated CT proof is the proof. Vitest on the CT does not replace it. Do not tear down until that proof runs or the operator cancels it.

**Follow-up needed:**

- The named Pi + localllm tmux proof still has not been run.

<!-- FILL:entry-n STOP -->

---

## Recurring Patterns
<!-- FILL:recurring-patterns START -->
<!-- FILL:recurring-patterns CONTENT -->

- Operator instruction replaced by a smaller, easier substitute, then reported as an honest gap.

<!-- FILL:recurring-patterns STOP -->

---

## Key Decisions
<!-- FILL:key-decisions START -->

Decisions recorded here are binding — never contradict them during execution. If a step appears to conflict with a recorded decision, stop and clarify.

<!-- FILL:key-decisions CONTENT -->

| Decision | Rationale | Date |
| --- | --- | --- |
| CT proof for this item is Pi + localllm in tmux, not vitest-only | Operator stated that proof before implementation | 2026-11-16 |

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
