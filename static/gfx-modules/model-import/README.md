---
title: Model Import Test
publishedAt: 4/13/23
snippet: A simple post to test WASM builds and model importing.
---

## Controls

- WASD to move
- Space goes up
- Shift goes down
- Click and drag to rotate the camera
- Escape ends the simulation

## About

This is a simple test module for my rendering engine [Sundile](https://github.com/ada-x64/sundile_rs).

There are about 100 cubes here, rotated at various angles and efficiently instantiated.
Currently there is no ECS, so the scene is static.

The simulation is running on WGPU (translated into WebGL2) in an iframe.

I plan on doing a lot more of this.
