---
title: "Mocking and Stubbing can be evil"
slug: "/mocking-and-stubbing-can-be-evil"
date: "2010-01-06T18:40:32.000Z"
featured: false
draft: false
tags:
  - rails
  - testing
description: "Thinking about writing mocks or stubs for rails test? Learn how to do it better..."
keywords:
  - rails
  - testing
banner: ""
---

Lately I’ve been seeing some things that make me worry. Mocking and
stubbing can be very helpful tools when you use them right, but I am not
seeing them used right!

Why stubbing is dangerous
-------------------------

Don’t get me wrong, stubbing is good when you need to decouple one class
from another, or your app from a service. My problem is with functional
testing and view testing with mocks and stubs - what’s the point? If I
make a change to a model and the controller throws a 500 because of the
change, don’t you want to know about it? If you setup a stub and then
add expectations for model calls and fake return values, you won’t get
any red flags.

Twitter Poll
------------

Before we get into the nitty gritty with some real code examples, let’s
take a minute to look at some exchanges on this very subject via
twitter:

-   [@joshowens](http://twitter.com/joshowens/status/6357588864) - “Do
    you stub model calls in your controller tests? I don’t think you
    should, if the model breaks, so does the controller, tests should
    fail.”
-   [@aeden](http://twitter.com/aeden/status/6358330745) - “@joshowens
    if your controller tests are functional tests then you should
    consider it, if they’re integration then you shouldn’t.”
-   [@joshowens](http://twitter.com/joshowens/status/6359847612) -
    “@aeden They are functional, but if the action breaks on the
    controller level and not in the view, shouldn’t the test catch
    that?”
-   [@aeden](http://twitter.com/aeden/status/6361130735) - “@joshowens a
    functional test should catch broken *controller* logic…not broken
    model logic (that’s reserved for unit tests)”
-   [@dougalcorn](http://twitter.com/dougalcorn/status/6371747801) -
    “@joshowens @aeden with how little logic should be in your
    controller, I’ve quit writing functional tests and only do
    integration with webrat”

Some code for your enjoyment
----------------------------

Let’s assume we have a Saving Model and a Savings Controller. Saving has
a state field and uses a state machine plugin to offer transition
methods.

Now let’s look at a quick spec sample with some stubs

Alright, everything is looking good, we are green and the pages are
loading in the browser. But wait, the client changes their mind, they
don’t like the states “pending” and “used”, they want to use “new” and
“completed”. With this change, we are going to change the transition
methods to match, we will now use @saving.complete! in our update
action.

I change our model specs, they go red, then I fix the code to support
the new states and methods. I run the full suite and get green… Wait,
green?!? Yip, because we stubbed out the calls, we never catch the
broken controller.

A better shade of green
-----------------------

Here is how I would approach a better test that would catch our failure:

Let’s get real!
---------------

So now that I’ve given you a few examples, let me give you some real
experience on why false passing tests are bad. At
[change:healthcare](https://www.changehealthcare.com) we have 19,000 LOC
with a 1:2.5 code to test ratio - that doesn’t include our custom plugin
across shared apps. Even with a full six months of working on the app,
doing a major overhaul of the system can be problematic if you don’t
have good tests. How can you be 100% confident of rolling out your new
code when you haven’t seen and touched 100% of the app?

At change:healthcare we rely on a robust test suite, a hand rolled
continue integration suite, and vigorous staff testing to ensure we get
everything right. Even with all these efforts, we miss occasional bugs.
Better tests (avoiding false passing tests) and better code coverage
(81.9% right now) are the best way to catch these bugs! With a code bed
so large, the test suite is used as much for regression testing as it is
for anything you gain with TDD/BDD.

Personally, I am with Doug’s tweet above, forget functional testing and
even view testing and head straight for the integration testing. If you
are doing it yet, look at webrat and cucumber. After all, we want a
rails app that works from top to bottom, right?

