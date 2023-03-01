---
commentable: true
protected:
numbering: 
type:
repopath:
mathjax: true
categories: Analysis
tags: Analysis
keywords: Fundemental-Math
description: Zermelo-Fraenkel set theory with the Axiom of Choice (ZFC) is a widely accepted formal system for set theory. It consists of nine axioms.
mermaid: true
highlight: true
status: Archive
---
# Axiomatized Set Theory: ZFC Axioms

Zermelo-Fraenkel set theory with the Axiom of Choice (ZFC) is a widely accepted formal system for set theory. It consists of nine axioms, which are:

# Extensionality

The Extensionality Axiom is one of the fundamental axioms of ZFC set theory. It states that two sets are equal if and only if they have the same elements.


$$
\forall x \forall y [\forall z (z \in x \Leftrightarrow z \in y) \Rightarrow x=y]
$$

This means that if two sets have exactly the same elements, then they are identical sets. Conversely, if two sets are identical, then they have exactly the same elements. This may seem like a trivial statement, but it is actually quite powerful and fundamental to the rest of set theory.

The Extensionality Axiom allows us to reason about sets purely in terms of their elements. If we know the elements of two sets, we can determine whether or not they are the same set. It also allows us to define sets by specifying their elements. For example, we can define the set of all even natural numbers as follows:


$$
\{n \in \mathbb{N} \mid n \text{ is even}\}
$$

This notation specifies a set by defining its elements (in this case, all even natural numbers). By the Extensionality Axiom, we know that this set is unique and well-defined, since any two sets with exactly the same even natural numbers as elements are the same set.

In summary, the Extensionality Axiom allows us to reason about sets purely in terms of their elements, and to define sets by specifying their elements.

# Regularity

The Regularity Axiom is one of the nine axioms of ZFC set theory. It states that every non-empty set has an element that is disjoint from it.


$$
\forall x [\exists y (y \in x) \Rightarrow \exists z (z \in x \land z \cap x = \varnothing)]
$$

This may seem like a strange statement at first, but it is actually quite intuitive. The idea is that if we have a non-empty set, then there must be an element in it that is "minimal" in some sense. That is, there must be an element that has no other elements "beneath" it in the set hierarchy.

One possible way to think about this is in terms of membership graphs. Given a set $x$, we can draw a graph where each element of $x$ is a node, and there is an edge from node $a$ to node $b$ if and only if $a$ is an element of $b$. This graph is called the membership graph of $x$. The Regularity Axiom tells us that every non-empty set has a node in its membership graph that has no incoming edges.

Another way to think about the Regularity Axiom is in terms of the "rank" of a set. The rank of a set $x$, denoted $rank(x)$, is the smallest ordinal $\alpha$ such that $x \subseteq V_\alpha$, where $V_\alpha$ is the $\alpha$-th level of the cumulative hierarchy of sets. The Regularity Axiom tells us that every non-empty set has an element with rank strictly less than the rank of the set itself. Intuitively, this means that every set has a "minimal" element in terms of the level of the cumulative hierarchy it belongs to.

The Regularity Axiom has several important consequences and applications in set theory. For example, it implies that there are no infinite descending chains of sets with respect to the inclusion relation. That is, if we have a sequence of sets $x_1 \supseteq x_2 \supseteq x_3 \supseteq \cdots$, then this sequence must eventually stabilize, meaning that there is some $k$ such that $x_k = x_{k+1} = x_{k+2} = \cdots$. This fact has important applications in the study of well-founded relations and recursion theory.

In summary, the Regularity Axiom ensures the existence of "minimal" elements in sets, and has important consequences for the structure and behavior of sets and their membership graphs.

# Pairing

The Axiom of Pairing is one of the nine axioms of ZFC set theory. It allows us to create a new set that contains exactly two given elements.


$$
\forall x \forall y \exists z \forall w [w \in z \Leftrightarrow (w = x \lor w = y)]
$$

This means that for any two sets $x$ and $y$, there exists a set $z$ whose only elements are $x$ and $y$. We can denote this set as $\{x,y\}$.

The Axiom of Pairing allows us to create pairs of sets, which are fundamental building blocks in set theory. We can use pairs to define ordered pairs, Cartesian products, and other important constructs.

One important fact about pairs is that they are unordered. That is, $\{x,y\}$ and $\{y,x\}$ are considered to be the same set. This can be proved using the Axiom of Extensionality.

The Axiom of Pairing has several important consequences and applications in set theory. For example, it allows us to define binary relations as sets of ordered pairs. Given sets $X$ and $Y$, we can define a binary relation $R$ between $X$ and $Y$ as a subset of the Cartesian product $X \times Y$. This subset can be constructed using pairs and the Axiom of Separation.

Another application of the Axiom of Pairing is in the construction of the natural numbers. The natural number $0$ can be defined as the empty set $\varnothing$, and each subsequent natural number $n+1$ can be defined as the set $\{n\}$, which contains only the previous natural number. Using this definition, we can construct the entire set of natural numbers using only the Axiom of Pairing and the Axiom of Union.

In summary, the Axiom of Pairing allows us to create pairs of sets and has important consequences for the construction of other fundamental constructs such as relations and natural numbers.

# Union

The Axiom of Union is one of the nine axioms of ZFC set theory. It allows us to create a new set that contains all the elements of a collection of sets.


$$
\forall A \exists B \forall x [(x \in B) \Leftrightarrow (\exists y \in A) (x \in y)]
$$

This means that for any set $A$, there exists a set $B$ that contains exactly the elements of the sets that are members of $A$. We can denote this set as $\bigcup A$.

The Axiom of Union allows us to construct unions of sets, which are fundamental operations in set theory. We can use unions to define intersections, complements, and other important constructs.

One important fact about unions is that they are associative. That is, $(A \cup B) \cup C = A \cup (B \cup C)$ for any sets $A$, $B$, and $C$. This can be proved using the Axiom of Extensionality.

The Axiom of Union has several important consequences and applications in set theory. For example, it allows us to define the intersection of two sets as the complement of their symmetric difference. Given sets $A$ and $B$, we can define their intersection $A \cap B$ as $(A \cup B) - (A - B) - (B - A)$. This definition can be simplified using the Axiom of Union and the Axiom of Complement.

Another application of the Axiom of Union is in the construction of the hierarchy of sets. This hierarchy is defined recursively as follows: $V_0 = \varnothing$, and for each ordinal $\alpha$, $V_{\alpha+1} = \bigcup V_\alpha$. For limit ordinals $\lambda$, $V_\lambda = \bigcup_{\alpha < \lambda} V_\alpha$. Using this definition, we can construct a transfinite sequence of sets that includes all the sets in ZFC set theory.

In summary, the Axiom of Union allows us to construct unions of sets and has important consequences for the construction of other fundamental constructs such as intersections, complements, and the hierarchy of sets.

# Power Set

The Axiom of Power Set is one of the nine axioms of ZFC set theory. It states that for any set $A$, there exists a set $P(A)$, called the power set of $A$, that contains all the subsets of $A$.


$$
\forall A \exists P(A) \forall B [(B \subseteq A) \Rightarrow (B \in P(A))]
$$

This means that for any set $A$, there exists a set $P(A)$ that contains all the subsets of $A$. We can denote the power set of $A$ as $\mathcal{P}(A)$.

The Axiom of Power Set allows us to construct a set that contains all the possible subsets of a given set. This is a crucial concept in set theory and has many applications. For example, we can use the power set to define operations like set difference and complement.

One important fact about the power set is that it is always larger than the original set. That is, $|P(A)| > |A|$ for any set $A$. This can be proved using the Axiom of Regularity and the Cantor's theorem.

The Axiom of Power Set has several important consequences and applications in set theory. For example, it allows us to define the Cartesian product of two sets. Given sets $A$ and $B$, we can define their Cartesian product $A \times B$ as the set of all ordered pairs $(a,b)$ where $a \in A$ and $b \in B$. This set can be constructed using the power set and other ZFC axioms.

Another application of the Axiom of Power Set is in the construction of the real numbers. The real numbers can be defined as the set of all Dedekind cuts, which are subsets of the rational numbers that partition the rational number line. The power set allows us to construct the set of all subsets of the rational numbers, which includes all the possible Dedekind cuts.

In summary, the Axiom of Power Set allows us to construct a set that contains all the possible subsets of a given set. This concept has many important applications in set theory, including the construction of the Cartesian product and the real numbers.

# Axiom of Choice

The Axiom of Choice is one of the nine axioms of ZFC set theory. It states that given any collection of non-empty sets, there exists a way to choose exactly one element from each set in the collection.


$$
\forall \mathcal{A} [\emptyset \notin \mathcal{A} \Rightarrow \exists f : \mathcal{A} \rightarrow \bigcup \mathcal{A}\, \text{such that}\, f(A) \in A\,\,\forall A \in \mathcal{A}]
$$

This means that for any collection of non-empty sets $\mathcal{A}$, there exists a function $f$ that assigns to each set in $\mathcal{A}$ exactly one element that belongs to that set. The Axiom of Choice is often written using the notation of set theory as follows:


$$
\forall \mathcal{A} [\emptyset \notin \mathcal{A} \Rightarrow \prod \mathcal{A} \neq \emptyset]
$$

where $\prod \mathcal{A}$ denotes the Cartesian product of the sets in $\mathcal{A}$.

The Axiom of Choice has many important consequences in mathematics, including in topology, analysis, algebra, and set theory. One of the most famous applications of the Axiom of Choice is in the proof of the Banach-Tarski paradox, which states that it is possible to decompose a solid ball into a finite number of pieces and then reassemble those pieces to form two solid balls of the same size as the original.

Despite its many applications, the Axiom of Choice is also controversial among mathematicians, as it implies the existence of non-constructive objects, and some argue that it violates intuition in certain cases. As a result, some mathematicians work in set theories that do not include the Axiom of Choice or only use it in specific contexts.

An alternative to the Axiom of Choice is the Axiom of Countable Choice, which states that given any countable collection of non-empty sets, there exists a way to choose one element from each set in the collection. This weaker form of the Axiom of Choice has many of the same applications but avoids some of the more controversial consequences of the full axiom.

# Infinity

The Axiom of Infinity is one of the nine axioms of ZFC set theory. It states that there exists at least one set that contains the empty set and is closed under the successor operation.


$$
\exists \mathbb{N} [\emptyset \in \mathbb{N} \wedge \forall x \in \mathbb{N}(x\cup\{x\} \in \mathbb{N})]
$$

This means that there exists a set $\mathbb{N}$ that contains the empty set $\emptyset$ and is closed under the successor operation, which adds one element to a set. The axiom guarantees the existence of an infinite set, which is crucial in many areas of mathematics.

There are alternative descriptions of the Axiom of Infinity that are equivalent to the above statement. One such description is to say that there exists a set that contains the empty set and is closed under the power set operation:


$$
\exists S [\emptyset \in S \wedge \forall x (x\in S \Rightarrow \mathcal{P}(x)\in S)]
$$

where $\mathcal{P}(x)$ denotes the power set of $x$, i.e., the set of all subsets of $x$.

The Axiom of Infinity has many important consequences in mathematics, including in number theory, topology, and analysis. In particular, the axiom guarantees the existence of infinite sets, which are essential for the development of many mathematical concepts and structures.

It is worth noting that the Axiom of Infinity does not specify the size or structure of the infinite set it guarantees. In fact, there are many different infinite sets that satisfy the axiom, such as the set of natural numbers, the set of even numbers, or the set of all finite sets. This is one of the reasons why the axiom is considered a foundational principle of set theory.

# Foundation

The Axiom of Foundation is one of the nine axioms of ZFC set theory. It is also known as the Axiom of Regularity. The axiom states that every non-empty set $x$ contains an element $y$ that is disjoint from $x$.


$$
\forall x (\exists y (y\in x) \Rightarrow \exists y (y\in x \wedge \forall z(z \in y \Rightarrow z \notin x)))
$$

In other words, every non-empty set $x$ has an element $y$ that is "earlier" than $x$, in the sense that $y$ is not an element of $x$ and every element of $y$ is also "earlier" than $x$. This prevents the existence of "cycles" in the membership relation $\in$, where a set is an element of itself or a member of a member of itself, which can lead to contradictions in set theory.

The Axiom of Foundation implies several important results in set theory, such as the existence of a well-founded relation on the class of all sets, and the fact that every set can be well-ordered. It also allows for the development of transfinite induction, which is a powerful tool in the study of infinite sets.

There are alternative descriptions of the Axiom of Foundation that are equivalent to the above statement. One such description is to say that every non-empty set $x$ has an element $y$ that is minimal with respect to the $\in$-relation:


$$
\forall x (\exists y (y\in x) \Rightarrow \exists y (y\in x \wedge \neg\exists z (z \in y \wedge z \in x)))
$$

where $\neg$ denotes logical negation.

Overall, the Axiom of Foundation ensures the well-behaved nature of the membership relation $\in$, and leads to many important results in the study of sets and their properties.

# Replacement

The Axiom of Replacement is one of the nine axioms of ZFC set theory. It allows us to construct a new set by applying a definable function to the elements of an existing set.


$$
\forall x \forall y_1 \forall y_2 \cdots \forall y_n (\forall z(z \in x \Rightarrow \exists ! w \phi(w,z,y_1,y_2,\ldots,y_n)) \Rightarrow \exists y \forall z(z \in x \Rightarrow \phi(y,z,y_1,y_2,\ldots,y_n)))
$$

In other words, for any set $x$ and definable function $\phi$, we can create a new set $y$ consisting of the outputs of $\phi$ when applied to the elements of $x$.

The Axiom of Replacement is a powerful tool in set theory, allowing us to construct new sets from old ones and proving many important results. It implies the existence of a set of all ordered pairs, as well as the existence of the power set of any set.

There are alternative descriptions of the Axiom of Replacement that are equivalent to the above statement. One such description is to say that if $\phi$ is a function such that for every $x$ there exists a unique $y$ satisfying $\phi(x,y)$, then the range of $\phi$ exists as a set:


$$
\forall \phi \forall A (\forall x \in A \exists ! y \phi(x,y) \Rightarrow \exists B \forall y(y \in B \Leftrightarrow \exists x \in A \phi(x,y)))
$$

where $\Leftrightarrow$ denotes logical equivalence.

Overall, the Axiom of Replacement allows for the construction of new sets from old ones and leads to many important results in the study of sets and their properties.

These nine axioms, together with first-order logic, form the basis of ZFC set theory. They allow for the development of a wide range of mathematical concepts and provide a rigorous foundation for modern mathematics.

# Compatibility of ZFC

**Theorem:** The nine axioms of the ZFC framework are compatible with each other, i.e., there is no contradiction between them.

**Proof:**

We will prove the compatibility of each pair of axioms:

### Proof 1. Compatibility of Extensionality

* **Extensionality and Regularity:**

Let $A$ be a set. By the Extensionality axiom, the set $A$ is uniquely determined by its elements, so we can define the set $B={A}$.
Now, by the Regularity axiom, there exists an element $C\in B$ such that $C\cap B=\varnothing$. Since $C\in B$, we have $C=A$, so $A\cap{A}=\varnothing$. This means that $A$ does not contain itself, which satisfies the Regularity axiom.
Therefore, Extensionality and Regularity are compatible with each other.

* **Extensionality and Pairing:**

Let $A$ and $B$ be sets. By the Pairing axiom, there exists a set $C={A,B}$. Suppose for contradiction that $C$ is not uniquely determined by its elements, i.e., there exists a set $D\neq C$ such that $x\in C$ if and only if $x\in D$.
Then, either $A\in D$ and $B\notin D$, or $A\notin D$ and $B\in D$. Without loss of generality, assume that $A\in D$ and $B\notin D$. Then, by the Extensionality axiom, $C\neq D$, which is a contradiction.
Therefore, Extensionality and Pairing are compatible with each other.

* **Extensionality and Union:**

Let $A$ be a set. By the Union axiom, there exists a set $B=\bigcup A$. Suppose for contradiction that $B$ is not uniquely determined by its elements, i.e., there exists a set $C\neq B$ such that $x\in B$ if and only if $x\in C$.
Then, for all $a\in A$, $a\subseteq B$ and $a\subseteq C$, so $B\subseteq C$ and $C\subseteq B$. Therefore, $B=C$, which is a contradiction.
Therefore, Extensionality and Union are compatible with each other.

* **Extensionality and Power Set:**

Let $A$ be a set. By the Power Set axiom, there exists a set $B=\mathcal{P}(A)$. Suppose for contradiction that $B$ is not uniquely determined by its elements, i.e., there exists a set $C\neq B$ such that $x\in B$ if and only if $x\in C$.
Then, for all $a\subseteq A$, $a\in B$ if and only if $a\in C$, so $B=C$, which is a contradiction.
Therefore, Extensionality and Power Set are compatible with each other.

* **Extensionality and Infinity:**

By the Infinity axiom, there exists an infinite set $A$. By the Extensionality axiom, any two sets with the same elements are equal, so any infinite set $A$ has the same elements as any other infinite set. Therefore, there is no contradiction between Extensionality and Infinity.

* **Foundation Axiom:**

The Foundation axiom states that every non-empty set$A$ contains an element that is disjoint from $A$. This axiom is not affected by the Extensionality axiom, since the existence of a disjoint element is determined by the elements of the set, which are uniquely determined by the set's Extensionality.

* **Replacement Axiom:**

The Replacement axiom states that given any set $A$ and any functional relation $f$, there exists a set that contains the image of $A$ under $f$. This axiom is not affected by the Extensionality axiom, since the image of $A$ under $f$ is uniquely determined by the Extensionality of $A$ and the properties of the functional relation $f$.

* **Axiom of Choice:**

The Axiom of Choice states that given any collection of non-empty sets, there exists a way to choose one element from each set in the collection. This axiom is also not affected by the Extensionality axiom, since the choice of elements is determined by the elements of the sets, which are uniquely determined by the sets' Extensionality.
