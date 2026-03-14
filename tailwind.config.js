import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Enforcing strict scale: nothing larger than 20px in app shell
        'xs': ['11px', { lineHeight: '1.4' }],        /* 11px - Badges */
        'sm': ['12px', { lineHeight: '1.5' }],        /* 12px - Labels, table headers, captions */
        'base': ['13px', { lineHeight: '1.6' }],      /* 13px - Body, buttons, inputs, tables */
        'lg': ['14px', { lineHeight: '1.5' }],        /* 14px - Body alternate */
        'xl': ['15px', { lineHeight: '1.4' }],        /* 15px - Section headings (semibold 600) */
        '2xl': ['20px', { lineHeight: '1.2' }],       /* 20px - Page titles (bold 700) */
        '3xl': ['24px', { lineHeight: '1.2' }],       /* 24px - ONLY for login page wordmark */
        '4xl': ['28px', { lineHeight: '1.2' }],       /* 28px - Stat cards values ONLY */
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '10px': '10px',
        '16px': '16px',
        '20px': '20px',
        full: '9999px',
      },
      boxShadow: {
        // Focus ring: 3px rgba(91,78,218,0.15)
        'focus-ring': '0 0 0 3px rgba(91,78,218,0.15)',
        // Card shadow
        'card': '0 2px 12px rgba(91,78,218,0.08)',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
        'in-out': 'ease',
        'out': 'ease',
        'in': 'ease',
      },
      transitionDuration: {
        DEFAULT: '150ms', // 150ms ease everywhere
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)',
          light: 'var(--primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        success: 'var(--success)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        sidebar: {
          DEFAULT: 'var(--sidebar-background)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
      },
    },
  },
  plugins: [animate],
}
