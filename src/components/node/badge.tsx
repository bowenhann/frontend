// @/components/node/badge.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import { Badge } from '@/components/ui/badge';
import { BadgeSettings } from '@/components/settings/badge';

export const NodeBadge = ({ children, ...props }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div 
      ref={(ref) => ref && connect(drag(ref)) as any}
      className="inline-block m-1" // Add margin and make it inline-block
    >
      <Badge {...props}>
        {children}
      </Badge>
    </div>
  );
};

NodeBadge.craft = {
  displayName: 'Badge',
  props: {
    variant: 'default',
    children: 'Badge',
  },
  related: {
    toolbar: BadgeSettings,
  },
};