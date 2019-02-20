---
title: "Grow your app from seeds"
slug: "/grow-your-app-from-seeds"
date: "2010-03-29T14:51:47.000Z"
featured: false
draft: false
tags:
  - rails
description: "Developing a rails app and need some test data to get started?"
keywords:
  - database seed
  - seed data
  - ruby on rails
  - rails
banner: ""
---

Starting your app? Need some data? Larger amounts of data are an oft
overlooked part of interface design and flow. Most people consider tens
or hundreds of pieces of data in a design, but what about thousands or
hundreds of thousands of items? Do you need more than just pagination,
maybe a search interface?

We had these same issues with Tastyplanner ^[1](#footnote-1)^, we
exploded from hundreds of chefs and recipes to thousands of them almost
overnight.

### Planting your data

I’ve been helping out some local friends with some work lately, and one
of the things they wanted was a bunch of seed data that gets loaded
based on the environments. A rake seed task was added in Rails
2.3 ^[2](#footnote-2)^. The rake task loads up db/seeds.rb, which you
can coerce to do whatever you want.

### Feed it with [ENV]

Our approach to the problem was simple - use yaml and csv files to load
up the data. Here is what we started with:

This takes any files in the based of db/seed that ends in .yml or .csv
and loads them up as fixtures and pushes them into the database. That is
great but it doesn’t cover the environment based loading. With a few
quick mods, here is what we came up with:

Voila! Now all data in db/seed/\* is loaded for all environments, but
db/seed/production and db/seed/development will only load for their
respective environments!

### Pour on a little MODEL

Now, I am sure you are thinking, “Where are you getting all this data”?
From the models and database, of course! I am sure I could have used
some gross looking database query to export a csv file for me, but we’re
rubyist! I fired up a quick rake task to take MODEL and FILE arguments
and output a csv file from the models table. Here is the finished task:

### Watch it all grow with some Faker

I can see that last thought brewing in your head, “Where did the data
come from? Surely you weren’t typing in 500-1000 rows of data?”. Indeed,
you would be correct, we didn’t type it all in. We used the Faker gem
and just good ole’ script/console with some copy/paste action. Here is
an example:

One important note, when you use rand(\#) be sure to add + 1 unless you
want a zero returned.

### Put it all together

Putting all this code together in the right sequence will have you
ending up with a database full of fake people, a seed directory full of
csv files, and a loaded app ready for your designers and UI experts.

*Links*

[[1] Tastyplanner](http://tastyplanner.com) \
[[2] Rails 2.3
Commit](http://github.com/rails/rails/commit/4932f7b38f72104819022abca0c952ba6f9888cb)

