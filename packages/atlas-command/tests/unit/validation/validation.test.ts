import {
  DefaultValidationBehavior,
  ValidatorRegistry
} from '@atlas/atlas-command';
import { commandFixture } from '../command/command.test';

const validators = new ValidatorRegistry();
validators.register(commandFixture.name, {
  validate: () => ({ valid: true, failures: [] })
});

export const validationBehavior = new DefaultValidationBehavior(validators);
