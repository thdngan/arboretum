---
title: Programming Exercises (MATLAB)
date: 2022-08-02
tags:
  - image-processing
draft: true
---

Write a computer program capable of reducing the number of intensity levels in an image from 256 to 2, in integer powers of 2. The desired number of intensity levels needs to be a variable input to your program.

```Matlab
size = '128';
a = imread(['https://avatars.githubusercontent.com/u/103092148?v=4' size]);
imshow(a);
test(rgb2gray(a));
test(a);

function y = im_downgrade(img, intensity_levels)
    y = round(img.*((intensity_levels - 1)/256));
end

function y = im_upgrade(img_downgraded, intensity_levels)
    y = img_downgraded.*(256/(intensity_levels - 1));
end

function test(img)
    for k = 1:8
        levels = 2.^k;
        img_down = im_downgrade(img, levels);
        new_img = im_upgrade(img_down, levels);
        imshow(new_img);
        figure;
        imhist(new_img);
        figure;
    end
end
```

Rotate the image by 45 and 90 degrees (Matlab provides simple command lines for doing this).

```Matlab
d = imread('https://avatars.githubusercontent.com/u/103092148?v=4');
r45 = imrotate(d,45);
imshow(r45);
figure;
r90 = imrotate(d,90);
imshow(r90);
```