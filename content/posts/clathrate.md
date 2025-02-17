---
title: Clathrate Hydrate
date: 2024-05-15
tags:
  - chemistry
  - physics
  - planetary-science
  - paper-notes
  - thermodynamics
  - incomplete
draft: false
---
>[!caption_right]
>![[methane-clathrate.jpg]]
>Methane clathrate block (Oregon, USA)

Clathrate hydrates are like nature’s tiny molecular cages—water molecules form complex crystalline structures that trap gas molecules inside. Think of it as an icy prison for gases like methane, carbon dioxide, and even hydrogen sulfide. The most common version of this involves water ice lattices with methane tucked away inside, but under the right conditions, plenty of other gases can get in on the action.

Now, throughout this post, we're mostly talking about clathrate compounds where water ice acts as the structural backbone—the "host"—so when we say "clathrate," we mean clathrate hydrate. The gas molecules trapped in these cages are called "guest" molecules, and if the main guest is methane, we call it methane clathrate. %% Occasionally, we’ll bring up other hosts, like quinol, in which case we’ll refer to them as quinol clathrates. But if a compound involves water molecules chemically bonding rather than forming a clathrate structure, we'll simply call it a hydrate—like ammonia hydrate, for example. %%




### Why Do Clathrates Matter in the Outer Solar System?

When you look at places like Titan, Triton, or maybe even Pluto, you’ve got to wonder how they ended up with the volatiles they have. Clathrates might have played a major role in their formation, acting like time capsules that stored and later released important gases. Plus, thanks to new observational techniques, we might finally get some direct evidence of clathrates existing on other celestial bodies—a game-changer for planetary science!

Lunine & Stevenson (1985)[^1] extended a statistical mechanical model of clathrate formation, originally developed by Platteeuw and van der Waals (1959)[^2], to predict how and when clathrates form across a huge range of cosmic conditions. These conditions span from ultra-low pressures—like the ones found in gaseous nebulae where planets and moons may have formed—to intermediate pressures like Titan’s atmosphere, and even to super-high pressures deep inside icy moons.

### Clathrate Structures & What We Know So Far

Clathrate hydrates have an open, cage-like design built from 20 to 28 hydrogen-bonded water molecules. They come in two main structural types: Structure I and Structure II. The size of the guest molecule determines which type forms. Structure I, for example, has a mix of small and large cages and can host molecules like CO2 and CH4. Meanwhile, Structure II has even bigger cages and can accommodate gases like O2, Kr, and Ar.

For a long time, we thought that if a molecule was smaller than 5.8 angstroms, it would automatically form Structure I. But Davidson et al. (1984)[^3] turned that idea on its head when they showed that argon and krypton actually prefer Structure II—even though they’re small enough for Structure I!

We also differentiate between pure and mixed clathrates. Pure clathrates have only one type of guest molecule, while mixed clathrates can host multiple. Each type has a specific [[dissociation]] pressure (the minimum gas pressure needed for stability) and occupancy fraction (how many cages are actually filled).

### What Have Past Studies Told Us?

There’s been a lot of work done to figure out how guest molecules interact with their icy cages. Some key research has focused on:

- How much a guest molecule can rotate inside its cage and how strong the electric fields inside the structure are (Davidson, 1971[^4]; Bertie & Jacobs, 1982[^5]).
- Simulations of how guest and cage molecules move (Tester et al., 1972[^6]; Plummer & Chen, 1983[^7]).
- The frustratingly slow kinetics of clathrate formation—Barrer & Edge (1967)[^8] found that clathrates form much more efficiently when you shake things up, exposing fresh ice to the gas.
- The physical properties of clathrates, such as their thermal conductivity (Cook & Leaist, 1983[^9]; Stoll & Bryan, 1979[^10]) and density (Kvenvolden & McDonald, 1982[^11]), or the time-dependent [[rheology]] of a clathrate hydrate [[slurry]] (Pinder, 1964[^18]).

### Clathrates in Nature & the Solar System

Clathrates exist in permafrost and ocean sediments here on Earth—evidence includes methane clathrate deposits in Siberia, Canada, and Alaska. There’s also a possibility that nitrogen-oxygen clathrate exists in Antarctic ice (Miller, 1969[^12]). The strongest evidence for naturally occurring methane clathrate comes from [[bottom-simulating reflectors]] in ocean sediments, which show a sudden drop in sound velocity due to trapped methane gas (Shipley et al., 1979[^13]).

In the solar system, clathrates have been proposed to explain:

- The structure of cometary nuclei (Delsemme & Swings, 1952[^14]).
- Methane-rich Titan, where clathrates might have locked away volatiles during formation (Lewis, 1971[^15]).
- The stability of carbon dioxide clathrate in Mars’s polar caps (Miller & Smythe, 1970[^16]).
- Possible methane and CO2 clathrate frosts on outer planet moons (Smythe, 1975[^17]).

Despite all this, **we still don’t have direct evidence of clathrates beyond Earth**—but that doesn’t mean they’re not out there. They could just be masquerading as ordinary water ice, making them tricky to spot in reflection spectra. Luckily, new advancements in ground-based spectroscopy might finally let us tell the difference between regular ice and clathrate hydrates, which could unlock a whole new understanding of planetary formation and evolution. So, stay tuned!

### Thermodynamics and Structure: The Basics

Clathrate hydrate is this unique phase in a **multicomponent system** made up of **water** and a bunch of different chemical species, ranging from **nonpolar and weakly polar** to the occasional **strongly polar** ones. It's [[nonstoichiometric]]—so while the number of cages is fixed, their **fractional occupancy** depends on temperature, pressure, and the relative abundance of species.

Even though the structure is different from normal ice phases (hello, big open cages!), the bonding mechanism still relies on good old **hydrogen bonding** (Jeffrey & McMullan, 1967[^19]). The **guest molecule-cage interaction**? Well, it's a mix of a **repulsive core overlap effect** (possibly strong) and a **van der Waals-type attraction** (induced dipole-induced dipole interactions). The guest needs to stabilize the cage structure because empty cages are just _not_ energetically favorable compared to regular, more compact water ice forms.

Now, the **phase boundary** in temperature-pressure space is defined when the **chemical potentials** (aka Gibbs energies, $g$) of each component in the coexisting phases are equal. Mathematically, this is:

$$
dg = -SdT+VdP
$$

The two **coexisting phases** in equilibrium are:

1. **Clathrate hydrate** with the guest molecule trapped inside.
2. **Water ice or liquid**, which may contain some dissolved guest molecules, plus a **pure phase** of the guest species stable at ambient temperature and pressure.

Since we’re keeping things simple, let’s consider only a **single guest species**.

> [!caption_left]
> ![[lunine_stevenson1985_fig2.png]]
>Here’s a schematic of clathrate stability fields for a guest molecule (like methane). The solid line shows where clathrate is thermodynamically preferred over water ice or liquid, while the dashed line is the ice-liquid phase boundary. Dotted lines represent vapor-liquid (A) and liquid-solid (B) phase boundaries of the guest species. Note how the slope of the clathrate stability field changes when crossing the ice-liquid boundary! Reprinted from Lunine & Stevenson (1985)[^1].

### Breaking Down the Phase Boundary

Looking at the figure, let’s start with the **low-pressure regime** where system pressure is roughly the guest molecule’s vapor pressure (since water’s vapor pressure is usually much lower). As pressure increases at constant temperature, the **Gibbs energy of the gas phase increases** due to decreasing entropy, while the Gibbs energy of the clathrate remains relatively unchanged. The result? _**Higher pressures favor clathrate formation!**_

In the **ideal gas regime**, both the **net volume change** and **entropy change** for clathrate formation are negative, so the **[[notes/Clausius-Clapeyron equation|Clausius-Clapeyron equation]]** predicts a positive $dT/dP$.

At **higher pressures**, compressive effects on the guest molecule (and a little bit on the water) start to matter, decreasing the volume change from phase A (guest + $H_2O$) to phase B (clathrate). This means:

- **More pressure is needed to stabilize clathrate than predicted by the ideal gas model.**
- $dT/dP$ decreases, which is visible in the figure.
- At a critical point ($T_c$), the **volume change becomes zero and $dT/dP = 0$**, marking the highest temperature at which clathrate is stable.

Each species has a unique $T_c$, and below it, both a **minimum and maximum pressure** define the stability range. The **minimum pressure** exists because gas entropy is huge at low pressures, while the **maximum pressure** occurs when the pure guest phase gets so dense that the **volume change (clathrate → guest + $H_2O$) becomes energetically favorable**.

### Guest-Host Interaction: It's More Than Just Occupying Space

It’s a mistake to think of guest molecules as impurities randomly filling in gaps in the water lattice. X-ray diffraction (Jeffrey & McMullan, 1967[^19]) shows a well-defined cage structure with ~10 Å diameters. Davidson (1971)[^4] suggests that water dipolar fields **mostly cancel out inside the cage**, meaning guest-host interactions are pretty weak.

Various studies (infrared spectra, sound velocity, and thermal conductivity experiments) reinforce that **clathrate properties mostly come from the water lattice**, with the guest molecule playing a minor role. Even clathrate’s famously low thermal conductivity might be due to its **lattice structure rather than guest coupling** (Dharma-Wardana, 1983[^20]), though that’s still debated.

Most of the guest-host attraction comes from **London dispersion forces** (Fowler & Guggenheim, 1960[^21]), with minor contributions from **dipole-induced dipole and dipole-dipole interactions**. Even noble gases get trapped in clathrate cages (van der Waals & Platteeuw, 1959[^2]), showing how weak but essential these forces are. Strongly dipolar molecules can also fit inside, but that’s a discussion for another section (_cough_ ammonia incorporation _cough_).

### Modeling Clathrate Formation: Adsorption, But in 3D (Lunine & Stevenson, 1985[^1])

Think of guest molecule incorporation like ideal [[gas adsorption|adsorption]] onto fixed sites, just **extended into three dimensions**. Lunine & Stevenson (1985)[^1] made the following assumptions:

1. The **$H_2O$ lattice structure**'s free energy **doesn’t depend on** guest molecule occupancy.
2. Each cage holds **one guest molecule**, which **rotates freely**.
3. Guest molecules **don’t interact**, meaning their partition function is independent of others.
4. Classical statistics apply.

From these assumptions, we get the core **set of equations** governing clathrate stability. The key one is:

$$
y_{ij}(T,P)= \frac{C_{ij}(T,P)f_i(T,P)}{1+\underset{k}{\sum}C_{ik}(T,P)f_k(T,P)}
$$

This equation tells us how many cages are occupied ($y_{ij}$) as a function of temperature, pressure, and fugacity ($f$).

We also have:

- **Langmuir constants** ($C_{ij}$), dependent on molecular properties via the **spherically averaged potential energy** between guest and cage.
- **Kihara potential** models (McKoy & Sinanoglu, 1963[^22]; Parrish & Prausnitz, 1972[^23]) to describe guest-host interactions.

### Side notes 

Which structure is dominant? -> more ==energetically favorable==??

1. **Guest molecule size & type:**
- sI is typically formed with small molecules like methane and carbon dioxide.
- sII can form with larger molecules like propane and ethane.

2. **pressure and temperature conditions:** Each structure has a distinct stability region in the pressure-temperature phase diagram.
3. **Concentration of guest molecules:** partial pressure or concentration of different guest molecules in the system influences which clathrate structure forms.
4. **thermodynamic stability:** Gibbs free energy. structure with the ==lowest Gibbs free energy== is the most stable -> more likely to be dominant.



[^1]: Lunine, J. I. and Stevenson, D. J. (1985). Thermodynamics of clathrate hydrate at low and high pressures with application to the outer solar system. *The Astrophysical Journal Supplement Series*, 58:493–531.
[^2]: Platteeuw, J. and van der Waals, J. (1959). Thermodynamic properties of gas hydrates ii: Phase equilibria in the system h2s-c3h3-h2o at 3°c. *Recl. Trav. Chim. Pays-Bas*, 78:126–133.
[^3]: Davidson, D. W., Handa, Y. P., Ratcliffe, C. I., Tse, J. S., & Powell, B. M. (1984). The ability of small molecules to form clathrate hydrates of structure II. _Nature, 311_(5982), 142–143.
[^4]: Davidson, D. W. (1971). The motion of guest molecules in clathrate hydrates. _Canadian Journal of Chemistry, 49_(8), 1224–1242.
[^5]: Yamamuro, O., Handa, Y. P., Oguni, M., & others. (1990). Heat capacity and glass transition of ethylene oxide clathrate hydrate. _Journal of Inclusion Phenomena and Macrocyclic Chemistry, 8_(1), 45–58.
[^6]: Tester, J. W., Bivins, R. L., & Herrick, C. C. (1972). Use of Monte Carlo in calculating the thermodynamic properties of water clathrates. _AIChE Journal, 18_(6), 1220–1226.
[^7]: Plummer, P. L. M., & Chen, T. S. (1983). A molecular dynamics study of water clathrates. _The Journal of Physical Chemistry, 87_(21), 4190–4197.
[^8]: Barrer, R. M., & Edge, A. V. J. (1997). Gas hydrates containing argon, krypton, and xenon: Kinetics and energetics of formation and equilibria. _Proceedings of the Royal Society of London. Series A, Mathematical and Physical Sciences, 300_(1460), 1–24.
[^9]: Cook, J. G., & Leaist, D. G. (1983). An exploratory study of the thermal conductivity of methane hydrate. _Geophysical Research Letters, 10_(5), 397–399.
[^10]: Stoll, R. D., & Bryan, G. M. (1979). Physical properties of sediments containing gas hydrates. _Journal of Geophysical Research, 84_(B4), 1629–1634.
[^11]: ??? Lunine & Stevenson (1985) cited this but I couldn't find it anywhere. HELP.
[^12]: Miller S. L. (1969). Clathrate hydrates of air in antarctic ice. _Science (New York, N.Y.)_, _165_(3892), 489–490.
[^13]: Shipley, T. H., Houston, M. H., Buffler, R. T., Shaub, F. J., McMillen, K. J., Ladd, J. W., & Worzel, J. L. (1979). Seismic evidence for widespread possible gas hydrate horizons on continental slopes and rises. _American Association of Petroleum Geologists Bulletin, 63_(12), 2204–2213.
[^14]: Delsemme, A. H., & Swings, P. (1952). Hydrates de gaz dans les noyaux cométaires et les grains interstellaires. _Annales d'Astrophysique, 15_, 1.
[^15]: Lewis, J. S. (1971). Satellites of the outer planets: Their physical and chemical nature. _Icarus, 15_(2), 174–185.
[^16]: Miller, S. L., & Smythe, W. D. (1970). Carbon dioxide clathrate in the martian ice cap. _Science (New York, N.Y.)_, _170_(3957), 531–533.
[^17]: Smythe, W. D. (1975). Spectra of hydrate frosts: Their application to the outer solar system. _Icarus, 24_(4), 421–427.
[^18]: Pinder, K. L. (1964). Time dependent rheology of the tetrahydrofuran-hydrogen sulphide gas hydrate slurry. _Canadian Journal of Chemical Engineering, 42_(3), 132–138.
[^19]: Jeffrey, G. A., & McMullan, R. K. (1967). The clathrate hydrates. In F. A. Cotton (Ed.), _Progress in inorganic chemistry_ (Vol. 8, pp. 43).
[^20]: Dharma-Wardana, M. W. C. (1983). The thermal conductivity of the ice polymorphs and the ice clathrates. _The Journal of Physical Chemistry_, _87_(21), 4185-4190.
[^21]: Fowler, R. H., & Guggenheim, E. A. (1949). _Statistical thermodynamics_. Cambridge University Press.
[^22]: McKoy, V., & Sinanoğlu, O. (1963). Theory of dissociation pressures of some gas hydrates. _The Journal of Chemical Physics, 38_(12), 2946–2956.
[^23]: Parrish, W. R., & Prausnitz, J. M. (1972). Dissociation pressures of gas hydrates formed by gas mixtures. _Industrial & Engineering Chemistry Process Design and Development, 11_(1), 26–35.