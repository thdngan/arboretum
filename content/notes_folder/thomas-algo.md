---
title: Thomas algorithm
date: 2025-07-31
tags:
  - notes
  - physics
  - modelling
---
Solves a tridiagonal linear system in $O(N)$ operations (Gaussian elimination: $O(N^3)$):

$$
a_i x_{i-1} + b_i x_i + c_i x_{i+1} = d_i, \qquad i = 1 \dots N
$$
where:
- $x_i$: unknowns,
- $a_i$, $b_i$, $c_i$: lower, main and upper diagonal coefficients ($a_1 = c_N = 0$),
- $d_i$: right-hand side.

Forward sweep, starting from $c'_1 = c_1/b_1$ and $d'_1 = d_1/b_1$:

$$
c'_i = \frac{c_i}{b_i - a_i c'_{i-1}}, \qquad d'_i = \frac{d_i - a_i d'_{i-1}}{b_i - a_i c'_{i-1}}
$$

Back substitution, starting from $x_N = d'_N$:

$$
x_i = d'_i - c'_i x_{i+1}
$$

No pivoting, so it is only safe when the matrix is diagonally dominant ($|b_i| > |a_i| + |c_i|$), as in discretised diffusion. Used in implicit [[diffusion]] schemes such as [[crank-nicolson|Crank-Nicolson]], and for cubic splines.
