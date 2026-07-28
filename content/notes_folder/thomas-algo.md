---
title: Thomas algorithm
date: 2025-07-31
tags:
  - notes
  - physics
  - modelling
---
Also called the tridiagonal matrix algorithm, or TDMA. It solves systems where each equation only involves an unknown and its two neighbours:

$$
a_i x_{i-1} + b_i x_i + c_i x_{i+1} = d_i, \qquad i = 1 \dots N
$$

$$
\begin{pmatrix}
b_1 & c_1 & & & \\
a_2 & b_2 & c_2 & & \\
 & a_3 & b_3 & \ddots & \\
 & & \ddots & \ddots & c_{N-1}\\
 & & & a_N & b_N
\end{pmatrix}
\begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ \vdots \\ x_N\end{pmatrix}
=
\begin{pmatrix} d_1 \\ d_2 \\ d_3 \\ \vdots \\ d_N\end{pmatrix}
$$

Discretizing a second derivative in 1D gives you this shape, so implicit schemes for [[diffusion]] produce one ([[crank-nicolson|Crank-Nicolson]] does), and so does fitting a cubic spline.

Gaussian elimination on a general matrix is $\mathcal{O}(N^3)$, but here almost every entry is already zero and eliminating the sub-diagonal doesn't create new ones. What's left is two sweeps. Forward, starting from $c'_1 = c_1/b_1$ and $d'_1 = d_1/b_1$:

$$
c'_i = \frac{c_i}{b_i - a_i c'_{i-1}}, \qquad d'_i = \frac{d_i - a_i d'_{i-1}}{b_i - a_i c'_{i-1}}
$$

Backward, starting from $x_N = d'_N$:

$$
x_i = d'_i - c'_i x_{i+1}
$$

So $\mathcal{O}(N)$ rather than $\mathcal{O}(N^3)$, and the matrix never gets stored, only the four vectors. `scipy.linalg.solve_banded` will do it.

There's no pivoting, and every division is by $b_i - a_i c'_{i-1}$, which nothing stops from being very small. It's safe if the matrix is diagonally dominant, $|b_i| \ge |a_i| + |c_i|$, which discretized diffusion gives us for free. Adding [[advection]] eats into that margin.

# On Mars

Both modes of the solver in [[Mars hydrogen escape|the escape model]] end in a Thomas sweep. The time-dependent one is [[crank-nicolson|Crank-Nicolson]] and needs one per timestep. The steady-state one sets $\partial n/\partial t = 0$ and needs a single solve for the whole equilibrium profile, with the GCM density and the escape velocity at the exobase going into the first and last rows.

One sweep per atmospheric column, about 2048 columns per output time, over two Martian years.
