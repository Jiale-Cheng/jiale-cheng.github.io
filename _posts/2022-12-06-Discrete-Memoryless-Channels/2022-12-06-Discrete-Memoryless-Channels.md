---
layout: post
title: "Discrete Memoryless Channels"
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
tags: [Info-Theory, Channel-Coding, DMC]
keywords: Discrete-memoryless-channel Channel-coding Capacity
description: Notes on discrete memoryless channels, channel capacity, coding theorems, and general channel models.
status: Archived
---
A noisy channel is often seen to describe a randomly distorted mode in transmissions with one input terminal (called the transmission point) and one output terminal (called the receiving point). We interested to transfer as much information reliably as possible. Formal description of "much" and "reliable", we have the following hints:

- For any noisy channels with non-zero transmission error probabilities, any finite sequence (with length $$n<\infty$$) could not eliminate the errors because for any distinct input sequences, there are always more than 1 possible output sequences to be produced. So no matter how the channel coding schemes are performed, reliability for finite sequence is infeasible, so all we can hope for is the asymptotical reliability.
- To measure the information transmitted, we use the information per bit use to denote the average possibilities of codewords when one message (for binary source, the message is one bit) is put into channel. The overall possibilities of codewords is then $$M=\vert \mathcal{X}\vert ^{nR}$$ where the sequence length is $$n$$, message $$X\in\mathcal{X}$$ and $$R=\frac{1}{n}\log M$$ is the information per channel use. $$R$$ has also the rate dimension and we adopt the term rate for $$R$$. E.g. for binary repetition code with block length $$n$$, the rate $$R=\frac{1}{n}\log 2=\frac{1}{n}\to 0$$. However, we can achieve the positive asymptotic rate later.

## Definition of DMC

**Definition.**

(Discrete Channel):<br>
Let $$\mathcal{X},\mathcal{Y}$$ be discrete alphabets and $$p(y\vert x)$$ be the transition matrix from $$\mathcal{X}$$ to $$\mathcal{Y}$$. We call $$p(y\vert x)$$ be a discrete channel with input $$X\in\mathcal{X}$$ and output $$Y\in\mathcal{Y}$$ s.t. $$p_{XY}(x,y)=p_X(x)p(y\vert x)$$.

In information theory we use the probabilistic model to describe a discrete channel.  (*Note:* However in recent channels with controllable system (e.g. Reconfigurable Intelligent Surface, RIS), the model is no longer suitable.) To explicitly show the noise as an RV, we do the followings.

Consider $$p(y\vert x)$$ is a DC with input $$X\in\mathcal{X}$$ and $$Y\in\mathcal{Y}$$. We denote $$Z_x=(Y\vert X=x)$$ with definition

$$
\begin{align}

\mathcal{Z}_x=\mathcal{Y},\quad Pr\{Z_x=y\}=p(y\vert x).

\end{align}
$$

Suppose $$\{Z_x\}_{x\in\mathcal{X}}$$ are independent, we call $$Z=\{Z_x\}_{x\in\mathcal{X}}$$ the **noise variable**. Moreover, we need an explicit expression of $$Y$$ as a function of $$(X,Z)$$.  In fact, $$Y=Z_x,\forall x\sim p_X$$. Alternatively, for any functions $$Y=\alpha(X,Z)$$,

$$
\begin{align}

p_{XY}(x,y)=&Pr\{X=x,\alpha(X,Z)=y\}=Pr\{X=x\}Pr\{\alpha(X,Z)=y\vert X=x\}\\
=& Pr\{X=x\}Pr\{\alpha(x,Z)=y\}

\end{align}
$$

by defining $$Pr\{\alpha(x,Z)=y\}=p(y\vert x)$$ we show that $$Y=\alpha(X,Z)$$ is a discrete channel.

**Definition.**

(Alternative Definition of Discrete Channel):<br>
Let $$\mathcal{X},\mathcal{Y},\mathcal{Z}$$ be discrete alphabets and $$\alpha:\mathcal{X}\times\mathcal{Z}\to\mathcal{Y}$$. We call $$(\alpha,Z)$$ be a discrete channel with input $$X\in\mathcal{X}$$ and output $$Y\in\mathcal{Y}$$ iff $$Z\in \mathcal{Z}$$ is independent from $$X$$, and that $$Y$$ can be calculated by $$Y=\alpha(X,Z)$$.

By the above relation, we have:

**Lemma.**

(Equivalence of DC definitions):<br>
The discrete channel $$p(y\vert x)$$ and $$(\alpha,Z)$$ defined on the same alphabets $$\mathcal{X},\mathcal{Y}$$ are called equivalent iff

$$
\begin{align}

Pr\{\alpha(x,Z)=y\}=p(y\vert x),\quad \forall x\in\mathcal{X}, y\in\mathcal{Y}.

\end{align}
$$

When the input from the channel $$p(y\vert x)$$ is a sequence, the interference of previous inputs may affect the current transmission. An ideal model is to ignore the interference (*Note:* For alternative perspective, the noises of DMC in different time indices are independent.), in which we consider "memoryless".

**Definition.**

(Discrete Memoryless Channel, DMC):<br>
A discrete channel is called memoryless iff $$\forall n\geq 1$$, the input sequence $$X_{[n]}$$ and output sequence $$Y_{[n]}$$ satisfies:

$$
\begin{align}

p(y_{[n]}\vert x_{[n]})=\prod_{i=1}^{n}p(y_i\vert x_i)

\end{align}
$$

(*Note:* "Discrete" here means not only that the alphabets are discrete values, but that the sequences arrive in discrete-time instantaneously.)

**Lemma.**

Let $$p(y\vert x)$$ be a DC, for any $$i\geq1$$, let $$T_{i^-}$$ be the RVs generated before $$X_i$$. Then the following is equivalent:

1. $$p(y\vert x)$$ is a DMC,
1. $$T_{i^-}\to X_i\to Y_i$$ forms a Markov chain,
1. the DC $$(\alpha, Z)$$ at all time indices $$i\in\mathbb{N}$$ forms a sequence of replicates of generic DC $$(\alpha, Z)$$, with $$Z_i$$ independent from $$(X_i,T_{i^-})$$ and $$Y_i=\alpha(X_i,Z_i)$$

**Proof.**

- $$1\to2$$. By the definition of DMC,

$$
\begin{align}

p(x_{[i]},y_{[i]})=&p(x_{[i]})\prod_{j=1}^{i}p(y_j\vert x_j)=p(x_{[i-1]},y_{[i-1]})p(x_i)p(y_i\vert x_i)\\
=&p(x_{[i]},y_{[i-1]})p(x_i)p(y_i\vert x_i)

\end{align}
$$

then $$T_{i^-}(=\{X_{[i-1]},Y_{[i-1]}\})\to X_i\to Y_i$$ is a Markov chain.
- $$2 \to 3$$. For a DC where $$Y_i=\alpha(X_i,Z_i)$$, we prove that $$Z_i$$ is independent from $$(X_i,T_{i^-})$$. We have the following Markov chain:

$$
\begin{align}

(X_i,Z_i)\to Y_i \to X_i \to (Y_{[i-1]},X_{[i-1]}) \to (X_{[i-1]},Z_{[i-1]})

\end{align}
$$

then

$$
\begin{align}

I(Z_i;X_i,T_{i^-})\leq& I(Y_i;Y_{[i-1]},X_{[i-1]})=I(Y_i;Y_{[i-1]},X_{[i-1]}\vert X_i)=0

\end{align}
$$

- $$3\to 1$$. By induction on:

$$
\begin{align}

p(y_{[n]},x_{[n]})=&p(\alpha(x_n,z_n),y_{[n-1]},x_{[n]})\stackrel{(1)}{=}p(\alpha(x_n,z_n),x_n)p(y_{[n-1]},x_{[n-1]})\\
=& p(y_n,x_n)p(y_{[n-1]},x_{[n-1]})=\cdots=\prod_{i=1}^{n}p(y_i\vert x_i)

\end{align}
$$

where (1) is from $$(X_n,Z_n)$$ independent from $$T_{n^-}=(Y_{[n-1]},X_{[n-1]})$$

For DMC $$(c,Z)$$, we can control the distribution of $$X$$ to get a related distribution of $$Y = c(X,Z)$$. One nature property of the DMC is, to what extent, the $$X,Y$$ could be dependent through the channel. The following definition quantify this value.

**Definition (Capacity of DMC).**

$$
\begin{align}

C_{I} = \max_{X\sim p(\cdot)}I(X;Y)

\end{align}
$$

**Example.**

(Typical Channels):<br>
1. For any DMC $$X\to Y$$,

$$
\begin{align}

0\leq C\leq \min \{\log\vert \mathcal{X}\vert ,\log\vert \mathcal{Y}\vert \}.

\end{align}
$$

2. For Binary Symmetric Channel (BSC) with error probability $$\epsilon$$, the system can be described as:

$$
\begin{align}

Y=\alpha(X,Z)=X+Z \text{ mod }2,\quad Z\sim Ber(\epsilon)

\end{align}
$$

then the capacity of BSC can be derived:

$$
\begin{align}

I(X;Y)=H(Y)-H(Y\vert X)=H(Y)-H(Z)&\leq 1-H(Z),\quad\nonumber\\
&\text{w.e.iff } X\sim U(\{0,1\})

\end{align}
$$

3. For Binary Erasure Channel (BEC) with erasure probability $$\eta$$, the system can be described as:

$$
\begin{align}

Y=\alpha(X,Z)=\begin{cases}X,\quad & Z=0\\mathrm{e},\quad& Z=1 \end{cases},\quad Z\sim Ber(\eta)

\end{align}
$$

notice that $$Z$$ then can be a function of $$Y$$ as $$Z=\delta_{Y-e}$$, the capacity of BEC is:

$$
\begin{align}

C=&\max_{p(x)}I(X;Y)=\max_{p(x)}(H(Y)-H(Y\vert X))=\max_{p(x)}(H(Y)-H(Z))\\
=&max_{p(x)}(H(Y,Z)-H(Z))=max_{p(x)}(H(Y\vert Z))=max_{p(x)}(1-\eta)H(X)\leq 1-\eta,\quad\nonumber\\
&\qquad \qquad\qquad\qquad \qquad\qquad\qquad \qquad\qquad\qquad\qquad\text{w.e.iff } X\sim U(\{0,1\})

\end{align}
$$

## Problem Statement

We start with define the channel coding process.

**Definition (Channel Code).**

A $$(n,M)$$ channel code for DMC $$P_{Y\vert X}$$ is defined with an encoder $$f$$ and decoder $$g$$ s.t.

$$
\begin{align}

f: [M]\to \mathcal{X}^{n}, \text{ or }& \quad f:W\mapsto X^{n} \\
g:\mathcal{Y}^{n}\to [M], \text{ or }& g: Y^{n}\mapsto \hat{W}

\end{align}
$$

where $$n$$ is called the block length, $$\{f(w)\}_{w\in[M]}$$ is called codewords, $$M$$ is called number of codewords, RV $$W\sim \mathcal{U}([M])$$ is called message. If $$Y_{(n)}$$ is generated with $$X_{(n)}$$ via a DMC, the code is called a DMC code.

In real channel coding, we do not know the prior probability of $$W$$, since every possible value could be possible, therefore, we consider the uniform case in which no further information can be exploited from $$W$$.

Our goal is to transmit as many messages as possible per channel use, i.e., for a $$(f,g)$$, if there is $$r$$ messages perfectly decoded by $$g$$ with one $$\mathcal{X}$$ to $$\mathcal{Y}$$ channel, then $$r$$ shows the capability of that channel.

**Definition (Probability of error and Rate).**

Let $$P_{e}(w) = P(\hat{W} \neq w\vert W = w)$$, then we define two kinds of probability of error:

- Maximal poe: $$P_{m} =\max_{w\in[M]}P_{e}(w)$$
- Average PoE: $$P_{e} = \frac{1}{M}\sum_{w\in[M]}P_{e}(w) = P(W\neq \hat{W})$$.

A rate $$R$$ is said to be achievable for a $$DMC$$ is $$\forall \epsilon>0$$, $$\exists N = N(\epsilon)$$ s.t. $$\forall n>N(\epsilon)$$, there exists a $$(n,M)$$ code s.t. $$\frac{\log M}{n}>R - \epsilon$$ and $$P_{m}<\epsilon$$. The capacity of a DMC is $$C = sup_{R \text{ is achievable}} R$$

(*Note:* Obviously $$P_{e}\leq P_{m}$$, therefore, by bounding $$P_{m}\to 0$$ we actually bound both.)

(*Note:* by the definition of $$R$$, the meaning is the information transmitted per channel use, where we call the single-letter characterization.)

<span id="channeltheo"></span>
**Theorem (Channel Coding Theorem).**

The capacity for any DMC $$P_{Y\vert X}$$ is

$$
\begin{align}

C =\max_{X\sim p(\cdot)}I(X;Y) = C_{I}

\end{align}
$$

i.e., $$R$$ is achievable iff $$R\leq C$$.

**Proof.**

We can simplify it like:

$$
\begin{align}

C \geq C_{I}: \quad \text{Achievability}\\
C\leq C_{I}:\quad \quad \text{Converse}

\end{align}
$$

more constructively,

1. Achievability: $$C_{I}$$ is achievable, or, for any input distribution $$X$$, there exists a $$(n,M)$$- DMC code s.t. $$\forall \epsilon>0$$, there exists $$N(\epsilon)$$ s.t. $$\forall n\geq N(\epsilon)$$, $$\frac{\log M}{n}> I(X;Y) - \epsilon$$ and $$P_{m}< \epsilon$$.
1. Converse: Any rate that larger than $$C_{I}$$ is not achievable, i.e., for all $$(n,M)$$- DMC code  $$\forall \epsilon > 0$$, $$\exists N(\epsilon)$$ s.t. $$\forall n\geq N(\epsilon)$$, $$P_{e}< \epsilon$$, then $$\frac{\log M}{n}< C + \epsilon$$

## Proof of Theorem the Channel Coding Theorem: Converse

In converse, suppose $$R$$ is achievable, we prove $$R\leq C$$ for all $$(n,M)$$ code:

$$
\begin{align}

nR\leq& \log M + n\epsilon\\
=& H(M) + n\epsilon\\
\stackrel{a}{=}& I(M;Y^{n}) + H(M\vert Y^{n}) + n\epsilon\\
\leq & I(M;Y^{n}) + h(P_{e}) + P_{e}\log M + n\epsilon\\
= & I(M,X^{n};Y^{n}) + h(P_{e}) + P_{e}\log M + n\epsilon\\
\stackrel{b}{=} & I(X^{n};Y^{n}) + h(P_{e}) + P_{e}\log M + n\epsilon\\
=& H(Y^{n}) - \sum_{i}H(Y_{i}\vert Y^{i - 1},X^{n}) + h(P_{e}) + P_{e}\log M + n\epsilon\\
\stackrel{c}{=}& H(Y^{n}) - \sum_{i}H(Y_{i}\vert Y^{i - 1},X^{i}) + h(P_{e}) + P_{e}\log M + n\epsilon\\
\stackrel{d}{=}& H(Y^{n}) - \sum_{i}H(Y_{i}\vert X_{i}) + h(P_{e}) + P_{e}\log M + n\epsilon\\
\leq &\sum_{i}I(Y_{i};X_{i}) + h(P_{e}) + P_{e}\log M + n\epsilon\\
\leq &n\max_{P_{X}}I(X;Y) + h(P_{e}) + nP_{e}\log \vert \mathcal{X}\vert  + n\epsilon

\end{align}
$$

where in (a) the $$H(M\vert Y^{n})$$ is the penalty term, we can bound it with Fano's Inequality, and in (b), the equality is because $$W\to X^{n}\to Y^{n}$$ is a Markov Chain. (c) is because there is no feedback, (d) is because it is a memoryless channel.

### Analysis Inequality: How can we make a good channel code

By letting the inequality be equality, we can analysis what a good channel will be like.

1. The first inequality: Trivial, based on the definition of rate
1. The second inequality: Fano's inequality.
1. The third inequality: The output of a DMC channel, tough input $$X^{n}$$ seems not be memoryable, will be memoryless.

## Proof of Theorem the Channel Coding Theorem: Achievability

### One-shot Channel Coding: use the channel only once

We want a $$(1,M)$$ code here, where $$M = 2^{R}$$ is a integer. With a given a random encoder

$$
\begin{align}

f(i) = x_{i}, \quad i\in[M],

\end{align}
$$

where $$x_{i}$$ are randomly chosen with $$P_{X}$$.

With the given $$P_{X}$$ and channel $$P_{Y\vert X}$$, we know $$P_{XY}$$ and $$P_{X}P_{Y}$$.

what's the decoder? The best is MAP decoder. But a little complicated. We know that at the decoder we receive $$y$$ and we want to check if $$y$$ is generated with $$x_{i}$$ or not. Equivalently, we want to check $$(x_{i},y)$$ follows $$P_{0}:P_{XY}$$ or $$P_{1}:P_{X}P_{Y}$$.  We use the N-P test as the decoder, with the $$A$$ be the NP refuse region that $$A =\{(X_{i},Y)\sim P_{XY}\}$$. Then, FA $$\alpha = P_{0}(A^{C}) = 1 - P_{XY}(A),$$, and ND $$\beta = P_{1}(A)$$.

Let $$B =\{i: (x_{i},y)\in A\}$$

$$
\begin{align}

g(y) = i,\quad \text{ if } B =\{i\}\\
g(y) = error \quad\text{ o.w. }

\end{align}
$$

**Example.**

Let $$M = 3$$, message $$W = i$$ is sent. Let $$E_{j}$$ is the event that $$(x(j),y)\in A$$. We draw a Venn diagram of $$E_{[3]}$$. Then

$$
\begin{align}

P(Error\vert M = i) =& P[E_{i}^{C}\cup \bigcup_{j\neq i}E_{j}\vert W = i]\\
\leq& P(E_{i}^{C}\vert W = i) + \sum_{i\neq j}P(E_{j}\vert W = i)

\end{align}
$$

To proceed further, we need to specify an encoder in a randomly way, and consider the average way.

(Encoder): Construct an enumerate of encoders as follows:

$$
\begin{align}

X(1),\cdots, X(M)\stackrel{i.i.d.}{\sim}P_{X}

\end{align}
$$

and reveal the realizations $$x_{(M)}$$ to the decoder.

(Decoder): the NP test with refuse region A.

We analyze the performance:

Then if $$W = i$$, $$(X(i),Y)\sim P_{XY}$$

$$
\begin{align}

P(E_{i}^{C}\vert W = i) = P_{XY}(A^{C}) = \alpha

\end{align}
$$

also, if $$W = i$$, $$(X(i),Y,X(j)) \sim P_{XY}P_{X}$$, $$(X(j),Y)\sim P_{X}P_{Y}$$

$$
\begin{align}

P(E_{j}\vert W = i) = P_{X}P_{Y}(E_{j}) = \beta

\end{align}
$$

then

$$
\begin{align}

P(\text{error}\vert W = i) \leq & \alpha + (M - 1)\beta\\
P_{e} =&\frac{1}{M}\sum_{i = 1}^{M}P(\text{error}\vert W = i) \leq \alpha +(2^{R} - 1)\beta

\end{align}
$$

Next step, Non-Bayesian HT (n-shot), notice that

$$
\begin{align}

\alpha_{n} \to & 0,\\
\beta_{n}\stackrel{R}{\to}& -D(P_{XY}\Vert P_{X}P_{Y}) = -I(X;Y)\\
P_{e} =& o(1) +(M - 1)2^{- nI(X;Y)}\to 0

\end{align}
$$

therefore when $$M = 2^{nR}$$, and we have

$$
\begin{align}

R < I(X;Y)

\end{align}
$$

the achievability will give $$P_{e}\to 0$$, i.e., $$I(X;Y)$$ is achievable.

### Examples of one-shot

## General Description of Channel

Feedback is common in the real-life transmission, like media transmission

**Definition (Generalized Definition of Channel).**

A channel is characterized by a sequence of conditional distributions:

$$
\begin{align}

P_{Y_{1}\vert X_{1}}, P_{Y_{2}\vert X_{1}X_{2}Y(1)}\cdots P_{Y_{k}\vert X_{(k)}Y_{(k - 1)}}, \cdots

\end{align}
$$

**Example.**

$$Y_{n} = \sum_{i = 0}^{K}\alpha_{i}x_{n - i} + \sum_{j = 1}^{L}\beta_{j}X_{n - j} + Z$$, is called a ARMA channel, where the first part is the FIR or $$MA(K - 1)$$ part, while the second is called the IIR, or $$AR(L)$$ part.

the nature question:

1: Code we do: use feedback v.s. no feedback: do we use $$Y_{[i - 1]}$$ in designing codes for $$X_{i}$$: if we use $$\{Y_{i}\}_{[i - k:i - 1]}$$ as feedback, it is called the $$k$$-depth feedback.

2: Channel (the nature): memory v.s. memoriless

**Definition (Encoder in general channel).**

An encoder  with (full) feedback with parameter $$(n,M)$$ is a sequence of functions for $$i = 1,2,\cdots n$$

$$
\begin{align}

f_{i}:[M]\times \mathcal{X}^{i - 1} \mathcal{Y}^{i - 1}\to \mathcal{X}

\end{align}
$$

or we can assume the message $$W\sim \mathcal{[M]}$$, then

$$
\begin{align}

f_{i}: (W,Y_{(i - 1)},,X_{(i - 1)})\mapsto X_{i}

\end{align}
$$

**Definition (Timeline).**

$$
\begin{align}

W, X_{1}, Y_{1}, X_{2}, Y_{2}, X_{3}, Y_{3}, \cdots

\end{align}
$$

where for full feedback in memorable channels, any RV here are determined/ with post-probability with all previous RVs.

**Axiom (Channel's Assumption).**

1. 	Channels do not look at $$W$$, i.e.

$$
\begin{align}

W\to (X_{(i)},Y_{(i - 1)})\to Y_{i}

\end{align}
$$

2. Encoder is deterministic:

$$
\begin{align}

P_{X_{i}\vert X_{(i - 1)},,Y_{(i - 1)},W} = \mathbb{I}_{\{X_{i} = f_{i}(W,Y_{(i - 1)})\}}

\end{align}
$$

(*Note:* It is worth noticing that the Assump2. do not mean any Markov Chain assumption, {true?, since $$X_{i}$$ is related  to $$X_{(i - 1)}$$, but only through $$Y_{(i - 1)}$$} )

with these assumption, we can characterize the PMF:

**Theorem.**

$$
\begin{align}

&	P_{W}P_{X_{1}\vert W}P_{Y_{1}\vert X_{1}}P_{X_{2}\vert X_{1}Y_{1}W}\cdots\\
=& P_{W}\mathbb{I}_{\{X_{1} =f_{1}(W)\}}P_{Y_{1}\vert X_{1}}\mathbb{I}_{\{X_{2} = f_{2}(Y_{1},W)\}}\cdots\\
=& P_{W}\prod_{i = 1}^{n}\mathbb{I}_{\{X_{i} = f_{i}(M,Y_{(i - 1)})\}}\prod_{i = 1}^{n}P_{Y_{i}\vert X_{(i)},Y_{(i - 1)}}

\end{align}
$$

**Definition (No-Feedback Condition).**

An encoder has no feedback if

$$
\begin{align}

Y_{(i - 1)}\to (W,X_{(i - 1)})\to X_{i}

\end{align}
$$

or

$$
\begin{align}

P_{X_{i}\vert X_{(i - 1)},W,Y_{(i - 1)}} = \mathbb{I}_{\{X_{i} = f_{i}(W)\}}

\end{align}
$$

**Lemma.**

No feedback condition is equivalent to (simple condition)

$$
\begin{align}

Y_{(i - 1)}\to X_{(i - 1)}\to X_{i}

\end{align}
$$

**Proof.**

We aim to compute the encoder $$P_{X_{n}\vert X_{(n - 1)}Y_{(n - 1)}}$$ to look if the encoder use feedback.

$$
\begin{align}

P_{X_{n}\vert X_{(n - 1)}Y_{(n - 1)}} =& \frac{P_{X^{n}Y^{n - 1}}(x_{(n)}y_{(n - 1)})}{P_{X^{n - 1}Y^{n - 1}}(x_{(n - 1)},y_{(n - 1)})}\\
=&\frac{\sum_{j}P_{M}(j)\left[ \mathbb{I}_{\{x_{(n)} = f^{n}(j,y_{(n - 1)})\}}\prod_{i = 1}^{n - 1}P_{Y_{i}\vert Y_{(i - 1)}X_{(i - 1)}}(y_{i}\vert y_{(i - 1)}x_{(i - 1)})  \right]}{\sum_{j}P_{M}(j)\left[ \mathbb{I}_{\{x_{(n - 1)} = f^{n -1}(j,y_{(n - 2)})\}}\prod_{i = 1}^{n - 1}P_{Y_{i}\vert Y_{(i - 1)}X_{(i - 1)}}(y_{i}\vert y_{(i - 1)}x_{(i - 1)})\right]}\\
=& \frac{\sum_{j}P_{M}(j)\left[ \mathbb{I}_{\{x_{(n)} = f^{n}(j,y_{(n - 1)})\}}  \right]}{\sum_{j}P_{M}(j)\left[ \mathbb{I}_{\{x_{(n - 1)} = f^{n -1}(j,y_{(n - 2)})\}}\right]}

\end{align}
$$

First prove that: No feedback condition $$\to$$ simple condition

$$
\begin{align}

P_{X_{n}\vert X^{n - 1}Y^{n - 1}} =& \frac{\sum_{j}P_{M}(j)\left[ \mathbb{I}_{\{x_{(n)} = f^{n}(j)\}}  \right]}{\sum_{j}P_{M}(j)\left[ \mathbb{I}_{\{x_{(n - 1)} = f^{n -1}(j)\}}\right]}\\
=& \frac{\sum_{j}\left[ \mathbb{I}_{\{x_{(n)} = f^{n}(j)\}} \right]}{\sum_{j}\left[ \mathbb{I}_{\{x_{(n - 1)} = f^{n -1}(j)\}}\right]}

\end{align}
$$

so $$Y^{n - 1}\to X^{n - 1}\to X_{n}$$.

Second prove that: Simple condition $$\to$$ No-feedback condition. We prove that if the encoder uses at least one feedback, the simple condition does not hold. We denote $$n$$ the first time using feed back, then

$$
\begin{align}

P_{X_{n}\vert X_{(n - 1)}Y_{(n - 1)}} =&	\frac{\sum_{j}\left[ \mathbb{I}_{\{x_{(n - 1)} = f^{n - 1}(j)\}} \mathbb{I}_{x_{n} = e_{n}(j,y^{j - 1})} \right]}{\sum_{j}\left[ \mathbb{I}_{\{x_{(n - 1)} = f^{n -1}(j)\}}\right]}

\end{align}
$$

therefore, $$Y^{n - 1}\to X^{n - 1}\to X_{i}$$ is not true.

**Definition (Causality Condition).**

the channel is causal if the channel generate $$Y_{i}$$ without looking on future inputs $$X_{(i + 1:n)}$$:

$$
\begin{align}

P_{Y_{i}\vert X_{(n)}Y_{(i - 1)}} = P_{Y_{i}\vert X_{(i)}Y_{(i - 1)}}

\end{align}
$$

or

$$
\begin{align}

X_{(i + 1:n)}\to (X_{(i)},Y_{(i - 1)})\to Y_{i}

\end{align}
$$

Channel causality and encoder feedback has

**Theorem.**

Causality condition is equivalent to no-feedback condition.

**Definition (Memoriless Condition).**

A channel is said to be memoriless if

$$
\begin{align}

(X_{(i - 1)},Y_{(i - 1)})\to X_{i} \to Y_{i}

\end{align}
$$

**Lemma (DMC Channel).**

A DMC channel is a memoryless channel with discrete space $$\mathcal{X},\mathcal{Y}$$, without feedback, then we have

$$
\begin{align}

P_{Y_{(n)}\vert X_{(n)}} =\prod_{i\in(n)} P_{Y_{i}\vert X_{i}}

\end{align}
$$

**Proof.**

$$
\begin{align}

P_{Y_{(n)}\vert X_{(n)}} =\frac{P_{X_{(n)}Y_{(n)}}}{P_{X_{(n)}}} \stackrel{(a)}{=}& \frac{\prod_{i\in(n)} P_{X_{i},Y_{i}\vert X_{(i - 1)}Y_{(i - 1)}}}{\prod_{i\in(n)} P_{X_{i}\vert X_{(i -1)}}}\\
=& \frac{\prod_{i\in(n)} P_{X_{i}\vert X_{(i - 1)}Y_{(i - 1)}}P_{Y_{i}\vert X_{(i)}Y_{(i - 1)}}}{\prod_{i\in(n)} P_{X_{i}\vert X_{(i -1)}}}\\
\stackrel{(b)}{=}&\frac{\prod_{i\in(n)} P_{X_{i}\vert X_{(i - 1)}}P_{Y_{i}\vert X_{(i)}Y_{(i - 1)}}}{\prod_{i\in(n)} P_{X_{i}\vert X_{(i -1)}}}\\
\stackrel{(c)}{=}&\frac{\prod_{i\in(n)} P_{X_{i}\vert X_{(i - 1)}}P_{Y_{i}\vert X_{i}}}{\prod_{i\in(n)} P_{X_{i}\vert X_{(i -1)}}}\\
=& \prod_{i\in(n)} P_{Y_{i}\vert X_{i}}

\end{align}
$$

where
b: no-feedback condition (causality), or simple condition<br>
c: memoryless condition.

**Example.**

Consider 2 channels  with $$Y_{(n)} = X_{(n)} + Z_{(n),1}$$ and $$Y_{(n)} = X_{(n)} + Z_{(n),2}$$, where $$X\sim Ber(\frac{1}{2})$$, $$Z_{i}\sim Ber(p_{i})$$, $$Z_{1},Z_{2},X$$ independent.

$$P_{Y_{1}\vert X_{1}}\iff Y_{1} = X_{1} + Z_{1}$$, $$P_{Y_{2}\vert X_{1}X_{2}Y_{1}}$$ defined by $$Y_{2} = X_{2} + Z_{2}$$ in this way the channel is memoryless.

Consider the encoder $$X_{1}\sim Ber(1/2)$$, $$X_{2} = Y_{1}$$, then

$$
\begin{align}

P(Y_{1} = 1\vert X_{1} = 0) =& p\\
P(Y_{2} = 1\vert X_{1} = 0) =&p\\
P(Y_{1} = 1,Y_{2} = 1\vert X_{1} = 0,X_{2} = 0) =& 0

\end{align}
$$

they do not satisfy the DMC condition because the encoder uses feedback, introducing non-causality.

**Definition (Stationary DMC).**

A DMC is stationary if

$$
\begin{align}

P_{Y_{i}\vert X_{i}} = P_{Y\vert X}

\end{align}
$$

so the problem formulation for the DMC channel is actually discrete, memoryless, stationery channel without feedback. We give the problem same as the previous sections

**Definition ($$(n,M)$$ DMC code).**

A coding system $$(n,M)$$ for a MDC $$P_{Y\vert X}$$ is a pair of mapping $$(f,g)$$:

$$
\begin{align}

f: [M]\to \mathcal{X}^{n}, \text{ or }& \quad f:W\mapsto X^{n} \\
g:\mathcal{Y}^{n}\to [M], \text{ or }& g: Y^{n}\mapsto \hat{W}

\end{align}
$$

where $$n$$ is called the block length, $$\{f(w)\}_{w\in[M]}$$ is called codewords, $$M$$ is called number of codewords, RV $$W\sim \mathcal{U}([M])$$ is called message. and metrics:

$$
\begin{align}

\text{Rate: }& R =\frac{\log M}{n}\\
\text{Probability of error: }&\max_{w\in[M]}\sum_{w\in [M]}P(g(Y^{n})\neq w\vert X^{n} = f(w)) = P_{m}\\
&	\geq P_{e} = \frac{1}{M}\sum_{w\in [M]}P(g(Y^{n})\neq w\vert X^{n} = f(w))\\
&\stackrel{(a)}{=}P(\hat{W}\neq W)

\end{align}
$$

where in $$(a)$$ we assume $$W\sim \mathcal{U}([M])$$

This problem is like a $$M$$-ary Hypothesis testing, where the encoder chooses $$M$$ sequences in $$\mathcal{X}^{n}$$, and decoder is to find $$M$$ decision region.

**Definition (Channel Code with (1-depth) feedback).**

A $$(n,M)$$ channel code with MA(1) feedback for DMC $$P_{Y\vert X}$$ is defined with an encoder $$f$$ and decoder $$g$$ s.t.

$$
\begin{align}

f: [M]\times \mathcal{Y}\to \mathcal{X}^{n}, \text{ or }& \quad f:(W,Y_{n - 1})\mapsto X^{n} \\
g:\mathcal{Y}^{n}\to [M], \text{ or }& g: Y^{n}\mapsto \hat{W}

\end{align}
$$

where $$n$$ is called the block length, $$\{f(w)\}_{w\in[M]}$$ is called codewords, $$M$$ is called number of codewords, RV $$W\sim \mathcal{U}([M])$$ is called message. If $$Y_{(n)}$$ is generated with $$X_{(n)}$$ via a DMC, the code is called a DMC code.

### Polynomial-time: Polar Code
