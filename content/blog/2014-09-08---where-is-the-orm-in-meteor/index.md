---
title: "Where is the ORM in Meteor?"
slug: "/where-is-the-orm-in-meteor"
date: "2014-09-08T13:14:08.332Z"
featured: false
draft: false
tags:
  - meteor.js
description: "Meteor doesn't have an ORM, let us look at some other options"
keywords:
  - meteor.js
banner: "./images/minimongoid.jpg"
---

Coming from Ruby on Rails, I really missed having an ORM available to me when I was working in Meteor.js. They offer a basic db layer called Collections, but it feels a little thin when you are first getting started. It leaves you wanting an easy way to decorate each model in a collection with business logic and helper methods like most good ORM layers, such as ActiveRecord or Mongoid. So what is a programmer to do?

!where's the beef?

### There are two easy ORM options

In my time with Meteor.js, I've run across two packages that give you the some ORM layer for collections; [collection-helpers](https://github.com/dburles/meteor-collection-helpers/) and [minimongoid](https://github.com/Exygy/minimongoid). Minimongoid lacks documentation, but the source code is readable enough to work together how to use it. The Collection helpers package gives you a way to easily decorate each model with methods and business logic you need. Minimongoid offers a little more functionality by adding in relationship building and automated timestampping. Let's look at some of the features of each.

### Collection helpers

We can take a look at the syntax and then break it down afterwards:

```
Video = new Meteor.Collection('videos');

Video.helpers({
  totalViews = function() {
    return this.siteViews + this.youtubeViews;
  }
})
```

We start with setting up the Video collection just like normal. Next we call Video.helpers and add a method for calculating a total views number based on the number of site views and youtube views combined. Behind the scenes Video helpers is using a transform call for applying our helper methods to each model in the collection, which will ensure the object we get back from collection-helpers has our new totalViews method.

The downside being collection helpers is a pretty basic package. I would love to see it go farther with things like automatic timestamps, relational method setups, callback hooks, and validation methods. There are existing packages out there, If someone wanted to be pretty enterprising, you could probably cobble most of it together as one new package.

### Minimongoid

Minimongoid is based on the popular mongoid ORM from Ruby on Rails, so I think it has more ambitious ideas from the start. Here is the coffeescript syntax - the javascript version is ugly:

```
class @Video extends Minimongoid

  @_collection: new Meteor.Collection('videos')

  @before_create: (video) ->
    video.siteViews = 0
    video
  
  totalViews = ->
    @siteViews + @youtubeViews
```

With coffeescript and minimongoid, we've set up a similar method called totalViews, which will get applied to any object that comes from a Video.find call. This time you can see we used the @before_create hook to set the siteViews to a default of 0. To me, this feels more like a rails ORM and I start to feel at home. The relational piece of minimongoid is pretty interesting too:

```
class @Video extends Minimongoid

  @_collection: new Meteor.Collection('videos')
  
  @belongs_to: [
    {name: 'user', identifier: 'userId', class_name: 'User'}
  ]
```

Now after we find our video `video = Video.first(id)` we can now call `video.user()` and it will return our user object if that data is available to us - it should be on the server, you may have to have an extra publication on the client side. Here is what the other side of the relationship would look like:

```
class @User extends Minimongoid
  @_collection = Meteor.users
  
  @has_many: [
    {name: 'videos', foreign_key: 'userId', class_name: 'Video'}
  ]  
  
  @current: ->
    @first _id: Meteor.userId()
  
```

Now that the other side is setup, we can find our user `user = User.current()` and then we can just call `user.videos()` and if the video data is available, we will get a collection of video documents back.

Another nice feature of Minimongoid is that you get automatic timestamps for free. When you create a document using their create method you get a createdAt timestamp on the object. I've barely scratched the surface of all the niceties you get with Minimongoid, so I would advise taking a look at it all if this is something you are interested in.

### What's missing?

We didn't really touch on validation much, I would love to hear if you guys are using anything for server-side validation, or client-side/server-side validation at the same time? Another topic is data sources, we covered mongo pretty well here but I know that Redis has already been implemented and the Meteor Development group is working on a postgres adapter as well. Hopefully what they give us will have a similar API and make it easy for us to use libraries like Collection helpers and Minimongoid still.

Also, I wanted to announce that I've launched an [online training class called Mastering Meteor](http://meteorjs.club/learn/).
