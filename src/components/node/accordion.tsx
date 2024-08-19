// @/components/node/accordion
import React from 'react';
import { useNode } from '@craftjs/core';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { AccordionSettings, AccordionItemSettings, AccordionTriggerSettings, AccordionContentSettings } from '@/components/settings/accordion';

export const NodeAccordion = ({ children, ...props }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <Accordion 
      {...props} 
      ref={(ref) => ref && connect(drag(ref)) as any}
      type={props.type}
    >
      {children}
    </Accordion>
  );
};

export const NodeAccordionItem = ({ children, ...props }) => {
  return <AccordionItem value={''} {...props}>{children}</AccordionItem>;
};

export const NodeAccordionTrigger = ({ children, ...props }) => {
  return <AccordionTrigger {...props}>{children}</AccordionTrigger>;
};

export const NodeAccordionContent = ({ children, ...props }) => {
  return <AccordionContent {...props}>{children}</AccordionContent>;
};

NodeAccordion.craft = {
  displayName: 'Accordion',
  props: {
    type: 'single',
    collapsible: true,
    className: 'w-full',
  },
  related: {
    toolbar: AccordionSettings,
  },
};

NodeAccordionItem.craft = {
  displayName: 'Accordion Item',
  props: {},
  related: {
    toolbar: AccordionItemSettings,
  },
};

NodeAccordionTrigger.craft = {
  displayName: 'Accordion Trigger',
  props: {},
  related: {
    toolbar: AccordionTriggerSettings,
  },
};

NodeAccordionContent.craft = {
  displayName: 'Accordion Content',
  props: {},
  related: {
    toolbar: AccordionContentSettings,
  },
};