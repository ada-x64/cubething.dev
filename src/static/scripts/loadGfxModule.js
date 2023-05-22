// Import the built target from wasm-pack,
// then attempt to run the main function.
// If anything goes wrong, destroy the canvas
// and make the troubleshooting section visible.
export default function loadGfx(src) {
  import(src).then((mod) =>
    mod.default().then((_) => {
      try {
        mod.wasm_main();
      } catch (e) {
        console.error(e);
        document
          .querySelector(".troubleshooting")
          .style.setProperty("display", "");
        document.querySelector(".logs").textContent = JSON.stringify(
          log,
          null,
          "\t"
        );
        document.querySelector("canvas").remove();
      }
    })
  );
}
