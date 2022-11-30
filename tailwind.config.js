/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                height: 'height',
                width: 'width',
                spacing: 'margin, padding',
            },
            animation: {
                fakeToLeft: 'fakeToLeft 0.5s linear ',
                fakeToRight: 'fakeToRight 0.5s linear ',
                light: 'light 0.5s linear',
            },
            keyframes: {
                fakeToLeft: {
                    from: { transform: 'translateX(100%);' },
                    to: { transform: 'translateX(0);' },
                },
                fakeToRight: {
                    from: { transform: 'translateX(-100%);' },
                    to: { transform: 'translateX(0);' },
                },
                light: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
