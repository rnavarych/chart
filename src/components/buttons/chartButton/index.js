import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';
import NeomorphWrapper from '../../neomorphWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';


function ChartButton(props) {
  const { containerStyle, label, width, height, onPress, focused, icon, iconSize } = props;
  return (
    <NeomorphWrapper
      width={ width }
      height={ height }
      style={ containerStyle }
      inner={ focused }>
      <TouchableOpacity
        style={ styles.touchContainer }
        disabled={ focused }
        onPress={ onPress }
      >
        { icon
          ? (
            <Image source={ icon } style={ {
              borderRadius: width,
              height: iconSize,
              width: iconSize,
              tintColor: EStyleSheet.value(focused ? '$textAccent' : '$textPrimary'),
            } } resizeMode={ 'contain' }/>
          )
          : (
            <Text
              style={ {
                ...styles.text,
                color: EStyleSheet.value(focused ? '$textAccent' : '$textPrimary'),
              } }>
              { label }
            </Text>
          )
        }
      </TouchableOpacity>
    </NeomorphWrapper>
  );
}

export default ChartButton;
