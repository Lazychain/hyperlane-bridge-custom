import type { Config } from "tailwindcss";

import  defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
   
  ],
  theme: {
    fontFamily: {
      sans: ['Neue Haas Grotesk', 'Helvetica', 'sans-serif'],
      serif: ['Garamond', 'serif'],
      mono: ['Courier New', 'monospace'],
      plex: ['IBM Plex Mono'],
    },
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        black: '#010101',
        black2: '#15171a',
        white: '#ffffff',
        gray: {...defaultTheme.colors, 150: '#EBEDF0', 250: '#404040', 350: '#6B6B6B'},
        blue: {
          50: '#E6EDF9',
          100: '#CDDCF4',
          200: '#A7C2EC',
          300: '#82A8E4',
          400: '#5385D2',
          500: '#2362C0',
          600: '#1D4685',
          700: '#162A4A',
          800: '#11213B',
          900: '#0D192C',
        },
        red: {
          100: '#EBBAB8',
          200: '#DF8D8A',
          300: '#D25F5B',
          400: '#C5312C',
          500: '#BF1B15',
          600: '#AB1812',
          700: '#85120E',
          800: '#5F0D0A',
          900: '#390806',
        },
        green: {
          50: '#D3E3DB',
          100: '#BED5C9',
          200: '#93BAA6',
          300: '#679F82',
          400: '#3C835E',
          500: '#27764d',
          600: '#236A45',
          700: '#1F5E3D',
          800: '#17462E',
          900: '#0F2F1E',
        },
        pink: {
          50: '#FAEAF8',
          100: '#F2C1EA',
          200: '#EA98DC',
          300: '#E26ECE',
          400: '#DA45C0',
          500: '#D631B9',
          600: '#C02CA6',
          700: '#952281',
          800: '#6B185C',
          900: '#400E37',
        },
        // Neutron mint/teal
        mint: {
          50: '#e5faf4',
          100: '#b3f1e0',
          200: '#88e9ce',
          300: '#5ce1bc',
          400: '#47ddb3',
          500: '#31D99C',
          600: '#25cb9d',
          700: '#21b68c',
          800: '#1ea07b'
        }
      },
      ontSize: {
        md: '0.95rem',
        thin: '0.625rem',
      },
      spacing: {
        88: '22rem',
        100: '26rem',
        112: '28rem',
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        DEFAULT: '0.35rem',
        md: '0.45rem',
        lg: '0.55rem',
        full: '9999px',
      },
      blur: {
        xs: '3px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
      },
      transitionProperty: {
        'height': 'height, max-height',
        'spacing': 'margin, padding',
      },
      maxWidth: {
        'xl-1': '39.5rem',
      },
      backgroundColor: {
        'button': '#FF6B6B',
        'form': '#000000',
        'sideBar': '#0E0E0E',
        'hoverForm': '#1E1E1E',
        'toast': '#1E1E1E',
        'disabled': '#1F1F1F',
      },
      textColor: {
        primary: '#FFFFFF',
        secondary: '#8C8D8F',
        error: '#FF6B6B',
        disabled: '#828485'
      },
      boxShadow: {
        dropdown: '2px 4px 0px 0px rgba(255,255,255,0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
