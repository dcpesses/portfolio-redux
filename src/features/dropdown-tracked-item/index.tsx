import React, { ReactElement, ReactNode, forwardRef } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import {DropdownItemProps} from 'react-bootstrap';

interface DropdownTrackedItemProps extends Partial<DropdownItemProps> {
  // eslint-disable-next-line react/require-default-props
  eventName?: string | null;
  // eslint-disable-next-line react/require-default-props
  eventValue?: string | null;
}
interface IEventProps {
  'data-umami-event'?: string | null;
  'data-umami-event-value'?: string | null;
}

// returns value to use for umami event
// derived from `onlyText()` in fernandopasik/react-children-utilities
const eventValueText = (children: React.ReactNode | React.ReactNode[]): string => {
  const hasChildren = (
    element: ReactNode,
  ): element is ReactElement<{ children: ReactNode | ReactNode[] }> =>
    React.isValidElement<{ children?: ReactNode[] }>(element) && Boolean(element.props.children);

  const childToString = (child?: ReactNode | object): string => {
    if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
      return '';
    }

    if (JSON.stringify(child) === '{}') {
      return '';
    }

    return child.toString();
  };

  if (!(children instanceof Array) && !React.isValidElement(children)) {
    return childToString(children);
  }

  return React.Children.toArray(children).reduce(
    (text: string, child: React.ReactNode): string => {
      let newText = '';

      if (hasChildren(child)) {
        newText = eventValueText(child.props.children);
      } else if (React.isValidElement(child)) {
        newText = '';
      } else {
        newText = childToString(child);
      }

      return text
        .concat('-', newText)
        .replace(/^-+|-+$/g, ''); // trim dashes
    }, ''
  );
};

const DropdownTrackedItem = forwardRef<typeof Dropdown.Item, DropdownTrackedItemProps>(
  ({ eventName, eventValue, ...props }, ref) => {
    const eventProps:IEventProps = {
      'data-umami-event': '',
      'data-umami-event-value': ''
    };
    if (props.href && props.href !== '#' && props.href !== undefined) {
      eventProps['data-umami-event'] = (!eventName) ? 'dropdown-link-click' : eventName;
      eventProps['data-umami-event-value'] = (!eventValue) ? props.href : eventValue;
    } else if (props.children) {
      eventProps['data-umami-event'] = (!eventName) ? 'dropdown-click' : eventName;
      eventProps['data-umami-event-value'] = (!eventValue) ? eventValueText(props.children) : eventValue;
    }
    return (
      <Dropdown.Item
        {...props}
        ref={ref}
        {...eventProps}
      />
    );
  }
);

DropdownTrackedItem.displayName = 'DropdownTrackedItem';

export default DropdownTrackedItem;
export { eventValueText };
