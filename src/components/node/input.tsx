// @/components/node/input.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { InputSettings } from '@/components/settings/input';

export const NodeInput = ({ ...props }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <Input 
      {...props} 
      ref={(ref) => ref && connect(drag(ref)) as any}
    />
  );
};

NodeInput.craft = {
  displayName: 'Input',
  props: {
    type: 'text',
    placeholder: 'Enter text...',
    disabled: false,
  },
  related: {
    toolbar: InputSettings,
  },
};