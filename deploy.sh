#!/bin/bash

if [[ -n $1 ]]; then
	PWD="$1"
else
	PWD=$(pwd)
fi

MAIN="$PWD"/main.ts
GIT_REVISION=$(git rev-parse HEAD)

echo $MAIN


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
