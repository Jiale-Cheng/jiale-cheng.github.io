---
layout: post
title: "Manifolds and Local Structures"
description: "A local-to-global guide to submanifolds, embeddings, regular values, manifolds with boundary, and smooth partitions of unity."
categories: [Manifolds]
tags: [Local-Charts, Partition-of-Unity]
keywords: manifolds, submanifolds, local charts, embeddings, regular values, manifolds with boundary, partition of unity
status: Completed
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

The central idea of manifold theory is that a geometric object can be understood one coordinate neighborhood at a time. This article develops that idea through six questions:

1. How is a submanifold defined inside another manifold?
2. When does a parametrized image form a submanifold?
3. When do equations cut out a submanifold?
4. How is smoothness defined at a boundary?
5. What tangent and normal geometry lives at a boundary?
6. How can local smooth constructions be combined globally?

The recurring method is to enter suitable charts, reduce the problem to a familiar Euclidean statement, and then transport the conclusion back to the manifolds.

Throughout, $$M^m$$ and $$N^n$$ denote smooth manifolds of dimensions $$m$$ and $$n$$. The notation $$T_pf$$ denotes the tangential map of a smooth map $$f$$ at $$p$$.

## What Is a Submanifold of a Manifold?

Suppose that we are given only a subset $$L\subset M$$. To say that $$L$$ is a smooth object inside $$M$$, we must be able to choose local coordinates on $$M$$ in which $$L$$ becomes an ordinary coordinate plane.

<div class="math-statement math-statement--definition" data-statement="definition" id="def-submanifold" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition</span> <span class="math-statement__title">(Submanifold)</span>.</p>

Let $$M$$ be an $$m$$-dimensional manifold and let $$0\leq \ell\leq m$$. A subset $$L\subset M$$ is an $$\ell$$-dimensional **submanifold of** $$M$$ if, for every $$p\in L$$, there is a chart

$$
\varphi:U\longrightarrow \varphi(U)\subset\mathbb R^m
$$

of $$M$$ around $$p$$ such that

$$
\varphi(U\cap L)
=\varphi(U)\cap\bigl(\mathbb R^\ell\times\{0\}\bigr),
$$

where $$\{0\}\subset\mathbb R^{m-\ell}$$. Such a chart is called a **submanifold chart of** $$M$$ **for** $$L$$, and

$$
\operatorname{codim}_M L=m-\ell.
$$

</div>

If $$\varphi=(x^1,\ldots,x^m)$$, the defining equality says that, in these local coordinates,

$$
x^{\ell+1}=\cdots=x^m=0
\qquad\text{on }L.
$$

The point is not that $$L$$ was already a linear plane. Rather, the chart bends the ambient manifold into coordinates in which $$L$$ becomes one.

### The smooth structure induced on the subset

Give $$L$$ the relative topology inherited from $$M$$. For a submanifold chart, set

$$
U_L:=U\cap L,
\qquad
\varphi_L:=\varphi|_{U_L},
$$

and identify $$\mathbb R^\ell\times\{0\}$$ with $$\mathbb R^\ell$$. Then $$\varphi_L$$ is a chart of $$L$$. Restrictions of overlapping submanifold charts have smooth transition maps, so these charts give $$L$$ its own $$\ell$$-dimensional smooth structure.

Local coordinates should not be confused with coordinates in a fixed surrounding Euclidean space. The tuple $$\varphi(p)$$ records the position of $$p$$ in one chart; another chart uses a different tuple connected to the first by a smooth coordinate change.

<div class="math-statement math-statement--definition" data-statement="definition" id="def-immersion-embedding" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition</span> <span class="math-statement__title">(Immersion and Embedding)</span>.</p>

A smooth map $$f:M\to N$$ is an **immersion** if

$$
T_pf:T_pM\longrightarrow T_{f(p)}N
$$

is injective for every $$p\in M$$.

An immersion is an **embedding** if

$$
f:M\longrightarrow f(M)
$$

is also a homeomorphism, where $$f(M)$$ carries the relative topology induced from $$N$$.

</div>

The immersion condition says that no tangent direction is collapsed. It is local and differential. The homeomorphism condition says that the topology of the parameter space agrees with the topology that the image inherits from $$N$$. It is global.

### The natural inclusion and tangent spaces

Once $$L$$ has the induced smooth structure, the natural inclusion

$$
i_L:L\longrightarrow M,
\qquad p\longmapsto p,
$$

is an embedding. Its notation matters even though it does not change the underlying point: it records whether that point is being regarded as an element of $$L$$ or of $$M$$.

In an adapted chart of $$M$$ and the induced chart of $$L$$,

$$
\varphi\circ i_L\circ\varphi_L^{-1}(x)=(x,0).
$$

Therefore $$T_pi_L$$ is injective, and we identify its image with $$T_pL$$:

$$
T_pL\subset T_pM.
$$

In these adapted coordinates, $$T_pi_L$$ is represented by $$v\mapsto(v,0)$$. In arbitrary charts $$\eta$$ on $$L$$ and $$\varphi$$ on $$M$$, its coordinate representation is instead

$$
D\bigl(\varphi\circ i_L\circ\eta^{-1}\bigr)(\eta(p)).
$$

Thus the formula $$(v,0)$$ is a consequence of choosing adapted coordinates, not an intrinsic formula valid in every chart.

<div class="math-statement math-statement--remark" data-statement="remark" id="rem-tangent-meaning" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Remark</span> <span class="math-statement__title">(What Changes When the Ambient Manifold Changes?)</span>.</p>

The point $$p$$ is the same point in $$L$$ and $$M$$, but the allowed velocities differ. Vectors in $$T_pL$$ are velocities tangent to curves constrained to $$L$$; vectors in $$T_pM$$ may point in every direction allowed by $$M$$.

The abstract tangent space and its chart-transition law are intrinsic. A particular realization of that tangent space as a subspace of a surrounding Euclidean space depends on the chosen embedding. The normal bundle depends even more directly on that ambient placement.

</div>

### Restricting a smooth map

Let $$L\subset M$$ and $$K\subset N$$ be submanifolds, and suppose that $$f:M\to N$$ is smooth with $$f(L)\subset K$$. The restricted map $$f|_L:L\to K$$ satisfies the type-correct identity

$$
i_K\circ f|_L=f\circ i_L.
$$

Taking tangential maps and using the chain rule gives

$$
T_{f(p)}i_K\circ T_p(f|_L)
=T_pf\circ T_pi_L.
$$

After making the standard identifications $$T_pL\subset T_pM$$ and $$T_{f(p)}K\subset T_{f(p)}N$$, this becomes

$$
T_p(f|_L)=(T_pf)|_{T_pL}.
$$

The geometric reason is simple: a curve in $$L$$ is also the same curve in $$M$$, and $$(f|_L)\circ\gamma=f\circ\gamma$$. Differentiating these two equal curves produces the same velocity.

The same adapted-chart argument gives several useful consequences:

- if $$L\subset M\subset N$$ are successive submanifolds, then $$L$$ is a submanifold of $$N$$;
- if $$L\subset M$$ and $$K\subset N$$ are submanifolds, then $$L\times K$$ is a submanifold of $$M\times N$$;
- every open subset of $$M$$ is a full-dimensional submanifold of $$M$$;
- a diffeomorphism sends submanifolds to submanifolds of the same dimension.

The first statement does not say that all ambient geometry is irrelevant. Tangent constructions and smoothness are compatible with enlarging the ambient manifold, but the normal bundle still depends on how the submanifold is placed in that ambient space.

## When Does an Immersion Produce a Submanifold?

An immersion supplies the correct first-order geometry, but it does not by itself control how different parts of the domain meet in the image. A noninjective immersion may cross itself. Even an injective immersion can fail to be an embedding if a distant part of the domain accumulates at an already attained image point, making the inverse on the image discontinuous.

The local and global roles are therefore different:

$$
\text{immersion}
\Longrightarrow\text{good local sheet},
$$

while

$$
\text{embedding}
\Longrightarrow\text{the local sheet has the correct global image topology}.
$$

<div class="math-statement math-statement--theorem" data-statement="theorem" id="thm-immersion-embedding-image" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem</span> <span class="math-statement__title">(Local Immersions and Global Embeddings)</span>.</p>

Let $$f:M^m\to N^n$$ be smooth.

1. If $$f$$ is an immersion, then every $$p\in M$$ has an open neighborhood $$U$$ such that $$f|_U:U\to N$$ is an embedding.
2. If $$f$$ is an embedding, then $$f(M)$$ is an $$m$$-dimensional submanifold of $$N$$ and

$$
f\in\operatorname{Diff}(M,f(M)).
$$

</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>

Fix $$p\in M$$. Choose charts $$\varphi$$ of $$M$$ around $$p$$ and $$\psi$$ of $$N$$ around $$f(p)$$. After shrinking the domain, the local representation

$$
F:=\psi\circ f\circ\varphi^{-1}
$$

is defined between open subsets of Euclidean spaces. Because the chart derivatives are linear isomorphisms, $$DF$$ has the same rank as $$T_pf$$. The Euclidean immersion theorem lets us shrink once more and change coordinates so that

$$
F(x)=(x,0).
$$

This is a homeomorphism and a diffeomorphism from its coordinate domain onto a coordinate-plane piece. Transporting the result back through the charts proves the first claim.

Now suppose that $$f$$ is an embedding and write $$q=f(p)$$. The first part produces a local sheet $$f(U)$$ through $$q$$. To prove that the whole image is a submanifold near $$q$$, we must know that this sheet is a neighborhood of $$q$$ in $$f(M)$$. Because $$f:M\to f(M)$$ is a homeomorphism, $$f(U)$$ is relatively open in $$f(M)$$. Hence

$$
f(U)=O\cap f(M)
$$

for some open $$O\subset N$$. A submanifold chart that straightens $$f(U)$$ therefore also straightens the entire image inside a sufficiently small neighborhood of $$q$$. This works at every image point. The same local normal form also makes the inverse smooth locally, hence globally.

</div>

The topology in the definition of embedding is used precisely in the second half of this proof. Without continuity of $$f^{-1}$$, points from far outside $$U$$ could have images converging to $$q$$, so no ambient neighborhood of $$q$$ would isolate the local sheet $$f(U)$$.

<div class="math-statement math-statement--theorem" data-statement="theorem" id="thm-compact-injective-immersion" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem</span> <span class="math-statement__title">(Compact Injective Immersion)</span>.</p>

If $$M$$ is compact and $$f:M\to N$$ is an injective immersion, then $$f$$ is an embedding. Consequently, $$f(M)$$ is an $$m$$-dimensional submanifold of $$N$$ and $$f\in\operatorname{Diff}(M,f(M))$$.

</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>

The map $$f:M\to f(M)$$ is a continuous bijection. If $$A\subset M$$ is closed, then $$A$$ is compact, so $$f(A)$$ is compact and therefore closed in the Hausdorff space $$f(M)$$. Thus $$f$$ is a closed map, which makes $$f^{-1}$$ continuous. Hence $$f$$ is an embedding, and the preceding theorem applies.

</div>

<div class="math-statement math-statement--example" data-statement="example" id="ex-rotational-hypersurface" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example</span> <span class="math-statement__title">(A Rotational Hypersurface)</span>.</p>

Let

$$
\gamma:S^1\longrightarrow(0,\infty)\times\mathbb R,
\qquad
t\longmapsto\bigl(\rho(t),\sigma(t)\bigr)
$$

be an injective immersion. Let $$i:S^m\hookrightarrow\mathbb R^{m+1}$$ be the canonical inclusion, so $$i(q)=q$$, and define

$$
f:S^m\times S^1\longrightarrow\mathbb R^{m+2},
\qquad
f(q,t)=\bigl(\rho(t)i(q),\sigma(t)\bigr).
$$

The $$S^m$$ directions become scaled tangent directions. The $$S^1$$ direction contributes a radial or vertical component through $$\rho'(t)$$ and $$\sigma'(t)$$. Since $$T_qS^m$$ is orthogonal to $$i(q)$$ and $$\gamma$$ is an immersion, these directions cannot cancel, so $$f$$ is an immersion.

If $$f(q,t)=f(q',t')$$, the norm of the first component and the final coordinate give

$$
\bigl(\rho(t),\sigma(t)\bigr)
=\bigl(\rho(t'),\sigma(t')\bigr).
$$

Injectivity of $$\gamma$$ gives $$t=t'$$, and $$\rho(t)>0$$ then gives $$q=q'$$. Thus $$f$$ is an injective immersion. Because $$S^m\times S^1$$ is compact, it is an embedding.

For $$m=1$$, the first factor contains $$q\in S^1\subset\mathbb R^2$$, while the second factor contains the profile parameter $$t$$. These are two different copies of $$S^1$$.

</div>

<div class="math-statement math-statement--example" data-statement="example" id="ex-spherical-slices" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example</span> <span class="math-statement__title">(Spherical Slices)</span>.</p>

For $$1\leq\ell<m$$ and $$y\in\mathbb R^{m-\ell}$$ with $$|y|<1$$, define

$$
L_y:=\sqrt{1-|y|^2}\,S^\ell\times\{y\}\subset S^m.
$$

The map

$$
f_y:S^\ell\longrightarrow S^m,
\qquad
x\longmapsto\bigl(\sqrt{1-|y|^2}\,x,y\bigr)
$$

is an injective immersion. Since $$S^\ell$$ is compact, it is an embedding, and $$L_y$$ is an $$\ell$$-dimensional submanifold of $$S^m$$.

</div>

If $$L$$ and $$M$$ are both submanifolds of $$N$$ with $$L\subset M$$, the restriction of the identity on $$N$$ gives an embedding $$L\hookrightarrow M$$. Thus $$L$$ is also a submanifold of $$M$$. Applied to the rotational example with $$m=1$$, fixing either parameter produces an embedded circle inside the torus-like surface.

## How Do Regular Values Cut Out Submanifolds?

Embeddings describe a submanifold by parameters. The complementary approach describes it by equations. The key question is whether those equations impose independent first-order constraints.

<div class="math-statement math-statement--definition" data-statement="definition" id="def-regular-value-submersion" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition</span> <span class="math-statement__title">(Regular Points, Regular Values, and Submersions)</span>.</p>

Let $$f:M\to N$$ be of class $$C^1$$.

1. A point $$p\in M$$ is a **regular point** of $$f$$ if $$T_pf$$ is surjective. Otherwise it is a **singular point**.
2. A point $$q\in N$$ is a **regular value** of $$f$$ if every $$p\in f^{-1}(q)$$ is a regular point.
3. The map $$f$$ is a **submersion** if every point of $$M$$ is regular.

</div>

Regularity at $$p$$ says that every tangent direction at $$f(p)$$ is reached from some tangent direction at $$p$$. Regularity of a value asks for this at every point of the whole fiber. If $$q\notin f(M)$$, then $$q$$ is a regular value vacuously because its fiber is empty.

For $$f=(f_1,\ldots,f_n):M\to\mathbb R^n$$, regularity at $$p$$ is equivalent to linear independence of

$$
df_1(p),\ldots,df_n(p)\in T_p^*M.
$$

<div class="math-statement math-statement--theorem" data-statement="theorem" id="thm-regular-value" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem</span> <span class="math-statement__title">(Regular Value Theorem)</span>.</p>

Let $$f:M^m\to N^n$$ be smooth, and let $$q\in N$$ be a regular value. Then

$$
L:=f^{-1}(q)
$$

is an $$(m-n)$$-dimensional submanifold of $$M$$. For every $$p\in L$$,

$$
T_pL=\ker T_pf.
$$

</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>

Fix $$p_0\in L$$. Choose charts $$\varphi$$ of $$M$$ around $$p_0$$ and $$\psi$$ of $$N$$ around $$q$$, and shrink so that the local representation

$$
F:=\psi\circ f\circ\varphi^{-1}
$$

is defined. Put $$y:=\psi(q)$$. At every point $$p\in L$$ in this neighborhood, the chain rule gives

$$
T_{\varphi(p)}F
=T_q\psi\circ T_pf\circ T_{\varphi(p)}\varphi^{-1}.
$$

The two chart maps contribute linear isomorphisms, while $$T_pf$$ is surjective. Hence $$DF$$ is surjective along the fiber $$F^{-1}(y)$$.

The Euclidean regular value theorem now supplies a coordinate change $$\Phi$$ on a neighborhood $$X$$ of $$\varphi(p_0)$$ such that

$$
\Phi\bigl(X\cap F^{-1}(y)\bigr)
=\Phi(X)\cap\bigl(\mathbb R^{m-n}\times\{0\}\bigr).
$$

Therefore $$\chi:=\Phi\circ\varphi$$ is a submanifold chart of $$M$$ for $$L$$. This proves the dimension statement.

The restriction $$f|_L$$ is constant, so $$T_p(f|_L)=0$$. The restriction identity from the first section gives

$$
T_pL\subset\ker T_pf.
$$

Both spaces have dimension $$m-n$$: the first by the submanifold statement and the second by rank-nullity, because $$T_pf$$ is surjective. Hence they are equal.

</div>

The geometric mechanism becomes transparent in suitable coordinates. A submersion has the local form

$$
(x,z)\longmapsto x,
\qquad
(x,z)\in\mathbb R^n\times\mathbb R^{m-n}.
$$

Fixing the output fixes the $$n$$ coordinates $$x$$ and leaves the $$m-n$$ coordinates $$z$$ free. The tangent directions along the fiber are precisely the directions killed by the projection.

### The local converse

Every submanifold can locally be written as a regular zero set. If $$L^\ell\subset M^m$$ and $$\varphi=(\varphi^1,\ldots,\varphi^m)$$ is an adapted chart, define

$$
g(r):=\bigl(\varphi^{\ell+1}(r),\ldots,\varphi^m(r)\bigr).
$$

Then

$$
g^{-1}(0)=U\cap L.
$$

In the coordinates $$\varphi$$, the map $$g$$ is projection onto the last $$m-\ell$$ coordinates, so its derivative is surjective. Thus $$0$$ is a regular value.

This gives two complementary local descriptions:

$$
\begin{array}{ccl}
\text{embedding} &:& x\longmapsto(x,0),\\
\text{submersion} &:& (x,z)\longmapsto x.
\end{array}
$$

The first describes allowed positions by parameters; the second describes independent constraints by equations.

The same arguments work in the $$C^k$$ category for every positive integer $$k$$: a regular value of a $$C^k$$ map cuts out a $$C^k$$ submanifold.

<div class="math-statement math-statement--remark" data-statement="remark" id="rem-singular-fibers" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Remark</span> <span class="math-statement__title">(What Failure of Regularity Means)</span>.</p>

At a singular point, the derivative loses at least one target direction, so the projection normal form is unavailable. The regular value theorem then gives no conclusion about that fiber. The fiber may fail to be a manifold, but singularity alone does not prove that it fails.

</div>

## How Are Manifolds with Boundary Defined Smoothly?

A boundary point does not have a neighborhood modeled on an open subset of $$\mathbb R^b$$. It has only a one-sided neighborhood. The smallest useful change is to replace the Euclidean model by a closed half-space at such points while retaining ordinary Euclidean models in the interior.

<div class="math-statement math-statement--definition" data-statement="definition" id="def-half-space-smoothness" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition</span> <span class="math-statement__title">(The Half-Space Model)</span>.</p>

For $$b\geq1$$, define

$$
\mathbb H^b:=\mathbb R^{b-1}\times(0,\infty),
\qquad
\overline{\mathbb H}^{\,b}:=\mathbb R^{b-1}\times[0,\infty),
$$

and

$$
\partial\mathbb H^b:=\mathbb R^{b-1}\times\{0\}.
$$

If $$X\subset\overline{\mathbb H}^{\,b}$$ is relatively open, a map on $$X$$ is smooth if it locally extends to a smooth map on an open subset of $$\mathbb R^b$$.

</div>

This extension requirement is exactly what permits ordinary derivatives at a boundary point. Different local extensions have the same derivative on the relative domain, so the derivative is well defined.

A diffeomorphism between relatively open subsets of closed half-spaces must map the face to the face. Otherwise an inverse function theorem argument would send a full Euclidean neighborhood of a boundary point into the half-space, which is impossible. Its derivative also preserves the inward and outward sides: in half-space coordinates, the final component has the same sign before and after the derivative.

<div class="math-statement math-statement--definition" data-statement="definition" id="def-manifold-boundary" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition</span> <span class="math-statement__title">(Submanifold with Boundary)</span>.</p>

Let $$N$$ be an $$n$$-dimensional manifold. A subset $$B\subset N$$ is a $$b$$-dimensional **submanifold with boundary** if every $$p\in B$$ has an ambient chart

$$
\psi:V\longrightarrow\psi(V)\subset\mathbb R^n
$$

such that

$$
\psi(V\cap B)
=\psi(V)\cap\bigl(\overline{\mathbb H}^{\,b}\times\{0\}\bigr).
$$

Writing the coordinates as

$$
(x',t,z)\in
\mathbb R^{b-1}\times\mathbb R\times\mathbb R^{n-b},
$$

the local model is

$$
t\geq0,
\qquad z=0.
$$

The point lies in $$\partial B$$ if its adapted coordinate has $$t=0$$; otherwise it lies in $$\operatorname{int}(B)$$.

</div>

The face-preservation result for half-space coordinate changes shows that $$\partial B$$ is independent of the adapted chart. It also gives

$$
\dim\partial B=b-1,
$$

with $$\operatorname{int}(B)$$ a $$b$$-dimensional manifold without boundary and $$\partial B$$ a $$(b-1)$$-dimensional manifold without boundary.

### Why this is not merely gluing two manifolds

The decomposition

$$
B=\operatorname{int}(B)\mathbin{\dot\cup}\partial B
$$

is a consequence of the local half-space model, not the definition by itself. The model requires one smooth one-sided sheet near every boundary point. It rules out branching, cusps, and corners.

Only one coordinate is one-sided. A local model

$$
\mathbb R^{b-d}\times[0,\infty)^d,
\qquad d\geq2,
$$

has corner strata and belongs to the separate theory of manifolds with corners. For example, the origin of $$[0,\infty)^2$$ cannot be changed into a single half-space by a smooth coordinate map with invertible derivative.

<div class="math-statement math-statement--remark" data-statement="remark" id="rem-two-boundaries" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Remark</span> <span class="math-statement__title">(Manifold Boundary and Topological Boundary)</span>.</p>

The manifold boundary records points modeled on the half-space face. It need not equal the topological boundary in the ambient manifold.

For example, $$S^1\subset\mathbb R^2$$ has empty manifold boundary, but its topological boundary in $$\mathbb R^2$$ is all of $$S^1$$. The segment $$[0,1]\times\{0\}\subset\mathbb R^2$$ has two-point manifold boundary, while its topological boundary in $$\mathbb R^2$$ is the entire segment.

</div>

### Intrinsic charts on the manifold with boundary

An ambient adapted chart retains all $$n$$ coordinates and records how $$B$$ sits in $$N$$. An intrinsic chart keeps only the first $$b$$ coordinates needed for calculus on $$B$$. If $$\psi$$ is adapted and $$U=V\cap B$$, then

$$
\varphi
:=\operatorname{pr}_{\mathbb R^b}\circ\psi|_{V\cap B}
:U\longrightarrow\overline{\mathbb H}^{\,b}
$$

is an intrinsic chart. Its transition maps are diffeomorphisms between relatively open half-space subsets, so these charts form a smooth atlas.

If $$f:B\to C$$ is a diffeomorphism, then

$$
f(\partial B)=\partial C.
$$

If $$f:B\to M$$ is an embedding, then $$f(B)$$ is a submanifold with boundary and

$$
\partial f(B)=f(\partial B).
$$

<div class="math-statement math-statement--proposition" data-statement="proposition" id="prop-product-boundary" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Proposition</span> <span class="math-statement__title">(Boundary of a Product)</span>.</p>

If $$M$$ is a manifold without boundary and $$B$$ is a manifold with boundary, then $$M\times B$$ is a manifold with boundary and

$$
\partial(M\times B)=M\times\partial B.
$$

</div>

Indeed, a product of an ordinary chart on $$M$$ and a half-space chart on $$B$$ identifies the product locally with

$$
\mathbb R^m\times\overline{\mathbb H}^{\,b}
\cong\overline{\mathbb H}^{\,m+b}.
$$

The final coordinate comes from the $$B$$ factor, so it vanishes exactly on $$M\times\partial B$$.

## What Geometry Lives at the Boundary?

The half-space model controls which directions point into the set, but a tangent space must be a vector space. In particular, it must contain $$-v$$ whenever it contains $$v$$. This is why the tangent space at a boundary point is still full-dimensional; inward and outward directions are recorded separately.

<div class="math-statement math-statement--definition" data-statement="definition" id="def-boundary-tangent" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition</span> <span class="math-statement__title">(Tangent Space at a Boundary Point)</span>.</p>

Let $$B^b\subset N$$ be a submanifold with boundary, let $$p\in\partial B$$, and let

$$
\varphi:U\longrightarrow X\subset\overline{\mathbb H}^{\,b}
$$

be an intrinsic chart. If $$i_B:B\hookrightarrow N$$ is the natural inclusion, define

$$
T_pB
:=
T_{\varphi(p)}(i_B\circ\varphi^{-1})
\bigl(T_{\varphi(p)}\mathbb R^b\bigr).
$$

Thus $$T_pB$$ is a $$b$$-dimensional vector subspace of $$T_pN$$.

</div>

The use of the full space $$T_{\varphi(p)}\mathbb R^b$$ comes from extension-based smoothness. It is also necessary for linearity.

Two-sided curves alone cannot recover this tangent space. For $$B=[0,\infty)$$ at $$p=0$$, every differentiable curve $$\lambda:(-\varepsilon,\varepsilon)\to B$$ with $$\lambda(0)=0$$ has $$\dot\lambda(0)=0$$, because $$0$$ is a local minimum of $$\lambda$$. Nevertheless,

$$
T_0B\cong\mathbb R.
$$

<div class="math-statement math-statement--definition" data-statement="definition" id="def-inward-outward" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition</span> <span class="math-statement__title">(Inward and Outward Directions)</span>.</p>

For $$p\in\partial B$$, define

$$
T_p^\pm B
:=
T_{\varphi(p)}(i_B\circ\varphi^{-1})
\bigl(\varphi(p),\pm\overline{\mathbb H}^{\,b}\bigr).
$$

Then

$$
T_pB=T_p^+B\cup T_p^-B,
\qquad
T_p^+B\cap T_p^-B=T_p(\partial B).
$$

A vector in $$T_p^+B\setminus T_p(\partial B)$$ is inward pointing; a vector in $$T_p^-B\setminus T_p(\partial B)$$ is outward pointing.

</div>

The derivative of every half-space coordinate change preserves the two sides, so this definition does not depend on the chart.

If $$B$$ carries the induced inner product from a Riemannian ambient manifold, the orthogonal complement of $$T_p(\partial B)$$ inside $$T_pB$$ is one-dimensional. The unique outward-pointing unit vector in that line is the outward unit normal $$\nu(p)$$. This normal is taken **inside** $$T_pB$$; it need not be normal to $$B$$ inside the larger space $$T_pN$$.

<div class="math-statement math-statement--theorem" data-statement="theorem" id="thm-regular-inequality" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem</span> <span class="math-statement__title">(A Regular Inequality Produces a Boundary)</span>.</p>

Let $$N$$ be an $$n$$-dimensional manifold, let $$f:N\to\mathbb R$$ be smooth, and suppose that $$c\in\mathbb R$$ is a regular value of $$f$$. Then

$$
B:=\{p\in N:f(p)\leq c\}
$$

is an $$n$$-dimensional submanifold of $$N$$ with boundary. Moreover,

$$
\partial B=f^{-1}(c),
\qquad
\operatorname{int}(B)=f^{-1}(( -\infty,c)),
$$

and for $$p\in\partial B$$,

$$
T_p(\partial B)=\ker d_pf,
\qquad
\nu(p)=\frac{\nabla_pf}{|\nabla_pf|_p}.
$$

</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>

Points with $$f<c$$ already lie in an open subset of $$N$$, so only points of the level set $$f=c$$ require a boundary chart. Fix such a point $$p$$ and choose a chart $$\psi$$ with $$\psi(p)=0$$. Define

$$
g:=c-f\circ\psi^{-1}.
$$

Then $$g(0)=0$$ and

$$
q\in B
\quad\Longleftrightarrow\quad
g(\psi(q))\geq0.
$$

Because $$c$$ is a regular value, $$Dg(0)\neq0$$. After permuting coordinates, assume that $$\partial_ng(0)\neq0$$; if necessary, reverse the final coordinate so that $$\partial_ng(0)>0$$. Set

$$
\Phi(x^1,\ldots,x^n)
:=(x^1,\ldots,x^{n-1},g(x)).
$$

Its derivative has block form

$$
D\Phi(0)=
\begin{pmatrix}
I_{n-1}&0\\
*&\partial_ng(0)
\end{pmatrix},
$$

so it is invertible. The inverse function theorem makes $$\Phi$$ a diffeomorphism on a smaller neighborhood. The final coordinate of $$\Phi\circ\psi(q)$$ is exactly $$c-f(q)$$. Therefore

$$
(\Phi\circ\psi)(B)
=(\Phi\circ\psi)(V)\cap\overline{\mathbb H}^{\,n}
$$

locally. This proves directly, without using the regular value theorem for fibers, that $$B$$ is a manifold with boundary and that its boundary is $$f^{-1}(c)$$.

Now apply the regular value theorem to this already identified level set. It gives

$$
T_p(\partial B)=\ker d_pf.
$$

The gradient is characterized by

$$
d_pf(v)=(\nabla_pf\mid v)_p,
$$

so $$\nabla_pf$$ is orthogonal to $$\ker d_pf$$ and is nonzero. It remains to choose between the two unit normal directions. Take a curve $$\lambda$$ with

$$
\lambda(0)=p,
\qquad
\dot\lambda(0)=\nabla_pf.
$$

The scalar function $$f\circ\lambda$$ tests whether the curve stays in $$B$$. By the chain rule,

$$
(f\circ\lambda)'(0)
=d_pf(\nabla_pf)
=|\nabla_pf|_p^2>0.
$$

Thus $$f(\lambda(t))>c$$ for sufficiently small $$t>0$$: the curve leaves $$B$$. Hence $$\nabla_pf$$ points outward, and normalization gives the stated formula for $$\nu(p)$$.

</div>

The proof is not circular. The adapted chart first identifies the boundary set as $$f^{-1}(c)$$. The regular value theorem is used only afterward to compute the tangent space of that already identified boundary.

Conversely, every full-dimensional manifold with boundary is locally described by a regular inequality. In an adapted chart $$\varphi=(\varphi^1,\ldots,\varphi^n)$$ around a boundary point, the function

$$
h:=-\varphi^n
$$

satisfies

$$
B\cap U=h^{-1}(( -\infty,0]),
$$

and $$Dh(x)v=-v^n$$ is surjective. Thus the half-space model and a regular inequality are locally equivalent descriptions.

<div class="math-statement math-statement--example" data-statement="example" id="ex-closed-ball" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example</span> <span class="math-statement__title">(The Closed Ball)</span>.</p>

For $$r>0$$, let $$f(x)=|x|^2$$ on $$\mathbb R^n$$. If $$|p|=r$$, then

$$
df_p(v)=2(p\mid v).
$$

Since $$p\neq0$$, this map is surjective onto $$\mathbb R$$. Hence

$$
\overline B_r^n=\{x:|x|\leq r\}
$$

is an $$n$$-dimensional manifold with boundary $$rS^{n-1}$$, and its outward unit normal is

$$
\nu(p)=\frac{p}{|p|}.
$$

</div>

<div class="math-statement math-statement--proposition" data-statement="proposition" id="prop-graph-boundary" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Proposition</span> <span class="math-statement__title">(Boundary of a Graph)</span>.</p>

Let $$B$$ be a manifold with boundary and let $$f:B\to N$$ be smooth. Then

$$
\operatorname{graph}(f)
:=\{(x,f(x)):x\in B\}
$$

is a submanifold with boundary in the product ambient manifold, and

$$
\partial\operatorname{graph}(f)
=\{(x,f(x)):x\in\partial B\}.
$$

</div>

Indeed, the graph parametrization $$x\mapsto(x,f(x))$$ is an injective immersion, and projection onto the first factor is its continuous inverse on the image. It is therefore an embedding, and embeddings preserve the manifold boundary.

<div class="math-statement math-statement--example" data-statement="example" id="ex-rotational-boundary" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example</span> <span class="math-statement__title">(A Rotational Hypersurface with Boundary)</span>.</p>

Let

$$
\gamma:[0,1]\longrightarrow(0,\infty)\times\mathbb R,
\qquad
t\longmapsto\bigl(\rho(t),\sigma(t)\bigr)
$$

be a smooth embedding, and define

$$
f:S^m\times[0,1]\longrightarrow\mathbb R^{m+2},
\qquad
f(q,t)=\bigl(\rho(t)i(q),\sigma(t)\bigr).
$$

The same tangent and injectivity calculation as in the closed rotational example makes $$f$$ an embedding. Since

$$
\partial(S^m\times[0,1])
=S^m\times\{0\}\cup S^m\times\{1\},
$$

the image is a hypersurface with two boundary components,

$$
\partial f(S^m\times[0,1])
=f(S^m\times\{0\})\cup f(S^m\times\{1\}).
$$

</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="thm-one-dimensional-classification" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem</span> <span class="math-statement__title">(Connected One-Dimensional Manifolds)</span>.</p>

A connected one-dimensional manifold with boundary is diffeomorphic to $$[0,1]$$ or $$[0,1)$$. A connected one-dimensional manifold without boundary is diffeomorphic to $$(0,1)$$ or $$S^1$$.

</div>

Locally, an interior point looks like an open interval and a boundary point looks like an endpoint. These local models exclude branching. Globally, connectedness leaves the line, circle, half-open interval, and closed interval types listed above.

## How Does a Partition of Unity Globalize Local Data?

Fix an $$n$$-dimensional manifold $$X$$ and a fixed open cover

$$
\mathcal U:=\{U_\alpha:\alpha\in A\}.
$$

Suppose that a smooth object $$s_\alpha$$ has been constructed separately on every $$U_\alpha$$. We would like to form a global object from the local pieces. The hoped-for expression is

$$
s=\sum_{\alpha\in A}\pi_\alpha s_\alpha,
$$

where each weight $$\pi_\alpha$$ is used only where $$s_\alpha$$ is defined, the sum is locally finite, and the weights add to $$1$$. These requirements lead directly to the definition.

<div class="math-statement math-statement--definition" data-statement="definition" id="def-partition-unity" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition</span> <span class="math-statement__title">(Smooth Partition of Unity)</span>.</p>

A family $$\{\pi_\alpha:\alpha\in A\}$$ is a **smooth partition of unity subordinate to** $$\mathcal U$$ if:

1. $$\pi_\alpha\in C^\infty(X,[0,1])$$ and

$$
\operatorname{supp}(\pi_\alpha)\subset U_\alpha;
$$

2. the family is locally finite: every $$p\in X$$ has an open neighborhood $$V$$ meeting only finitely many supports;
3. for every $$p\in X$$,

$$
\sum_{\alpha\in A}\pi_\alpha(p)=1.
$$

Here

$$
\operatorname{supp}(f)
:=\overline{\{p\in X:f(p)\neq0\}}.
$$

</div>

The support condition guarantees that a nonzero term uses $$s_\alpha$$ only inside its domain. Local finiteness makes the apparently infinite sum a fixed finite sum on a whole neighborhood, so smoothness follows from ordinary finite-sum calculus. The equation $$\sum_\alpha\pi_\alpha=1$$ makes the weights a genuine decomposition of unity.

Pointwise finiteness is not enough. On $$[0,1]$$, place pairwise disjoint intervals so that they accumulate at $$1$$, and place one smooth function of height $$1$$ inside each interval, vanishing outside that interval. At each point at most one function is nonzero. Nevertheless, every neighborhood of $$1$$ meets infinitely many supports. The sum is $$0$$ at $$1$$ but equals $$1$$ at peak points approaching $$1$$, so it is not continuous. Local finiteness excludes exactly this behavior.

<div class="math-statement math-statement--remark" data-statement="remark" id="rem-support-not-compact" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Remark</span> <span class="math-statement__title">(Support Need Not Be Compact)</span>.</p>

For an arbitrary cover, subordination requires

$$
\operatorname{supp}(\pi_\alpha)\subset U_\alpha,
$$

not compact containment. If $$X$$ is noncompact and the cover consists only of $$U_\alpha=X$$, then the partition condition forces $$\pi_\alpha=1$$, whose support is the noncompact set $$X$$. Compactly supported functions appear as local building blocks and in the finite compact-set variant, but not necessarily as the final weights indexed by an arbitrary cover.

</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="thm-partition-unity" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem</span> <span class="math-statement__title">(Existence of Smooth Partitions of Unity)</span>.</p>

Every open cover of a smooth manifold admits a subordinate smooth partition of unity.

</div>

The proof has four stages. Keeping the fixed cover visible throughout prevents the construction from becoming a string of unexplained auxiliary objects.

### Step 1: construct one local cutoff

Fix $$p\in X$$ and first choose a member $$U_\alpha$$ of the fixed cover containing $$p$$. Choose a chart

$$
\varphi:U\longrightarrow\varphi(U)
$$

with $$p\in U\subset U_\alpha$$. In coordinates, choose a compact neighborhood $$K'$$ of $$\varphi(p)$$ with

$$
K'\Subset\varphi(U).
$$

There is a smooth function

$$
\chi'\in C^\infty(\varphi(U),[0,1])
$$

such that

$$
\chi'|_{K'}=1,
\qquad
\operatorname{supp}(\chi')\Subset\varphi(U).
$$

One Euclidean construction is to take the indicator of a slightly enlarged compact set and convolve it with a smooth kernel supported in a sufficiently small ball. The convolution is smooth, remains $$1$$ on the original compact set, and changes only inside the prescribed open neighborhood.

Pulling $$\chi'$$ back by $$\varphi$$ means composing with the chart:

$$
(\varphi^*\chi')(q)=\chi'(\varphi(q)).
$$

Define

$$
\chi(q)=
\begin{cases}
\chi'(\varphi(q)),&q\in U,\\
0,&q\in X\setminus U.
\end{cases}
$$

Because the support of $$\chi'$$ stays away from the edge of $$\varphi(U)$$, extending by zero introduces no loss of smoothness. We have therefore constructed a global smooth cutoff that is positive near $$p$$ and supported inside the preselected cover member $$U_\alpha$$.

### Step 2: exhaust the manifold by compact sets

Choose a countable cover of $$X$$ by relatively compact open sets. Repeatedly use finite subcovers of compact sets to obtain compact sets

$$
K_j\Subset K_{j+1},
\qquad
\bigcup_{j=0}^\infty K_j=X.
$$

This compact exhaustion lets us handle a noncompact manifold one compact layer at a time.

### Step 3: choose finitely many cutoffs on each shell

Set $$K_{-1}:=\varnothing$$ and

$$
W_j:=K_j\setminus\mathring K_{j-1}.
$$

Each $$W_j$$ is compact, the shells cover $$X$$, and shells with indices differing by at least two are disjoint.

For every $$p\in W_j$$, choose a fixed cover member $$U_{\alpha(p)}$$ containing $$p$$. Step 1 produces a cutoff $$\chi_p$$ supported inside $$U_{\alpha(p)}$$ and positive on some neighborhood $$N_p$$ of $$p$$. The family

$$
\{N_p:p\in W_j\}
$$

is an open cover of the compact set $$W_j$$. Compactness therefore gives finitely many points

$$
p_{j,0},\ldots,p_{j,m(j)}
$$

whose neighborhoods cover $$W_j$$. Relabel their cutoffs as $$\chi_{j,i}$$ and record the already chosen cover member by an index $$a(j,i)\in A$$. Thus

$$
\operatorname{supp}(\chi_{j,i})
\subset U_{a(j,i)},
$$

and the positive sets of the finitely many $$\chi_{j,i}$$ cover $$W_j$$.

The cutoffs can also be confined to the band formed by the neighboring shells. Hence near a fixed point only finitely many shell indices occur, and each shell contributes only finitely many cutoffs. The entire family $$\{\chi_{j,i}\}$$ is locally finite.

### Step 4: regroup and normalize

The cutoffs are currently indexed by shell and finite-subcover position. Regroup them according to the fixed original cover:

$$
h_\alpha
:=
\sum_{a(j,i)=\alpha}\chi_{j,i}.
$$

The assignment $$a(j,i)$$ does not decide subordination after the fact. Each cutoff was constructed inside its chosen $$U_{a(j,i)}$$ from the beginning; the assignment merely records and regroups that choice.

Define the raw total

$$
h:=\sum_{j=0}^\infty\sum_{i=0}^{m(j)}\chi_{j,i}
=\sum_{\alpha\in A}h_\alpha.
$$

Local finiteness makes $$h$$ smooth. Since the positive sets cover every shell,

$$
h(p)>0
\qquad(p\in X).
$$

The raw sum need not equal $$1$$ and may exceed $$1$$ where supports overlap. Normalize every group by the same positive denominator:

$$
\pi_\alpha:=\frac{h_\alpha}{h}.
$$

Then $$0\leq\pi_\alpha\leq1$$,

$$
\sum_{\alpha\in A}\pi_\alpha
=\frac{\sum_\alpha h_\alpha}{h}
=1,
$$

and division by $$h$$ does not enlarge the support. The family remains locally finite and satisfies

$$
\operatorname{supp}(\pi_\alpha)\subset U_\alpha.
$$

This completes the construction.

Two useful variants follow from the same mechanism.

1. If a compact set $$K\subset X$$ is covered by finitely many open sets $$U_1,\ldots,U_m$$, there are smooth functions $$\pi_1,\ldots,\pi_m$$ such that

$$
\operatorname{supp}(\pi_j)\Subset U_j,
\qquad
\sum_{j=1}^m\pi_j=1\quad\text{on }K.
$$

To obtain them, add $$U_0:=X\setminus K$$ to make a cover of all of $$X$$ and apply the existence theorem. The weight subordinate to $$U_0$$ vanishes on $$K$$.

2. Replacing smooth maps by $$C^k$$ maps throughout gives a $$C^k$$ partition of unity on every $$C^k$$ manifold, for each positive integer $$k$$.

### Moving a partition from a refinement to the original cover

Suppose

$$
\mathcal V:=\{V_\beta:\beta\in B\}
$$

refines $$\mathcal U$$. Thus there is a map $$j:B\to A$$ such that

$$
V_\beta\subset U_{j(\beta)}.
$$

If $$\{\pi_\beta\}_{\beta\in B}$$ is a partition of unity subordinate to $$\mathcal V$$, define

$$
\nu_\alpha
:=
\sum_{j(\beta)=\alpha}\pi_\beta.
$$

Local finiteness makes each $$\nu_\alpha$$ smooth, and

$$
\operatorname{supp}(\nu_\alpha)
\subset
\bigcup_{j(\beta)=\alpha}\operatorname{supp}(\pi_\beta)
\subset U_\alpha.
$$

Moreover,

$$
\sum_{\alpha\in A}\nu_\alpha
=\sum_{\beta\in B}\pi_\beta
=1.
$$

So regrouping a partition along a refinement map produces a partition subordinate to the coarser cover.

For two arbitrary open covers, first pass to their common refinement

$$
\{U_\alpha\cap V_\beta\}_{\alpha,\beta},
$$

construct a partition there, and then regroup. This is the more general local-to-global mechanism behind the refinement argument.

The six questions now fit into one picture. Charts turn geometric questions into Euclidean ones. Immersions and submersions give the two basic local normal forms, embeddings and regular values turn those local forms into submanifolds, half-space charts extend the theory to boundaries, and partitions of unity combine locally controlled constructions into global smooth objects.
