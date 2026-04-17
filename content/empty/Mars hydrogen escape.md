---
title: "The Martian water escape: tracking hydrogen to the exobase"
date: 2025-07-31
tags:
  - planetary-science
  - writings
  - astrophysics
  - physics
  - climate
  - incomplete
---
**Temporary placeholder waiting for our manuscript to be published, since I wanna reference some of the figures here. IT'S VERY HALF-BAKED. SKIP THIS.**  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.   
.  
.  
.  
.  
.  
.  
  
Mars is basically a freezing, arid desert right now. But look at any topographic map of the planet and you will clearly see dried-up riverbeds and ancient lake basins. Billions of years ago, Mars had a lot of water. It might have even been a habitable world. So where did it all go? 

It floated away into space (well, not all of course, but quite a major part)!

The long-term evolution of the Martian atmosphere has been heavily dictated by the escape of volatile species (Jakosky and Phillips, 2001). Mars continuously loses water through a process involving solar ultraviolet light. This light blasts water molecules in the atmosphere, breaking them apart in a process called photodissociation. This releases atomic hydrogen (H) and oxygen (O). Because hydrogen is the lightest element in the universe, it easily diffuses into the uppermost layer of the atmosphere. Once there, it simply leaves the planet's gravitational pull through a mechanism called thermal escape or Jeans escape. 

Understanding exactly how much hydrogen escapes is basically a metric for understanding water loss on Mars. During a 5-month internship at the Max Planck Institute in Germany, I got to model exactly how this happens. And it turns out the whole process is a lot more chaotic and seasonal than scientists originally thought.

### The old paradigm versus the seasonal water pump

For a long time, the scientific community thought hydrogen escape was a slow and steady process. The old models assumed it was driven entirely by long-lived molecular hydrogen ($H_2$) migrating upwards from the lower atmosphere (McElroy and Donahue, 1972) (Lammer et al., 2003). In this traditional view, the escape of hydrogen and oxygen happens in a strict 2:1 stoichiometric ratio. 

But recent observations from spacecraft completely threw a wrench in that idea. Missions like Mars Express and the MAVEN orbiter detected massive seasonal fluctuations in the hydrogen corona, with escape rates varying by more than an order of magnitude (Chaffin et al., 2014) (Halekas, 2017). A slow and steady supply of $H_2$ simply could not explain these massive spikes.

This led to a paradigm shift. Researchers realized that the variability is directly linked to high-altitude water vapor (Chaffin et al., 2017) (Maltagliati et al., 2011). 

When Mars is closest to the Sun (perihelion) or when it is engulfed in massive global dust storms, the lower atmosphere heats up. Strong meridional winds act like a giant "seasonal water pump" (Shaposhnikov et al., 2019). This circulation pushes water vapor high into the middle and upper atmosphere. Bypassing the slow $H_2$ pathway, this water gets rapidly destroyed by sunlight and creates a sudden surge of atomic hydrogen. 

My research group at the Max Planck Institute has a massive 3D climate model called the MPI-MGCM. It simulates the Martian atmosphere and perfectly captures this hydrological cycle and the water pump mechanism. But the model has a ceiling. It operates up to a pressure level of $p = 3.6 \times 10^{-6}$ Pa, which corresponds to roughly 130 to 160 km above the surface (Medvedev et al., 2013). 

Hydrogen atoms actually escape from a region called the **exobase**. The exobase sits somewhere above 200 km. My job for those 5 months was to bridge that gap. Research has shown that above 130 km, vertical advection by large-scale winds becomes negligible and molecular diffusion completely takes over (Shaposhnikov et al., 2022). I needed to build a 1D vertical diffusion module that could take the output from the top of the 3D model and transport the hydrogen all the way up to the exobase.

### Extrapolating the invisible exobase

You cannot calculate thermal escape without knowing how hot the exobase is and where it is located. The temperature dictates how fast the atoms are moving, and the altitude dictates the boundary of our calculations. The exobase altitude and temperature are not fixed. They vary wildly depending on solar illumination, the season, and atmospheric dust levels.

So before I could move any hydrogen, I had to figure out the thermal structure of the atmosphere above our model's lid.

I wrote a subroutine to fit the temperature data from the top vertical levels of the MGCM to a four-parameter inverted Gaussian profile (Krasnopolsky, 2002):

$$ T(z) = T_{exo} - (T_{exo} - T_0) \exp \left[ - \frac{(z - z_0)^2}{w \cdot T_{exo}} \right] $$

In this equation, $T_0$ is the reference temperature at altitude $z_0$, $w$ is a width parameter controlling the steepness of the profile, and $T_{exo}$ is the asymptotic exospheric temperature we are looking for. 

I used a non-linear least-squares method called the Levenberg-Marquardt algorithm to find the optimal parameters for every single atmospheric column on the global grid. To make sure the algorithm did not spit out physical impossibilities, I had to constrain the variables with sinusoidal mapping. For example, $T_{exo}$ had to be strictly bounded so we did not end up with an unphysical temperature gradient.

Once the parameters were found, we defined the exobase altitude ($z_{exo}$) as the height where the temperature gets sufficiently close to the asymptote, specifically when $|T(z) - T_{exo}| < 0.1$ K.

This extrapolation was honestly a bit of a numerical headache. Sometimes the MGCM data in a specific column was too noisy or flat for a direct fit. When the algorithm failed, it would produce tiny isolated spikes on the global map where the temperature was insanely high (over 240 K). To fix this, I had to build a two-tier fallback system. If the direct fit failed, the code would generate a smoothed temperature profile by computing a Gaussian-weighted average of the target column and its nearest neighbors.

But when it worked, it worked beautifully. We found a moderately strong positive correlation between exobase temperature and altitude, especially during the southern spring (Ls = 217.5 degrees). Warmer regions consistently coincided with higher exobase altitudes. 

### Building the diffusion module

With the new vertical grid constructed from the top of the MGCM up to the exobase, we could finally track the hydrogen. 

We used the mass of dissociated water vapor from the uppermost level of the MGCM to calculate the number density of atomic hydrogen at the bottom boundary. From there, the vertical flux of hydrogen ($\phi$) is driven by a mix of standard molecular diffusion and a drift term. The drift term accounts for the downward pull of gravity in a stratified atmosphere and the tendency of light species to migrate up a steep temperature gradient. The diffusion equation looks like this:

$$ \phi = -D \frac{dn}{dz} - D \left( \frac{1}{H} + \frac{1 + \alpha_T}{T} \frac{dT}{dz} \right) n $$

Here $D$ is the molecular diffusion coefficient. The scale height $H$ depends on the local temperature and gravity. The thermal diffusion factor $\alpha_T$ was set to -0.25 (Krasnopolsky, 2002). 

To solve this continuity equation over time, I built a time-dependent solver using a semi-implicit Crank-Nicolson scheme. We used central differences for the diffusion term to keep high spatial accuracy, but we had to use a first-order upwind scheme for the drift term to prevent the code from producing unstable, unphysical oscillations.

For the upper boundary condition at the exobase, we had to represent the irreversible loss of hydrogen to space. We used a Robin-type boundary condition that equates the upward diffusive flux to the thermal escape flux (Chaffin et al., 2018). The escape flux depends on the Jeans effusion velocity, which tells us how fast atoms can leak out when collisions become infrequent.

### A surprising shortcut and model validation

When I finally ran the time-dependent Crank-Nicolson solver, the results surprised me. I initialized the model with a state of diffusive equilibrium (meaning zero net flux everywhere). Once the simulation started, the hydrogen profile adapted to the boundary conditions ridiculously fast. It only took about 0.25 Martian sols for the system to settle into a steady state. 

Because the transient phase was so short, we realized we could just drop the time-stepping entirely for our long-term simulations. We converted the code to solve the algebraic steady-state equations directly using the Thomas algorithm. This saved a massive amount of computation time and let us run global simulations across multiple Martian years.

But we had one major assumption to validate. Our module only calculates physical transport. It completely ignores photochemistry above the MGCM lid. To make sure this was a valid assumption, we compared our steady-state diffusion results with a sophisticated 1D photochemical and diffusion model (Chaffin et al., 2017). 

The agreement was remarkably strong. For atomic hydrogen, the mean relative error in the number density profile between our simple diffusion scheme and the full photochemical model was only 3.9%. This proved that above 150 km, the vertical distribution of hydrogen is overwhelmingly controlled by diffusive processes rather than local chemical sources or sinks. 

### Dust storms and escaping oceans

We ran the module for 2 full consecutive years: Martian Year 34 and Martian Year 35. This was a perfect comparison case. MY34 featured a massive global dust storm, while MY35 was relatively quiet. 

The simulations revealed how atomic hydrogen is produced and transported. The peak of hydrogen production always follows the Sun. It maximizes in the middle atmosphere between 40 and 60 km. The atoms are then picked up by the rising motions of the global circulation and carried upward.

During the aphelion season when Mars is furthest from the Sun, the atmosphere is cold and contracted. Upward transport is slow. The hydrogen number density at the exobase remains modest, averaging around $1.48 \times 10^4$ cm$^{-3}$. The escape fluxes are quiet, hovering around $10^5$ to $10^6$ cm$^{-2}$ s$^{-1}$.

But perihelion is a completely different story. The atmosphere expands and the seasonal water pump feeds tons of vapor into the photolysis zone. Hydrogen abundances at the exobase rise by more than two orders of magnitude. The global escape rate shoots up, reaching a peak of roughly $2.5 \times 10^{26}$ hydrogen atoms leaving the planet every single second. 

We also saw exactly how the global dust storm in MY34 impacted this process. The dust absorbs heat and intensifies the atmospheric circulation. This shifts the circulation pattern closer to a solstitial type and shortens the pathway for hydrogen atoms to travel upward. The global production of hydrogen reached about 300 kg per second in the midst of the global dust storm.

But here is perhaps the most interesting finding from the whole project: only a tiny fraction of the hydrogen produced actually makes it to space.  By comparing the advective fluxes at 100 km with the escape fluxes at the exobase, we found that only about 0.1% of the produced hydrogen escapes during the second half of the Martian year. Even during the most active periods, it only reaches about 10% to 20%. The rest of the hydrogen gets trapped by the circulation. The meridional winds transport the species horizontally to the polar regions, where they are picked up by descending motions and carried right back down into the lower atmosphere. 

It was incredibly satisfying to see these physical mechanisms play out in the code. We could actually quantify the escaping water and realize our results aligned nicely with satellite observations. My supervisor and I eventually put all of this into a manuscript that is currently under review for publication. 

But I have to admit something. Simulating global dust storms and escaping oceans on a computer screen for 5 months in a quiet German town gave me a lot of time to think. Maybe a little too much time. While the code was running its steady-state calculations, I was having a bit of an existential crisis about my own trajectory. 

I will write more about the personal side of this internship in [[posts/Goettingen|the next entry]].

***

1. Shaposhnikov, D. S., et al. (2019). Seasonal water "pump" in the atmosphere of Mars: Vertical transport to the thermosphere. *Geophysical Research Letters*, 46(8), 4161-4169.
2. Krasnopolsky, V. A. (2002). Mars' upper atmosphere and ionosphere at low, medium, and high solar activities: Implications for evolution of water. *Journal of Geophysical Research: Planets*, 107(E12).

