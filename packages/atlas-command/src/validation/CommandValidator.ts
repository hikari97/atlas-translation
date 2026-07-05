import type { Command } from '../command';
import type { CommandContext } from '../context';
import type { ValidationResult } from './ValidationResult';

/**
 * Command validator contract.
 */
export interface CommandValidator<TCommand extends Command = Command> {
  validate(command: TCommand, context: CommandContext): ValidationResult;
}
