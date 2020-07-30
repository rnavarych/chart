import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

function ModalItem(props) {
  const {item} = props;

  return (
    <View style={{flexDirection: 'row', height: 30, marginLeft: 40, alignItems: 'center'}}>
      <View style={{width: 6, height: 6, borderRadius: 10, backgroundColor: '#fac'}}/>
      <Text style={{color: '#31425d', fontSize: 14, marginLeft: 20, width: 75}}>{`${item.time.split(' ')[0]} : 00 ${item.time.split(' ')[1]}`}</Text>
      <Text>—</Text>
      <Text style={{color: '#31425d', fontSize: 14, marginLeft: 15}}>{`${item.value} mg/dl`}</Text>
      <Image source={{uri: 'https://cdn1.iconfinder.com/data/icons/material-core/14/close-512.png'}} style={{tintColor: '#009fc7', width: 10, height: 10, position: 'absolute', right: 40}}/>
    </View>
  );
}

export default ModalItem;
