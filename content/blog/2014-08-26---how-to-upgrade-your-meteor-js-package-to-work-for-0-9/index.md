---
title: "How to upgrade your Meteor.js package to work for 0.9"
slug: "/how-to-upgrade-your-meteor-js-package-to-work-for-0-9"
date: "2014-08-27T03:40:51.455Z"
featured: false
draft: false
tags:
  - meteor.js
description: "Want to write your first meteor package? Learn how here..."
keywords:
  - meteor.js
  - meteor package
  - atmophere
banner: "./images/atmosphere-1.jpg"
---

I've written a few packages, as you may know: [accounts-entry](https://github.com/Differential/accounts-entry), [shareIt](https://github.com/Differential/shareit), [simple-form](https://github.com/Differential/simple-form), etc. Within a few hours of 0.9 coming out today, I had github issues asking me to update those packages. I found some instructions scattered amongst hackpad documents, so I wanted to gather the steps I took to update accounts-entry to work with Meteor.js 0.9.

### Declare your new metadata

In the package.js file, you need to add some metadata in the Package.describe block:

```javascript
 Package.describe({
     summary: "Make signin and signout their own pages with routes.",
     version: '0.9.0',
     name: "joshowens:accounts-entry",
     git: 'https://github.com/Differential/accounts-entry'
 });
```
So you just need to add the keys; version, name, and git. Pretty easy step.

### Migrate your dependencies to package.js

Here is the old smart.json

```json
  "packages": {
    "iron-router": "0.8.2",
    "accounts-t9n": "0.0.5",
    "simple-form": ""
  }
```

So we need to add an api.versionsFrom to tell Meteor.js what version of the platform we are compatible with. We also need to add an api.use call that name the external package dependencies and the versions we need to depend on.

```javascript
Package.onUse(function(api) {
	api.versionsFrom("METEOR@0.9.0");
	api.use(['iron:router@0.9.1', 'mrt:accounts-t9n@0.0.13', 'joshowens:simple-form@0.1.8'],['client', 'server']);

```

Also, make sure you remove the old api.use calls for those packages. While you are on the onUse section, you should also change under add_files and on_use calls to be camelCased.

### Last but not least, publish your package.

The last step you need to publish your package is actually pretty simple. Just do a `meteor publish` if you package already existed. If it is a new package just `meteor publish --create` and it will create the package on the build server. The process will take a minute or two, but it builds a versions.json file that has your dependency tree in it.
