import { BorderColor, TimeStyle, TwClass } from "@/deps/styles.ts";
import { useLayoutEffect, useState } from "preact/hooks";
import { GfxModule } from "../deps/gfx-module.ts";

enum StreamState {
  Unloaded,
  Loading,
  Loaded,
}

export default function GfxCanvas({ module }: { module: GfxModule }) {
  const importModuleSrc = `${globalThis.origin}/scripts/loadGfxModule.js`;
  const targetModuleSrc = module.modulePath;

  const [streamState, setStreamState] = useState(StreamState.Unloaded);
  const [inner, setInner] = useState(<></>);
  const loadButton = (
    <button
      id="sundile-load-button"
      class={TwClass(["w-full", TimeStyle])}
      onClick={() => {
        setStreamState(StreamState.Loading);
      }}
    >
      (click to load)
    </button>
  );
  // lazy spinner. might switch to typewriter "..."
  const spinner = (
    <div class={TwClass(["w-full", "animate-spin", "font-xxl"])}>◌</div>
  );

  useLayoutEffect(() => {
    switch (streamState) {
      case StreamState.Unloaded:
        setInner(loadButton);
        break;
      case StreamState.Loading:
        setInner(spinner);
        import(importModuleSrc).then((module) => {
          setStreamState((_) => StreamState.Loaded);
          module.default(targetModuleSrc);
        });
        break;
      case StreamState.Loaded:
        setInner(<></>);
        break;
    }
  }, [streamState]);

  return (
    <div
      id="sundile-canvas-wrapper"
      class={TwClass([
        "w-[640px]",
        "h-[480px]",
        "flex",
        "text-center",
        "rounded-lg",
        BorderColor,
        "border-1",
        "my-4",
      ])}
    >
      {inner}
    </div>
  );
}
