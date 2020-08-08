import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { ViewStyle, TextStyle, Image } from 'react-native';

import { ValidationResult, ValidationProps } from '../../interfaces/validation';

import images from '../../configs/images';
import styles from './styles';

interface Props {
  required?: boolean;
  notShowRequired?: boolean;
  disabled?: boolean;
  secure?: boolean;
  isValid?: boolean;
  label?: string;
  text: string;
  placeholder?: string;
  onChange: (text: string, isValid: boolean) => void;
  validationRule?: (props: ValidationProps) => ValidationResult;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: ViewStyle;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  maxLength?: number;
}

// TODO: delete when not needed (use inputNeo instead)
function Input(props: Props): JSX.Element {
  const { disabled = false, secure = false, label, text, placeholder } = props;
  const { notShowRequired = false } = props;
  const { onChange, containerStyle, labelStyle, inputStyle } = props;
  const { isValid = true, validationRule = () => ({ isValid: true, error: '' }) } = props;
  const { autoCapitalize, keyboardType, maxLength, required = false } = props;
  const [hideText, setHideText] = useState(secure ? secure : false);
  const [allowedMarkInvalid, setAllowedMarkInvalid] = useState(false);
  // TODO: Not sure about default value for the error, but current one handle case
  // when the user just focus and unfocus without typing anything and the field is not valid be default
  // In that case there was no checks and so - no messages to show
  const [error, setError] = useState<string | undefined>(required ? 'Required' : '');

  const oneEyeballPress = () => {
    setHideText(!hideText);
  };

  const onBlur = () => {
    !allowedMarkInvalid && setAllowedMarkInvalid(true);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {!notShowRequired && required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          allowedMarkInvalid && !isValid && styles.notValid,
        ]}>
        <TextInput
          onBlur={onBlur}
          editable={!disabled}
          style={[styles.inputWithEye, inputStyle]}
          onChangeText={(text) => {
            const validationResult = validationRule({ text, required });
            if (validationResult.isValid) {
              setError('');
            } else {
              setError(validationResult.error);
            }
            onChange(text, validationResult.isValid);
          }}
          value={text}
          secureTextEntry={hideText}
          {...{ autoCapitalize, keyboardType, maxLength, placeholder }}
        />
        {secure && (
          <TouchableOpacity onPress={oneEyeballPress}>
            <View style={styles.eyePadding}>
              <Image
                style={styles.eyeIcon}
                source={hideText ? images.icEyeCrossed : images.icEye}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {allowedMarkInvalid && !isValid && error ? (
        <Text style={{ height: 20, color: 'red' }}>{error}</Text>
      ) : (
        <Text style={{ height: 20 }} />
      )}
    </View>
  );
}

export default Input;
