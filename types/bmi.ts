export type BmiCategory = 
  | 'underweight'
  | 'normal'
  | 'overweight'
  | 'obese'

export interface BmiData {
  height: number
  weight: number
  bmi: number
  category: BmiCategory
  timestamp: Date
}

export interface BmiCategoryInfo {
  category: BmiCategory
  label: string
  color: string
  description: string
  recommendation: string
  range: {
    min: number
    max: number | null
  }
}

export interface BmiFormData {
  height: string
  weight: string
}

export interface BmiFormErrors {
  height?: string
  weight?: string
}