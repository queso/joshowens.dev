---
title: "Fat Models, Skinny Templates"
slug: "/fat-models-skinny-templates"
date: "2015-06-17T05:40:16.842Z"
featured: false
draft: false
tags:
  - meteor.js
description: "Have business logic for your Meteor app? Learn where to park it in your app..."
keywords:
  - meteor.js
  - orm
  - business logic
banner: "./images/fat-models-skinny-templates-header.jpg"
---

I never kept it a big secret that I came from a long history of building Rails apps. I was a big fan of the ['Skinny Controller, Fat Model' paradigm](http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model) when Jamis Buck posted it. The post deals with the idea that your HTML gets hard to read when you push too much logic into the template. Through refactoring he moves it into the controller - like a template helper. Ultimately it ends up in the model file - think collection documents. The HTML becomes more readable and slims down the controller.

![fat-model-meteorjs-meme](./images/collection-helpers-meme.jpg)

A while ago I wrote about missing my ORM since moving to Meteor, and I think this pattern is a big reason why. Sometimes you just have code that you need to write and it seems limited to write one template helper or too broad to write a global helper. The types of helpers I am talking about deal with the data in the collection itself - reformatting or reconfiguring it based on data in the collection. In the MVC stack, a model is a place to put code that deals with business logic. Let's look at how we can use the transform method on Mongo.Collections to do exactly that!

## Enter Collection helpers, stage right

[David Burles has written a wonderful Collection helpers package](https://github.com/dburles/meteor-collection-helpers) that helps us accomplish the very task I've been talking about. It gives you a helpers method you can call on any collection. Helpers let you add functions on collection objects. They are almost like **template helpers but for your collection objects**, so I am just going to call them models from here on. Let's take a look at a quick example of a template helper vs a collection helper:

#### Template helper
```
Template.dashboard.helpers({
  isSupportRep: function() {
    return Roles.userIsInRole(Meteor.userId(), ['support-rep']);
  }
});
```

#### Collection helper
```
Users = Meteor.users; // Let's rewrap that user collection for API consistency

Users.helpers({
  isSupportRep: function() {
    return Roles.userIsInRole(this._id, ['support-rep']);
  }
});
```
Using either helper looks almost the same to us in the template itself. For the template helper we use,`isSupportRep`, and with the collection helper we use, `currentUser.isSupportRep`.

```
  {{#if currentUser.isSupportRep}} 
    <h1>Tickets</h1>
    {{#each supportTickets}}
      {{> supportTicket}}
    {{/each}}
  {{/if}}
```

We've created a quick helper that returns a true or false value. You can also see that the code is almost identical in both the template helper and the collection helper. The great thing about the collection helper is that we have one point of 'knowledge' for our support rep business logic. If we need to add logic around who can/can't see support tickets then we just add more role types to the array. The above code also becomes much easier to test because it focuses on very few concerns. Less logic means less tests to write, generally.

## Consistent APIs

Meteor is an isomorphic platform. Therefore, we need to consider both the client and the server code when we write code. Meteor builds in a lot of consistency between those two areas of operation. Why shouldn't we carry over this isomorphic principal to our business logic too? If you choose to use the previous template helper, we would end up with a similar Roles call in our publication like so:

```
Meteor.publish('supportTickets', function() {
  if (Roles.userIsInRole(this.userId, ['support-rep'])) {
    return SupportTickets.find();
  } else {
    this.ready();
  }
});
```

Ok, so, that's not so bad right? But remember when we talked about that single source of truth above? When your client comes back and says, "Let's give our managers and admins access to see the support tickets too."... What are you going to do? You now have to update both your template helper and your publication to add the additional roles. Instead let's try this and get our desired single source of truth.

```
Meteor.publish('supportTickets', function() {
  user = Users.findOne(this.userId)
  if (user.isSupportRep()) {
    return SupportTickets.find();
  } else {
    this.ready();
  }
});
```
And now we have a consistent API for both the client and the server. In addition, we have achieved our single source of truth for the business logic. Making changes to your business logic becomes much simpler!

## You mentioned an ORM?

Hey, let's build out a quick ORM type feature with relationship methods in our collection models. We have specific support tickets tied directly to a user id, so we can build a supportTickets method on the user collection model:

```
Users = Meteor.users; // Let's rewrap that user collection for API consistency

Users.helpers({
  supportTickets: function() {
  	if (this.isSupportRep()) {
  	  return SupportTickets.find({userId: this._id})
  	}
  },
  isSupportRep: function() {
    return Roles.userIsInRole(this._id, ['support-rep']);
  }
});
```

We actually reused the isSupportRep method to wrap up our supportTickets to only return something if the user is a support rep. We also scope the support tickets that we find to those that the user should have assigned to them. Let's see what using the supportTickets helper looks like on both the client and the server:

#### Client
```
  {{#if currentUser.isSupportRep}}
    <h1>Tickets</h1>
    {{#each currentUser.supportTickets}}
      {{> supportTicket}}
    {{/each}}
  {{/if}}
```

and

#### Server
```
Meteor.publish('mySupportTickets', function() {
  user = Users.findOne(this.userId)
  return user.supportTickets();
});
```

Voilá, we've easily integrated our new ORMish code directly into both the client and the server with relative ease. We've again gained a single source of truth about how we find a users support tickets. If our client comes back to us with changes, they are easy to make.

## But how do you decide what becomes a collection helper?

Again, I think this pattern is a super great fit for business logic. I recently submitted a pull request to [SpaceTalk](https://github.com/SpaceTalk/SpaceTalk/commit/85b39a63734dec32148773e063420a7c91004528) that follow some of these patterns. We have channels in the app, but my pull request added direct channels. I added collection helpers to keep logic like a channel name all in the collection:

```
Channels.helpers({
  otherUser: function() {
    otherNameId = _.reject(this.allowedUsers, function(u) {return u === Meteor.userId();})[0];
    return Meteor.users.findOne(otherNameId);
  },
  directChannelName: function() {
    user = this.otherUser();
    if (user) {
      return user.username;
    }
  },
  channelName: function() {
    if (this.direct) {
      return this.directChannelName();
    } else {
      return this.name;
    }
  }
});
```

## The tail end

If you haven't yet, you should check out Collection helpers for your app building enjoyment. Between that and the collection hooks package, I've been able to setup most of the functionality that I missed in my model layer.

Do you put helpers on your collections objects? Leave a comment below.
