export type RuntimeEventPayloadValue =
  | string
  | number
  | boolean
  | null
  | Date
  | readonly string[]
  | Readonly<Record<string, string | number | boolean | null>>;

export type RuntimeEventPayload = Readonly<Record<string, RuntimeEventPayloadValue>>;
