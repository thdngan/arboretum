---
title: Legacy Mars Global Climate Model
date: 2022-08-30
tags:
  - climate
draft: true
---


i don't even remember why i did this T^T

```bash
% sudo apt install gfortran
% git clone https://github.com/nasa/legacy-mars-global-climate-model.git
% cd legacy-mars-global-climate-model
% ls -l
% cd code
% make clean
% make
% cp gcm2.3 ../run/
% cd ../run/
% ls
% ./gcm2.3 <mars_tutorial> m.out &
```

Error:

```
At line 301 of file main.f (unit = 6, file = 'stdout')
Fortran runtime error: Sequential READ or WRITE not allowed after EOF marker, possibly use REWIND or BACKSPACE

Error termination. Backtrace:
#0  0x7eff8c3778d2 in ???
#1  0x7eff8c3783c9 in ???
#2  0x7eff8c378f1f in ???
#3  0x7eff8c5c150d in ???
#4  0x40259e in ???
#5  0x4023c6 in ???
#6  0x7eff8bf8d082 in __libc_start_main
	at ../csu/libc-start.c:308
#7  0x4023fd in ???

```

Now where did it go wrong...