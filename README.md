# cubething.dev

This is the source code for [cubething.dev](https://cubething.dev), my personal website.

It's built with Deno. It includes web graphics with WASM.

## Running

```bash
cd src/
deno cache -r main.ts
deno task start
```

## Testing Deployment

```bash
gh extension install https://github.com/nektos/gh-act
gh act -a $AUTHORIZED_USER -s GITHUB_TOKEN
```
