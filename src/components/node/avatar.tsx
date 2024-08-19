// @/components/node/avatar.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AvatarSettings } from '@/components/settings/avatar';

export const NodeAvatar = ({ ...props }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <Avatar 
      {...props} 
      ref={(ref) => ref && connect(drag(ref)) as any}
    >
      <AvatarImage src={props.src} alt={props.alt} />
      <AvatarFallback>{props.fallback}</AvatarFallback>
    </Avatar>
  );
};

NodeAvatar.craft = {
  displayName: 'Avatar',
  props: {
    src: 'https://github.com/shadcn.png',
    alt: '@shadcn',
    fallback: 'CN',
  },
  related: {
    toolbar: AvatarSettings,
  },
};
