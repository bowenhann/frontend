// @/components/settings/checkbox.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const CheckboxSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="label">Checkbox Label</Label>
        <Input
          id="label"
          value={props.label || ''}
          onChange={(e) => setProp((props) => (props.label = e.target.value))}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="checked"
          checked={props.checked}
          onCheckedChange={(checked) => setProp((props) => (props.checked = checked))}
        />
        <Label htmlFor="checked">Initial Checked State</Label>
      </div>
    </div>
  );
};