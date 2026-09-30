---
title: Crank-Nicolson scheme
tags:
  - notes
  - physics
  - modelling
date: 2025-07-31
---
Time-stepping scheme for the [[diffusion]] equation $\partial n/\partial t = D\,\partial^2 n/\partial z^2$, the average of the explicit and implicit schemes:

$$
\frac{n_i^{k+1}-n_i^{k}}{\Delta t} = \frac{D}{2}\left[\frac{n_{i+1}^{k+1}-2n_i^{k+1}+n_{i-1}^{k+1}}{\Delta z^2} + \frac{n_{i+1}^{k}-2n_i^{k}+n_{i-1}^{k}}{\Delta z^2}\right]
$$
where:
- $n_i^k$: value at grid point $i$ and timestep $k$,
- $\Delta z$: grid spacing,
- $\Delta t$: timestep,
- $D$: diffusion coefficient.

Stable for any timestep and second-order accurate in time and space, but long timesteps leave slowly decaying oscillations near sharp gradients. Each timestep is a tridiagonal system, solved with the [[thomas-algo|Thomas algorithm]]. The explicit scheme is only stable for $\Delta t \le \Delta z^2/2D$.
