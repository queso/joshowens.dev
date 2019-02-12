---
title: "Environment Settings and Security with Meteor.js"
slug: "/environment-settings-and-security-with-meteor-js"
date: "2015-02-25T20:51:29.013Z"
featured: false
draft: false
tags:
  - security
  - meteor.js
description: "Security of a meteor app is important. Is your app secure?"
keywords:
  - security
  - meteor.js
banner: "./images/security-settings-header.jpg"
---

The other day a curious conversation popped up in the Meteor.js Club chat room about how to handle different Stripe keys based on environment. The conversation puzzled me because Meteor settings should be set by the environment and you shouldn't need if/else statements around your settings to detect the environment. So what are these settings I keep talking about?

![meme-s3-keys](./images/security-keys-meme.jpg)

**TL;DR: don't check your settings files, especially production, into your repo. Also, don't put keys in code, put them in settings files!**

`Meteor.settings` is an [easy way for us to customize certain variables inside our code](http://docs.meteor.com/#/full/meteor_settings) to be controlled externally by our environment. This is a great way to set up things like S3 Keys for different environments, or stripe keys that run in test mode for development and staging environments, but live keys for production. You can even set things like Twitter API keys, Google API keys, etc. There are numerous reasons to have multiple keys to a service, maybe something like Twitter has an API rate limit and you don't want to use your production limits when you are messing around locally in development.

## How do I set these Meteor.settings?

It is actually pretty simple, but not talked about a lot. You can create a settings.json file and do a `meteor run --settings settings.json`. Just make a quick JSON block to set these. If you put anything under a key called `"public"`, then it will be made available to both the client and the server - anything else not under public is only made available to the server. The other way to get these settings into your application is to set the `METEOR_SETTINGS` as an environment variable for your running Meteor process - this is the recommended way to handle staging and production settings. Just do `METEOR_SETTINGS={"public": {"key": "ABC"}} meteor run` or some such.

Here is an example I took from an actual application:

```
{
  "awsBucket": "my-example-staging",
  "awsAccessKeyId": "AABBCCddEEff12123131",
  "awsSecretKey": "AABBCCddEEff12123131+AABBCCddEEff12123131",
  "public": {
    "awsBucketUrl": "https://my-meteor-example.s3.amazonaws.com",
    "environment": "staging"
  },
  "googleApiKey": "AABBCCddEEff12123131"
}
```

Now that we have some settings, we can easily use them in our application. It is a simple matter of just saying `Meteor.settings.public.awsBucketUrl` or `Meteor.settings.awsBucket` to get access to these keys or variables. 

## I don't get the per environment thing still?

The Meteor Club member I was chatting with had a setting for stagingStripePublishableKey and productionStripePublishableKey and had an if statement wrapped around it to determine the environment:

```
{{#if production}}
  {{Meteor.settings.public.productionStripePublishableKey}}
{{else}}
  {{Meteor.settings.public.stagingStripePublishableKey}}
{{/if}}

```

The smarter way to do it is to use a `stripePublishableKey` and just provide the settings per environment using the file or the environment variable:

```
{{Meteor.settings.public.stripePublishableKey}}
```

No if statement needed if we do that! By using the same key and changing the settings at runtime, we can remove the if statement and just rely on the one variable to always have the right setting for us. That makes our code less complicated, easier to read, and more configurable at the command line.

## But what does this have to do with security?

Let's pretend you created a settings.development.json and settings.production.json file, and check them both into your code. It is likely ok to check in your development settings as they will be limited or restricted and something you want to share. Your production settings on the other hand, isn't something you want checked in to your repo.
	
Keys for stripe or s3 exist as a way for you to gain access to services and conduct transactions remotely, but securely. It is important to conduct these transactions against your account and data, so we use keys to accomplish that. What happens if your Stripe key leaks out? Meh, no big deal, right? WRONG. You keys could be used to issue [bank transfers to other people](https://stripe.com/docs/tutorials/sending-transfers), without your knowledge.

Maybe this sounds far fetched, right? I mean, you put your code in a private Github repo and you have a small team of two working against the code... What is the harm in checking in the keys? Let's talk about the circle of trust you are starting to create - so far it is a circle involving three parties, you, your teammate, and Github. When I say Github, I mean the whole organization - what happens if someone forgets to patch a server against heartbleed? But for this topic, let's just assume Github is infallible and very good at security. Do you use Travis-CI or Codeship? Maybe you use CodeClimate for your project? You've now extended the circle of trust to include 1 or 2 more parties - how secure are they? Let's even stop pondering sharing with people you've trusted... What happens when your teammate has Superfish installed and browses Github directly? Guess what, you just potentially leaked those keys.

Don't think hackers are looking for keys anywhere they can find them? [Think again](http://www.programmableweb.com/news/why-exposed-api-keys-and-sensitive-data-are-growing-cause-concern/analysis/2015/01/05), I've had a friend that had his AWS keys found and used to spin up bitcoin miners to the tune of 10k! Even Amazon is getting smarter about it, they saw I had checked some s3 keys into an open source project and disabled the keys and emailed me to fix it.

## Oops, I committed keys, now what?

Ok, so we've all made mistakes before, I just told you I checked in a s3 key with my code. How do you fix this? Well, you could try to scrub your git history and the key out of it, but that actually sounds like a horrible process for anyone with Git access - on top of that, the key is likely still compromised and in the hands of a hacker who runs a script against various repos. Instead, take a few minutes to login to the service who gave you the key and see if you can revoke that key and reissue a brand new one. These steps ensures optimal security in this case.

## Still not convinced?

Ok, I will point out two things to you to help convince you now.

1. Go look at this [Github search for S3 keys](https://github.com/search?utf8=%E2%9C%93&q=awsSecretKey%3D&type=Code&ref=searchresults)
2. Github is trying to combat some of [this issue with, using code](https://github.com/blog/1956-keeping-github-oauth-tokens-safe)!

Let's all try to work smarter so Github and Amazon don't have to work harder - I would much rather see Github spent time on other things beside these safety rails they are building for developers new to security and production.
