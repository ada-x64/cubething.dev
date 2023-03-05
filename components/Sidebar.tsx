import { ComponentChild, ComponentChildren } from "preact";

export default function Sidebar({
  icon,
  order,
  ariaLabel,
  id,
  children,
}: {
  icon: ComponentChild;
  order: number;
  ariaLabel: string;
  id: string;
  children: ComponentChildren;
}) {
  return (
    <>
      <nav
        aria-label={ariaLabel}
        class={`h-auto w-24 px-4 text-xl font-sans pt-4 sticky top-0 self-start order-${order} visible opacity-100 transition-all ease-linear`}
        tabIndex={0}
        id={id}
      >
        <div class="flex flex-col flex-shrink-0 items-center pb-4 mb-4 border-b border-zinc-700 w-full text-4xl transition-all ease-linear">
          {icon}
        </div>
        <div class="flex flex-col">{children}</div>
      </nav>
    </>
  );
}
