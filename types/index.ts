export interface BMICategory {
  name: string;
  range: string;
  color: string;
  description: string;
}

export interface BMIResult {
  bmi: number;
  category: BMICategory;
  weight: number;
  height: number;
  unitSystem: 'metric' | 'imperial';
}

export interface FormData {
  height: string;
  weight: string;
  unitSystem: 'metric' | 'imperial';
}