---
title: "Adding comments to your Meteor.js app"
slug: "/adding-comments-to-your-meteor-js-app"
date: "2014-12-05T15:58:12.280Z"
featured: false
draft: false
tags:
  - meteor.js
description: "Quickly add comments to your meteor app"
keywords:
  - meteor.js
  - comments
banner: "./images/comment-cover.jpg"
---

A Meteor.js club member asked about an easy way to add comments to a 'Meteor page', so I wanted to go over a fun way to do a join lookup off an Iron Router param. I am going share some code I wrote to demonstrate this technique, but understand it isn't tested or put into production.

![meteor.js-join-meme](./images/joined-data-meme.jpg)

### Couldn't you just add <insert comment service here>?

Sure, we could just add disqus, but then you wouldn't own your data, right? It is pretty easy, we can just add a rendered function on the body and it will insert the js code we need:

````js

Template.body.rendered = function() {
  var disqus_shortname = 'disqus_shortname'; // required: replace example with your forum shortname

  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}

````

This will attach the disqus javascript to the DOM and render in the comment forms at the bottom of the page. Just make sure you add a `<div id="disqus_thread"></div>` html snippet to your page somewhere.

### No. There is another.

Let's build our own comment system. First the comment collection:


```js
// collections/comments.js

Comments = new Mongo.Collection('comments');
```

So let's say we have a template called post and it iterates over comments and then will render in a template called comment. The data context from each will be applied to the comment template for each comment we have. Here is the code:

```js
// client/post.html

<template name="post">
	{{#each comments}}
		{{> comment}}
	{{/each}}
</template>
```

Now we can wire up the Iron-Router route. We start by having two subscriptions, notice they both run off the post id in the url. Then we set the data context to include both a post and comments, so our template has what it needs:

```js
// lib/router.js

Router.map(function () {
  this.route('post/:id', {
  	waitOn: function() {
    	return [
    		Meteor.subscribe('post', this.params.id),
    		Meteor.subscribe('postComments', this.params.id)
    	]
  	},

  	data: function() {
		return {
			post: Posts.findOne({_id: this.params.id}),
			comments: Comments.find({postId: this.params.id})
		}
  	}
  });
});
```

The last thing left to do is wiring up the publication to give us the comment data, which is found off the postId as the joining key between these two collections (post and comments):

```js
// server/publications.js

Meteor.publish('postComments', function(postId) {
	return Comments.find({postId: postId});
});
```

Since we are passing an id in as our key from the url, we can use that to drive both the post and postComment publication/subscription and get the data we want back.

What would happen if we passed a nice url slug instead?

```js
// server/publications.js

Meteor.publish('postComments', function(slug) {
	post = Post.findOne({slug: slug});
	return Comments.find({postId: post._id});
});
```

Notice that we look up the post by slug and then use the id from the post lookup to find the comments. Because we have wired the slug to come from the url itself, are publication is still reactive. Keep in mind if you run a subquery off something like an array of ids, you may run into reactivity issues down the road.

### Multiple choice(s)

While you have many options for adding a comment system to your meteor.js app, I think these are two strong options. The key point I wanted to drive home is that you can use params from Iron-router to drive multiple subscriptions of joined data.
