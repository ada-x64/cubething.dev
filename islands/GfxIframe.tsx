import { Head } from "$fresh/src/runtime/head.ts";

enum Level {
  LOG,
  WARN,
  ERROR,
  DEBUG,
  INFO,
}

type LogTargetWrapper = {
  timestamp: Date;
  level: Level;
  args: any[];
};

type LogWrapper = LogTargetWrapper[];

function wrapLogs() {
  const log: LogWrapper = [];

  const mklog = (console_fn: typeof console.log, level: Level) => {
    return (...args: any[]) => {
      log.push({
        timestamp: new Date(),
        level,
        args,
      });
      console_fn(...args);
    };
  };

  console.log = mklog(console.log, Level.LOG);
  console.warn = mklog(console.warn, Level.WARN);
  console.error = mklog(console.error, Level.ERROR);
  console.debug = mklog(console.debug, Level.DEBUG);
  console.info = mklog(console.info, Level.INFO);
}

// You must define MODULE_SRC before loading this.
function loadModule() {
  import(src).then((init) => {
    console.log(init);
    try {
      init.default().then((finalize) => finalize().run());
    } catch (e) {
      // On failure, show the troubleshooting section and remove the canvas.
      console.error(e);
      document
        .querySelector(".troubleshooting")
        .style.setProperty("display", "");
      document.querySelector(".logs").textContent = JSON.stringify(
        log,
        null,
        "\t",
      );
      document.querySelector("canvas").remove();
    }
  });
}

export default function GfxIframe({
  title,
  slug,
  width,
  height,
  origin,
}: {
  title: string;
  slug: string;
  width: number;
  height: number;
  origin: string;
}) {
  wrapLogs();
  const importModuleScript = `
            let origin = window.location.origin;
            import(\`\${origin}/scripts/importGfxModule.js\`)
                .then((module) => module.default(\`\${origin}/gfx-modules/${slug}/target.js\`));
        `;
}
