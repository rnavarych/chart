import React from 'react';
import { View, Text } from 'react-native';

import Button from '../../../../components/buttons/buttonNeomorph';

import * as routes from '../../../../nav/routes';
import * as I18n from '../../../../I18n';
import styles from './styles';
import { log } from '../../../../utils';
import images from '../../../../configs/images';

interface Props {
  navigation: any;
}

function LibraryScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Button
        text={I18n.strings('browse.buttons.tips')}
        leftIcon={images.browseTips}
        buttonType={'navigation'}
        onPress={() => navigation.navigate(routes.TIPS)}
      />
      <Button
        text={I18n.strings('browse.buttons.exercises')}
        leftIcon={images.browseActivity}
        buttonType={'navigation'}
        onPress={() => navigation.navigate(routes.EXERCISES)}
      />
    </View>
  );
}

export default LibraryScreen;
