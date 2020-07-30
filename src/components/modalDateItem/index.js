import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

function ModalDateItem(props) {
  const {item} = props;
  return (
    <View style={{flexDirection: 'row', height: 30, marginLeft: 66, alignItems: 'center'}}>
      <Text style={{color: '#8093b0', fontSize: 12}}>{`${item.date.getMonth()}-${item.date.getDate()}-${item.date.getFullYear()}`}</Text>
    </View>
  );
}

export default ModalDateItem;
