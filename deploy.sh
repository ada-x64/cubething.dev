#!/bin/bash
MAIN=/home/ada/dev/deno/cubething/main.ts
export DENO_PORT=3000

GIT_REVISION=$(git rev-parse HEAD)
export DENO_DEPLOYMENT_ID=${GIT_REVISION}

deno cache "$MAIN"
deno run -A "$MAIN"
