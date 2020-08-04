import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import moment from 'moment'

function ModalDateItem(props) {
  const {item} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{moment(item.end_time).format('MM-DD-YYYY')}</Text>
    </View>
  );
}

export default ModalDateItem;
