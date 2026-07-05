export interface UIColorTokens {
  readonly background: string;
  readonly surface: string;
  readonly text: string;
  readonly mutedText: string;
  readonly accent: string;
  readonly danger: string;
  readonly border: string;
}

export interface UITypographyTokens {
  readonly bodyFontFamily: string;
  readonly monoFontFamily: string;
  readonly bodySize: string;
  readonly labelSize: string;
  readonly headingSize: string;
}

export interface UISpacingTokens {
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xl: string;
}

export interface UIElevationTokens {
  readonly panel: string;
  readonly overlay: string;
}

export interface UITokens {
  readonly colors: UIColorTokens;
  readonly typography: UITypographyTokens;
  readonly spacing: UISpacingTokens;
  readonly elevation: UIElevationTokens;
}

export const DEFAULT_UI_TOKENS: UITokens = {
  colors: {
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#111827',
    mutedText: '#64748b',
    accent: '#0f766e',
    danger: '#dc2626',
    border: '#d1d5db'
  },
  typography: {
    bodyFontFamily: 'Inter, system-ui, sans-serif',
    monoFontFamily: 'JetBrains Mono, ui-monospace, monospace',
    bodySize: '14px',
    labelSize: '12px',
    headingSize: '18px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px'
  },
  elevation: {
    panel: '0 1px 2px rgba(15, 23, 42, 0.08)',
    overlay: '0 18px 48px rgba(15, 23, 42, 0.18)'
  }
};
