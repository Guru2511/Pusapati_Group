import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 4px)',
  			sm: 'calc(var(--radius) - 7px)',
  			'4xl': '2rem',
  			'5xl': '2.75rem'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			paper: '#FAF8F5',
  			ink: '#101216',
  			slate: '#5B6169',
  			concrete: '#F0EDE7',
  			sand: '#F6F3ED',
  			line: '#E6E1D8',
  			orange: {
  				DEFAULT: '#E2701B',
  				soft: '#F7E7D6',
  			},
  			blue: {
  				DEFAULT: '#2A52BE',
  				soft: '#DDE4F6',
  			},
  			gold: {
  				DEFAULT: '#C9A64A',
  				soft: '#F4EDDC',
  			},
  			violet: {
  				DEFAULT: '#7F00FF',
  				soft: '#EADCFB',
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			heading: ['var(--font-heading)'],
  			body: ['var(--font-body)'],
  			display: ['var(--font-display)'],
  			mono: ['var(--font-mono)']
  		},
  		boxShadow: {
  			soft: '0 1px 2px rgba(16,18,22,0.04), 0 18px 40px -26px rgba(16,18,22,0.28)',
  			lift: '0 34px 70px -42px rgba(16,18,22,0.55)',
  			glowOrange: '0 20px 60px -30px rgba(226,112,27,0.75)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-14px)' }
  			},
  			aurora: {
  				'0%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.55' },
  				'50%': { transform: 'translate3d(4%, -3%, 0) scale(1.15)', opacity: '0.8' },
  				'100%': { transform: 'translate3d(-3%, 4%, 0) scale(1.05)', opacity: '0.5' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			float: 'float 8s ease-in-out infinite',
  			aurora: 'aurora 20s ease-in-out infinite alternate'
  		}
  	}
  },
  plugins: [animate],
}
