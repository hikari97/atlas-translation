export type WebSocketPrimitive = string | number | boolean | null;

export type WebSocketExtensionValue = WebSocketPrimitive | readonly WebSocketPrimitive[] | Readonly<Record<string, WebSocketPrimitive>>;

export type WebSocketExtensions = Readonly<Record<string, WebSocketExtensionValue>>;

export interface WebSocketMetadata {
  readonly name?: string;
  readonly description?: string;
  readonly attributes: WebSocketExtensions;
}

export interface WebSocketLifecycle {
  readonly state: 'created' | 'active' | 'inactive' | 'closed' | 'disposed';
  readonly updatedAt?: Date;
}

export const createWebSocketMetadata = (name?: string, description?: string, attributes: WebSocketExtensions = {}): WebSocketMetadata => ({
  ...(name === undefined ? {} : { name }),
  ...(description === undefined ? {} : { description }),
  attributes,
});

export const createWebSocketLifecycle = (state: WebSocketLifecycle['state'] = 'created', updatedAt?: Date): WebSocketLifecycle => ({
  state,
  ...(updatedAt === undefined ? {} : { updatedAt }),
});
