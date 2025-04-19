/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#3b82f6",
                "primary-content": "#09090b",
                "base-100": "#18181b",
                "base-200": "#27272a",
                "base-300": "#3f3f46",
                "base-content": "#fafafa",
            },
            fontFamily: {
                "Afacad": ["Afacad"],
                "Otomanopee": ["Otomanopee"],
            },
        },
    },
    plugins: [],
};
