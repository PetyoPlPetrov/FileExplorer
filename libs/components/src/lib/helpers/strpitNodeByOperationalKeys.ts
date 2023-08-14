import { TreeNode } from 'libs/aws-services/src/lib/types';

export const strpitNodeByOperationalKeys = (node: TreeNode) => (e: string) =>
  !Number.isInteger(node[e]) && e !== 'path' && e !== 'isFile';
