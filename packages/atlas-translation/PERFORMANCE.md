# Performance

The package exposes `TranslationProfiler`, `TranslationMetric`, and `TranslationBudget` for deterministic diagnostics.

It does not perform infrastructure tuning or provider-specific optimization. Runtime hosts can use the profiler output to enforce budgets.
