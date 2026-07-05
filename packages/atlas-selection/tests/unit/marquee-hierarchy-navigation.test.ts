import { childSelection, directionNavigation, marqueeHitTest, selectAll, SelectionDirection, type SelectionTreeNode } from '@atlas/atlas-selection';
import { firstItem, secondItem, selectableItems } from '../fixtures/items';

const itemWithBounds = {
  ...firstItem,
  bounds: {
    bounds: { minX: 0, minY: 0, maxX: 10, maxY: 10 },
    anchor: { x: 0, y: 0 },
    handles: []
  }
};

const hits = marqueeHitTest({ minX: 5, minY: 5, maxX: 15, maxY: 15 }, [itemWithBounds]);
const tree: SelectionTreeNode = { item: firstItem, children: [{ item: secondItem, children: [] }] };
const cursor = directionNavigation(selectableItems, { index: 0 }, SelectionDirection.Next);
const all = selectAll(selectableItems);

const hitCount: number = hits.length;
const childCount: number = childSelection(tree).length;
const cursorIndex: number = cursor.index;
const allCount: number = all.length;

export { allCount, childCount, cursorIndex, hitCount };
