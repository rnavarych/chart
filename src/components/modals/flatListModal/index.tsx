import React, { useMemo } from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';

import Modal from 'react-native-modal';

import Text from '../../text';
import Separator from '../../../components/separator';

import { DropdownItem } from '../../../constants/arrays';
import styles from './styles';
import { log } from '../../../utils';

interface Props {
  isVisible: boolean;
  data: DropdownItem[];
  selectedItem: DropdownItem;
  selectedIndex: number;
  onCancel: () => void;
  onItemPressed: (item: DropdownItem) => void;
  title?: string;
  children?: Element;
}

const ANIMATON_TIME = 300;

const FlatListModal = (props: Props) => {
  const { isVisible, title, data, onCancel, onItemPressed, selectedIndex = 0 } = props;

  const handleItemPressed = (item: DropdownItem, index: number) => {
    log.debug('Dropdown item pressed:', item);
    onItemPressed(item);
  };

  const ListRow = ({ item, index }) => {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#ddd"
        onPress={() => handleItemPressed(item, index)}>
        <View style={styles.itemRow}>
          <Text style={styles.rowText}>{item.label}</Text>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      style={styles.pickerModal}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={ANIMATON_TIME}
      animationOutTiming={ANIMATON_TIME}
      backdropTransitionInTiming={ANIMATON_TIME}
      backdropTransitionOutTiming={0}>
      {/* Somehow backdropTransitionOutTiming={0} fixes animation flickering on out animation!
      https://github.com/react-native-community/react-native-modal/issues/310#issuecomment-493749004 */}
      <View style={styles.modalContent}>
        <View style={styles.titleRow}>
          <Text style={styles.modalTitle}>{title}</Text>
        </View>
        <View style={styles.listRow}>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={data}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={selectedIndex}
            getItemLayout={(data, index) => ({
              length: styles.$ITEM_HEIGHT,
              offset: styles.$ITEM_HEIGHT * index,
              index,
            })}
            renderItem={({ item, index }) => <ListRow item={item} index={index} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FlatListModal;
