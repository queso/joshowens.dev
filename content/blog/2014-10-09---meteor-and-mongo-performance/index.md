---
title: "Meteor and Mongo Performance"
slug: "/meteor-and-mongo-performance"
date: "2014-10-10T04:10:30.887Z"
featured: false
draft: false
tags:
  - mongodb
  - meteor.js
description: "Curious about how a top Meteor app is scaling? Learn here..."
keywords:
  - meteor.js
  - mongodb
  - meteor performance
banner: "./images/kadira.jpg"
---

I've had some questions from my [Mastering Meteor.js](http://meteorjs.club/learn) students about Mongo performance and concerns around things like replica performance and data integrity. So I decided to turn to my good Meteor buddy, Arunoda, because I know he is running a pretty hefty Meteor site ([Kadira](https://kadira.io/)) that deals with large onslaught of data. Who better to ask, right?

### How does your current hosting setup work?

**Arunoda:** Our work load is pretty write heavy. We have one big mongo replica across linode and digital ocean with SSD. That replica is used for storing data that comes from the kadira package (from meteor apps and from browsers).

We also have a mongo app db hosted on Mongohq with oplog, which is used to power our app. We have 3 meteor nodes with two load balancers. We pre-aggregate data over time and that's why you can access data very fast on Kadira. We also use mongodb aggregation pipelines for adhoc data aggregations. 

Note: if you use a same db for both app data and incoming metric data there is an issue with Meteor and using Oplog. With oplog integration, every document you write into mongo comes to meteor app servers whether you need that data or not. We have 1000+ write per sec for metrics and nearly 1 write per sec for app data. The metric data updates would quickly overtake our app servers!

### Are you using a replica set for Mongo? Was it easy to setup for production?

**Arunoda:** Yes. It's a must. Setting is up can be pretty tricky with proper authentication and so on.
It's like a baby, you need to take care of the replica and monitor it to ensure it stays healthy. This is true wheather you host yourself or use a cloud mongodb service.

### Have you been dealing with performance issues caused by Mongo? How are you trying to handle those issues right now?

**Arunoda:** Yes we have, I think because of our data load and write-heavy usage. One issue is MongoDB's database level write-lock. Technically, there is not much we can do about the write-lock. We try to aggregate some data before sending to the DB and with that we can reduce our write load. But that's a temporary solution. Hopefully MongoDB 2.8 may/will comes with object level locking. We just aren't 100% sure it will be included or when that will come out, but we have hope!

### Have you dealt with any data loss issues?

**Arunoda:** No, we haven't had any reported data loss, nor have we seen any data loss ourselves.

### What are the big scaling challenges you've dealt with so far?

**Arunoda:** Definitely Mongo. It's a bit of a maintenance challenge. You need compact the db once few weeks and few other regular things.

Also, mongodb does not have compressions or data caching. Mongo stores a lot of data for keys rather than for actual values. see following example:

```
{
    _id: "id-1111",
    cpuUsage: 30,
    ram: 1005
}
```

So, actually we need to save 30 and 1005. But for every document, we store the both the key and the value as complete JSON and that's a storage cost.

Storage is pretty cheap now-a-days, but good SSD isn't.

### You recently told me you are thinking of moving to Cassandra, what are the big factors in making that decision? Will you build a reactive wrapper like Minimongo?

**Arunoda:** I think cassandra could be a good fit for our high write data load. We did some initial evaluations and things look pretty good. But we will lose all the querying/aggregation flexibility of Mongo if we move to cassandra. We are waiting bit for mongodb 2.8 and we are still experimenting with Cassandra too - with using some other tools like Spark.

Cassandra is a not a general purpose DB and there is no one right way to use it. Cassandra does not have built in realtime stuff. So, trying to work on realtime driver for cassandra would be a waste of time in my opinion.

### Valuable lessons

First I would like to thank Arunoda for taking the time to answer my questions. I think one of the most important pieces to glean from his answers is the fact that we don't have to be tied to a specific tool or data to build the entire app. He uses two mongo databases to collect stats, aggregate them, and then publish them into the second database for Meteor to work with.

In light of the recent 'FathomDB aquisition', we've already seen Justin release a Redis package and I think we will see even more coming from Justin in the next couple months. If Mongo worries you, do some exploring on Atmosphere.
