export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ValidationProps {
  text: string;
  required: boolean;
}