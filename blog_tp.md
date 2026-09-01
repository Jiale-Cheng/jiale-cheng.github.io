---
layout: post
title: "Your Blog Title"
subtitle: "Optional short subtitle"
description: "One or two sentences used in the blog list and search results."
categories: [Info-Theory]
tags: [Info-Theory, Example-Tag]
keywords: information theory, example keyword
status: Draft
commentable: true
protected: false
toc: true
numbering: false
statements: true
mathjax: true
mermaid: false
highlight: false
lang: en
---

<!--
BLOG TEMPLATE — HOW TO USE

1. Copy this file into:
   _posts/YYYY-MM-DD-short-title/YYYY-MM-DD-short-title.md

2. Replace every placeholder in the front matter above.
   - title: full page title.
   - subtitle: optional; delete the line when unused.
   - description: concise summary shown in blog listings and metadata.
   - categories: broad subject area; normally use one category.
   - tags: specific topics used by the tag list and Tags Map.
   - keywords: search terms, separated by commas.
   - status: use Draft while writing, then Completed or Archived.
   - commentable: true enables Giscus comments.
   - toc: true enables the right-side catalog.
   - numbering: controls heading numbering only. Mathematical statements
     are numbered independently, so false is normally recommended.
   - statements: true enables theorem-like blocks and cross-references.
   - mathjax: true enables LaTeX mathematics.
   - mermaid/highlight: enable only when the post actually uses them.
   - lang: use en or zh-CN to record the article language.

3. Use ## for the main sections. Statement numbering resets at each ##.
   Do not place a numbered mathematical statement before the first ##.

4. Counter rules:
   - Theorem, Lemma, Proposition, and Corollary share one counter.
   - Definition has its own counter.
   - Axiom has its own counter.
   - Remark has its own counter.
   - Example has its own counter.
   - Proof is not numbered.

   Therefore, the first Theorem-like result in the fifth ## section is 5.1,
   while the first Definition, Remark, and Example there are each also 5.1
   in their own named sequences.

5. Every block that may be referenced needs a unique id. Recommended prefixes:
   thm-, lem-, prop-, cor-, def-, ax-, rem-, ex-.

6. Keep a blank line after the opening heading and before </div>. This lets
   Markdown, lists, display equations, and code render correctly inside blocks.

7. Put new images in assets/images/blog/your-post-name/ and use the image
   example near the end of this template.

8. IMPORTANT — INDENTATION INSIDE MATHEMATICAL BLOCKS:
   Start every ordinary paragraph and every top-level list marker at the first
   column, exactly as in the examples below. Never place one Tab or four spaces
   before ordinary text inside a math-statement or math-proof block. Kramdown
   interprets that indentation as a code block, so the sentence will appear in
   a dark code box and LaTeX such as $$X$$ will not be rendered.

   Correct source (no leading indentation):

   The sequence converges in probability to $$X$$.

   Incorrect source (the arrow represents a Tab and must not be copied):

   →The sequence converges in probability to $$X$$.

   Indentation is still allowed inside display-math delimiters, nested lists,
   and fenced code blocks. For actual code, always use triple-backtick fences
   rather than relying on four-space indentation.
-->

Write a short introduction here. Explain the problem, notation, and what the reader will learn.

## First Main Section

Start each main section with ordinary prose. Inline mathematics can be written as $$X$$, and display mathematics as

$$
I(X;Y)=H(X)-H(X\mid Y).
$$

### Optional Subsection

Subsections organize the catalog but do not reset mathematical-statement counters.

<div class="math-statement math-statement--definition" data-statement="definition" id="def-example-object" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition</span> <span class="math-statement__title">(Example Object)</span>.</p>

An **example object** is an object satisfying the conditions listed here. The Definition block is pale yellow and uses its own counter.

</div>

<div class="math-statement math-statement--axiom" data-statement="axiom" id="ax-example-rule" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Axiom</span> <span class="math-statement__title">(Example Rule)</span>.</p>

State an assumed rule here. Axiom uses the same pale-blue visual family as Theorem, but it has an independent counter.

</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="thm-main-result" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem</span> <span class="math-statement__title">(Main Result)</span>.</p>

State the theorem clearly here. A theorem can contain several paragraphs, lists, and display equations:

$$
P(A)\leq 1.
$$

</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>

Give the proof here. Proof is intentionally not numbered.

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lem-supporting-result" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma</span> <span class="math-statement__title">(Supporting Result)</span>.</p>

State a supporting lemma here. Lemma shares its counter with Theorem, Proposition, and Corollary.

</div>

<div class="math-statement math-statement--proposition" data-statement="proposition" id="prop-useful-property" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Proposition</span> <span class="math-statement__title">(Useful Property)</span>.</p>

State a proposition here.

</div>

<div class="math-statement math-statement--corollary" data-statement="corollary" id="cor-immediate-consequence" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Corollary</span> <span class="math-statement__title">(Immediate Consequence)</span>.</p>

State a corollary here.

</div>

<div class="math-statement math-statement--remark" data-statement="remark" id="rem-interpretation" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Remark</span> <span class="math-statement__title">(Interpretation)</span>.</p>

Explain an interpretation, limitation, convention, or subtle point. Remark has its own counter and can be cross-referenced.

</div>

<div class="math-statement math-statement--example" data-statement="example" id="ex-binary-case" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example</span> <span class="math-statement__title">(Binary Case)</span>.</p>

Work through a concrete example. Example has its own counter and can be cross-referenced.

</div>

## Cross-References

Use an empty link with class `statement-ref`; the page fills in the correct type and number automatically:

```html
<a class="statement-ref" href="#thm-main-result"></a>
```

For example: By <a class="statement-ref" href="#thm-main-result"></a>, the desired bound holds. The interpretation in <a class="statement-ref" href="#rem-interpretation"></a> and the calculation in <a class="statement-ref" href="#ex-binary-case"></a> explain why.

When a statement moves to another main section, these displayed reference numbers update automatically because the links point to stable ids.

## Other Common Elements

A normal Markdown list:

1. First item.
2. Second item.

A block quotation:

> Put a short quotation or highlighted observation here.

A code block:

```python
def example(value):
    return value
```

An image stored under `assets/images/blog/your-post-name/`:

```markdown
![Clear alternative text]({{ '/assets/images/blog/your-post-name/figure.png' | relative_url }})
```

## Conclusion

Summarize the main result, its interpretation, and any open questions or next steps.

## References

1. Author, *Title*, venue or publisher, year. [Link](https://example.com/)
