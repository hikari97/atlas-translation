import type { CommandName } from '../command';
import type { CommandValidator } from './CommandValidator';

/**
 * Registry for command validators.
 */
export class ValidatorRegistry {
  private readonly validatorsByCommand = new Map<CommandName, CommandValidator[]>();

  public register(commandName: CommandName, validator: CommandValidator): void {
    const validators = this.validatorsByCommand.get(commandName) ?? [];
    this.validatorsByCommand.set(commandName, [...validators, validator]);
  }

  public get(commandName: CommandName): readonly CommandValidator[] {
    return this.validatorsByCommand.get(commandName) ?? [];
  }

  public clear(commandName: CommandName): void {
    this.validatorsByCommand.delete(commandName);
  }
}
