---
title: Zero-dimensional Energy Balance Model
date: 2023-02-12
tags:
  - climate
  - notebooks
  - planetary-science
  - notes
---
%% context: one or two sentences in your own words %%

Global mean energy budget of a planet, treated as one uniform, well-mixed sphere:

$$
C\,\frac{dT}{dt} = \frac{S_0}{4}\,(1-\alpha) - \varepsilon\sigma T^4
$$
where:
- $T$: global mean surface temperature (K),
- $C$: heat capacity per unit area (J m⁻² K⁻¹),
- $S_0$: solar constant (≈ 1361 W m⁻² for Earth), divided by 4 for the ratio of the planet's cross-section to its surface area,
- $\alpha$: planetary [[albedo]] (≈ 0.3 for Earth),
- $\varepsilon$: effective emissivity (≈ 0.61 gives Earth's 288 K),
- $\sigma$: [[Stefan-Boltzmann law|Stefan-Boltzmann]] constant.

Equilibrium ($dT/dt = 0$):

$$
T = \left[\frac{S_0\,(1-\alpha)}{4\,\varepsilon\sigma}\right]^{1/4}
$$

With latitude: [[ebm1d|one-dimensional energy balance model]].
