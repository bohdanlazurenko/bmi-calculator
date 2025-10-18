# BMI Calculator

A modern, responsive Body Mass Index (BMI) calculator built with Next.js 14, TypeScript, and Tailwind CSS. Calculate your BMI instantly and get personalized health insights based on your results.

## Features

- **Dual Unit Systems**: Switch between Metric (cm/kg) and Imperial (inches/lbs) units
- **Real-time Validation**: Input validation with helpful error messages
- **Visual BMI Categories**: Color-coded results with detailed descriptions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript**: Full type safety for better development experience
- **Modern UI**: Clean, intuitive interface with smooth transitions

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1. **Select Unit System**: Choose between Metric or Imperial units
2. **Enter Your Height**: Input your height in the selected unit
3. **Enter Your Weight**: Input your weight in the selected unit
4. **Calculate**: Click the "Calculate BMI" button to see your results
5. **View Results**: See your BMI value, category, and health recommendations

## BMI Categories

- **Underweight**: BMI < 18.5
- **Normal weight**: BMI 18.5 - 24.9
- **Overweight**: BMI 25 - 29.9
- **Obese**: BMI ≥ 30

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management

## Project Structure

```
├── app/
│   ├── api/ping/          # Health check endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   └── ui/
│       ├── BMIDisplay.tsx # BMI results display
│       └── Input.tsx      # Reusable input component
├── lib/
│   └── utils.ts           # Utility functions and BMI calculation
├── types/
│   └── index.ts           # TypeScript type definitions
└── public/                # Static assets
```

## Build

To create a production build:

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

## Health Check

The application includes a health check endpoint at `/api/ping`:

```bash
curl http://localhost:3000/api/ping
```

## Disclaimer

This BMI calculator is for informational purposes only. BMI is a screening tool and is not diagnostic of body fatness or overall health. Always consult with a healthcare provider for a comprehensive health assessment.

## License

MIT License - feel free to use this project for your own purposes!