---
title: "Ensure with no rescue"
slug: "/ensure-with-no-rescue"
date: "2010-04-11T03:31:08.000Z"
featured: false
draft: false
tags:
  - ruby
description: "I found that you can make a code block always runs without a rescue in ruby."
keywords:
  - ruby
  - rescue code
---

Need to ensure some code runs no matter what happens? Even with
exceptions and returns? I’ve got just the under-documented feature for
you! Ensure! Ensure, you say? Yip, let’s take a look.

### Begin, Rescue, Ensure

I am sure most people have seen the typical usage of ensure, you toss it
at the end of a being/rescue statement to make sure a snippet of code is
always run. Ensure is good for things like making sure file descriptors
are closed, boolean switches are flipped, etc. What happens if you still
want the exceptions thrown?

### Show me the code!

First, let us take a look at the basic being/rescue/ensure example:

Now, we’ll take out the rescue clause to ensure our exceptions bubble up
and can be caught with whatever exception tracker we use.

With the rescue out, we get a closer to what we want, the exception is
thrown but the code still cleans up our boolean switch.

What happens if we need to return out of the method based on a logic
condition? Let’s see:

Oops, we left our boolean switch marked as running. Perhaps we use the
ensure call on the method definition level:

Bingo! That is exactly what we wanted. Using ensure on the method
definition level makes sure we always have our clean up code running, no
matter what happens in the method. I [found this
interesting](http://twitter.com/joshowens/status/11761100685) and
under-documented so I wanted to share a detailed example.

