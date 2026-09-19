---
title: diffusion
tags:
  - notes
  - physics
  - chemistry
date: 2024-05-14
---
Diffusion is net transport down a concentration gradient, produced by random motion rather than by anything pushing. Individual molecules move in every direction. There are simply more of them on the crowded side, so more cross the boundary from that side than from the other.

Fick's law writes the flux as $J = -D\,\partial c/\partial x$, and putting that together with conservation gives the diffusion equation, $\partial c/\partial t = D\,\partial^2 c/\partial x^2$. The consequence of that second derivative is that spreading goes as $\sqrt{Dt}$ rather than as $t$. Doubling the distance costs four times the time, which is why diffusion works across a cell membrane and is useless for moving anything across a room. Stirring your coffee does not speed up diffusion, it replaces it with [[advection]].

[[heat|Heat]] obeys the same equation with a thermal diffusivity in place of $D$, and so does momentum in a viscous fluid.
