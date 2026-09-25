---
title: "The planet that regulates itself: Daisy world"
date: 2023-05-14
tags:
  - climate
  - notebooks
  - planetary-science
  - writings
---
Earth is kind of like one giant living organism. At least, that's what the Gaia Hypothesis suggests: the planet as a self-regulating system where the atmosphere, oceans, land and life all work together to keep conditions habitable. Living organisms adapt to their environment, and they also shape it in ways that keep the system stable.

To explore this idea, James Lovelock and Andrew Watson introduced **Daisyworld** in 1983. It's a very simplified fictional planet, built to show how biological feedback can regulate climate. Daisyworld has no atmospheric chemistry or plate tectonics, only two types of daisies:

- black daisies: low albedo (aka reflectivity), so they absorb more sunlight and warm their surroundings.
- white daisies: the opposite, high albedo, reflecting sunlight and cooling things down.

# How it plays out


1. In the beginning the planet is cold, so black daisies thrive. They absorb [[heat]] and warm the planet up.
2. As temperatures rise it gets too hot for black daisies, but just right for white ones, so they take over.
3. More white daisies = more sunlight reflected back into space = cooling.
4. Eventually it gets too cold for white daisies, black daisies come back, and the cycle repeats.

This back-and-forth keeps the planet's temperature in a narrow, life-friendly range. It's a negative feedback loop, where the system mutes its own changes.

# Earth's own feedback loops

Obviously Earth is way more complicated than Daisyworld. There's rotation, seasons, geography, diseases, humans. But the same feedback principles apply.

Clouds, for example. When temperatures rise more water evaporates and forms clouds, and clouds have a high albedo like white daisies, so they reflect sunlight and cool the planet. Another negative feedback loop.

Not all of them are stabilizing though. Polar ice and snow reflect a lot of sunlight and keep the poles cool, but when global temperatures rise the ice melts, revealing darker ocean or land underneath, which absorbs more [[heat]] and melts even more ice. That's a positive feedback loop, where warming causes more warming. And with climate change accelerating, the natural reflectivity of our icy poles is disappearing fast.


Daisyworld is imaginary, but Earth's climate also depends on feedback loops like these, and they decide how much change it can absorb, whether the change comes from natural cycles or from us.

# The model

## Growth rate versus Temperature

Let's have a look at the little code I made during a class on Climate Modelling:

Some parameters used in the code:
- `S0`: Solar constant (total solar irradiance received at the planet's distance from the Sun).
- `eps`: Emissivity of the planet's surface.
- `sig`: [[Stefan-Boltzmann law|Stefan-Boltzmann]] constant.
- `alb_w`: Albedo of white daisies.
- `alb_b`: Albedo of black daisies.
- `alb_g`: Albedo of the available ground (unoccupied land).
- `q`: A constant used to calculate the local temperature based on the albedo.
- `k`: A constant determining the growth rate of daisies based on the temperature difference from `T0`.
- `T0`: The optimal temperature at which daisies grow most effectively.
- `d`: Death rate of daisies.

The growth rate of both daisy types is a quadratic function of temperature, `1 - k * (T0 - T) ** 2`, which peaks at `T0` and is clipped at zero by `max(0, ...)`. I computed it for temperatures from 0 to 46 in steps of 0.1.

```python
S0 = 1000
eps = 0.3
sig = 5.67*10**(-8)
alb_w = 0.75
alb_b = 0.25
alb_g = 0.5
q = 20
k = 0.003265
T0 = 22.5
d = 0.3

tolerance = 1.*10**(-6)
diff = 1.0
```

```python
b_list = []
w_list = []

x_list = []
alb_p_list = []
Te_list = []
Tb_list = []
Tw_list = []
fb_list = []
fw_list = []
db_list = []
dw_list = []

T = np.arange(0,46,0.1)
for Tt in T:
    fb = max(0,1 - k*(T0 - Tt)**2)
    fw = max(0,1 - k*(T0 - Tt)**2)
    
    fb_list.append(fb)
    fw_list.append(fw)
    
fig = plt.figure(figsize=(20,6))

ax = fig.add_subplot(1,2,1)
ax.plot(T, fb_list,'maroon',lw=3)
ax.set_title('Black daisy')
ax.set_xlabel('Temperature')
ax.set_ylabel('Growth rate')
ax.grid()

ax = fig.add_subplot(1,2,2)
ax.plot(T, fb_list,'goldenrod',lw=3)
ax.set_title('White daisy')
ax.set_xlabel('Temperature')
ax.grid()

plt.savefig('06_growthrate.png',dpi=300)
plt.show()
```

![[06_growthrate.png]]

Obviously, the growth rate plots of both types of daisies follow the same pattern.

## Equilibrium b and w values at `S = S0 = 1000`, with initial `b = w = 0.2`

Next, I calculated the equilibrium values for the variables `b` and `w` in the model when the solar constant `S` is equal to `S0 = 1000`, with initial values of `b` and `w` set to 0.2.

The `while` loop repeats these steps until the populations stop changing (`abs(dw + db)` below `tolerance`):
- uncovered land: `x = 1 - b - w`
- planetary albedo `alb_p`: the albedos of white daisies, black daisies and bare ground, weighted by their areas
- planetary temperature `Te` from the [[Stefan-Boltzmann law]], converted to °C
- local temperatures `Tb` and `Tw`: `Te` shifted by `q` times the difference between the planetary albedo and the daisy's albedo
- growth rates `fb` and `fw`: the same quadratic curve as above, at the local temperatures
- population changes `db` and `dw`: growth on the uncovered land minus deaths (`d`)

```python
b = w = 0.2
while (diff>tolerance):
    x = 1 - b - w
    alb_p = w*alb_w + b*alb_b + x*alb_g
    Te = (((1-alb_p)*S0)/(4*eps*sig))**(1./4) - 273.15
    Tb = Te + q*(alb_p - alb_b)
    Tw = Te + q*(alb_p - alb_w)
    fb = max(0,1-k*(T0 - Tb)**2)
    fw = max(0,1-k*(T0 - Tw)**2)
    db = b*(x*fb - d)
    dw = w*(x*fw - d)
    b+=db
    w+=dw

    diff = abs(dw+db)

print('Equilibrium b and w is: ',b,w)
```

```
Equilibrium b and w is:  0.3828564993464297 0.2904829937848562
```

So at `S = S0`, the equilibrium has more black daisies (about 38% of the area) than white ones (about 29%). 

## Daisyworld with varying `S`/`S0`

Next, I repeated the calculation for different solar flux ratios `S`/`S0`, recording the equilibrium areas of black and white daisies (`b_list`, `w_list`), the uncovered area (`x_list`), and the planetary temperature with and without daisies (`Te_list`, `Te_no_list`). 

I defined a function `daisy(sflux)` that calculates the equilibrium values for a given solar flux ratio (`sflux`). It contains the same logic as the previous code but with slight modifications. Next, I determined the range and step size for the solar flux ratio loop.

The loop over `S`/`S0` is split in two at 1.0. The first goes down from 1.0 to 0.4 (cooling) and the second up from 1.01 to 1.6 (warming), each starting from `b = w = 0.2`. `j` only decides whether results are added at the start or at the end of the lists, so they end up in increasing order of `S`/`S0`.

```python
b_list = []
w_list = []

x_list = []
alb_p_list = []
Te_list = []
Tb_list = []
Tw_list = []
fb_list = []
fw_list = []
db_list = []
dw_list = []
Te_no_list = []

def daisy(sflux):
    global b,w,j, b_list, w_list, x_list, Tb_list, Tw_list, Te_list, Te_no_list
    
    diff = 1.0
    S = S0*sflux

    while (diff>tolerance):
        x = 1 - b - w
        alb_p = w*alb_w + b*alb_b + x*alb_g
        Te = ((1-alb_p)*S/(sig))**(1./4) - 273.15
        Tb = Te + q*(alb_p - alb_b)
        Tw = Te + q*(alb_p - alb_w)
        fb = max(0,1-k*(T0 - Tb)**2)
        fw = max(0,1-k*(T0 - Tw)**2)
        db = b*(x*fb - d)
        dw = w*(x*fw - d)
        b+=db
        w+=dw
        
        diff = abs(dw)+abs(db)
    Te_no = ((1-alb_g)*S/(sig))**(1./4) - 273.15

    if j == 0:
        b_list.append(b)
        w_list.append(w)
        x_list.append(x)
        Tb_list.append(Tb)
        Tw_list.append(Tw)
        Te_list.append(Te)
        Te_no_list.append(Te_no)
    else:
        b_list.insert(0,b)
        w_list.insert(0,w)
        x_list.insert(0,x)
        Tb_list.insert(0,Tb)
        Tw_list.insert(0,Tw)
        Te_list.insert(0,Te)
        Te_no_list.insert(0,Te_no)
        

ratio_max = 1.6
ratio_min = 0.39
ratio_step = 0.01

""" S/S0 ratio loop is cut into 2 loops (at S/S0 = 1.0):
From 0.4 to 1.0, the variables are updated backwards: from larger S/S0 value to smaller value
          For solar fluxes smaller than initial solar flux value, the model is a cooling process
From 1.01 to 1.6, the variables are updated forwards: from smaller S/S0 value to larger value
          For solar fluxes larger than initial solar flux value, the model is a warming process"""

b=w=0.2                                         # initialize b = w = 0.1
for sr in np.arange(1.,ratio_min,-ratio_step):  # for S/S0 from 1.0 -> 0.4:
    j=1                                         # diff = 1 at beginning of every for loop, while (x -> alb_p -> Te -> ... -> b and w -> diff changing); append backward
    daisy(sr)

b=w=0.2                                         # initialize b = w = 0.1
for sr in np.arange(1.01,ratio_max,ratio_step): # for S/S0 from 1.01 ->  1.6: 
    j=0                                         # diff = 1 at beginning of every for loop, while (x -> alb_p -> Te -> ... -> b and w -> diff changing); append
    daisy(sr)
   
sratios = np.arange(0.4,1.61,0.01)
fig = plt.figure(figsize=(20,6))

ax = fig.add_subplot(1,2,1)
ax.plot(sratios,b_list,color='maroon',lw=3,label='Black daisy area')
ax.plot(sratios,w_list,color='goldenrod',lw=3,label='White daisy area')
ax.plot(sratios,x_list,'k',lw=2,ls='--',label='Uncovered area')
ax.set_title('Equilibrium area of black/white daisy vs S/S0')
ax.set_xlabel('S/S0')
ax.set_ylabel('Area')
ax.set_xticks(np.arange(0.4,1.7,0.1))
ax.set_yticks(np.arange(0,1.1,0.1))
ax.legend()
ax.grid(True)

ax = fig.add_subplot(1,2,2)
ax.plot(sratios,Te_list,lw=3,color='goldenrod',label='Equil temperature (with daisy)')
ax.plot(sratios,Te_no_list,lw=2,color='k',ls='--',label='Equil temperature (without daisy)')
ax.set_title('Planetary temperature (with and without daisy) vs S/S0')
ax.set_xlabel('S/S0')
ax.set_ylabel('Temperature')
ax.set_xticks(np.arange(0.4,1.7,0.1))
ax.set_yticks(np.arange(-30,80,10))
ax.legend()
ax.grid(True)

plt.savefig('06_equi-area-temp_vs_Sratio.png',dpi=300)
```

![[06_equi-area-temp_vs_Sratio.png]]

## Daisyworld with only black daisies

The code below is a modified version of the Daisyworld model that considers only black daisies. 

```python
b_list = []
x_list = []
alb_p_list = []
Te_list = []
Tb_list = []
fb_list = []
db_list = []
Te_no_list = []

def daisy(sflux):
    global b,w,j, b_list, w_list, x_list, Tb_list, Tw_list, Te_list, Te_no_list
    
    diff = 1.0
    S = S0*sflux

    while (diff>tolerance):
        x = 1 - b
        alb_p = b*alb_b + x*alb_g
        Te = ((1-alb_p)*S/(sig))**(1./4) - 273.15
        Tb = Te + q*(alb_p - alb_b)
        fb = max(0,1-k*(T0 - Tb)**2)
        db = b*(x*fb - d)
        b+=db
        
        diff = abs(db)
    Te_no = ((1-alb_g)*S/(sig))**(1./4) - 273.15

    if j == 0:
        b_list.append(b)
        x_list.append(x)
        Tb_list.append(Tb)
        Te_list.append(Te)
        Te_no_list.append(Te_no)
    else:
        b_list.insert(0,b)
        x_list.insert(0,x)
        Tb_list.insert(0,Tb)
        Te_list.insert(0,Te)
        Te_no_list.insert(0,Te_no)
        

ratio_max = 1.6
ratio_min = 0.39
ratio_step = 0.01

""" S/S0 ratio loop is cut into 2 loops (at S/S0 = 1.0):
From 0.4 to 1.0, the variables are updated backwards: from larger S/S0 value to smaller value
          For solar fluxes smaller than initial solar flux value, the model is a cooling process
From 1.01 to 1.6, the variables are updated forwards: from smaller S/S0 value to larger value
          For solar fluxes larger than initial solar flux value, the model is a warming process"""

b=w=0.2                                         # initialize b = w = 0.1
for sr in np.arange(1.,ratio_min,-ratio_step):  # for S/S0 from 1.0 -> 0.4:
    j=1                                         # diff = 1 at beginning of every for loop, while (x -> alb_p -> Te -> ... -> b and w -> diff changing); append backward
    daisy(sr)

b=w=0.2                                         # initialize b = w = 0.1
for sr in np.arange(1.01,ratio_max,ratio_step): # for S/S0 from 1.01 ->  1.6: 
    j=0                                         # diff = 1 at beginning of every for loop, while (x -> alb_p -> Te -> ... -> b and w -> diff changing); append
    daisy(sr)
   
sratios = np.arange(0.4,1.61,0.01)
fig = plt.figure(figsize=(20,6))

ax = fig.add_subplot(1,2,1)
ax.plot(sratios,b_list,color='maroon',lw=3,label='Black daisy area')
ax.plot(sratios,x_list,'k',lw=2,ls='--',label='Uncovered area')
ax.set_title('Equilibrium area of black daisy vs S/S0')
ax.set_xlabel('S/S0')
ax.set_ylabel('Area')
ax.set_xticks(np.arange(0.4,1.7,0.1))
ax.set_yticks(np.arange(0,1.1,0.1))
ax.legend()
ax.grid(True)

ax = fig.add_subplot(1,2,2)
ax.plot(sratios,Te_list,lw=3,color='goldenrod',label='Equil temperature (with daisy)')
ax.plot(sratios,Te_no_list,lw=2,color='k',ls='--',label='Equil temperature (without daisy)')
ax.set_title('Planetary temperature (with and without black daisy) vs S/S0')
ax.set_xlabel('S/S0')
ax.set_ylabel('Temperature')
ax.set_xticks(np.arange(0.4,1.7,0.1))
ax.set_yticks(np.arange(-30,80,10))
ax.legend()
ax.grid(True)

plt.savefig('06_blackonly.png',dpi=300)
```

![[06_blackonly.png]]

With only black daisies, there is no competition between the two types, and the uncovered area is simply `1 - b`. Any regulation of the planetary temperature then comes from the black daisies' albedo alone.