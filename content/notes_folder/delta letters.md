---
title: difference between ∂, δ, d and Δ
date: 2022-09-11
tags:
  - notes
draft: false
---

**`Δ` (capital delta)**: change, like _Δt = t2 - t1_.

**`d` (lowercase d)**: 'infinitesimal' change, shows up in derivatives like _dy/dx_ and plays well with limits. More formally, tied to [differential forms](http://en.wikipedia.org/wiki/Differential_form).

**`∂` (curly d, aka partial derivative)** is... essentially the fancy cousin of `d`. Usually seen in multivariable calculus, where stuff gets too complicated and you have to hold some variables constant while you poke at others.

**`δ` (lowercase delta)** wears many hats. In the calculus of variations, it's used to represent a _variation_: a tiny tweak in a function’s form, not just its value. For example, $\delta S=0$ is used in the principle of least action in physics. This is not the same as a differential (like `d`) or a finite change (like `Δ`), but rather a virtual displacement. In thermodynamics, δ shows up in equations like `dU = δQ + δW`, where it's used for imperfect differentials, because heat and work depend on the path taken, not just the endpoints. In real analysis, it’s the δ in epsilon-delta proofs. And then there's the Dirac’s delta function (δ(x)), which is not a function in the traditional sense but a mathematical object that’s zero everywhere except at one point and integrates to 1. Also worth noting: δ sometimes shows up in functional derivatives, and then in completely different contexts like the Kronecker delta, which is basically a 1-or-0 identity switch. 


