import { ComponentChild, ComponentChildren } from "preact";

export default function Sidebar({
  icon,
  order,
  ariaLabel,
  id,
  children,
  justify,
}: {
  icon: ComponentChild;
  order: number;
  ariaLabel: string;
  id: string;
  children: ComponentChildren;
  justify: "left" | "right";
}) {
  return (
    <>
      <nav
        aria-label={ariaLabel}
        class={`h-screen flex flex-auto px-4 text-xl font-sans pt-4 sticky top-0 self-start order-${order} opacity-100 transition-all ease-linear hover:opacity-100 justify-${justify}`}
        tabIndex={0}
        id={id}
      >
        <div class="w-24">
          <div class="flex flex-col flex-shrink-0 items-center pb-4 mb-4 border-b border-zinc-700 w-full text-4xl transition-all ease-linear">
            {icon}
          </div>
          <div class="flex flex-col">{children}</div>
        </div>
        {" "}
      </nav>
    </>
  );
}
