---
title: 'Changing code culture'
slug: '/changing-code-culture-in-your-company'
date: '2019-06-05T08:04:18.540Z'
featured: false
draft: false
tags:
  - developer advice
description: 'Sometimes you want to improve your working environment, try these ideas to get started...'
keywords:
  - code culture
banner: ''
---

What is 'code culture'? I view it as the practices we do around and in our code, the established standards that a team has agreed to work within. I've gleaned some wisdom after being on many development teams at startups, dev shops, and enterprises. More specifically, I've spent the last 3 years of my life at a Fortune 50 company, and I want to share some of the ways I've found to change code culture for the better.

## Cross-team code reviews

Cross-team code reviews were a fun experiment we tried for 5 or 6 meetings. The meeting revolved around the idea of having people outside your team watching as you explain code related to a feature. We would pick a developer to 'present' the code and walk us through the code on a big screen while explaining it. We would have 3-6 other devs in the room from other teams. The other devs would ask questions, give opinions, and offer suggestions on how their team might change or improve the code.

It turns out that this is a great way to promote learning and inter-team growth within a larger organization. Several teams walked away from these cross team code reviews with significant bits to refactor. Refactors like changing how API data is fetched, or writing React components without 'prop drilling'. These meetings also led to cross team pairing. This pair focused on defining code boundaries better between the two teams. It also led to consistent API data shapes and caching the data.

Positive Outcomes: Teams started working across code bases instead of within them, and we started to establish standards across many teams instead of within one team.

Things to watch out for: We ended up getting thrown off track due to unconstructive criticism. If you are interested in cross-team code review, I recommend establishing guidelines on constructive criticism. Being constructive can ensure people leave the meeting without feeling attacked.

## Code Review Club

Code Review Club is one of my favorites, but that shouldn't be surprising because I came up with the idea 😆. I'm not a big fan of Java; it turns out that I am a fan of Kotlin, however. I heard whisperings that a backend services team had started writing their service in Kotlin - I was intrigued. After talking with my current team, we decided it would be fun to learn and maybe try to move our service to Kotlin too. So we began a study group, we used Exercism.io to power the format of this group.

Everyone set up an Exercism account and joined the Kotlin team. I then assigned two exercises a week for us to complete on our own. Exercism offers over 100 exercises that come with a failing test suite for you to build code by making the tests pass. These are focused challenges that help you learn language features in an easy to digest way. Once the two exercises were complete and submitted, we would meet every two weeks to review those solutions together. Reviewing solutions is where things got interesting...

When we met, I brought up the solutions on the big screen; I made each person walk us through the code and explain what it was doing. As each person showed off their solution, we started to see that some did it 'the kotlin way' and others didn't. As readers of code, we started getting faster at understanding other people's code on the screen. As writers of code, we started to get better at explaining our code to others. As a group, we started to form opinions on what we liked or didn't like in the ways to write Kotlin code. People had fun doing this. Word spread.

At the end of this particular cycle of Code Review Club, we had grown from 4 people to 30+ people from many teams. Discussions around solutions shown on screen were illuminating on how to write great Kotlin code. People also started sharing about how they were writing their services in Kotlin, and other teams got interested in doing that. The organization started organically, moving to Kotlin for backend services.

Positive outcomes: People got better at reading code, explaining the code, and the organization started moving towards Kotlin.

Things to watch out for: Check with a manager and make sure they are ok with this type of meeting. The management may not want to push switching technology.

## Weekly team huddles

If you want to push a team to function well, give them time and space to meet weekly. The team can talk about what is going on in the code base. I move around from team to team every 6 months, so I've seen this particular type of meeting both fail and succeed.

The point of this activity is to gather a team of devs and give them time to talk. Time to discuss standards they want to set up, practices they want to follow and do actual whole team code reviews. I've used this meeting to talk about things like; how to rebase with git, how to do a constructive code review for a pull request, and we've conducted live code reviews as a whole team. We also use this time to talk about tech debt and how we want to approach removing that tech debt. This meeting is where ideas are planted, and they continue to grow in the developers' minds as they leave the room and go about work for the rest of the week. On one team, these meetings led to us create a new PR approval process, a new npm release process, and a11y testing in the pipeline.

Positive outcomes: Teams have time to discover and remove tech debt. Code quality went up in ways that we measured in the pipeline.

Things to watch out for: Make sure you establish ground rules on not talking over people. We also had a rule that you needed to come prepared for things you want to bring up.

## TLDR

In looking over these ideas I've tried, I realize there is a theme here: Get developers in a room and have them look at the code and talk about it. There is value to be found in those discussions, and they let us build ideas and get consensus on standards of code. Don't get shortchanged because you feel crunched for time, ask for the room to have these meetings, and try to improve your culture!

In the next post, I will be writing about ways you can convince your manager or your dev teammates that these meetings can create positive growth.
