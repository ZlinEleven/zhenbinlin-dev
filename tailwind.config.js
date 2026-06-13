/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        surface: '#FFFFFF',
        foreground: '#171717',
        muted: '#737373',
        accent: '#2563EB',
        'accent-hover': '#1D4ED8',
        border: '#E5E5E5',
        sbu: {
          tint: '#FEE2E2',
          'tint-strong': '#FECACA',
          border: '#FCA5A5',
          accent: '#C41E3A',
        },
        gt: {
          tint: '#FEF3C7',
          'tint-strong': '#FDE68A',
          border: '#FCD34D',
          gold: '#B3A369',
          navy: '#003057',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '64rem',
      },
      keyframes: {
        'expand-grid': {
          from: { gridTemplateRows: '0fr' },
          to: { gridTemplateRows: '1fr' },
        },
      },
      animation: {
        'expand-grid': 'expand-grid 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
  safelist: [
    'school-card-sbu',
    'school-card-gt',
    'coursework-panel-sbu',
    'coursework-panel-gt',
    'coursework-placeholder-sbu',
    'coursework-placeholder-gt',
    'school-tab-active-sbu',
    'school-tab-active-gt',
    'school-tab-inactive-sbu',
    'school-tab-inactive-gt',
    'coursework-table-head-sbu',
    'coursework-table-head-gt',
    'coursework-semester-sbu',
    'coursework-semester-gt',
  ],
};
