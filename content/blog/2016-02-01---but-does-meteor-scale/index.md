---
title: "But does Meteor scale?"
slug: "/but-does-meteor-scale"
date: "2016-02-01T18:22:43.982Z"
featured: false
draft: false
tags: ["javascript", "meteor.js", "scaling", "web performance"]
keywords: ["meteor.js", "web performance", "javascript tips"]
banner: "./images/scaling-graph.jpg"
---

A question that pops up for me pretty often is 'Can Meteor.js scale to handle the traffic I need?'. Or something like 'Can I handle 1 million users with Meteor'. These draw a chuckle from me every time. The question is a very tricky to answer with any framework or platform because they are many factors involved. I also figure answering this question is timely with the [recent Galaxy launch](http://info.meteor.com/blog/announcing-meteor-galaxy).

![scale-meme](./images/but_does_meteor_scale_meme.jpg)

Think about it this way, if I asked you if you could run a Marathon, you probably couldn't straight up answer that question quickly. You would need to know if I meant a full or half marathon. Next you would want to know how many weeks you would have to train. Lastly, you may have to consult a doctor to see if there are downsides to that kind of training for your body. The doctors answer would depend a lot on your physical health and age. Tricky to answer, right? That is because it is specific to each individual person.

## But Josh, I need to get my Meteor app to be web scale

Listen, I get it. You want to build the next Tinder for scooter lovers... It makes sense that you need to know about scaling, right? 

NO! Scaling is almost irrelevant to what you are doing. [Listen in on Classcraft](https://podcast.meteorjs.club/episode/exploring-meteor-s-hosting-platform-galaxy) and their story of becoming one of the biggest Meteor apps. Classcraft didn't care about scaling, just building their app and finding an audience. When you start building an app, scaling is something that happens **AFTER** you find product/market fit. Creating your app and launching it, I promise you won't hit the kind of user scale you are dreaming about. I've been working almost every day to build up mindshare for things like [Crater](https://crater.io), [Crater Podcast](http://podcast.crater.io), [SpaceDojo](http://spacedojo.com), and [Meteor Club Podcast](https://podcast.meteorjs.club). Creating an interested audience is the hardest part of starting your business. I can tell you I am running on 2 Digital Ocean $20 servers to keep Crater up and running. I am doing 500k page views a month (200 concurrent users around the clock) on that setup, and things seem to be moving along just fine.

## But I know XYZ can handle millions of people

Sure, Facebook has PHP serving gazillions of people with their funny cat pictures and latest beautifully filtered Instagram photos.

I worked on a project a long time ago that had to deal with a massive influx of server connections every night after dinner. It was a real-time two-player iOS game (think Scrabble) with a Ruby on Rails backend. Scaling to make the app faster had almost 0 to do with Ruby or even the rails platform itself. Most of the team's time went to optimizing the database, adding a write-through caching layer to the database, and trying to distribute the load amongst all the app servers they had (27 at the time). A lot of apps and frameworks can be built to scale out horizontally. You end up having problems that come in from other places like the database; maybe it can't handle a high write load.

## You are still dodging the question

Honestly, I can't **really** answer the question of 'Can I achieve ROLFscale' because it still depends on a lot of things.

* How much data are you publishing to each client?
* What does the write load look like for the database?
* Are any of the database queries reusable or are they unique per connected user?
* How much of your site is reachable to the public (i.e. no logins needed)?

## The ready solutions

Meteor comes with a couple of cool 'switches' we can activate to make scaling easier. 

1. The first one is WebSocket itself. It looks like a regular HTTP or HTTPS request and so things like Haproxy and Nginx can easily proxy those for us, just remember to turn on Sticky Sessions, so you aren't constantly reloading data into the MergeBox on the server.
2. The second switch is Mongo Oplog. The Meteor server will act like a Mongo replica and get real-time updates directly from Mongo instead of running an expensive-on-CPU poll-and-diff option. Oplog is a double edged sword and will start to fail once the write load gets high enough. You can tweak `METEOR_OPLOG_TOO_FAR_BEHIND` to help mitigate high write loads.
3. The third is DDP itself. You have many options to spread out from a single Meteor instance or Mongo instance by using strategies such as microservices or sharding your collections out to other Mongo servers.

## Sounds great, but I need to scale...

Right, you want me to tell you more about how I have Crater setup. Stay tuned for the next post, which will cover how I have it setup and I can even show you how easy it is to add in a third server when I am ready.
