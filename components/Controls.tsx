const controls = [
  {
    name: "todo",
  },
];

export default function Controls() {
  return (
    <>
      {/*TODO: Proper tag for this? Was thinking "menu" but that's just "ul"*/}
      <div class="h-auto w-24 px-4 bg-zinc-700 text-xl font-sans pt-8">
        <div class="flex items-center">
          <div class="flex flex-col items-center justify-center">
            <div class="">
              <div class="flex flex-col">
                {controls.map((item) => (
                  <button
                    key={item.name}
                    class="" //todo
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
