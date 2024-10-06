export interface IFlatTree {
  id: number;
  parentId: number;
}
export function flatToTrees<T extends IFlatTree>(
  list: T[],
  childrenKey: string = 'children',
  parent: number | null = null,
): any {
  const map = list
    .filter((item) => item.parentId === parent)
    .map((item) => ({ ...item, [childrenKey]: flatToTrees(list, childrenKey, item.id) }));
  return map;
}

//  function flatToTrees2(list: any[]) {
//   const map: { [key: number]: number } = {};
//   for (let i = 0; i < list.length; i++) {
//     map[list[i].id] = i;
//     list[i].subs = [];
//   }
//   const roots = [];
//   for (let j = 0; j < list.length; j++) {
//     const node = list[j];
//     if (node.parentId && map[node.parentId]) list[map[node.parentId]]!.subs!.push(node);
//     else roots.push(node);
//   }
//   return roots;
// }
