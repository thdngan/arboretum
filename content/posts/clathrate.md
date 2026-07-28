---
title: Clathrate hydrates
date: 2024-05-15
tags:
  - chemistry
  - physics
  - planetary-science
  - thermodynamics
  - incomplete
  - writings
  - notebooks
draft: false
---
>[!caption_right]
>![[methane-clathrate.jpg]]
>Methane clathrate block (Oregon, USA)

Clathrate hydrates are tiny molecular cages: water molecules forming crystalline structures that trap gas molecules inside, an icy prison for gases like methane, carbon dioxide, and even hydrogen sulfide. The most common version of this involves water ice lattices with methane tucked away inside, but under the right conditions, plenty of other gases can get in on the action.

Now, throughout this post, we're mostly talking about clathrate compounds where water ice acts as the structural backbone (the "host") so when we say "clathrate," we mean clathrate hydrate. The gas molecules trapped in these cages are called "guest" molecules, and if the main guest is methane, we call it methane clathrate.

## Why do clathrates matter in the outer Solar System?

When you look at [[ocean worlds|places]] like Titan, Triton, or maybe even Pluto, you’ve got to wonder how they ended up with the volatiles they have. Clathrates might have played a major role in their formation, acting like time capsules that stored and later released important gases. Plus, thanks to new observational techniques, we might finally get some direct evidence of clathrates existing on other celestial bodies, which would be a big deal for planetary science.

Lunine & Stevenson [-@Lunine1985] extended a statistical mechanical model of clathrate formation, originally developed by Platteeuw and van der Waals [-@vanderWaals1959], to predict how and when clathrates form across a huge range of cosmic conditions. These conditions span from ultra-low pressures, like the ones found in gaseous nebulae where planets and moons may have formed, to intermediate pressures like Titan’s atmosphere, and even to super-high pressures deep inside icy moons.

## Clathrate structures & what we know so far

Clathrate hydrates have an open, cage-like design built from 20 to 28 hydrogen-bonded water molecules. They come in two main structural types: Structure I and Structure II. The size of the guest molecule determines which type forms. Structure I, for example, has a mix of small and large cages and can host molecules like CO2 and CH4. Meanwhile, Structure II has even bigger cages and can accommodate gases like O2, Kr, and Ar.

For a long time, we thought that if a molecule was smaller than 5.8 angstroms, it would automatically form Structure I. But Davidson et al. [-@Davidson1984] showed that argon and krypton actually prefer Structure II, even though they’re small enough for Structure I.

We also differentiate between pure and mixed clathrates. Pure clathrates have only one type of guest molecule, while mixed clathrates can host multiple. Each type has a specific [[dissociation]] pressure (the minimum gas pressure needed for stability) and occupancy fraction (how many cages are actually filled).

## What have past studies told us?

There’s been a lot of work done to figure out how guest molecules interact with their icy cages. Some key research has focused on:

- How much a guest molecule can rotate inside its cage and how strong the electric fields inside the structure are [@Davidson1971;@Bertie1982].
- Simulations of how guest and cage molecules move [@Tester1972;@Plummer1983].
- The frustratingly slow kinetics of clathrate formation, Barrer & Edge [-@Barrer1967] found that clathrates form much more efficiently when you shake things up, exposing fresh ice to the gas.
- The physical properties of clathrates, such as their thermal conductivity [@Cook1983;@Stoll1979] and density [@Kvenvolden1982], or the time-dependent [[rheology]] of a clathrate hydrate [[slurry]] [@Pinder1964].

## Clathrates in nature & the Solar System

Clathrates exist in permafrost and ocean sediments here on Earth, evidence includes methane clathrate deposits in Siberia, Canada, and Alaska. There’s also a possibility that nitrogen-oxygen clathrate exists in Antarctic ice [@Miller1969]. The strongest evidence for naturally occurring methane clathrate comes from [[bottom-simulating reflectors]] in ocean sediments, which show a sudden drop in sound velocity due to trapped methane gas [@Shipley1979].

In the solar system, clathrates have been proposed to explain:

- The structure of cometary nuclei [@Delsemme1952].
- Methane-rich Titan, where clathrates might have locked away volatiles during formation [@Lewis1971].
- The stability of carbon dioxide clathrate in Mars’s polar caps [@Miller1970].
- Possible methane and CO2 clathrate frosts on outer planet moons [@Smythe1975].

Despite all this, we still don’t have direct evidence of clathrates beyond Earth, but that doesn’t mean they’re not out there. They could just be masquerading as ordinary water ice, making them tricky to spot in reflection spectra. New advancements in ground-based spectroscopy might finally let us tell the difference between regular ice and clathrate hydrates.

## Thermodynamics and structure (basics)

Clathrate hydrate is a phase in a multicomponent system made up of water and a bunch of different chemical species, ranging from nonpolar and weakly polar to the occasional strongly polar ones. It's [[nonstoichiometric]], so while the number of cages is fixed, their fractional occupancy depends on temperature, pressure, and the relative abundance of species.

Even though the structure is different from normal ice phases, the bonding mechanism still relies on good old hydrogen bonding [@Jeffrey1967]. The guest molecule-cage interaction is a mix of a repulsive core overlap effect (possibly strong) and a van der Waals-type attraction (induced dipole-induced dipole interactions). The guest needs to stabilize the cage structure because empty cages are just _not_ energetically favorable compared to regular, more compact water ice forms.

The phase boundary in temperature-pressure space is defined when the chemical potentials (aka Gibbs energies, $g$) of each component in the coexisting phases are equal:

$$
dg = -SdT+VdP
$$

The two coexisting phases in equilibrium are:

1. **Clathrate hydrate** with the guest molecule trapped inside.
2. **Water ice or liquid**, which may contain some dissolved guest molecules, plus a pure phase of the guest species stable at ambient temperature and pressure.

Since we’re keeping things simple, let’s consider only a single guest species.

> [!caption_left]
> ![[lunine_stevenson1985_fig2.png]]
>Here’s a schematic of clathrate stability fields for a guest molecule (like methane). The solid line shows where clathrate is thermodynamically preferred over water ice or liquid, while the dashed line is the ice-liquid phase boundary. Dotted lines represent vapor-liquid (A) and liquid-solid (B) phase boundaries of the guest species. Note how the slope of the clathrate stability field changes when crossing the ice-liquid boundary! From Lunine & Stevenson [-@Lunine1985].

## Breaking down the phase boundary

Looking at the figure, let’s start with the low-pressure regime where system pressure is roughly the guest molecule’s vapor pressure (since water’s vapor pressure is usually much lower). As pressure increases at constant temperature, the Gibbs energy of the gas phase increases due to decreasing entropy, while the Gibbs energy of the clathrate stays relatively unchanged. So higher pressures favor clathrate formation.

In the ideal gas regime, both the net volume change and entropy change for clathrate formation are negative, so the [[Clausius-Clapeyron equation|Clausius-Clapeyron equation]] predicts a positive $dT/dP$.

At higher pressures, compressive effects on the guest molecule (and a little bit on the water) start to matter, decreasing the volume change from phase A (guest + $H_2O$) to phase B (clathrate). This means:

- More pressure is needed to stabilize clathrate than the ideal gas model predicts.
- $dT/dP$ decreases, which is visible in the figure.
- At a critical point ($T_c$), the volume change becomes zero and $dT/dP = 0$, marking the highest temperature at which clathrate is stable.

Each species has a unique $T_c$, and below it, both a minimum and maximum pressure define the stability range. The minimum pressure exists because gas entropy is huge at low pressures, and the maximum pressure occurs when the pure guest phase gets so dense that the volume change (clathrate → guest + $H_2O$) becomes energetically favorable.

## Guest-host interaction (it's more than just occupying space)

It’s a mistake to think of guest molecules as impurities randomly filling in gaps in the water lattice. X-ray diffraction [@Jeffrey1967] shows a well-defined cage structure with ~10 Å diameters. Davidson [-@Davidson1971] suggests that water dipolar fields mostly cancel out inside the cage, meaning guest-host interactions are pretty weak.

Various studies (infrared spectra, sound velocity, and thermal conductivity experiments) reinforce that clathrate properties mostly come from the water lattice, with the guest molecule playing a minor role. Even clathrate’s famously low thermal conductivity might be due to its lattice structure rather than guest coupling [@DharmaWardana1983], though that’s still debated.

Most of the guest-host attraction comes from London dispersion forces [@Fowler1960], with minor contributions from dipole-induced dipole and dipole-dipole interactions. Even noble gases get trapped in clathrate cages [@vanderWaals1959], showing how weak but essential these forces are. Strongly dipolar molecules can also fit inside, but that’s a discussion for another section (_cough_ ammonia incorporation _cough_).

## Modeling clathrate formation: Adsorption, but in 3D (Lunine & Stevenson, 1985)

Guest molecule incorporation works like ideal [[gas adsorption|adsorption]] onto fixed sites, extended into three dimensions. Lunine & Stevenson [-@Lunine1985] made the following assumptions:

1. The $H_2O$ lattice structure's free energy doesn’t depend on guest molecule occupancy.
2. Each cage holds one guest molecule, which rotates freely.
3. Guest molecules don’t interact, meaning their partition function is independent of others.
4. Classical statistics apply.

From these assumptions we get the set of equations governing clathrate stability. The key one is:

$$
y_{ij}(T,P)= \frac{C_{ij}(T,P)f_i(T,P)}{1+\underset{k}{\sum}C_{ik}(T,P)f_k(T,P)}
$$

This equation tells us how many cages are occupied ($y_{ij}$) as a function of temperature, pressure, and fugacity ($f$).

We also have:

- **Langmuir constants** ($C_{ij}$), dependent on molecular properties via the **spherically averaged potential energy** between guest and cage.
- **Kihara potential** models [@McKoy1963;@Parrish1972] to describe guest-host interactions.

## Side notes 

Which structure is dominant? -> more ==energetically favorable==??

1. **Guest molecule size & type:**
- sI is typically formed with small molecules like methane and carbon dioxide.
- sII can form with larger molecules like propane and ethane.

2. **pressure and temperature conditions:** Each structure has a distinct stability region in the pressure-temperature phase diagram.
3. **Concentration of guest molecules:** partial pressure or concentration of different guest molecules in the system influences which clathrate structure forms.
4. **thermodynamic stability:** Gibbs free energy. structure with the ==lowest Gibbs free energy== is the most stable -> more likely to be dominant.

## References