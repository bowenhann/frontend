// @/components/settings/accordion
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TextSetting = ({ propName, label }) => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-2">
      <Label htmlFor={propName}>{label}</Label>
      <Input
        id={propName}
        value={props[propName] || ''}
        onChange={(e) => setProp((props) => (props[propName] = e.target.value))}
      />
    </div>
  );
};

export const AccordionSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      <TextSetting propName="className" label="Class Name" />
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          onValueChange={(value) => setProp((props) => (props.type = value))}
          value={props.type}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="multiple">Multiple</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="collapsible"
          checked={props.collapsible}
          onCheckedChange={(checked) => setProp((props) => (props.collapsible = checked))}
        />
        <Label htmlFor="collapsible">Collapsible</Label>
      </div>
    </div>
  );
};

export const AccordionItemSettings = () => {
  return (
    <div className="space-y-4">
      <TextSetting propName="value" label="Value" />
    </div>
  );
};

export const AccordionTriggerSettings = () => {
  return (
    <div className="space-y-4">
      <TextSetting propName="children" label="Trigger Text" />
    </div>
  );
};

export const AccordionContentSettings = () => {
  return (
    <div className="space-y-4">
      <TextSetting propName="children" label="Content" />
    </div>
  );
};