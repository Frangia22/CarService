/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['emerald', 'business', 'dark'],
    // darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root'
  }
}
