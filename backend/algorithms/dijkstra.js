function dijkstra(graph, start, end) {
  const distances = {};
  const visited = {};
  const previous = {};

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  distances[start] = 0;

  while (true) {
    let closest = null;

    for (let node in distances) {
      if (
        !visited[node] &&
        (closest === null || distances[node] < distances[closest])
      ) {
        closest = node;
      }
    }

    if (closest === null) break;
    if (closest === end) break;

    visited[closest] = true;

    for (let neighbor in graph[closest]) {
      const weight = graph[closest][neighbor];
      const newDist = distances[closest] + weight;

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = closest;
      }
    }
  }

  // Build path
  const path = [];
  let current = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    distance: distances[end],
    path,
  };
}

module.exports = dijkstra;
