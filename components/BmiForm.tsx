'use client'

import { useState } from 'react'
import { createBmiData, validateHeight, validateWeight } from '@/lib/bmi-calculator'
import type { BmiData, BmiFormData, BmiFormErrors } from '@/types/bmi'

interface BmiFormProps {
  onCalculate: (data: BmiData) => void
}

export default function BmiForm({ onCalculate }: BmiFormProps) {
  const [formData, setFormData] = useState<BmiFormData>({
    height: '',
    weight: ''
  })
  
  const [errors, setErrors] = useState<BmiFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Only allow numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData(prev => ({ ...prev, [name]: value }))
      
      // Clear error for this field when user starts typing
      if (errors[name as keyof BmiFormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
      }
    }
  }

  const validateForm = (): boolean => {
    const newErrors: BmiFormErrors = {}
    
    if (!formData.height) {
      newErrors.height = 'Height is required'
    } else if (!validateHeight(formData.height)) {
      newErrors.height = 'Please enter a valid height (1-300 cm)'
    }
    
    if (!formData.weight) {
      newErrors.weight = 'Weight is required'
    } else if (!validateWeight(formData.weight)) {
      newErrors.weight = 'Please enter a valid weight (1-1000 kg)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const height = parseFloat(formData.height)
      const weight = parseFloat(formData.weight)
      const bmiData = createBmiData(height, weight)
      
      onCalculate(bmiData)
    } catch (error) {
      console.error('Error calculating BMI:', error)
      setErrors({
        height: 'An error occurred. Please try again.',
        weight: 'An error occurred. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({ height: '', weight: '' })
    setErrors({})
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="height" className="mb-2 block text-sm font-medium text-gray-700">
              Height (cm)
            </label>
            <input
              type="text"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="e.g., 170"
              className={`input-field ${errors.height ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              disabled={isSubmitting}
              aria-describedby={errors.height ? 'height-error' : undefined}
            />
            {errors.height && (
              <p id="height-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.height}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="weight" className="mb-2 block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="e.g., 70"
              className={`input-field ${errors.weight ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              disabled={isSubmitting}
              aria-describedby={errors.weight ? 'weight-error' : undefined}
            />
            {errors.weight && (
              <p id="weight-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.weight}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting || !formData.height || !formData.weight}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Calculating...
              </span>
            ) : (
              'Calculate BMI'
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}