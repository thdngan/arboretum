---
title: "The cosmological Lithium mystery: a Big Bang whodunit"
date: 2024-09-13
tags:
  - cosmology
  - astrophysics
  - notebooks
  - incomplete
  - writings
draft: false
---



![[3_min.jpeg]]



## The Case of the Missing Lithium

>[!caption_left]
>![[abundance.png]]
>Time evolution of the light element abundances during BBN. Time (upper axis) increases to the right, and so the temperature is shown to decrease to the right. From Yeh et al. [-@Yeh2023].

The cosmological lithium problem is one of the biggest unsolved puzzles in #astrophysics. Picture a universe fresh out of the Big Bang, filled with a scorching soup of [[protons]], [[neutrons]], and all sorts of cosmic particles. As everything cools down, atoms start forming, mostly hydrogen and helium, but also a pinch of lithium [@Fields2011].

Now, fast forward billions of years, and we take a look at old, metal-poor stars, which should have held onto that lithium like a cherished relic of the past. But there’s way less lithium-7 (⁷Li) than expected! According to our well-trusted Big Bang Nucleosynthesis (BBN) calculations, we should be seeing about three times more lithium than what we actually observe [@Cyburt2008]. So where did it go?

## Cooking up the universe
>[!caption_right]
>![[nuclear_network.webp]]
>Simplified BBN nuclear network, showing the 12 reactions important for determining light-element abundances. From Fields [-@Fields2023].

Let’s rewind to the first few minutes after the Big Bang. The universe was a sizzling hot, dense plasma, like a space kitchen where nuclear reactions were whipping up the light elements that make up everything we see today. [[Protons]] and [[neutrons]] collided at breakneck speeds, forming deuterium, helium-4 (⁴He), a smidge of lithium-7, and even tinier amounts of beryllium [@Fields2011]. The standard BBN model, our best recipe for this cosmic cook-off, predicts these element abundances with impressive accuracy, and observations of deuterium and helium-4 match up perfectly with what BBN tells us [@Serpico2004].

But then there’s lithium-7. Instead of matching the theoretical predictions, the amount we actually see in ancient stars is dramatically lower [@Spite1982].

>[!caption_left]
>![[light_elements.webp]]
BBN theory predictions for light nuclide abundances versus the cosmic baryon-to-photon ratio $\eta$. Curve widths: 1$\sigma$ theoretical uncertainties. Cyan vertical band: _Planck_ CMB determination of $\eta^{CMB}$ (Aghanim et al., 2020)[^21]. Yellow boxes: light-element observations and corresponding $\eta$ ranges. Hatched vertical band: D/H+$Y_p$ concordant range for $\eta^{BBN}$. (From BBN review in Particle Data Group et al., 2020)[^22]. From Fields [-@Fields2023].

It’s like baking a cake and realizing a key ingredient has mysteriously vanished, but the cake is still somehow edible.


## Tracking the missing Lithium



So, how do we actually measure this elusive lithium? We turn to some of the oldest stars in the universe, ancient, metal-poor stars that have been around since the early days of cosmic history. These stars act like fossilized time capsules, preserving the original chemical makeup of the early universe. By analyzing their light and studying absorption lines, specifically the lithium absorption line at 670.8 nm, we can determine just how much lithium-7 is present [@Melendez2004]. 


What they find is the so-called Spite plateau, a nearly constant level of lithium abundance across different low-metallicity stars [@Spite1982]. But that plateau is far below what BBN predicts! It’s like a conspiracy, either lithium is being secretly destroyed, hidden away, or our understanding of nuclear physics and cosmology needs a serious update.

Researchers have explored all sorts of explanations: maybe lithium is being depleted inside stars, maybe cosmic rays are breaking it down, or maybe there’s some brand-new physics at play that we haven’t discovered yet [@Pospelov2010]. 



>[!caption]
>![[spite_plateau.png]]
>Lithium abundances in selected metal-poor Galactic halo stars. For each star, elemental Li = $^6$Li + $^7$Li is plotted at the star’s metallicity \[Fe/H\] = log10\[(Fe/H)$_{obs}$/(Fe/H)$_⊙$]. The flatness of Li vs Fe is the “Spite plateau” and indicates that the bulk of the lithium is unrelated to Galactic nucleosynthesis processes and thus is primordial. The horizontal band gives the BBN+WMAP prediction; the gap between this and the plateau illustrates the $^7$Li problem. Points below the plateau show $^6$Li abundances; the apparent plateau constitutes the $^6$Li problem. From Fields [-@Fields2011].


## Suspect #1: A game of Hide and Seek

>[!caption_left]
>![[likelihood.webp]]
>Comparison of BBN light-element abundance predictions and observations. Likelihood curves (normalized to peak at unity) for BBN+CMB predictions are shown in magenta. Primordial abundances inferred from astronomical observations are shown in yellow. The CMB determination of $^4$He is shown in cyan. From Fields et al. [-@Fields2020].


Let’s assume for a moment that standard cosmology and #particle #physics are totally on point, and our nuclear physics calculations of mass-7 production are rock solid. If that’s the case, then why the heck are we seeing way less lithium-7 than expected? Theoretically, there should be about three to four times more lithium than what we observe [@Fields2011].

Lithium abundance is usually determined by studying absorption lines in the photospheres of super-old, low-metallicity stars, essentially, the grandparent stars of the galaxy. The Spite plateau, a flat trend in lithium abundance across these stars, suggests that lithium is primordial and hasn’t been significantly affected by later galactic processes [@Spite1982]. But what if we’ve made a mistake somewhere in our assumptions?

One possible error comes from the fact that we measure lithium’s 670.8 nm absorption line, which is sensitive to neutral lithium (Li⁰). However, most lithium in these ancient stars is actually ionized (Li⁺). That means we need to introduce an ionization correction factor, which is super sensitive to the stellar temperature [@Richard2005]. If we systematically underestimated how hot these stars are, then lithium levels could actually be higher than we thought. Some studies suggest that tweaking the temperature scale upwards by around 500–600 K might help, but so far, that fix hasn’t fully solved the problem [@Melendez2004].

Then there’s the big question: is the lithium we see today the same lithium that was originally there? Over billions of years, these stars might have depleted some of their lithium due to high-temperature effects. Processes like convection, turbulence, and [[diffusion]] can mess with lithium abundance, but modeling these effects precisely is tricky [@Pinsonneault1997]. Some studies argue that if lithium was being destroyed inside stars, we should see variations in lithium levels across different stars, which we don’t, at least not much. However, newer models suggest that even after depleting lithium by a factor of three, we could still see a narrow Spite plateau due to turbulent [[diffusion]] and convective overshoot [@Fu2015].

So, does the astrophysical explanation solve the lithium problem? Well... not really. While some stellar effects might contribute to the discrepancy, they don’t seem to fully account for the missing lithium. This means we need to dig deeper, maybe into the realm of nuclear physics or even completely new physics beyond the Standard Model.


## Suspect #2: Did we mess up the math?

What if we’re actually right about how much lithium should be there, and our measurements are spot on, but our theoretical predictions are just... wrong? Maybe the problem is in how we calculate Big Bang Nucleosynthesis (BBN) rather than in what we see [@Fields2011].

BBN is based on solid physics: General Relativity governs the cosmic expansion, and nuclear reactions follow the Standard Model. But nuclear networks are super complex, and mistakes in reaction rates could throw off our lithium predictions [@Cyburt2008].

One idea is that we might have underestimated or overlooked certain nuclear reactions that influence lithium-7 production. The most important reaction for making mass-7 nuclides is ³He(α, γ)⁷Be. While its cross-section has been measured with high precision, absolute values are notoriously difficult to pin down [@Coc2004]. But this reaction is also responsible for solar [[neutrinos|neutrino]] production, and solar [[neutrinos|neutrino]] measurements match predictions almost perfectly. That means tweaking this reaction to solve the lithium problem would mess up our understanding of the Sun, so that’s probably not the answer.

Other nuclear processes, like [[weak interactions|weak interaction]] rates, have been extensively tested and don’t seem to be the issue either [@Serpico2004]. Studies also looked into alternative thermonuclear rates, plasma effects, and electron screening, but none of these offered a viable solution [@Voronchev2010;@Itoh1997;@Boyd2010]. Even reactions involving beryllium-7, like ⁷Be(d, α)αp, turned out to be way less significant than hoped [@Boyd2010].

That leaves resonances, energy states in nuclear reactions that could have been overlooked. Some proposed resonances, like ⁷Be + d → ⁹B* (16.71 MeV) and ⁷Be + t → ¹⁰B*, could theoretically help balance the lithium discrepancy, if their reaction widths are large enough [@Cyburt2012]. But recent studies suggest that while they might help, they don’t fully solve the problem. In fact, Iliadis and Coc [-@Iliadis2020] concluded that nuclear physics alone is unlikely to fix this mystery.


## Suspect #3: Time to break the rules?

If standard astrophysics and nuclear physics aren’t solving the lithium crisis, maybe it’s time to rethink some fundamental assumptions about the universe, which brings us to new physics beyond the Standard Model [@Pospelov2010].

>[!caption]
>![[abundance-vs-lifetime.png]]
>Abundance contours vs decay lifetime. The colored areas indicate parameter regions in which the predicted light-element abundances disagree with observations, and the remaining, white regions are allowed. From Cyburt et al. [-@Cyburt2010].

One idea is that dark matter could be playing a role. Dark matter is still a huge mystery, but we know it must exist. Some theoretical models propose that dark matter particles, perhaps Weakly Interacting Massive Particles (WIMPs), could decay into high-energy particles that mess with primordial element abundances [@Cyburt2010]. If these decays happened during or just after BBN, they could have influenced lithium levels. In fact, certain decay lifetimes (~10²–10³ seconds) seem to line up with observed lithium-7 levels. The catch is that while this helps with lithium, it messes up deuterium predictions.

>[!caption_right]
>![[gravitino-abundance-vs-mass.png]]
>Contours of $\chi^2$ in the (mass, abundance) plane. From Cyburt et al. [-@Cyburt2010].

Another idea comes from supersymmetry (SUSY). If a spin-3/2 gravitino was once a heavier particle that decayed into dark matter, it could create an optimal trade-off between lithium destruction and deuterium production [@Jedamzik2006]. Supersymmetry hasn’t been confirmed by experiments like those at the Large Hadron Collider (LHC) though, so this stays speculative.

There’s also the possibility that fundamental constants aren’t actually constant. Observations of atomic transitions in distant quasars hint that the fine-structure constant (α_EM) might have changed over cosmic time [@Coc2007]. If true, this could impact nuclear physics in BBN and potentially explain lithium discrepancies. However, the evidence for varying constants is still debated, and alternative studies show no change.

Lastly, some have suggested nonstandard cosmologies, like variations in the baryon-to-photon ratio across different regions of the universe. Maybe lithium-7 measurements reflect a local underdensity rather than a true overall abundance. It’s a cool idea, but current constraints make it tricky to justify.

## References