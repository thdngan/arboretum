---
title: difference between ∂, δ, d and Δ
date: 2022-09-11
tags:
  - notes
draft: false
---

**`Δ` (capital delta)**
This one’s all about change — like how your coffee level changes from “full” to “oops it’s gone.” Mathematically, it's a difference between two values _Δt = t2 - t1_.

**`d` (lowercase d)**
This little guy means an 'infinitesimal' change — like, _really_ tiny. It shows up in derivatives like _dy/dx_ and plays well with limits. It’s the math version of zooming in so far you can’t even see the change, but you know it’s there. More formally, it's tied to [differential forms](http://en.wikipedia.org/wiki/Differential_form), but let's not get lost in that forest just yet 🌲.

**`∂` (curly d, aka partial derivative)**  
Ah, the fancy cousin of `d`. You’ll usually see this in multivariable calculus, where life gets complicated and you have to hold some variables constant while you poke at others. Basically:  

    *"What happens if I nudge just this one thing and freeze everything else?"*


%% Perfect for modeling chaotic systems... or your morning routine. %%

**`δ` (lowercase delta)**  
This one wears many hats. In the calculus of variations, it's used to represent a _variation_ — a tiny tweak in a function’s form, not just its value. So essentially:

    *"What happens if I tweak the whole path slightly?"*

You’ll also see it in **Dirac’s delta function** (δ(x)), which is not a function in the traditional sense but a mathematical object that’s zero everywhere except at one point and integrates to 1. So yeah, it’s not just a smaller version of `Δ` — it’s its own weird and wonderful thing.
