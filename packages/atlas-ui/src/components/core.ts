import type { JsonObject } from '@atlas/atlas-types';
import { UIComponentKind, type UIComponentDescriptor } from '../contracts';
import { createUIComponent } from '../utils';

export function createButton(id: string, label: string, disabled = false): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Button, label, 'button', { label, disabled }, { disabled });
}

export function createInput(id: string, label: string, placeholder = ''): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Input, label, 'textbox', { label, placeholder });
}

export function createCheckbox(id: string, label: string, checked = false, indeterminate = false): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Checkbox, label, 'checkbox', { label, checked, indeterminate });
}

export function createRadio(id: string, label: string, value: string, checked = false): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Radio, label, 'radio', { label, value, checked });
}

export function createSelect(id: string, label: string, options: readonly string[]): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Select, label, 'combobox', { label, options: options.slice() });
}

export function createMenu(id: string, label: string, items: readonly JsonObject[]): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Menu, label, 'menu', { label, items: items.slice() });
}

export function createToolbar(id: string, label: string, items: readonly UIComponentDescriptor[]): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Toolbar, label, 'toolbar', {
    label,
    items: items.map((item) => item.id)
  });
}

export function createIconComponent(id: string, label: string, iconName: string): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Icon, label, 'img', { iconName });
}
