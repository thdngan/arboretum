---
title: Sampling and quantization in image processing
date: 2021-04-15
tags:
  - image-processing
  - notebooks
  - writings
draft: true
---
%% *Images mentioned in this post are from Digital Image Processing (3rd edition), by Rafael C. Gonzalez, Richard E. Woods. I don't have the permission to use them here :')* %%

Images that we are familiar with represent a very small portion of the spectrum of images that can be acquired at various wavelengths and modalities. In this post, I'll talk about the two most common image formats: grayscale and RGB.

There are two discretization processes in image processing: sampling (spatial discretization) and quantization (amplitude discretization).

-   Sampling: The sampling rate determines the spatial resolution of the image (related to coordinate values).

-   Quantization: The quantization level specifies the image's grayscale range (related to intensity values).

Basically, we begin with a continuous object and end up with a discrete object that has discretization in both the spatial domain and the gray value range. A good digital camera should have a dense enough sampling rate and a fine enough level of quantization to produce images that appear continuous but are actually discrete.

## Grayscale images

Grayscale images store information using intensity values rather than color. Each pixel represents a shade from black (0) to white (255) when using 8-bit depth. If we increase the bit depth to 16-bit, we get an even finer range, from 0 to 65,535, resulting in smoother transitions and better image quality.

For example, a 256x256 image contains 65,536 pixels, while a 1024x1280 image has over 1.3 million pixels. A higher pixel count improves clarity but also increases storage size.

## RGB images

Unlike grayscale images, RGB images use three channels (red, green, and blue) to create full-color visuals. Each pixel consists of three intensity values, one for each primary color, blending together to form a final color.

For example, an RGB image with 6 rows and 5 columns is represented as 6x5x3 (height × width × channels). When each pixel's intensity is stored in 8 bits, the total color depth is 24 bits per pixel (8 bits per channel × 3 channels).

High-end cameras capture full detail for each color channel, while many consumer cameras use a technique called [[mosaic]] imaging, which captures colors in an interleaved way and reconstructs them digitally.

## Videos

So the next question is, what happens in a video? A video is nothing more than a rapid series of images displayed in succession. For example, if a video runs at 30 frames per second (fps) and each frame is an RGB image, then in just one second, we process 30 × 3 = 90 images (since each frame has three channels). The higher the resolution and frame rate, the more data we need to store and process.

## Resolution & Gray Value Depth: Why It Matters


Two important questions in image processing are:

1. How many pixels do we need? (spatial resolution)
2. How many gray values should each pixel store? (intensity resolution)

With 8-bit grayscale images, black is 0, white is 255, and shades of gray fall in between. What the computer has is just those numbers: 0 = black, 128 = medium gray, 255 = white.

The limitation is at both ends: if an image is too bright, details in the highlights get lost (saturation), and if it’s too dark, shadow details disappear. While our eyes adapt well to varying brightness levels, digital images are limited by the number of levels they can represent.

### How Resolution Affects Image Quality

- High resolution (lots of pixels) captures fine details clearly.
- Low resolution (fewer pixels) makes images look blocky or blurry.

For example, if two images have the same number of grayscale levels but one has a higher resolution, small details like numbers and textures will be much clearer in the high-resolution image.

### What Happens When We Reduce Gray Levels?

Now, let’s fix the number of pixels and instead reduce the number of grayscale values:

- 8-bit (256 levels) → smooth grayscale transitions.
- 7-bit (128 levels) → small loss in quality, but still decent.
- 6-bit (64 levels) → noticeable loss of detail.
- 5-bit (32 levels) → visible "false contours" where smooth transitions become harsh steps.
- 1-bit (black & white only) → extreme loss of detail, everything is either black or white, no shades of gray.

By reducing the number of gray values, we introduce a "posterization" effect, where smooth gradients turn into harsh, blocky transitions. This is why low-bit-depth images often look unnatural, as fine details and subtle shades are lost.

*Final thoughs?*

Digital images are all about trade-offs.

%% _How many pixels should we have? And what are the gray values we're going to use for them?_

When we have 8 bits, 0 represents black and 255 represents white. When discussing the interval between 0 and 1, 255 is sometimes referred to as 1. While we see the black-white-gray image with our eyes, the computer reads it as a string of 0s for the black region, 128 or 0.5 for the grayscale region, and 1 for the white part. _Figure 2.18._

Saturation is one of the potential issues. For instance, because we only have 256 different levels to work with, the image may be too bright and we may be unable to detect small variations in brightness. Remember that the human visual system can adapt to multiple levels of brightness, but not all of them simultaneously - the same is true for images. We can capture many levels (for example, 256), but dealing with a very dark and a very bright region at the same time would be difficult. _Figure 2.19._

So, we have a discrete number of values to represent our image, and some parts may go above and beyond what we can represent with that number.

Now let's look at the effects in the images below. We have only changed the spatial resolution and not the number of gray values yet: _Figure 2.20._

_Figure 2.20 (a)_ depicts a high-resolution image. This means that the spatial rate is extremely fine - a large number of pixels - and the image quality is excellent. If the image is much coarser _(Figure 2.20 (d))_, there are fewer pixels and less density between them. Apparently, the lines and small details in image (a) are very well represented, whereas in image (d), the small details, such as numbers, are difficult to see, making it hard to read the measurements. Assuming that each pixel is represented by 256 levels, images (a) and (d) have the same range of gray values, but due to the difference in resolution, the representation of fine details is obviously different. We will not be able to detect the smooth variation in gray values with coarse spatial discretization.

Next, let's move on to the effects of coarse discretization of gray values, with fixed number of pixels: _Figure 2.21._

All four of the images above have the same number of pixels: 452x374. The first image, on the other hand, is displayed in 8 bits (256 values). We only use 7 bits or 128 values for image (b) - basically, values 0 and 1 become 0, 2 and 3 become 2, 4 and 5 become 4,… The simplest method is to take each value in image (a), divide it by 2, round down to the nearest integer, and then multiply it by 2.

![[images/image processing/samquanti.png]]

There are only 64 values in image (c), which is equivalent to dividing by 4, truncating, and then multiplying by 4 - each 4 values is represented by 1 number. So, for example, 0, 1, 2, and 3 become 0; 4, 5, 6, and 7 all become 4, and so on. Finally, there are only 32 values in image (d). The quality appears to be deteriorating. Looking at the lines in the last image, we can see that there are false contours, whereas the transition in the first image is smooth. This is caused by the previously mentioned value jumps.

We can continue to even more extreme cases: _Figure 2.21._

In the final image (h), any value less than 128 becomes 0 - black, and any value greater than 128 becomes 255 - white, and the data is of poor quality. %%

## References
1.  Sapiro, G., _Image and Video Processing: From Mars to Hollywood with a Stop at the Hospital_, Coursera. https://www.coursera.org/learn/image-processing?
2.  University of Tartu, _2. Sampling and quantization_, accessed 15 April 2022, https://sisu.ut.ee/imageprocessing/book/2
3.  Liu, H. (2021). Chapter 3 - Rail transit collaborative robot systems. In H. Liu (Ed.), _Robot Systems for Rail Transit Applications_ (pp. 89-141). Elsevier.