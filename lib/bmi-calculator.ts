import type { BmiData, BmiCategory, BmiCategoryInfo } from '@/types/bmi'

export function calculateBmi(height: number, weight: number): number {
  if (height <= 0 || weight <= 0) {
    throw new Error('Height and weight must be positive numbers')
  }
  
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  return Math.round(bmi * 10) / 10
}

export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return 'underweight'
  if (bmi < 25) return 'normal'
  if (bmi < 30) return 'overweight'
  return 'obese'
}

export function getBmiCategoryInfo(category: BmiCategory): BmiCategoryInfo {
  const categoryMap: Record<BmiCategory, BmiCategoryInfo> = {
    underweight: {
      category: 'underweight',
      label: 'Underweight',
      color: 'text-blue-600',
      description: 'Your BMI is below the healthy range',
      recommendation: 'Consider consulting with a healthcare provider about healthy weight gain strategies.',
      range: { min: 0, max: 18.5 }
    },
    normal: {
      category: 'normal',
      label: 'Normal Weight',
      color: 'text-green-600',
      description: 'Your BMI is within the healthy range',
      recommendation: 'Maintain your current weight with a balanced diet and regular physical activity.',
      range: { min: 18.5, max: 25 }
    },
    overweight: {
      category: 'overweight',
      label: 'Overweight',
      color: 'text-yellow-600',
      description: 'Your BMI is above the healthy range',
      recommendation: 'Consider incorporating more physical activity and a balanced diet to achieve a healthier weight.',
      range: { min: 25, max: 30 }
    },
    obese: {
      category: 'obese',
      label: 'Obese',
      color: 'text-red-600',
      description: 'Your BMI is significantly above the healthy range',
      recommendation: 'It is recommended to consult with a healthcare provider to develop a comprehensive weight management plan.',
      range: { min: 30, max: null }
    }
  }
  
  return categoryMap[category]
}

export function createBmiData(height: number, weight: number): BmiData {
  const bmi = calculateBmi(height, weight)
  const category = getBmiCategory(bmi)
  
  return {
    height,
    weight,
    bmi,
    category,
    timestamp: new Date()
  }
}

export function validateHeight(height: string): boolean {
  const heightNum = parseFloat(height)
  return !isNaN(heightNum) && heightNum > 0 && heightNum <= 300
}

export function validateWeight(weight: string): boolean {
  const weightNum = parseFloat(weight)
  return !isNaN(weightNum) && weightNum > 0 && weightNum <= 1000
}

export function getIdealWeightRange(height: number): { min: number; max: number } {
  const heightInMeters = height / 100
  const minWeight = 18.5 * heightInMeters * heightInMeters
  const maxWeight = 24.9 * heightInMeters * heightInMeters
  
  return {
    min: Math.round(minWeight * 10) / 10,
    max: Math.round(maxWeight * 10) / 10
  }
}

export function getHealthScore(bmi: number): number {
  if (bmi >= 18.5 && bmi < 25) return 100
  if (bmi >= 17 && bmi < 18.5) return 85
  if (bmi >= 25 && bmi < 27) return 85
  if (bmi >= 16 && bmi < 17) return 70
  if (bmi >= 27 && bmi < 30) return 70
  if (bmi >= 15 && bmi < 16) return 50
  if (bmi >= 30 && bmi < 35) return 50
  if (bmi >= 35 && bmi < 40) return 30
  if (bmi >= 40) return 20
  return 10
}