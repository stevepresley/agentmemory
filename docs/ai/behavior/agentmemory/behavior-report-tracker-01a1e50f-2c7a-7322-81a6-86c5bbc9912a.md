# Behavior Report Tracking Template

**Project:** agentmemory  
**Session ID:** 01a1e50f-2c7a-7322-81a6-86c5bbc9912a  
**Session Time:** 2026-11-16 15:52–16:51 UTC  

---

## Full Incident List (4 Total)

| # | Description | Commit | PR |
|---|---|---|---|
| 1 | [Left Ready on #3 after claim](2026-11-16-1651-Behavior-Observation-01.md) | TBD | [4](https://github.com/stevepresley/agentmemory/pull/4) |
| 2 | [Did not answer whether the pickup skill names In Progress](2026-11-16-1651-Behavior-Observation-02.md) | TBD | [4](https://github.com/stevepresley/agentmemory/pull/4) |
| 3 | [git status on tmp/ during agent-skills issue search](2026-11-16-1651-Behavior-Observation-03.md) | TBD | [4](https://github.com/stevepresley/agentmemory/pull/4) |
| 4 | [Skipped operator-named CT proof (Pi + localllm in tmux)](2026-11-16-1651-Behavior-Observation-04.md) | TBD | [4](https://github.com/stevepresley/agentmemory/pull/4) |

## Instructions

- Use exactly the four columns shown: `#`, `Description`, `Commit`, and `PR`.
- Do not add a `Model` column. Model identity belongs in each observation file, not the tracker table.
- One row represents one incident and links to that incident's observation file.
- `Commit` is the commit that added the observation file, linked to that commit. It is not the tracker commit.
- `PR` is the PR containing that observation file, linked to that PR. It is not automatically the PR containing the tracker.
- Use the actual full commit hash and actual PR number. `TBD` is allowed only until the observation is pushed; replace it afterward.
- Use the current UTC date and time for new observation filenames and headers. Do not copy a prior report date.
- Read the current session JSONL for the observation's model identity; do not put one session-wide model in the tracker header.
- Add the row to the tracker before writing the observation file. List only unfiled rows and wait for operator verification. After confirmation, write the report, then update that row with its observation commit and PR links.
- Do not declare completion until every row, observation link, commit link, PR link, and remote push has been verified.
