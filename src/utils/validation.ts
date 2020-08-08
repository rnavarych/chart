import { PASSWORD_MIN_LENGTH } from '../configs'; // TODO: move to valida...
import {
  REGULAR_INPUT_ALLOWED_CHARS,
  ONLY_LETTERS_ALLOWED,
  CITY_INPUT_ALLOWED_CHARS,
  ONLY_NUMBERS_ALLOWED,
  MAX_DEFAULT_TEXT_LENGTH,
  ADDRESS_ALLOWED_CHARS,
  ALPHABET_LOWER_PATTERN,
  ALPHABET_UPPER_PATTERN,
  SPECIAL_CHARS_PATTERN,
  PASSWORD_MIN_AMOUNT_OF_NUMBERS,
  PASSWORD_MIN_AMOUNT_OF_UPPERCASE,
  PASSWORD_MIN_AMOUNT_OF_LOWERCASE,
  PASSWORD_MIN_AMOUNT_OF_SPECIAL,
  CODE_ALLOWED_CHARS,
} from '../configs/validation';
import * as EmailValidator from 'email-validator';
import { ValidationProps, ValidationResult } from '../interfaces/validation';

export const passwordValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForPassword, 8, 20);
};

export const loginPasswordValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, () => true, 8, 20);
};

export const codeValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForCode, 12, 12);
};

export const emailValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForEmail);
};

export const weightValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkWeight, 2, 6);
};

export const heightFeetValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForNumbersOnly, 1, 1);
};

export const heightInchesValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForNumbersOnly, 1, 2);
};

export const zipcodeValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForNumbersOnly, 5, 10);
};

export const addressValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForAddressRules);
};

export const bloodPressureValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForNumbersOnly, 2, 3);
};

export const bloodGlucoseValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForNumbersOnly, 2, 3);
};

export const carbsValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForNumbersOnly, 2, 4);
};

export const cityValidation = (props: ValidationProps): ValidationResult => {
  const { text, required } = props;
  return validate(text, required, checkTextForCityInput);
};

export const stateValidation = (props: ValidationProps) => {
  const { text, required } = props;
  return validate(text, required, checkTextForLettersOnly);
};

export const nameValidation = (props: ValidationProps) => {
  const { text, required } = props;
  return validate(text, required, checkTextForRegularRules, 2, 29);
};

const checkTextForRegularRules = (validatedText: string): boolean => {
  return checkTextForAllowedChars(validatedText, REGULAR_INPUT_ALLOWED_CHARS);
};

const checkTextForCode = (validatedText: string): boolean => {
  return checkTextForAllowedChars(validatedText, CODE_ALLOWED_CHARS);
};

const checkTextForAddressRules = (validatedText: string): boolean => {
  return checkTextForAllowedChars(validatedText, ADDRESS_ALLOWED_CHARS);
};

const checkTextForCityInput = (validatedText: string): boolean => {
  return checkTextForAllowedChars(validatedText, CITY_INPUT_ALLOWED_CHARS);
};

const checkTextForLettersOnly = (validatedText: string): boolean => {
  return checkTextForAllowedChars(validatedText, ONLY_LETTERS_ALLOWED);
};

const checkWeight = (validatedText: string): boolean => {
  return /^(?!\.?$)\d{2,3}(\.\d{0,2})?$/.test(validatedText);
};

const checkTextForNumbersOnly = (validatedText: string): boolean => {
  return checkTextForAllowedChars(validatedText, ONLY_NUMBERS_ALLOWED);
};

const checkTextForPassword = (validatedText: string): boolean => {
  const splittedText = validatedText.split('');
  let lowAmount = 0;
  let upperAmount = 0;
  let specialAmount = 0;
  let numberAmount = 0;
  for (let c of splittedText) {
    if (isCharOneOfTheAllowed(c, ALPHABET_LOWER_PATTERN)) lowAmount++;
    if (isCharOneOfTheAllowed(c, ALPHABET_UPPER_PATTERN)) upperAmount++;
    if (isCharOneOfTheAllowed(c, SPECIAL_CHARS_PATTERN)) specialAmount++;
    if (isCharOneOfTheAllowed(c, ONLY_NUMBERS_ALLOWED)) numberAmount++;
  }
  if (
    lowAmount >= PASSWORD_MIN_AMOUNT_OF_LOWERCASE &&
    upperAmount >= PASSWORD_MIN_AMOUNT_OF_UPPERCASE &&
    specialAmount >= PASSWORD_MIN_AMOUNT_OF_SPECIAL &&
    numberAmount >= PASSWORD_MIN_AMOUNT_OF_NUMBERS
  ) {
    return true;
  } else {
    return false;
  }
};

const checkTextForEmail = (validatedText: string): boolean => {
  return EmailValidator.validate(validatedText);
};

const checkTextForAllowedChars = (text: string, pattern: string[]): boolean => {
  const splittedText = text.split('');
  for (let char of splittedText) {
    if (!isCharOneOfTheAllowed(char, pattern)) return false;
  }
  return true;
};

const isCharOneOfTheAllowed = (char: string, allowedChars: string[]) => {
  for (let c of allowedChars) {
    if (c === char) return true;
  }
  return false;
};

const validate = (
  text: string,
  required: boolean,
  validateFunction: (text: string) => boolean,
  minLength: number = 0,
  maxLength: number = MAX_DEFAULT_TEXT_LENGTH,
): ValidationResult => {
  if (required && text.length === 0) {
    return {
      isValid: false,
      error: 'Required',
    };
  } else {
    if (!required && text.length === 0) {
      return {
        isValid: true,
      };
    }
  }
  if (checkContainsOnlySpaces(text)) return { isValid: false, error: 'Not Valid' };
  if (text.length < minLength || text.length > maxLength) {
    return {
      isValid: false,
      error: 'Not valid',
    };
  }
  if (validateFunction(text)) {
    return {
      isValid: true,
    };
  } else {
    return {
      isValid: false,
      error: 'Not valid',
    };
  }
};

const checkContainsOnlySpaces = (text: string) => {
  const splittedText = text.split('');
  for (let c of splittedText) {
    if (c !== ' ') return false;
  }
  return true;
};

export const ALLOWED_DEVICES = ['сharge[\\s]*3', 'charge[\\s]*4'];

export const validateEmail = (
  email: string,
  setError: (error: string) => void,
): boolean => {
  if (!email) {
    setError('Email must not be empty');
    return false;
  }
  if (!EmailValidator.validate(email)) {
    setError('Please enter a valid email');
    return false;
  }
  setError('');
  return true;
};

export const validatePasswordAndConfirmation = (
  password: string,
  confirmPassword: string,
  setError: (error: string) => void,
): boolean => {
  if (!password) {
    setError('Password must not be empty');
    return false;
  }
  if (!confirmPassword) {
    setError('Password confirmation must not be empty');
    return false;
  }
  if (password !== confirmPassword) {
    setError('Password and confirmation must match');
    return false;
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    setError(`Minimal password length is ${PASSWORD_MIN_LENGTH} symbols`);
    return false;
  }
  setError('');
  return true;
};

export const isValidDevice = (deviceName?: string) => {
  if (deviceName) {
    return valueMatchesAnyPattern(deviceName, ALLOWED_DEVICES, 'gi');
  } else {
    return false;
  }
};

export const valueMatchesAnyPattern = (
  value: string,
  patterns: string[],
  flags?: string,
): boolean => {
  let pattern;
  for (pattern of patterns) {
    if (pattern) {
      let regexp = new RegExp(pattern, flags ? flags : '');
      if (regexp.test(value)) {
        return true;
      }
    }
  }
  return false;
};
