import type { Command } from '../command';
import type { PipelineBehaviorContext, PipelineDelegate } from '../pipeline';
import type { CommandResult } from '../result';
import { CommandResultStatus } from '../result';
import type { ValidationBehavior } from './ValidationBehavior';
import type { ValidatorRegistry } from './ValidatorRegistry';

/**
 * Validator-registry-backed validation behavior.
 */
export class DefaultValidationBehavior<TCommand extends Command = Command, TResult = unknown>
  implements ValidationBehavior<TCommand, TResult>
{
  public constructor(private readonly validators: ValidatorRegistry) {}

  public async handle(
    context: PipelineBehaviorContext<TCommand>,
    next: PipelineDelegate<TResult>
  ): Promise<CommandResult<TResult>> {
    const failures = this.validators
      .get(context.command.name)
      .flatMap((validator) => validator.validate(context.command, context.context).failures);

    if (failures.length > 0) {
      return {
        status: CommandResultStatus.Failure,
        value: null,
        errors: failures.map((failure) => ({
          code: failure.code,
          message: failure.message,
          cause: failure.path
        }))
      };
    }

    return next();
  }
}
