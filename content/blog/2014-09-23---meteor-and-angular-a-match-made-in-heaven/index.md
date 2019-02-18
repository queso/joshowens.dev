---
title: "Meteor and Angular - a match made in heaven?"
slug: "/meteor-and-angular-a-match-made-in-heaven"
date: "2014-09-23T12:53:41.060Z"
featured: false
draft: false
tags:
  - meteor.js
  - angular
description: "Can Meteor.js and Angular.js work together?"
keywords:
  - angular.js
  - meteor.js
banner: "./images/universe.jpg"
---

### Meteor and Angular

I've only had one occasion to really try out Angular to see what I thought of it, I had an experienced friend come over and pair with me through building my first screen using Rails 3.2 and Angular. Since the first time trying Angular, I fell madly in love with the Meteor.js platform and never really gave it a second thought - at least not until a blog reader asked me to dive deeper!

I decided to reach out to my Meteor friend [Jonas Aschenbrenner](https://twitter.com/SanjoX) (aka [Sanjo](https://github.com/Sanjo) on Github), because I know he has a sizable Meteor/Angular app and would be the perfect guy to answer my questions.

### What are the advantages of Angular.js?

Angular makes it easy to structure your client code into testable units and connect them via dependency injection. Angular has also another approach to templating by extending the HTML vocabulary very similar to Web Components. Angular is also great for forms. It has two-way data-binding and validation built in. There is also a great community that has developed many very useful Angular modules.

### Meteor already gives you a client-side API, how does Angular fit in to that?

You can use most of the client-side API of Meteor without problems. I created some wrappers to make it easier to work with them, though. I converted methods that expect a callback to promise versions. And I also use a helper for Tracker.autorun that will automatically stop the reactive code block when a Angular controller is destroyed.

The exception is Blaze, the templating engine. I found it hard to create a fusion of Blaze and Angular templating in the past. But it could be possible and the new Blaze API makes it easier I think. For my project I use https://atmospherejs.com/sanjo/angular-templating.

### What has your experience been in creating an app that uses both? Has it been hard, if so, how?

The app started with a RESTful API. We integrating Meteor later and replaced the RESTful API. At the beginning I had to solve some problems gluing Angular and Meteor together. Fortunately other people had already done work on those things that made it a lot easier for me.

### Would I lose any of the 'meteor magic' by switching my client side to use Angular?

I don't think so. Two smaller things I can think of are:
Reusing code on the server and client. You need to write common code without using Angular and then add it to a Angular module on the client side.
Using smart packages that provide Blaze UI components. You cannot use them easily.

### After building a sizable app, what are your impressions of the viability of building a hybrid app like this? If you had the choice to do over again, would you still build a hybrid app like this?

I really like that it is easy to test my Angular app code. But with time more and more great smart packages will appear that provide similar features. As always, it depends on the app. But probably I would't start using Angular right at the beginning of the project and only add it when it is clear that the benefit would be big enough.
For people that don't already know Angular I would not recommend to even consider it. It will probably slow you down.

### What has been your favorite part of feature of using Angular and Meteor together?

The most important feature for me is the real-time data synchronization that happens automatically in the background. It's really nice that Meteor does this for you.

---

That wraps up our interview with Jonas, hopefully that was helpful to read about his experiences with Meteor.js and Angular.js.

I have also added some new [Mastering Meteor online classes](http://meteorjs.club/learn/) since the first one sold out, go check them out if you want a firm grasp on Meteor.

