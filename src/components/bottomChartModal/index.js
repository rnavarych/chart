import React from 'react';
import {Animated, TouchableOpacity, View, FlatList, Text} from 'react-native';
import styles from './styles';
import ModalItem from '../modalItem';
import ModalDateItem from '../modalDateItem';

function BottomChartModal(props) {
  const {modalHeight, duration, content, errorScroll, listRef} = props;
  const [modalY] = React.useState(new Animated.Value(modalHeight));
  const [modalVisible, setModalVisible] = React.useState(true);

  const openModal = React.useCallback(() => {
    Animated.timing(modalY, {
      duration: duration,
      toValue: modalHeight,
      useNativeDriver: true,
    }).start(() => setModalVisible(true));
  }, [modalY, setModalVisible]);

  const closeModal = React.useCallback(() => {
    Animated.timing(modalY, {
      duration: duration,
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setModalVisible(false)
  }, [modalY, setModalVisible]);

  const separator = () => <View style={styles.separator}/>;

  return (
    <Animated.View style={ [{transform: [{translateY: modalY}]}, styles.modalContainer] }>
      <TouchableOpacity
        style={ styles.touchArea }
        onPress={ !modalVisible ? openModal : closeModal }
      >
        <View style={ styles.modalButtonLine }/>
      </TouchableOpacity>
      <FlatList
        onScrollToIndexFailed={ errorScroll }
        ref={listRef}
        data={!modalVisible ? content : null}
        keyExtractor={ (i, index) => String(index) }
        showsVerticalScrollIndicator={ false }
        ItemSeparatorComponent={() => separator()}
        renderItem={ ({item, index}) => (
          index === 0 || index % 3 === 0
          ? <>
              <ModalDateItem item={item}/>
              { separator() }
              <ModalItem item={item}/>
            </>
          : <ModalItem item={item}/>
        ) }
      />
    </Animated.View>
  );
}

export default BottomChartModal;
