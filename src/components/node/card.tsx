// @/components/node/card.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SettingsControl } from '@/components/settings-control';
import { createDraggableComponent } from '@/components/create-draggable-component';
import { CraftComponent, CraftNodeProps } from '@/types/craft';
import { CardSettings, CardTitleSettings, CardDescriptionSettings, CardContentSettings, CardFooterSettings } from '@/components/settings/card';

interface NodeCardProps extends CraftNodeProps {
  title?: string;
  description?: string;
  content?: string;
  footerButtonText?: string;
  className?: string;
}

const NodeCardContainer = createDraggableComponent(Card, true);
const NodeCardHeader = createDraggableComponent(CardHeader, true);
const NodeCardFooter = createDraggableComponent(CardFooter, true);
const NodeCardContent = createDraggableComponent(CardContent, true);
const NodeCardTitle = createDraggableComponent(CardTitle);
const NodeCardDescription = createDraggableComponent(CardDescription);

const NodeCard: CraftComponent<NodeCardProps> = ({
  children,
  title,
  description,
  content,
  footerButtonText,
  className = 'w-full',
  ...props
}) => {
  const { connectors: { connect, drag } } = useNode();

  const renderContent = () => {
    if (React.Children.count(children) > 0) {
      return children;
    }

    return (
      <>
        {(title || description) && (
          <NodeCardHeader>
            {title && <NodeCardTitle>{title}</NodeCardTitle>}
            {description && <NodeCardDescription>{description}</NodeCardDescription>}
          </NodeCardHeader>
        )}
        {content && <NodeCardContent>{content}</NodeCardContent>}
        {footerButtonText && (
          <NodeCardFooter>
            <Button className="w-full">{footerButtonText}</Button>
          </NodeCardFooter>
        )}
      </>
    );
  };

  return (
    <NodeCardContainer
      ref={(ref: HTMLElement | null) => ref && connect(drag(ref)) as any}
      className={className}
      {...props}
    >
      {renderContent()}
    </NodeCardContainer>
  );
};

NodeCard.craft = {
  displayName: 'Card',
  props: {
    className: 'p-6 m-2',
    title: 'Card Title',
    description: 'Card Description',
    content: 'Empty Container',
    footerButtonText: 'Footer button',
  },
  related: {
    toolbar: CardSettings,
  },
  custom: {
    importPath: '@/components/card',
  },
};

export { NodeCard, NodeCardHeader, NodeCardFooter, NodeCardContent, NodeCardTitle, NodeCardDescription };

// 为子组件添加 craft 配置
const addCraftConfig = (component: any, displayName: string, defaultProps: any, ToolbarComponent: React.ComponentType<any>) => {
  component.craft = {
    displayName,
    props: defaultProps,
    related: {
      toolbar: ToolbarComponent,
    },
  };
};

addCraftConfig(NodeCardTitle, 'Card Title', { children: 'Card Title' }, CardTitleSettings);
addCraftConfig(NodeCardDescription, 'Card Description', { children: 'Card Description' }, CardDescriptionSettings);
addCraftConfig(NodeCardContent, 'Card Content', { children: 'Card Content' }, CardContentSettings);
addCraftConfig(NodeCardFooter, 'Card Footer', { children: <Button className="w-full">Footer Button</Button> }, CardFooterSettings);