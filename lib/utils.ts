import { BMICategory, BMIResult } from '@/types';

export const bmiCategories: BMICategory[] = [
  {
    name: 'Underweight',
    range: '< 18.5',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    description: 'You are underweight. Consider consulting a healthcare provider.'
  },
  {
    name: 'Normal weight',
    range: '18.5 - 24.9',
    color: 'text-green-600 bg-green-50 border-green-200',
    description: 'You have a healthy weight. Keep up the good work!'
  },
  {
    name: 'Overweight',
    range: '25 - 29.9',
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    description: 'You are slightly overweight. Consider a balanced diet and regular exercise.'
  },
  {
    name: 'Obese',
    range: '≥ 30',
    color: 'text-red-600 bg-red-50 border-red-200',
    description: 'You are in the obese range. It is recommended to consult a healthcare provider.'
  }
];

export function calculateBMI(weight: number, height: number, unitSystem: 'metric' | 'imperial'): BMIResult {
  let bmi: number;
  
  if (unitSystem === 'metric') {
    // Weight in kg, height in meters
    bmi = weight / Math.pow(height / 100, 2);
  } else {
    // Weight in lbs, height in inches
    bmi = (weight * 703) / Math.pow(height, 2);
  }
  
  bmi = Math.round(bmi * 10) / 10;
  
  let category: BMICategory;
  
  if (bmi < 18.5) {
    category = bmiCategories[0];
  } else if (bmi < 25) {
    category = bmiCategories[1];
  } else if (bmi < 30) {
    category = bmiCategories[2];
  } else {
    category = bmiCategories[3];
  }
  
  return {
    bmi,
    category,
    weight,
    height,
    unitSystem
  };
}

export function formatHeight(height: number, unitSystem: 'metric' | 'imperial'): string {
  if (unitSystem === 'metric') {
    return `${height} cm`;
  } else {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return `${feet}'${inches}"`;
  }
}

export function formatWeight(weight: number, unitSystem: 'metric' | 'imperial'): string {
  if (unitSystem === 'metric') {
    return `${weight} kg`;
  } else {
    return `${weight} lbs`;
  }
}