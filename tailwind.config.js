/** @type {import('tailwindcss').Config} */
// Ported verbatim from TSD-Frontend so the live design is byte-for-byte identical.
// Content globs updated for the Next.js App Router layout.
export default {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    // Page-level views live here too — without this glob, classes used ONLY in
    // a view (e.g. the category page grid/sidebar) are never generated.
    './views/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Canela', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#C89632',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
