export default function importGfxModule(src) {
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
