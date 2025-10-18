'use client';

import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import BMIDisplay from '@/components/ui/BMIDisplay';
import { calculateBMI } from '@/lib/utils';
import { FormData, BMIResult } from '@/types';

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    height: '',
    weight: '',
    unitSystem: 'metric'
  });
  
  const [result, setResult] = useState<BMIResult | null>(null);
  const [errors, setErrors] = useState<{ height?: string; weight?: string }>({});
  
  const validateForm = (): boolean => {
    const newErrors: { height?: string; weight?: string } = {};
    
    if (!formData.height || parseFloat(formData.height) <= 0) {
      newErrors.height = 'Please enter a valid height';
    }
    
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.weight = 'Please enter a valid weight';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    
    const bmiResult = calculateBMI(weight, height, formData.unitSystem);
    setResult(bmiResult);
  };
  
  const handleReset = () => {
    setFormData({
      height: '',
      weight: '',
      unitSystem: 'metric'
    });
    setResult(null);
    setErrors({});
  };
  
  const handleUnitSystemChange = (unitSystem: 'metric' | 'imperial') => {
    setFormData({
      ...formData,
      unitSystem,
      height: '',
      weight: ''
    });
    setResult(null);
    setErrors({});
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            BMI Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your Body Mass Index (BMI) to assess your weight category
          </p>
        </header>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  type="button"
                  onClick={() => handleUnitSystemChange('metric')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    formData.unitSystem === 'metric'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Metric
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitSystemChange('imperial')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    formData.unitSystem === 'imperial'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Imperial
                </button>
              </div>
              
              <Input
                label={formData.unitSystem === 'metric' ? 'Height (cm)' : 'Height (inches)'}
                type="number"
                value={formData.height}
                onChange={(value) => setFormData({ ...formData, height: value })}
                placeholder={formData.unitSystem === 'metric' ? '170' : '67'}
                min={formData.unitSystem === 'metric' ? '50' : '20'}
                max={formData.unitSystem === 'metric' ? '250' : '100'}
                required
              />
              {errors.height && (
                <p className="text-red-500 text-sm">{errors.height}</p>
              )}
              
              <Input
                label={formData.unitSystem === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
                type="number"
                value={formData.weight}
                onChange={(value) => setFormData({ ...formData, weight: value })}
                placeholder={formData.unitSystem === 'metric' ? '70' : '154'}
                min={formData.unitSystem === 'metric' ? '20' : '44'}
                max={formData.unitSystem === 'metric' ? '300' : '660'}
                step="0.1"
                required
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight}</p>
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Calculate BMI
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <BMIDisplay result={result} />
              
              <div className="flex space-x-4">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Calculate Again
                </button>
              </div>
            </div>
          )}
        </div>
        
        <footer className="mt-10 text-center text-sm text-gray-600">
          <p>
            BMI Categories: Underweight {'<'} 18.5 | Normal weight 18.5-24.9 | Overweight 25-29.9 | Obese {'≥'} 30
          </p>
        </footer>
      </div>
    </div>
  );
}