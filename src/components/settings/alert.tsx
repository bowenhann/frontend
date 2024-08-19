// @/components/settings/alert.tsx
import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AlertSettings = () => {
  const { actions: { setProp }, props, id } = useNode((node) => ({
    props: node.data.props,
    id: node.id,
  }));

  const { query } = useEditor();

  // 查找 AlertTitle 和 AlgeertDescription 子节点
  const childNodes = query.node(id).get().data.nodes;
  const titleNode = query.node(childNodes[0]).get();
  console.log("what", titleNode);
  // const titleNode = childNodes.title ? query.node(childNodes.title).get() : null;
  // const descriptionNode = childNodes.description ? query.node(childNodes.description).get() : null;

  // const updateChildText = (nodeId, text) => {
  //   if (nodeId) {
  //     query.node(nodeId).setProp((props) => (props.children = text));
  //   }
  // };

  return (<div>Hi</div>);
  // return (
  //   <div className="space-y-4">
  //     <div>
  //       <Label htmlFor="variant">Variant</Label>
  //       <Select
  //         onValueChange={(value) => setProp((props) => (props.variant = value))}
  //         value={props.variant}
  //       >
  //         <SelectTrigger>
  //           <SelectValue placeholder="Select variant" />
  //         </SelectTrigger>
  //         <SelectContent>
  //           <SelectItem value="info">Info</SelectItem>
  //           <SelectItem value="warning">Warning</SelectItem>
  //           <SelectItem value="error">Error</SelectItem>
  //           <SelectItem value="success">Success</SelectItem>
  //         </SelectContent>
  //       </Select>
  //     </div>
  //     <div>
  //       <Label htmlFor="className">Class Name</Label>
  //       <Input
  //         id="className"
  //         value={props.className}
  //         onChange={(e) => setProp((props) => (props.className = e.target.value))}
  //       />
  //     </div>
  //     {titleNode && (
  //       <div>
  //         <Label htmlFor="title">Alert Title</Label>
  //         <Input
  //           id="title"
  //           value={titleNode.data.props.children}
  //           onChange={(e) => updateChildText(childNodes.title, e.target.value)}
  //         />
  //       </div>
  //     )}
  //     {descriptionNode && (
  //       <div>
  //         <Label htmlFor="description">Alert Description</Label>
  //         <Input
  //           id="description"
  //           value={descriptionNode.data.props.children}
  //           onChange={(e) => updateChildText(childNodes.description, e.target.value)}
  //         />
  //       </div>
  //     )}
  //   </div>
  // );
};