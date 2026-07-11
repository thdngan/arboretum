---
title: Sea Surface Temperature
date: 2023-01-28
tags:
  - climate
  - notebooks
---
Data used in the code section below can be downloaded [here](https://www.esrl.noaa.gov/psd/data/gridded/data.noaa.oisst.v2.html).

# Reading netCDF files

The code below is used to work with netCDF files and extract data from them. First, I imported the required libraries, netCDF4 and Dataset, from the netCDF4 module. The code opens a netCDF file named 'sst.mnmean.nc' using the Dataset class from the netCDF4 library. It then prints the file format, dimension information, variable information and attributes.

 The code extracts specific variables from the netCDF file. It uses fh.variables\['variable\_name'\]\[:\] to extract the data. In this case, it extracts latitude (lats), longitude (lons), time (time), sea surface temperature (sst), and their corresponding units (sst\_units).

 Next, it defines latitude and longitude index ranges for the NINO3 and NINO3.4 regions. It selects the relevant data from the sst variable based on these index ranges to calculate the sea surface temperature for the NINO3 region (sst\_3) and the NINO3.4 region (sst\_34).

```python
import math
import numpy as np
import matplotlib as mpl
import matplotlib.pyplot as plt
import warnings
import pandas as pd
import netCDF4 as nc
from netCDF4 import Dataset
# open a netcdf file
file='sst.mnmean.nc'
fh = Dataset(file, 'r') # Dataset is the class behavior to open the netCDF file

# fh means the file handle of the open netCDF file
# print fh format
print(fh.file_format)

# # print info about dimensions
print(fh.dimensions.keys())
print(fh.dimensions['time'])

# print info about variables
print(fh.variables.keys())

# print attributes
print(fh.Conventions)

for attr in fh.ncattrs():
    print(attr, '=',getattr(fh,attr))
    
# Extract fh from NetCDF file
lats = fh.variables['lat'][:] # extract/copy the fh
lons = fh.variables['lon'][:]
time = fh.variables['time'][:]
d_times=nc.num2date(fh.variables['time'][:],fh.variables['time'].units)
sst = fh.variables['sst'][:] # shape is time, lat, lon as shown above
sst_units=fh.variables['sst'].units

d_times=nc.num2date(fh.variables['time'][:],fh.variables['time'].units)

# Calulate NINO index, & plot the results
latidx_nino3 = (lats >=-5. ) & (lats <=5. )
lonidx_nino3 = (lons >=210. ) & (lons <=270. )
latidx_nino34 = (lats >=-5. ) & (lats <=5. )
lonidx_nino34 = (lons >=190. ) & (lons <=240. )
sst_3 = sst [:, latidx_nino3][..., lonidx_nino3]
sst_34 = sst [:, latidx_nino34][..., lonidx_nino34]
```

```
NETCDF3_CLASSIC
dict_keys(['lat', 'lon', 'time', 'nbnds'])
<class 'netCDF4._netCDF4.Dimension'> (unlimited): name = 'time', size = 494
dict_keys(['lat', 'lon', 'sst', 'time', 'time_bnds'])
CF-1.0
title = NOAA Optimum Interpolation (OI) SST V2
Conventions = CF-1.0
history = Wed Apr  6 13:47:45 2005: ncks -d time,0,278 SAVEs/sst.mnmean.nc sst.mnmean.nc
Created 10/2002 by RHS
comments = Data described in  Reynolds, R.W., N.A. Rayner, T.M.
Smith, D.C. Stokes, and W. Wang, 2002: An Improved In Situ and Satellite
SST Analysis for Climate, J. Climate
platform = Model
source = NCEP Climate Modeling Branch
institution = National Centers for Environmental Prediction
References = https://www.psl.noaa.gov/data/gridded/data.noaa.oisst.v2.html
dataset_title = NOAA Optimum Interpolation (OI) SST V2
source_url = http://www.emc.ncep.noaa.gov/research/cmb/sst_analysis/
```

Next, I performed further analysis and generated a plot to visualize the Sea Surface Temperature Anomalies (SSTA) over the Nino3 and Nino3.4 regions.

The code converts the extracted d\_times (previously obtained as num2date) to a more readable format. It iterates over each d\_times value and converts it to a string in the format 'YYYY/MM/DD' using string concatenation. Then, it uses datetime.strptime() to parse the string into a datetime object and appends it to the times list.

Then I calculated the Sea Surface Temperature Anomalies (SSTA) for the Nino3 and Nino3.4 regions. I computed the mean of sst\_3 over the latitude and longitude axes using np.mean(sst\_3, axis=(1, 2)). Similarly, I calculated the mean of sst\_34 over the latitude and longitude axes. Then, I subtracted the mean of sst\_3 from the calculated mean to obtain the NINO3 SSTA (nino3). Similarly, these steps can obtain the NINO3.4 SSTA (nino34).

```python
from datetime import datetime
times = []
for i in d_times:
    d = str(i.year) + '/' + str(i.month) + '/' + str(i.day)
    i = datetime.strptime(d,'%Y/%m/%d')
    # print(i)
    times.append(i)
```

```python
#to get the mean values over lon/lat axis
nino3= np.mean(sst_3,axis=(1,2))-np.mean(sst_3)
nino34= np.mean(sst_34,axis=(1,2))-np.mean(sst_34)
plt.figure(1,figsize=(12,6))
plt.plot(times,nino3, color = "goldenrod", linewidth = 2, label = "Nin$o 3")
plt.plot(times,nino34, color = "maroon", linewidth = 3, label = "Nino 3.4")
plt.xlabel('Year')
plt.ylabel('Sea Surface Temperature Anomaly (oC)')
plt.legend(loc='upper left', prop = {'size':10})
plt.title('SSTA over Nino3 and Nino3.4')
```

![[08_SSTA_over_nino3_nino34.png]]

The difference in the width of variations between Nino 3 and Nino 3.4 anomalies can be attributed to the geographical locations and characteristics of the respective regions.

- Nino 3 Region: The Nino 3 region is defined as the area within the equatorial Pacific Ocean, ranging from approximately 5$\degree$S to 5$\degree$N latitude and 210$\degree$ to 270$\degree$ longitude. This region is located in the central Pacific and is sensitive to changes in sea surface temperatures associated with the El Ni$\tilde{n}$o-Southern Oscillation (ENSO) phenomenon. It is influenced by the warming (El Ni$\tilde{n}$o) and cooling (La Ni$\tilde{n}$a) of the central and eastern equatorial Pacific.
- Nino 3.4 Region: The Nino 3.4 region is also located within the equatorial Pacific Ocean, ranging from approximately 5$\degree$S to 5$\degree$N latitude and 190$\degree$ to 240$\degree$ longitude. This region is situated more toward the eastern Pacific and includes the central and eastern parts of the equatorial Pacific.

The main factor contributing to the difference in the width of variations is the distribution of oceanic processes and dynamics within these regions. The Nino 3 region, being more centrally located, is highly influenced by the large-scale ocean-atmosphere interactions associated with ENSO events. These events involve the exchange of heat and energy between the ocean and atmosphere, leading to substantial temperature anomalies and oceanic phenomena.

On the other hand, the Nino 3.4 region is positioned toward the eastern Pacific, where the thermocline (the boundary between warm surface waters and colder deeper waters) is shallower. This region is less influenced by oceanic processes related to ENSO events. Consequently, the temperature variations in the Nino 3.4 region tend to be more subdued compared to the Nino 3 region.

# Plotting average SST over the oceans

```python
sst_avg = np.mean(sst,axis=0)

# land-sea mask 
mask = Dataset('lsmask.nc', 'r').variables['mask'][:]
mask = mask.astype(float)
mask[mask == 0] = np.nan
#Let mask be the land-sea mask, we need to let the zero values be np.nan .

lon_2d, lat_2d = np.meshgrid(lons,lats)
fig = plt.figure(figsize=(20,8))
# Create a contour plot
plt.contourf(lon_2d, lat_2d, sst_avg*mask[0],levels=24,linewidths = 1, vmin = sst_avg.min(),vmax=sst_avg.max(), cmap = 'RdYlBu_r')

# Add colorbar and labels
plt.colorbar(label='Sea Surface Temperature (degC)')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.title('Average Sea Surface Temperature',fontsize=24)
plt.gca().set_facecolor("silver")
plt.savefig('08_average_SST.png',dpi=300)
plt.show()
```

![[08_average_SST.png]]

As can be seen from the figure, the average sea surface temperature (SST) is high near the equator and low near the poles. The distribution of SST across the ocean is strongly influenced by radiative heating. Radiative heating refers to the process by which the Sun's energy is absorbed by the Earth's surface, including the ocean, and converted into heat. The main factor influencing radiative heating is solar radiation, which varies with latitude and season.

- Tropical Regions: In the tropical regions, such as the equatorial Pacific, the Sun's rays are more direct, resulting in higher radiative heating. This leads to warmer SST values in these areas.
- Polar Regions: In the polar regions, the Sun's rays are more oblique, leading to lower radiative heating. As a result, the SST in these regions tends to be cooler compared to the tropics.

# Plotting SST departures

I performed the following operations to calculate and visualize the departure of local Sea Surface Temperature (SST) from the zonal average field. The code calculates the zonal average of the SST by taking the mean along the longitude axis using np.mean(sst, axis=2). This produces an array with dimensions of time and latitude, representing the average SST across each latitude band. To match the shape of the original SST array, the zonal average array (sst\_zonal\_avg) is expanded along the longitude axis using np.expand\_dims() and then repeated 360 times using np.repeat().

I then subtracted the expanded zonal average field (sst\_zonal\_avg\_expanded) from the original SST field (sst) to obtain the departure of local SST from the zonal average field. This calculates the deviation of each SST value from the corresponding zonal average value. The resulting array is stored in sst\_departure.

Next, I computed the mean of the departure array along the time axis using np.mean(sst\_departure, axis=0). This yields an array representing the average deviation of local SST from the zonal average across all time steps.

```python
# Compute the zonal average SST
sst_zonal_avg = np.mean(sst, axis=2)

# Expand the zonal average array along the longitude axis to match the original SST shape
sst_zonal_avg_expanded = np.expand_dims(sst_zonal_avg, axis=2)
sst_zonal_avg_expanded = np.repeat(sst_zonal_avg_expanded, 360, axis=2)

# Calculate the departure of the local SST from the zonal average field
sst_departure = sst - sst_zonal_avg_expanded

# Calculate the mean of departure
sst_departure_avg = np.mean(sst_departure,axis=0)

cm = plt.cm.get_cmap('RdYlBu_r')
fig = plt.figure(figsize=(20,8))
# Create a contour plot
plt.contourf(lon_2d, lat_2d, (sst_departure_avg)*mask[0],levels=24,linewidths = 1,vmin=sst_departure_avg.min()+3,vmax=sst_departure_avg.max()-1, cmap = cm)

# Add colorbar and labels
plt.colorbar(label='Departure of local SST from zonal average field (degC)')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.title('Sea Surface Temperature Departure',fontsize=24)
plt.gca().set_facecolor("darkgrey")
plt.savefig('08_SST_departure.png',dpi=300)
plt.show()
```

![[08_SST_departure.png]]

The SST departure refers to the deviation of local SST from the zonal average SST field. This departure can be influenced by various dynamical factors, including atmospheric and oceanic circulations.

- Subtropical Latitudes: In the subtropical latitudes, the eastern oceans tend to have cooler SST departures. This is attributed to the equatorward flow of cool air around the eastern flanks of anticyclones. The cool air flow causes a decrease in SST values in the eastern Pacific Ocean. In contrast, the western flanks of the anticyclones experience warm and humid poleward flow, leading to higher SST departures in the western Pacific.
- Higher Latitudes: At higher latitudes, sub-polar cyclones are present, resulting in a poleward flow of cool air. This flow contributes to cooler SST departures in these regions.
- Equatorial Regions: In the equatorial regions, wind-driven upwelling occurs, where the trade winds push surface waters away from the equator. This process brings colder, nutrient-rich waters from below the surface to the top, resulting in cooler SST departures in the equatorial eastern Pacific and Atlantic Ocean.

These dynamical factors influence the spatial variations in SST departures, highlighting regions where the local SST significantly deviates from the zonal average. The combination of equatorward/ poleward air flows, wind-driven upwelling, and atmospheric circulations shape the observed SST departure patterns across different latitudes.
