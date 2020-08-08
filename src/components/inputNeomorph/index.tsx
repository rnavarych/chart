import React, { useState, useMemo } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { ViewStyle, TextStyle, Image, useWindowDimensions } from 'react-native';

import Text from '../text';
import NeomorphWrapper from '../neomorphWrapper';

import { ValidationResult, ValidationProps } from '../../interfaces/validation';

import images from '../../configs/images';
import Colors from '../../configs/colors';
import { log } from '../../utils';
import styles, { DEFAULT_HEIGHT } from './styles';

interface Props {
  required?: boolean;
  notShowRequired?: boolean;
  disabled?: boolean;
  secure?: boolean;
  isValid?: boolean;
  label?: string;
  text: string;
  multiline?: boolean;
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
  width?: number;
  layoutType?: 'regular' | 'full-line'; //TODO: rename layout types?
  inputHeight?: number;
}

//TODO: make default vertical margins for inputs smaller?
function Input(props: Props): JSX.Element {
  const { disabled = false, secure = false, label, inputHeight = DEFAULT_HEIGHT } = props;
  const { placeholder, width = styles.$DEFAULT_WIDTH, layoutType = 'regular' } = props;
  const { notShowRequired = false, text, multiline = false } = props;
  const { onChange, containerStyle, labelStyle, inputStyle } = props;
  const { isValid = true, validationRule = () => ({ isValid: true, error: '' }) } = props;
  const { autoCapitalize, keyboardType, maxLength, required = false } = props;
  const [hideText, setHideText] = useState(secure ? secure : false);
  const [allowedMarkInvalid, setAllowedMarkInvalid] = useState(false);
  // TODO: Not sure about default value for the error, but current one handle case
  // when the user just focus and unfocus without typing anything and the field is not valid be default
  // In that case there was no checks and so - no messages to show
  const [error, setError] = useState<string | undefined>(required ? 'Required' : '');
  const windowDimensions = useWindowDimensions();

  const oneEyeballPress = () => {
    setHideText(!hideText);
  };

  const onBlur = () => {
    // TODO: Add validation here to handle case (required field - onBlur - no onChange called)
    !allowedMarkInvalid && setAllowedMarkInvalid(true);
  };

  const calculatedWidth = useMemo(() => {
    switch (layoutType) {
      case 'full-line':
        return windowDimensions.width * styles.$FULL_LINE_WIDTH_PERCENT;
      default:
        return width;
    }
  }, [windowDimensions, layoutType, width]);

  const renderInput = () => {
    // give border an error color if needed
    const borderStyle =
      allowedMarkInvalid && !isValid ? styles.notValidBorder : styles.validBorder;
    return (
      <NeomorphWrapper
        width={calculatedWidth}
        height={inputHeight}
        style={{
          ...styles.neomorphWrapper,
        }}
        contentContainerStyle={{ ...styles.neomorphContent, ...borderStyle }}
        inner={true}>
        <TextInput
          editable={!disabled}
          style={[
            styles.input,
            { height: inputHeight, width: calculatedWidth },
            // TODO: maybe change that in the future
            //  we need Top and Bottom paddings for the multiline
            // paddingVertical does not work here
            multiline && { paddingTop: 10, paddingBottom: 10, paddingEnd: 10 },
            inputStyle,
          ]}
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
          selectionColor={Colors.accent1}
          {...{
            autoCapitalize,
            keyboardType,
            maxLength,
            placeholder,
            placeholderTextColor: styles.$PLACEHOLDER_COLOR,
            onBlur,
            multiline,
          }}
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
      </NeomorphWrapper>
    );
  };

  const renderLabel = (style?: ViewStyle) => {
    return (
      <Text style={{ ...styles.label, ...style, ...labelStyle }}>
        {label}
        {!notShowRequired && required && <Text style={styles.required}>*</Text>}
      </Text>
    );
  };

  return (
    <View
      style={[styles.container, containerStyle]}
      pointerEvents={disabled ? 'none' : 'auto'}>
      {layoutType === 'full-line' && label && renderLabel(styles.labelFullLine)}
      {/* TODO: inputRow -  RENAME */}
      <View style={styles.inputRow}>
        {layoutType === 'regular' && label && renderLabel()}
        <View style={[styles.inputContainer]}>{renderInput()}</View>
      </View>
      <View style={{ ...styles.errorRow, width: calculatedWidth }}>
        {allowedMarkInvalid && !isValid && error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    </View>
  );
}

export default Input;
