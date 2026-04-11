# Resume Variant Workflow

This directory is the working area for tailored resume and cover-letter variants used by the resume app.

## Goals

Use this structure to make agent-assisted variant creation:

- repeatable
- grounded in source material
- easy to review later
- less dependent on remembering prior chat context

## Files

- `AGENTS.md`
  - persistent instructions for coding agents working in this folder
- `WRITING_STYLE.md`
  - the local source of truth for tone, etiquette, and writing quality
- `REFERENCES.md`
  - external inspirations and citations, distilled into local guidance
- `VARIANT_BRIEF_TEMPLATE.md`
  - the recommended prompt/checklist structure for a new employer or role
- `<slug>.ts`
  - the actual variant implementation
- `utils.ts`
  - reusable helper functions for variant authoring

## Recommended Human Workflow

### 1. Gather source material

Collect any useful context before asking an agent to write a variant:

- recruiter or hiring-manager emails
- job descriptions
- interview notes
- ATS or document feedback
- examples of preferred tone
- any keywords to emphasize or avoid

### 2. Shape the prompt with the template

Use `VARIANT_BRIEF_TEMPLATE.md` as a checklist and include the relevant parts directly in your prompt:

- the target role and audience
- source materials used
- the resume direction
- the cover-letter direction
- factual constraints
- any wording sensitivities

Also ask the agent to follow `WRITING_STYLE.md` so the result reflects the house style rather than only the immediate prompt.

This keeps the workflow lightweight while still giving the agent enough structure.

### 3. Ask the agent to read the folder guidance

When prompting a coding agent:

- point it at this folder
- mention `AGENTS.md`
- mention `WRITING_STYLE.md`
- mention any attached context or pasted source material
- ask it to update or create `<slug>.ts`

Example prompt shape:

```md
Create or update the resume variant in `packages/data/src/resume/variants/<slug>.ts`.

Please follow:
- `packages/data/src/resume/variants/AGENTS.md`
- `packages/data/src/resume/variants/WRITING_STYLE.md`
- `packages/data/src/resume/variants/VARIANT_BRIEF_TEMPLATE.md`

Keep tailoring light and factual. Rebuild `@workspace/data` after changes.
```

### 4. Review the generated variant

Check:

- factual accuracy
- whether the tone feels natural
- whether keywords are overused
- whether resume and cover letter tell the same story
- whether the output still sounds like you

### 5. Preserve new learnings

If the agent conversation reveals new durable guidance:

- update `AGENTS.md` if it should apply to all future variants
- update the variant file itself if the insight is specific to that slug and worth preserving in code-facing form

## What Works Best With Agents

Agents tend to perform best when you provide these layers:

1. `AGENTS.md`
   - stable rules for the whole folder
2. `WRITING_STYLE.md`
   - durable style, tone, and etiquette guidance
3. `VARIANT_BRIEF_TEMPLATE.md`
   - a reusable shape for the request
4. chat prompt
   - the immediate task for this run

That combination is usually better than relying on an unstructured prompt alone.

## Notes On The Current Reorg

This folder follows the newer `packages/data` organization introduced during the data-package reorg documented in [Data Package Reorg](656dc041-c9cb-476d-bf4f-ce44eda21c7b).

That means:

- resume variant source now lives under `packages/data/src/resume/variants`
- shared resume schema and helpers live under the `resume` domain
- agents should prefer the current folder layout over older paths from prior conversations
