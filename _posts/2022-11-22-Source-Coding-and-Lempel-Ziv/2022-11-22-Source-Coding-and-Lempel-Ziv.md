---
layout: post
title: "Source Coding and Lempel-Ziv"
commentable: true
protected: false
numbering: false
type:
repopath:
mathjax: true
mermaid: false
highlight: false
toc: true
categories: Info-Theory
tags: [Info-Theory, Source-Coding, Universal-Coding]
keywords: Source-coding Typical-set Lempel-Ziv Entropy-rate
description: Notes on source coding through typicality, polynomial-time coding, variable-rate compression, and Lempel-Ziv coding.
status: Archived
---
We revise the 0-error coding theorem and give a perspective on typicality. Firstly the problem is reformulated into a coding theorem as follows.

## Problem Statement

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-1-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 1.1</span> <span class="math-statement__title">(Coding System)</span>.</p>


A coding system with parameter $$(n,M)$$ consists of an encoder and decoder, where encoder is a function $$e: \mathcal{X}^{n}\to [M]$$ where $$M = 2^{nR}$$, and decoder is a function $$f:[M]\to \mathcal{X}^{n}$$.

We notice that $$e$$ is always a surjection and $$f$$ is always an injection.

</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-1-2" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 1.2</span> <span class="math-statement__title">(Achievable rate in coding system)</span>.</p>


A real number $$R$$ is said to be achievable iff $$\forall \epsilon>0$$, there exists $$N(\epsilon)\in \mathbb{N}$$ s.t. $$\forall n>N(\epsilon)$$ , there exists $$(n,M_{n})$$ coding theorem s.t.

$$
\begin{align}

\frac{\log M_{n}}{n}<&R + \epsilon\\
P(X^{n}\neq f(e(X^{n})))<&\epsilon

\end{align}
$$

Or equivalently,

$$
\begin{align}

\lim\limits_{n \to \infty} \frac{\log M_{n}}{n} = R, \quad \lim\limits_{n \to \infty}P(X^{n}\neq f(e(X^{n}))) = 0

\end{align}
$$

The capacity of the source coding is defined by the infimum of all achievable rates

$$
\begin{align}

C =\inf \{R: R \text{ is achievable}\}

\end{align}
$$

The main result of 0-error data compression is as follows:

<span id="capacity-of-0-error-data-compression"></span>
</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-1-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 1.1</span>.</p>


(Capacity of 0-error Data Compression):<br>
The capacity of 0-error data compression problem with RV $$X$$ is $$H(X)$$.

Some Polytime algorithms is given previously. We now give a new perspective, where the achievability is given by the random mapping over the typical set, while the converse is given by the Fano's inequality.

</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span> <span class="math-statement__title">(Achievability)</span>.</p>


The decoder knows $$e$$ and generates $$f$$ based on received indices.

1. $$e$$ is a surjection: $$e$$ maps $$x^{n}\in A_{\epsilon}^{n}(p_{X})$$ to a unique index, i.e.,$$e\vert _{A_{\epsilon}^{n}(p_{X})}$$ is a bijection. If $$e[A_{\epsilon}^{n}(p_{X})]=[M]$$ and we need $$2^{nH(X) - \epsilon}\leq M \leq 2^{nH(X) + \epsilon}$$ indices. $$e$$ maps other sequences $$x^{n}\in \mathcal{X}^{n} -A_{\epsilon}^{n}(p_{X})$$ to a random index in side the $$e[A_{\epsilon}^{n}(p_{X})]$$.(Or maps them to index $$M + 1$$)
1. $$f$$ is a injection: reconstruct the typical sequence with byjiection $$e\vert _{A_{\epsilon}^{n}(p_{X})}$$. (Or when index is $$M + 1$$ we give the ML estimator sequence).
1. Rate: $$R =\frac{\log M}{n}\to H(X), n\to \infty$$.
1. PoE:

$$
\begin{align}

P_{e} =& P(X^{n}\in A_{\epsilon}^{n}(p_{X})P(error\vert typical) + P(X^{n}\in \mathcal{X}^{n} -A_{\epsilon}^{n}(p_{X})P(error\vert atyp ical)\\
\leq& 1*0 + \epsilon *1 = \epsilon

\end{align}
$$

</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


(Converse): We aim to prove that under what constraints of $$R$$, there is no coding system $$(n,M)$$ that achieves $$R$$. By Fano, $$H(X^{n}\vert m)\leq 1 + P_{e}\log (\vert \mathcal{X}\vert ^{n} - 1)< \epsilon n\log\vert \mathcal{X}\vert $$. i.e., if $$P_{e}$$ is small, there is no much information of original $$X^{n}$$ given the observation at the decoder: $$m\in M$$.

Any coding system $$(n,M)$$ that achieves $$R$$ has the following lower bound

$$
\begin{align}

n(R + \epsilon)>&\log M\\
\geq& H(m)\\
=& H(X^{n}) - H(X^{n}\vert m)\\
\geq & H(X^{n}) - 1 + \epsilon n\log \vert \mathcal{X}\vert \\
=& nH(X) - 1 + n \epsilon \log \vert \mathcal{X}\vert

\end{align}
$$

or, $$R\geq H(X) - \frac{1}{n} - \epsilon(\log \vert \mathcal{X}- 1\vert )\geq H(X) - \epsilon$$ by disturbance iteration (take closer base).

</div>

## Polytime Algorithms

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.1</span>.</p>


Let $$S\subseteq \mathcal{X}^{n}$$

$$
\begin{align}

e_{S}(x^{n}) =& \sum_{j = 1}^{n}x_{j}n_{S}(x_{[j - 1]},0) \\
n_{S}(x_{[j]})  \\
n_{S}(x_{[n]}) =& 1 \text{ if } x_{[n]}\in S \text{ and 0 o.w.}

\end{align}
$$

</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-2" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.2</span> <span class="math-statement__title">(typical-counting ($$A_{\epsilon}^{(n)}(p)$$) Algorithm I: Encoding)</span>.</p>


We focus on Bernoulli process $$p_{X}(1) = p, p_{X}(0) = 1 - p$$ and $$p\leq \frac{1}{2}$$ w.l.o.g. $$W_{\epsilon}^{(n)}(p_{X}) =\{\vert D(Q\Vert p_{X}) + H(Q) - H(p)\vert <\epsilon\}$$, where $$Q(0) = \frac{\# 0s \text{ in }x^{n}}{n}$$. From the formulation we have

$$
\begin{align}

&	\vert (p - q)\log p +(q - p)\log (1 - p)\vert < \epsilon\\
\iff & \vert (q - p)\log \frac{1 - p}{p}\vert <\epsilon\\
\iff  & \vert q - p\vert < \frac{\epsilon}{\log \frac{1 - p}{p}}\\
\iff & np -\frac{n\epsilon}{\log \frac{1 - p}{p}}< \# 1s \text{ in } x^{n}< np + \frac{n\epsilon}{\log \frac{1 - p}{p}}

\end{align}
$$

Then we apply the encoding algorithm

1. Case 1: $$\epsilon = 0$$, then there is $$np$$ 1s in $$\forall x^{n}\in \mathcal{W}_{0}^{(n)}(p) = S$$.

$$
\begin{align}

n_{S}(x_{[j - 1]},0) = \binom{n - j}{np - \sum_{l = 0}^{j - 1}x_{l} } = \binom{n - j}{n(w,j)}

\end{align}
$$

where $$w = np, n(w,j) = w - \sum_{l = 0}^{j - 1}x_{l}$$.

2. Case 2: Arbitrary $$\epsilon$$. $$\mathcal{W}_{\epsilon}^{(n)}(p) = S$$

$$
\begin{align}

n_{S}(x_{[j - 1]},0) = \sum_{t = w - m}^{w + m}\binom{n - j}{n(t,j)}

\end{align}
$$

where $$m =\frac{n\epsilon}{\log \frac{1 - p}{p}}$$

</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.1</span>.</p>


$$n = 4$$, $$w = 2$$, $$m = 0(\epsilon = 0)$$ $$S =\{0011,0101,0110,1001,1010,1100\}$$.

encoder: map $$S$$ to $$\{1,2,3,4,5\}$$

$$
\begin{align}

e_{S}(1001) = \sum_{j = 1}^{n}x_jn_{S}(x_{[j - 1]},0) = x_{1}n_{S}(0) + x_{4} *n_{S}(1000) = x_{1}*\binom{3}{2} + x_{4}*0 = 3 \nonumber

\end{align}
$$

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.1</span> <span class="math-statement__title">(Complexity of $$e_{A_{\epsilon}^{(n)}}$$ Algothrim)</span>.</p>


$$
\begin{align}

\binom{n}{k}\leq n^{k}

\end{align}
$$

where $$k = \Theta (n)$$. There is $$(2k - 1)$$ multiplication, each number is at most $$k\log n$$ bits long. So the complexity is $$O(k^{3}\log ^{2}n) = O(n^{3}\log ^{2}n )$$. The overall worst case complexity is at most $$O(n^{5}\log^{2}n)$$

</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-3" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.3</span> <span class="math-statement__title">($$e_{A_{\epsilon}^{(n)}}$$ Algothrim II: Decoding)</span>.</p>


Given $$S,i$$.

1. If $$i\geq n_{S}(0)$$ then $$x_{1} = 1$$ and $$i\leftarrow i - n_{S}(0)$$. Else $$x_{1} = 0$$

2. For $$j = 2,3,\cdots, n$$, if $$i\geq n_{S}(x_{[j - 1]},0)$$ then $$x_{j} = 1$$ and $$i\leftarrow i - n_{S}(x_{[j - 1]},0)$$ else $$x_{j} = 0$$

</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-2" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.2</span>.</p>


(followed by the last encoding example):
Let $$i = 3$$. First, $$n_{S}(0) =\binom{3}{2} = 3$$. So $$i\geq n_{S}(0)$$, so $$x_{1} = 1$$, $$i\leftarrow 0$$

$$n_{S}(10) =\binom{2}{1} = 2>i$$ so $$x_{2} = 0$$

$$n_{S}(100) =\binom{1}{1} = 1>i$$ so $$x_{3} = 0$$

$$n_{S}(1000) = 0\leq i$$ so $$x_{4} = 1$$

Therefore, the decoder decodes $$3$$ to $$1001$$.

</div>

## Variable-rate Data Compression

Another problem: obtain a coding system containing fixed rate $$R$$. Given an i.i.d. process $$X_{\mathbb{N}}$$. We use the notation $$\mathcal{X}^{<\infty}$$ to represent finite sequence from $$\mathcal{X}$$.

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-3-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 3.1</span> <span class="math-statement__title">(Coding System with parameter $$n$$)</span>.</p>


A coding system with parameter $$(n,M)$$ consists of an encoder and decoder, where encoder is a function $$e: \mathcal{X}^{n}\to \{0,1\}^{<\infty}$$, and decoder is a function $$f:\{0,1\}^{\infty}\to \mathcal{X}^{n}$$. The performance is $$R =\frac{\mathbb{E}[l(e(X^{n}))]}{n}$$ where $$l(\alpha)$$ is the $$\#$$ bits in $$\alpha$$, or the string length.

We notice that $$e$$ is always a surjection and $$f$$ is always an injection.

</div>

## Universal Source Coding: Lempel-Ziv Algorithm

Source coding without knowing the distribution, only knowing the data.

<div class="math-statement math-statement--example" data-statement="example" id="example-4-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 4.1</span>.</p>


We have data from $$\{A,B\}$$: AABABBBABAABABBBABBABB

1. Dictionary: Divide the data by finding new patterns: A.AB.ABB.B.ABA.ABAB.BB.ABBA, and label them with 1,2,3,4,5,6,7,8<br>

2. Add the prefix that occurs before (if any) with their labels. If multiple prefix fits, use the nearest (last) prefix: 0A.1B.2B.0B, 2A, 5B, 4B, 3A, 7<br>

3. Encode into 2 parts: for the $$i$$-th part, the first number $$d(i)$$ is encoded into binary: $$bin(d(i)), d(i)\in [i]$$. Second$$A\to 0$$ and $$B\to 1$$: 0,0 1,1 10,1 00,1 010,0 101,1 100,1 011,0 0111, <br>

4.Encoder sends: 001110100101001011100101100111<br>

5. To decode, first, find the first 2 digits, 00, and decode the second digit 0 into A<br>

6. select the second part, the next 2 digits, 11, and decode the first 1 to the 1-st decodes we made, i.e., A and second 1 to B, i.e., decode AB<br>

7. Keep selecting the $$i$$-th part, the next $$\lceil \log i \rceil + 1$$ digits, and decode the first $$\lceil \log i \rceil$$ digits $$d_{[i]}$$, transfer to the decimal $$d = decimal (d_{[i]})$$, and find the $$d$$-th decoded part, and decode the last digit as $$A$$ if 0 and $$B$$ if 1.

8. Following 7, we decode 4 as A AB ABB B ABA ABAB BB ABBA BB.

How does the Lempel-Ziv algorithm performs? Let us consider i.i.d. $$X_{(n)}\sim Ber (p)$$ be $$n$$ samples. Let $$c(n) =$$the \# of words in the $$n$$ samples, does  has rate $$H(X)$$?

Analysis:

$$
\begin{align}

nH(X) \stackrel{p.}{\leftarrow} - \log P_{X}^{n}(X_{(n)}) =&- \log \prod_{i}P_{X}(x_{i})\\
\stackrel{1}{=}& - \log \prod_{j = 1}^{c(n)}P(Y_{j}) \\
=& - \log \prod_{l}\prod_{j:\vert Y_{j}\vert = l}P(Y_{j})\\
\stackrel{2}{=}& - \sum_{l}\log \prod_{j:\vert Y_{j}\vert = l}P(Y_{j})\\
\geq& \sum_{l}c_{l}\log c_{l} \\
\stackrel{3}{=}& c(n)\log c(n) - c(n)\left[ - \sum_{l}a_{l}\log a_{l}  \right]

\end{align}
$$

1: letting $$Y_{j}$$ be the $$j$$-th phase.

2: $$\sum_{j:\vert Y_{j}\vert = l}P(Y_{j})\leq 1$$, and Cauchy's Inequality: Let $$c_{l} =\vert \{j: \vert Y_{j}\vert = l\}\vert $$. then

$$
\begin{align}

(\prod_{j:\vert Y_{j}\vert = l}P(Y_{j}))^{c_{l}} \leq \frac{1}{c_{l}}\sum_{j:\vert Y_{j}\vert = l}P(Y_{j})\leq \frac{1}{c_{l}}

\end{align}
$$

and

$$
\begin{align}

\frac{1}{c_{l}}\log \prod_{j:\vert Y_{j}\vert = l}P_{Y_{j}}\leq - \log c_{l}

\end{align}
$$

3: normalize $$c_{l}$$ as $$a_{l} =\frac{c_{l}}{c(n)}$$

This implies

$$
\begin{align}

c(n)\log c(n)\leq nH(X) + c(n)H(a_{l})

\end{align}
$$

Our objective is that the penalty $$c(n)H(a_{l})$$ is not too large- Find the UB, that is, to

$$
\begin{align}

\max - \sum_{l}a_{l}\log a_{l} \quad \text{s.t. } \sum_{l}la_{l} = \sum_{l}l\frac{c_{l}}{c(n)} = \frac{n}{c(n)} = A

\end{align}
$$

The answer is $$- \sum_{l}a_{l}\log a_{l} =(A + 1)\log(A + 1) - A\log A = A \log \frac{A + 1}{A} + \log (A + 1)$$.

Then how does $$A$$ behave as $$n\to \infty$$? In LZ Coding, the average coding length $$A$$ gets larger as $$n$$ goes larger.

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-4-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 4.1</span>.</p>


$$A\to \infty$$ as $$n\to \infty$$.

</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


If not, then, $$c(n) \to \theta n$$, then the average phrase length is $$\theta$$, which cannot be true.

Then

$$
\begin{align}

- \sum_{l}a_{l}\log a_{l} =(A + 1)\log(A + 1) - A\log A = &A \log \frac{A + 1}{A} + \log (A + 1)\\
\leq & A\left[ \frac{A + 1}{A}- 1 \right] + \log (A + 1)\\
=& 1 + \log A\\
\approx & \log A

\end{align}
$$

therefore

$$
\begin{align}

\frac{c(n)\log c(n)}{n}\leq H(X) + \frac{\log A}{A}

\end{align}
$$

as $$n\to \infty$$, $$\frac{\log A}{A}\to 0$$, $$\frac{c(n)\log c(n)}{n}\to H(X)$$.

</div>

## Analysis for non-i.i.d. source

Let $$X_{\mathbb{N}}$$ is non i.i.d. but stationary and ergodic.

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-5-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 5.1</span> <span class="math-statement__title">(Entropy rate)</span>.</p>


For $$X_{\mathbb{N}}$$ be a stationary and ergodic random process. The entropy rate of $$X_{\mathbb{N}}$$ is
$$h(X) = \lim\limits_{n \to \infty} \frac{H(X_{(n)})}{n}$$.

</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-5-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 5.1</span> <span class="math-statement__title">(LZ Source coding for $$X_{\mathbb{N}}$$)</span>.</p>


$$
\begin{align}

\frac{c(n)\log c(n)}{n}\to h(X)

\end{align}
$$
</div>
