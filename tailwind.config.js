/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#040404',
        surface: '#101010',
        'surface-elevated': '#151515',
        border: '#242424',
        'border-hover': '#3a3a3a',
        'text-primary': '#f7f7f7',
        'text-secondary': '#cccccc',
        'text-tertiary': '#9c9c9c',
        primary: '#a3e635',
        'primary-dark': '#84cc16',
        accent: '#f59e0b',
        'accent-subtle': 'rgba(245, 158, 11, 0.12)',
      },
      fontFamily: {
        body: ['Product Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Product Sans', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'content-padding': '2rem',
      },
      maxWidth: {
        'max-width': '1200px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

