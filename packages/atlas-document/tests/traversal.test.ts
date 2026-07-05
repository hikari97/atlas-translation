import {
  DocumentTraverser,
  TraversalStrategy
} from '@atlas/atlas-document/traversal';
import type { TraversableDocumentNode } from '@atlas/atlas-document/traversal';
import type { ID } from '@atlas/atlas-types';

const root: TraversableDocumentNode = {
  id: 'root' as ID<'node'>,
  children: [
    { id: 'child' as ID<'node'> }
  ]
};

const visited: ID[] = [];
const traverser = new DocumentTraverser();
const result = traverser.traverse(
  root,
  {
    visit: (node) => {
      visited.push(node.id);
    }
  },
  { strategy: TraversalStrategy.DepthFirst, includeRoot: true }
);

export const traversalResult = {
  result,
  visited
};
