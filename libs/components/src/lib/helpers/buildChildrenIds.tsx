import { TreeNode } from 'libs/aws-services/src/lib/types';

export function buildChildrenIds(node: TreeNode, result: string[]) {
  if (!node) {
    return result;
  }
  if (node.id) {
    if (node.isFile) {
      result.push(node.path as string);
    } else {
      const path = (node.path as string).endsWith('/') ? '' : node.path + '/';
      result.push(path);
    }
  }

  const children = Object.keys(node)
    .filter((k) => Number.isInteger((node[k] as TreeNode).id))
    .map((e) => node[e]) as TreeNode[];
  children.forEach((n: TreeNode) => buildChildrenIds(n, result));

  return result;
}
