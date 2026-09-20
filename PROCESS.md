# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

I built SLOP1677, a 12-week beginner pool course. Most university courses are
reading and writing, so I wanted something physical, without needing high
fitness or prior skill. Pool fit well because it's physical but also needs
thinking, planning and focus, and it's easy for a beginner to start. The
site's first version was set up in
[`e4c6017`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-liangsiyuan41-cyber/commit/e4c6017).

## How I got here

I used to work part-time as a pool coach, so most of the content came from my
own knowledge, and AI helped organise and write it clearly. I planned the
12 weeks as a gradual path: table knowledge and rules first, then stance,
straight shots and angled shots, then cue-ball control (stop, follow, draw,
side spin), then Point, Zone and Route Positioning, and finally attack,
safety, recovery and full-table planning. This structure was finished in
[`3a67b68`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-liangsiyuan41-cyber/commit/3a67b68).
The site can't give real coaching, so I tried to make the theory as complete
as possible.

Building the site caused problems because the AI didn't always understand how
pool balls behave. I had a few bad image attempts. In Week 3, the AI drew
the cue ball moving along a curved path when the stroke was off-line, but that
drill should show a straight path drifting left or right from the intended
line. After finding this, I checked the images and content more carefully.

After that, I stopped letting the AI invent diagrams when the geometry was
uncertain. I drew some teaching ideas myself and used ChatGPT to recreate them
in a clearer, more consistent style, which made them more accurate. I also
tried to protect the course structure I'd already designed, instead of
letting the coding agent change it freely. The teaching images, the Week 4
slides and the bigger content update were included in
[`1e2bfdc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-liangsiyuan41-cyber/commit/1e2bfdc).

I changed the weekly quizzes as I went. At first the questions sat at the
bottom of each week page. I turned them into separate quiz pages with two
multiple-choice questions and one short-answer question each. Later I
noticed Claude had put the correct answer as the first option in almost every
question, so I asked it to keep the questions the same but move the correct
answers so A, B, C and D were used evenly. This quiz rework, along with the
grading fixes and final site polish, was finished in
[`fbc2c5e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-liangsiyuan41-cyber/commit/fbc2c5e).

What I learned is that the AI worked best when I gave it clear decisions
instead of asking it to make the teaching calls for me. My knowledge mattered
most for checking technical accuracy, and the AI was most useful for
organising content, building the site and improving the presentation.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
