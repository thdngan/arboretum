---
title: difference between ∂, δ, d and Δ
date: 2022-09-11
tags:
  - notes
draft: false
---
- **Δ (capital delta)**: finite change ($\Delta t = t_2 - t_1$), also the Laplacian ($\Delta f = \nabla^2 f$) and the discriminant of a polynomial
- **d**: infinitesimal change, as in the derivative $dy/dx$ (formally, [differential forms](https://en.wikipedia.org/wiki/Differential_form))
- **∂ (curly d)**: partial derivative $\partial f/\partial x$ (other variables held fixed), also the boundary of a region
- **δ (lowercase delta)**:
    - variation in the calculus of variations (principle of least action: $\delta S = 0$, strictly a stationary point)
    - virtual displacement $\delta \mathbf{r}$ in mechanics
    - inexact differential in thermodynamics: $dU = \delta Q + \delta W$, with $W$ the work done on the system (engineering convention: $dU = \delta Q - \delta W$)
    - the δ in epsilon-delta definitions of limits and continuity
    - Dirac delta $\delta(x)$: a distribution, with $\int f(x)\,\delta(x)\,dx = f(0)$
    - Kronecker delta $\delta_{ij}$: 1 if $i = j$, 0 otherwise
    - functional derivatives
