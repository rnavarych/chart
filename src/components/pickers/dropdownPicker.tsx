import React, { useState } from 'react';
import { View, ViewStyle, Platform } from 'react-native';

import { PickerIOS } from '@react-native-community/picker';

import BottomModal from '../modals/baseBottomModal';
import FlatListModal from '../modals/flatListModal';
import Text from '../text';
import Button from '../buttons/buttonNeomorph';

import { DropdownItem } from '../../constants/arrays';

import styles from './styles';
import images from '../../configs/images';
import { log } from '../../utils';

interface Props {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  data: DropdownItem[];
  value: DropdownItem;
  onValueChanged: (newValue: DropdownItem) => void;
  modalTitle?: string;
}

// TODO: add useCallbacks back!
function DropdownPicker(props: Props) {
  const {
    data,
    value: selectedValue,
    label,
    containerStyle,
    labelStyle,
    onValueChanged: valueChangedCallback,
    modalTitle,
  } = props;
  const [pickerVisible, setPickerVisible] = useState(false);
  const [oldValue, setOldValue] = useState<DropdownItem | null>(null);

  const onNewValue = (newValue: DropdownItem) => {
    log.debug('dropdownPicker.onNewValue():', newValue);
    valueChangedCallback(newValue);
  };

  const showModal = (): void => {
    log.debug('dropdownPicker.showModal()');
    setOldValue(selectedValue);
    setPickerVisible(true);
  };

  const hideModal = (): void => {
    log.debug('dropdownPicker.hideModal()');
    setOldValue(null);
    setPickerVisible(false);
  };

  // only for iOS, Android picker handles cancel action itself
  const onCancel = () => {
    log.debug('dropdownPicker.onCancel()');
    const value = oldValue;
    hideModal();
    value && onNewValue(value);
  };

  const onItemPressedAndroid = (item: DropdownItem) => {
    hideModal();
    onNewValue(item);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Platform.OS === 'ios' && (
        <BottomModal
          isVisible={pickerVisible}
          onDone={hideModal}
          onCancel={onCancel}
          title={modalTitle}>
          <View style={styles.pickerContainerModal}>
            <PickerIOS
              selectedValue={selectedValue.value}
              style={styles.pickerIOS}
              onValueChange={(itemValue, itemIndex) => onNewValue(data[itemIndex])}>
              {data.map((itemValue, index) => {
                return (
                  <PickerIOS.Item
                    label={itemValue.label}
                    value={itemValue.value}
                    key={index}
                  />
                );
              })}
            </PickerIOS>
          </View>
        </BottomModal>
      )}
      {Platform.OS === 'android' && (
        <FlatListModal
          onCancel={onCancel}
          onItemPressed={onItemPressedAndroid}
          selectedItem={selectedValue}
          selectedIndex={data.findIndex((value) => value.value === selectedValue.value)}
          data={data}
          isVisible={pickerVisible}
          title={modalTitle}
        />
      )}
      <View style={[styles.buttonContainer]}>
        <View style={styles.labelWrapper}>
          <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
        </View>
        {/* {Platform.OS === 'ios' ? ( */}
        <Button
          text={selectedValue.label}
          onPress={() => showModal()}
          buttonType="dropdown"
          textStyle={styles.buttonText}
          contentStyle={{ alignItems: 'flex-start' }}
          rightIcon={!pickerVisible ? images.arrowDropdown : images.arrowDropdownUp}
          height={45}
          width={styles.$DEFAULT_WIDTH}
        />
      </View>
    </View>
  );
}

export default DropdownPicker;
