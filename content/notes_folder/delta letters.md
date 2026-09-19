---
title: difference between ∂, δ, d and Δ
date: 2022-09-11
tags:
  - notes
draft: false
---

**`Δ` (capital delta)**: change, like _Δt = t2 - t1_, might also get used for things that have nothing to do with change, most confusingly the Laplacian ($\Delta f = \nabla^2 f$), and the discriminant of a polynomial. Context sorts out which one we're looking at.

**`d` (lowercase d)**: 'infinitesimal' change, shows up in derivatives like _dy/dx_ and plays well with limits. More formally, tied to [differential forms](https://en.wikipedia.org/wiki/Differential_form).

**`∂` (curly d, aka partial derivative)** is... essentially the fancy cousin of `d`. Usually seen in multivariable calculus, where stuff gets too complicated and you have to hold some variables constant while you poke at others.

**`δ` (lowercase delta)** wears many hats. In the calculus of variations, it's used to represent a _variation_: a tiny tweak in a function’s form, not just its value. For example, $\delta S=0$ gives you the principle of least action in physics, though 'least' oversells it, since the condition only says the action is stationary and a saddle point satisfies it just as well. Mechanics runs the same idea as a virtual displacement $\delta \mathbf{r}$, an imagined nudge of the coordinates at frozen time. Either way it's a different thing from a differential (like `d`) or a finite change (like `Δ`). In thermodynamics, δ shows up in equations like `dU = δQ + δW`, where it marks an inexact differential, because heat and work depend on the path taken, not just the endpoints (Mind the sign convention there: it counts W as work done on the system, and the engineering one might flip it to `dU = δQ - δW` with W done by the system). In real analysis, it’s the δ in epsilon-delta proofs. And then there's the Dirac’s delta function (δ(x)), zero everywhere except at one point and integrating to 1, which is precisely why it can't be a function: anything vanishing everywhere except a single point integrates to 0. It's a distribution, an object defined by what it does under an integral sign against a test function. Also worth noting: δ sometimes shows up in functional derivatives, and then in completely different contexts like the Kronecker delta, which is basically a 1-or-0 identity switch.
