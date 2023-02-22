import DarkModeToggle from "@/islands/DarkModeToggle.tsx";

export default function Controls() {
  return (
    <>
      {/*TODO: Proper tag for this? Was thinking "menu" but that's just "ul"*/}
      <div class="h-auto w-24 px-4 bg-zinc-700 text-xl font-sans pt-8">
        <div class="flex flex-col items-center justify-center">
          <DarkModeToggle />
        </div>
      </div>
    </>
  );
}
