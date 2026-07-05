import {
  CompositeExecutionMode,
  DefaultMacroCommand,
  MacroRecorder
} from '@atlas/atlas-command';
import { commandFixture } from '../command/command.test';

const recorder = new MacroRecorder();
recorder.record(commandFixture);

export const macro = new DefaultMacroCommand(
  commandFixture.id,
  commandFixture.name,
  recorder.replay(),
  CompositeExecutionMode.Sequential,
  commandFixture.createdAt,
  {
    recordedBy: null,
    recordedAt: commandFixture.createdAt,
    description: 'Test macro'
  }
);
