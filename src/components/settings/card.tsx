// @/components/settings/card.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const TextSetting = ({ propName, label }) => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      <Label htmlFor={propName}>{label}</Label>
      <Input
        id={propName}
        value={props[propName] || ''}
        onChange={(e) => setProp((props) => (props[propName] = e.target.value))}
      />
    </div>
  );
};

export const CardSettings = () => {
  const { actions: { setProp }, props, nodes } = useNode((node) => ({
    props: node.data.props,
    nodes: node.data.nodes,
  }));

  const isChildrenMode = nodes && nodes.length > 0;

  if (isChildrenMode) {
    return (
      <div className="space-y-4">
        <TextSetting propName="className" label="Class Name" />
        <p>This card uses nested components. Edit individual components for more options.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TextSetting propName="className" label="Class Name" />
      <TextSetting propName="title" label="Card Title" />
      <div>
        <Label htmlFor="description">Card Description</Label>
        <Textarea
          id="description"
          value={props.description || ''}
          onChange={(e) => setProp((props) => (props.description = e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="content">Card Content</Label>
        <Textarea
          id="content"
          value={props.content || ''}
          onChange={(e) => setProp((props) => (props.content = e.target.value))}
        />
      </div>
      <TextSetting propName="footerButtonText" label="Footer Button Text" />
    </div>
  );
};

// Keep the existing settings for individual components
export const CardTitleSettings = () => (
  <TextSetting propName="children" label="Title" />
);

export const CardDescriptionSettings = () => (
  <TextSetting propName="children" label="Description" />
);

export const CardContentSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        value={props.children || ''}
        onChange={(e) => setProp((props) => (props.children = e.target.value))}
      />
    </div>
  );
};

export const CardFooterSettings = () => (
  <TextSetting propName="buttonText" label="Footer Button Text" />
);