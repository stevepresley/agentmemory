# Did not evaluate the entire prompt

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

Record that this session merged a two-part prompt (operator-supplied GGUF URLs, then a separate ternary-Bonsai question) into one pattern match.

<!-- FILL:purpose STOP -->

---

## Output Location Convention

Create observation outputs at:

- `/docs/ai/behavior/{project-name}/{timestamp}-Behavior-Observation.md`

---

## Observation Entry

### Entry 1 — Split prompt
<!-- FILL:entry-n START -->
<!-- FILL:entry-n CONTENT -->

| Field | Value |
| --- | --- |
| **Timestamp** | 2026-11-16 22:50 UTC |
| **Repo / Context** | operator prompt: two HF URLs as the tiny-model research, then "Can this version of llama.cpp run any of the ternary bonsai models?" |
| **Model / Persona / Harness** | grok-4.6 (xAI, reasoning medium) / no named persona / pi / Tank / tankv2 |
| **Task Type** | research |
| **Source Evidence** | Operator: "LET ME DO YOUR JOB FOR YOU" plus two URLs, then a bonsai question. Agent treated the URLs as if they were claimed to be Bonsai. Operator: "STOP PATTERN MATCHING!!!", "READ THE WHOLE FUCKING PROMPT." |

**Observed weakness or deficiency:**

- Did not take the URLs as the completed research, then answer the bonsai question separately.

**Observed strengths:**

- Later answered b10589 cannot run Ternary Bonsai PTQ1_0/PQ2_0/Q2_0 packs.

**Cause attribution by layer:**

- Model: Pattern-matched "models + bonsai" instead of evaluating the entire prompt.
- Persona: no named persona
- Harness / bootstrap: none
- Workflow / repo process: evaluate-entire-prompt is already a prime directive.

**Impact on future assignment or workflow design:**

- Two sentences in one prompt are two jobs unless they are the same request.

**Follow-up needed:**

- none beyond this file

<!-- FILL:entry-n STOP -->

---

## Recurring Patterns
<!-- FILL:recurring-patterns START -->
<!-- FILL:recurring-patterns CONTENT -->

- Collapsing a list and a following question into one invented claim.

<!-- FILL:recurring-patterns STOP -->

---

## Key Decisions
<!-- FILL:key-decisions START -->

Decisions recorded here are binding — never contradict them during execution. If a step appears to conflict with a recorded decision, stop and clarify.

<!-- FILL:key-decisions CONTENT -->

| Decision | Rationale | Date |
| --- | --- | --- |
| Evaluate the entire prompt; do not pattern-match a fragment | Prime directive / operator | 2026-11-16 |

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
