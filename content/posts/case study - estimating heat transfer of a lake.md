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

The grouping of something into various categories is known as stratification. When two kinds of steam that are at different temperatures come into contact, thermal stratification happens. The warmer, lighter water may float above the colder water because of the difference in temperature between them, which causes the heavier, colder water to sink to the bottom. Summertime thermal stratification is a phenomenon in temperate zone lakes. The warm, buoyant surface water is on top of the cooler, denser bottom water, as seen in the figure below. The *epilimnion* and the *hypolimnion*, which are separated by a plane known as the *thermoline*, are the two layers that are effectively separated vertically as a result of this stratification.

![[images/case studies/spline_heattransfer/temperaturevsdepth.jpg]]

For environmental engineers researching the contamination of such systems, thermal stratification is of major importance. Particularly, mixing between the two levels is significantly reduced by the thermocline. Decomposition of organic debris can therefore cause a serious reduction in oxygen levels in the secluded bottom waters.

The temperature-depth curve's inflection point can be used to determine the thermocline's position - that is, the point at which $d^2T/dx^2=0$. Additionally, it is the point where the first derivative's or gradient's absolute value is at its highest. In this case study, the thermocline depth for Platte Lake and the gradient's magnitude will be calculated using cubic splines.

## Solution

Since I don't have all the data, the results are basically just approximations and not really aesthetically pleasing. However, they do approach the desired values rather closely.

In order to display the spline predictions and first and second derivatives at intervals of 1 meter down into the water column, I first interpolated using the available limited data. I then plotted the second derivative, gradient, and temperature versus depth.

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

The temperature-depth curve inflection point is where the thermoline is located. I searched for the thermoline based on the highest absolute value of the derivative in this case, since it appears to be unique in this particular situation and much simpler to deal with than zero second derivatives.
 
![[images/case studies/spline_heattransfer/spline_heattransfer.jpg]]