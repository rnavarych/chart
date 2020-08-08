import React from 'react';
import { Image, TouchableOpacity, ImageSourcePropType, ViewStyle } from 'react-native';
import styles from './styles';

interface Props {
  onPress?: () => void;
  imageStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  source: ImageSourcePropType;
}

const IconButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.containerStyle}>
      <Image
        source={props.source}
        style={{ ...styles.headerIcon, ...props.imageStyle }}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
