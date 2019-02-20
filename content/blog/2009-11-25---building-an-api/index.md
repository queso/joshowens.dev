---
title: "Building an api"
slug: "/building-an-api"
date: "2009-11-25T16:28:00.000Z"
featured: false
draft: false
tags:
  - developer advice
  - ruby
  - rails
description: "Building an API? Get some knowledge from my adventures..."
keywords:
  - developer advice
  - api structuring
  - api design
  - ruby on rails
banner: ""
---

Ever thought about building an api for your web app? Not sure where to
start, or perhaps the best practices for a rails app? This post will
explore some of the choices I made when building a new API for
[Change:Healthcare](https://www.changehealthcare.com/).

### Versioning

One of the key things I knew needed to happen was versioning. Having
used many other APIs before, un-versioned APIs like twitter can be very
frustrating. They require you to stay lock and step with the development
team, especially breaking API changes. I won’t go into the how too much,
I followed [John Barnette’s
advice](http://www.jbarnette.com/2009/04/07/http-apis.html).

Versioning covers a lot of pain points in deal with APIs, but it
definitely falls flat in a few spots. RESTifarians argue that using
versioning in your url means you break with strict RESTful routing and
principals. There is also the matter of just doing a straight copy from
one version to the next, it creates a lot of extra code to get that
versioned benefit.

### Encrypt for security

Another key concern when writing this API was to ensure passing
sensitive data was as secure as possible. We already require SSL for all
API interactions, but we needed to take it farther. We quickly settled
on a two way encryption scheme, using AES 256 Bit.

Why AES 256 bit? We wanted something well supported and well documented.
We use ruby to build our apps, but not everyone does. A quick search
turned up easy ways to deal with AES in Java, Php, etc. One other key
point to remember is to use **AES256-CBC**, as it requires a
initialization variable (ivar) to start the encryption and is more
secure than just using all 0’s to start encrypting all the blocks.

### Supporting JSON

The decision of what formats to support was left up to me, and I decided
we would start with JSON, as it is so easy to implement and support.
Since rails 2.3 switched to rack, it is very easy to switch out your own
Param Parser if you need it, but the built in one works nicely.

In some spots we used the built in .to\_json support for objects, and it
worked out very nice - we implemented some of those methods very
quickly. In other areas we needed custom output, so we wrote helpers to
take the object and output the strict JSON we needed. Note the use of
.to\_json in our helper method below - we used it to easily output
proper null when ruby had a nil piece of data.

### Write documentation

API adoption relies on a few different factors, but none of more
important than good documentation. Having worked with other APIs from
eBay, amazon, and twitter - it is easy to realize you can’t get started
without good docs. I made the decision to follow a format similar to
[twitter’s wiki documentation](http://apiwiki.twitter.com/) for their
API.

We really liked twitter’s inclusion of example return values and
[curl](http://curl.haxx.se/ "Curl is a command line tool to interact and/or download information on a website")
examples. The example return values are great because you can easily
copy and paste them into tests/fixtures/factories when writing your
tests. The curl examples are super helpful as well because you can
actually figure out how to play around with the API without writing a
single line of code.

### Bringing it all together

If you glean only one thing from this post, I hope it is that writing an
API should be something you put a real effort into. Don’t half ass it,
people will be able to tell. Spend the time to figure out your approach,
your input and output formats, and above all write documentation!

