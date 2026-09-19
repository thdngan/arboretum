---
title: Naked planet climate model
date: 2022-08-30
tags:
  - climate
  - notebooks
  - planetary-science
  - writings
---


![[images/climate modeling/naked planet climate model.svg]]


The sketch above depicts the most basic types of energy for a simple climate model. We have sunlight coming from the Sun in one direction, towards the Earth. This sunlight would represent the energy entering the climate model of Earth. The energy emitted would be infrared radiation from the Earth. Our planet is assumed to have a naked rock surface, with no consideration given to the effects of atmospheric layers and greenhouse gases, convection, and latent [[heat]] (yet).

From this model we want the temperature of the Earth. The thing we hold onto is equilibrium: the total energy going out equals the total energy coming in.
$$
E_{in} = E_{out}
\tag*{(*)}
$$

The energy coming out of Earth can be calculated using the [[Stefan-Boltzmann law|Stefan-Boltzmann]] formula:
$$
E_{out} = \epsilon\sigma T^4A
\tag*{(1)}
$$
where 
- σ ≈ 5.67 x 10<sup>-8</sup> (Wm<sup>-2</sup>K<sup>-4</sup>) is the [[Stefan-Boltzmann law|Stefan-Boltzmann]] constant,
- T is the Earth's temperature (we are assuming the temperature is the same generally because this is a very simple model)
- A = 4πR<sup>2</sup> is the surface area of the planet (a sphere)
- ε ≈ 1 is the emissivity of the Earth (most condensed matter has pretty good [[blackbody|blackbody]] properties, the **EXCEPTION** for this, which we will consider later in more complex models, is the existence of [[posts/greenhouse gases|greenhouse gases]]).  

For the other side of the equation, we need to calculate the energy coming in from the Sun.
$$
E_{in} = L(1 - \alpha)A
\tag*{(2)}
$$
where
- L ≈ 1350 (W/m<sup>2</sup>) is the power of the Sun per unit area of the planet Earth. It is the brightness of the sunlight as viewed straight on from the Sun to the Earth. However, not all of that energy is absorbed as [[heat]] by the Earth. Some of it is reflected back into space and is never absorbed.
- That fraction is represented in the [[albedo|albedo]] α ≈ 0.3, which indicates the fraction of the sun's radiation reflected by the Earth's surface. So (1 - α) is the fraction absorbed by the surface. A number of 1 indicates that the planet's surface is a perfect mirror, absorbing nothing. A value of 0 implies that the planet's surface is a perfect absorber and does not reflect anything.
- Now what is A here? So we have L(1 - α) in watts per square meter of solar energy arriving, and we need to multiply that by an area to obtain the total energy arriving. It may become more difficult if we consider that the Earth's surface is not completely perpendicular to the direction of sunlight. To determine total energy, we may use a sophisticated integral to sum up all of the Earth's square meters while determining which ones are oblique and get less power of sunlight. However, there is a far simpler approach to achieve this: notice that the portion of light blocked by the planet is represented by the size of the Earth's shadow. So yup, A ≈ πR<sup>2</sup> is the area of the shadow of Earth (shown in the figure).

Now let's substitute (1) and (2) to ($*$):
$$
L(1 - \alpha)\pi R^2 = \epsilon\sigma T^44\pi R^2
$$
and we have: 
$$
\dfrac{L(1 - \alpha)}{4} = \epsilon\sigma T^4
$$
Tada! The above equation is the formula for bare-rock layer model.

Of course this is just a very basic model. If we use it to calculate the temperatures of the planets in our solar system and compare against the actual numbers, everything comes out too cold. Venus is far hotter than the calculation predicts, and so are Earth and Mars. So something is missing, and the obvious candidate is greenhouse gases.

Take a look at the next models with greenhouse gases [[posts/greenhouse effect|here]].

