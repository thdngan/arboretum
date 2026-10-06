---
title: Will AI solve the climate crisis?
date: 2026-10-04
tags:
  - writings
  - discussions
  - incomplete
  - artificial-intelligence-AI
  - climate
draft: false
---
I recently visited a friend who is a researcher at one of the big AI labs and has worked on some of its best-known systems. They believe that we will achieve AGI in just a few years with the current exponential growth of the field (AGI stands for artificial general intelligence, which roughly means an AI that can do any intellectual task at least as well as a person can). They also said that there's a possibility that AI might get developed enough to simply solve the climate crisis for us. To be fair to them, they added that they might be wrong about the timing, since they might be living in a bubble of their own field.

Some of the most powerful people in tech say similar things. Sam Altman, the CEO of OpenAI, wrote in 2024 that "fixing the climate" is one of the triumphs that "will eventually become commonplace" ([Altman, 2024](https://ia.samaltman.com/)). That same year, at an AI summit in Washington, the former Google CEO Eric Schmidt was asked whether AI's energy needs can be met without giving up on conservation goals. He answered that "we're not going to hit the climate goals anyway because we're not organized to do it", and went on:

>[!quote] Eric Schmidt ([Business Insider, 2024](https://www.businessinsider.com/eric-schmidt-google-ai-data-centers-energy-climate-goals-2024-10))
>Yes, the needs in this area will be a problem, but I'd rather bet on AI solving the problem than constraining it and having the problem.

My first thought about this claim was: but the thing is, we already have solutions to our climate crisis. We simply lack the policy and the global movement to implement them. If that's right, AI would have to do something harder than inventing a new technology. It would have to become smart enough, fast enough, to hack the timeline of a political problem. I wasn't sure how much of that instantaneous thought would hold up, so I went through the research on each part of it.

---

### Do we already have the solutions?

The Intergovernmental Panel on Climate Change (IPCC) reviews the research on climate change for the world's governments. In the 2022 report on cutting emissions, it is estimated that mitigation options costing 100 USD or less per tonne of CO<sub>2</sub>-equivalent (a unit that counts all greenhouse gases by their warming effect) could reduce global greenhouse gas emissions by at least half of the 2019 level by 2030. And more than half of this potential costs under 20 USD per tonne, with large contributions from solar and wind energy, improvements in energy efficiency, protecting natural ecosystems, and cutting methane (CH<sub>4</sub>) emissions from coal mining, waste, oil and gas ([IPCC WGIII, 2022, C.12.1](https://doi.org/10.1017/9781009157926.001)).

These options have also become cheaper. Between 2010 and 2019, the unit costs of solar energy and of lithium-ion batteries each fell by 85%. The IPCC lists public research funding and deployment subsidies among the policies that brought those costs down ([IPCC WGIII, 2022, B.4.1](https://doi.org/10.1017/9781009157926.001)).

The International Energy Agency (IEA) arrives at a similar conclusion for the energy sector. It has a pathway to net zero emissions by 2050, where net zero means that we add no more greenhouse gases to the atmosphere than we take out. In that pathway, technologies that are available today deliver more than 80% of the emissions cuts needed by 2030. For the 2050 scenario, around 35% of the cuts needed by then come from technologies that are not on the market yet, down from nearly half in the IEA's 2021 version of the pathway ([IEA, 2023](https://www.iea.org/reports/net-zero-roadmap-a-global-pathway-to-keep-the-15-0c-goal-in-reach)).

So my immediate thought was mostly right for this decade and about two-thirds right for 2050. There is still inventing left to do. The IEA names carbon capture and hydrogen-based fuels among the technologies that need rapid progress ([IEA, 2023](https://www.iea.org/reports/net-zero-roadmap-a-global-pathway-to-keep-the-15-0c-goal-in-reach)), and that is where I can imagine a research tool as powerful as AI being useful.

So then... what about the policy side?

---

### What we lack

Global greenhouse gas emissions were at an all-time high in 2024, in spite of the growing deployment of renewable energy, though these emissions are no longer increasing rapidly ([Forster et al., 2026](https://doi.org/10.5194/essd-18-3889-2026)). The authors also track the remaining carbon budget for 1.5°C. This is the amount of CO<sub>2</sub> we can still emit and keep a 50% chance of limiting warming to 1.5°C above pre-industrial temperatures. At the start of 2026 it was 130 billion tonnes, which would be used up in a little more than 3 years at the 2025 rate of emissions.

With the policies that countries have today, the UN Environment Programme projects 2.8°C of warming over this century. If every country fully implemented its current climate pledges, the projection would be 2.3 to 2.5°C ([UNEP, 2025](https://www.unep.org/resources/emissions-gap-report-2025)).

Meanwhile, a lot of public money and planning still goes to fossil fuels (\*sighs\*). Explicit fossil fuel subsidies, meaning fuel is sold for less than it costs to supply, were 725 billion USD in 2024. The International Monetary Fund counts another 6.7 trillion USD in implicit subsidies, meaning costs that fuel prices leave out like air pollution and climate damage for the most part ([Black et al., 2025](https://doi.org/10.5089/9798229034715.001)). Governments also plan to produce more than double the amount of fossil fuels in 2030 than would be consistent with limiting warming to 1.5°C ([Production Gap Report, 2025](https://productiongap.org/2025report/)).

The money needed to change this exists though, according to the IPCC. It writes that "there is sufficient global capital and liquidity to close global investment gaps", and that the barriers are in redirecting that capital to climate action. Investment in reducing emissions this decade (2020-2030) would need to be 3 to 6 times current levels ([IPCC WGIII, 2022, E.5.1 and E.5.2](https://doi.org/10.1017/9781009157926.001)).

So why hasn't it been redirected? A review of three decades of climate mitigation asked why global emissions kept rising. It examined the question through nine lenses, from the fossil fuel industry to lifestyles, and found a common thread in "the central role of power", including "influential vested interests" ([Stoddard et al., 2021](https://doi.org/10.1146/annurev-environ-012220-011104)). One well-documented case is Exxon. Between 1977 and 2003, the oil company's own scientists produced projections of global warming, and 63 to 83% of them matched the warming that was later observed. Their work was at least as skillful as the academic and government models of the time. To the public though, the company's statements about climate science contradicted its own data ([Supran et al., 2023](https://doi.org/10.1126/science.abk0063)).

So Exxon had smart people, good models and the right answer. Yet it still told the public something else. A more intelligent AI could give even more right answers to the average human's problems, but I don't see why those solutions would be treated any differently by the small group of people that actually owns the system. And how an average human like you and me can address *that*, again, is the work of politics.

Anyway, none of this means that AI itself has nothing to offer the climate problem, so the next thing I looked at was what it can do.

---

### What AI can do

The IPCC's 2022 report already mentions AI. It says that digital technologies, AI among them, "can improve energy management in all sectors" and can help low-emission technologies spread. It adds that these gains can be reduced or cancelled out by growing demand for goods and services, and that digital technology "supports decarbonisation only if appropriately governed" ([IPCC WGIII, 2022, B.4.3](https://doi.org/10.1017/9781009157926.001)).

The example closest to my own field is weather forecasting. GraphCast, a machine learning model trained on past weather data, produces a 10-day global forecast in under a minute. It outperformed the most accurate operational single-forecast systems on 90% of the targets tested ([Lam et al., 2023](https://doi.org/10.1126/science.adi2336)). A later model, GenCast, makes sets of forecasts that show the range of likely weather (ensemble forecasts). It has greater skill and speed than the ensemble of the European Centre for Medium-Range Weather Forecasts on 97.2% of targets, and it is better at predicting extreme weather, tracks of tropical cyclone, and wind power production ([Price et al., 2025](https://doi.org/10.1038/s41586-024-08252-9)).

For emissions, the IEA estimates that if the AI applications that exist today were adopted widely, the emissions reductions would be equivalent to around 5% of energy-related emissions in 2035. This is far larger than the emissions of data centres, and far smaller than what is needed to address climate change. The IEA also warns about rebound effects, for example, as the costs of self-driving vehicles fall and their availability increases, they might pull people away from public transport, and concludes that AI "is not a silver bullet and does not remove the need for proactive policy" ([IEA, 2025](https://www.iea.org/reports/energy-and-ai)).

On the optimistic side, we can look at a study led by the economist Nicholas Stern. It estimates that AI applications in three sectors (power, meat and dairy, and light road vehicles) could reduce emissions by 3.2 to 5.4 billion tonnes of CO<sub>2</sub>-equivalent a year by 2035, without considering rebound effects ([Stern et al., 2025](https://doi.org/10.1038/s44168-025-00252-3)). For comparison, the world emitted about 56.8 billion tonnes in 2024 ([Forster et al., 2026](https://doi.org/10.5194/essd-18-3889-2026)). Neither of these estimates depends on AGI though. It's still very hard to address my friend's claim about something far more capable that might be arriving very *soon*.

---

### Smart enough *and* fast enough?

My friend's claim of "a few years" has evidence behind it. METR, a research group that evaluates AI models, measures the length of the software tasks that AI can complete with a 50% success rate, counted as the time those tasks take human experts. That length has been doubling about every 7 months since 2019 ([Kwa et al., 2025](https://arxiv.org/abs/2503.14499)). In METR's January 2026 update, the doubling time since 2024 is about 3 months ([METR, 2026](https://metr.org/blog/2026-1-29-time-horizon-1-1/)).

The same data can be read differently by different researchers though. In a preprint (a paper that has not been peer-reviewed yet), Ge and colleagues fitted an S-shaped curve to METR's data, which is a curve that grows fast and then levels off. They found that the point where growth begins to slow (inflection point) had already passed. They say their goal is to show how fragile forecasts of exponential growth are, and that they are not offering a rigorous forecast of their own ([Ge et al., 2026](https://arxiv.org/abs/2602.04836)).

We can see a similar split in surveys of AI researchers. In the largest one, 2,778 researchers were asked in October 2023 when unaided machines would outperform humans at every possible task. Their combined forecast was a 10% chance by 2027 and a 50% chance by 2047 ([Grace et al., 2025](https://doi.org/10.1613/jair.1.19087)). In a 2025 survey of 475 people by the Association for the Advancement of Artificial Intelligence, 76% of respondents thought that scaling up current AI approaches was unlikely or very unlikely to produce AGI ([AAAI, 2025](https://aaai.org/about-aaai/presidential-panel-on-the-future-of-ai-research/)).

So AGI within a few years is possible, but is it a general consensus among AI researchers? Not exactly. My friend's own disclaimer about living in a bubble of their field is pretty fair.

The timing on the climate side is slightly easier to tell. At the 2025 rate of emissions, the carbon budget for 1.5°C is used up in a little more than 3 years ([Forster et al., 2026](https://doi.org/10.5194/essd-18-3889-2026)). And once a solution exists, it still has to be funded, built and implemented. The IEA notes that building electricity grids today can take more than a decade, with permitting a particularly time-consuming bottleneck ([IEA, 2023](https://www.iea.org/reports/net-zero-roadmap-a-global-pathway-to-keep-the-15-0c-goal-in-reach)). As far as I can tell, a plan written by a very smart machine would need the same permits.

It's also worth pointing out the attitude of just sitting idly and waiting for a future technology, and how much that will cost us and our children. Researchers who study climate politics describe "discourses of climate delay", which are basically arguments that accept climate change is real and still justify doing too little. One of them is technological optimism, the belief "that technological progress will rapidly bring about emissions reductions in the future". Their examples in 2020 included fusion power and zero-carbon planes ([Lamb et al., 2020](https://doi.org/10.1017/sus.2020.13)). I would say that the former Google CEO's bet on AI definitely belongs on that list.

It is not correct, and might even be dangerous, to think there's a single irreversible point that AI would have to beat, since there actually isn't one according to climate science. Warming is close to proportional to the total amount of CO<sub>2</sub> emitted ([IPCC WGI, 2021, D.1.1](https://doi.org/10.1017/9781009157896.001)), and every increment of global warming will intensify multiple and concurrent hazards ([IPCC, 2023, B.1](https://doi.org/10.59327/IPCC/AR6-9789291691647.001)). So each year of waiting adds warming, and some of the damage can't be undone on human timescales. Changes in the ocean, ice sheets and in global sea level are irreversible for centuries to millennia ([IPCC WGI, 2021, B.5](https://doi.org/10.1017/9781009157896.001)). Warm-water coral reefs are already passing their tipping point at today's warming of about 1.4°C ([Global Tipping Points Report, 2025](https://global-tipping-points.org/)). A tipping point is a threshold beyond which a change keeps perpetuating itself, and several more may be triggered between 1.5 and 2°C of warming ([Armstrong McKay et al., 2022](https://doi.org/10.1126/science.abn7950)). On land, 3 to 14% of the species assessed will likely face a very high risk of extinction at 1.5°C of warming, and the upper estimate rises to 29% at 3°C and 48% at 5°C ([IPCC WGII, 2022, B.4.1](https://doi.org/10.1017/9781009325844.001)).

So if AI is going to help in time, it would have to speed up the politics.

---

### Hacking the policy problem

Part of the policy problem is that people misjudge and underrate (or underestimate?) each other. In a survey of nearly 130,000 people across 125 countries, 89% demanded more political action on climate, and 69% said they would be willing to contribute 1% of their personal income. People also systematically underestimated how willing their fellow citizens were to act ([Andre et al., 2024](https://doi.org/10.1038/s41558-024-01925-3)). So the support for a global movement actually exists, it's just that most of us don't know how many others share the same sentiments.

A related bias is the false consensus effect, where we overestimate how acceptable and common our own behaviour is in society ([Bergseth, 2021](https://theconversation.com/everyone-else-does-it-so-i-can-too-how-the-false-consensus-effect-drives-environmental-damage-153305)). I'll write about that one separately.

A technology that is good at persuading (\*coughs\* *propaganda* \*coughs\*) could perhaps close that gap, or widen it. In experiments with almost 77,000 responses (from more than 42,000 people) and 19 AI language models, the largest gains in persuasiveness came from how a model was trained and prompted. The methods that made the models more persuasive also made their claims less accurate ([Hackenburg et al., 2025](https://doi.org/10.1126/science.aea3884)). So... AI persuasion works for whoever trains and prompts the model. This brings me to what I consider to be the most important point.

---

### Who is holding the wheel

In 2025, industry produced 91.2% of the AI models classed as notable by the research group Epoch AI, 93 models from industry against 2 from academia. Within industry, the systems at the frontier are concentrated among a small set of organizations ([AI Index Report, 2026](https://hai.stanford.edu/ai-index/2026-ai-index-report)). Corporate investment in AI reached about 582 billion USD that year, more than double the year before ([AI Index Report, 2026](https://hai.stanford.edu/ai-index/2026-ai-index-report)). The IEA reports that the largest technology companies spent more than 400 billion USD in 2025 on capital expenditure, meaning spending on things like buildings and equipment. The capital expenditure of just five of them is now larger than global investment in oil and natural gas production ([IEA, 2026](https://www.iea.org/reports/key-questions-on-energy-and-ai)).

Much of that money goes into data centres, some are specifically designed for AI. Their electricity demand grew by 17% in 2025. The IEA expects it to roughly double by 2030, to around 3% of global electricity demand, and expects their emissions to double too, to about 2% of the electricity sector's emissions in 2035 ([IEA, 2026](https://www.iea.org/reports/key-questions-on-energy-and-ai)).

A single question to a chatbot is a small part of this. By Google's own measurement, a typical text prompt to its Gemini assistant uses 0.24 Wh (watt-hours), less than watching 9 seconds of television ([Elsworth et al., 2025](https://arxiv.org/abs/2508.15734)). The IEA estimates that if every conventional internet search became a simple AI text query, the total would be less than 1% of what data centres consume today, though tasks like video generation can use hundreds or thousands of times more energy per query ([IEA, 2026](https://www.iea.org/reports/key-questions-on-energy-and-ai)). So the energy cost of your own few questions is small. What we should probably worry about more is where all that money and computing power is pointed to, and of course the cognitive decline resulted from reliance on quick answers by chatbots instead of developing our own critical thinking skills by painstakingly digging through archives in a local library or filtering through conventional internet search (oh well, this is another topic entirely).

Funnily enough, the IEA notes that the oil and gas industry "has been an early adopter of AI", using it to optimize exploration and production, and also to detect leaks ([IEA, 2025](https://www.iea.org/reports/energy-and-ai)). So the same kind of tool that helps manage a power grid can also help find more oil. Essentially, AI does what the people deploying it want it to do.

Earlier I quoted the IPCC saying that the capital and liquidity to close the climate investment gap exists, and that the barrier is redirecting it. The AI boom is just one of many examples showing how quickly money can move when investors expect it to pay off. In a working paper, the MIT economist Ricardo Caballero has modelled how such a boom can sustain itself. As far as I can understand (gosh it's draining mentally to just read the abstract in other fields and in a second language), in his model, AI takes over tasks that workers used to do, so a larger share of income goes to the owners of capital. They save more of it, and those savings help fund more AI investment. The same model shows that the boom is fragile: a loss of confidence can end it in a crash ([Caballero, 2026](https://economics.mit.edu/sites/default/files/2026-05/speculative_growth_AI_public.pdf)).

As I see it, the policy problem behind the climate crisis is tied to the deep-rooted capitalism of our current society, and that same capitalism is what funds AI research. And while AI might one day be capable of providing solutions to all these societal and political problems, we should never forget who is holding the wheel behind these systems, who decides what to invest in, and what would most benefit this group of people.

---

### So... will it?

We have most of the solutions for this decade, and about a third of what we need (future technology) for 2050 still has to reach the market. There is also no single deadline to end the climate crisis once and for all. Every year of delay adds warming, and some of the losses are permanent and devastating. Even if my friend is right about the timing of the arrival of insanely mind-blowingly intelligent machines, I wouldn't count on them to simply solve the climate crisis for us. AI might well be smart enough. But whether this technology is used for that is up to the people behind the wheel and the people writing the laws, and to how many of the rest of us push them, or become them, or... I don't know, turn the tide, rewrite this entire system.