import { useEditor, Editor, Element } from "@craftjs/core";
import React, { useEffect, useState, useRef } from "react";
import { VariantCanvas } from '@/components/variantCanvas';
import { NodeButton } from '@/components/node/button';
import { NodeCard, NodeCardHeader, NodeCardContent, NodeCardFooter, NodeCardTitle, NodeCardDescription } from '@/components/node/card';
import { NodeCalendar } from '@/components/node/calendar';
// Import other components as needed
import { renderComponents } from '@/lib/componentRenderer'
import { componentMap } from "@/lib/component-map";

const componentNameMap = {
  Button: 'NodeButton',
  Card: 'NodeCard',
  CardHeader: 'NodeCardHeader',
  CardContent: 'NodeCardContent',
  CardFooter: 'NodeCardFooter',
  CardTitle: 'NodeCardTitle',
  CardDescription: 'NodeCardDescription'
  // Add mappings for other components as needed
};

function getComponentName(type) {
  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return componentNameMap[type.name] || type.name;
  }
  if (type && type.craft) {
    const craftName = type.craft.name || type.craft.displayName;
    return componentNameMap[craftName] || craftName || 'UnknownComponent';
  }
  return 'UnknownComponent';
}

function generateComponentString(type, props, children) {
  const componentName = getComponentName(type);
  const propsString = Object.entries(props)
    .filter(([key, value]) => key !== 'children' && value !== undefined)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      }
      return `${key}={${JSON.stringify(value)}}`;
    })
    .join(' ');

  return `<${componentName}${propsString ? ' ' + propsString : ''}>${children || ''}</${componentName}>`;
}

function renderComponents1(componentString) {
  const regex = /<(\w+)([^>]*)>(.*?)<\/\1>/;
  const match = regex.exec(componentString);

  if (match) {
    const [, componentName, propsString, children] = match;
    const fullComponentName = Object.keys(componentNameMap).find(key => componentNameMap[key] === componentName);
    const Component = componentMap[fullComponentName];

    if (Component) {
      const props = {};
      const propsRegex = /(\w+)=(?:{([^}]*)}|"([^"]*)")/g;
      let propMatch;
      while ((propMatch = propsRegex.exec(propsString))) {
        const [, key, objectValue, stringValue] = propMatch;
        props[key] = objectValue ? JSON.parse(objectValue) : stringValue;
      }

      const RenderedComponent = (nodeProps) => (
        <Component {...props} {...nodeProps}>
          {children}
        </Component>
      );
      RenderedComponent.displayName = `Rendered${componentName}`;
      return RenderedComponent;
    }
  }

  return () => null;
}

function generateRandomBgColor() {
  const colors = [
    'red', 'blue', 'green', 'yellow'
  ];
  const shades = [ '400', '500'];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomShade = shades[Math.floor(Math.random() * shades.length)];
  
  return `bg-${randomColor}-${randomShade}`;
}

const UnrelatedButton = () => (
  <NodeButton>Test1</NodeButton>
);
const createCraftElement = (component) => {
  if (typeof component !== 'object' || component === null) {
    return component;
  }

  const { type, props } = component;
  const Component = componentMap[type] || type;

  if (!Component) {
    console.error(`Component type "${type}" not found in componentMap`);
    return null;
  }

  const craftProps = { ...props };

  if (props && props.children) {
    craftProps.children = Array.isArray(props.children)
      ? props.children.map(createCraftElement)
      : createCraftElement(props.children);
  }

  return (
    <Element canvas is={Component} {...craftProps}>
      {craftProps.children}
    </Element>
  );
};

export const ControlPanel = () => {
  const { active, related, query, actions } = useEditor((state, query) => ({
    active: query.getEvent('selected').first(),
    related: state.nodes[query.getEvent('selected').first()]?.related
  }));

  const [variants, setVariants] = useState([]);
  const [editorKey, setEditorKey] = useState(0);
  const prevActiveRef = useRef(null);

  useEffect(() => {
    if (active && active !== 'ROOT') {
      const node = query.node(active).get();
      if (node) {
        const { type, props } = node.data;
        const baseProps = { ...props, className: props.className || '' };
        const baseString = generateComponentString(type, baseProps, props.children || '');
        
        // Generate 5 variants with different background colors
        const newVariants = [
          { string: baseString, props: baseProps },
          ...Array(5).fill(null).map(() => {
            const bgColorClass = generateRandomBgColor();
            const variantProps = { ...props, className: `${props.className || ''} ${bgColorClass}`.trim() };
            const variantString = generateComponentString(type, variantProps, props.children || '');
            console.log("Variantstring", variantString)
            return { string: variantString, props: variantProps };
          })
        ];

        setVariants(newVariants);

        // If the active component has changed, increment the editorKey
        if (active !== prevActiveRef.current) {
          setEditorKey(prev => prev + 1);
          prevActiveRef.current = active;
        }
      }
    } else {
      setVariants([]);
    }
  }, [active, query]);

  const handleReplace = (variantProps) => {
    if (active && active !== 'ROOT') {
      actions.setProp(active, (props) => {
        Object.assign(props, variantProps);
      });
    }
  };

  const handleFullReplace = (variantString) => {
    if (active && active !== 'ROOT') {
      const node = query.node(active).get();
      const parentId = node.data.parent;
      const currentIndex = query.node(parentId).get().data.nodes.indexOf(active);
      
      try {
        // variantString =  `<NodeButton>Test</NodeButton>`
        const parsedComponents = renderComponents(variantString);

        console.log(variantString)
        
        const processComponent = (component) => {
          const craftElement = createCraftElement(component);

          if (craftElement) {
            console.log("craftElement", craftElement)
            const nodeTree = query.parseReactElement(craftElement).toNodeTree();
            actions.addNodeTree(nodeTree, parentId, currentIndex);
            console.log("nodeTree", nodeTree)
            
          }
        };

        console.log('Parsed components:', parsedComponents);

        if (Array.isArray(parsedComponents)) {
          console.log("!")
          parsedComponents.forEach(processComponent);
        } else {
          console.log("!!")
          processComponent(parsedComponents);
        }

        // Delete the old node
        actions.delete(active);
      } catch (error) {
        console.error('Error updating content:', error);
      }
    }
  };


  return (
    <div className="w-80 border-l h-auto overflow-auto">
      {active && active !== 'ROOT' && (
        <div className="p-4">
          <h4 className="text-sm font-semibold mt-4 mb-2">Variants:</h4>
          {variants.map((variant, index) => {
            const VariantComponent = renderComponents(variant.string);
        
            return (
              <div key={`${editorKey}-${index}`} className="mb-4 border p-2 rounded">
                <div className="mb-2" style={{ height: '100px' }}>
                  <Editor
                    key={`${editorKey}-${index}`}
                    resolver={{
                      ...componentMap,
                    }}
                  >
                    <VariantCanvas>
                      {/* <VariantComponent /> */}
                      {VariantComponent}
                    </VariantCanvas>
                  </Editor>
                </div>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto mb-2">
                  <code>{variant.string}</code>
                </pre>
                <p className="text-xs text-gray-600 mb-2">Class: {variant.props.className}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleReplace(variant.props)}
                >
                  Replace Props
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleFullReplace(variant.string)}
                >
                  Full Replace
                </button>
              </div>
            );
          })}
          
          <h4 className="text-sm font-semibold mt-6 mb-2">Unrelated Component:</h4>
          <div className="mb-4 border p-2 rounded">
            <div className="mb-2" style={{ height: '100px' }}>
              <Editor
                resolver={{
                  ...componentMap,
                  UnrelatedButton
                }}
              >
                <VariantCanvas>
                  <UnrelatedButton />
                </VariantCanvas>
              </Editor>
            </div>
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleFullReplace(UnrelatedButton)}
            >
              Replace with Unrelated Button
            </button>
          </div>
        </div>
      )}
      {active && related?.toolbar && React.createElement(related.toolbar)}
    </div>
  );
};