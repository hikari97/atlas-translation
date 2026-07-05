# Performance

Runtime performance is tracked through lightweight metrics and deterministic budget validation.

The package does not tune or terminate runtime work. It only records metrics, validates thresholds, and reports violations.

Recommended initial budgets:

- startup duration
- command dispatch duration
- render orchestration duration
- input dispatch duration
- plugin activation duration
