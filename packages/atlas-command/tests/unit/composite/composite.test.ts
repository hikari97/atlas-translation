import {
  CompositeExecutionMode,
  DefaultCompositeCommand
} from '@atlas/atlas-command';
import { commandFixture } from '../command/command.test';

export const composite = new DefaultCompositeCommand(
  commandFixture.id,
  commandFixture.name,
  [{ order: 0, command: commandFixture }],
  CompositeExecutionMode.Sequential,
  commandFixture.createdAt
);
