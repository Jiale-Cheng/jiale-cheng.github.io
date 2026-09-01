---
title: Shannon Information Measures
commentable: true
protected:
numbering: false
type:
repopath:
mathjax: true
categories: Info-Theory
tags: [Entropy, Information-Inequalities]
keywords: entropy relative-entropy mutual-information
description: Notes on entropy, relative entropy, mutual information, information inequalities, and their extensions to continuous random variables.
status: Archived
---


## Introduction to Information Theory

Information is put forward in communication systems where we convey messages from a set of sources to another set of destinations, often in a noisy environment. Apparently, we wonder the limitations of transferring, i.e., the maximum amount of meaningful information that can be conveyed on a given system.

The first thing is the definition of information. As information is a conceptual existence without a physical entity, human factors may be brought in some imprecise definitions. In 1948, Claude E. Shannon gives a new point of view on the measure of information. First, *information is uncertainty*. Deterministic information has no value at all. So we always model a information source as a random variable or random process, and probability is employed into picture. Second, *information to be transmitted is digital*. We use "bit" to denote a binary digit in a transmission. The above 2 principles are the foundation of all modern digital communication systems.

After we know the essence of information and the way it transmits, we try to get the limitation in the information transmission. Shannon also proved 2 important theorems in the same work. The first is *source coding theorem*, which introduces entropy as the fundamental measure of information which characterizes the minimum rate of a source code representing an information source essentially free of error. The second theorem, called the *channel coding theorem*, shows that associated with every noisy channel is a parameter, called the capacity, such that information can be communicated reliably through the channel as long as the information rate is less than the capacity. These two theorems, which give fundamental limits in point-to-point communication, are the two most important results in information theory.

After Shannon published his original paper in 1948, information theory has been developed into a major field in communication and probability.


## Measures of Information


### Basic Measures of Information


#### Independence and Markov Chains

Basic probability concepts and conclusions are needed in the forehead of information theory learning.

We always denote the random variable by **CAPITAL**s, e.g., $$X,Y,Z, \cdots$$ and the implementation by **lower-case**s, $$x\in\mathcal{X}$$, $$y\in\mathcal{Y}$$, $$z\in\mathcal{Z}, \cdots$$. The $$P_X$$ (resp. $$P_y$$, $$P_Z$$) is used to denote the probability function of $$X$$ (resp. $$Y$$, $$Z$$): $$P_X(\mathcal{A})=Pr\{X\in \mathcal{A}\},\forall \mathcal{A}\subseteq \mathcal{X}$$. If $$X,Y,Z$$ are discrete, the probability distribution (or mass function) of $$X$$ is $${p_X(x),x\in\mathcal{X}}$$ with


$$
\begin{align}

p_X(x)=P_X(\{x\})=Pr\{X=x\}

\end{align}
$$


If the meaning is distinct, i.e., $$x$$  with $$X$$   and $$\mathcal{X}$$, we simplify $$p_X(x)$$  with $$p(x)$$ and $$\{p(x)\}$$ will be abbreviated as $$p$$.

The support of $$X$$ over $$p$$ is denoted by $$\mathcal{S}_{p_X}$$ (or $$S_p$$ if $$p$$ is distinct):


$$
\begin{align}

\mathcal{S}_{p_X}=\{x\in\mathcal{X}: p(x)>0\} \subseteq \mathcal{X}

\end{align}
$$


We will later see that probability distributions with 0 probability masses are very delicate, and they need to be handled with great care.


<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.1</span>.</p>


Two random variables $$X$$ and $$Y$$ are independent, denoted by $$X\perp Y$$ iff


$$
\begin{align}

p(x,y)=p(x)p(y), \quad \forall (x,y)\in \mathcal{X}\times\mathcal{Y}

\end{align}
$$


For more than 2 variables, they are the same:


- Mutual Independence: $$p(x_1,\cdots,x_n)=p(x_1)p(x_2)\cdots p(x_n),\forall x_1,\cdots, x_n$$


- Pairwise Independence: $$\forall i,j\in [n], i\neq j, X_i, X_j$$ are independence.


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.1</span>.</p>


Mutual independence implies pairwise independence but the converse is not true.


</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-2" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.2</span>.</p>


(Conditional Independent):<br>
For random variables $$X,Y,Z$$, we say $$X$$ is independent of $$Z$$ conditioning on $$Y$$ (denoted by $$X\perp Y\mid Z$$) iff


$$
\begin{align}

p(x,y,z)p(y)=p(x,y)p(y,z), \forall x,y,z

\end{align}
$$


or equivalently,


$$
\begin{align}

p(x,y,z)=\begin{cases}
\frac{p(x,y)p(y,z)}{p(z)}, &\quad p(y)>0;\\0,&\quad \text{otherwise}.
\end{cases}

\end{align}
$$


<span id="factorization-and-conditional-independence"></span>

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-2" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.2</span>.</p>


For random variables $$X,Y,Z$$, $$X\perp Y\mid Z$$ iff there exists functions $$a:\mathcal{X}\times \mathcal{Y}\to [0,1]$$ and $$b:\mathcal{Y}\times \mathcal{Z}\to [0,1]$$ such that:


$$
\begin{align}

p(x,y,z)=a(x,y)b(y,z) ,\quad \forall x\in \mathcal{X},y\in\mathcal{Y},z\in \mathcal{Z}, p(y)>0.

\end{align}
$$


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


we only need to proof the 'if' part as the other side follows immediately from the definition.
Assume:


$$
\begin{align}

p(x,y,z)=a(x,y)b(y,z),\quad \forall x\in \mathcal{X},y\in\mathcal{Y},z\in \mathcal{Z}, p(y)>0.

\end{align}
$$


then we have:


$$
\begin{align}

p(x,y)=&\sum_{z}p(x,y,z)=\sum_{z}a(x,y)b(y,z)=a(x,y)\sum_{z}b(y,z)\\
p(y,z)=&\sum_{x}p(x,y,z)=\sum_{x}a(x,y)b(y,z)=b(y,z)\sum_{x}a(x,y)\\
p(y)=&\sum_{z}p(y,z)=\sum_{z}b(y,z)\sum_{x}a(x,y)\\
\frac{p(x,y)p(y,z)}{p(y)}=&\frac{\left(a(x,y)\sum_{z}b(y,z)\right)\left(b(y,z)\sum_{x}a(x,y)\right)}{\sum_{z}b(y,z)\sum_{x}a(x,y)}=a(x,y)b(y,z)=p(x,y,z)

\end{align}
$$


For $$p(y)=0$$, we have $$0\leq p(x,y,z)\leq p(y)=0$$, hence $$X\perp Y\mid Z$$.


</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-3" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.3</span>.</p>


(Markov Chain):<br>
For $$n\geq 3$$, ramdom variables $$X_1, \cdots X_n$$ forms a  Markov chain denoted by $$X_1\to X_2\to \cdots\to X_n$$ iff:


$$
\begin{align}

p(x_1,x_2,\cdots x_n)p(x_2)p(x_3)\cdots p(x_{n-1})=p(x_1,x_2)p(x_2,x_3)\cdots p(x_{n-1},x_n),\quad \forall x_1, \cdots x_n.

\end{align}
$$


or equivalently,


$$
\begin{align}

p(x_1,x_2,\cdots x_n)=\begin{cases}
p(x_1,x_2)p(x_3\mid x_2)\cdots p(x_n\mid x_{n-1}), &\quad p(x_2)p(x_3)\cdots p(x_{n-1})>0;\\0,&\quad \text{otherwise}.
\end{cases}

\end{align}
$$


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-3" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.3</span>.</p>


<span id="conditional-independence-markov-chain"></span>

$$X\perp Y\mid Z \iff X\to Y\to Z$$.


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-4" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.4</span>.</p>


Let $$X_1,\cdots X_n$$ be random variables, then the following propositions are equivalent:


- $$X_1\to X_2\to \cdots \to X_n$$;


- $$X_n\to X_{n-1}\to \cdots \to X_1$$;


- $$X_1\to X_2,\to X_3$$, $$(X_1,X_2)\to X_3\to X_4, \cdots, (X_1,\cdots X_{n-2})\to X_{n-1} \to X_n$$


- $$\exists f_1,\cdots f_{n-1}, \quad p(x_1,\cdots,x_n)=f_1(x_1,x_2)\cdots f{n-1}(x_{n-1},x_n)$$


- $$\forall m<n, \mathcal{A}_1,\cdots \mathcal{A}_m \subseteq [n]$$ are disjoint, and satisfies $$\forall k_i\in \mathcal{A}_i,i\in [m]\to  k_1<k_2<\cdots <k_m$$, we have


$$
\begin{align}

X_{\mathcal{A}_1}\to \cdots \to X_{\mathcal{A}_m}

\end{align}
$$


We now show that distributions with zero probability masses are very delicate in general such that a range of propositions holds for strictly positive probability are not valid at zero probability masses. Here we give an example, a property involving 4 RVs:

<span id="intersection-axiom"></span>

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-5" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.5</span>.</p>


(Intersection Axiom):<br>
Let $$X_1,X_2,X_3,X_4$$ be 4 RVs such that $$p(x_1,x_2,x_3,x_4)>0$$ holds for all $$x_1,x_2,x_3,x_4$$. Then:


$$
\begin{align}

(X_1\perp X_4\mid (X_2,X_3))\wedge (X_1\perp X_3\mid (X_2,X_4))\to X_1\perp (X_3,X_4)\mid X_2

\end{align}
$$


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


By the definition of conditional independent, we have:


$$
\begin{align}

p(x_1,x_2,x_3,x_4)=& \frac{p(x_1,x_2,x_3)p(x_2,x_3,x_4)}{p(x_2,x_3)}\\
p(x_1,x_2,x_3,x_4)=& \frac{p(x_1,x_2,x_4)p(x_2,x_3,x_4)}{p(x_2,x_4)}\label{Intersection Axiom1}\\
p(x_1,x_2,x_3)=& \frac{p(x_1,x_2,x_4)p(x_2,x_3)}{p(x_2,x_4)}\\
p(x_1,x_2)=& \sum_{x_3}p(x_1,x_2.x_3)=\sum_{x_3}\frac{p(x_1,x_2,x_4)p(x_2,x_3)}{p(x_2,x_4)}\\
=& \frac{p(x_1,x_2,x_4)p(x_2)}{p(x_2,x_4)}\stackrel{(a)}{=}\frac{p(x_1,x_2,x_3,x_4)p(x_2)}{p(x_2,x_3,x_4)}\\
p(x_1,x_2,x_3,x_4)=& \frac{p(x_1,x_2)p(x_2,x_3,x_4)}{p(x_2)}\label{Intersection Axiom2}

\end{align}
$$


where a is from ($$\ref{Intersection Axiom1}$$). We know from ($$\ref{Intersection Axiom2}$$) that $$X_1\perp (X_3,X_4)\mid X_2$$.


**Note.** In the proof, the elimination law holds only when the probability masses are strictly positive.


If $$\exists (x_1,x_2,x_3,x_4), p(x_1,x_2,x_3,x_4)=0$$, the intersection property is not valid anymore. We exemplify a case where $$X_1=Y, X_2=Z, X_3=X_4=(Y,Z)$$ with $$Y\perp Z$$, then $$X_1\perp X_4\mid (X_2,X_3)$$, $$X_1\perp X_3\mid (X_2,X_4)$$, but $$X_1\not \perp (X_3,X_4)\mid X_2$$.

It seems like a counter-intuitive paradox originated from Henie's Law and continuity argument, as for any distribution $$p$$, whether it is strictly positive or not, we can always construct a sequence of strictly positive probability distributions $$\{p_k\}$$ such that $$\lim\limits_{k\to \infty}p_k=p$$. Then, following the proof of [Intersection axiom](#intersection-axiom), we have:


$$
\begin{align}

p_k(x_1,x_2,x_3,x_4)p_k(x_2)=p_k(x_1,x_2)p_k(x_2,x_3,x_4),\quad \forall k\in \mathbb{N}_+

\end{align}
$$


Letting $$k\to \infty$$, we have


$$
\begin{align}

p(x_1,x_2,x_3,x_4)p(x_2)=p(x_1,x_2)p(x_2,x_3,x_4)

\end{align}
$$


which indicates $$X_1\perp (X_3,x_4)\mid X_2$$. A counter-example constructed above shows that it is not always possible to find such a sequence $$\{p_k\}$$.

From the above disscussion, we find that probability distributions with zero masses are somewhat weird. For strictly positive distributions, the conditional independence is often related to factorization problem of distribution function, seen in [Factorization criterion for conditional independence](#factorization-and-conditional-independence).


</div>

#### Shannon's Information Measures


##### Entropy

Here we start with some axioms of discrete RV $$X$$ with finite alphabet $$\mathcal{X}$$. The entropy of the distribution of $$X$$ is, intuitively, the measure of information/uncertainty/randomness. First, we consider some basic axioms we desired for distributions of $$X$$. We start from uniform case.
<span id="information-measure-axioms"></span>


<div class="math-statement math-statement--axiom" data-statement="axiom" id="axiom-2-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Axiom 2.1</span> <span class="math-statement__title">(Axioms for measure the amount of information)</span>.</p>



1. (Monotonicity): Let $$X\sim U(\mathcal{X})$$ with $$\lvert \mathcal{X}\rvert= r$$, the measure of uncertainty $$H(\frac{1}{r}\mathbf{1}_{r}) =f(r)$$ is monotonously increasing with $$r$$.


1. (Additivity): $$X,Y$$ be uniform DRV with $$\lvert \mathcal{X}\rvert= r$$, $$\lvert \mathcal{Y}\rvert= l$$, then$$f(rl) = f(r) + f(l)$$.


</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-6" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.6</span> <span class="math-statement__title">(Structure of $$f(r)$$)</span>.</p>


$$f(r) =\log r$$


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


Let $$\theta$$ be an arbitrary integer, then there exists inter $$k$$, s.t., $$\forall r\in \mathbb{N}_{+}$$, $$r^{k}\leq 2^{\theta}\leq r^{k + 1}$$. Then by the [information-measure axioms](#information-measure-axioms), we have:


$$
\begin{align}

f(r^{k})\leq f(2^{\theta})\leq f(r^{k + 1})\\
kf(r)\leq \theta f(2) \leq (k + 1)f(r)

\end{align}
$$


We also have $$\frac{k}{\theta}\leq \frac{\log 2}{\log r}\leq \frac{k + 1}{\theta}$$, and $$\frac{k}{\theta}\leq \frac{f(2)}{f(r)}\leq \frac{k + 1}{\theta}$$, so


$$
\begin{align}

\left\lvert\frac{f(2)}{f(r)} - \frac{1}{\log r} \right\rvert \leq \frac{1}{\theta}

\end{align}
$$


since $$\theta$$ can be an arbitrary, we can choose $$\theta$$ large enough so that


$$
\begin{align}

f(r) = f(2)\log r = C\cdot \log r

\end{align}
$$


The constant do not affect when we want to take a measure on $$X$$. So we always treat $$f(2) = 1$$ and $$f(r) =\log r$$


</div>

<div class="math-statement math-statement--axiom" data-statement="axiom" id="axiom-2-2" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Axiom 2.2</span> <span class="math-statement__title">(Grouping/Fietition Axiom for non-uniform DRV $$X$$ with finite alphabet)</span>.</p>


For $$X$$ is non-uniform with distribution $$\{p_{0}\cdots p_{r - 1}\}$$, and for any $$A\subseteq [0:r - 1]$$, the one-hot/indicator mapping (many-to-one) $$m(i)$$ which maps $$A$$ to $$0$$, while $$[0:r - 1] /A$$ to $$1$$, we have


$$
\begin{align}

H(p_{[0:r - 1]}) = H(\alpha_{0},\alpha_{1}) + \alpha_{0} H\left( \frac{1}{\alpha_{0}}(p_{A}) \right) + \alpha_{1} H\left( \frac{1}{\alpha_{1}}(p_{[0:r - 1] /A}) \right)

\end{align}
$$


where $$\alpha_{0} = \sum_{i\in A}p_{i}$$. $$\alpha_{1} = \sum_{i\in [0:r - 1] /A}p_{i}$$


As the $$H$$ is only the function of distribution, i.e., $$H$$ is invariable with permutation of distributions, we can take a trivial $$A =[0:k - 1]$$ for some $$k\in[r - 1]$$ w.l.o.g.


</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-1" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.1</span>.</p>


1. $$\mathbf{p} =[\frac{1}{2},\frac{1}{4},\frac{1}{4}]$$. Take $$k = 1$$, then $$\alpha_{0} = \frac{1}{2}$$, $$\alpha_{1} = \frac{1}{2}$$. $$H(\frac{1}{2},\frac{1}{4},\frac{1}{4}) = H(\frac{1}{2},\frac{1}{2}) + \frac{1}{2}H(1) + \frac{1}{2}H(\frac{1}{2},\frac{1}{2}) = \frac{3}{2}$$.<br>
2. Bernoulli $$X\sim Ber(p)$$ for $$p\in \mathbb{Q}$$. $$\mathbf{p} =(p,1 - p) =(\frac{\alpha}{\beta}, \frac{\beta - \alpha}{\beta})$$. We create a uniform DRV $$\mathbf{p}_{Y} = U(\mathcal{Y})$$ where $$\lvert \mathcal{Y}\rvert= \beta$$. Let $$k = \alpha$$, then for $$Y$$, we apply the grouping axiom


$$
\begin{align}

\log \beta =& H(p,1 - p) + pH(\frac{1}{\alpha}\mathbf{1}_{\alpha}) +(1 - p)H(\frac{1}{\beta - \alpha}\mathbf{1}_{\beta - \alpha})\\
H(p,1 - p)=& -p\log p -(1 - p)\log (1 - p)

\end{align}
$$


</div>

<div class="math-statement math-statement--axiom" data-statement="axiom" id="axiom-2-3" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Axiom 2.3</span> <span class="math-statement__title">(Continuity)</span>.</p>


If $$\mathbf{p} =(p,1 - p)$$, then $$g(p) =H(\mathbf{p})$$ is a continuous function of $$p$$


</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-2" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.2</span>.</p>


Bernoulli $$X\sim Ber(p)$$. For $$\forall p\in [0,1]$$, we can find a sequence of rational numbers $$p_{(\mathbb{N}_{+})}$$ s.t. $$\lim\limits_{n \to \infty}p_{n} = p$$, and we have $$H(p,1 - p) =\lim\limits_{n \to \infty}g(p_{n}).$$


</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-7" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.7</span> <span class="math-statement__title">(Shannon Entropy)</span>.</p>


If $$X\sim \mathbf{p} = p_{(0:r - 1)}$$, then


$$
\begin{align}

H(X) = H(\mathbf{p}) =- \sum_{i = 0}^{r - 1}p_{i}\log p_{i}

\end{align}
$$


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


The proof is done by induction of $$r$$. When $$r = 1,2$$ the results holds. Then we assume $$r - 2$$ holds. Then for $$r - 1$$ case,


$$
\begin{align}

H(p_{(0:r)}) =& H(\sum_{i\in [r - 2]} p_{i},p_{r - 1}) +(1 - p_{r - 1})H(p_{(1:r - 2)})\\
=& - p_{r - 1}\log p_{r - 1} -(1 - p_{r - 1})\left( \log (1 - p_{r - 1}) +\sum_{i = 1}^{r - 2}\frac{p_{i}}{1 - p_{r - 1}}\log \frac{p_{i}}{1 - p_{r - 1}} \right) \nonumber \\
=& - p_{r - 1}\log p_{r - 1} -  \sum_{i = 1}^{r - 2} \left(p_{i}\log \frac{p_{i}}{1 - p_{r - 1}} + p_{i}\log (1 - p_{r -1}) \right) \\
=& - \sum_{i = 0}^{r - 1}p_{i}\log p_{i}

\end{align}
$$


Entropy has a good formula that can be defined in expectation sense.

<span id="definition-of-entropy"></span>

</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-4" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.4</span>.</p>


(Entropy defined in Expectation sense):<br>
Consider a discrete probability space $$(\mathcal{X}, \mathcal{P}(\mathcal{X}), P)$$ <br>
1. $$\forall A\in \mathcal{P}(\mathcal{X})$$ is an event, the **amount of information** gained from the fact that $$A$$ has occured is:


$$
\begin{equation}
\label{DefInformation}
i(A)=-\log P(A)

\end{equation}
$$


we denote $$i(x)$$ for $$i(\{X = x\})$$.<br>
2. The **entropy** of $$X$$ is defined as the expected value of the amount of information given by all single-point events of $$X$$:


$$
\begin{equation}
\label{DefEntropy}
H(X)=E[-\log p(X)]=-\sum_{x\in \mathcal{X}}p(x)\log p(x)

\end{equation}
$$


We write $$H(X)$$ as $$H_{\alpha}(X)$$ when the base of the logarithms in ($$\ref{DefInformation}$$) and ($$\ref{DefEntropy}$$) are $$\alpha$$.


**Note.** We denote the numerical charactristic of a random variable $$X\sim p_X$$ as $$E[g(X)]=\sum_{x\in \mathcal{X}}g(x)p(x)$$ for any function $$g(x)$$.


**Note.** We follow the convention that $$0\log 0= \lim\limits_{p\to 0^+} p\log p =\lim\limits_{p\to 0^+}(\dfrac{1}{p})/(-\dfrac{1}{p^2})=0$$.


We take the base of logarithm with $$2,e,3,10$$ to get the corresponding units of bit, nat, tet, det. In the context of source coding, the base is usually taken to be the size of the code alphabet.

Entropy concerns only about  the distribution of variable(s) rather than the values of it. An alternative view is useful: $$i(A)$$ represents the amount of information needed to specify event $$A$$ and entropy gives the expected amount of uncertainty removed upon revealing the outcome of $$X$$.

Entropy can also be naturally introduced by answering the question "What's the average length of the shortest description of the random variable? ", where we will give an answer that it is between $$H(X)$$ and $$H(X)+1$$ in Chapter 6. Here we give some properities:

<span id="properties-of-entropy"></span>

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-8" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.8</span>.</p>


(Properities of Entropy)<br>
1. For mutually independent events $$A_1,\cdots, A_N$$:


$$
\begin{equation}
\label{LemEntropy1}
i(\bigcap_{n=1}^{N}A_n)=\sum_{n=1}^{N}i(A_n)

\end{equation}
$$


2. $$H(X)\geq 0$$<br>
3.  $$H_b(X)=(\log_ba)H_a(X)$$.


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


1. for mutually independent events, we have:


$$
\begin{equation}

i(\bigcap_{n=1}^{N}A_n)=-\log P_X(\bigcap_{n=1}^{N}A_n)=-\log \prod_{n=1}^{N}P_X(A_n)=\sum_{n=1}^{N}i(A_n)

\end{equation}
$$


2. Noticing that $$\forall x\in \mathcal{X}, -\log p(x)\geq 0$$.<br>
3. We have


$$
\begin{equation}

H_b(X)=-\sum_{x\in \mathcal{X}}p(x)\log_b p(x)=-\sum_{x\in \mathcal{X}}p(x)\log_ba\log_a p(x)=(\log_ba)H_a(X)

\end{equation}
$$


We come to a scenario of multi-dimension variables. It is the same when talking about entropy(here it is called joint entropy) , as the sample space is $$\mathcal{X}\times \mathcal{Y}$$ and $$p_{XY}$$ is the probability distributions.


<span id="joint-entropy"></span>

</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-5" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.5</span>.</p>


(Joint Entropy):<br>
1. the joint entropy of a sequence of discrete random variables $$\mathbf{X}= (X_1,\cdots,X_N)$$ with a joint distribution $$p_{\mathbf{X}}: \mathcal{X}_1\times\cdots \times \mathcal{X}_N\to [0,1]$$ is:


$$
\begin{align}
\label{DefJointEntropy}
H(X_1,\cdots, X_N)=&-E[\log p_{\mathbf{X}}(x_1,\cdots,x_N)]\\
=&-\sum_{x_n\in \mathcal{X}_n, n\in[N]}p_{\mathbf{X}}(x_1,\cdots,x_N)\log p_{\mathbf{X}}(x_1,\cdots,x_N)

\end{align}
$$


2. If there are 2 variables $$(X,Y)$$, then


$$
\begin{equation}
\label{DefJointEntropy1}
H(X,Y)=-E[\log p(x,y)]=-\sum_{x\in \mathcal{X}} \sum_{y\in \mathcal{Y}}p(x,y)\log p(x,y)

\end{equation}
$$


conditional entropy describes the amount of information of one set of RVs when another set of RVs are given:

<span id="conditional-entropy"></span>

</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-6" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.6</span>.</p>


(Conditional Entropy):<br>
1. the conditional entropy of $$\mathbf{X}=(X_1,\cdots,X_N)$$ given $$\mathbf{Y}=(Y_1,\cdots,Y_M)$$ is:


$$
\begin{align}
\label{DefConditionalEntropy}
&H(Y_1,\cdots, Y_M\mid X_1,\cdots, X_N)\\
=&\sum_{x_n\in \mathcal{X}_n, n\in[N]}p(x_1,\cdots, x_N)H(Y_1,\cdots, Y_M\mid \mathbf{X}=(x_1,\cdots, x_N))\\
=&-\sum_{x_n\in \mathcal{X}_n, n\in[N]}\sum_{y_m\in \mathcal{Y}_m, m\in[M]}p(x_1,\cdots,x_N,y_1,\cdots,y_M)\log p(x_1,\cdots,x_N\mid y_1,\cdots,y_M)\\
=&-E[\log p(\mathbf{X}\mid \mathbf{Y})]

\end{align}
$$


2. Specifically, when $$M=N=1$$, the conditional entropy of pair $$(X,Y)$$ is


$$
\begin{align}
\label{DefConditionalEntropy1}
H(X\mid Y)=&\sum_{x\in \mathcal{X}}p_X(x)H(Y\mid X=x)\\
=&-\sum_{x\in \mathcal{X}}\sum_{y\in \mathcal{Y}}p(x,y)\log p(y\mid x)=-E_[\log p(Y\mid X)]

\end{align}
$$


<span id="chain-rule-entropy"></span>

</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-9" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.9</span>.</p>


(Chain Rule for Entropy):<br>


$$
\begin{align}

H(X, Y)=&H(X)+H(Y\mid X)\\
H(X_1,\cdots,X_N)=&\sum_{n=1}^{N}H(X_i\mid X_1,\cdots, X_{i-1})

\end{align}
$$


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


We use induction to prove. On the one hand, for random variable pairs $$(X,Y)$$, we have:


$$
\begin{align}

p(x,y)=&p(x)p(y\mid x), \quad \forall x\in\mathcal{X}, y\in \mathcal{Y},\\
\log{p(x,y)}=&\log(p(x))+\log(p(y\mid x)),\\
-E[\log P(X,Y)]=&-E[\log p(X)]-E[\log p(Y\mid X)], \label{ProofChainRule1}\\
H(X, Y)=&H(X)+H(Y\mid X).

\end{align}
$$


it is worth noticing that the 'E' shown in ($$\ref{ProofChainRule1}$$) is ambiguous to use $$P_{XY}$$ or $$P_X$$. In fact,


$$
\begin{align}

E_{P_{XY}}[g(x)]=&\sum_{x\in \mathcal{X}}\sum_{y\in \mathcal{Y}}P_{XY}(x,y)g(x) \\=& \sum_{x\in \mathcal{X}}(P_X(x)g(x)\sum_{y\in \mathcal{Y}}P_{Y\mid X}(y\mid x)) =\sum_{x\in \mathcal{X}}(P_X(x)g(x)\\=&E_{P_X}[g(x)]

\end{align}
$$

On the other hand , if $$H(X_1,\cdots,X_N)=\sum_{n=1}^{N}H(X_i\mid X_1,\cdots, X_{i-1})$$, then


$$
\begin{align}

H(X_1,\cdots,X_{N+1})=&H(X_1,\cdots,X_N)+H(X_{N+1}\mid X_1,\cdots,X_N)\\
=&H(X_1,\cdots,X_N)+\sum_{n=1}^{N}H(X_i\mid X_1,\cdots, X_{i-1})\\
=&\sum_{n=1}^{N+1}H(X_i\mid X_1,\cdots, X_{i-1})

\end{align}
$$


Thus, [Chain rule for entropy](#chain-rule-entropy) is proved.


[Chain rule for entropy](#chain-rule-entropy) reveals that we can remove the uncertainty of $$(X,Y)$$ by two steps: firstly remove the uncertainty upon revealing $$X$$, then remove the uncertainty upon revealing $$Y$$ once $$X$$ is known. Moreover, we have $$H(X,Y)=H(X)+H(Y\mid X)=H(Y)+H(X\mid Y)$$, i.e.,


$$
\begin{align}

H(X)-H(X\mid Y) =H(Y)-H(Y\mid X)

\end{align}
$$


holds for every pair $$(X,Y)$$. We reclaim that only the distribution matters, so $$H$$ can be seen as a functional of distributions.


</div>

##### Measure of Discrimination: Relative Entropy

In this section, we assume RV $$X\in \mathcal{X}$$ has two distributions $$P,Q$$, and we need to give a measure to discriminate the distributions. A definition of distance between 2 distributions $$p$$ and $$q$$ is the first we need (One preliminaries to be recognized is that the distance shall take 0 iff $$p=q$$):

**Note.** In Information Theory, we always focus on the distribution, so two RV can be seen as equal as long as they are equal in probability.


<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-7" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.7</span>.</p>


(variational distance):<br>
The variational distance between probability distributions $$p$$ and $$q$$ defined on a common alphabet $$\mathcal{X}$$ is the $$\mathcal{L}^1$$ distance:


$$
\begin{align}

V(p,q)=\sum_{x\in\mathcal{X}}\lvert p(x)-q(x)\rvert

\end{align}
$$


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-10" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.10</span> <span class="math-statement__title">(Metric Properties of Variational Distance)</span>.</p>


$$V(\cdot,\cdot)$$ is a distance metric, i.e.,


1. $$V(p,q)\geq 0$$ iff $$p\stackrel{p.}{=}q$$.


1. $$V(p,q) = V(q,p)$$


1. $$V(p,r)\leq V(p,q) + V(q,r)$$


**Note.** Using this metric, we can define the continuity of functionals on distribution.


To give a measure on the discrimination of two distributions $$P,Q$$, we first give some desire for that measure.

</div>

<div class="math-statement math-statement--axiom" data-statement="axiom" id="axiom-2-4" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Axiom 2.4</span> <span class="math-statement__title">(Axioms for Measure of Distributions Distance)</span>.</p>

For a DRV $$X$$ on a finite alphabet $$\mathcal{X}$$ and two distribution $$P = p_{(0:r -1)},Q = q_{(0:r - 1)}$$, our measure on the discrimination of $$P$$ and $$Q$$, denoted by $$D(P\Vert Q)$$, must have the following constraints:


1. Invariance: $$D$$ is invariant under a one-to-one transformation


1. Continuity: $$D((p,1 - p)\Vert (q,1 - q))$$ is first derivative (and thus continuous) for $$(p,q)$$.


1. Nullity: $$D((p,1 - p)\Vert (p,1 - p)) = 0$$.


1. Recursivity:


$$
\begin{align}

D(p_{(0:r + 1)}\Vert q_{0:r - 1}) =& D((p_{0} + p_{1}, p_{(2:r - 1)})\Vert (q_{0} + q_{1},q_{(2:r - 1)}))\\& +(p_{0} + p_{1})D\left( (\frac{p_{0}}{p_{0} + p_{1}}, \frac{p_{1}}{p_{0} + p_{1}}) \Vert (\frac{q_{0}}{q_{0} + q_{1}}, \frac{q_{1}}{q_{0} + q_{1}})\right) \nonumber

\end{align}
$$


</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-11" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.11</span>.</p>


Basic on the axioms, there is a unique function (up to scaling) $$D\left( p_{(0:r - 1)}\Vert q_{(0:r - 1)} \right)$$ s.t.


$$
\begin{align}

D(p\Vert q)=E_p[log\dfrac{p(x)}{q(x)}] = \sum_{x\in \mathcal{X}}p(x)log\dfrac{p(x)}{q(x)}

\end{align}
$$


This function is called the relative entropy with the following formal definition.


<span id="relative-entropy"></span>

</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-8" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.8</span>.</p>


(Relative Entropy, Kullback-Leibler Distance):<br>
Let $$X$$ be (a) random variable(s), $$p$$ is the distribution of $$X$$ and $$q$$ are the estimation distribution of $$X$$, then the relative entropy (or Kullback-Leibler Distance, or information divergence, divergence) between $$p$$ and $$q$$ is:


$$
\begin{equation}
\label{DefRelativeEntropy}
D(p\Vert q)=E_p[log\dfrac{p(x)}{q(x)}] = \sum_{x\in \mathcal{X}}p(x)log\dfrac{p(x)}{q(x)}

\end{equation}
$$


where $$E_p$$ is the expectation w.r.t. $$p$$.


**Note.** The relative entropy is not a true metric of the "distance" between 2 distributions. The properties will be discussed in [Information inequalities](#information-inequalities).

We always define $$0log\dfrac{0}{q}=0$$ and $$plog\dfrac{p}{0}=\infty$$. i.e., if there exists $$x\in\mathcal{X}$$ with $$P(x)\geq 0$$ but $$Q(x) =0$$, then $$D(P\Vert Q)=\infty$$. With this convention,


$$
\begin{align}

D(p\Vert q)<\infty \to \mathcal{S}_p\subseteq \mathcal{S}_q

\end{align}
$$


Sometimes, to avoid $$\infty$$ terms, we require $$p_{i} = 0$$ if $$q_{i} = 0$$, i.e., $$p$$ is absolutely continuous w.r.t. $$Q$$, denoted by $$(P<<Q)$$.


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-12" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.12</span>.</p>


(Jensen's Inequality):
Let $$f$$ be a convex function, then for $$X$$ with any distribution,


$$
\begin{align}

\mathbb{E}[f(X)]\geq f\left( \mathbb{E}[X] \right) \label{Fundamental Inequality}

\end{align}
$$


if $$f$$ is strictly convex, the equality holds iff $$X = a$$ w.p. $$1$$.


</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-13" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.13</span>.</p>


(Properties of divergence):


- (Non-negative): $$D(p\Vert q)\geq 0$$ with equality iff $$p=q$$.


- (Not symmetric):


- (Does not satisfy Triangle inequality):


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


1. Proof for the **Non-negative.** If $$q(x)=0$$ for $$x\in\mathcal{S}_p$$, $$D(p\Vert q)=\infty$$ and true. So we only assume that $$\forall x\in \mathcal{S}_p, q(x)>0$$, i.e., $$\mathcal{S}_p\subseteq \mathcal{S}_q$$. We have


$$
\begin{align}

D(p\Vert q)=&(\log e)\sum_{x\in \mathcal{S}_p}p(x)\ln\frac{p(x)}{q(x)}\\
\geq &(\log e)\sum_{x\in \mathcal{S}_p}p(x)(1-\frac{q(x)}{p(x)})\\
=&(\log e)\left(\sum_{x\in \mathcal{S}_p}p(x)-\sum_{x\in \mathcal{S}_p}q(x)\right)\\
=&(\log e)\left(1-\sum_{x\in \mathcal{S}_p}q(x)\right)\geq 0

\end{align}
$$


the inequality is from Jensen's Inequality.


</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-3" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.3</span>.</p>


If $$Q$$ is uniform (to maximum entropy on given alphabet), $$D(P\Vert Q) =\log r - H(X) = H(Q) - H(P)\geq 0$$ w.e.iff $$P$$ is uniform. I.e., we have a natural bound for $$H(X)$$:


$$
\begin{align}

H(X)\geq \log \lvert \mathcal{X}\rvert.

\end{align}
$$


<span id="conditional-relative-entropy"></span>

</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-9" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.9</span>.</p>


(Conditional Relative Entropy):<br>
1. Let $$X,Y$$ be a pair of variables with joint distribution $$p_{XY}$$ and empirical distribution $$q_{X,Y}$$. The relative entropy of $$X$$ condition $$Y$$ is defined as:


$$
\begin{align}

D(p_{X\mid Y}\Vert  q_{X\mid Y})=&\sum_{y\in \mathcal{Y}}p(y)\sum_{x\in \mathcal{X}}p(x\mid y)\log \dfrac{p(x\mid y)}{q(x\mid y)}\\
=&\sum_{y\in \mathcal{Y}}p(y)D(p(X\mid y)\Vert q(X\mid y))\\
=&E_{p}[\log \dfrac{p(X\mid Y)}{q(X\mid Y)}]

\end{align}
$$


2. We can generalize the definition to the relative entropy of a n-dimensional variable $$\mathbf{X}$$ conditions m-dimensional variable $$\mathbf{Y}$$, by taking place of the joint distributions.


Similarly, the relationship between the relative entropy of joint distributions and the conditional distributions goes for the chain rule of relative entropy:

<span id="chain-rule-for-relative-entropy"></span>

</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-14" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.14</span>.</p>


(Chain Rule for Relative Entropy):<br>


$$
\begin{equation}

D(p_{XY}\Vert q_{XY})=D(p_Y\Vert q_Y)+D(p_{X\mid Y}\Vert q_{X\mid Y})

\end{equation}
$$


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>



$$
\begin{align}

D(&p_{XY}\Vert q_{XY})\\
=& \sum_{x\in \mathcal{X}}\sum_{y\in \mathcal{Y}}p(x,y)\log \dfrac{p(x,y)}{q(x,y)}\\
=& \sum_{x\in \mathcal{X}}\sum_{y\in \mathcal{Y}}p(x,y)\log \dfrac{p(y)p(x\mid y)}{q(y)q(x\mid y)}\\
=& \sum_{x\in \mathcal{X}}\sum_{y\in \mathcal{Y}}p(x,y)\log \dfrac{p(y)}{q(y)}+\sum_{x\in \mathcal{X}}\sum_{y\in \mathcal{Y}}p(x,y)\log \dfrac{p(x\mid y)}{q(x\mid y)}\\
=&D(p_Y\Vert q_Y)+D(p_{X\mid Y}\Vert q_{X\mid Y}).

\end{align}
$$


</div>

##### Measure of Dependency: Mutual Information


Suppose $$X$$ and $$Y$$ be 2 DRV $$\sim p_{XY}$$. An apparent measure of correlation is correlation coefficient:


$$
\begin{align}

\rho = \frac{Cov(X,Y)}{\sqrt{ Var(X) Var(Y)}}

\end{align}
$$


when $$\rho = 0$$ we say $$X,Y$$ are uncorrelated. One deficient of $$\rho$$ is that they do not measure if $$X,Y$$ is independent. With the aid of relative entropy, the divergence of $$p_{XY}$$ and $$p_{X}p_{Y}$$ is actually a better metric for dependency.


<span id="mutual-information"></span>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-10" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.10</span>.</p>


(Mutual Information):<br>
1. Let $$X,Y$$ be 2 random variables. The mutual information between $$X$$ and $$Y$$ is defined as the relative entropy between the joint distribution $$p_{XY}$$ and the product of edge distributions $$p_Xp_Y$$ :


$$
\begin{align}
\label{DefMutualInformation}
I(X;Y)=&D(p_{XY}\Vert p_Xp_Y)=E[\log\dfrac{p(X,Y)}{p(X)p(Y)}]\\
=&\sum_{x\in \mathcal{X}}\sum_{y\in \mathcal{Y}}p(x,y)\log\dfrac{p(x,y)}{p(x)p(y)}

\end{align}
$$


2. generally, the mutual information between one set of random variable(s) $$\mathbf{X}$$ and another set $$\mathbf{Y}$$ is similarly defined, by replacing the joint and conditional distribution of 2 random variables with that of 2 sets of variables:


$$
\begin{equation}

I(X_1,\cdots, X_N;Y_1,\cdots, Y_M)=\sum_{\mathbf{x}\in \mathcal{X}_1\times \cdots \times \mathcal{X}_N}\sum_{\mathbf{y}\in \mathcal{Y}_1\times \cdots \times \mathcal{Y}_M}p(\mathbf{x},\mathbf{y})\log\dfrac{p(\mathbf{x},\mathbf{y})}{p(\mathbf{x})p(\mathbf{y})}

\end{equation}
$$


3. The **conditional mutual information** between $$\mathbf{X}$$ and $$\mathbf{Y}$$ given $$\mathbf{Z}$$ is defined by:


$$
\begin{equation}

I(\mathbf{X};\mathbf{Y}\mid \mathbf{Z})=\sum_{\mathbf{x},\mathbf{y},\mathbf{z}}p(\mathbf{x},\mathbf{y},\mathbf{z})\log\frac{p(\mathbf{x},\mathbf{y}\mid \mathbf{z})}{p(\mathbf{x}\mid \mathbf{z})p(\mathbf{y}\mid \mathbf{z})}

\end{equation}
$$


**Note.** Mutual information is a measure of how different is the joint distribution with its marginals.


We show that mutual information is non-negative,  symmetric, and upper bounded:


<span id="properties-of-mutual-information"></span>

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-15" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.15</span>.</p>


(Property of Mutual Information):


1. (non-negative): $$0\leq I(X;Y)\leq \min \{H(X),H(Y)\}$$


1. If the following entropies and conditional entropies are all finite, then


$$
\begin{align}

I(X;Y)=H(X)-H(X\mid Y)=H(Y)-H(Y\mid X)=H(X)+H(Y)-H(X,Y)\label{I to H1}

\end{align}
$$


1. (symmetric): $$I(X;Y)=I(Y;X)$$


1. $$I(X;X)=H(X)$$


**Note.** Alternatively, Mutual information measures the amount of information that one set of random variable(s) contains about another set, or the reduction of entropy of one set of RVs by knowing another set of RVs.


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


Noticing that 1 is equivalent to the non-negativity of relative entropy, 3 can be derived from 2 and 4 can be derived from the definition of mutual information ($$\ref{DefMutualInformation}$$), we only prove 2. In fact,


$$
\begin{align}

I(X;Y)=&E_{P_{XY}}[\log\dfrac{P_{XY}(X,Y)}{P_X(X)P_Y(Y)}]\\
=& E_{P_{XY}}[\log P_{Y\mid X}(X,Y)-\log P_Y(Y)]\\
=& H(Y)-H(Y\mid X)\\
=& H(Y) +H(X)-H(X,Y)

\end{align}
$$


For conditional mutual information, we have:

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-16" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.16</span>.</p>



$$
\begin{align}

I(X;Y\mid Z)\stackrel{\triangle}{=}&\sum_{x\in\mathcal{X},y\in\mathcal{Y},z\in\mathcal{Z}}p(x,y,z)\log\frac{p(x,y\mid z)}{p(x\mid z)p(y\mid z)}\\
=& E[\log \frac{p(X,Y\mid Z)}{p(X\mid Z)p(Y\mid Z)}]\\
=& \sum_{z\in\mathcal{Z}}p(z)I(X;Y\mid Z=z)\\
=& H(X\mid Z)-H(X\mid Y,Z)=H(Y\mid Z)-H(Y,X\mid Z)\label{I to H2}\\
=& H(X\mid Z)+H(Y\mid Z)-H(X,Y\mid Z)\label{I to H3}\\
=& (\text{Symmetric})I(Y;X\mid Z)

\end{align}
$$


where ($$\ref{I to H2}$$) and ($$\ref{I to H3}$$) holds provided that conditional entropies are all finite.


It is supposed to be noticed that all Shannon's information measures are finite if the RVs involved have finite alphabets. We will give the upper bound of entropy in the [uniform-distribution entropy bound](#uniform-distribution-maximizes-entropy).

According to the [definition of mutual information](#mutual-information) and the [chain rule for entropy](#chain-rule-entropy), we have the chain rule for mutual information

<span id="chain-rule-information"></span>

</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-17" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.17</span>.</p>


(Chain Rule for Mutual Information):<br>


$$
\begin{equation}
\label{key}
I(X_1,\cdots , X_N; \mathbf{Y}\mid \mathbf{Z})=\sum_{n=1}^{N}I(X_n;\mathbf{Y}\mid X_1,\cdots, X_{n-1},\mathbf{Z})

\end{equation}
$$


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


We get the proof by [definition of mutual information](#mutual-information) and [chain rule for entropy](#chain-rule-entropy) that:


$$
\begin{align}

I(X_1,&\cdots , X_N; \mathbf{Y}\mid \mathbf{Z})\\
=&H(X_1,\cdots,X_N\mid \mathbf{Z})-H(X_1,\cdots,X_N\mid \mathbf{Y},\mathbf{Z})\\
=& \sum_{n=1}^{N}(H(X_n\mid X_1,\cdots,X_{n-1},\mathbf{Z})-H(X_n\mid X_1,\cdots,X_{n-1},\mathbf{Y}, \mathbf{Z}))\\
=&\sum_{n=1}^{N}I(X_n;\mathbf{Y}\mid X_1,\cdots,X_n,\mathbf{Z})

\end{align}
$$


**Note.** From the above 3 chain rules [chain rule for entropy](#chain-rule-entropy), [chain rule for mutual information](#chain-rule-information) and [chain rule for relative entropy](#chain-rule-for-relative-entropy), we see that they all show the relationship between some numerical characteristics of joint distribution and side distribution. In essence, they all shows that $$p_{XY}=p_{X}p_{Y\mid X}$$.


We show that all Shannon's measures are special cases of conditional mutual information. Given $$\Phi$$ to be a degenerate variable which takes a constant value with probability 1. Then,


$$
\begin{align}

H(X)=I(X;X\mid \Phi),\qquad H(X\mid Y)=I(X;X\mid Y),\qquad I(X;Y)=I(X;Y\mid \Phi)

\end{align}
$$


and notice that conditional mutual information is a special form of conditional relative entropy, we often pay our concentration to the properties of relative entropy.


</div>

#### Continuity of Shannon's Measures under Finite Alphabets


Using variation distance metric, we can define the continuous property on the Variation distance sense. We define the continuity of functional $$H:\mathcal{P}_{\mathcal{X}}\to \mathbb{R}_+$$ in variational distance, where $$\mathcal{P}_{\mathcal{X}}$$ is the set of all possible distributions on a finite alphabet $$\mathcal{X}$$.

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-11" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.11</span>.</p>


We say the functional $$F:\mathcal{P}_{\mathcal{X}}\to \mathbb{R}$$ to be continuous at distribution $$p\in \mathcal{P}_{\mathcal{X}}$$ iff $$\forall \epsilon >0,\exists \delta >0$$ such that


$$
\begin{align}

\forall q\in \mathcal{P}_{\mathcal{X}}, \quad  V(p,q)<\delta \to \lvert F(p)-F(q)\rvert<\epsilon

\end{align}
$$


**Note.** We alternatively note $$\lim\limits_{p'\to p}F(p')=F(\lim\limits_{p'\to p}p')=F(p)$$ for continuous functional $$F$$.


**Note.** For variational distance, $$\mathcal{P}_{\mathcal{X}}$$ is a closed set, and therefore uniform continuous is equivalently satisfied.


</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-18" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.18</span>.</p>


All Shannon's information measures are continuous functionals w.r.t. convergence in variational distance under finite and fixed alphabets.


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


We first prove that the entropy function $$H:\mathcal{P}_{\mathcal{X}}\to \mathbb{R}^*$$:


$$
\begin{align}

H(p)=-\sum_{x\in \mathcal{S}_p}p(x)\log p(x)

\end{align}
$$


is continuous. We define a functional $$l_x:\mathcal{P}_{\mathcal{X}}\to \mathbb{R}^*$$ such that $$l_x$$ is only variant with a unique value of $$p$$ namely $$p(x)$$: $$l_x(p)=l(p(x))$$, where $$l:[0,1]\to \mathbb{R}^*$$:


$$
\begin{align}

l(a)=\begin{cases}
a\log a,\quad & \text{if } a>0\\
0,\quad & \text{if } a=0
\end{cases}

\end{align}
$$


as function $$l$$ is continuous with $$a\in [0,1]$$, and


$$
\begin{align}

0\leq \lvert p(x)-q(x)\rvert\leq \sum_{x\in\mathcal{X}}\lvert p(x)-q(x)\rvert =V(p,q)
\end{align}
$$


$$l_x(p)$$ is then a continuous functional on $$\mathcal{P}_{\mathcal{X}}$$. For finite alphabet $$\mathcal{X}$$,


$$
\begin{align}

H(p)=-\sum_{x\in \mathcal{X}}l_x(p)

\end{align}
$$


is continuous.

Now we proceed to prove the continuity of conditional mutual information $$I(X;Y\mid Z)$$ with finite alphabets $$\mathcal{X}$$, $$\mathcal{Y}$$ and $$\mathcal{Z}$$, which covers all cases of Shannon's information measures. Firstly, we have:


$$
\begin{align}

\sum_{x,y}\lvert p(x,y)-q(x,y)\rvert=\sum_{x,y}\lvert \sum_{z}(p(x,y,z)-q(x,y,z))\rvert\leq\sum_{x,y,z}\lvert p(x,y,z)-q(x,y,z)\rvert

\end{align}
$$


therefore $$p'_{XYZ}\to p_{XYZ}$$ contains $$p'_{XY}\to p_{XY}$$ so that


$$
\begin{align}

\lim\limits_{p'_{XYZ}\to p_{XYZ}}H(p'_{XY})=H(\lim\limits_{p'_{XYZ}\to p_{XYZ}}p'_{XY})=H(p_{XY})

\end{align}
$$


Hence,


$$
\begin{align}

\lim\limits_{p'_{XYZ}\to p_{XYZ}}& I_{X;Y\mid Z}(p'_{XYZ})\\
=&\lim\limits_{p'_{XYZ}\to p_{XYZ}}(H(p'_{XZ})+H(p'_{YZ})-H(p'_Z)-H(p'_{XYZ}))\\
=&H(p_{XZ})+H(p_{YZ})-H(p_Z)-H(p_{XYZ})\\
=& I_{X;Y\mid Z}(p_{XYZ})

\end{align}
$$


So $$I_{X;Y\mid Z}(p_{XYZ})$$ is a continuous functional of $$p_{XYZ}$$.


In analytics, $$\mathcal{L}^1$$ distance is equivalent to $$\mathcal{L}^2$$ distance, so we have a similar conclusion that:

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-19" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.19</span>.</p>


All Shannon's information measures are continuous functionals w.r.t. convergence in Euclidean distance under finite and fixed alphabets.


Is is worthy of attention that this continuity of Shannon's measures are delicate: specified distance, fixed and finite alphabets are indispensable.  red{We show that for not fixed alphabets, Shannon's information measures are everywhere discontinuous.}


</div>

#### Information Inequalities

We introduces some mathematical results first.


<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-20" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.20</span>.</p>


(Log-sum Inequality):<br>
$$\forall a_1,a_2\cdots >0, b_1,b_2\cdots \geq 0$$ such that $$\sum_{i}a_i<\infty, \sum_i b_i< \infty$$


$$
\begin{align}

\sum_{i}a_i\log \frac{a_i}{b_i}\geq (\sum_{i}a_i)\log \frac{\sum_{i}a_i}{\sum_{i}b_i}

\end{align}
$$


with the convention that $$\frac{a_i}{0}=\infty$$. Equality takes iff $$\forall i, \frac{a_i}{b_i}$$ is a constant.


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


Let


$$
\begin{align}

a_i'=\frac{a_i}{\sum_i a_i},\quad b'_i=\frac{b_i}{\sum_i b_i}

\end{align}
$$


then

$$
\begin{align}

0\leq & \sum_i a_i'\log \frac{a'_i}{b'_i}=\sum_i \frac{a_i}{\sum_j a_j}\log \frac{a_i/\sum_j a_j}{b_i/\sum_j b_j}\\
=&\frac{1}{\sum_j a_j}\left[\sum_i a_i\log \frac{a_i}{b_i}-(\sum_i a_i)\log\frac{\sum_j a_j}{\sum_j b_j} \right]

\end{align}
$$


equality holds iff $$a'_i=b'_i$$, or $$\forall i, \frac{a_i}{b_i}$$ is a constant.


<span id="pinskers-bound"></span>

</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-21" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.21</span>.</p>


(Pinsker's Bound):


$$
\begin{align}

D(p\Vert q)\geq \frac{1}{2\ln 2}V^2(p,q)

\end{align}
$$


This bound links the 2 distance above, showing that if $$D(p\Vert q)$$ or $$D(q\Vert p)$$ is small, then so is $$V(p,q)$$. The convergence in divergence is a stronger notion of convergence than in variational distance.


</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-22" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.22</span>.</p>


(Strong Additivity):<br>
All Shannon's information measures are nonnegative, i.e., for RVS $$X,Y,Z$$,


$$
\begin{align}

I(X;Y\mid Z)\geq 0 \label{Basic Inequalities}

\end{align}
$$


with equality iff $$X\perp Y\mid Z$$.


**Note.** Notice from the [conditional-independence characterization](#conditional-independence-markov-chain) that $$(X\perp Y\mid Z)\iff X \to Y \to Z$$

.

</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


It can be easily proved by


$$
\begin{align}

I(X;Y\mid Z)=\sum_{z}p[(z)D(p_{XY\mid z}\Vert p_{X\mid z}p_{Y\mid z})

\end{align}
$$


and that $$\mathcal{Z}$$ is finite and divergence is nonnegative. The equality will turn 0 iff


$$
\begin{align}

\forall z\in\mathcal{Z},\quad D(p_{XY\mid z}\Vert p_{X\mid z}p_{Y\mid z})=0\to p(x,y\mid z)=p(x\mid z)p(y\mid z)

\end{align}
$$


which is the definition of $$X\perp Y\mid Z$$.


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-23" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.23</span> <span class="math-statement__title">(Equality Conditions of Shannon&#39;s Measures)</span>.</p>



- $$H(X)=0 \iff X$$ is deterministic.


- $$H(X\mid Y)=0\iff Y$$ is a function of $$X$$.


- $$I(X;Y)=0 \iff X$$ and $$Y$$ are independent.


We refer to inequalities involving Shannon's information measures only as **information inequalities**. Likewise, for **information identities**:


$$
\begin{align}

H(Y\mid X)=H(X,Y)-H(Y),&\quad I(X;Y)=H(X)+H(Y)-H(X,Y)\\
I(X;Y\mid Z)=H(X,Z)&+H(Y,Z)-H(X,Y,Z)-H(Z)

\end{align}
$$


so information inequality only envolves entropies (possibly with constant terms). We list some useful information inequalities in this section, and it will be systematically studied in the next several sections.

<span id="conditioning-reduces-entropy"></span>


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-24" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.24</span>.</p>


(Conditions Does Not Increase Entropy):


$$
\begin{align}

H(Y\mid X)\leq H(Y) \label{Conditions Does Not Increase Entropy}

\end{align}
$$


with equality iff $$X$$ and $$Y$$ are independent.


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


$$H(Y\mid X)=H(Y)-I(X;Y)\leq H(Y)$$. Equality condition: $$I(X;Y)=0$$.


**Note.** Similarly, $$H(Y\mid X,Z)\leq H(Y\mid Z)$$.


[Conditioning reduces entropy](#conditioning-reduces-entropy) indicates that $$X$$ has side information on $$Y$$, by specifying $$X$$, the uncertainty about $$Y$$ cannot be increased on average upon receiveing side information.


<span id="independence-bound-for-entropy"></span>

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-25" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.25</span>.</p>


(Independence Bound for Entropy):


$$
\begin{align}

H(X_1,\cdots X_n )\leq \sum_{i=1}^{n}H(X_i)

\end{align}
$$


with equality iff $$X_1,\cdots X_n$$ are mutually independent.


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


This proof follows from [Conditioning reduces entropy](#conditioning-reduces-entropy) and the [chain rule for entropy](#chain-rule-entropy). Equality is seen as the alternative definition of mutual independence.


<span id="associative-law-of-mutual-information"></span>

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-26" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.26</span>.</p>


(Associative Law of Mutual Information):


$$
\begin{align}

I(X;Y,Z)\geq I(X;Y)

\end{align}
$$


with equality iff $$X\to Y\to Z$$ forms a Markov chain.


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


By the [chain rule for mutual information](#chain-rule-information),


$$
\begin{align}

I(X;Y,Z)=I(X;Y)+I(X;Z\mid Y)\geq I(X;Y)

\end{align}
$$


with equality iff $$I(X;Z\mid Y)=0$$, or $$X\to Y\to Z$$ forms a Markov chain.


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-27" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.27</span>.</p>


(Data Processing Inequality):


1. If $$X\to Y\to Z$$ forms a Markov chain, then:


$$
\begin{align}

I(X;Z)\leq I(X;Y),\quad I(X;Z)\leq I(Y;Z)\label{Data Processing Inequality1}

\end{align}
$$


with equality iff $$X\perp Y\mid Z$$ or $$Y\perp Z\mid X$$, respectively.

1. If $$U\to X\to Y\to V$$ forms a Markov chain, then


$$
\begin{align}

I(U;V)\leq I(X;Y)\label{Data Processing Inequality2}

\end{align}
$$


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


$$X\to Y\to Z\iff X\perp Y\mid Z\iff I(X;Z\mid Y)=0$$. then


$$
\begin{align}

I(X;Z)=&I(X;Y,Z)-I(X;Y\mid Z)\leq I(X;Y,Z)\\
=&I(X;Y)+I(X;Z\mid Y)=I(X;Y)

\end{align}
$$


another form of ($$\ref{Data Processing Inequality1}$$) is similarly proved. For ($$\ref{Data Processing Inequality2}$$), we have:


$$
\begin{align}

I(U;Y)\leq I(X;Y),\quad I(U,V)\leq I(U;Y)

\end{align}
$$


combining the 2 inequalities, we get ($$\ref{Data Processing Inequality2}$$).


We claim that the inequalities in this section do not require $$\mathcal{X}$$ to be a finite set. Actually, the inequality can be derived directly from the corresponding definitions, regardless of $$I$$-to-$$H$$ equalities ($$\ref{I to H1}$$), ($$\ref{I to H2}$$) and ($$\ref{I to H3}$$).


</div>

#### Measure Bounds and Fano's Inequality

We give an upper bound on Shannon's measures in terms of the size of the alphabet.


<span id="uniform-distribution-maximizes-entropy"></span>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-28" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.28</span>.</p>


(Uniform Distribution Maximizes Entropy):<br>
For RV $$X$$


$$
\begin{align}

H(X)\leq \log \lvert \mathcal{X}\rvert

\end{align}
$$


This upper bound is tight iff $$X$$ is u.d. on $$\mathcal{X}$$.


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


Let $$u:\mathcal{X}\to [0,1]$$ be a u.d. on$$\mathcal{X}$$, i.e. $$\forall x\in\mathcal{X}, u(x)=\frac{1}{\lvert \mathcal{X}\rvert}$$. Then we have:


$$
\begin{align}

\log\lvert \mathcal{X}\rvert-H(X)=&-\sum_{x\in \mathcal{S}_p}p(x)\log u(x)+\sum_{x\in \mathcal{S}_p}p(x)\log p(x)=D(p\Vert u)\geq 0

\end{align}
$$


Equality holds iff $$D(p\Vert u)= 0$$, which is equivalent to $$p=u$$.


By intermediate value theorem of $$H(p)$$, we can get:

</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-29" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.29</span>.</p>


The entropy of RV $$X$$ may take any value in $$[0,\log\lvert \mathcal{X}\rvert]$$.

We take the base of the logarithm to be $$\lvert \mathcal{X}\rvert$$ and $$H_{\lvert \mathcal{X}\rvert}(X)\in [0,1]$$. We call it **Normalized Entropy**, which is a measure of the unevenness of RVs.

We need to pay additional attention that for accountable alphabet, its entropy may not be finite:

</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-4" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.4</span> <span class="math-statement__title">(Entropy of RV with accountable alphabet)</span>.</p>



1. Let $$X\in \mathbb{N}_+$$ be RV, s.t. $$p(i)=2^{-i}, i\in \mathbb{N}_+$$. Then $$H_2(X)=\sum_{i=1}^{\infty}i2^{-i}=2$$ is finite. We later learn that $$H(X)$$ can be approximated by the entropy of $$\bar{X}$$ (a truncation of $$X$$).


1. Let $$Y\in \{(i,j):i\in \mathbb{N}_+, j\in [\frac{2^{2^i}}{2^i}] \}$$ be RV, s.t. $$Pr\{Y=(i,j)\}=2^{-2^i}$$. Then


$$
\begin{align}

\sum_{i=1}^{\infty}\sum_{j=1}^{\frac{2^{2^i}}{2^i}}Pr\{Y=(i,j)\}=\sum_{i=1}^{\infty}\frac{2^{2^i}}{2^i}2^{-2^i}=1\\
H_2(Y)=\sum_{i=1}^{\infty}\sum_{j=1}^{\frac{2^{2^i}}{2^i}}2^{-2^i}\log_2 2^{-2^i}=\sum_{i=1}^{\infty}1

\end{align}
$$


which does not converge.


**Note.** We will discuss the entropy of RV with accountable alphabets with its relation to the truncation.


Let $$X$$ be a DRV with known distribution $$p_{X}$$, known as **prior distribution**, and $$\hat{X}$$ be the estimate of RV $$X$$, and the probability of error is denoted by $$P_e=Pr\{\hat{X}\neq X\}$$. We reclaim that when $$P_e$$ is small, $$X=\hat{X}$$ with probability close to 1. Intuitively, $$H(\hat{X}\mid X)\to 0$$ are equivalent. It is tighter than $$X$$ and $$\hat{X}$$ have nearly the same distribution, or $$D(p_{X}\Vert p_{\hat{X}})\to 0$$. We give the upper bound on conditional entropy with $$P_e$$:

</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-30" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.30</span>.</p>


(Fano's Inequality):<br>
Let $$X$$ and $$\hat{X}$$ be RVs in the same alphabet $$\mathcal{X}$$. Then, when $$P_{e}$$ is small enough:


$$
\begin{align}

H(X\mid \hat{X})\leq h_b(P_e)+P_e\log(\lvert \mathcal{X}\rvert-1)<1+P_e\log(\lvert \mathcal{X}\rvert-1) \label{Fano's Inequality}

\end{align}
$$


where $$h_b$$ is the binary entropy function.


**Note.** ($$\ref{Fano's Inequality}$$) do not require $$\mathcal{X}$$ to be a finite set.


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


Let $$Y$$ be an indicator RV such that:


$$
\begin{align}

Y=\begin{cases}
0,\quad & \text{ if } X=\hat{X}\\
1,\quad & \text{ if } X\neq\hat{X}
\end{cases}

\end{align}
$$


We have:


$$
\begin{align}

H(X\mid \hat{X})=&H(X\mid \hat{X})+H(Y\mid X,\hat{X})=H(X,Y\mid \hat{X})\\
=&H(Y\mid \hat{X})+H(X\mid Y,\hat{X})\leq H(Y)+H(X\mid Y,\hat{X})\\
=& h_b(P_e)+\sum_{\hat{x}\in \mathcal{X} }\left(p_{Y,\hat{X}}(0,\hat{x})H(X\mid Y=0,\hat{X}=\hat{x})+p_{Y,\hat{X}}(1,\hat{x})H(X\mid Y=1,\hat{X}=\hat{x})\right)\\
=& h_b(P_e)+0+\sum_{\hat{x}\in \mathcal{X}}p_{Y,\hat{X}}(1,\hat{x})H(X\mid Y=1,X\neq\hat{x})\\
\leq & h_b(P_e)+\log(\lvert \mathcal{X}\rvert-1)\sum_{\hat{x}\in \mathcal{X}}p_{Y,\hat{X}}(1,\hat{x})\\
=& h_b(P_e)+P_e\log(\lvert \mathcal{X}\rvert-1)

\end{align}
$$


where the inequalities are from ($$\ref{Conditions Does Not Increase Entropy}$$) and that $$p_Y(1)=P_e$$.


For $$P_{e}\sim Ber(p)$$, $$h_{b}(P_{e})$$ has a general lower bound $$h_{b}(P_{e})\geq 4p(1 - p)$$.

We discuss the implications of Fano's inequality. When $$\mathcal{X}$$ is finite, the $$P_e=0$$ implies $$H(X\mid \hat{X})=0$$, which. However, when $$\mathcal{X}$$ is infinite and $$\lim\limits_{n\to \infty}P_e\log \lvert \mathcal{X}\rvert\neq 0$$, $$H(X\mid \hat{X})$$ may be at random large.

For estimators $$X\stackrel{P_{Y\mid X}}{\to}Y\stackrel{g(Y)}{\to}\hat{X}$$. By Fano's inequality,


$$
\begin{align}

H(X\mid Y)\leq H(X\mid \hat{X})\leq h_{b}(P_{e}) + P_{e}\log (\lvert \mathcal{X} - 1\rvert)

\end{align}
$$


Sometimes we call the above Fano's Inequality. Specifically, we do not need $$g(Y)$$ to perform Fano's inequality. Conversely, we also want the optimal $$g(\cdot)\in \arg \min_{g(\cdot)} P[X\neq g(Y)]$$. We have


$$
\begin{align}

g(\cdot)\in & \arg \min_{g(\cdot)} P[X\neq g(Y)]\\
\iff	g(\cdot)\in &\arg \min_{g(\cdot)} 1 - \sum_{y}p_{Y}(y)\sum_{x}  P_{X\mid Y}(x\mid y)\mathbb{I}_{\{g(y) = x\}}\\
\iff g(y)\in &  \sum_{y}p_{Y}(y)\arg \max_{g(y)} P_{X\mid Y}(g(y)\mid y)\quad \forall y\in \mathcal{Y}\\
\iff g(y)\in& \arg \max_{x}P_{X\mid Y}(x\mid y)

\end{align}
$$


where


$$
\begin{align}

P_{e,min} = 1 - \sum_{y} p_{Y}(y)\max P_{X\mid Y}(x\mid y)

\end{align}
$$


the $$\hat{X} =g^{\prime}(Y)$$ is called the Maximum A Posteriori (MAP) Estimator of $$X$$, which minimizes the $$P_{e}$$.

Other than $$\log \lvert \mathcal{X}\rvert$$, we can get another UB on $$H(X)$$ knowing the distribution.


$$
\begin{align}

H(X) =- \sum_{x} p(x)\log p(x)\geq - \log p_{max}

\end{align}
$$


where $$p_{max} = \max_{x}p(x)$$, and 	$$H_{l,\infty}(X) =- \log p_{max}$$ is called learning entropy of infinity degree. For example, for $$X\sim Ber(p)$$, $$H_{l,\infty}(X) =- \log \max \{p,1 - p\}$$, and $$p_{max}\geq 2^{- H(X)}$$.


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-31" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.31</span> <span class="math-statement__title">(Reverse Fano&#39;s inequality, L. Baumn, 1997)</span>.</p>


There exists a estimator s.t.


$$
\begin{align}

H(X\mid Y)\geq - \log (1 - P_{e})

\end{align}
$$


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>

The estimator having minimum $$P_{e}$$ is MAP, which has the following UB:


$$
\begin{align}

P_{e} =& 1 - \sum_{y} p_{Y}(y)\max_{x}P_{X\mid Y}(x\mid y)\\
\leq & 1 - \sum_{y}p_{Y}(y)2^{- H(X\mid Y = y)}\\
\leq & 1 - 2^{- \sum_{y} p_{Y}(y)H(X\mid Y = y)}\\
=& 1 - 2^{- H(X\mid Y)}

\end{align}
$$


</div>

### Measure with CRV


#### Entropy for CRV $$X$$


In DRV X, the entropy will be


$$
\begin{align}

H(X) =- \sum_{x\in \mathcal{X}}p(x)\log p(x)

\end{align}
$$


when $$\lvert \mathcal{X}\rvert= \infty$$, we measure $$X$$ with $$H(X)$$ if the sum is finite. What  if $$X$$ is a CRV?


<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-12" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.12</span> <span class="math-statement__title">(Quantized Entropy)</span>.</p>


For a mixed RV $$X$$ with CDF $$F_{X}$$, We take a uniform quantizer with sample size $$\Delta = \frac{1}{n}$$:


$$
\begin{align}

X_{n} =\frac{\lceil nX\rceil}{n}

\end{align}
$$


We definition the dimension of $$X\sim F_{X}$$:


$$
\begin{align}

d = \lim\limits_{n \to \infty} \frac{H(X_{n})}{\log n}

\end{align}
$$


Then the quantized entropy of $$X$$ can be defined as:


$$
\begin{align}

h(X) = \lim\limits_{n \to \infty}(H(X_{n}) - d \log n)

\end{align}
$$


The motivation here is that we expect $$H(X_{n}) = h(X) + d\log n + o(n)$$.


</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-5" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.5</span>.</p>


(When $$X$$ is a DRV): $$X_{n} = X \forall n$$. Then $$d = 0$$, $$h(X) = H(X)$$.


</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-6" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.6</span>.</p>


(When $$X$$ is continuous): If $$\mu = \mathbb{P}\circ X^{-1}$$ is absolutely continuous with $$Leb$$, with PDF $$f_{X} = \frac{d \mu}{d Leb}$$, Then $$\forall i$$, $$\exists x_{i}\in (i\Delta,(i + 1)\Delta]$$,s.t.


$$
\begin{align}

f(x_{i}) = \frac{1}{\Delta}\int_{i\Delta, (i + 1)\Delta}f_{X}(x)dx

\end{align}
$$


Then


$$
\begin{align}

H(X_{n}) =&- \sum_{i}f(X_{i})\Delta \log (f(x_{i})\Delta) \\
=& - \sum_{i}f(x_{i})\Delta \log \Delta - \sum_{i}f(x_{i})\Delta \log f(x_{i})\\
\to& \log n - \int_{\mathcal{X}}f(x)\log f(x)dx

\end{align}
$$


when  $$\int_{\mathcal{X}}f(x)\log f(x)dx\leq \infty$$, the dimension


$$
\begin{align}

d = 1, \quad h(X) =\int_{\mathcal{X}}f(x)\log f(x)dx

\end{align}
$$


where we call $$h(X) = H(X_{n}) - \log n$$ the differential entropy


</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-7" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.7</span>.</p>


(When $$X$$ is a mixed RV): Suppose a RV $$X$$ with $$f_{X}$$ w.p $$p$$ and with $$p_{X}$$ w.p. $$q =(1 - p)$$. A grouping/Fietition axiom is used here to make it consistence:


$$
\begin{align}

H(X_{n}) = h_{b}(p) + p(\log n + h(f_{X})) +(1 - p)H(p_{X})

\end{align}
$$


If $$h(f_{X})$$ and $$H(p_{X})$$ are finite, then


$$
\begin{align}

d = p

\end{align}
$$


and the entropy is


$$
\begin{align}

h(X) \to h_{b}(p) + p h(f_{X}) +(1 - p)H(p_{X})

\end{align}
$$


One interesting notice is that $$h(X)$$ here can be negative and infinite.

Another is that differential entropy of DRV is $$- \infty$$, while discrete entropy of CRV is $$+ \infty$$.


</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-8" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.8</span>.</p>


$$X$$ is a CRV with $$f(x) = \frac{1}{a}, x\in (0,a]$$. Then


$$
\begin{align}

h(X) =- \int_{0}^{a}\frac{1}{a}\log \frac{1}{a}dx = \log a

\end{align}
$$


therefore, the entropy will be positive, negative, or $$0$$ depending on $$a$$ we choose.


</div>

<div class="math-statement math-statement--example" data-statement="example" id="example-2-9" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Example 2.9</span>.</p>


Consider a Gaussian $$X\sim \mathcal{N}(0,1)$$ with $$f(x)$$


$$
\begin{align}

f(x) = - \mathbb{E}[\log f(X)]= \frac{1}{2}\log(2\pi) + \frac{1}{2}\mathbb{E}[X^{2}]\log e = \frac{1}{2}\log (2\pi e)

\end{align}
$$


and for a non-standard RV $$Y = aX + c$$, $$h(Y) = h(X) + \log\lvert a\rvert$$. Therefore, for $$Y\sim \mathcal{N}(\mu,\sigma ^{2})$$, $$h(Y) = \frac{1}{2} \log_{2}(2\pi e\sigma ^{2})$$.


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-32" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.32</span>.</p>



$$
\begin{align}

h(X)\leq \frac{1}{2}\log [2\pi e \text{Var}(X)]

\end{align}
$$


w.e.iff $$X\sim \mathcal{N}(\mu,\sigma ^{2})$$


</div>

#### Relative entropy for general $$X$$ with $$P,Q$$


<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-13" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.13</span>.</p>


Let $$P,Q$$ be 2 pdfs defined on continuous $$\mathcal{X}$$. Let $$P_{n}, Q_{n}$$ be the pmfs quantized by $$\Delta = \frac{1}{n}$$. Then


$$
\begin{align}

\lim\limits_{n \to \infty}D(P_{n}\Vert Q_{n}) = D(P\Vert Q).

\end{align}
$$


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-33" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.33</span>.</p>


If $$P<<Q$$, then the following equality holds as long as all of them are well-defined, i.e., $$< \infty$$:


$$
\begin{align}

D(P\Vert Q) = \int_{\mathcal{X}}f_{P}(x)\log \frac{f_{P}(x)}{f_{Q}(x)}dx

\end{align}
$$


Otherwise if $$P<<Q$$ not hold, we set $$D(P\Vert Q) = \infty$$.


</div>

<div class="math-statement math-statement--lemma" data-statement="lemma" id="lemma-2-34" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Lemma 2.34</span>.</p>

Let $$X$$ be a CRV, then


$$
\begin{align}

h(X)\leq \frac{1}{2}\log (2\pi e Var(X))

\end{align}
$$


w.e.iff $$X\sim \mathcal{N}(\mu,\sigma ^{2})$$


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


let $$X$$ with pdf $$f$$, and $$Y\sim \mathcal{N}(0,\sigma ^{2})$$ with pdf $$g$$, then $$\mathbb{P}\circ X^{-1}<<\mathbb{P}\circ Y^{-1}$$


$$
\begin{align}

0\leq D(f\Vert g) =& \mathbb{E}_{f}[\log f - \log g]\\
=& -h(X) - \mathbb{E}_{f}[\log g]\\
=& -h(X) - \mathbb{E}_{g}[\log g]

\end{align}
$$


then $$h(X)\leq \frac{1}{2}\log(2\pi e Var(X))$$.

Equality holds when $$D(f\Vert g)= 0$$, or, $$f = g \mathbb{P}\circ X^{-1}$$- a.e.


</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-35" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.35</span> <span class="math-statement__title">(Source coding in CRV)</span>.</p>



- Lossless source coding is not be positive


- Lossy source coding is what we need, the problem is analogous to Discrete coding.


</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-14" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.14</span> <span class="math-statement__title">(Channel CRV-channel Coding: Gaussian Channel)</span>.</p>


Consider a continuous alphabet channel $$Y = f(X,Z)$$ is equivalent to $$P_{Y\mid X}(y,x)$$ for $$x,y\in\mathbb{R}$$. A simple one is the Gaussian Channel where $$Y = X + Z$$ and $$X\stackrel{\text{i.i.d.}}{\sim}N$$ and $$N\sim \mathcal{N}(0,\sigma ^{2})$$


For a Gaussian Channel with $$Z\sim \mathcal{N}(0,N)$$


- if there is no constraint on $$X$$, the capacity is $$\infty$$.


- When some input constraint is applied, the capacity will be finite. The most common constraint is the power constraints with given $$P$$:


$$
\begin{align}

\frac{1}{n}\sum_{i = 1}^{n} \mathbb{E}[X_{i}^{2}]\leq P

\end{align}
$$


</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-15" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.15</span> <span class="math-statement__title">(Gaussian Channel coding with power constraint)</span>.</p>


Let $$(n,M)$$ be a channel code, the channel coding integrates an encoder:


$$
\begin{align}

f:[M]\to \mathbb{R}^{n}, \quad \text{ or } f: W\mapsto X^{n}

\end{align}
$$


and a decoder:


$$
\begin{align}

g: \mathbb{R}^{n}\to [M] , \quad \text{ or } f: Y^{n}\mapsto \hat{W}

\end{align}
$$


The metrics is the rate


$$
\begin{align}

R =\frac{\log M}{n}

\end{align}
$$


and the probability of error:


$$
\begin{align}

P_{e} = \frac{1}{M}\sum_{w = 1}^{M}P(g(Y^{n})\neq w\mid X^{n} = f(w))

\end{align}
$$


with constraint of power:


$$
\begin{align}

\frac{1}{M}\sum_{w = 1}^{M}\frac{1}{n}\sum_{i = 1}^{n}x_{i}^{2}(w)\leq P

\end{align}
$$


</div>

<div class="math-statement math-statement--definition" data-statement="definition" id="definition-2-16" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Definition 2.16</span>.</p>


$$(R,\tau)$$ is achievable if there exists a sequence of $$(n,M)$$ code s.t.


$$
\begin{align}

\lim\limits_{n \to \infty}\frac{\log M}{n}\to R_{-}\\
\lim\limits_{n \to \infty}P_{e} = 0_{+}\\
\lim\limits_{n \to \infty}\frac{1}{M}\sum_{w = 1}^{M}\frac{1}{n}\sum_{i = 1}^{n}x_{i}^{2}(w) = \tau_{+}

\end{align}
$$


and the capacity of the channel is


$$
\begin{align}

C(P) = \sup\left\{ R: (R,\tau) \text{x is achievable  and } \tau = P \right\}

\end{align}
$$


</div>

<div class="math-statement math-statement--theorem" data-statement="theorem" id="theorem-2-36" markdown="1">
<p class="math-statement__heading"><span data-statement-label>Theorem 2.36</span> <span class="math-statement__title">(Capacity of Gaussian Channel with power constraints)</span>.</p>


the capacity of the Gaussian channel with noise level $$N$$ and power constraint $$P$$ is


$$
\begin{align}

C(P) = \frac{1}{2}\log (1 + \frac{P}{N})

\end{align}
$$


**Note.** We call $$\frac{P}{N}$$ the SNR of the system.


</div>

<div class="math-proof" markdown="1">
<p class="math-statement__heading"><span>Proof</span>.</p>


The Achievability is based on the non-Bayesian Hypothesis testing, so can simply generalized to CRV case. A one-shot achievability is here. To this end, we choose $$M$$ sequences of $$x^{n}$$ from $$f$$, and the decoder is based on


$$
\begin{align}

A_{\epsilon}^{(n)} (f\Vert g) = \left\{ x^{n}: \frac{1}{n}\log \frac{f^{n}(x^{n})}{g^{n}(x^{n})}\approx D(f\Vert g) \right\}

\end{align}
$$


Then by Stein's Lemma,

$$
\begin{align}

P(X^{n}\in A_{\epsilon}^{(n)}(f\Vert g))\to 1 \quad \text{ as } n\to \infty

\end{align}
$$


therefore, one shot approach can be used, and $$I(X;Y)$$ is achievable. We then approach(optimize) $$I(X;Y)$$ with any input PDF $$f$$ as follows:

We choose $$X\sim \mathcal{N}(0,P)$$, then $$Y = X + Z\sim \mathcal{N}(0,N + P)$$


$$
\begin{align}

I(X;Y) =& H(Y) - H(Z) = \frac{1}{2}\log (2\pi e (P + N)) -\frac{1}{2}\log (2\pi e  N)\\
=& \frac{1}{2}\log \left( 1 + \frac{P}{N} \right)

\end{align}
$$


The converse follows this idea:


- Markov Chain: $$W\to X^{n}\to Y^{n}\to \hat{W}$$


- $$\log M\leq 1 + P_{e}\log M + nI(X;Y)$$
</div>
