---
title: "Fun with ActiveRecord"
slug: "/fun-with-activerecord"
date: "2010-02-16T17:53:24.000Z"
featured: false
draft: false
tags:
  - rails
description: "Learn how to leverage activerecord to your advantage in your rails app"
keywords:
  - rails
  - activerecord
---

Recently, I’ve been working on a medical provider (doctors, pharamcies,
hospitals) matching system at
[change:healthcare](https://www.changehealthcare.com). We have a
clean/pristine medical provider table, but we have claims from insurance
companies that don’t match up right. Most of the unmatched claims come
from mis-spellings, mis-matched unique identifiers, or other small
typos. By matching the claim to a provider in our table, we can then use
the claim in our average cost and our savings calculations.

Currently this is being done by hand, we export a SQL query to CSV file
and distribute that to a team of people to manually try to match through
a simple search interface that already exists on the site. The goal is
to make this less manual by offering an “admin area” where the team of
people can view these unmatched claims, then click one and see
suggestions for matches from our provider table. While this is still a
manual process, it is much less time intensive and it also provides the
first step towards possible automation in the future.

Let’s take a look at some of the difficulties I’ve had to address while
work on this new feature:

### Unions

The original SQL query I was given consisted of three UNION select
statements, the most complex one containing GROUP BY and HAVING in the
query. My original goal was to break the UNION statements into named
scopes joined by OR statements. We already had
[searchlogic](http://rdoc.info/projects/binarylogic/searchlogic) plugin
installed so we went with that, it supports using OR for named scopes.

My approach was to break the three select queries into individual
queries and run a count on the results. I then created the three named
scopes and ran each of those and compared the counts. Everything was
perfect! I was pretty excited… Until I joined them all with the OR
statements. It turns out when you use a named scope and OR, the GROUP BY
and HAVING statements apply to the whole query, not just the one part.
The counts were off.

So I went back to the drawing board, but I had new information in hand,
the queries were taking WAY to long to run during a normal web request
cycle, on my small dataset the UNION took 50+ seconds and the OR
statement took around 45 seconds.

### Caching long queries

The new approach was shaping up using find\_by\_sql and we would run it
nightly via cron to fill up a new table that housed all the unmatched
medical providers and the medical claims they came from. By creating a
separate table and model to fill, it allowed us to add database indexes
and nice named scopes.

Pre-caching into a regular model also allowed us to create a “normal”
controller to interact with our unmatched providers. The benefit with
that is we quickly built out the easy actions/views so we could focus on
search and the match making.

### Locking

The last key concern was to avoid double working. Medical Provider
matching is mostly done in an automated fashion, but some of the data is
so mangled that we have to manually match the rest. It is a whole team
effort and it is dreaded by most in the office, so we wanted to make
sure the list of unmatched providers we show you is a list you can work
on. The intended idea was to use pessimistic locking and SELECT FOR
UPDATE to ensure we didn’t show an unmatched provider in the index if
someone was working on it.

That didn’t work like we wanted. We still kept the SELECT FOR UPDATE on
the edit query to ensure integrity, but we also added an in\_use
timestamp and a named scope (not\_in\_use, I know, real original) to
ensure we don’t show any records that are being matched up by someone
else.

### Know your tools

I think the great part about working on a more out of the box feature
like this is that you get to explore different ideas and try new things,
ultimately learning how to use everyday tools better. This is only my
second time using locking, and I had no idea that mysql didn’t offer a
row level lock that stopped reads from happening.

