---
modified: 2026-04-11T13:42:29-06:00
created: 2026-02-17T15:20:08-06:00
publish: "true"
date: "2026-02-17T21:20:08.000Z"
---
> [!NOTE] About
> Some prompts snippets I have found useful and \[mostly\] effective through my agentic coding workflows.

# /research

- [^1] Read {X{,Y,Z)}} in depth, understand how it works deeply, what it does and all its specificities. 
- [^1] Study {X{,Y,Z)}} in great details, understand the intricacies of it and
	- write a detailed report of your learnings and findings in `research.md`
	- help me refactor...
	- help me test...
	- help me debug...
	- help me implement...
# /implement

- "take your time, don't stop till X" (x=done or condition)

https://x.com/steipete/status/2040542898773762231?s=46&t=ssP6EM3-WGWpWUN96NHzSA
# /refactor

- What should we refactor next?
- Where is complexity increasing?
## DRY

- Can you identify DRY opportunities between X and Y implementations?
- Can you identify significant simplification opportunities to reduce cognitive load?
- Can you identify separation of concerns?

# /test
---
- What tests are missing?
---
- Are there any missing important tests when compared to similar implementations X/Y/Z?
---
- Are there any re-organization opportunities to homogenize & reduce cognitive load (compared to other implementations)?
---

# /debug

- [^1] Go through  {X{,Y,Z)}}, understand it deeply and look for potential bugs. There definitely are bugs in the system as it sometimes {DO A(,B,C)}. Keep researching the flow until you find all the bugs, don’t stop until all the bugs are found. When you’re done, write a detailed report of your findings in `research.md`

# /document

- Give me a summarized version of {doc, plan, changes in branch} to include in a PR description, so both Backend developers have a good yet brief overview to review the implementation, but also Fronted developers can lookup quickly the new/changed API endpoints they need to accommodate for

#### Coder vs Reviewer roles:

OK I went ahead and made the refactor/fix myself. Can you compare it against your recommendations/plan, and let me know any constructive critiques, gaps or improvements I might be missing?


---
# Citations

[^1]: [boristane.com/blog/how-i-use-claude-code](https://boristane.com/blog/how-i-use-claude-code/)