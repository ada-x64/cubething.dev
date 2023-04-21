FROM denoland/deno

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app

COPY . .

RUN deno cache main.ts --import-map=import_map.json --lock=deno.lock

EXPOSE 8000

CMD ["run", "-A", "main.ts"]
