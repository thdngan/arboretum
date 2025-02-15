---
title: Radiative Cooling of Gravitationally Collapsing Molecular Cloud
tags:
  - astrophysics
  - discussions
  - incomplete
  - physics
date: 2023-09-05
---

%% ‼️ #incomplete ‼️ :/ %%

# Colliding flows and the birth of stars



>[!caption_right]
>![[starformation.jpg]]
>Star-forming region S106 (captured by the Hubble Space Telescope)




%% The gravitational collapse of a gas cloud has gained significant theoretical attention, especially concerning star formation. Given that stars take shape within molecular clouds, many fundamental aspects of star formation likely stem from the physics governing the evolution of these molecular clouds. These clouds might consist of diffuse gas assembled together through dynamic forces like gravity or more broadly, compressive motions often referred to as colliding flows. Essentially, since molecular clouds have higher density compared to their surroundings, compression becomes inevitable. The true question then centers on the mechanism driving this compression. %%

The birth of stars is one of the most captivating processes in astrophysics, yet the journey from a vast, diffuse gas cloud to a brilliant new star is anything but simple. At the heart of this transformation lies the **gravitational collapse of molecular clouds**—cold, dense pockets of interstellar gas that serve as stellar nurseries. But what sets this collapse in motion? The answer probably lies in **colliding flows**, where turbulent gas streams crash into one another, compressing the material and setting the stage for star formation. Since molecular clouds are significantly denser than their surroundings, compression is inevitable. However, the real puzzle is identifying the forces that drive this compression and understanding how they shape the evolution of these structures.


## The power of shock waves

Within molecular clouds, which are cold and compact parts of interstellar space, multiple processes can trigger the creation of **shock waves**. These processes could be the collision of diverse gas streams or the movement of the cloud itself through the interstellar medium. When these shock waves travel through the gas in a molecular cloud, they condense the gas, increasing its density. The condensation brought about by shock waves can be a key factor for setting in motion the process of **gravitational collapse**, ultimately leading to the formation of stars. Through this gas compression, shock waves enhance the density of specific regions within the cloud. These denser areas are more apt to overcome the internal gas pressure and start collapsing under the influence of gravity. 

%% When two streams of interstellar gas collide, they generate **shock waves**—powerful disturbances that ripple through the molecular cloud, dramatically increasing its density. These shock waves can be caused by anything from **supernova explosions** to the motion of clouds through the galaxy. As the gas is compressed, regions of high density begin to form. This is a crucial moment: if these dense pockets become massive enough, their own gravity takes over, pulling in more material and initiating the **collapse that leads to star formation**. Without these shock-induced density enhancements, most gas clouds would remain too diffuse to ever form stars. %%

## Self-similarity: patterns in the chaos

>[!caption_left]
>![[self-simi-murakami.png]]
>Murakami et al. (2004)

%% Self-similar solutions play a crucial role in many branches of physics, in particular, for such fields as hydrodynamic phenomena in astrophysics. %%Despite the seemingly chaotic nature of collapsing clouds, a fascinating pattern emerges—one rooted in **self-similarity**. In physics, self-similarity means that a system looks the same at different scales, following a predictable mathematical pattern. For example, you would probably be familiar with the Larson-Penston (LP) solution (Larson 1969; Penston 1969) which utilizes the continuity and momentum conservation equation to give a self-similar solution for the gravitational collapse of an isothermal gaseous sphere.

The behavior of x (distance or radius) and t (time) in these self-similar solutions could be such that the radius and density are related by a power-law expression that remains constant as the collapse progresses. This means that if you were to plot the density profile of the cloud at different times, the shape of the profile would remain the same, but the scale would change according to a power-law relationship with time.





## Planar geometry

>[!caption_right]
>![[planepara.png]]
>Plane-parallel geometry

In this project, the approach is to utilize a plane-parallel geometry, where variations in physical properties solely arise along the x-axis and are assumed uniform along the y and z axes. Thus, in a system or flow displaying self-similar traits in this plane-parallel geometry, fluid properties such as velocity, temperature, and density follow a consistent pattern of change regardless of the scale of observation.

So we will have:
- $v = v_x, \rho = \rho_x$
- $\dfrac{d}{dy} = \dfrac{d}{dz} = 0$

## Radiative cooling

A key assumption that we made for this particular problem is that radiative losses balance out compressional heating, maintaining a relatively low temperature for the contracting gas cloud. In simpler terms, as the gas becomes compressed during collapse, the increased internal energy can escape through radiation, causing the gas to heat up less efficiently compared to what one would anticipate for gas undergoing adiabatic compression.

# Objectives

The objective here is to present a self-similar solution that considers two physical phenomena: self-gravity and radiative cooling.
- We address the complete set of hydrodynamic equations,
- Introduce a **cooling term** into the energy equation to account for heat loss, and search for self-similar solutions.

# The physical system

The compressible Navier-Stokes equations with cooling are formulated as follows:

$$
\dfrac{\partial\rho}{\partial t} + \bm{\nabla} \cdot (\rho \bm{u})=0
$$

$$
\dfrac{\partial\rho \bm{u}}{\partial t} + \nabla\cdot(\rho \bm{uu})=-\bm{\nabla}P-\rho\bm{\nabla}\phi
$$

$$
\Delta\phi = 4\pi G\rho
$$

$$
\dfrac{\partial\rho(\epsilon+\dfrac{u^2}{2})}{\partial t} + \bm{\nabla}\cdot\left[\rho\left(\epsilon+\dfrac{u^2}{2}\right)\bm{u}\right]=-\bm{\nabla}\cdot(P\bm{u})-\rho\bm{u}\cdot\bm{\nabla}\phi - \Lambda
$$

where t is time, u is the velocity vector, φ is the gravitational potential, G is the gravitational constant, $\epsilon$ is the specific internal energy and Λ is the volumic cooling rate. The heat interchange encompasses both heating and cooling, though our focus is solely on situations where cooling surpasses heating. As a result, the combined effect of these two is negative here. The behavior of the gas adheres to the principles of the ideal gas law.

$$
\dfrac{k_B}{\mu m_p}T = \dfrac{P}{\rho} = (\gamma - 1)\epsilon
$$
where $k_B$ is the Boltzmann constant, µ is the mean particle (molecular) weight, $m_P$ is the proton mass, $\gamma$ is the specific heat ratio, and T is the temperature.

We parameterize the cooling function as:

$$
\Lambda = \Lambda_0\rho^mT^n, \Lambda_0\in\mathbb{R}^{+}
$$

For the values of m and n:
- Depending on the cooling mechanism, we can have m = 1 or 2:
	- m = 2 for collisional cooling
	- m = 1 for thermal radiation
- Since it's a nonlinear steep dependence on temperature, we can approximate with a power law that has n larger than 1.

Next, we define the mass per unit area as:

$$
\Sigma = \int_{0}^{x}\rho dx
$$

From Gauss's law for gravity:

$$
\int \textbf{g}\cdot\textbf{n}=2g=-4\pi G2\Sigma
$$

$$
\rightarrow g = -2\pi G2\Sigma=-\nabla\phi
$$
Thus, in the x dimension:

$$
\dfrac{\partial\phi}{\partial x}=2\pi G2\Sigma
$$

Now, the one-dimensional system for planar symmetry can be written as follows:

$$
\dfrac{\partial\rho}{\partial t} + \dfrac{\partial (\rho u)}{\partial x} = 0
\tag{1}
$$

$$
\dfrac{\partial u}{\partial t} + u\dfrac{\partial u}{\partial x} = -\dfrac{1}{\rho}\dfrac{\partial P}{\partial x} - 4\pi G\Sigma
\tag{2}
$$

$$
\Sigma = \int_0^x \rho dx
\tag{3}
$$
$$
\rho\left(\dfrac{\partial \epsilon}{\partial t}+u\dfrac{\partial \epsilon}{\partial x}\right) = -P\dfrac{\partial u}{\partial x} - \Lambda_0\rho^mT^n
\tag{4}
$$


# Self-similar equations

We will use the above equations and the ideal gas law, along with the following group transformation:

$$
x = \lambda\hat{x}, t = \lambda^a\hat{t}, u = \lambda^b\hat{u}, T = \lambda^c\hat{T}, \rho = \lambda^d\hat{\rho}, \phi = \lambda^e\hat{\phi}
$$

Here, the symbols with hats represent the scaled physical quantities in relation to the unscaled parent system by the scaling factor $\lambda$. To ensures symmetry and equivalence of structure between the transformed system and the original system for self-similarity to exist, the constants a, b, c, d, and e must satisfy the following conditions:

$$
1 - a = b = \dfrac{c}{2} = 1 + \dfrac{d}{2} = \dfrac{e}{2} = \dfrac{3-2m}{5-2m-2n}
\tag{5}
$$

The following similarity Ansatz (inspired by Murakami et al. 2004) would allow us to eliminate the temporal dependence from the one-dimensional system equations. Basically, all the scales of the physical quantities are uniquely determined as a function of time only:

$$
x = A|t|^{1/a}\xi
\tag{6}
$$

$$
u = \dfrac{A}{a}|t|^{b/a}\nu(\xi)
\tag{7}
$$

$$
T = \dfrac{A^2}{a^2}\dfrac{\mu m_p}{k_B}|t|^{c/a}\tau(\xi)
\tag{8}
$$

$$
\rho = B|t|^{-2}g(\xi)
\tag{9}
$$
$$
\dfrac{\partial \phi}{\partial x} = 2\pi G2\Sigma = 4\pi GAB|t|^{(e-1)/a}\sigma(\xi)
\tag{10}
$$
$$
\Sigma = \Sigma_0 + \int_0^x\rho dx = AB|t|^{1/a-2}\sigma(\xi)
\tag{11}
$$

$$
\sigma(\xi) = \sigma_0+\int_0^\xi g(\xi)d\xi
\tag{12}
$$

Here, A and B are positive constants that establish the scales of the radius and density. It's important to observe that the relationship d/a = -2 is applied to the density equation's similarity approach, and this remains valid regardless of the specific values of m and n.

From the above similarity, the equations governing mass conservation, momentum conservation, and energy conservation are simplified into the subsequent sets of ordinary differential equations:

$$
(\nu\mp\xi)g' + (\nu'\pm d)g = 0
\tag{13}
$$
$$
\pm b\nu+(\nu\mp\xi)\nu'+\dfrac{(g\tau)'}{g}+K_1\sigma = 0
\tag{14}
$$
$$
\dfrac{\pm c\tau+(\nu\mp\xi)\tau'}{\gamma-1}+\tau\nu'+K_2g^{m-1}\tau^n=0
\tag{15}
$$
where the prime denotes the derivative with respect to ξ and the plus and minus signs correspond to t>0 and t<0. You may have noticed that we had four equations in the system, where the third equation is Poisson’s equation for gravity. But this equation is automatically satisfied in the above step, so we don’t need to include its reduced form here. These three ODEs are a second-order ODE system for g, τ and v.

Apparently, the system above is characterized by two dimensionless parameters $K_1$ and $K_2$:

$$
K_1 = 4\pi a^2GB
$$
$$
K_2 = \Lambda_0aB^{m-1}\left(\dfrac{A}{a}\right)^{2(n-1)}\left(\dfrac{\mu m_p}{k_B}\right)^n
$$
Additionally, from the mass conservation law:
$$
\dfrac{\partial \Sigma}{\partial t} = -\rho u
\tag{16}
$$
$$
\sigma = \dfrac{g(\xi\mp\nu)}{1-2a}
\tag{17}
$$
# Asymptotic behaviors


An analytical solution is not available for this nonlinear system, except for a single trivial solution when t < 0. However, we can deduce asymptotic solutions under specific constraints and utilize numerical integration to acquire full solutions. We use the terminology introduced by Whitworth & Summers (1985) and identify three regimes: the early interior path (t < 0 and ξ is small), the exterior path (ξ is large), and the late path (t > 0 and ξ is small).

For now, I've only managed to investigate the first regime - the early interior path (t<0, ξ <<1).

## Early interior path

The time interval t < 0 corresponds to the period preceding the formation of a mass singularity at the core of the collapsing area. During this phase, the central region exhibits a homologous collapse with a flat density and temperature profile. We assume the following polynomial series:

$$
g = 1+g_1\xi+g_2\xi^2+\mathcal{O}(\xi^3)
\tag{18}
$$
$$
\nu = \nu_0+\nu_1\xi+\nu_2\xi^2+\nu_3\xi^3+\mathcal{O}(\xi^4)
\tag{19}
$$
$$
\tau = 1+\tau_1\xi+\tau_2\xi^2+\mathcal{O}(\xi^3)
\tag{20}
$$
As A and B are adjustable parameters, we have the flexibility to opt for a scaling that ensures the leading term of both g and τ is set to one. The physical boundary conditions is as follows:

$$
g'(0) = 0, \nu(0) = 0, \tau'(0) = 0
$$
This suggests that there is no singularity present at the origin, no density and temperature gradient. When we substitute these values into the equations, we readily determine that $g_1 = \nu_0 = \nu_2 = \tau_1 = 0$. Essentially, due to symmetry considerations, all odd-order terms of g and τ, as well as even-order terms of v, must become null. This simplifies the polynomial series to:

$$
g = 1+g_2\xi^2, \nu = \nu_1\xi+\nu_3\xi^3, \tau = 1+\tau_2\xi^2
\tag{21}
$$

Inserting into the ODE system, we can get:

$$
\nu_1 = d = \dfrac{4n-4}{5-2m-2n}
\tag{22}
$$
$$
2g_2(\nu_1+1)+3\nu_3=0
\tag{23}
$$

$$
g_2+\tau_2=-\dfrac{\nu_1^2}{4}-\dfrac{K_1}{2}
\tag{24}
$$

$$
\tau_2=\dfrac{11a^2}{6}-\dfrac{11a}{6}-\dfrac{1}{3}(K_1-1)
\tag{25}
$$
$$
g_2=\left(-\dfrac{v_1^2}{4}-\dfrac{K_1}{2}\right)\dfrac{2\dfrac{\nu_1+1}{\gamma-1}+(n-1)K_2}{2\gamma\dfrac{\nu_1+1}{\gamma-1}+(n-m)K_2}
\tag{26}
$$

$$
K_2=\dfrac{c}{\gamma-1}-d
\tag{27}
$$

It's apparent that $K_1$ plays a crucial role in determining both the magnitude and sign of $g_2$. In our polynomial series, setting $\tau_0$ to a value of 1 is essentially the same as fixing the value of $K_2$. Altering $\tau_0$ and $K_2$ induces a rescaling effect on the system, which results in precisely the same solution when reverted back to physical units.

From the constraints above, it is apparent that for $g_2$ and $\tau_2$ to be equal to 0, we must have:
$$
K_1=K_0=-\dfrac{\nu_1^2}{2}
$$
The effective polytropic index can be obtained by substituting the asymptotic values into the equation that represents the effective equation of state (EOS),
$$
P\propto\rho^\Gamma
\tag{28}
$$
leading to:
$$
\tau_2 = g_2(\Gamma_i-1)
\tag{29}
$$
Using the constraints above again, we have:
$$
\Gamma_i=\dfrac{g_2+\tau_2}{g_2}=\dfrac{2\gamma(d+1)+(n-m)(c-(\gamma-1)d)}{2(d+1)+(n-1)(c-(\gamma-1)d)}
\tag{30}
$$
Apparently, $\Gamma_i$ is a weighted mean between $\gamma$ and $(n-m)/(n-1)$.

## Sonic point

Studying a singular point is of utmost importance as it provides significant insights into the behavior of the system. However, with the complexity due to the energy conservation equation within our system, analyzing them analytically is challenging.

By expressing the set of ODEs as linear combinations of their derivatives, we can derive:

$$
g'=\dfrac{\Delta_1}{\Delta}, \nu'=\dfrac{\Delta_2}{\Delta},\tau'=\dfrac{\Delta_3}{\Delta}
\tag{31}
$$
where:

$$
\Delta = (\nu\mp\xi)\left[\tau-\dfrac{(\nu\mp\xi)^2-\tau}{\gamma-1} \right]
$$
$$
\Delta_1 = -\dfrac{g}{\gamma-1}\left[\mp c\tau\mp\dfrac{K_1}{1-2a}g(\nu\mp\xi)^2\pm b\nu(\nu\mp\xi)\mp d(\nu\mp\xi)^2 \right]+K_2g^m\tau^n\mp dg\tau
$$
$$
\Delta_2=\dfrac{\nu\mp\xi}{\gamma-1}\left[\mp c\tau\mp \dfrac{K_1}{1-2a}g(\nu\mp\xi)^2 \pm b\nu(\nu\mp\xi) \mp d\tau\right]-(\nu\mp\xi)K_2g^{m-1}\tau^n
$$
$$
\Delta_3=[(\nu\mp\xi)^2-\tau](K_2g^{m-1}\tau^n\pm\dfrac{c\tau}{\gamma-1})\pm\tau\dfrac{K_1}{1-2a}g(\nu\mp\xi)^2\mp b\nu\tau(\nu\mp\xi)\pm d\tau^2
$$
*whew* yeah that's a lot...

So in order for the solutions with t<0 to transition smoothly through the sonic surface, it is necessary for both conditions,

$$
\Delta = \Delta_2 = 0
\tag{32}
$$
to be met simultaneously at the sonic point, which is where the solution intersects the sonic surface.

Two distinct types of solutions can smoothly pass through the sonic point.
- The first type is a trivial case with $K_1=K_0=-\dfrac{\nu_1^2}{2}$,  resulting in constant density and temperature. This leads to a linear velocity profile.
- The second valid value of $K_1$ needs to be determined through numerical integration, using the shooting method towards the sonic point. Essentially, we solve the above problem by reducing it to an initial value problem. We find solutions for different initial values of $K_1$ until we find the solution that also satisfies the sonic surface conditions mentioned above.

# Results
## Trivial solution

When $K_1=K_0=-\dfrac{\nu_1^2}{2}$, a trivial solution is pretty easy to find:

$$
g(\xi) = 1, \nu(\xi) = d\xi, \tau(\xi) = 1.
\tag{33}
$$
This solution characterizes the homologous collapse of a flat structure that stretches infinitely and is applicable solely for t < 0.

## Physical solution

We employ numerical methods to solve the system, initializing integration at ξ values considerably small and at times t < 0. By utilizing the shooting method, we determine the appropriate value of K1 that permits the existence of a continuous solution. Subsequently, the negative solution is extrapolated to very large ξ values. In the below figure, we present illustrative profiles for two chosen pairs of m and n.

![[profile-m1-5-n3.png]]
![[profile-m-2-n-5.png]]
 <span class = "caption">  
<i>Self-similar solution for two cases: (m, n) = (1.5, 3), (2, 5) from top to bottom. The dimensionless density, velocity and temperature are shown in blue, orange and green respectively. The dashed line shows the sonic point.
</i>
</span>

From the velocity profile (yellow line), we can see that the compression is faster than the sonic velocity; thus, we have a supersonic collapse.

![[eos-m-1-5-n-3.png]]
![[eos-m-2-n-5.png]]
 <span class = "caption">  
<i>Density-temperature diagram for two cases: (m, n) = (1.5, 3), (2, 5) from top to  bottom. The dashed line shows the slope from the asymptotic solution.
</i>
</span>

We recall that $\tau_2 = g_2(\Gamma_i-1)$, where $\Gamma_i-1$ is shown on the figures above. Obviously, both the numerical and asymptotic solutions give the same slope values.

$$

$$
