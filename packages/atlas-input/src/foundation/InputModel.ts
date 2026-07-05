import type { JsonObject, Point, Timestamp } from '@atlas/atlas-types';

export enum InputDeviceType {
  Keyboard = 'keyboard',
  Pointer = 'pointer',
  Wheel = 'wheel',
  Gesture = 'gesture',
  Virtual = 'virtual'
}

export interface InputDevice {
  readonly id: string;
  readonly type: InputDeviceType;
  readonly label: string;
}

export interface InputEventModel {
  readonly id: string;
  readonly deviceId: string;
  readonly type: string;
  readonly position?: Point | undefined;
  readonly payload: JsonObject;
  readonly occurredAt: Timestamp;
}

export interface InputContext {
  readonly profileId: string;
  readonly metadata?: JsonObject | undefined;
}

export interface InputState {
  readonly events: readonly InputEventModel[];
  readonly devices: readonly InputDevice[];
}

export function createInputEvent(id: string, deviceId: string, type: string, payload: JsonObject = {}): InputEventModel {
  return { id, deviceId, type, payload, occurredAt: new Date().toISOString() as Timestamp };
}
