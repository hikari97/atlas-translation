# Extension Guide

## Custom Commands

Create objects that satisfy the `Command` contract and register descriptors through `DefaultCommandRegistry`.

## Custom Handlers

Implement `CommandHandler` or `AsyncCommandHandler`, then register a `CommandHandlerFactory` in `DefaultHandlerRegistry`.

## Pipeline Behaviors

Implement `PipelineBehavior` for cross-cutting concerns such as validation, history, diagnostics, or plugin policy.

## Validators

Register command-specific validators in `ValidatorRegistry` and execute them through `DefaultValidationBehavior`.
