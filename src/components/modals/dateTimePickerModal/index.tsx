import React from 'react';
import { View, ViewStyle, Platform } from 'react-native';

import BottomModal from '../baseBottomModal';
import DatePickerComponent from '@react-native-community/datetimepicker';

import styles from './styles';
import { log } from '../../../utils';

export type DateTimePickerMode = 'countdown' | 'date' | 'datetime' | 'time';

interface Props {
  label?: string;
  value: Date;
  minDate: Date;
  onValueChanged: (event: Event, newDate: Date | undefined) => void;
  onCancel: () => void;
  onDone: () => void;
  formatDate?: (date: Date) => string;
  containerStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  maxDate?: Date;
  modalTitle?: string;
  visible: boolean;
  mode?: DateTimePickerMode;
}

// TODO: add useCallbacks back!
function DateTimePickerModal(props: Props) {
  const {
    value,
    containerStyle,
    onValueChanged: onDateChanged,
    onCancel,
    onDone,
    maxDate,
    minDate,
    modalTitle,
    visible,
    mode = 'date',
  } = props;

  const createPicker = () => {
    return (
      <DatePickerComponent
        style={styles.pickerContainerModal}
        textColor={styles.$TEXT_COLOR}
        value={value}
        mode={mode}
        onChange={onDateChanged}
        maximumDate={maxDate}
        minimumDate={minDate}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Platform.OS === 'ios' ? (
        // iOS picker - embedded in modal panel
        <BottomModal
          isVisible={visible}
          onDone={onDone}
          onCancel={onCancel}
          title={modalTitle}>
          <View style={styles.pickerContainerModal}>{createPicker()}</View>
        </BottomModal>
      ) : (
        // Android Picker - native modal picker
        visible && createPicker()
      )}
    </View>
  );
}

export default DateTimePickerModal;
