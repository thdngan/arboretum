---
title: Thermodynamics of Clathrate Hydrate
date: 2024-05-15
tags:
  - chemistry
  - physics
  - planetary-science
  - paper-notes
  - thermodynamics
draft: false
---
(Reference: Lunine & Stevenson 1985)

%% ## Side notes %%

Which structure is dominant? -> more ==energetically favorable==??

1. **Guest molecule size & type:**
- sI is typically formed with small molecules like methane and carbon dioxide.
- sII can form with larger molecules like propane and ethane.

2. **pressure and temperature conditions:** Each structure has a distinct stability region in the pressure-temperature phase diagram.
3. **Concentration of guest molecules:** partial pressure or concentration of different guest molecules in the system influences which clathrate structure forms.
4. **thermodynamic stability:** Gibbs free energy. structure with the ==lowest Gibbs free energy== is the most stable -> more likely to be dominant.


%% ## Definition %%

%% Clathrate hydrates are **crystalline structures** in which **gas molecules** are *trapped* within **cages** formed by water molecules.  The most common type of clathrate hydrates involves water ice cages with gas molecules, typically methane, encased within them. However, other gases like carbon dioxide, hydrogen sulfide, and various hydrocarbons can also form clathrate hydrates under specific conditions. 

 In this paper:

- Deal almost exclusively with clathrate compounds for which water ice forms the lattice structure (i.e., the "**host**" molecule) -> the term ***clathrate*** is here understood to mean clathrate hydrate.
- The gas molecule occupying a cage site is the "**guest**" molecule. The term ***methane clathrate*** is used to denote a clathrate hydrate in which methane is the primary *guest* molecule.
- Occasional discussion of clathrates in which a substance other than water ice is the host, for example, quinol, will emply the term ***quinol clathrale***.
- A stoichiometric compound of water ice, in which molecules bond chemically with the water molecule and do not form a clathrate, will be denoted as a ***hydrate***, e.g., ammonia hydrate. 
 %%


%% ## Importance in outer solar system

- Volatiles like methane might be present on Titan, Triton, and potentially Pluto due to clathrates playing a role in their formation.
- Advanced observational methods have opened up the opportunity for the initial direct observation of clathrates on celestial bodies in the outer solar system.

## Introduction

- Extend a statistical mechanical model of clathrate formation originally developed by van der Waals and Platteeuw (1959) to predict the formation conditions and composition of clathrate hydrate under a wide range of situations of interest to solar system studies.
- ***Low pressure*** ($10^{-12}$ to 1 bar): regimes of gaseous nebulae, in which the outer planets and satellites may have formed.
- ***Intermediate pressure*** (1 to $10^2$ bars): present-day atmosphere of Titan and plausible models for primordial atmospheres.
- ***High pressure*** ($\gtrsim 10^3$ bars): interiors of large icy satellites.



 Goal:
- Treat all of these cases with a **single, physically reasonable model** of clathrate formation which is **tied** as much as possible directly **to laboratory data** on the **stability** of the various clathrate compounds or the **thermodynamic properties** of the pure components themselves.
$\rightarrow$ Predict:
	- Conditions of formation of clathrate hydrate of CO, an important molecule cosmochemically and one for which no laboratory data on the clathrate yet exist.
	- Substantial double occupancy of clathrate cages by CH4 and H2, the latter by itself a poor clathrate hydrate former $\rightarrow$ implications for satellite outgassing processes.

- Deal with ***stability of clathrates at high pressure*** (>5 kilobars) and the ***formation of clathrates*** in the presence of an ***ammonia-water solution*** (a probable primordial environment in large icy satellites). (few or no data exist, dealt with for the first time)
- Analyze ***clathrate formation kinetics*** in a gaseous environment $\rightarrow$ find that disequilibrium is likely in many circumstances, including the formation conditions of comets, but that approach to full equilibrium may occur if ice particles or planetesimals undergo extensive collisional gardening. Approach to equilibrium is more probable in the higher-density, higher-temperature nebulae around proto-giant planets than in the primordial solar nebula. 


## Literature review on clathrate properties & occurrence & previous applications to solar system problems

### Clathrate hydrate structure
- Open, cage-like voids, each formed by **20-28 hydrogen-bonded** water molecules.
- **==Two structural types==**: I and II. The ==size of the included guest molecule== determines which is formed.
	- **Structure I clathrate:** 2 small cages + 6 large cages (CO2, CH4)
	- **Structure II clathrate:** 16 small + 8 large (10% bigger radius than structure I large cages) ==(O2, CH4, Kr, Ar)==
- Previously **assumed** that all molecules **smaller than 5.8 $\text{\r{A}}$** form structure I clathrate. **BUT** Davidson et al. (1984) demonstrate that **argon & krypton** preferentially form structure II clathrate, while somewhat larger molecules such as **CH4** form structure I.
- **==Pure==** clathrate:
	- Only 1 kind of guest molecule.
	- Characterized by:
		- **dissociation pressure**, defined empirically as the *minimum* gas pressure of the *guest* molecule at a given temperature for which the corresponding clathrate is stable.
		- **degree of occupancy**, defined as the fraction of available cage sites occupied by a guest molecule.
- **==Mixed==** clathrate:
	- More than 1 kind of guest molecule.
	- a single **dissociation pressure** still exists, but
	- there are as **many parameters** characterizing **relative occupancy** as there are *guest* molecules.
- Chemical ==formula== for clathrate structures in the usual notation, where $y_i$ is the ==number fraction== of all guests that are species $X_i$:
	- **structure I** clathrate: $(\underset{i}{\pi} X_{i(y_i)}) \times 5\frac{3}{4} H_2 O$
	- **structure II** clathrate: $(\underset{i}{\pi} X_{i(y_i)}) \times 5\frac{2}{3} H_2 O$
- Not all cages need to be filled. One of the guest species can be thought of as a *hole*, which enters the partition functions (?) appropriately but otherwise does not contribute to the energy.
### Past studies
 - Studies that are important in determining the **degree of rotational inhibition** of the encaged guest molecule, the **magnitude of electric fields** within the cage, and **degree of interaction** between guest molecules in adjacent cages:
	- In understanding explicitly the interaction between guest molecule and the surrounding host cage, thoeretically by Davidson (1971) and experimentally, using infrared spectroscopy and dielectric measurements, by Bertie and Jacobs (1982, 1978, 1977) and Davidson and Wilson (1963).
	- Computer simulation of guest and cage molecule motions by Tester, Bivins, and Herrick (1972), Plummer and Chen (1983), and Tse, Klein, and McDonald (1983).
- Much less attention has been given to the **==kinetics of clathrate formation==**, most likely because of the long duration of experiments required to measure diffusion of gas molecules within grains and along grain boundaries in water ice.
	- Barrer and Edge (1967), Barrer and Ruzicka (1962) achieved nearly complete clathration in a system of water ice and noble gas by **agitating** the system, apparently exposing fresh ice to the gas.
	- In the absence of shaking, an initially rapid uptake of gas by the ice to form clathrate was followed by a very slow uptake, suggesting a [[diffusion|diffusional process]]. 
- Studies on ==physical properties== of clathrate which are relevant to identifying clathrate in terrestrial ocean sediments as well as processes in solar system bodies:
	- Cook and Leaist (1983), Stoll and Bryan (1979): **thermal conductivity** at low-to-moderate pressures, the latter also measured **acoustic wave velocity**.
	- Dharma-Wardana (1983): attempted to explain the **low thermal conductivity** of clathrate (one-fifth that of ice $I_H$) in terms of the large number of molecules per unit clathrate cell.
	- Ross and Andersson (1982): **thermal conductivity** and **heat capacity** studies to explore high-pressure solid compounds of water and tetrahydrofuran (THF), including THF clathrate. Results suggest the possibility of a high-density clathrate hydrate phase existing above 11 kilobars.
	- Pinder (1964): **time-dependent** [[rheology]] of a clathrate hydrate [[slurry]], with THF and hydrogen sulfide as guest molecules.
	- Byk and Fomina (1968), Kvenvolden and McDonald (1982): **data** on the **density of clathrate compounds**.
 - Literature describing the ==predicted or observed occurrence of clathrates== in natural environments:
	- Claypool and Kvenvolden (1983), Kvenvolden and McMenamin (1980): reviews of the t**errestrial occurence** of clathrate.
	- Pearson et al. (1983): review of **properties of natural clathrate deposits**.
	- Evidence for clathrate in permafrost in western Siberia, Canada, and Alaska. Existence of an **$\bm{N_2-O_2}$ clathrate** in Antarctic ice proposed (Miller 1969) and tentatively detected (Shoji and Langway 1982).
	- **Best evidence for the existence of naturally formed clathrate** comes from [[bottom-simulating reflectors]] in a number of ocean sediment areas around the world. The reflectors are apparently due to an **abrupt decrease in sound velocity** caused by **trapped methane gas**. The association of the gas with methane clathrate is supported by:
		- calculations showing that the reflectors are in a temperature-pressure regime stable for methane clathrate (Shipley et al. 1979)
		- the retrieval in drill cores of frozen sediments and water ice evolving primarily methane gas (Shipley and Didyk 1982; Kvenvolden and McDonald 1982). The methane is likely of biogenic origin; the existence of the clathrate demonstrates that, in the presence of liquid water at least, clathrate compounds form spontaneously under the appropriate gas pressure and temperature conditions. 
- **==Application of clathrate hydrate properties to solar system objects==**:
	- Delsemme and Swings (1952): proposed the existence of clathrate hydrate in cometary nuclei.
	- Delsemme and Wenger (1970): **produced methane clathrate** at temperatures as low as 82 K by condensing water vapor onto a cold plate in the presence of methane gas. The stripping of ice grains during [[dissociation]] was suggested as a mechanism for cometary halo production.
	- Delsemme and Miller (1970): **modeled clathrate formation** as a special case of [[gas adsorption]] and suggested that **radicals observed spectroscopically in comets** could be emitted from **clathrate cages**. More detailed observations of comets are now available, the existence of clathrate is still hypothetical.
	- Stanley Miller (1961): used the **van der Waals and Platteeuw model** and his own experimental data to determine the **likelihood of occurrence of clathrate hydrate** in a wide range of solar systems objects, including the envelopes of the outer planets, Saturn's rings, satellite interiors, terrestrial planet atmospheres, Mars's polar caps, comets, as well as interstellar grains.
	- Miller and Smythe (1970): more detailed analysis of the **stability of carbon dioxide clathrate in the Martian ice caps**.
	- Smythe (1975): produced a set of **laboratory reflectance spectra of methane and carbon dioxide clathrate frost** to determine the **detectability of clathrate on surfaces of the outer planet satellites**.
- **==Application of clathrate formation in primordial gaseous disks==** to the present atmospheres of planets and satellites:
	- Lewis (1971): suggested **incorporation of methane clathrate in Titan** and predicted the resulting **argon-to-methane ratio** in Titan's atmosphere derived from the clathrate composition.
	- Hunten (1978): suggested an **atmosphere in equilibrium with a surface of methane clathrate**, which at the time ==was not ruled out by the data==.
	- Sill and Wilkening (1978): used **existing laboratory data** on **clathrate dissociation pressures** for a range of guest molecules of cosmochemical interest to calculate the **gas composition** in clathrate hydrate derived from a solar composition gas => Concluded that addition of one part per million clathrate gases (in coments) to Earth's atmosphere could explain the observed terrestrial noble gas ratios.
	- ==All of the above studies did NOT== incorporate the recent experimental result that ==pure argon and krypton clathrates possess structure II== (Davidson et al. 1984).
- **==Origin and effect of volatiles in icy satellites:==**
	- Stevenson (1982*a*) proposed clathrate hydrate **dissociation** as a **driver** for **explosive ammonia-water volcanism** on **Rhea-sized satellites** in the Saturn system.
	- Owen (1982): renewed suggestion that **Titan's atmosphere** is derived from clathrate and suggested that the $\bm{N_2}$ making most of the present atmosphere was accreted in clathrate.
	- Lunine and Stevenson (1982*a*) calculated **gas composition in clathrate** derived from a **circum-Saturnian nebula** and concluded that ==although CH4 in Titan is likely derived from primordial clathrate, N2 would not be substantially incorporated and may have been photochemically produced from NH3 later== (Atreya, Donahue, and Kuhn 1978).
- **==No direct evidence exists for clathrate anywhere aside from Earth==**.  In part this may be because clathrate "hides" itself very well as ordinary water ice I in reflection spectra (Smythe 1975). The utility of studying clathrate thermodynamics rests more on indirect evidence that clathrates play a role in determining the composition and evolution of surfaces and atmospheres of satellites (and perhaps giant-planet envelopes) in the outer solar system. Striking improvements in spectral resolution in ground-based reflection spectroscopy now raise the possibility of distinguishing between water ice I (and its high-pressure polymorphs - Gaffney and Matson 1980) and clathrate hydrate on surfaces in the outer solar system in the near future. 

## Statistical mechanical model to predict clathrate formation
or more specifically, to **==predict the stability regimes of clathrate hydrate==** and the **==composition of the guest molecule component==**.

### Thermodynamic and Structural Properties
- Clathrate hydrate is a distinct phase in a **multicomponent system** consisting of **water** and **any number of nonpolar, weakly polar**, and, more rarely, **strongly polar chemical species**.
- It is [[nonstoichiometric]] since, although the number of cages is precisely determined, their **fractional occupancy** is a **function** of temperature, pressure and relative abundances of the species.
- Although the clathrate structure is distinguished from that of other ice phases by containing large open cage structures, the water molecule lattice bonding mechanism is the usual hydrogen bonding (Jeffrey & Mcmullan 1967).
- The **guest molecule-cage interaction** is primarily the sum of core overlap effects (a strongly repulsive term ??) and an attractive van der Waals-like (induced dipole-induced dipole) interaction.
- The included guest molecule must stabilize the cage structure because of the attractive term, since the ***empty cage structure is energetically unfavorable*** relative to the usual (more compact) forms of water ice.

The **phase boundary** in temperature pressure space of clathrate hydrate is defined by the **equality of chemical potentials** (or Gibbs energies $g$, where
$$
dg = -SdT+VdP)
$$
of each component (guest and water host) in the coexisting phases.

- The **coexisting phases** are ***(a)*** clathrate hydrate with incorporated guest molecule, and ***(b)*** water ice or liquid (with some dissolved molecules of the guest species) plus the pure phase of the guest species stable under ambient conditions $T$, $P$.
- We consider only a single guest species in the present discussion.

>[!caption_left]
>![[lunine_stevenson1985_fig2.png]]
>Schematic diagram of stability fields of clathrate hydrate, occupied by guest molecule x, plotted as $\log P$ (in bars) vs. temperature in degrees Kelvin. Solid line delineates region in which clathrate is thermodynamically preferred relative to water ice or liquid plus coexisting component x. Dashed line is water ice-liquid phase boundary; within the clathrate stable region the existence of water phase separate from clathrate is contingent on the relative amounts of water and x. Superposed are dotted lines representing the vapor-liquid (A) and liquid-solid (B) phase boundaries of pure component x. The axis values are for x = methane; the diagram is qualitatively similar for $N_2$, $CO$, and other volatile, mainly nonpolar species with small molecular diameters. Note change in slope of clathrate stability field in crossing water ice-liquid boundary.


Figure on the left plots qualitatively the phase boundary as a function of $P$ and $T$.
- Consider, first, the low-pressure regime in which the system pressure is essentially the vapor pressure of the guest molecule (since the vapor pressure of water is invariably much lower).
- With increasing gas pressure at a given temperature, the Gibbs energy of the gas is increased by decreasing its entropy.
- The clathrate Gibbs energy is negligibly affected by pressure, since the pressure is much less than the bulk modulus, so it follows that ***an increase in pressure favors clathrate formation***.
- In this ideal gas regime, the net volume change and entropy change accompanying clathrate formation are clearly both negative, and the Clausius Clapeyron equation predicts a positive value of $dT/dP$.
- The **phase boundary pressure**, at a given temperature, for clathrate formation has been referred to in the literature as the **dissociation pressure** of the clathrate. We use this term **only in the low-pressure regime**.
- As pressure is increased and the guest is no longer in the ideal gas regime, compressive effects primarily on the guest molecule (and secondarily on the water) become important, and the volume change from phase A (guest + $H_2O$) to B (clathrate decreases).
- At a given temperature, then, a higher system pressure is required to stabilize the clathrate than would be expected in the ideal gas regime, and $dT/dP$ decreases as seen in the figure on the left.
- Eventually, the volume change A $\rightarrow$ B becomes zero and $dT/dP=0$, defining a **maximum temperature at which the clathrate is stable**.
- This "**critical point**" $T_c$ is a function of the thermodynamic properties of the particular guest and, hence, is **different for each species**.
- At each temperature below $T_c$, there exist both maximum and minimum pressures defining the domain of clathrate stability.
- The **minimum pressure** exists because ***at lower pressures the gas entropy is very large (i.e., more favorable)***, and the **maximum pressure** exists because the coexisting pure guest phase has reached a low enough specific volume that the ***volume change*** (clathrate $\rightarrow$ guest + $H_2O$) is ***energetically favorable***.
- The precise sign and value of $dT/dP$ at the high-pressure end of the clathrate stability field are sensitive functions of the compressibility of the clathrate, water, and guest molecule components, and are calculated for $CH_4$ and $N_2$ in [[lunine_stevenson_1985#High-pressure equilibria|§7]]. 
- $P-T$ data in the literature are restricted to the low-pressure end in the figure ($\lesssim 4$ kilobars); studies by Tammann and Krige (1925) and van Berkum and Diepen (1979) appear to have located the critical point for $SO_2$ clathrate.

 Considering in more detail the nature of the guest-host interaction, it is inaccurate to think of the guest molecules as impurities occupying imperfections or substituting for  water molecules in the lattice structure.
- X-ray diffraction studies of clathrates (Jeffrey and McMullan 1967) demonstrate a well-defined structure in which cages of diameter $\sim 10$ $\text{\r{A}}$ are present.
- Calculations by Davidson (1971) indicate stubstantial cancellation of lattice water molecule dipolar fields within the cage volume.
- Theoretical and experimental studies of infrared spectra (e.g., Davidson 1971; Bertie and Jacobs 1978) and **physical properties** of clathrate such as sound velocity (Pearson et al. 1983) suggest that these properties are to first order **determined by** the **water molecules and their lattice structure**, crudely **independent of particular guest species**, and the **interaction between the guest molecule and host lattice is extremely weak**. Even the very low thermal conductivity of the clathrate relative to water ice may be a result of the form of the lattice structure and not due to coupling to the guest molecule (Dharma-Wardana 1983), although this is controversial.
- The weak interaction is consistent with London dispersion forces (Fowler and Guggenheim 1960, p.278) being responsible for the attractive part of the guest-host interaction, with lesser contribution from dipole-induce-dipole and dipole-dipole interactions with residual fields in the cage.
- This has long been recognized (van der Waals and Platteeuw 1959), since the noble gases are observed as encaged guest molecules; we wish to emphasize the point here since the ***predominantly icelike properties are potentially important for evolution models of icy satellites***.
- Strongly dipolar molecules apparently can occupy cage sites (Jeffrey and McMullan 1967); the possible incorporation of ammonia in clathrate cages is deferred to a later section. 



### Model of Clathrate Formation

Assumes that the guest molecule incorporation into clathrate cages is physically similar to ideal [[gas adsorption|adsorption]] onto fixed sites, **generalized to three dimensions**.

==Assumptions:==
1. The **free energy** of the $H_2O$ lattice structure is *independent* of the **occupation** (and mode of occupation) of the guest molecule.
2. ***(a)*** The guest molecules are confined to the cage colume with **one guest molecule per cage**. ***(b)*** Guest molecules **rotate freely within the cage**.
3. Guest molecules do **not** interact with each other, so that the **partition function** describing the guest molecule motion is *independent* of the presence and type of other guest molecules.
4. Classical statistics applies. 

The **==set of equations==** for the configuration partition function for clathrate hydrate in which a fraction $y$ of the cages are occupied by a guest molecule (condition: the **chemical potentials** of both guest and host molecules in the coexisting phases be equal): 

$$
\frac{\mu^i_{H_2O} - \mu^\beta_{H_2O}}{kT} \equiv - \frac{\Delta\mu^\beta}{kT} = \nu_1\ln(1-\underset{j}{\sum}y_{1j})+\nu_2\ln(1-\underset{j}{\sum}y_{2j})
\tag{1},
$$
^eq1

$$
y_{ij}(T,P) = \frac{C_{ij}(T,P)f_i(T,P)}{1+\underset{k}{\sum}C_{ik}(T,P)f_k(T,P)}
\tag{2},
$$
^eq2

$$
C_{ij}(T,P) = \frac{z_{ij}}{k_BT}\int^{a_i/2}_{0}\exp\left[-\frac{\omega_{ij}(r)}{k_BT}\right]4\pi r^2dr
\tag{3},
$$
^eq3

where:
- $\mu^\beta_{H_2O} =$ chemical potential of unoccupied water-ice clathrate structure,
- $\mu^i_{H_2O}=$ chemical potential of water in coexisting phase,
- $y_{ij}=$ fractional occupancy of cage sites $i=1,2$ by molecule of species $j$,
- $f_j=$ fugacity of guest molecule $j$ in its pure phase (i.e., $\mu_j=kT\ln f_i$),
- $a_i =$ cage radius,
- $\omega_{ij}(r)=$ spherically averaged potential energy of the guest molecule located a distance $r$ from the cage center,
- $k_B=$ Boltzmann's constant,
- $k=$ gas constant.
- factors $\nu_1$ and $\nu_2$ are the number of cage sites per water molecule for the large and small cages, respectively. For ==structure I==, $\nu_1=1/23$ and $\nu_2=3/23$; for ==structure II==. $\nu_1=2/17$ and $\nu_2=1/17$.
- Numerical factor $z$ is the ratio of the *rotational and intramolecular vibrational partition function (volume factor removed) of the guest molecule in the cage* to *that of the freee molecule* at the same temperature. If the rotational and intramolecular vibrational degrees of freedom of the encaged molecule are the same as for the free molecule, $z_{ij}=1$. In what follows, we assume that $z_{ij}=1$.


=> the **==fugacity for a single guest species==** $j$:
$$
f_j(T,P)=\phi_j(T,P_0)P_0\exp\frac{1}{kT}\int^P_{P_0}V(T,P')dP'
\tag{4},
$$
^eq4
where:
- $V$: the volume of the coexisting guest species phase at system temperature $T$ and pressure $P$,
- $P_0$: a reference pressure,
- $\phi(T,P_0)$: the fugacity coefficient at reference conditions.

The **==quantity==** $\Delta\mu^\beta$ :

$$
\begin{aligned}
\frac{\Delta\mu^\beta(T,P)}{kT} &= \frac{\Delta\mu^\beta(T_0,P_0)}{kT_0}-\int^T_{T_0}\frac{\Delta h^\beta(T',P_0)}{kT'^2}dT'\\
&+\frac{1}{kT}\int^P_{P_0}\Delta V^\beta(T,P')dP'
\end{aligned}
\tag{5}
$$
^eq5

where:
- $\Delta h^ \beta, \Delta V^\beta$ are the **enthalpy** and **volume difference** between the empty hydrate and coexisting water phase,
- $T_0$ is a reference temperature.

In the **==low-pressure==** (<< 1 kilobar) regime considered in [[lunine_stevenson_1985#Clathrate equilibria at moderate pressures in the presence of ammonia|§5]] and [[lunine_stevenson_1985#High-pressure equilibria|§6]], **3 simplifications** are made:
- $C_{ij}(T,P)=C_{ij}(T)$.
- The last term in equation [[lunine_stevenson_1985#^eq5|(5)]] is neglected.
- $f_j=P_j=$ pressure exerted by the guest species vapor (or supercritical fluid) phase.

$C_{ij}$  are called ==Langmuir constants== and depend on the **molecular properties** through $\omega(r)$, the ==spherically averaged interaction between guest and cage==. This effective potential depends on the **shape** as well as **size** of the molecule. Equation [[lunine_stevenson_1985#^eq3|(3)]] explicitly ***assumes a spherical cage***; this is adequate for all cages. The **largest deviation from sphericity** is in structure I, where the vertices of the large cage as defined by water oxygen atoms vary in distance to center by $\lesssim 14\%$  (Davidson 1971).

McKoy and Sinanoglu (1963) and Parrish and Prausnitz (1972) derived expressions for the **==spherically averaged potentials for spherical and rodlike guest molecules using the Kihara potential==** appropriate for ==dispersion interactions== between guest and host:

$$
\Gamma(r)=\epsilon\left[\left(\frac{\rho_m}{\rho}\right)^{12}-2\left(\frac{\rho_m}{\rho}\right)^6\right],\text{  }\rho >0,
\tag{6}
$$
^eq6

for a **single guest molecule interaction**.
where:
- $\rho =$ shortest distance between molecular cores,
- $\epsilon =$ potential minimum,
- $\rho_m =$ separation at which $\Gamma =-\epsilon$ is attained.
- Note that when the core radius is zero (pointlike molecules), we recover the Lennard0Jones 12-6 potential (used in van der Waals and Platteeuw 1959), and that $\rho/(2)^{1/6}=\sigma$, the distance of closed approach of two molecules which collide with zero initial relative kinetic energy (Hirschfelder, Curtiss, and Bird 1954, p.23).


The **==derivation of the spherically averaged potential==** is formally the same as in Fowler and Guggenheim (1960, pp.389-339) for models of liquids using the Lennard-Jones (L-J) potential, and consists of keeping the guest molecule fixed at distance $r$ from the center while the host water molecule is moved about a spherical surface of radius $a$ centered on the origin. The results form McKoy and Sinanoglu (1963) for ***spherical guest molecules***:

$$
\begin{aligned}
\omega(r)&=\frac{Z\epsilon}{2}\left[\frac{\rho_m^{12}}{a^{11}r}\left(\delta^{10}+\frac{c}{a}\delta^{11}\right)-\frac{2\rho_m^6}{a^5r}\left(\delta^4+\frac{c}{a}\delta^5 \right) \right],\\
\delta^N&=\frac{1}{N}\left[\left(1-\frac{r}{a}-\frac{c}{a} \right)^{-N}-\left(1+\frac{r}{a}-\frac{c}{a} \right)^{-N} \right],
\end{aligned}
\tag{7}
$$
^eq7

and for ***rodlike molecules***:
$$
\begin{aligned}
\omega(r)&=\frac{Z\epsilon}{2}\sum^\infty_{n=0}\left(-\frac{d}{a} \right)^n\left[f_n\frac{\mu_n(y)}{\alpha^4}-\frac{g_n\lambda_n(y)}{\alpha^2} \right],\\
\mu_n(y)&=\frac{1}{\sqrt{y}}\left[\frac{1}{(1-\sqrt{y})^{n+10}}-\frac{1}{(1+\sqrt{y})^{n+10}} \right]\mathscr{F}(d),\\
\lambda_n(y)&=\frac{2}{\sqrt{y}}\left[\frac{1}{(1-\sqrt{y})^{n+4}}-\frac{1}{(1+\sqrt{y})^{n+4}} \right]\mathscr{G}(d),
\end{aligned}
\tag{8}
$$
^eq8

where:
- $d=$ rod length,
- $Z=$ number of nearest-neighbor water molecules in a cage of radius $a$ (20 for small, 24 for large cage),
- $c=$ core radius of guest molecule,
- $y=(r/a)^2$,
- $\alpha=(a/\rho_m)^3$,
- and we find the constants $f_n$ and $g_n$ to be (Marion 1970, pp.542-543):
$$
\begin{aligned}
f_n&=\begin{pmatrix}-6\\n\end{pmatrix}\frac{1}{n+1}\frac{1}{10+n},\\
g_n&=\begin{pmatrix}-3\\n\end{pmatrix}\frac{1}{n+1}\frac{1}{4+n},
\end{aligned}
\tag{8.1}
$$
^eq8-1

where:
$$
\begin{pmatrix}-l\\n\end{pmatrix}=\frac{l\times(l+1)\times...\times(l+n-1)}{n!}\times(-1)^n
\tag{8.2}
$$
^eq8-2

- The quantities $\mathscr{F}(d)$ and $\mathscr{G}(d)$ are power series in $(d/a)^2$ included to allow accurate comparison between structure I and II Langmuir constants.

For a given choice of parameters $\epsilon$, $\rho_m$, $c$, and temperature $T$ we **compute the integral in equation** [[lunine_stevenson_1985#^eq3|(3)]] using equation [[lunine_stevenson_1985#^eq7|(7)]] or [[lunine_stevenson_1985#^eq8|(8)]], terminating the integration at a value $r$ such that the **==probability of finding the molecule==**, $\exp[-\omega(r)/kT]$, at $r$ is $\lll 1$. This gives $C_{ij}(T)$, and in the low-pressure calculations for a single species $j$, equations [[lunine_stevenson_1985#^eq1|(1)]] and [[lunine_stevenson_1985#^eq2|(2)]] are then solved (using laboratory values for $\Delta\mu^\beta$; see below) for the dissociation pressure for species $j$. To solve for several guest species, abundance relations between them must be applied to close the system. ==Applications of equations== [[lunine_stevenson_1985#^eq1|(1)]]-[[lunine_stevenson_1985#^eq5|(5)]] to the ==high-pressure regime== is discussed in [[lunine_stevenson_1985#High-pressure equilibria|§7]].

### Choice of Molecular Parameters

 We now fit the above equations to existing laboratory data on clathrate to derive values for $\epsilon$, $\rho$, and, where necessary, $c$. We will then use these parameters to predict the dissociation of clathrate at temperatures below that available in the data, or the dissociation pressure for guest molecules simiar to others but for which laboratory data are scant or nonexistent. We use our results in [[lunine_stevenson_1985#Applications|§9]] to predict the composition of the clathrate in plausible nebular models. Our derived parameters also will be used to predict the stability of clathrate under high pressure and in coexistence with an ammonia-water solution.

In evaluating equation [[lunine_stevenson_1985#^eq1|(1)]] a choice of $\Delta\mu^\beta$, the difference in chemical potential between the empty clathrate lattice and coexisting liquid water or ice phase, must be made. To date no attempt has been made to calculate this from first principles; instead it has been derived by laboratory studies. For structure I van der Waals and Plateeuw (1959) suggest 167 cal mole$^{-1}$ at 273 K, based on the bromine clathrate. Parrish and Prausnitz (1972) and Holder, Corbin, and Papadopoulos (1980) derive $\Delta\mu^\beta \sim 310 \text{ cal mole}^{-1}$ based on cyclopropane and methane clathrate. Since the existence of a structure I bromine clathrate has been called into question (Parrish and Prausnitz 1972), we use the latter value. For structure II, Sortland and Robinson (1964) derive 211 cal mole$^{-1}$.

Of equal concern is the temperature dependence of $\Delta\mu^\beta$ below the ice point, on which authors *disagree*.
- Parrish and Prausnitz conclude $\Delta\mu^\beta$ **decreases** by $\sim 6$% for both structures from 273 to 70 K;
- Holder, Corbin, and Papadopoulos (1980) ***predict an increase of 27% for structure I over that temperature range***. 
- Using the Debye model of solids, infrared spectral data on intermolecular translational frequencies in ice I and structure II clathrate (Johari and Chew 1984), and thermodynamic data in Giauque and Stout (1936), we estimate that $\Delta\mu^\beta$ **increases** $\sim 15$% from 273 to 70 K.
- Unfortunately, data on librational vibrations in the clathrate lattice do not exist.
- We adopt a constant $\Delta\mu^\beta$ in the low-pressure ice I regime. In the liquid-water field the temperature dependence of $\Delta\mu^\beta$ is large and dominated by the ice-to-liquid enthalpy change, this will be important for calculations in [[lunine_stevenson_1985#Clathrate equilibria at moderate pressures in the presence of ammonia|§6]] and [[lunine_stevenson_1985#High-pressure equilibria|§7]].

***Table 1*** lists the guest molecules included in the present study, along with sources of laboratory data and their temperature range. Molecules listed under "substantial data" were studied over a temperature range sufficient to allow fitting of Kihara or Lennard-Jones parameters such that the calculated dissociation pressures should be good within 10% at moderate temperatures ($\gtrsim$ 150 K) and probably within a factor of several extrapolated to low (T<100K) temperatures. Molecules in the "some data" category have been studied under restricted temperature ranges, and the consequent degree of uncertainty in dissociation pressure at low temperatures increases by about a factor of 10. Those molecules listed under the "little or no data category" required special treatment.... (Read more on page 8).

... Note that two sets of Langmuir constants were calculated for each molecule, one for each structure, using the *same* mixed force parameters $c_m$, $\epsilon_m$, $\rho_m$. The calculations of incorporation of molecules from a solar composition gas into clathrate is done in [[lunine_stevenson_1985#Applications|§9]] for both structure I and II. Using the same force parameters in both structures assumes the guest molecule interaction with individual water molecules is not affected by cage size or number of water molecules per cage. This is a good approximation so long as the guest molecule is substantially smaller than the cage size, which is true for most molecules of interest here.

***Table 2*** lists dissociation pressures derived from the data fits over a range of temperatures, below the low-pressure ice point, of interest to solar system studies. Also shown are corresponding data points, when available, from the data sources given in Table 1 (Read more on page 9).

The ability to fit the data with two or three parameters so well over large temperature ranges gives confidence in the physical significance of the form of the equation, our choice of $\Delta\mu^\beta=\text{ constant}$, and our ability to use those fits to extrapolate to low temperature and high pressure.

These results may be conveniently utilized by fitting to the approximate form $\log P=A/T+B$< where $A$, $B$ are constants (Miller 1961).

Data on Ar, Kr, Xe and $\text{CH}_4$ clathrate extend to low temperatures, as low as 82 K for the CH$_4$ clathrate. Below 110 K, condensation of water vapor may produce a **metastable ice phase**. Using the **maximum estimated enthalpy difference** between amorphous ice and ice I of 300 cal mole$^{-1}$ (Eisenberg and Kauzmann 1969, p. 90), we calculated the ratio of $\Delta\mu^\beta$ for amorphous ice divided by that for hexagonal ice to be 0.91 at 100 K and 0.65 at 70. The dissociation pressure data for methane in Table 1 strongly suggest no change in $\Delta\mu^\beta$ for T as low as 70 K, consistent with laboratory conditions in which ice I itself is cooled below 110 K or the condensing water vapor forms the clathrate phase directly in the presence of methane gas. The existence of amorphous ice under nebular condensation conditions is controversial; in what follows we assume hexagonal water ice but discuss the effect of having amorphous ice where relevant (?? amorphous ?? hexagonal ice??).

We now use our fitted parameters to **derive dissociation pressures** of clathrate containing guest molecules for which few or no laboratory data are available. We reason in the following manner:
- The **mixed force parameters** $c_m$, $\epsilon_m$, $\rho_m$, fitted to laboratory data, **characterize** the **averaged intermolecular potential interaction** between guest molecule and the cage comprised of water molecules.
- **Similarly shaped guest molecules** will likely experience **similar types of interactions** with the cage; hence, using mixing rules we can **derive Kihara parameters** **for** the **unknown** molecule **from** those of a **similar type** of molecule for which **dissociation pressure data exist**. 

The **==geometric mean and hard-sphere mixing rules==** (Prausnitz 1969, pp. 63, 104):

$$
c_m=c,\quad \epsilon_m=(\epsilon\epsilon_\omega)^{1/2},\quad\rho=\frac{\rho+\rho_\omega}{2}
\tag{9}
$$
^eq9

where:
- unsubscripted parameters refer to the pure guest molecules,
- $\omega$ regers to the water lattice.
- take $c_\omega=0$ as in Holder, Corbin and Papadopouslos (1980), since the main guest-water molecule interaction is with the pointlike oxygen atom; guest-hydrogen atom interaction has been shown by numerical modeling to be much less important.
- Values of $\epsilon$, $\rho$, $c$ are obtained from tables based on virial data; these along with the mixed parameters for the known clathrate are used to derive effective $\rho_\omega$, $\epsilon_\omega$ from equation [[lunine_stevenson_1985#^eq9|(9)]].
- Using tabulated $\epsilon$, $\rho$, $c$ for the unknown molecule, equations [[lunine_stevenson_1985#^eq9|(9)]] give the mixed parameters for this species from which we derive dissociation pressure in equations [[lunine_stevenson_1985#^eq1|(1)]]-[[lunine_stevenson_1985#^eq3|(3)]] and [[lunine_stevenson_1985#^eq7|(7)]] or [[lunine_stevenson_1985#^eq8|(8)]].
- Because two-parameter L-J fits to virial data are better established as "reference data" in the literature, and our two-parameter fit to the known N$_2$ dissocisation-pressures is fairly accurate, we employed the L-J potential for this portion of the study.

\[...\]

The **==interaction potential energy==** between the CO dipole moment $\xi_{CO}$ and that of another dipole $\xi_p$, **==averaged over all orientations==**, is

$$
\bar{\Gamma}_{ij}=-\frac{\frac{2}{3}\xi^2_{CO}\xi^2_p}{r^6k_BT}.
\tag{10}
$$
^eq10

The CO molecule interacts with a variable cage averaged dipolar field estimated by Davidson (1971) to be roughly comparable to that of a single water molecule.
- Boltzmann factor in $\bar{\Gamma}_{ij}$ produces the strong temperature dependence.
- Gurikov (1983) states that the numerical factor in equation [[lunine_stevenson_1985#^eq10|(10)]] should be $\frac{1}{3}$.

\[...\]

A rough measure of the possible magnitude of the net effect of hindered rotation from the **==Helmholtz free energy difference==** $\Delta F$ between the nonrotating molecule and the freely rotating diatomic molecule:

$$
\Delta F\approx RT \ln\left(\frac{iIk_BT}{\bar{h}^2}\right)-\Delta E-RT\ln N
\tag{11}
$$
^eq11

where:
- $I=$ moment of inertia of the molecule,
- $\bar{h}=$ Planck's constant divided by $2\pi$,
- $N=$ number of cage sites per unit cell ($\sim 8$),
- $\Delta E=$ energy gained over spherically averaged state by oriented guest molecule,
- $i=1$ for like, $2$ for unlike, nuclei.

\[...\]

### Double Occupancy of Cage Sites

\[...\]

Consider a molecule with Langmuir constant $C_M$ occupying the large cage of a structure I clathrate, and a second molecule with Langmuir $C_H \ll C_M$. Equation [[lunine_stevenson_1985#^eq10|(10)]] can be **==generalized==** to read (writing out the large-cage term only):

$$
\begin{aligned}
\frac{\Delta\mu^\beta}{kT}=\frac{3}{23}\ln (1&+C_MP_M+C_HP_H+q_{MH}C_MC_HP_MP_H\\
&+ \frac{1}{2}q_{MM}C^2_MP^2_M+\frac{1}{2}q_{HH}C^2_HP^2_H),
\end{aligned}
\tag{12}
$$
^eq12

where:
- $P_M, P_H$ are the partial pressures of $M$ and $H$ in the gas,
- $q_{ij}$ gives the probability of double occupancy of a cage site by molecules $i$ and $j$.
- Note that in the van der Waals and Platteeuw theory $q_{ij}=0$ by assumption.

Hence it is estimated as:

$$
q_{ij}=1-\frac{V_{E,i}}{V_{cage}},
\tag{13}
$$
^eq13

where:
- $V_{cage}=4\pi/3(a-\sigma_j)^3$ is the volume available for occupation of the cage by molecule $j$,
- $V_{E,i}$ is the excluded volume due to occupation by $i$, given by the common volume of spheres of radius $a-\sigma_j$ and $\sigma_i$.
- The quantity $\sigma_j$ is the square-well collision diameter for molecule $j$'s interaction with H$_2$O molecules in the cage, while $\sigma_i$ is the value for molecule $i$'s interaction with molecule $j$.
- Recall $\sigma^6=\rho^6/2$. Figure 7 shows the intersection.
- Assumption: one molecule is fixed at the center of the cage while other is forced to occupy other regions in the cage --> asymmetry in the results for two different molecules (i.e., $q_{HM}\neq q_{MH}$).

>[!caption_right]
>![[lunine_stevenson1985_fig7.png]]
>Geometric construction for clathrate double-occupancy calculation. The quantities $\sigma_i$ and $\sigma_j$ are the collision diameters for molecules $i$ and $j$, $a$ is the cage radius; the shaded region is the cage volume excluded from molecule $j$ given by the common volume of spheres of radius $a-\sigma_j$ and $\sigma_i$.

Evaluating the **==volume of the region of intersection of the 2 spheres==**:

$$
\begin{aligned}
V_{E,i}=\pi \biggl\{(a&-\sigma_j)^3\left[\frac{2}{3}-\cos\theta_2+\frac{1}{3}\cos^3\theta_2\right]\\
&+\sigma^3_i\left[\frac{2}{3}-\cos\theta_1+\frac{1}{3}\cos^3\theta_1\right]\biggl\},\\
\theta_1=\pi/2-\theta_2&/2, \quad \theta_2=2\sin^{-1}\frac{\sigma_i}{2(a-\sigma_j)}.
\end{aligned}
\tag{14}
$$
^eq14


\[...\]



## Clathrate equilibria at moderate pressures in the presence of ammonia

 Calculate phase diagram of clathrate hydrate in the presence of ammonia at moderate pressures. 

\[...\]

At **low temperatures and pressures** in the presence of ammonia, a "competition" would be expected to ensue between **methane**, which seeks water ice so as to form clathrate, and **ammonia**, which would like to form a stoichiometric hydrate.

At **higher temperatures & pressures**, the liquid ammonia-water field would also be expected to affect the stability of the coexisting clathrate, since the energy cost in converting liquid water to clathrate hydrate structure differs from that of water ice and results in a different slope to the dissociation pressure-temperature curve.

==Assumptions:==
1. NH$_3$ does not incorporate as a guest molecule in clathrate
2. NH$_3$ does not incorporate in the cage-forming ice clathrate lattice, nor does it form a clathrate lattice structure of its own.
=> equate chemical potentials for the ammonia hydrates and clathrate + evaluate them using properties known from laboratory data or calculated from [[lunine_stevenson_1985#Statistical mechanical model to predict clathrate formation|§5]].

Since complete clathrate and hydrate formation would exhaust the available water ice in a solar composition nebula, we examine ==phase equilibria== between the following assemblages (??):

*(a)* NH$_3$ $-$ H$_2$O$_{(L)}$ $+$ CH$_{4(FL)}$,
*(b)* NH$_3$ $-$ H$_2$O$_{(L)}$ $+$ CH$_{4}$ $\cdot$ 6H$_2$O + CH$_{4(FL)}$,
*(c)* NH$_3$ $-$ H$_2$O$_{(L)}$ $+$ ice I $+$ CH$_{4(FL)}$,
*(d)* NH$_3$ $\cdot$ H$_2$O$_{(s)}$ $+$ ice I $+$ CH$_{4(FL)}$,
*(e)* NH$_3$ $\cdot$ H$_2$O$_{(s)}$ $+$ CH$_4$ $\cdot$ 6H$_2$O $+$ CH$_{4(FL)}$,
*(f)* 2NH$_3$ $\cdot$ H$_2$O$_{(s)}$ $+$ CH$_4$ $\cdot$ 6H$_2$O $+$ CH$_{4(FL)}$.

Here:
- (s) = solid,
- (L) = liquid, 
- (FL) refers to vapor, liquid, or supercritical phase as appropriate, 
- CH$_4$ $\cdot$ 6H$_2$O indicates structure I methane clathrate,
- ice I is pure hexagonal water ice I.

\[...\]

Since the ammonia-water solution is in coexistence with pure water ice, the additional **==condition==**

$$
\mu^L_{H_2O}=\mu^I_{H_2O}
\tag{15}
$$
^eq15

holds, where:
- $\mu^L_{H_2O}$ is the chemical potential of water in the ammonia-water solution, and
- $\mu^I_{H_2O}$ that in ice I.

Using thermodynamics to predict the formation of clathrate from the ammonia hydrate (i.e., assemblages \[*e*\] and \[*f*\], no free water ice present); the equilibrium is:

$$
\begin{aligned}
\text{CH}_4&\text{(FL)} + 12(\text{NH}_3\cdot\text{H}_2\text{O})(\text{s})\\
&\Leftrightarrow \text{CH}_4\cdot6\text{H}_2\text{O}+6(2\text{NH}_3\cdot\text{H}_2\text{O})(\text{s})+\text{CH}_4\text{(FL)}.
\end{aligned}
\tag{16}
$$
^eq16

In terms of **==chemical potentials==**,

$$
\mu_{2\text{NH}_3-\text{H}_2\text{O}}+\mu^{\text{cl}}_{\text{H}_2\text{O}}=2\mu_{\text{NH}_3-\text{H}_2\text{O}}.
\tag{17}
$$
^eq17

Now,

$$
\begin{aligned}
\mu_{\text{NH}_3-\text{H}_2\text{O}}&=\mu^{\text{v}}_{\text{NH}_3}+\mu^{\text{v}}_{\text{H}_2\text{O}}\\
&=kT\left(\ln\frac{P^{\text{NH}_3-\text{H}_2\text{O}}_{\text{NH}_3}}{P^R_{\text{NH}_3}}+\ln\frac{P^{\text{NH}_3-\text{H}_2\text{O}}_{\text{H}_2\text{O}}}{P^R_{\text{H}_2\text{O}}}\right)
\end{aligned}
\tag{18}
$$
^eq18

and

$$
\mu_{2\text{NH}_3-\text{H}_2\text{O}}=kt\left(2\ln\frac{P^{2\text{NH}_3-\text{H}_2\text{O}}_{\text{NH}_3}}{P^R_{\text{NH}_3}}+\ln\frac{P^{2\text{NH}_3-\text{H}_2\text{O}}_{\text{H}_2\text{O}}}{P^R_{\text{H}_2\text{O}}} \right),
\tag{19}
$$
^eq19

where:
- $\mu^\text{v}_x=$ chemical potential in the vapor phase of constituent *x*,
- $P^\text{y}_x=$ vapor pressure of constituent *x* over solid compound *y*,
- $P^R_x=$ reference pressure for the pure component *x* at the system temperature *T*.

\[...\]

\[equations (20) - (25)\]

## High-pressure equilibria

Use results from statistical model to calculate complete stability fields of both methane & molecular nitrogen clathrate hydrate (up to tens of kilobars of pressure). Although almost no laboratory data are available at these pressures, the regime is directly relevant to the interiors of large satellites such as Titan and Triton, and perhaps the planet Pluto.

## Kinetics of clathrate formation




## Applications
 Apply the results of previous sections to calculate the abundance of volatiles incorporated in clathrate formed from a solar composition gas and explores implications for the current composition and evolution of satellites and giant-planet atmospheres. 

 
## Summary & Conclusions %%













