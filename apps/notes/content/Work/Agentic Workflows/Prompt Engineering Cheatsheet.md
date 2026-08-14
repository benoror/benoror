---
modified: 2026-08-13T18:27:23-06:00
created: 2026-02-17T15:20:08-06:00
publish: "true"
date: "2026-02-17T21:20:08.000Z"
---
> [!NOTE] About
> Some prompts snippets I have found useful and \[mostly\] effective through my agentic coding workflows.

# General-use

## /research

- [^1] Read {X{,Y,Z)}} in depth, understand how it works deeply, what it does and all its specificities.
- [^1] Study {X{,Y,Z)}} in great details, understand the intricacies of it and
	- write a detailed report of your learnings and findings in `research.md`
	- help me refactor...
	- help me test...
	- help me debug...
	- help me implement...
- Please ask me any clarifying and follow-up questions.

## /plan

- [^2] Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- [^2] At the end of each plan, give me a list of unresolved questions to answer, if any.

## /tdd

- BDD → TDD.

## /implement

- [^3] "take your time, don't stop till X" (x=done or condition)
## /refactor

- What should we refactor next?
- Where is complexity increasing?
- Don't care about backwards compatibility.

### DRY

- Can you identify DRY opportunities between X and Y implementations?
- Can you identify significant simplification opportunities to reduce cognitive load?
- Can you identify separation of concerns?

### Design Patterns

- Any opportunities to better follow design patterns such as, but not limited to:
	- Domain-driven design (DDD)
	- RESTful API design
	- Repository patterns / query objects / data gateways and adapters
	- Service objects/classes
	- Consistently typed contracts
	- Error-handling consistency

## /execute

- Let's consider {X} in a phased order, so we can produce semantic, atomic, and clear commits.

## /test

---
- What tests are missing?
---
- Are there any missing important tests when compared to similar implementations X/Y/Z?
---
- Are there any re-organization opportunities to homogenize & reduce cognitive load (compared to other implementations)?
---

## /debug

- [^1] Go through  {X{,Y,Z)}}, understand it deeply and look for potential bugs. There definitely are bugs in the system as it sometimes {DO A(,B,C)}. Keep researching the flow until you find all the bugs, don’t stop until all the bugs are found. When you’re done, write a detailed report of your findings in `research.md`

## /docs

- Help me write a concise and summarized yet comprehensive PR description.
	- Backend developers should be able to take a quick glimpse at the implementation details.
	- If API contracts are introduced or modified, include a section for Frontend developers to quickly review new or updated contracts and relevant client-side concerns.
	- Focus on the latest changes for the current Git branch, unless indicated differently.

## /agents (meta)

- Can we incorporate these new helpers into relevant agent artifacts?
- Revisit:
	- `AGENTS.md`
	- `.agents` artifacts

### Coder vs Reviewer roles

OK, I went ahead and made the refactor/fix myself. Can you compare it against your recommendations/plan and identify constructive critiques, gaps, or improvements I might be missing?

---
# Trivelta/PAM-specific

## /migrate-to-v2

Read current implementation {v1} in depth. Understand how it works, what it does, its specificities, and its intricacies.

When that is done, make a phased plan to migrate this surface area completely to `@services/admin_panel/admin_panel_v2/` under the most appropriate context, with these technical guidelines:

- Follow all v2 conventions and design patterns strictly.
- Find opportunities to:
	- Decrease complexity and reduce cognitive load.
	- Identify separation-of-concerns and DRY opportunities.
- On existing versus new functionality:
	- Prioritize backward compatibility for consumers (Frontend) on existing functionality.
		- Apply TDD initially by replicating/translating existing tests into the v2 context first.
	- Add new features (such as {..., ..., ...}, and potentially others) on top of current functionality at the end of the implementation.

As an optional follow-up phase, completely remove the dead v1 surface.

Make the plan extremely concise. Sacrifice grammar for concision.

Ask me any unresolved, clarifying, or follow-up questions and decisions, if any.

Output should be a series of `/gh-stack` PRs that are reviewable and concise, with `/pr-description` and atomic, semantic commits.

---
# Citations

[^1]: [boristane.com/blog/how-i-use-claude-code](https://boristane.com/blog/how-i-use-claude-code/)
[^2]: [aihero.dev/my-agents-md-file-for-building-plans-you-actually-read](https://www.aihero.dev/my-agents-md-file-for-building-plans-you-actually-read)
[^3]: https://x.com/steipete/status/2040542898773762231?s=46&t=ssP6EM3-WGWpWUN96NHzSA