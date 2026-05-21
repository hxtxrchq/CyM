/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				brand: {
					primary: '#414833',
					mid: '#737A5D',
					muted: '#A4AC86',
					soft: '#CCBFA3',
					light: '#EBE3D2',
					dark: '#2f352b'
				},
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Helvetica', 'Arial'],
				serif: ['Playfair Display', 'Georgia', 'serif'],
			},
			boxShadow: {
				editorial: '0 30px 80px rgba(10, 10, 10, 0.06)',
			},
			letterSpacing: {
				editorial: '0.02em',
			},
		},
	},
	plugins: [],
}
