import type { Config } from 'tailwindcss';
/** @type {import('tailwindcss').Config} */

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sacramento: ['Sacramento', 'cursive'],
            },
        },
    },
    plugins: [],
};
export default config;
