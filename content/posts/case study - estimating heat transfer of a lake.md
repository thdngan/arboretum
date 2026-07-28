---
title: "[Case Study] Estimating Heat Transfer of a lake"
date: 2022-11-02
tags:
  - planetary-science
  - case-studies
  - writings
draft: true
---

Github link: https://github.com/thdngan/case-studies/tree/main/spline_heattransfer

## Background

Stratification just means layering. It happens thermally when bodies of water at different temperatures meet: the warmer, lighter water floats on top and the heavier, colder water sinks to the bottom. Lakes in temperate zones do this every summer, as in the figure below. The two layers you end up with are the *epilimnion* on top and the *hypolimnion* underneath, separated by a plane called the *thermocline*.

![[images/case studies/spline_heattransfer/temperaturevsdepth.jpg]]

This matters a lot for anyone studying contamination in these systems, because the thermocline strongly suppresses mixing between the two layers. Organic debris decomposing in the isolated bottom water can then drive the oxygen down there right down.

You can locate the thermocline from the inflection point of the temperature-depth curve, the point where $d^2T/dx^2=0$, which is also where the gradient has its largest absolute value. Here I'm working out the thermocline depth for Platte Lake and the size of the gradient there, using cubic splines.

## Solution

I don't have all the data, so the results are approximations and the plots aren't pretty. They land close enough to the expected values though.

I interpolated from the limited data to get the spline predictions and the first and second derivatives at 1 metre intervals down the water column, then plotted temperature, gradient and second derivative against depth.

```Matlab
T = [11.1 11.1 11.7 13.9 20.6 22.8 22.8 22.8];

z = [27.2 22.9 18.3 13.7 9.1 4.9 2.3 0];

%% interpolating

zq = 0:1:28;

Tq = interp1(z, T, zq);

dTdz = gradient(Tq(:)) ./ gradient(zq(:));

d2Tdz2 = gradient(dTdz(:)) ./ gradient(zq(:));

for i = 1:29

if (abs(dTdz(i)) == max(abs(dTdz)))

disp(zq(i));

disp(dTdz(i));

disp(d2Tdz2(i));

hor = zq(i);

end

end

%% temperature

subplot(1,3,1)

axis([0 30 0 30]);

xticks([0 10 20 30]);

yticks([0 10 20 30]);

plot(T,z,"o",'Color',[1 0 0]);

yline(hor,":");

title('(a) Temperature vs Depth');

xlabel('T (°C)');

ylabel('z (m)');

set(gca,'XAxisLocation','top','YAxisLocation','left')

axis(gca,'ij')

%% gradient

subplot(1,3,2)

axis([-2.0 1.0 0 30]);

xticks([-2.0 -1.0 0.0 1.0]);

yticks([0 10 20 30]);

plot(dTdz,zq);

yline(hor,":");

title('(b) Gradient vs Depth');

xlabel('dT/dz');

set(gca,'XAxisLocation','top','YAxisLocation','left')

axis(gca,'ij')

%% second derivative

subplot(1,3,3)

axis([-0.5 0.5 0 30]);

xticks([-0.5 0.0 0.5]);

yticks([0:5:30]);

plot(d2Tdz2,zq);

% pbaspect manual;

yline(hor,":");

title('(c) Second derivative vs Depth');

xlabel('d2T/dz2');

set(gca,'XAxisLocation','top','YAxisLocation','left')

axis(gca,'ij')
```

The depth is 12m and the gradient of this point is -1.46 °C/m.

```
>> spline_heattransfer
    12

  -1.456521739130436

   0.073369565217392
```

The thermocline sits at the inflection point of the temperature-depth curve. I looked for it using the largest absolute derivative instead, since it's unique here and much easier to deal with than hunting for a zero in the second derivative.
 
![[images/case studies/spline_heattransfer/spline_heattransfer.jpg]]