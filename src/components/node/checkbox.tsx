import React from 'react';
import { useNode } from '@craftjs/core';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckboxSettings } from '@/components/settings/checkbox';

export const NodeCheckbox = ({ label, ...props }) => {
  const { connectors: { connect, drag }, actions: { setProp }, checked } = useNode((node) => ({
    checked: node.data.props.checked
  }));

  const handleCheckedChange = (checked: boolean) => {
    setProp((props) => (props.checked = checked));
  };

  return (
    <div className="flex items-center space-x-2" ref={(ref) => ref && connect(drag(ref)) as any}>
      <Checkbox 
        id="node-checkbox" 
        checked={checked}
        onCheckedChange={handleCheckedChange}
        {...props} 
      />
      {label && <Label htmlFor="node-checkbox">{label}</Label>}
    </div>
  );
};

NodeCheckbox.craft = {
  displayName: 'Checkbox',
  props: {
    label: 'Checkbox Label',
    checked: false,
  },
  related: {
    toolbar: CheckboxSettings,
  },
};