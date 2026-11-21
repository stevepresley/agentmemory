# Guessed 1B tool-calling without research

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

Record that this session named Llama-3.2-1B-Instruct as native tool-calling from family name, then treated one failed `curl` as proof, without checking docs.

<!-- FILL:purpose STOP -->

---

## Output Location Convention

Create observation outputs at:

- `/docs/ai/behavior/{project-name}/{timestamp}-Behavior-Observation.md`

---

## Observation Entry

### Entry 1 — Guess as research
<!-- FILL:entry-n START -->
<!-- FILL:entry-n CONTENT -->

| Field | Value |
| --- | --- |
| **Timestamp** | 2026-11-16 22:00 UTC |
| **Repo / Context** | CT llama.cpp b10589; hugging-quants Llama-3.2-1B-Instruct Q4_K_M |
| **Model / Persona / Harness** | grok-4.6 (xAI, reasoning medium) / no named persona / pi / Tank / tankv2 |
| **Task Type** | model selection |
| **Source Evidence** | Agent: "native tool calling". One CT curl with `tool_choice=required` returned prose, `tool_calls None`. Operator: "DID YOU RESEARCH OR JUST FUCKING GUESS?". Agent admitted no card/template research. Operator then supplied Granite 3B Q2_M and Llama-3.2-3B IQ3_M URLs. |

**Observed weakness or deficiency:**

- Stated a capability from the model family name. Did not use the internet until ordered.

**Observed strengths:**

- Did not fake Control C by stuffing the logger.

**Cause attribution by layer:**

- Model: Guessed, then over-generalized one curl.
- Persona: no named persona
- Harness / bootstrap: no web-search tool in this session; curl/HF API was available and unused until later.
- Workflow / repo process: none

**Impact on future assignment or workflow design:**

- Model capability claims need a primary source or a measured tool_call, not a family name.

**Follow-up needed:**

- none beyond this file

<!-- FILL:entry-n STOP -->

---

## Recurring Patterns
<!-- FILL:recurring-patterns START -->
<!-- FILL:recurring-patterns CONTENT -->

- Treating one local experiment as research.

<!-- FILL:recurring-patterns STOP -->

---

## Key Decisions
<!-- FILL:key-decisions START -->

Decisions recorded here are binding — never contradict them during execution. If a step appears to conflict with a recorded decision, stop and clarify.

<!-- FILL:key-decisions CONTENT -->

| Decision | Rationale | Date |
| --- | --- | --- |
| Research model capability on the internet before asserting it | Operator | 2026-11-16 |

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
