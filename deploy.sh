#!/bin/bash

PWD=$1

echo "$PWD"/run.sh << EOF

MAIN="$PWD"/main.ts
export DENO_PORT=3000

GIT_REVISION=\$(git rev-parse HEAD)
export DENO_DEPLOYMENT_ID=\${GIT_REVISION}

deno cache "\$MAIN"
deno run -A "\$MAIN"

EOF

sudo pm2 delete cubething.dev
sudo pm2 start "$PWD"/run.sh --name cubething.dev
sudo pm2 save
