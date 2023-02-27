import DarkModeToggle from "@/islands/DarkModeToggle.tsx";

export default function Controls() {
  return (
    <>
      {/*TODO: Proper tag for this? Was thinking "menu" but that's just "ul"*/}
      <div class="h-auto w-24 px-4 text-xl font-sans pt-4 sticky top-0 self-start">
        <div
          class="flex flex-col items-center justify-center text-4xl transition-all ease-linear "
          id="themeBtn"
        >
          <DarkModeToggle />
        </div>
      </div>
    </>
  );
}
