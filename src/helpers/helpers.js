function formatCash(str) {
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ".") + prev;
    });
}

function traverse(arr, parentId) {
  arr
    .filter((node) => node.parentId === parentId)
    .reduce(
      (result, current) => [
        ...result,
        {
          ...current,
          children: traverse(arr, current.id),
        },
      ],
      []
    );
}

function parseTree(arr) {
  arr
    .sort(({ order }) => order)
    .filter(({ parentId }) => !parentId)
    .map((node) => ({
      ...node,
      children: traverse(arr, node.id),
    }));
}

export default {
  parseTree,
};
