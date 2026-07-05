import type { JsonObject } from '@atlas/atlas-types';
import type { UIComponentIdentifier } from './UIIdentifier';

export enum UIComponentKind {
  Button = 'button',
  Input = 'input',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Select = 'select',
  Menu = 'menu',
  Toolbar = 'toolbar',
  Icon = 'icon',
  Dialog = 'dialog',
  Modal = 'modal',
  Tooltip = 'tooltip',
  Popover = 'popover',
  ContextMenu = 'context-menu',
  Notification = 'notification',
  EditorView = 'editor-view',
  Caret = 'caret',
  Selection = 'selection',
  Placeholder = 'placeholder',
  FloatingToolbar = 'floating-toolbar',
  BlockToolbar = 'block-toolbar'
  ,
  Primitive = 'primitive'
}

export interface UIAccessibility {
  readonly role: string;
  readonly label?: string | undefined;
  readonly describedBy?: string | undefined;
  readonly disabled?: boolean | undefined;
}

export interface UIComponentDescriptor {
  readonly id: UIComponentIdentifier;
  readonly kind: UIComponentKind;
  readonly name: string;
  readonly accessibility: UIAccessibility;
  readonly props: JsonObject;
}
