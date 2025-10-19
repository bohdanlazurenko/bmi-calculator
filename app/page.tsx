'use client'

import { useState } from 'react'
import BmiForm from '@/components/BmiForm'
import BmiResult from '@/components/BmiResult'
import type { BmiData } from '@/types/bmi'

export default function Home() {
  const [bmiData, setBmiData] = useState<BmiData | null>(null)

  const handleBmiCalculate = (data: BmiData) => {
    setBmiData(data)
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            BMI Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your Body Mass Index and get personalized health insights
          </p>
        </header>

        <div className="space-y-6">
          <BmiForm onCalculate={handleBmiCalculate} />
          
          {bmiData && (
            <div className="animate-slide-in">
              <BmiResult bmiData={bmiData} />
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            BMI is a screening tool and is not diagnostic of body fatness or health.
          </p>
          <p className="mt-2">
            Consult with a healthcare provider for a comprehensive health assessment.
          </p>
        </footer>
      </div>
    </main>
  )
}