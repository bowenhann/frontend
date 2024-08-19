// @/components/node/alert.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertSettings } from '@/components/settings/alert';

export const NodeAlert = ({ children, ...props }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <Alert 
      {...props} 
      ref={(ref) => ref && connect(drag(ref)) as any}
    >
      {children}
    </Alert>
  );
};

export const NodeAlertTitle = ({ children, ...props }) => {
  return <AlertTitle {...props}>{children}</AlertTitle>;
};

export const NodeAlertDescription = ({ children, ...props }) => {
  return <AlertDescription {...props}>{children}</AlertDescription>;
};

NodeAlert.craft = {
  displayName: 'Alert',
  props: {
    variant: 'default',
    children: [
      {
        type: NodeAlertTitle,
        props: { children: 'Alert Title' }
      },
      {
        type: NodeAlertDescription,
        props: { children: 'Alert Description' }
      }
    ],
  },
  related: {
    toolbar: AlertSettings,
  },
};