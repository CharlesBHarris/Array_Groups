This is a Node script designed to implement a selection algorithm on a collection of integer arrays. The selection criterion is to find all pairings of integers x and y which satisfy the following criteria:

1) if x is contained in an array, then the probability that y will also lie in the array is at least PROBABILITY_1.
2) if y is contained in an array, then the probability that x will also lie in the array is at least PROBABILITY_2.

Letting A and B denote the events that an arbitrary array contains element x or y, respectively, we deduce from standard conditional probability formulae that the relevant conditions become that
P(C) >= PROBABILITY_1 * P(A) and P(C) >= PROBABILITY_1 * P(B), where C denoted the event where an arbitrary array contains both x and y. The algorithm proceeds by loading the arrays into memory, calculating the relevant probabilities, and then outputting all pairs (x,y) which satisfy the correct conditions.

This code ran in 3.85 seconds on a 2.5Ghz i7 Macbook Pro OSX 10.11.
