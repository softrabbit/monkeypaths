# monkeypaths
Backstory: Prune a graph to optimize monkey movement

## The mission
Given a graph of routes, optimize it to minimize the function
__P = A * W + B* D<sub>avg</sub>__, where:

  * A = 0.1
  * B = 2.1
  * W = the sum of all edges' lengths
  * D<sub>avg</sub> = the average of all shortest routes

The graph to optimize has 147 nodes and 434 bidirectional edges.
