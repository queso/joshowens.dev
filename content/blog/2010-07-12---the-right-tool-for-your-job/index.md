---
title: "The right tool for your job"
slug: "/the-right-tool-for-your-job"
date: "2010-07-13T05:41:26.000Z"
featured: false
draft: false
tags:
  - developer advice
  - rails
description: "Picking the right library or package can be hard, Here are things I look for..."
keywords:
  - developer advice
---

Ever wonder if you should use Workling or Delayed::Job? RestfulAuth or
AuthLogic? Paperclip or Attachment Fu? It can be confusing to try and
figure out what tool to use for the job. You have many choices for your
project, but it is important to look at key elements to influence your
decisions.

### Project Activity

Looking at a commit log may seem like the obvious way to gauge this, and
it is! A lot of people tend to overlook this simple fact. Is the project
like Delayed Job where you only see a commit every 2 months and it is a
documentation patch? Look yourself, compare
[Starling](http://github.com/starling/starling/commits/master) to
[AMQP](http://github.com/tmm1/amqp/commits/master) - AMQP has updates
less than a month old, Starling appears abandoned since April.

This metric is probably one of the single most important ones you can
look at, and it doesn’t take that long!

### Github Network

Another quick metric that can help you gauge how active a project is.
The bigger the network, the more community activity there is around a
project. I think the benefits of an active community are pretty obvious
- [Rails](http://rubyonrails.org) is a great example of this.

One gotcha to watch out for here is a “canonical master” repo that isn’t
updating or taking any pull requests… Then you end up with 100 different forks of a project and [no one driving the project](http://groups.google.com/group/delayed_job/browse_thread/thread/8924596333422afe#), again like DelayedJob.

### Code Cleanliness

Don’t overlook another simple metric for plugins and gems: read the
code! Open up Textmate and browse the code. Browse through the tests and
maybe even give them a try. If you are going to have your project rely
on this functionality, isn’t it worth investing 20 minutes to really
look through things?

If you aren’t 100% sure what you are looking at in the code, you have
other options as well. Fire up metric\_fu and run it on the project.
Still daunted? Use [caliper](http://devver.net/caliper), they handle it
all for you! They can take any public github repo and generate metric fu
scores off of it.

### Finding help

The last metric to look for when examining a gem or plugin are your help
options. Here are some key questions to find answers for:

-   Do they have a google group?
-   Where do you submit issues, and are they being resolved?
-   Do they have an IRC channel? If so, go see how active it is.

A great example of a strong community would be EventMachine. They have a strong IRC channel (\#eventmachine on freenode), a very active [github
project](http://github.com/eventmachine/eventmachine), and an active [google group](http://groups.google.com/group/eventmachine)

### How do you know all this?

Well, my friends, let me share a bit of growth pain I experienced in a
project. When I first started [tweet hopper](http://tweethopper.com), I decided to use Starling for queue handling. Why not, twitter used it… Everything ran great as long as I had one box with the job running daemons and the job queue. Everything fell apart slowly as I moved to two boxes, even load balancing between two starling servers didn’t help.

That is when I decided that RabbitMQ might be my best bet, I had heard
great things about Erlang’s capabilities in the scaling department.
After much deliberation and studying, I decided to make the leap and use
AMQP and Eventmachine to interact with RabbitMQ. The choice of AMQP was
a no brainer, we already used
[daemon-kit](http://github.com/kennethkalmer/daemon-kit) and it has
native AMQP support. The switch took less than a weekend to get up and
running!

In the end, we went from two starling queue servers and two daemon
servers running 8 daemon workers each, to two queue server and two
daemon servers running one daemon each. Starling was constant source of
pain, the servers would just start handing out random timeouts after
they were up for 24 hours or more. With RabbitMQ, I check in once a day
out of habit, but I have yet to restart it in the past 6 months.

### Use what works

Use the best tool for the job, don’t be afraid to look outside your main
language or to push outside your comfort levels. Don’t hesitate to make
a switch to another plugin or gem if the one you are using doesn’t seem
to fit your needs. Most of all, just take some time to really examine
what you are using - it can go a long way.

