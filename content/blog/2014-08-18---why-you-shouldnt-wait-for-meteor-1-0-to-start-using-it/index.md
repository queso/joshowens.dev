---
title: "Why you shouldn't wait for Meteor 1.0 (to start using it)"
slug: "/why-you-shouldnt-wait-for-meteor-1-0-to-start-using-it"
date: "2014-08-18T12:24:00.093Z"
featured: false
draft: false
tags:
  - meteor.js
  - mongodb
  - scaling
  - javascript
description: "Meteor.js is ready to use right now, find out why!"
keywords:
  - meteor.js
  - mongodb
  - scaling
  - javascript
banner: "./images/try-meteor-1.png"
---

![header-cover]()

One of the questions I hear most often when talking to someone about Meteor.js is, when will 1.0 be out? That's a great question and it is hard to answer because the Meteor Development Group strives to maintain a high level of quality in each release, be it 0.7 or 1.0. Right now things are heating up for a 0.9 release which includes big changes to how the packaging system works. This is the last big hurdle before we will see a big push for 1.0 by fixing bugs and tuning performance, updating docs, etc. **I believe we won't see any breaking changes between 0.9 and 1.0**.

### Is it production ready?

Having spent the last 15 months working almost exclusively on Meteor.js apps, I can say with some confidences that this platform is ready for production. I helped build a daily [fantasy sports web app that helps charities](http://fantasyhub.com) raise money. As part of the project we had to fetch a ton of sports data about games, player stats, etc. We were able to build a modular enough system that scaled well enough to work for all the different types of sports. Besides the modularity, Meteor is a great platform for doing realtime display of score calculations. I helped build a system that fetches stats for active games, every 20 seconds from an API and then recalculates the scores. Of course I love the fact that I didn't have to do anything to ensure that all the people watching the stats get the latest updates almost instantly! Even the CEO of Meteor Developer Group [says it is ready](http://www.quora.com/Is-Meteor-production-ready-in-August-2014).

### But what about scaling Meteor.js and Mongo?

I think the biggest blocker for horizontal scaling was solved with 0.7 with Mongo Oplog support. That release made it easy to turn on Oplog and to give every Meteor instance updates from the Mongo Master, as if each Meteor process was a MongoDB slave. This means you get real time updates to every process instead of the one receiving the new data.

This change was important not only for making it easier to scale horizontally, but it also cut down CPU usage. On the Differential site, we saw the CPU usage hover around 90% during most production uptime. When we switched to Oplog support we saw the average CPU usage drop below 10% during production uptime. So now instead of scaling out, we can scale up on single nodes with multiple cores too!

### I've used rails since pre-0.8 days

I am sure people get tired of hearing stuff like Meteor vs Rails or some such. Rails is the easiest point of comparison for me, having spent 9 years with the framework. The speed at which I could build a web app with rails, even in the early days, far outweighed any concern that I had for breaking APIs or scalable apps. Developer happiness counts for a lot in my book, it is the reason I started with rails in the first place. The speed I gained from not doing stupid things, like putting database calls in php templates but instead putting them into a controller, was amazing.

We are now making a quantum leap forward over the conventions of just server side rendered frameworks. 

![quantum-leap](./images/65537.jpg)

We are to the point where client (javascript) and server need to communicate much more than they ever did in the early days of the web. Apps like Facebook and Twitter are pushing the idea of auto-updating reactive apps into popularity. My developer happiness comes from two majors sources in regards to Meteor.js:

1. All the configuration work that you get for free to do client/server realtime communication.
2. The ease of adding complete app functionality from a package is wonderful.


### But what about bugs in Meteor.js?

Having been around rails for a long time, I can promise you the way things will work with 0.9 or 1.0 meteor.js releases. There will be release candidates that come out and people will use them and test them out with their applications. The Meteor Development group will work hard to make the release as bug-free as they can. Inevitably, bugs will slip through. This was almost always the case with rails. We always joked to wait a day or two after a release because 2.0.0 would come out followed by 2.0.1 the next day. A disciplined core team and a good amount of release candidate testers can help minimize this risk, but little bugs still slip in. Don't let this stop you from using Meteor.js - I still haven't hit a major bug that caused me any real downtime.

### Give Meteor.js a try again

If you've never tried Meteor, or tried it once and gave up, then I think right now is the perfect time to pick it back up! It has a stable API, solid hosting options, great packages, and a super helpful community. On top of that, you get a platform that will change how people are building web apps for years to come.
