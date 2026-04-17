function dijkstra(nodes, edges, startNode, endNode) {
  const dist = {};
  const visited = {};
  const prev = {};
  const visitedOrder = [];

  nodes.forEach((n) => {
    dist[n.id] = Infinity;
    visited[n.id] = false;
    prev[n.id] = null;
  });

  dist[startNode] = 0;

  while (true) {
    let u = null;
    let min = Infinity;

    for (let id in dist) {
      if (!visited[id] && dist[id] < min) {
        min = dist[id];
        u = Number(id);
      }
    }

    if (u === null) break;

    visited[u] = true;
    visitedOrder.push(u);

    edges.forEach((e) => {
      const { from, to, weight } = e;

      if (u === from) {
        if (dist[from] + weight < dist[to]) {
          dist[to] = dist[from] + weight;
          prev[to] = from;
        }
      }

      if (u === to) {
        if (dist[to] + weight < dist[from]) {
          dist[from] = dist[to] + weight;
          prev[from] = to;
        }
      }
    });
  }

  const path = [];
  let cur = endNode;

  while (cur !== null) {
    path.unshift(cur);
    cur = prev[cur];
  }

  return {
    distance: dist[endNode],
    path,
    visitedOrder,
  };
}

export default dijkstra;
