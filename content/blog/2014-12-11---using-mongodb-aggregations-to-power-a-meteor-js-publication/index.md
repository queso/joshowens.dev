---
title: "Using MongoDB aggregations to power a Meteor.js publication"
slug: "/using-mongodb-aggregations-to-power-a-meteor-js-publication"
date: "2014-12-11T16:06:23.084Z"
featured: false
draft: false
tags: ["mongo","meteor.js","aggregation"]
description: "Need to aggregate data from collections? Learn how with Meteor.js and Mongo."
keywords:
  - mongodb
  - mongo aggregations
banner: "./images/meteor-pipeline-header.jpg"
---

I often hear Meteor.js take some flak for only working with MongoDB. I thought it would be fun to dive into a native Mongo feature and how to implement it in your app. This article is about a way to publish aggregate data using the MongoDB aggregation framework with Meteor.js. What is the MongoDB aggregation framework, you may be asking? The manual says "Aggregations operations process data records and return computed results." which is a fancy way of saying you can find and manipulate data using queries.

This code has been testing and was extracted from a recent commit I did for a client.

![mongo-aggregate-meme](./images/aggregation-meme.jpg)

### The setup

Suppose we have an app we've built, nothing fancy, just an e-vite potluck party planner. You input a date, time, place, and some email addresses of people you want to invite. The goal of the app is to get the invited people to input that they are bringing something to the party. Mr CEO comes over to our desk one day and tells us he wants to make it easier for people to invite their friends, so let's add a modal with select2 autocompletion and we can grab their contacts from their Google account.

We setup everyting and added a Contacts collection to the app to power our fancy new autocompletion widget. Once we get the new feature up on staging, Mr CEO makes a comment that not all of his friends are showing up in the autocomplete list. After a quick discussion, we realize we need to grab previously invited people and add them to the contact list as well.

The first step to grabbing those emails is to get the aggregation framework package installed - it doesn't do anything to fancy, just wraps up some Mongo methods for you. Just `meteor add meteorhacks:aggregate` and you should be in business. This will add an aggregate method to your collections.

### Building and publishing the data

We have Events with an array of invite objects that contain the data we want **to access**. Now we can dive into the aggregation framework and build up our pipeline queries.

```javascript

contacts = Events.aggregate([{$match: {creatorId: this.userId}}, {$project: {invites: 1}}, { $unwind : "$invites" }, {$group: {_id: {email: "$invites.email"}}}, {$project: {email: "$_id.email"}}])

```

Aggregate takes an array of queries, each one passing in the results of the previous query. The first thing we do is `$match` any events that the user created. Then we use the `$project` option to only passing along the invites array. Next, we use the `$unwind` option to split each invite array element into it's own record, so if we invited 4 people, we will get 4 results. After that, we `$group` the invites by email address so we only get uniques emails in case we invited someone more than once. Last, we `$project` the email address out of the id field and stick it in as an email attribute on our results.

I've often called publications in Meteor.js the heart and soul of your application. We can take all these results and add some 'soul' to our app by publishing them to the Contacts collection on the client side:

``` javascript
Meteor.publish('previousInviteContacts', function() {
  self = this;
  contacts = Events.aggregate([{$match: {creatorId: this.userId}}, {$project: {invites: 1}}, { $unwind : "$invites" }, {$group: {_id: {email: "$invites.email"}}}, {$project: {email: "$_id.email"}}])
  _(contacts).each(function(contact) {
    if (contact.email) {
      if (!Contacts.findOne({userId: self.userId, email: contact.email})) {
        self.added('contacts', Random.id(), {email: contact.email, userId: self.userId, name: ''});
      }
    }
  });
});
```
We use underscore to loop over each contact and run some logic checks. The first check is to make sure the contact object contains an email. The next check is to make sure we don't duplicate any emails that already exist in the Contacts collection for this user. If both those logic checks pass, we then hand publish a fake contact record using self.added.

By pushing a fake contact record to the client side using DDP, our select2/autocomplete widget will automatically pick up these new results once we subscribe to this publication on the client side.

Pretty neat, huh?

### What else is aggregation good for?

The other interesting thing we could do with the aggregation framework is to use setInterval on some server-side code and run this query every few minutes. Then we aggregate dump out to a collection itself. You can use the $out pipeline operator and it will create or replace the collection it spits out, after the results are ready. We could then reactively subscribe to the aggregation collection and it would work like any normal Meteor.js Collection.

### Aggregations for everyone!

I think Mongo Aggregations are a great tool and you should consider using them in your app. The one thing to keep in mind is that none of the publish code I wrote is reactive. That means when a new Event is added for a user, that code won't rerun and we won't get new emails filtering into the Contacts collection on the client side. I decided that wasn't a big deal, so why bother with the extra code to make it reactive?

Use the Pipeline, Luke!
