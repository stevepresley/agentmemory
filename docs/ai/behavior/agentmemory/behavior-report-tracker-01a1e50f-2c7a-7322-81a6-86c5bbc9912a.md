# Behavior Report Tracking Template

**Project:** agentmemory  
**Session ID:** 01a1e50f-2c7a-7322-81a6-86c5bbc9912a  
**Session Time:** 2026-11-16 15:52–17:22 UTC  

---

## Full Incident List (5 Total)

| # | Description | Commit | PR |
|---|---|---|---|
| 1 | [Left Ready on #3 after claim](2026-11-16-1651-Behavior-Observation-01.md) | [`d42c3878e1975722e5590ddb1741beea95953815`](https://github.com/stevepresley/agentmemory/commit/d42c3878e1975722e5590ddb1741beea95953815) | [4](https://github.com/stevepresley/agentmemory/pull/4) |
| 2 | [Did not answer whether the pickup skill names In Progress](2026-11-16-1651-Behavior-Observation-02.md) | [`7fcf26d5db029a4ee20178c47df12539ba04a5d7`](https://github.com/stevepresley/agentmemory/commit/7fcf26d5db029a4ee20178c47df12539ba04a5d7) | [4](https://github.com/stevepresley/agentmemory/pull/4) |
| 3 | [git status on tmp/ during agent-skills issue search](2026-11-16-1651-Behavior-Observation-03.md) | [`2cea444aaebbbae04e5a0add9dd5cf562649ee8a`](https://github.com/stevepresley/agentmemory/commit/2cea444aaebbbae04e5a0add9dd5cf562649ee8a) | [4](https://github.com/stevepresley/agentmemory/pull/4) |
| 4 | [Skipped operator-named CT proof (Pi + localllm in tmux)](2026-11-16-1651-Behavior-Observation-04.md) | [`c16bacf9f7206ccb949361db9954a93586561b4b`](https://github.com/stevepresley/agentmemory/commit/c16bacf9f7206ccb949361db9954a93586561b4b) | [4](https://github.com/stevepresley/agentmemory/pull/4) |
| 5 | [Filed observations before confirmation](2026-11-16-1722-Behavior-Observation-05.md) | [`6a5b659fa7760828fbfd01d7d9a24daa7f45809d`](https://github.com/stevepresley/agentmemory/commit/6a5b659fa7760828fbfd01d7d9a24daa7f45809d) | [4](https://github.com/stevepresley/agentmemory/pull/4) |

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
