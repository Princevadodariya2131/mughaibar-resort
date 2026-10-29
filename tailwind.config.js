/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Phase 2 palette: charcoal, warm ivory, sandstone, restrained bronze.
        // Token names from Phase 1 are kept so nothing breaks; values now follow the brief.
        // (Phase 1 used "sandstone" for a pale teal. It is now an actual sandstone.)
        charcoal: {
          DEFAULT: '#1E1A16',
          50: '#2B2621',
          100: '#231F1A',
          200: '#1E1A16',
        },
        // Daylight grounds
        limewash: { DEFAULT: '#EFE8DA', deep: '#E4DAC6' }, // warm ivory paper
        dawn: '#DCCBA9',                                    // pale sand
        hajar: '#6B5E4E',                                   // muted text on ivory (>= 4.5:1)
        umber: '#251F1A',                                   // ink on ivory
        // "dam" is the old name for the primary solid button colour; it is now bronze.
        dam: { DEFAULT: '#7A5A36', light: '#8E6C44', dark: '#624627' },
        ivory: {
          DEFAULT: '#F5F0E7',
          50: '#FDFAF5',
          100: '#F5F0E7',
          200: '#EDE4D3',
        },
        // Accent on dark grounds
        sandstone: {
          DEFAULT: '#C6A97F',
          light: '#D8C29E',
          dark: '#A58660',
        },
        // Accent on light grounds
        bronze: {
          DEFAULT: '#8C6A42',
          light: '#B08A5A',
          dark: '#6B4F2E',
        },
        olive: {
          DEFAULT: '#6D735B',
          light: '#858D70',
          dark: '#525846',
        },
        stone: {
          DEFAULT: '#8C8070',
          light: '#A89F92',
          dark: '#6B6358',
        },
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.25rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.75rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
      height: {
        'screen-90': '90vh',
        'screen-85': '85vh',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'scale-in': 'scaleIn 0.6s ease forwards',
        'slide-in-left': 'slideInLeft 0.8s ease forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'reveal': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
    },
  },
  plugins: [],
}
