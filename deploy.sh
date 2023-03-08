#!/bin/bash

PWD=$1
MAIN="$PWD"/main.ts
GIT_REVISION=$(git rev-parse HEAD)

cd "$PWD";
sudo deno cache "$MAIN"

tee "$PWD"/run.sh << EOF

export DENO_PORT=3000
export DENO_DEPLOYMENT_ID=${GIT_REVISION}
deno run -A "$MAIN"

EOF

sudo pm2 delete cubething.dev 2> /dev/null
sudo pm2 start "$PWD"/run.sh --name cubething.dev
sudo pm2 save
