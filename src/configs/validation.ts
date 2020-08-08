const ALPHABET_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_UPPER = ALPHABET_LOWER.toUpperCase();
const ALPHABET = `${ALPHABET_UPPER}${ALPHABET_LOWER}`;
const SPACE = ' ';
const COMMA = ',';
const NUMBERS = '0123456789';
const HYPHEN = '-';
const SPECIAL_CHARS = `,.!@#$%^&*()_~§;:'"|\\[{}]<>?/+=-`; // ????

export const REGULAR_INPUT_ALLOWED_CHARS = `${ALPHABET}${HYPHEN}${NUMBERS}${SPACE}`.split(
  '',
);
export const ADDRESS_ALLOWED_CHARS = [...REGULAR_INPUT_ALLOWED_CHARS, COMMA];
export const ONLY_LETTERS_ALLOWED = ALPHABET.split('');
export const ONLY_NUMBERS_ALLOWED = NUMBERS.split('');
export const CITY_INPUT_ALLOWED_CHARS = `${ALPHABET}${HYPHEN}${COMMA}${NUMBERS}`.split(
  '',
);
export const MAX_DEFAULT_TEXT_LENGTH = 200;

// For password
export const PASSWORD_MIN_AMOUNT_OF_NUMBERS = 1;
export const PASSWORD_MIN_AMOUNT_OF_UPPERCASE = 1;
export const PASSWORD_MIN_AMOUNT_OF_LOWERCASE = 1;
export const PASSWORD_MIN_AMOUNT_OF_SPECIAL = 1;
export const ALPHABET_LOWER_PATTERN = ALPHABET_LOWER.split('');
export const ALPHABET_UPPER_PATTERN = ALPHABET_UPPER.split('');
export const SPECIAL_CHARS_PATTERN = SPECIAL_CHARS.split('');
export const CODE_ALLOWED_CHARS = `${ALPHABET_UPPER}${NUMBERS}`.split('')
