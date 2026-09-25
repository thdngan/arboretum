---
title: Layer model with greenhouse effect
date: 2022-09-10
tags:
  - climate
  - notebooks
  - planetary-science
  - writings
---



## The model

![[images/climate modeling/greenhouseeffect1.svg]]
The sketch above depicts the previously described [[posts/naked planet climate model|first basic climate model with bare-rock surface]]. The incoming energy budget is represented by $L(1 - \alpha)/4$ in the figure, where L is the solar constant, α is the albedo of Earth, and number 4 represents the geometry of the system (we're considering the entire planet, so it's a sphere, keep this in mind because we'll deal with different problems that consider different conditions). This energy would be balanced by the energy that leaves the system, as indicated by $\epsilon \sigma T^4_{ground}$, where ε, σ and T are the emissivity of Earth, the [[Stefan-Boltzmann law|Stefan-Boltzmann]] constant, and the Earth's ground temperature, respectively.

However, we discovered that the given model is rather cold in comparison to real-world values. This is due mostly to the presence of [[posts/greenhouse gases|greenhouse gases]] in the atmosphere, which absorb and emit radiation as well.

For the sake of simplicity, imagine all of the gases that absorb and emit as a pane of glass in the atmosphere. In this layer model, the atmosphere is assumed to be a blackbody in the infrared that absorbs and emits all frequencies of infrared light.

![[images/climate modeling/greenhouseeffect2.svg]]
We will also make the following assumptions for this model:

- The pane of glass does not absorb sunlight.
- The glass absorbs infrared radiated by the earth.
- The glass pane itself emits infrared light in both directions, up and down, according to its own temperature T<sub>a</sub>.

We can then obtain some formulae for the various types of energy in the model:

- $\dfrac{L(1 - \alpha)}{4}$ is the incoming energy budget that the ground absorbs.
<br></br>
- $\epsilon \sigma T^4_{g}$ represents energy emitted by the ground.
<br></br>
- $\epsilon \sigma T^4_a$ represents energy absorbed and emitted by the pane of glass (assuming that the glass has good [[blackbody|blackbody]] properties, ε ≈ 1)

Then we get the following table for the energy budgets that enter and exit the system:

|Energy budget|IN|OUT|
|------|:----:|:----:|
|Ground|$\dfrac{L(1 - \alpha)}{4}+\epsilon \sigma T^4_a$|$\epsilon \sigma T^4_g$|
|Atmosphere|$\epsilon \sigma T^4_g$|$2\epsilon \sigma T^4_a$|

To get the energy budget for the Earth system overall, we could add them up and obtain:

$$
\dfrac{L(1 - \alpha)}{4} = \epsilon \sigma T^4_a
$$

There is a simpler way though: build one general budget for the whole system. We draw a line above the atmosphere representing the border to space (as depicted in the figure), and the results come out the same as what we got before.

|Energy budget|IN|OUT|
|------|:----:|:----:|
|Overall System|$\dfrac{L(1 - \alpha)}{4}$|$\epsilon \sigma T^4_a$|

This is still not close to reality, of course. The atmosphere can't be treated as a blackbody in the infrared that absorbs and emits every frequency. Gases absorb infrared light selectively, and most gases in the atmosphere don't interact with IR light at all.

## Problems:

### How hot is The Moon?
The layer model assumes that the temperature of the body in space is all the same. This isn't really very accurate, as you know that it's colder at the poles than it is at the equator. For a bare rock with no atmosphere or ocean, like the moon, the situation is even worse, because fluids like air and water are how [[heat]] is carried around on the planet. So let's make the other extreme assumption, that there is no [[heat]] transport on a bare rock like the moon. Assume for comparability that the albedo of this world is 0.33, and the solar constant is 1350 Watts/m2, same as for Earth.

a) What would be the equilibrium temperature of the surface of the moon, where influx equals outflux, on the equator, at local noon, when the sun is directly overhead, in Kelvins?

![[images/climate modeling/greenhouseeffect3.svg]]
*Since the assumption is that the moon's surface is bare rock with no atmosphere or ocean, we can use the simple model for bare-rock layer on the equator at local noon (where the location in consideration is perpendicular to the sunlight direction). As we only want to find the temperature at the equator, not on the whole spherical surface, we can ignore the geometric quantity.*

*We have: L = 1350 W/m<sup>2</sup>, α = 0.33.*

*The equilibirum equation for energy:*

$$
E_{in} = E_{out}
$$
$$
L(1-\alpha)=\epsilon \sigma T^4_g
$$
$$
T_g\approx 355.4
$$
b) What would be the equilibrium temperature, where energy outflow equals energy inflow, on the moon at night, in Kelvins?

*At night there is no sunlight directed towards the surface, so basically no energy flow. The temperature would be 0K.*

### A Stronger Greenhouse Effect
Insert another atmospheric layer into the model, just like the first one.
![[images/climate modeling/greenhouseeffect4.svg]]
*Arrow a represents the energy inflow and arrow f represents the energy outflow of the overall system. We have:*
$$
\dfrac{L(1-\alpha)}{4}=\epsilon \sigma T^4_{layer2}
$$
$$
T_{layer2}=254.1K
$$
*Similarly, the energy budget of layer 2 at equilibrium:*
$$
\epsilon \sigma T^4_{layer1}=2\epsilon \sigma T^4_{layer2}
$$
$$
(\dfrac{T_{layer1}}{T_{layer2}})^4=2
$$
$$
\dfrac{T_{layer1}}{T_{layer2}}=2^{1/4}
$$
*Energy budget for layer 1:*
$$
\epsilon \sigma(T^4_g+T^4_{layer2})=2\epsilon \sigma T^4_{layer1}
$$
$$
\dfrac{T^4_g+T^4_{layer2}}{T^4_{layer1}}=2
$$
$$
(\dfrac{T_g}{T_{layer1}})^4=2-(\dfrac{T_{layer2}}{T_{layer1}})^4=2-\dfrac{1}{2}=\dfrac{3}{2}
$$
### Nuclear Winter
Go back to the 1-layer model, but change it so that the atmospheric layer absorbs visible light rather than allowing to pass through.
![[images/climate modeling/greenhouseeffect5.svg]]
This could happen if the upper atmosphere were filled with dust. For simplicity, assume that the albedo of the earth remains at 30%, even though in the real world it might change with a dusty atmosphere. What is the ratio of T<sub>g</sub> / T<sub>a</sub> in this case?

*The answer is 1. We can see that the energy budget for the Earth at equilibrium would be:*
$$
\epsilon \sigma T^4_g=\epsilon \sigma T^4_a
$$
*So apparently,* $T_g=T_a$.