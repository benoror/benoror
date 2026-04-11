## Purpose

This folder stores tailored resume and cover-letter variants for the resume app.

Each variant should remain truthful to the base resume while lightly adapting emphasis, framing, ordering, and supporting copy for a specific audience, opportunity, or employer.

Before creating or updating a variant, read:

- `WRITING_STYLE.md`
- `REFERENCES.md`
- `VARIANT_BRIEF_TEMPLATE.md`
- `README.md`

## File Layout

- One variant file per slug: `<slug>.ts`
- Reusable variant helper functions live in `utils.ts`
- Variant-specific direction should normally come from the current prompt

## Authoring Rules

- Do not invent companies, roles, achievements, metrics, or credentials.
- Ground resume edits in existing source material from:
  - `../index.ts`
  - `../roles.ts`
  - approved user-provided notes, emails, PDFs, or prompt context
- Tailor lightly by default unless the prompt explicitly asks for stronger adaptation.
- Prefer editing:
  - `metadata`
  - `resume.about`
  - selected `companies`
  - selected `skills`
  - `coverLetter`
- Keep the overall identity consistent with the base resume.

## Tone

- Senior, clear, direct, and specific
- Confident without hype
- Avoid generic recruiter cliches, buzzword stuffing, and exaggerated self-praise
- Use keywords naturally, not mechanically
- Follow `WRITING_STYLE.md` as the source of truth for tone, etiquette, and writing quality
- Treat `REFERENCES.md` as background context and citation only, not as a script to imitate

## Resume Guidance

- Start from the base resume and emphasize the most relevant signals for the target role.
- Preserve factual integrity even when reordering or simplifying.
- Favor measurable impact, scope, leadership context, product/business outcomes, and technical depth where supported by source material.
- If introducing a keyword like `generalist`, `AI-first`, or `operator`, weave it in lightly and only when it fits the supplied prompt context.

## Cover Letter Guidance

- Keep cover letters concise and readable.
- Default structure:
  - short opening with role/audience alignment
  - strongest 1-2 evidence paragraphs
  - short closing with fit and willingness to continue
- Avoid sounding templated.
- Match the tone and constraints from the prompt.

## Prompt Workflow

When asked to create a new variant:

1. Use `VARIANT_BRIEF_TEMPLATE.md` as a checklist or prompt scaffold
2. Apply `WRITING_STYLE.md` while filling it mentally or directly in the chat prompt using user instructions and provided source material
3. Write or update `<slug>.ts` based on that prompt

When updating an existing variant:

1. Read the existing `<slug>.ts`
2. Preserve useful prior context unless the user explicitly changes direction
3. Use the current prompt as the source of truth for new tone, emphasis, keywords, or target changes
4. Keep `WRITING_STYLE.md` authoritative for overall writing quality and etiquette

## Validation

- Rebuild `@workspace/data` after changing variant source files because consumers may load compiled `dist` output.
- If the resume app is involved, ensure the relevant dev/build flow sees updated `@workspace/data` output.
