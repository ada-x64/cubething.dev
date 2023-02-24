---
title: Hello, World
publishedAt: 2022-02-20 14:28:00
snippet: This is an excerpt of my first blog post.
---

# Hello, world!

my name is ada mandala and this is fucking _blog_

## here are some code blocks with langauges i use often

```rust
#[entry]
fn main() -> ! {
    if let (Some(p), Some(cp)) = (stm32::Peripherals::take(), Peripherals::take()) {
        // Constrain clocking registers
        let mut flash = p.FLASH;
        let mut rcc = p.RCC.configure().sysclk(48.mhz()).freeze(&mut flash);
        let gpioa = p.GPIOA.split(&mut rcc);

        /* (Re-)configure PA7 as output */
        let ws_data_pin =
            cortex_m::interrupt::free(move |cs| gpioa.pa7.into_push_pull_output_hs(cs));

        let timer = Timer::tim1(p.TIM1, MegaHertz(3), &mut rcc);

        // Get delay provider
        let mut delay = Delay::new(cp.SYST, &mut rcc);

        let mut ws = Ws2812::new(timer, ws_data_pin);
        let mut data: [RGB8; 3] = [RGB8::default(); 3];
        let empty: [RGB8; 3] = [RGB8::default(); 3];

        data[0] = RGB8 {
            r: 0,
            g: 0,
            b: 0x10,
        };
        data[1] = RGB8 {
            r: 0,
            g: 0x10,
            b: 0,
        };
        data[2] = RGB8 {
            r: 0x10,
            g: 0,
            b: 0,
        };

        loop {
            ws.write(data.iter().cloned()).unwrap();
            delay.delay_ms(10 as u16);
            ws.write(empty.iter().cloned()).unwrap();
            delay.delay_ms(10 as u16);
        }
    }
    loop {
        continue;
    }
}
```

```tsx
import Nav from "@/components/Nav.tsx";
import { ComponentChildren } from "preact";
import Controls from "@/components/Controls.tsx";
import { Head } from "$fresh/src/runtime/head.ts";

export default function Layout({
  route,
  children,
}: {
  route: string;
  children: ComponentChildren;
}) {
  function title() {
    const sliced = route.slice(1);
    const title = sliced.length > 0 ? sliced : "cubething";
    return (
      <h1 class="text-5xl text-center pb-8 font-bold font-header text-rose-500 dark:text-amber-500 lowercase">
        {`< ${title} />`}
      </h1>
    );
  }
  return (
    <>
      <Head>
        <link rel="stylesheet" href="style/svg.css" />
      </Head>

      <main class="dark:bg-zinc-900 dark:text-zinc-100 ">
        <div class="mx-auto flex max-w-screen-lg min-h-screen">
          <Nav route={route} />
          <article class="max-w-screen-md px-16 pt-8 md:mx-auto">
            {title()}
            {children}
          </article>
          <Controls />
        </div>
      </main>
    </>
  );
}
```

```bash
#!/bin/bash
fileType="$(file "$1" | grep -o 'text')"
if [ "$fileType" == 'text' ]; then
    echo -en "\033[1m"
else
    echo -en "\033[31m"
fi
cat $1
echo -en "\033[0m"
```

## here's some lorem ipsum to fill out the post :)

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
