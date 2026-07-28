---
title: Crank-Nicolson scheme
tags:
  - notes
  - physics
  - modelling
date: 2025-07-31
---
A way of stepping a [[diffusion]] equation forward in time.

$$
\frac{\partial n}{\partial t} = D\frac{\partial^2 n}{\partial z^2}
$$

Put this on a grid, with $n_i^k$ the value at height $z_i$ and time $t_k$. The second derivative in space becomes $(n_{i+1} - 2n_i + n_{i-1})/\Delta z^2$, and what's left to decide is which time level you write that at. The old one gives you $n_i^{k+1}$ directly but only works if $\Delta t \le \Delta z^2/2D$, which is impractical on a fine grid. The new one has no timestep limit but is first order in time and damps gradients more than it should.

Crank-Nicolson uses both, with weight $1/2$ each:

$$
\frac{n_i^{k+1}-n_i^{k}}{\Delta t} = \frac{D}{2}\left[\frac{n_{i+1}^{k+1}-2n_i^{k+1}+n_{i-1}^{k+1}}{\Delta z^2} + \frac{n_{i+1}^{k}-2n_i^{k}+n_{i-1}^{k}}{\Delta z^2}\right]
$$

That's the trapezoidal rule, so the scheme sits at $t_{k+1/2}$ and comes out second order in $\Delta t$ as well as $\Delta z$, still with no timestep limit. In exchange each step needs a linear system solved. Row $i$ only involves $n_{i-1}$, $n_i$ and $n_{i+1}$, so the matrix is tridiagonal and the [[thomas-algo|Thomas algorithm]] does it in $\mathcal{O}(N)$.

Having no timestep limit doesn't mean no trouble. The scheme is A-stable but not L-stable, so the shortest wavelengths the grid holds oscillate instead of decaying, and you get wiggles near steep gradients.

# On Mars

In [[Mars hydrogen escape|the escape model]] the hydrogen flux picks up two extra terms, gravitational settling and thermal diffusion:

$$
\frac{\partial n}{\partial t} = -\frac{\partial \phi}{\partial z}, \qquad \phi = -D\frac{dn}{dz} - D\left(\frac{1}{H} + \frac{1+\alpha_T}{T}\frac{dT}{dz}\right)n
$$

The coefficients get longer but the matrix stays tridiagonal. The bottom boundary is the density handed up from the GCM, the top is the effusion velocity at the exobase. Going implicit matters here because $D$ goes like $1/n_\text{tot}$, so it grows by orders of magnitude toward the top of the column and the explicit limit up there would be milliseconds against a 10 s timestep.
