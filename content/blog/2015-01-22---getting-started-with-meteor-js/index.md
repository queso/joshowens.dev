---
title: "Getting started with Meteor.js"
slug: "/getting-started-with-meteor-js"
date: "2015-01-22T19:27:02.454Z"
featured: false
draft: false
tags:
  - developer advice
  - meteor.js
description: "A great list for getting started with Meteor.js"
keywords:
  - getting started
banner: ""
---

Below is a guest post from [Ben Strahan](https://twitter.com/_benstr), a meteor.js club member. He put together a great post and I really wanted to share it with the whole Meteor.js Club!


## How do I become a web app developer - *Meteor style*

What does an aspiring web developer need to know to develop a [Meteor](http://meteor.com) app? Below is a list of languages, frameworks, libraries, packages & more ;) . 

The lists that follow are purposely ordered, unless noted. This article does not explain why you need to learn each item (that is up to you to figure out). Instead this article's purpose is to provide a quick roadmap or "thousand mile" view of the technologies a Meteor Dev works with daily. 

When you are in the weeds of learning new things it feels good knowing you have a map to reference and measure your progress against.

![nemo's escape](./images/now-what.gif)

## Languages, Libraries & Frameworks, oh my!

Ultimately you need to be able to understand [Meteor's API](http://docs.meteor.com/#/full/). Getting a grasp of the technologies listed below will give you what you need. There is no need to become an expert yet but you need to understand the structure and terminology of each.

Don't know what an API is? [Check out this dude's video](https://www.youtube.com/watch?v=QSUnBPv4iQ0)

### Required

1.  [Javascript](http://www.codecademy.com/en/tracks/javascript) - JS first?! Yes soldier, don't question me again or I will karate chop you!
-	[Shell (Terminal)](http://linuxcommand.org/learning_the_shell.php)
-   [HTML & CSS](http://www.codecademy.com/tracks/web)
-   [JSON](http://en.wikipedia.org/wiki/JSON)
-   [MongoDB](http://www.mongodb.org/)
-   [Handlebars](http://handlebarsjs.com/)
-   [Git](https://www.youtube.com/playlist?list=PLg7s6cbtAD15G8lNyoaYDuKZSKyJrgwB-) & [GitHub](https://guides.github.com/)
-   [jQuery](http://www.codecademy.com/en/tracks/jquery)
-	[LESS](http://lesscss.org/), [SASS](http://sass-lang.com/), and/or [Stylus](http://learnboost.github.io/stylus/)
-	[Underscore](http://underscorejs.org/) and/or [Lo-Dash](https://lodash.com/)
-	[Bootstrap](http://getbootstrap.com/) 

### Optional (learn when needed)

1.	[NodeJS](http://nodejs.org/)
-	[Cordova](http://cordova.apache.org/)
-	[ElasticSearch](http://www.elasticsearch.org/)
-	[Ionic](http://ionicframework.com/) - Meteor Package [Meteoric](http://meteoric.github.io/)

## MeteorJS

Now that you know the above you are deemed worthy to tap into the **power** and awesomeness of Meteor! 

![meteor powered lawnmower](./images/lawnmower.gif)

Why did you need to learn ALL that stuff above before touching Meteor? Because Meteor is considered a [Full-Stack](https://www.youtube.com/watch?v=nMtgFZSdtwk) platform. Through Meteor you manage the front-end, back-end and all the other ends. 

...Okay no more question, lets learn MORE! 

Time to become a Meteor nerd, review the docs.

- [Main API Documentation](http://docs.meteor.com/#/full/)
- [Sub-Projects](https://www.meteor.com/projects)

If the sub-projects look intimidating don't worry. At a minimum below are the key packages in the sub-projects you need to know.

1.	[Blaze](https://atmospherejs.com/meteor/blaze)
-	[Spacebars](https://atmospherejs.com/meteor/spacebars)
-	[Tracker](https://atmospherejs.com/meteor/tracker)
-	[Utilities](https://www.meteor.com/utilities)


### Good Meteor Tutorials & Courses

Ordered by difficulty & depth. These tutorials, courses, books & videos will walk you through various Meteor projects. Everything you learned above will culminate.   

1. [Meteor's official tutorial](https://www.meteor.com/install) (**FREE**)
- [Your First Meteor Application](http://meteortips.com/) by David Turnbull (**FREE**)
- [Meteor Walkthrough Videos](https://www.youtube.com/channel/UC4-DIsbr23Z-rPe_F4JAH9w) by George McKnight (**FREE**)
- [Meteor Cookbook](https://github.com/awatson1978/meteor-cookbook) by Abigail Watson
- [Discover Meteor](https://www.discovermeteor.com/) by Sacha Greif & Tom Coleman (**$ to $$**)
- [Meteor in Action](http://www.manning.com/hochhaus/) by Manuel Schoebel & Stephan Hochhaus (**$**)
- [8 Days of Meteor](http://8daysofmeteor.com/) by Josh Owens (**$**)
- [Meteor Testing](http://www.meteortesting.com/) by Sam Hatoum (**$**)
- [Meteor Club Master Bootcamp](http://meteorjs.club/learn) by Josh Owens (**$$$**)
- [Meteor Club Testing Bootcamp](http://meteorjs.club/testing-meteorjs) by Josh Owens & Sam Hatoum (**$$$**)
- [Bulletproof Meteor](https://bulletproofmeteor.com) by Arunoda Susiripala (**FREE to $$**)
- Advance courses at [Evented Mind](https://www.eventedmind.com/) by Chris Mather (**$$**)


## Meteor Packages (no order)

Yes there is even more to learn. Meteor has a package manager called [Atmosphere](https://atmospherejs.com/) which allows the community to build packages that deeply integrate into the Meteor platform and expands the APIs available to you, the developer. Below is a list of the standard packages you will find in almost every serious Meteor app so you should get to know them.


<table>
<thead>
<tr>
<th align="left">Package Name</th>
<th align="center">GitHub</th>
<th align="center">Atmosphere</th>
<th align="center">Website</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">accounts-password</td>
<td align="center"><a href="https://github.com/meteor/meteor/tree/devel/packages/accounts-password" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/meteor/accounts-password" rel="noreferrer">atmosphere</a></td>
<td align="center"><a href="http://docs.meteor.com/#/full/accounts_api" rel="noreferrer">website</a></td>
</tr>
<tr>
<td align="left">useraccounts:core</td>
<td align="center"><a href="https://github.com/meteor-useraccounts/core" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/useraccounts" rel="noreferrer">atmosphere</a></td>
<td align="center"><a href="http://useraccounts.meteor.com/" rel="noreferrer">website</a></td>
</tr>
<tr>
<td align="left">reactive-var</td>
<td align="center"></td>
<td align="center"><a href="https://atmospherejs.com/meteor/reactive-var" rel="noreferrer">atmosphere</a></td>
<td align="center"><a href="http://docs.meteor.com/#/full/reactivevar" rel="noreferrer">website</a></td>
</tr>
<tr>
<td align="left">reactive-dict</td>
<td align="center"></td>
<td align="center"><a href="https://atmospherejs.com/meteor/reactive-dict" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">iron:router</td>
<td align="center"><a href="https://github.com/eventedmind/iron-router/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/iron/router" rel="noreferrer">atmosphere</a></td>
<td align="center">
<a href="https://github.com/EventedMind/iron-router/blob/devel/Guide.md" rel="noreferrer">guide</a>  <a href="http://eventedmind.github.io/iron-router/" rel="noreferrer">website</a>
</td>
</tr>
<tr>
<td align="left">zimme:iron-router-active</td>
<td align="center"><a href="https://github.com/zimme/meteor-iron-router-active" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/zimme/iron-router-active" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">zimme:iron-router-auth</td>
<td align="center"><a href="https://github.com/zimme/meteor-iron-router-auth/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/zimme/iron-router-auth" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">manuelschoebel:ms-seo</td>
<td align="center"><a href="https://github.com/DerMambo/ms-seo" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/manuelschoebel/ms-seo" rel="noreferrer">atmosphere</a></td>
<td align="center"><a href="http://www.manuel-schoebel.com/blog/meteor-and-seo" rel="noreferrer">article</a></td>
</tr>
<tr>
<td align="left">dburles:collection-helpers</td>
<td align="center"><a href="https://github.com/dburles/meteor-collection-helpers/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/dburles/collection-helpers" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">matb33:collection-hooks</td>
<td align="center"><a href="https://github.com/matb33/meteor-collection-hooks" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/matb33/collection-hooks" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">reywood:publish-composite</td>
<td align="center"><a href="https://github.com/englue/meteor-publish-composite/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/reywood/publish-composite" rel="noreferrer">atmosphere</a></td>
<td align="center"><a href="http://braindump.io/meteor/2014/09/12/publishing-reactive-joins-in-meteor.html" rel="noreferrer">website</a></td>
</tr>
<tr>
<td align="left">ongoworks:security</td>
<td align="center"><a href="https://github.com/ongoworks/meteor-security/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/ongoworks/security" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">alanning:roles</td>
<td align="center"><a href="https://github.com/alanning/meteor-roles/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/alanning/roles" rel="noreferrer">atmosphere</a></td>
<td align="center"><a href="http://alanning.github.io/meteor-roles/classes/Roles.html" rel="noreferrer">website</a></td>
</tr>
<tr>
<td align="left">aldeed:autoform</td>
<td align="center"><a href="https://github.com/aldeed/meteor-autoform/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/aldeed/autoform" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">aldeed:collection2</td>
<td align="center"><a href="https://github.com/aldeed/meteor-collection2/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/aldeed/collection2" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">aldeed:simple-schema</td>
<td align="center"><a href="https://github.com/aldeed/meteor-simple-schema/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/aldeed/simple-schema" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">momentjs:moment</td>
<td align="center"><a href="https://github.com/moment/moment/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/momentjs/moment" rel="noreferrer">atmosphere</a></td>
<td align="center"><a href="http://momentjs.com/" rel="noreferrer">website</a></td>
</tr>
<tr>
<td align="left">matteodem:easy-search</td>
<td align="center"><a href="https://github.com/matteodem/meteor-easy-search/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/matteodem/easy-search" rel="noreferrer">atmosphere</a></td>
<td align="center"><a href="https://github.com/matteodem/meteor-easy-search/wiki" rel="noreferrer">website</a></td>
</tr>
<tr>
<td align="left">matteodem:server-session</td>
<td align="center"><a href="https://github.com/matteodem/meteor-server-session/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/matteodem/server-session" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">meteorhacks:kadira</td>
<td align="center"><a href="https://github.com/meteorhacks/kadira/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/meteorhacks/kadira" rel="noreferrer">atmosphere</a></td>
<td align="center"><a href="https://kadira.io/" rel="noreferrer">website</a></td>
</tr>
<tr>
<td align="left">meteorhacks:aggregate</td>
<td align="center"><a href="https://github.com/meteorhacks/meteor-aggregate/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/meteorhacks/aggregate" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">meteorhacks:fast-render</td>
<td align="center"><a href="https://github.com/meteorhacks/fast-render/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/meteorhacks/fast-render" rel="noreferrer">atmosphere</a></td>
<td align="center"><a href="https://meteorhacks.com/introducing-fast-render.html" rel="noreferrer">website</a></td>
</tr>
<tr>
<td align="left">meteorhacks:subs-manager</td>
<td align="center"><a href="https://github.com/meteorhacks/subs-manager/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/meteorhacks/subs-manager" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">meteorhacks:unblock</td>
<td align="center"><a href="https://github.com/meteorhacks/unblock/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/meteorhacks/unblock" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">raix:handlebar-helpers</td>
<td align="center"><a href="https://github.com/raix/Meteor-handlebar-helpers" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/raix/handlebar-helpers" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">yogiben:helpers</td>
<td align="center"><a href="https://github.com/yogiben/meteor-helpers" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/yogiben/user-helpers" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">zimme:collection-softremovable</td>
<td align="center"><a href="https://github.com/zimme/meteor-collection-softremovable" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/zimme/collection-softremovable" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">zimme:collection-timestampable</td>
<td align="center"><a href="https://github.com/zimme/meteor-collection-timestampable/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/zimme/collection-timestampable" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">u2622:persistent-session</td>
<td align="center"><a href="https://github.com/okgrow/meteor-persistent-session/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/u2622/persistent-session" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">tmeasday:publish-counts</td>
<td align="center"><a href="https://github.com/percolatestudio/publish-counts/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/tmeasday/publish-counts" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">percolatestudio:synced-cron</td>
<td align="center"><a href="https://github.com/percolatestudio/meteor-synced-cron/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/percolatestudio/synced-cron" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">dburles:factory</td>
<td align="center"><a href="https://github.com/percolatestudio/meteor-factory/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/dburles/factory" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
<tr>
<td align="left">anti:fake</td>
<td align="center"><a href="https://github.com/anticoders/meteor-fake/" rel="noreferrer">github</a></td>
<td align="center"><a href="https://atmospherejs.com/anti/fake" rel="noreferrer">atmosphere</a></td>
<td align="center"></td>
</tr>
</tbody>
</table>

## The rabbit hole goes deeper...

Wow, you must really be committed if you got this far. Ok, so you want my super secret lists? 

### Service Providers

When you go to deploy your app online there are a huge amount of service providers available to a developer. Below are a few that specifically serve the Meteor community (and do a great job) so I decided to give them a shout.

- [Kadira](https://kadira.io) - Performance Tracking
- [Modulus](https://modulus.io) - Hosting (Use code 'Metpodcast' to get a $25 credit)
- [Compose](https://compose.io) - Mongo Database Hosting with Oplog

### Blogs, Vlogs, News & more (no order)

Come drink the Meteor cool-aid with me... look we won't be alone.

- [Crater.io](http://crater.io/) - News Aggregate
- [Meteor Weekly](https://meteorhacks.com/meteor-weekly/) - News Aggregate
- [Meteor's Official Blog](https://www.meteor.com/blog) - Blog
- [Josh Owens](http://joshowens.me/) - Blog
- [Discover Meteor](https://www.discovermeteor.com/blog) - Blog
- [The Meteor Chef](http://themeteorchef.com) - Blog
- [Differential](http://differential.com/blog) - Blog
- [Gentlenode](https://gentlenode.com/journal/meteor) - Blog
- [MeteorHacks](https://meteorhacks.com/) - Blog
- [Meteor Tips](http://meteortips.com/blog/) - Blog
- [PEM](http://pem-musing.blogspot.com/) - Blog
- [Manuel Schoebel](http://www.manuel-schoebel.com/blog) - Blog
- [Practical Meteor](http://practicalmeteor.com/) - Blog
- [Lukasz Kups](http://lukaszkups.net/notes/) - Blog
- [David Burles](http://meteorcapture.com/) - Blog
- [David Weldon](http://dweldon.silvrback.com) - Blog
- [The Meteor Podcast](http://www.meteorpodcast.com/) - Podcast
- [Meteor Devshops](https://www.youtube.com/user/MeteorVideos) - YouTube
- [Josh Owens](https://www.youtube.com/channel/UCjRSH4MO9CR40bJQxfZMFWQ?spfreload=10) - YouTube
- [George McKnight](https://www.youtube.com/channel/UC4-DIsbr23Z-rPe_F4JAH9w) - YouTube
- [Arunoda Susiripala](https://www.youtube.com/channel/UC6ABSyRbYDjvn87xexjreNQ) - YouTube
- [David Turnball](https://www.youtube.com/channel/UCgdL1Nsxd9Dv7wig8F06R0Q) - YouTube
- [Sasi Kanth](https://www.youtube.com/channel/UCuK5KMmdJgMiPI733DOKauw) - YouTube
- [Vianney Lecroart](https://medium.com/@acemtp) - Medium
- [Space Camp](https://medium.com/space-camp) - Medium
- [Dominus](https://medium.com/@Dominus) - Medium
- [Arunoda Susiripala](https://medium.com/@arunoda) - Medium
- [Sacha Greif](https://medium.com/@sachagreif) - Medium
- [Paul van Zyl](https://medium.com/@pushplaybang) - Medium

If I forgot someone let me ([@_benstr](https://twitter.com/_benstr)) or [@joshowens](https://twitter.com/joshowens) know

### Other articles like this one

- [Best Learning Resources for Meteor.js](https://www.yauh.de/best-learning-resources-for-meteorjs/) by Stephan Hochhaus
- [Learn Meteor.js Properly](http://javascriptissexy.com/learn-meteor-js-properly/) by Richard ?
