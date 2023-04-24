import { BorderColor, TimeStyle, TwClass } from "@/deps/styles.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

// enum Level {
//   LOG,
//   WARN,
//   ERROR,
//   DEBUG,
//   INFO,
// }
//
// type LogTargetWrapper = {
//   timestamp: Date;
//   level: Level;
//   args: any[];
// };
//
// type LogWrapper = LogTargetWrapper[];
//
// function wrapLogs() {
//   const log: LogWrapper = [];
//
//   const mklog = (console_fn: typeof console.log, level: Level) => {
//     return (...args: any[]) => {
//       log.push({
//         timestamp: new Date(),
//         level,
//         args,
//       });
//       console_fn(...args);
//     };
//   };
//
//   console.log = mklog(console.log, Level.LOG);
//   console.warn = mklog(console.warn, Level.WARN);
//   console.error = mklog(console.error, Level.ERROR);
//   console.debug = mklog(console.debug, Level.DEBUG);
//   console.info = mklog(console.info, Level.INFO);
// }

enum StreamState {
  Unloaded,
  Loading,
  Loaded,
}

export default function GfxIframe({
  title,
  slug,
  width,
  height,
}: {
  title: string;
  slug: string;
  width: number;
  height: number;
}) {
  const importModuleSrc = `${globalThis.origin}/scripts/loadGfxModule.js`;
  const targetModuleSrc = `${globalThis.origin}/gfx-modules/${slug}/target.js`;
  // const importModuleScript = `
  //           let origin = window.location.origin;
  //           import(${importModuleSrc})
  //               .then((module) => module.default(${targetModuleSrc}));
  //       `;

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
    console.log("streamState = ", streamState);
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
