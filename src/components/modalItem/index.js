import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import moment from 'moment'

function ModalItem(props) {
  const {item} = props;

  const indicatorColor = React.useCallback((value) => {
    if (value >=70 && value <180) return '#8bc34a'
    else if (value >= 180 && value < 240) return '#feeb39'
    else return '#f54336'
  }, []);

  //todo change source
  return (
    <View style={styles.container}>
      <View style={ [styles.indicator, {backgroundColor: indicatorColor(item.value)}]}/>
      <Text style={styles.date}>{moment(item.end_time).format('hh: mm A')}</Text>
      <Text>—</Text>
      <Text style={styles.unit}>{`${item.value} ${item.unit}`}</Text>
      <Image source={{uri: 'https://cdn1.iconfinder.com/data/icons/material-core/14/close-512.png'}} style={styles.icon}/>
    </View>
  );
}

export default ModalItem;
