---
title: difference between ∂, δ, d and Δ
date: 2022-09-11
tags:
  - notes
draft: false
---

**`Δ` (capital delta)** is all about change — like how your vending machine espresso goes from “full” to “oops, it’s gone” before your 7 A.M. class.  Mathematically, it's a difference between two values _Δt = t2 - t1_.

**`d` (lowercase d)** means an 'infinitesimal' change — like, _really_ tiny. It shows up in derivatives like _dy/dx_ and plays well with limits. It’s the math version of zooming in so far you can’t even see the change, but you know it’s there. More formally, it's tied to [differential forms](http://en.wikipedia.org/wiki/Differential_form), but let's not get lost in that forest just yet 🌲.

**`∂` (curly d, aka partial derivative)** is... essentially the fancy cousin of `d`. You’ll usually see this in multivariable calculus, where life gets complicated and you have to hold some variables constant while you poke at others. Basically *"What happens if I nudge just this one thing and freeze everything else?"*.


%% Perfect for modeling chaotic systems... or your morning routine. %%

**`δ` (lowercase delta)** wears many hats. In the calculus of variations, it's used to represent a _variation_ — a tiny tweak in a function’s form, not just its value. For example, $\delta S=0$ is used in the principle of least action in physics. This is not the same as a differential (like `d`) or a finite change (like `Δ`), but rather a virtual displacement — you're asking, *"What happens if I tweak the whole path slightly?"*. In thermodynamics, δ shows up in equations like `dU = δQ + δW`, where it's used for imperfect differentials — because heat and work depend on the path taken, not just the endpoints. In real analysis, it’s that δ in epsilon-delta proofs, the one you met in your first real analysis class and promptly forgot. And then there's the Dirac’s delta function (δ(x)), which is not a function in the traditional sense but a mathematical object that’s zero everywhere except at one point and integrates to 1. Also worth noting: δ sometimes shows up in functional derivatives, and then in completely different contexts like the Kronecker delta, which is basically a 1-or-0 identity switch. 


