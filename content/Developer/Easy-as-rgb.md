---
title: As Easy as RGB
category: Developer
order: 20
author: Richard Sabbarton
---

# Easy as R,G,B?

As part of the new PixelBrush implementation I have been working on a better way to blend colours together in order to ensure that they appear correct in the sprite.  This isn't as easy as it sounds.  I have done some experimentation however and found a great way of explaining why you can't just mixy-matchy with the R,G,B numbers.

## Let's take a simple example...

Let's say we blend RED into GREEN?  Simple, there's no BLUE to worry about.

![image](https://github.com/rsabbarton/PixelFlux/assets/12117601/66c5d4c9-0eea-4066-9e2e-e217e8685134)

This image shows three colours.  Red on the left and Green on the right.  The colour in the middle (let's call it MUD) is exactly halfway between the two colours.  It is a mathematical mid-point.  127 red and 127 Green and still zero Blue.

Now take a look at this one.

![image](https://github.com/rsabbarton/PixelFlux/assets/12117601/9736db85-2a96-4468-8092-ad98ea346409)

Looks a lot smoother doesn't it.  It wasn't a difficult problem to understand but I found a good way to resolve it using some of my historical experience with 3D modelling.

Why does the second one look better or smoother than the first.  The answer can be found in a little bit of vector mathematics.  The reason the first one looks off is because the colour is darker in the middle than the colours either side.  If you plot Red (r) and Green (g) on a graph and draw a straight line between the the two colours (with 127,127) in the middle, this is what you see in the first example.

At the mid point, the (127,127) is closer to the origin that either of the original two colours on their own.  This makes the colour darker.  In Vector terms we call this the magnitude of the vector.

What we need isn't a straight line but a curve.  A circle around the origin where the magnitude is static.  Then, when we transition from red to green we get to a mid-point where the number isn't 127,127 but more like 190,190 to keep the magnitude of the colour the same.

The blending functions in the PixelBrush plugins use this method.  By treating the RGB as a Vector (x,y,z) we can calculate the magnitude, normalise and amplify colours in a more pleasing way than simple transition from one point to another.

## One Final Point - Transparency

These are not just RBG but RGBA values.  This means that we need to ensure we take note of the aplha part of each colour too as well as the opacity of the tool we are using to draw.  In short, the resulting opacity should not blend with the existing colour but add to it.  As you build different colours of different opacities the resulting opacity should always be higher until the colour if fully opaque and does not show any of the underlying layer.

Here is the source code for my blend() function.

```js

    //  #######################################################
    //  #
    //  #   Function blend(c1, c2, opacity)
    //  #
    //  #   c1 = obj {r: red, g: green, b: blue, a: alpha}
    //  #       The original or base colour and alpha
    //  #
    //  #   c2 = obj {r: red, g: green, b: blue, a: alpha}
    //  #       The colour to be applied over the base colour
    //  #
    //  #   opacity = This is a global opacity.  It governs
    //  #   then amount of/opacity of c2 when applied over c1
    //  #
    //  #######################################################
    blend(c1, c2, opacity){

        // first we normalise the colours.  In this we mean take
        // rgb as a vector and convert them to a unit vector where
        // rgb values are between 0 and 1 rather than 0 and 255.
        c1 = normaliseColor(c1)
        c2 = normaliseColor(c2)
        
        // Because we are treating these as vectors we can calculate
        // the magnitute of the colours which is the distance from the 
        // origin and equates to the total brightness of all rbg values
        // combined.
        c1.mag = magnitude3v(c1.r, c1.g, c1.b)
        c2.mag = magnitude3v(c2.r, c2.g, c2.b)

        // The factorTo function takes the value a and moves it towards
        // towards value b by a factor of value c.
        // factorTo(5,10,0.5) will move half way and result in 7.5
        // In this case we want to determin how much of the original colour
        // to use.  If the opacity of the original colour is 0 then the original
        // colour is equal to the new colour.  So we factorTo(new, old, old.opacity)
        c1.r = this.factorTo(c2.r, c1.r, c1.a)
        c1.g = this.factorTo(c2.g, c1.g, c1.a)
        c1.b = this.factorTo(c2.b, c1.b, c1.a)
        c1.mag = this.factorTo(c2.mag, c1.mag, c1.a)

        // Then we work out the target magnitude.  This works out what we 
        // want the magnitude to be based on two colours with different magnitude.
        // We want to adjust the magnitude by the opacity of the colour we are applying.
        let targetMag = c1.mag + ((c2.mag - c1.mag) * opacity)
        
        // Now we have everything we need we can create a NEW colour
        // that we will return.  This is just an empty object.
        let c = {}

        // First we get the blended colours based on the opacity 
        // and the alpha values of the colour being applied.
        c.r = this.factorTo(c1.r, c2.r, opacity * c2.a)
        c.g = this.factorTo(c1.g, c2.g, opacity * c2.a)
        c.b = this.factorTo(c1.b, c2.b, opacity * c2.a)

        // Now, we can create a normalised vector (unit vector)
        // for the new colour.  This would be full brightness.  However,
        // what we really want is the brightness to be equal to the target
        // magnitude.
        let normalisedVector = normalise3v(c.r, c.g, c.b)

        // So here we multiply the unit vector of the rgb by the target
        // magnitude giving us (ALMOST) the final colour.
        c.r = normalisedVector.r * targetMag
        c.g = normalisedVector.g * targetMag
        c.b = normalisedVector.b * targetMag

        // Before we are done we have to consider the alpha to be additive 
        // only so we add the new (opacity adjusted) opacity to the original
        // opacity of c1
        c.a = c1.a + (c2.a * opacity)

        // Finally, some edge cases may have a magnitude of > 1 like white
        // for example.  The math still works but the results need to be bound
        // to 0-255 when they are output which we do here.
        c.r = bound(c.r * 255,0,255)
        c.b = bound(c.b * 255,0,255)
        c.g = bound(c.g * 255,0,255)
        c.a = bound(c.a * 255,0,255)
        // then we are done and return the new blended colour object.
        return c // Whew.
    }

```
