// @/components/settings/input.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const InputSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="type">Input Type</Label>
        <Select
          onValueChange={(value) => setProp((props) => (props.type = value))}
          value={props.type}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="password">Password</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="number">Number</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="placeholder">Placeholder</Label>
        <Input
          id="placeholder"
          value={props.placeholder}
          onChange={(e) => setProp((props) => (props.placeholder = e.target.value))}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={props.disabled}
          onCheckedChange={(checked) => setProp((props) => (props.disabled = checked))}
        />
        <Label>Disabled</Label>
      </div>
    </div>
  );
};