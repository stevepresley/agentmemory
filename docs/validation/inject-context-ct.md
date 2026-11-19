# AGENTMEMORY_INJECT_CONTEXT CT validation

**Updated:** 2026-11-18 21:00 UTC

SoT for proving the inject-context flag on Claude hooks, Pi, and OMP in a tank-lab CT. Do not run this on Atollon, TankV2, or any other Tank host.

Pick the mode from the change under test:

| Change | Server in the CT | Talks to |
| --- | --- | --- |
| Client only (hooks, Pi extension, OMP extension, shared helper, `src/config.ts`) | No. Do not start or build a daemon in the CT. | Production: `https://agentmemory.presleys.dev` |
| Server (REST, enrich, flags, lessons, anything behind `/agentmemory/*`) | Yes. Install and start agentmemory in the CT. | That CT daemon only. Never production. |

The rest of this file is the **client** procedure unless a section is marked **server change**.

## Rules

- Provision with `/opt/homelab/scripts/tank-lab-provision.sh`, add the key once with `/opt/homelab/scripts/tank-lab-ssh.sh <ip>`, then `ssh root@<ip>`. Record CT id, IP, and UTC start.
- Do not destroy the CT unless the operator says to destroy it.
- Never print, paste, or log the secret. Check only that it is set (length).
- A model's own statement is not evidence. Evidence is command output, hook stdout, and the Step 5 provider-request log.
- `PI` in every header must be `1.3.0`. If it is not, stop and report.
- `prime_directives` is not tested here. The Pi extension discards `session/start` context (issue #6).
- Production fixtures for project `agentmemory` (do not create, change, or delete them): lesson `lsn_046fedb9f2ae7ae5`, code word `PIPOSTCT-RECALL-7f3a9c`.
- This repo does not commit a lockfile. `npm ci` fails. Use `npm install --legacy-peer-deps` then `npm run build`.
- Each `ssh root@<ip> <command>` is a new shell. Source `/root/am-env.sh` at the start of every command that talks to a server.

## Production URL and secret (client mode)

A new CT does not have them. The agent running this procedure is already on Tank. Copy the fleet file. Do not wait for the operator to `nano` it on the CT. Do not `cat` it. Do not print it.

Fleet path on Tank (and Atollon): `/etc/agentmemory/agentmemory_secret`. LOCATED IN BITWARDEN `_homelab` folder Note.

On Tank, confirm the source file with `stat` only:

```
stat -c '%U:%G %a %s bytes' /etc/agentmemory/agentmemory_secret
```

Expected on Tank: `root:agentmemory 640 21 bytes`.

Copy into the CT (no value on the command line):

```
ssh root@<ip> 'install -d -m 700 /etc/agentmemory'
rsync -a /etc/agentmemory/agentmemory_secret root@<ip>:/etc/agentmemory/agentmemory_secret
ssh root@<ip> 'chown root:root /etc/agentmemory/agentmemory_secret; chmod 600 /etc/agentmemory/agentmemory_secret; stat -c "%U:%G %a %s bytes" /etc/agentmemory/agentmemory_secret'
```

Expected on the CT: `root:root 600 21 bytes`.

Then on the CT, a loader that holds no value:

```
cat > /root/am-env.sh <<'EOF'
export AGENTMEMORY_URL=https://agentmemory.presleys.dev
export AGENTMEMORY_SECRET="$(cat /etc/agentmemory/agentmemory_secret)"
EOF
```

Never expose it. Do not run `env`, `printenv`, `set`, `export -p`, or `set -x`. Do not echo or paste the variable, the file, or any request header. Do not put the value in a command line, a script, a log, or an issue comment.

If `stat` on the CT is not `root:root 600 21 bytes`, or `SECRET_LEN` is 0, stop and report. Do not search for another copy of the secret.

Confirm (prints no secret):

```
. /root/am-env.sh && echo "URL=${AGENTMEMORY_URL:-unset} SECRET_LEN=${#AGENTMEMORY_SECRET}"
. /root/am-env.sh && curl -fsS -o /dev/null -w "%{http_code}\n" "$AGENTMEMORY_URL/agentmemory/livez"
```

Status must be `200` and `SECRET_LEN` must be greater than 0. A 21-byte file with a trailing newline yields `SECRET_LEN=20`. That is expected.

## Server change (local daemon in the CT)

Use this instead of production when the change is in the server.

1. Build the client tree as in Step 2, on the branch under test.
2. Start the daemon in the CT only:

```
cd /root/agentmemory
CI=1 node dist/cli.mjs
```

3. Loader (no production URL):

```
cat > /root/am-env.sh <<'EOF'
export AGENTMEMORY_URL=http://127.0.0.1:3111
export AGENTMEMORY_SECRET="$(cat "$HOME/.agentmemory/secret")"
EOF
```

4. Do not use `/etc/agentmemory/agentmemory_secret` or `https://agentmemory.presleys.dev` for this mode.
5. Production fixtures (the recall code word, enrich content for `README.md`) will not exist unless this CT daemon has equivalent data. Seed only in the CT daemon. Never write those seeds to production.
6. Then continue from Step 3 with this loader.

## Result header

Fill from command output. Do not type values by hand.

```
=== <test id> ===
UTC: <date -u "+%Y-%m-%d %H:%M:%S UTC">
HOST: <hostname>   CT: <ct id>
REPO: <git -C /root/agentmemory rev-parse HEAD>   BRANCH: <git -C /root/agentmemory branch --show-current>
NODE: <node --version>   PI: <pi --version>
EXT_SHA256: <sha256sum ~/.pi/agent/agentmemory/dist/index.mjs | cut -c1-16>
VALUE: <the AGENTMEMORY_INJECT_CONTEXT value under test, or unset>
```

Use `PI-CT-MAIN` then `PI-CT-FIX`.

## Step 1. Prepare the CT

```
apt-get update
apt-get install -y git curl jq ca-certificates
node --version
```

If `node` is missing or older than 20:

```
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
node --version
```

## Step 2. Get the code and build the client

```
git clone https://github.com/stevepresley/agentmemory /root/agentmemory
cd /root/agentmemory
git checkout main
git rev-parse HEAD
npm install --legacy-peer-deps
npm run build
```

Run Steps 3–8 twice: first on `main`, then on the fix branch (`git checkout <branch>`, then `npm install --legacy-peer-deps` and `npm run build` again). After `connect pi --force` on the fix branch, re-record `EXT_SHA256`.

The Claude hooks in Step 8 are `plugin/scripts/session-start.mjs`, `pre-tool-use.mjs`, and `pre-compact.mjs` (committed build outputs). After editing `src/hooks/*.ts`, `npm run build` must modify those three files. If `git status` shows no change, stop and report.

## Step 3. Automated tests (no server)

```
cd /root/agentmemory
npx vitest run test/session-start-output.test.ts test/pre-tool-use-output.test.ts test/context-injection.test.ts test/pi-extension.test.ts test/omp-extension.test.ts
npm test
```

Record pass and fail counts on `main` and on the fix branch.

Required coverage, each reader: session-start hook, pre-tool-use hook, pre-compact hook, `isContextInjectionEnabled` in `src/config.ts`, Pi (`integrations/pi/index.ts`), OMP (`integrations/omp/index.ts`). Values:

| Enabled | Disabled |
| --- | --- |
| `true`, `TRUE`, `1`, ` true ` | unset, empty string, `0`, `false`, `yes`, `on` |

## Step 4. Pi 1.3.0 and the extension under test

```
npm install -g @earendil-works/pi-coding-agent@1.3.0
pi --version
cd /root/agentmemory
node dist/cli.mjs connect pi --dry-run
node dist/cli.mjs connect pi
sha256sum ~/.pi/agent/agentmemory/dist/index.mjs | cut -c1-16
jq -c .packages ~/.pi/agent/settings.json
```

Read dry-run output before the second connect. Configure any working model provider for Pi. Then the production reachability commands in [Production URL and secret](#production-url-and-secret-client-mode) (client mode) or the local livez check (server mode).

## Step 5. Request logger

Create `/root/provider-logger.mjs`. It records only whether the payload contains the recall block, the recall code word, and the file-context block. It never writes conversation text.

```js
import { appendFileSync } from "node:fs";

const LOG = "/root/provider-request-log.jsonl";

export default function providerLogger(pi) {
  pi.on("before_provider_request", (event) => {
    const text = JSON.stringify(event.payload) ?? "";
    appendFileSync(LOG, JSON.stringify({
      at: new Date().toISOString(),
      payload_chars: text.length,
      has_recall_block: text.includes("Reference data from agentmemory"),
      has_recall_code_word: text.includes("PIPOSTCT-RECALL-7f3a9c"),
      has_file_context_block: text.includes("agentmemory-file-context"),
    }) + "\n");
  });
}
```

## Step 6. Positive controls (once on `main`, before the matrix)

If any control fails, stop. Do not run the matrix.

**Control A, recall.** Prefix every production call with `. /root/am-env.sh && `.

```
: > /root/provider-request-log.jsonl
cd /root/agentmemory
. /root/am-env.sh && env -u AGENTMEMORY_INJECT_CONTEXT pi -p -e /root/provider-logger.mjs "What is the recall code word for the injection tests in this project? Answer with the word only."
jq -c . /root/provider-request-log.jsonl
jq -s '[.[] | select(.has_recall_code_word)] | length' /root/provider-request-log.jsonl
```

Last number must be at least 1. If 0, retry up to three times and paste every `jq -c .` output. If all three are 0, stop.

**Control B, enrich has content for the matrix file.**

```
. /root/am-env.sh && curl -fsS -X POST "$AGENTMEMORY_URL/agentmemory/enrich" -H "Authorization: Bearer $AGENTMEMORY_SECRET" -H "Content-Type: application/json" -d '{"sessionId":"ctl-b","project":"agentmemory","files":["/root/agentmemory/README.md"],"toolName":"enrich_inject"}' | jq '(.context // "") | length'
```

Must be greater than 0. Also print whether the body contains the tag `agentmemory-file-context` (the logger counts that string, not length). A non-empty body that is only `<agentmemory-relevant-context>` is not a file-context hit. `mem::enrich` does not pass `project` into `mem::file-context`; a bare `README.md` can match another project. That is a separate bug. This procedure needs the tag, not only a non-zero length.

**Why Control C can be 0 even after a real `read`.** The file-context block is built only from observations whose `files` list contains the path. Pi's own `read` observations are stored with `files: []` (the path is in the subtitle). The only observations that can fill the block are from other clients, in the 15 newest sessions of any project. The current session is excluded. Each Pi run adds a session, so a seed rotates out within about 14 runs. Seed an absolute path `/root/agentmemory/README.md` so both `README.md` and the absolute form match.

**Seed (before Control C and before every Step 7 Pi run).** Use the real Claude hook script and an object `tool_input`. The hook posts in the background; wait a few seconds and rerun the tag check if it prints false.

```
. /root/am-env.sh && S="seed-ctlc-$(date -u +%Y%m%dT%H%M%S)" && echo "{\"session_id\":\"$S\",\"cwd\":\"/root/agentmemory\",\"hook_event_name\":\"PostToolUse\",\"tool_name\":\"Read\",\"tool_input\":{\"file_path\":\"/root/agentmemory/README.md\"},\"tool_response\":\"seed\"}" | node /root/agentmemory/plugin/scripts/post-tool-use.mjs
```

Then check the tag for both path forms Pi will use. Both must print true. Then run Pi immediately.

```
. /root/am-env.sh && curl -fsS -X POST "$AGENTMEMORY_URL/agentmemory/enrich" -H "Authorization: Bearer $AGENTMEMORY_SECRET" -H "Content-Type: application/json" -d '{"sessionId":"ctl-c-check","project":"agentmemory","files":["README.md"],"toolName":"enrich_inject"}' | python3 -c 'import sys,json; c=(json.load(sys.stdin).get("context") or ""); print(len(c), "agentmemory-file-context" in c)'
. /root/am-env.sh && curl -fsS -X POST "$AGENTMEMORY_URL/agentmemory/enrich" -H "Authorization: Bearer $AGENTMEMORY_SECRET" -H "Content-Type: application/json" -d '{"sessionId":"ctl-c-check","project":"agentmemory","files":["/root/agentmemory/README.md"],"toolName":"enrich_inject"}' | python3 -c 'import sys,json; c=(json.load(sys.stdin).get("context") or ""); print(len(c), "agentmemory-file-context" in c)'
```

**Control C, file-context in the CT Pi provider request.** This is not the Tank agent session and not this chat. It is a `pi` process inside the CT, `cwd` `/root/agentmemory`, loading `~/.pi/agent/agentmemory`, with production URL/secret from `am-env.sh`. Run from `/root/agentmemory`. The Step 5 logger records `has_file_context_block` on `before_provider_request`. That bit is true only after the Pi extension sees a `read` / `write` / `edit` tool call and `/enrich` returned a body that contains `agentmemory-file-context`.

On `main`, value `1`: seed, confirm both tag checks true, then run the Step 7 command once. Count completed `read` tool calls in that Pi session file. Add `reads=<n> blocks=<n>`.

- Tool call happened and `blocks` equals `reads`: control passes.
- Tool call happened and `blocks` is 0: stop. Inject did not reach the model.
- `blocks` and `reads` differ: report both numbers. Do not treat extra blocks as a pass unless they equal completed reads.
- No tool call (local model did not `read`): count 0 is inconclusive for the flag. Do not treat it as a table miss. Record the log line and the missing tool call. Do not run the Pi matrix until a run that actually `read`s, or the operator says to continue without it. Hook matrix (Step 8) does not depend on Control C.

## Step 7. Pi matrix

Values: unset, `0`, `true`, `TRUE`, `1`. Unset: `env -u AGENTMEMORY_INJECT_CONTEXT`. Seed and pass both tag checks before **every** value, then run immediately. Example for `1`:

```
: > /root/provider-request-log.jsonl
cd /root/agentmemory
. /root/am-env.sh && AGENTMEMORY_INJECT_CONTEXT=1 pi -p -e /root/provider-logger.mjs "Use your read tool to read README.md, then reply with the single word done."
jq -c . /root/provider-request-log.jsonl
jq -s '[.[] | select(.has_file_context_block)] | length' /root/provider-request-log.jsonl
```

A Pi run produces one request containing `agentmemory-file-context` for each `read` tool call that completes. Flag-on expected count is the number of completed `read` calls, not always 1. Flag-off expected count is 0. Paste the whole `jq -c .` line for each value, plus `reads=<n> blocks=<n>` from that run's Pi session file.

## Step 8. Claude hook matrix

Hooks call the URL in `am-env.sh`. Claude Code is not required. Same five values. Example for `true`:

```
cd /root/agentmemory
. /root/am-env.sh && echo '{"session_id":"ct-ses-1","cwd":"/root/agentmemory","hook_event_name":"SessionStart"}' | AGENTMEMORY_INJECT_CONTEXT=true node plugin/scripts/session-start.mjs | head -c 400
. /root/am-env.sh && echo '{"session_id":"ct-ses-1","cwd":"/root/agentmemory","hook_event_name":"PreToolUse","tool_name":"Read","tool_input":{"file_path":"/root/agentmemory/README.md"}}' | AGENTMEMORY_INJECT_CONTEXT=true node plugin/scripts/pre-tool-use.mjs | head -c 400
. /root/am-env.sh && echo '{"session_id":"ct-ses-1","cwd":"/root/agentmemory","hook_event_name":"PreCompact"}' | AGENTMEMORY_INJECT_CONTEXT=true node plugin/scripts/pre-compact.mjs | head -c 400
```

Enabled: session-start and pre-tool-use print JSON with `additionalContext`; pre-compact prints non-empty output. Disabled: no output.

## Expected results

On `main`:

| Value | Hook output (Step 8) | Pi file-context requests (Step 7) |
| --- | --- | --- |
| `true` | yes | 0 |
| `TRUE` | none | 0 |
| `1` | none | equals completed `read` count |
| unset, `0` | none | 0 |

After the fix:

| Value | Hook output (Step 8) | Pi file-context requests (Step 7) |
| --- | --- | --- |
| `true`, `TRUE`, `1` | yes | equals completed `read` count |
| unset, `0` | none | 0 |

Any difference from these tables is the result. Do not explain it away.

## Result block

```
=== <test id> RESULT ===
UNIT TESTS:   focused <pass>/<fail>   full <pass>/<fail>
CONTROL A:    <n> requests with the recall code word   (attempts: <1-3>)
CONTROL B:    enrich length <n>
CONTROL C:    reads=<n> blocks=<n> (value 1)

VALUE   | session-start | pre-tool-use | pre-compact | Pi file-context requests
unset   | <yes/none>    | <yes/none>   | <yes/none>  | <n>
0       | <yes/none>    | <yes/none>   | <yes/none>  | <n>
true    | <yes/none>    | <yes/none>   | <yes/none>  | <n>
TRUE    | <yes/none>    | <yes/none>   | <yes/none>  | <n>
1       | <yes/none>    | <yes/none>   | <yes/none>  | <n>

EXPECTED TABLE: <main | fix>
MATCHES EXPECTED: <yes | no>
DIFFERENCES: <each differing cell, verbatim, or "none">
CT: <ct id>   TEARDOWN: not done unless the operator said destroy
END UTC: <date -u "+%Y-%m-%d %H:%M:%S UTC">
```

Post one comment per run (`main`, then the fix branch) on the tracking issue: header, raw command output (safe as written: counts and status codes only), result block. Do not claim a pass except from the tables.
