---
title: "Throwing away code"
slug: "/throwing-away-code"
date: "2010-04-23T04:20:15.000Z"
featured: false
draft: false
tags:
  - developer advice
description: "Sometimes code just isn't right, don't be married to it..."
keywords:
  - developer advice
  - throw your code away
  - finding the right solutions
banner: ""
---

Ever get an idea in your head, and it seems like it will solve all your
problems in your app? If you could just do this one thing, rainbows will
sprout and unicorns will prance and sing?

Ideas turn into requirements, requirements sprout into little code
snippets, code snippets grow together into features. The problem, as you
might discover, is that sometimes these requirements can be too numerous
or sometimes just flat out wrong.

**It’s ok to throw away code when you figure out your requirements are
wrong**. Let me give you a recent example from [tweet
hopper](http://tweethopper.com):

### Sharing is nice

Tweet hopper has two pieces two it, a twitter job running daemon and the
website. There is a lot of classes that overlap from one app to the
other, and I am trying to keep test coverage up. The natural thought was
to move the shared models and shared specs to submodules and keep them
in sync. The more I thought about this, the more it sounded like a
win-win, I mean how could code sharing go wrong?

I soon found out why separation of concern is an important thing! As I
moved one class and specs over, I soon realized that callbacks and tight
couplings were going to be a nightmare. I was committed at first that
this was the right path, and I should work to decouple and test pieces
better. **Moving and separating code can be a deep, dark rabbit hole**.

### Know when to fold em…

After two and a half days of moving code, running tests, finding
failures, moving more code, rinse and repeat - I decided that this
wasn’t the best approach. While decoupling code is a great thing, I
didn’t have the test suite to back up my work. I decided before I was
too deep into the project that it was a good time to scrap things and
re-examine the approach to the issues I wanted to solve. **Be skeptical
of your solutions until they work 100% for you**.

Submodules had already been setup, code commits were in the master
branch, so this was a wee bit more of a cleanup job than normal. In the
end, it was better to revert things and spend more time doing research
on other ways to approach my core requirement of getting all the code
working together in one spot.

### Spike!

When I looked at the code base and took daemon-kit and AMQP out of the
equation, I started to look for better queue options. By looking for
something more integrated into a rails app, I would be able to move all
my code into one easily tested spot.

After a week of research and reading, I realized resque
^[1](#footnote-1)^ might fit the bill. Since resque integrates more
directly into the rails app, I can submit jobs from the web interface
now - allowing new features I want. With multiple queue support and easy
command line priority setting, I can now easily prioritize jobs and
maybe increase run frequence on slow jobs.

The single biggest gain is that the resque system had a worker forking
system in place to keep memory leaks at a minimum - an issue I’ve been
fighting unsuccessfully in my tweet hopper daemon code for months now.
**By tossing out other ideas and previous code, I found a possible new
solutions**. Ask me again once stream.twitter.com is out of alpha for
user authenticated calls!

### The moral of the story

**Don’t be afraid to question assumptions and requirements**, even if
they mean you might have to start over on a lot of code. Less code, one
git repo, or easier testing can all make coding smoother in the end,
despite initial time loss for tossing out code.

*Links*

[[1] Resque blog post](http://github.com/blog/542-introducing-resque)

