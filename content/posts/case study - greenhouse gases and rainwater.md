---
title: "[Case Study] Greenhouse gases and rainwater"
date: 2022-09-27
tags:
  - climate
  - case-studies
  - writings
draft: true
---
Github link: https://github.com/thdngan/case-studies

  

  

## Background:

  

  

Several greenhouse gases have gone up in atmospheric concentration over the past 50 years. Let's look at the carbon dioxide partial pressure ($CO_2$) data collected at Mauna Loa, Hawaii, from 1958 to 2003. A quadratic polynomial fits the trend neatly,

  

  

$$p_{CO_2} = 0.011825(t - 1980.5)^2+1.356975(t-1980.5) + 339$$

  

  

where $p_{CO_2}$ is the atmospheric $CO_2$ partial pressure (ppm). According to the data, $CO_2$ levels increased by more than 19% from 315 to 376 ppm.

  

  

Greenhouse gases don't only contribute to global warming, they also change the chemistry of the atmosphere. One question we can actually answer is how rising carbon dioxide affects the pH of rainwater. Outside urban and industrial regions, carbon dioxide is the main thing setting that pH. pH measures the activity of hydrogen ions and therefore the acidity of a solution, and for dilute aqueous solutions you calculate it like this:

$$
pH = -log_{10}{[H^+]}
\tag{1}
$$

where $[H^+]$ is the molar concentration of hydrogen ions.

The chemistry of rainfall is governed by the following five nonlinear systems of equations:

  

  

$$
K_1 = 10^6\dfrac{{[H^+]}{[HCO_3^-]}}{p_{CO_2}K_H}
\tag{2}
$$

  

$$
K_2 = \dfrac{[H^+][CO_3^{2-}]}{[HCO_3^-]}
\tag{3}
$$

  

  

$$
K_w = {[H^+]}{[OH^-]}
\tag{4}
$$

  

  

$$
c_T = \dfrac{p_{CO_2}K_H}{10^6} + {[HCO_3^-]} + {[CO_3^{2-}]}
\tag{5}
$$

  

  

$$
{[HCO_3^-]} + 2{[CO_3^{2-}]} + {[OH^-]} - {[H^+]} = 0
\tag{6}
$$

  

  

where $K_1$, $K_2$ and $K_w$ are equilibrium coefficients, and $K_H$ is Henry's constant. The five unknown values are $c_T$ - total inorganic carbon, $[HCO_3^-]$ - bicarbonate, $[CO_3^{2-}]$ - carbonate, $[H^+]$ - hydrogen ion, and $[OH^-]$ - hydroxyl ion. Keep in mind that equations (2) and (5) both display the partial pressure of $CO_2$.

  

  

Now, we will apply these equations to determine the pH of rainwater given that $K_H=10^{-1.46}$, $K_1=10^{-6.3}$, $K_2=10^{-10.3}$, and $K_w=10^{-14}$. Then we will compare the results in 1958 when $p_{CO_2}=315[ppm]$ and in 2003 when $p_{CO_2}=375 [ppm]$.

  

  

Additionally, there are two criteria for choosing a numerical method for computation:

  

- You can be certain that rain in pristine places always ranges in pH from 2 to 12.

  

- You are also informed that the precision of your pH measurements is just two decimal places.

  

  

---

  

## Solution:

  

  

To begin, we may eliminate the unknown values by combining them into a single function that is solely dependent on $[H^+]$.

  

  

From (2):
$$
[HCO_3^-] = \dfrac{p_{CO_2}K_HK_1}{10^6[H^+]}
\tag*{(7)}
$$

  

From (3) and (7):

  

$$
[CO_3^{2-}] = \dfrac{p_{CO_2}K_HK_1K_2}{10^6[H^+]^2}
\tag*{(8)}
$$

  

Substitute (7), (8) and (4) into (6), we have:

  

$$
\dfrac{p_{CO_2}K_HK_1}{10^6[H^+]} + 2\dfrac{p_{CO_2}K_HK_1K_2}{10^6[H^+]^2} + \dfrac{K_w}{[H^+]} - [H^+] = 0
\tag*{(9)}
$$

  

It's not obvious at a glance, but this is a third-order polynomial in $[H^+]$, so its root gives us the pH of rainwater.

  

  

Next, pick a numerical method. Bisection is a good choice here for two reasons. First, pH normally falls between 2 and 12, which hands us two reliable initial guesses. Second, we'll accept an absolute error of $E_{a,d} = 0.005$, since pH can only be measured to two decimal places anyway. And with bisection you can work out the number of iterations in advance from the initial bracket and the error you want. Using $n = log_2(\dfrac{\Delta x^0}{E_{a,d}})$, the result is $n = log_2(\dfrac{12-2}{0.005}) \approx 10.9658$. Bisection will therefore give the required precision after eleven iterations.

  

  

Before putting equation (9) into MATLAB we need a couple of adjustments. The left-hand side has to be rewritten as a function of pH, since we want to use the range from 2 to 12 with 11 iterations.

  

  

![[images/climate modeling/bisection_greenhousegases_rainwater.svg]]

  

  

Now we can substitute $p_{CO_2}=315$ and $p_{CO_2}=375$ to the MATLAB script below:

  

  

```Matlab

  

% Bisection method to compute the impact of change in atmospheric CO2

  

  

% levels in the pH of rainwater.

  

  

clc

  

  

clear all

  

  

close all

  

  

a=input('Enter function with right hand side zero:','s');

  

  

% This is the function I use for 1958: 315*10^(-13.76+x)+10^(-14+x)+630*10^(-24.06+2*x)-10^(-x)

  

  

% This is the function I use for 2003: 375*10^(-13.76+x)+10^(-14+x)+750*10^(-24.06+2*x)-10^(-x)

  

  

f=inline(a);

  

  

xl=input('Enter the first value of guess interval:');

  

  

xu=input('Enter the end value of guess interval:');

  

  

for i=2:12 % 11 iterations

  

  

fprintf("\nIteration %i:",i-1);

  

  

xr=(xu+xl)/2;

  

  

fprintf("xr=%i",xr);

  

  

if f(xu)*f(xr)<0

  

  

xl=xr;

  

  

else

  

  

xu=xr;

  

  

end

  

  

fprintf(" => new xl=%i",xl);

  

  

fprintf(", xu=%i",xu);

  

  

if f(xl)*f(xr)<0

  

  

xu=xr;

  

  

else

  

  

xl=xr;

  

  

end

  

  

xnew(1)=0;

  

  

xnew(i)=xr;

  

  

ea=abs((xnew(i)-xnew(i-1))/xnew(i))*100;

  

  

fprintf(", ea=%f percent\n",ea);

  

  

end

  

  

fprintf("\n\nThe root of the equation is %i\n",xr);

  

  

fprintf("\nThe relative error is is %i percent\n",ea);

  

```

  

  

The result for 1958 will be a pH of 5.6279 with a relative error of 0.0868%.

  

  

```

  

Enter function with right hand side zero:315*10^(-13.76+x)+10^(-14+x)+630*10^(-24.06+2*x)-10^(-x)

  

Enter the first value of guess interval:2

  

Enter the end value of guess interval:12

  

  

Iteration 1:xr=7 => new xl=2, xu=7, ea=100.000000 percent

  

  

Iteration 2:xr=4.500000e+00 => new xl=4.500000e+00, xu=7, ea=55.555556 percent

  

  

Iteration 3:xr=5.750000e+00 => new xl=4.500000e+00, xu=5.750000e+00, ea=21.739130 percent

  

  

Iteration 4:xr=5.125000e+00 => new xl=5.125000e+00, xu=5.750000e+00, ea=12.195122 percent

  

  

Iteration 5:xr=5.437500e+00 => new xl=5.437500e+00, xu=5.750000e+00, ea=5.747126 percent

  

  

Iteration 6:xr=5.593750e+00 => new xl=5.593750e+00, xu=5.750000e+00, ea=2.793296 percent

  

  

Iteration 7:xr=5.671875e+00 => new xl=5.593750e+00, xu=5.671875e+00, ea=1.377410 percent

  

  

Iteration 8:xr=5.632812e+00 => new xl=5.593750e+00, xu=5.632812e+00, ea=0.693481 percent

  

  

Iteration 9:xr=5.613281e+00 => new xl=5.613281e+00, xu=5.632812e+00, ea=0.347947 percent

  

  

Iteration 10:xr=5.623047e+00 => new xl=5.623047e+00, xu=5.632812e+00, ea=0.173671 percent

  

  

Iteration 11:xr=5.627930e+00 => new xl=5.627930e+00, xu=5.632812e+00, ea=0.086760 percent

  

  

The root of the equation is 5.627930e+00

  

  

The relative error is is 8.676037e-02 percent

  

```

  

  

Rounded, the answer of 5.63 is accurate to two decimal places. You can check that by running it again with more iterations: 40 iterations gives 5.630439, with a relative error of around $1.62×10^{-10}$%.

  

  

```

  

Enter function with right hand side zero:315*10^(-13.76+x)+10^(-14+x)+630*10^(-24.06+2*x)-10^(-x)

  

Enter the first value of guess interval:2

  

Enter the end value of guess interval:12

  

  

Iteration 1:xr=7 => new xl=2, xu=7, ea=100.000000 percent

  

  

Iteration 2:xr=4.500000e+00 => new xl=4.500000e+00, xu=7, ea=55.555556 percent

  

  

Iteration 3:xr=5.750000e+00 => new xl=4.500000e+00, xu=5.750000e+00, ea=21.739130 percent

  

  

Iteration 4:xr=5.125000e+00 => new xl=5.125000e+00, xu=5.750000e+00, ea=12.195122 percent

  

  

Iteration 5:xr=5.437500e+00 => new xl=5.437500e+00, xu=5.750000e+00, ea=5.747126 percent

  

  

Iteration 6:xr=5.593750e+00 => new xl=5.593750e+00, xu=5.750000e+00, ea=2.793296 percent

  

  

Iteration 7:xr=5.671875e+00 => new xl=5.593750e+00, xu=5.671875e+00, ea=1.377410 percent

  

  

Iteration 8:xr=5.632812e+00 => new xl=5.593750e+00, xu=5.632812e+00, ea=0.693481 percent

  

  

Iteration 9:xr=5.613281e+00 => new xl=5.613281e+00, xu=5.632812e+00, ea=0.347947 percent

  

  

Iteration 10:xr=5.623047e+00 => new xl=5.623047e+00, xu=5.632812e+00, ea=0.173671 percent

  

  

Iteration 11:xr=5.627930e+00 => new xl=5.627930e+00, xu=5.632812e+00, ea=0.086760 percent

  

  

Iteration 12:xr=5.630371e+00 => new xl=5.630371e+00, xu=5.632812e+00, ea=0.043361 percent

  

  

Iteration 13:xr=5.631592e+00 => new xl=5.630371e+00, xu=5.631592e+00, ea=0.021676 percent

  

  

Iteration 14:xr=5.630981e+00 => new xl=5.630371e+00, xu=5.630981e+00, ea=0.010839 percent

  

  

Iteration 15:xr=5.630676e+00 => new xl=5.630371e+00, xu=5.630676e+00, ea=0.005420 percent

  

  

Iteration 16:xr=5.630524e+00 => new xl=5.630371e+00, xu=5.630524e+00, ea=0.002710 percent

  

  

Iteration 17:xr=5.630447e+00 => new xl=5.630371e+00, xu=5.630447e+00, ea=0.001355 percent

  

  

Iteration 18:xr=5.630409e+00 => new xl=5.630409e+00, xu=5.630447e+00, ea=0.000678 percent

  

  

Iteration 19:xr=5.630428e+00 => new xl=5.630428e+00, xu=5.630447e+00, ea=0.000339 percent

  

  

Iteration 20:xr=5.630438e+00 => new xl=5.630438e+00, xu=5.630447e+00, ea=0.000169 percent

  

  

Iteration 21:xr=5.630443e+00 => new xl=5.630438e+00, xu=5.630443e+00, ea=0.000085 percent

  

  

Iteration 22:xr=5.630440e+00 => new xl=5.630438e+00, xu=5.630440e+00, ea=0.000042 percent

  

  

Iteration 23:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630440e+00, ea=0.000021 percent

  

  

Iteration 24:xr=5.630440e+00 => new xl=5.630439e+00, xu=5.630440e+00, ea=0.000011 percent

  

  

Iteration 25:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000005 percent

  

  

Iteration 26:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000003 percent

  

  

Iteration 27:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000001 percent

  

  

Iteration 28:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000001 percent

  

  

Iteration 29:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 30:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 31:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 32:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 33:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 34:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 35:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 36:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 37:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 38:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 39:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

Iteration 40:xr=5.630439e+00 => new xl=5.630439e+00, xu=5.630439e+00, ea=0.000000 percent

  

  

The root of the equation is 5.630439e+00

  

  

The relative error is is 1.615318e-10 percent

  

```

  

  

The same calculation may be carried out again for the conditions in 2003, yielding a pH value of 5.59 with a relative error of 0.0874%.

  

  

```

  

Enter function with right hand side zero:375*10^(-13.76+x)+10^(-14+x)+750*10^(-24.06+2*x)-10^(-x)

  

Enter the first value of guess interval:2

  

Enter the end value of guess interval:12

  

  

Iteration 1:xr=7 => new xl=2, xu=7, ea=100.000000 percent

  

  

Iteration 2:xr=4.500000e+00 => new xl=4.500000e+00, xu=7, ea=55.555556 percent

  

  

Iteration 3:xr=5.750000e+00 => new xl=4.500000e+00, xu=5.750000e+00, ea=21.739130 percent

  

  

Iteration 4:xr=5.125000e+00 => new xl=5.125000e+00, xu=5.750000e+00, ea=12.195122 percent

  

  

Iteration 5:xr=5.437500e+00 => new xl=5.437500e+00, xu=5.750000e+00, ea=5.747126 percent

  

  

Iteration 6:xr=5.593750e+00 => new xl=5.437500e+00, xu=5.593750e+00, ea=2.793296 percent

  

  

Iteration 7:xr=5.515625e+00 => new xl=5.515625e+00, xu=5.593750e+00, ea=1.416431 percent

  

  

Iteration 8:xr=5.554688e+00 => new xl=5.554688e+00, xu=5.593750e+00, ea=0.703235 percent

  

  

Iteration 9:xr=5.574219e+00 => new xl=5.574219e+00, xu=5.593750e+00, ea=0.350385 percent

  

  

Iteration 10:xr=5.583984e+00 => new xl=5.583984e+00, xu=5.593750e+00, ea=0.174886 percent

  

  

Iteration 11:xr=5.588867e+00 => new xl=5.588867e+00, xu=5.593750e+00, ea=0.087367 percent

  

  

The root of the equation is 5.588867e+00

  

  

The relative error is is 8.736677e-02 percent

  

```

  

  

So a 19% increase in atmospheric $CO_2$ only drops the pH by 0.67%, which sounds small. But equation (1) puts pH on a logarithmic scale. As a result, a pH change of one unit corresponds to a 10-fold increase in hydrogen ions. The concentration can be determined using the formula $[H^+] = 10^{-pH}$, with a resultant percent change of 9.1%. Consequently, there has been a 9% rise in the hydrogen ion concentration.