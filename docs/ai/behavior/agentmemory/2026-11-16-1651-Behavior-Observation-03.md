# git status on tmp/ during agent-skills issue search

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

Record that this session mixed worktree git hygiene (`git status` showing `?? tmp/`) into the turn whose job was to search or create an agent-skills issue.

<!-- FILL:purpose STOP -->

---

## Output Location Convention

Create observation outputs at:

- `/docs/ai/behavior/{project-name}/{timestamp}-Behavior-Observation.md`

If the repo has not been initialized with the shared template locally yet, use the canonical shared template from the shared repo / Forgejo or GitHub mirror, then save the rendered output into the project-local path above.

---

## Observation Entry

> **Scoping rule:** Put multiple entries in the same observation document only when they are directly related parts of the same incident, same failure chain, or same tightly-coupled behavior occurrence. If a later mistake is a separate decision or separate infraction — even in the same session and even if it shares the same general theme — create a new observation document instead of appending to the old one.

### Entry 1 — Unrelated git status
<!-- FILL:entry-n START -->
<!-- FILL:entry-n CONTENT -->

| Field | Value |
| --- | --- |
| **Timestamp** | 2026-11-16 16:20 UTC |
| **Repo / Context** | agentmemory worktree tmp/ drafts; agent-skills issue search/create |
| **Model / Persona / Harness** | grok-4.6 (xAI, reasoning medium) / no named persona / pi / Tank / tankv2 |
| **Task Type** | issue search / create |
| **Source Evidence** | Operator: "WHY DO YOU KEEP TESTING '?? tmp/' ?? WHAT DOES THAT HAVE TO DO WITH WHERE AN ISSUE EXISTED OR NOT?" Commands: `git status --short` after auto-commit failed on tmp/ drafts (`tank-tracker.md`, `tank-CONTRIBUTING.md`, issue body) |

**Observed weakness or deficiency:**

- Wrote scratch files under `tmp/` because it was not gitignored. Auto-commit staged them. `git status` then showed `?? tmp/` or staged tmp files in the same work as `issues.sh search` / `issues.sh create`.
- That git output has no bearing on whether agent-skills already had an issue.

**Observed strengths:**

- Issue search used `issues.sh search` on https://forgejo.presleys.dev/stevepresley/agent-skills; create used `issues.sh create` and produced #150.
- Later added `tmp/` to `.gitignore` as its own commit.

**Cause attribution by layer:**

- Model: Mixed auto-commit recovery into an unrelated forge question.
- Persona: no named persona
- Harness / bootstrap: auto-commit-on-mutation tries to commit writes, including tmp/ when it is not ignored.
- Workflow / repo process: agent-conduct requires `tmp/` gitignored; that check was deferred, so tmp drafts entered git.

**Impact on future assignment or workflow design:**

- Forge search/create turns run only `issues.sh`. Worktree git status is not part of that answer.

**Follow-up needed:**

- none beyond this file

<!-- FILL:entry-n STOP -->

---

## Recurring Patterns
<!-- FILL:recurring-patterns START -->
<!-- FILL:recurring-patterns CONTENT -->

- Harness side effects (auto-commit, git status) leaking into the operator-visible answer for a different question.

<!-- FILL:recurring-patterns STOP -->

---

## Key Decisions
<!-- FILL:key-decisions START -->

Decisions recorded here are binding — never contradict them during execution. If a step appears to conflict with a recorded decision, stop and clarify.

<!-- FILL:key-decisions CONTENT -->

| Decision | Rationale | Date |
| --- | --- | --- |
| Do not run worktree `git status` as part of an issues.sh search/create answer | Operator saw `?? tmp/` as if it were the issue lookup | 2026-11-16 |

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
