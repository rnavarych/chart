import React, { useState, useMemo, ReactElement, cloneElement } from 'react';
import { View, ViewStyle, Platform } from 'react-native';

import DateTimePickerModal, { DateTimePickerMode } from '../modals/dateTimePickerModal';

import Text from '../text';
import Button from '../buttons/buttonNeomorph';

import styles from './styles';
import images from '../../configs/images';
import { log } from '../../utils';

interface Props {
  label?: string;
  date: Date;
  minDate: Date;
  maxDate: Date;
  onDateChange: (newDate: Date) => void;
  formatDate?: (date: Date) => string;
  containerStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  modalTitle?: string;
  mode?: DateTimePickerMode;
  children?: ReactElement;
}

// TODO: add useCallbacks back!
function DatePicker(props: Props) {
  const {
    date,
    label,
    containerStyle,
    labelStyle,
    onDateChange,
    formatDate,
    maxDate,
    minDate,
    modalTitle,
    mode = 'date',
    children,
  } = props;
  // sanity check: minDate <= date <= maxDate. Otherwise Android picker crashes
  const value = useMemo(() => {
    return date.getTime() < minDate.getTime() || date.getTime() > maxDate?.getTime()
      ? maxDate
      : date;
  }, [date, minDate, maxDate]);
  log.debug('Datepicker props:', props);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [oldValue, setOldValue] = useState<Date | null>(null);

  const onDateChanged = (event: Event, newDate: Date | undefined) => {
    log.debug('datetimePicker.onDateChanged():', { event, newDate });
    if (Platform.OS === 'android') {
      hideModal();
    }
    if (newDate) {
      onDateChange(newDate);
    }
  };

  const showModal = (): void => {
    setOldValue(value);
    log.debug('DatetimePicker.showModal()');
    setPickerVisible(true);
  };

  const hideModal = (): void => {
    log.debug('DatetimePicker.hideModal()');
    setPickerVisible(false);
    setOldValue(null);
  };

  // only for iOS, Android picker handles cancel action itself
  const onCancel = () => {
    log.debug('DatetimePicker.onCancel() (iOS only)');
    hideModal();
    oldValue && onDateChange(oldValue);
  };

  const formatDateInner = (date: Date): string => {
    return formatDate ? formatDate(date) : date.toLocaleDateString();
  };

  const createPicker = () => {
    return (
      <DateTimePickerModal
        modalTitle={modalTitle}
        visible={pickerVisible}
        value={value}
        mode={mode}
        onValueChanged={onDateChanged}
        onDone={hideModal}
        onCancel={onCancel}
        maxDate={maxDate}
        minDate={minDate}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {createPicker()}
      <View style={[styles.buttonContainer]}>
        {label && (
          <View style={styles.labelWrapper}>
            <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
          </View>
        )}
        {children ? (
          // Experimental! Assigns onPress() to children of the component
          cloneElement(children, { onPress: showModal })
        ) : (
          <Button
            text={formatDateInner(value)}
            onPress={showModal}
            buttonType="dropdown"
            textStyle={styles.buttonText}
            contentStyle={{ alignItems: 'flex-start' }}
            rightIcon={!pickerVisible ? images.arrowDropdown : images.arrowDropdownUp}
            height={45}
            width={styles.$DEFAULT_WIDTH}
          />
        )}
      </View>
    </View>
  );
}

export default DatePicker;
