---
tags:
  - notes
  - physics
  - chemistry
  - planetary-science
title: advection
date: 2022-08-01
---
Advection is transport of something by the bulk motion of the fluid it sits in: [[heat]], moisture, salt, pollutants, anything that rides along. Float down a river and you are being advected. You are not swimming anywhere, the water is going somewhere and you are in it.

In an equation it is the $\mathbf{u}\cdot\nabla c$ term, the velocity field dotted into the gradient of whatever is being carried. It moves structure around without smoothing it, so a sharp front stays sharp. [[diffusion]] is the other transport term and does the opposite. Their ratio is the Péclet number, and which one dominates decides whether you can get away with ignoring the other.

It is also the awkward term numerically. Centred differences on an advection term oscillate, upwinding kills the oscillation by adding numerical diffusion that is not physically there, and the [[crank-nicolson|implicit schemes]] that make [[diffusion]] easy do not buy you the same stability here.
