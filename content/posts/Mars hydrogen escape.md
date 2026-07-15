---
title: How Mars loses its water
date: 2026-06-01
tags:
  - planetary-science
  - writings
  - astrophysics
  - physics
  - climate
  - incomplete
---

*An attempt to summarize the content of* Medvedev & Trinh [-@MedvedevTrinh2026] *(I'm just looking for an excuse to yap about my first time actually making a significant contribution to a paper :D).*


>[!caption_row]
>![[early_mars.png]]
>Artist illustration of early Mars
>
>![[current_mars.png]]
>Current Mars (by OSIRIS camera on Rosetta)

Mars is dry, pretty obviously. But it wasn't always. The surface is covered in ancient river valleys, lake beds, and mineral deposits that only form in the presence of liquid water. Somewhere between then and now, Mars lost most of it. And it is still losing more, right now, through a process very slow and very high up in the atmosphere.

This post is about that process, and about the modeling work I spent a semester working on in Göttingen. The short version: Mars loses about **400 grams of hydrogen into space every second** during its most active season. Doesn't sound like much, but over billions of years, it adds up.

## Why hydrogen?

Water is H₂O (duh). When water vapor drifts high enough into the Martian atmosphere, above roughly 40 to 60 km, the Sun's ultraviolet radiation (specifically Lyman-alpha photons) breaks it apart:

$$
\text{H}_2\text{O} + h\nu \rightarrow \text{H} + \text{OH}
$$

The resulting atomic hydrogen is light. Very light. So light that some of these H atoms, rattling around in the upper thermosphere, are moving fast enough to simply leave. If an atom reaches the **exobase** (the altitude, around 200 to 250 km, where the atmosphere is so thin that collisions are rare) and it is going fast enough, it escapes Mars's gravity forever. This is called **Jeans escape**, or thermal escape, and it is the dominant mechanism by which Mars loses hydrogen today [@Jakosky.etal2018].

The oxygen left behind mostly gets locked up in the surface through oxidation. Mars's famously red color is partly a consequence of this: rust, on a planetary scale.

So hydrogen escape is, in the long run, equivalent to water loss. Quantifying it tells us how fast Mars is drying out.

## The problem of the gap

>[!caption_left]
>![[mars_atmos_layers.png]]
>Mars atmospheric layers by Emirates Mars Mission (EMM)

The model we use at the institute, the Mars Atmosphere Observations and Modeling General Circulation Model (MAOAM-MGCM, or just MGCM), solves the three-dimensional thermo- and hydrodynamic equations of the Martian atmosphere from the surface up to a pressure level of $3.6 \times 10^{-6}$ Pa, corresponding to roughly 130 to 160 km altitude [@Hartogh2005; @Medvedev.etal2011_InfluenceGravity]. But the exobase, where escape actually happens, sits somewhere around 200 to 250 km. There is a gap between the top of our model and the place we need to compute escape.

Fortunately, Shaposhnikov et al. [-@Shaposhnikov2022] showed that above roughly 130 km, molecular diffusion dominates the vertical transport of tracers, such that large-scale wind-driven advection can be neglected. This means that above the model top, we can describe hydrogen transport with a 1D diffusion equation rather than needing the full 3D model, which makes the problem tractable.

The diffusion equation for atomic hydrogen number density $n$ is:

$$
\frac{\partial n}{\partial t} = -\frac{\partial \phi}{\partial z}
$$

where the vertical flux $\phi$ accounts for three contributions [@Chaffin2017]:

$$
\phi = -D\frac{dn}{dz} - D\left(\frac{1}{H} + \frac{1+\alpha_T}{T}\frac{dT}{dz}\right)n
$$

The first term is standard diffusion down a concentration gradient. The second accounts for gravitational settling via the scale height $H = k_BT/\mu g$, where $\mu$ is the mass of a hydrogen atom: gravity pulls hydrogen back down. The third involves the **thermal diffusion factor** $\alpha_T = -0.25$ [following @krasnopolsky2002mars], which captures the tendency of light species like hydrogen to migrate up a steep temperature gradient. At the top of the atmosphere, temperatures rise sharply toward the exosphere, so this term nudges hydrogen upward toward escape.

At the exobase itself, we impose an upper boundary condition: the upward flux must equal the **Jeans escape flux** [@Chaffin.etal2018_MarsEscape]:

$$
\phi_\text{esc} = n(z_\text{exo}) \cdot v_\text{eff}
$$

$$
v_\text{eff} = \frac{v_\text{mp}}{2\sqrt{\pi}}(1+\lambda)e^{-\lambda}, \quad \lambda = \frac{GMm}{k_B T_\text{exo} R_\text{exo}}
$$

Here $v_\text{mp} = \sqrt{2k_BT_\text{exo}/m}$ is the most probable Maxwell-Boltzmann speed, and $\lambda$ is the **Jeans parameter**, the ratio of gravitational potential energy to thermal kinetic energy at the exobase. A smaller $\lambda$ (higher temperature, lower gravity) means faster escape.

This system, solved numerically using a [[crank-nicolson|Crank-Nicolson scheme]] on a vertical grid extending from the MGCM top to the exobase, gives us the hydrogen density profile and escape flux at every horizontal grid point and at every moment in time.

## Bridging the gap: extrapolating to the exobase


>[!caption_right]
>![[extrapolation.jpg]]
>The black dots are the actual temperatures calculated by the 3D model, and the red line is the mathematical fit projecting all the way up to the exobase where escape happens.

To apply the diffusion scheme, we need to know the temperature profile between the MGCM top and the exobase, and we need to know where the exobase is. Neither is given directly by the model.

We handle this with an extrapolation. For each horizontal grid point, we fit the uppermost MGCM temperature levels to a four-parameter inverted Gaussian profile [@krasnopolsky2002mars]:

$$
T(z) = T_\text{exo} - (T_\text{exo} - T_0)\exp\left[-\frac{(z-z_0)^2}{\sigma_z^2}\right]
$$

The fitting uses a Levenberg-Marquardt nonlinear least squares algorithm, with physically motivated bounds on the parameters (for example, $T_\text{exo}$ must exceed the maximum temperature in the input data, to ensure a physically meaningful upward gradient). The exobase altitude is then defined as the height where the extrapolated profile approaches $T_\text{exo}$ to within $10^{-5}$ K.

This procedure works well most of the time, with fits achieving $R^2 \approx 1.0$ and RMSE below 0.1 K. There are occasional failures in grid columns with noisy or poorly structured temperature profiles, but these affect only a few points out of roughly 2048 at any given time, so their impact on global diagnostics is negligible.



## Results: what the simulations show

The simulations cover **Martian Years 34 and 35** (MY34 and MY35), chosen because they coincide with a period of low solar activity, which lets us isolate the effects of season and dust without the confounding influence of the solar cycle. MY34 also featured a **Global Dust Storm (GDS)**, allowing a direct comparison with the relatively quiet MY35.

### Where hydrogen comes from

Atomic hydrogen production peaks between **40 and 60 km** throughout both years, following the Sun: it is strongest in the summer hemisphere at high latitudes during solstices, and in low to mid-latitudes during equinoxes. These results are consistent with observational estimates from the Atmospheric Chemistry Suite instrument on the Trace Gas Orbiter [@Alday_etal2021_Isotopic] and with the photochemical modeling of Kleinböhl et al. [-@Kleinboehl_etal2024HydrogenEscape].

The important finding here is that **production rate alone does not determine escape**. You also need the circulation to deliver hydrogen upward. Most produced hydrogen gets trapped in the lower atmosphere by the circulation and accumulates at the poles. Only a small fraction reaches the thermosphere.

### The seasonal water pump

>[!caption]
>![[circulation.png]]
>The colors show the concentration of atomic hydrogen, while the gray contour lines map the atmospheric circulation. During the southern summer solstices (bottom panels), a strong upward current at the south pole carries hydrogen into the upper atmosphere.

The most important pathway for hydrogen to reach the exobase is the **meridional circulation** during the southern summer solstice. When Mars is closest to the Sun (perihelion falls near the southern summer solstice), strong upward circulation in the southern hemisphere lifts both water vapor and atomic hydrogen from the middle atmosphere up to roughly 90 to 100 km. Above that, molecular diffusion carries them the rest of the way to the exobase. This is the same "seasonal water pump" mechanism identified by Shaposhnikov et al. [-@Shaposhnikov2019] for water vapor: hydrogen rides the same elevator.

The result is that **escape peaks during the southern summer solstice**, with globally averaged rates reaching **$2.5 \times 10^{26}$ H atoms per second** (about 400 g/s). Outside this season, escape is typically an order of magnitude lower.

### The dust storm


>[!caption]
>![[escape_rates.png]]
>Hydrogen escape rates over the course of a Martian year ($L_s$ is the solar longitude, essentially the Martian calendar). The red line shows global escape rates. Notice the massive spike around $L_s = 270^\circ$ (the southern summer solstice). The smaller bump in MY34 around $L_s = 200^\circ$ is the effect of the Global Dust Storm.

The MY34 GDS, which began around $L_s = 185°$, produced a roughly tenfold increase in hydrogen production by lofting water vapor to altitudes where it could be photolyzed. It also intensified the circulation, shortening the pathway from production to escape, and shifted the circulation pattern toward the solstitial type that would occur naturally later in the season [@Medvedev2013].

However, the storm's contribution to the annually integrated escape is limited. The secondary peak associated with the GDS reaches about $10^{26}$ s$^{-1}$, which is 2.5 times smaller than the seasonal perihelion peak, and the late-year regional dust storms in both MY34 and MY35 produced enhancements comparable to or smaller than the aphelion solstice values. The reason is duration: the GDS was intense but short, while the perihelion season enhancement is broader and sustained.

So essentially: **seasonal variability, not episodic dust storms, is the dominant driver of the annually integrated hydrogen escape from Mars.**

### How much water is Mars actually losing?

Integrating over a full Martian year gives about 24,000 to 26,000 tonnes of water equivalent lost per year (expressed as H₂O, since 2 H atoms escaping = 1 water molecule lost). These values are consistent with, though at the lower end of, the range of 160 to 1800 g/s estimated from MAVEN observations by Jakosky et al. [-@Jakosky.etal2018].

## Caveats (the honest section)

No model is without assumptions, and ours is no exception.

**On photochemistry and overestimation.** Our model does not include photochemistry. Hydrogen in the lower and middle atmosphere participates in chemical reactions that can reform water, effectively removing it from the pool available for escape. Kleinböhl et al. [-@Kleinboehl_etal2024HydrogenEscape] argued that photolysis dominates over recombination above roughly 60 km, and Montmessin et al. [-@Montmessin2022_Reappraising] similarly showed that production increasingly dominates loss above roughly 50 km. Both results suggest the hydrogen available for escape in our model is likely overestimated, though these one-dimensional estimates cannot fully capture the three-dimensional variability in temperature, winds, and water vapor that our GCM does resolve.

There is also a second source of overestimation: in the lower ionosphere (110 to 200 km), hydrogen atoms encounter a different chemical environment where ion-neutral reactions act as both local sources and sinks. Our diffusion scheme does not include these processes below its lower boundary. As noted by Kleinböhl et al. [-@Kleinboehl_etal2024HydrogenEscape], these high-altitude ion-neutral reactions are also the primary drivers of non-thermal hydrogen escape. Non-thermal escape (energetic atoms produced by chemistry rather than thermal motion) can constitute a significant fraction of total H loss [@Cangi2023Fullycoupled ; @Gregory2023 ; @Gregory2023b]. Because our framework focuses on bulk transport and its contribution to thermal escape, we do not track these pathways, and neglecting the ionospheric sinks contributes to the overestimation of the thermal hydrogen population available for transport to the exobase.

**On simulated values being at the lower end.** Observationally derived global escape rates span roughly 1 to $11 \times 10^{26}$ s$^{-1}$ [@Jakosky.etal2018]. Our perihelion maximum of $2.5 \times 10^{26}$ s$^{-1}$ sits at the lower end of this range, which is expected given the low solar activity during MY34 and MY35: solar activity affects escape by altering photodissociation rates, thermospheric temperatures, and the effusion velocity [@Mayyasi2023_SolarCycleSeasonInH]. Higher escape rates reported in the literature were often measured during more active periods.



## What I actually did

>[!caption_right]
>![[convergence.png]]
>The colored lines show the hydrogen density profile evolving over time until it converges to the steady-state mathematical solution (dashed black line) in less than a third of a Martian day.

The practical work was building a **1D diffusion module** that takes outputs from the MGCM at each horizontal grid point, runs the diffusion equation up to the extrapolated exobase, and outputs hydrogen density profiles and escape fluxes across the globe and through time.

The solver has two modes: a time-dependent [[crank-nicolson|Crank-Nicolson scheme]] and a direct steady-state solver (setting $\partial n / \partial t = 0$ and solving the resulting linear system with the [[empty/thomas-algo|Thomas algorithm]]). One useful early result was that the time-dependent solver converges to the steady state within about 0.3 Martian sols, which validates the use of the computationally cheaper steady-state solver for global diagnostics.

The temperature extrapolation described above was a significant chunk of work. Getting the Levenberg-Marquardt fitter to behave robustly across thousands of atmospheric columns with varying thermal structure required a two-tier fallback: when the direct fit to a given column had poor quality (low $R^2$), a spatially smoothed profile (Gaussian-weighted average with neighboring columns) was used instead, with the smoothing width iteratively increased until a satisfactory fit was achieved.

The code is available [@TrinhSoft].

_This post is connected to [[Goettingen|a Göttingen logbook]], written around the same time (less about the science and more nonsense yapping...)._
## References



