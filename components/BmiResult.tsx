import { getBmiCategoryInfo, getIdealWeightRange, getHealthScore } from '@/lib/bmi-calculator'
import type { BmiData } from '@/types/bmi'

interface BmiResultProps {
  bmiData: BmiData
}

export default function BmiResult({ bmiData }: BmiResultProps) {
  const categoryInfo = getBmiCategoryInfo(bmiData.category)
  const idealWeight = getIdealWeightRange(bmiData.height)
  const healthScore = getHealthScore(bmiData.bmi)

  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    if (score >= 50) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number): string => {
    if (score >= 85) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 50) return 'Fair'
    return 'Needs Attention'
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Your BMI Result
          </h2>
          
          <div className="mb-6">
            <div className="text-5xl font-bold text-gray-900">
              {bmiData.bmi}
            </div>
            <div className={`mt-2 text-lg font-medium ${categoryInfo.color}`}>
              {categoryInfo.label}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="absolute inset-0 flex">
                <div className="w-1/4 bg-blue-500"></div>
                <div className="w-1/4 bg-green-500"></div>
                <div className="w-1/4 bg-yellow-500"></div>
                <div className="w-1/4 bg-red-500"></div>
              </div>
              <div
                className="absolute top-1/2 h-6 w-1 -translate-y-1/2 transform bg-gray-900 shadow-lg"
                style={{
                  left: `${Math.min(Math.max((bmiData.bmi / 40) * 100, 0), 100)}%`
                }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-600">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm text-gray-600">Height</div>
              <div className="text-lg font-semibold text-gray-900">
                {bmiData.height} cm
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm text-gray-600">Weight</div>
              <div className="text-lg font-semibold text-gray-900">
                {bmiData.weight} kg
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Health Assessment
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Health Score</span>
              <span className={`text-sm font-bold ${getScoreColor(healthScore)}`}>
                {healthScore}/100 - {getScoreLabel(healthScore)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full transition-all duration-500 ${
                  healthScore >= 85 ? 'bg-green-500' :
                  healthScore >= 70 ? 'bg-yellow-500' :
                  healthScore >= 50 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${healthScore}%` }}
              ></div>
            </div>
          </div>
          
          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 font-medium text-blue-900">Category Details</h4>
            <p className="text-sm text-blue-800">
              {categoryInfo.description}
            </p>
          </div>
          
          <div className="rounded-lg bg-green-50 p-4">
            <h4 className="mb-2 font-medium text-green-900">Recommendation</h4>
            <p className="text-sm text-green-800">
              {categoryInfo.recommendation}
            </p>
          </div>
          
          <div className="rounded-lg bg-yellow-50 p-4">
            <h4 className="mb-2 font-medium text-yellow-900">Ideal Weight Range</h4>
            <p className="text-sm text-yellow-800">
              For your height ({bmiData.height} cm), the healthy weight range is:
            </p>
            <p className="mt-1 text-lg font-semibold text-yellow-900">
              {idealWeight.min} - {idealWeight.max} kg
            </p>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          BMI Categories Reference
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="mr-3 h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium">Underweight</span>
            </div>
            <span className="text-sm text-gray-600">BMI &lt; 18.5</span>
          </div>
          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="mr-3 h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Normal Weight</span>
            </div>
            <span className="text-sm text-gray-600">BMI 18.5 - 24.9</span>
          </div>
          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="mr-3 h-3 w-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm font-medium">Overweight</span>
            </div>
            <span className="text-sm text-gray-600">BMI 25 - 29.9</span>
          </div>
          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="mr-3 h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium">Obese</span>
            </div>
            <span className="text-sm text-gray-600">BMI ≥ 30</span>
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-500">
        <p>Calculated on {bmiData.timestamp.toLocaleDateString()} at {bmiData.timestamp.toLocaleTimeString()}</p>
      </div>
    </div>
  )
}