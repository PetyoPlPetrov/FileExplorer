import { TreeNode } from 'libs/aws-services/src/lib/types';

export function buildTreeFromStrings(strings: string[]): {
  tree: TreeNode;
  nodes: Map<string, TreeNode>;
} {
  let nodeId = 1; // Initialize a unique ID counter

  const tree: TreeNode = {};
  const nodes = new Map();

  strings.forEach((string) => {
    const parts = string.split('/');
    let currentNode: TreeNode = tree;

    parts.forEach((part, index) => {
      if (part) {
        if (!currentNode[part]) {
          currentNode[part] = {
            id: nodeId++,
          };
        }
        currentNode = currentNode[part] as TreeNode;
        currentNode.path = parts.filter((p, i) => i <= index).join('/');
        nodes.set(currentNode.id, currentNode);
        if (index === parts.length - 1) {
          currentNode.isFile = true;
        }
      }
    });
  });

  return { tree, nodes };
}
