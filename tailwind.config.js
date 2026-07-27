import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: '#0A65CC',
                    hover: '#0851A8',
                    light: '#E7F0FA',
                    soft: '#F1F2F4',
                },
                job: {
                    dark: '#18191C',
                    gray: '#767E94',
                    lightGray: '#F1F2F4',
                    border: '#E4E5E8',
                }
            }
        },
    },

    plugins: [forms],
};
