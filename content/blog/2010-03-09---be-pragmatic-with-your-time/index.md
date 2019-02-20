---
title: "Be pragmatic with your time"
slug: "/be-pragmatic-with-your-time"
date: "2010-03-09T14:08:11.000Z"
featured: false
draft: false
tags:
  - developer advice
description: "Time is fleeting, learn how to best manage your time as a developer..."
keywords:
  - how to write code
  - developer advice
  - code workflow
banner: ""
---

So you’re trying to write that awesome new feature you’ve been chomping
at the bit for, right? Your gonna get it done and it’s gonna have so
many bells and whistles! Let’s say you give yourself two weeks to get it
done, but at the end of one week you realize you just can’t finish it in
one more week, right?

Been there, done that.

Here are a few things that I’ve found that really help keep me on track
and keep code flowing even when a feature seems so far away.

### Keep it simple (commit)

So I have this tendency to go off and work, work, work. Code changes
pile up until I finish a feature or a ticket and then I try to sort it
all out in the end with git diff and git add -p. This is bad, I wouldn’t
advise working this way. If you practice BDD, you should setup a
describe block with some tests, make them pass and then do a commit. In
the end, it will help you feel you are accomplishing things while making
things like a rebase much smoother. **Be atomic**.

### Hocus Focus

With so many distractions around today, it is a wonder people still get
work done. You know what I am talking about: email, IM, and twitter!
Maybe it is YouTube, gaming, or Huffington Post? Either way, I find I
work best when I have a *focus time*. I set aside 1 to 2 hours a couple
times a day in which I shutdown all distracting programs (ichat,
campfire, irc, email, twitter, etc) and make sure I really focus on the
tasks I need to do.

This focus time has really helped me increase the flow of code, and I
would recommend something similar, maybe even the pomordoro technique if
that is your thing. **Focus on coding**.

### Don’t work in a vacuum

I work on a team of four developers and it is very important that we
review each other’s code, discuss how to approach problems, and help out
with pair programming. We have a 2.5 week iteration cycle, and then
production is branched off from master, so that we can keep working on
master. It is important that we push code daily to ensure we can easily
work with each other.

The added benefit is that your topic branches will stay up to date with
master and you will minimize git conflicts. Pushing at least once a day
also adds to that snowball “accomplishment” effect as well. Feature or
bug not completely fixed? That’s ok, push what you have with passing
tests - then go back to being heads down for a few more hours. **Share
your progress**.

### Spec, spec, spec

I know this might sound goofy, but BDD really does work. Write your
failing spec and make it green. Writing your specs force you to think
about how your code works and what the interaction interfaces look like
- this means you have clear goals when you start to write actual code.

I had a friend IM me to ask how to write a non-database model and he
laughed when I told him to write specs for it. Don’t get me wrong, he
tests sometimes, but he wanted to spike this. I told him to start with
the tests, the DSL would write itself as he put tests together.

BDD is important because it makes you think about the code you write,
but it is also important as a bug finding tool. I found myself writing a
simple MVC stack the other day and I wrote the model specs to handle
some special update methods, lo and behold the specs uncovered a bug I
accounting for in my code. I wasn’t testing for that bug in particular,
nor was I coding to make sure it worked, but I still found it by having
those specs.

This one is really important. **Spec, spec, spec**.

### Thanks for the mem…

I know some of this may seem like common sense, but this stuff kind of
emerged when I started changing my patterns and habits to be more BDD
and more team oriented as a coder. This is new for me because despite
having worked in teams before, we always seemed to work separately.

If you glean nothing else from this article, please consider this:
**Spec first, it works. Commit early, commit often.**

