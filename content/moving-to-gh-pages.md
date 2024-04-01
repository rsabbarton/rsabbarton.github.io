---
title: Moving to Github Pages
category: Developer
order: 20
author: Richard Sabbarton
---

# Making a choice

Until now, I have been managing a VPS which has become more and more 
resource demanding as I run different projects and processes.

It occurred to me that this was mainly unncessary!  It was a great
tool for me to learn how to manage things like Node and Nginx.  I also 
ran databases like MySQL and Mongo and learned how to manage different 
processors and environments such as PHP and WordPress.

I decided that my projects needed a more stable environment where I could 
also manage the project versions and source control.  I was already using 
GitHub to manage the code for my projects so moving to GitHub Pages was
almost a no-brainer.

# PixelFlux

The first project to be migrated over to GitHub Pages was PixelFlux
[PixelFlux](https://rsabbarton.github.io/PixelFlux){:target="_blank"}:

{% include image.html file="pixelflux.png" %}

PixelFlux is a Pixel Art editor/creator that can be used to create game/website 
assets.  I got increasingly frustrated with the online tools available and decided
to see if I could make something myself.  It is designed with my own workflows in
mind so it may not work for everyone but I like it and functionally, it works fairly
well.  It does have a few bugs that I am working through but the main downside 
of moving to GH Pages was the removal of server-side processing of image data that 
I had implemented.  This includes the creation of animated GIFs which will now need
to be implemented in the browser instead.

# Other projects

I have a full export of all of the projects from my VPS.  I will be migrating some of
these over at some point (maybe) and any new projects will have a home here.

All in all, moving to GH Pages has been a very positive experience.