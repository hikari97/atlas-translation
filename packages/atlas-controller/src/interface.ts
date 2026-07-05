import type { ControllerContext } from './context';
import type { ControllerMetadata } from './metadata';

export interface ControllerIdentifier {
  readonly id: string;
  readonly name: string;
}

export interface ControllerCapabilities {
  readonly asynchronous: boolean;
  readonly contextMutation: boolean;
  readonly responseCreation: boolean;
}

export interface ControllerResult<TValue = unknown> {
  readonly value: TValue;
  readonly metadata: ControllerMetadata;
}

export interface ControllerContract<TValue = unknown> {
  readonly metadata: ControllerMetadata;
  readonly capabilities: ControllerCapabilities;
  handle(context: ControllerContext): Promise<ControllerResult<TValue>>;
}

export const createController = <TValue>(
  metadata: ControllerMetadata,
  capabilities: ControllerCapabilities,
  handle: (context: ControllerContext) => Promise<ControllerResult<TValue>>,
): ControllerContract<TValue> => ({ metadata, capabilities, handle });

export const createControllerResult = <TValue>(
  value: TValue,
  metadata: ControllerMetadata,
): ControllerResult<TValue> => ({ value, metadata });
