import React from 'react';
import { BMIResult } from '@/types';
import { formatHeight, formatWeight } from '@/lib/utils';

interface BMIDisplayProps {
  result: BMIResult;
}

export default function BMIDisplay({ result }: BMIDisplayProps) {
  const { bmi, category, weight, height, unitSystem } = result;
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl font-bold text-gray-900 mb-2">
          {bmi}
        </div>
        <div className="text-lg text-gray-600">
          Your BMI
        </div>
      </div>
      
      <div className={`p-6 rounded-xl border-2 ${category.color}`}>
        <div className="text-center">
          <div className="text-2xl font-semibold mb-2">
            {category.name}
          </div>
          <div className="text-sm text-gray-600 mb-3">
            BMI Range: {category.range}
          </div>
          <p className="text-sm leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Height:</span>
          <span className="font-medium">{formatHeight(height, unitSystem)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Weight:</span>
          <span className="font-medium">{formatWeight(weight, unitSystem)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Unit System:</span>
          <span className="font-medium capitalize">{unitSystem}</span>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>Note:</strong> BMI is a screening tool and is not diagnostic of body fatness or health. 
          Consult with a healthcare provider for a comprehensive health assessment.
        </p>
      </div>
    </div>
  );
}