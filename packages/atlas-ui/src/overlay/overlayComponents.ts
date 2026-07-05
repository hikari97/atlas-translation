import { UIComponentKind, type UIComponentDescriptor } from '../contracts';
import { createUIComponent } from '../utils';

export function createDialog(id: string, title: string, open = false): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Dialog, title, 'dialog', { title, open });
}

export function createModal(id: string, title: string, open = false): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Modal, title, 'dialog', { title, open, modal: true });
}

export function createTooltip(id: string, label: string, targetId: string): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Tooltip, label, 'tooltip', { targetId });
}

export function createPopover(id: string, label: string, targetId: string, open = false): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Popover, label, 'dialog', { targetId, open });
}

export function createContextMenu(id: string, label: string, items: readonly string[]): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.ContextMenu, label, 'menu', { items: items.slice() });
}
