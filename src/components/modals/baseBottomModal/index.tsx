import React from 'react';
import { View } from 'react-native';

import Modal from 'react-native-modal';

import Text from '../../text';
import Button from '../../buttons/buttonNeomorph';
import IconButton from '../../buttons/iconButton';

import styles from './styles';
import images from '../../../configs/images';

interface Props {
  isVisible: boolean;
  onDone: () => void;
  onCancel?: () => void;
  title?: string;
  children?: Element;
}

const ANIMATON_TIME = 500;

const BottomModal = (props: Props) => {
  const { isVisible, onDone, onCancel, title, children } = props;
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel || onDone}
      onBackButtonPress={onCancel || onDone}
      style={styles.pickerModal}
      animationInTiming={ANIMATON_TIME}
      animationOutTiming={ANIMATON_TIME}
      backdropTransitionInTiming={ANIMATON_TIME}
      backdropTransitionOutTiming={0}>
      <View style={styles.modalContent}>
        <View style={styles.panelTopRow}>
          <Text style={styles.modalTitle}>{title}</Text>
          <IconButton
            source={images.icCross}
            imageStyle={styles.crossIcon}
            containerStyle={styles.iconButtonContainer}
            onPress={onCancel || onDone}
          />
        </View>
        <View style={styles.panelContentRow}>{children}</View>
        <View style={styles.panelBottomRow}>
          <Button text="Done" buttonType="smallForBottomPanel" onPress={onDone} />
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;
