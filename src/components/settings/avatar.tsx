
// @/components/settings/avatar.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const AvatarSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="src">Image Source</Label>
        <Input
          id="src"
          value={props.src}
          onChange={(e) => setProp((props) => (props.src = e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="alt">Alt Text</Label>
        <Input
          id="alt"
          value={props.alt}
          onChange={(e) => setProp((props) => (props.alt = e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="fallback">Fallback Text</Label>
        <Input
          id="fallback"
          value={props.fallback}
          onChange={(e) => setProp((props) => (props.fallback = e.target.value))}
        />
      </div>
    </div>
  );
};