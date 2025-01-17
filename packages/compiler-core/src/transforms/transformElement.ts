import { NodeTypes, createVNodeCall } from '../ast';

export function transformElement(node, context) {
  if (node.type === NodeTypes.ElEMENT) {
    return () => {
      // 中间处理层

      //tag
      const vnodeTag = `"${node.tag}"`;
      //props
      let vnodeProps;
      //children
      const children = node.children;
      let vnodeChildren = children[0];

      node.codegenNode = createVNodeCall(vnodeTag, vnodeProps, vnodeChildren, context);
    };
  }
}
