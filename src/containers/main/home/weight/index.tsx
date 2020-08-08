import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { useShallowSelector } from '../../../../hooks';

import Button from '../../../../components/buttons/buttonNeomorph';
import Input from '../../../../components/inputNeomorph';
import InputishButton from '../../../../components/buttons/inputishButton';
import DateTimePicker from '../../../../components/pickers/datetimePicker';

import { CREATE_EVENT } from '../../../../requests/deviceQL';
import { Validation, DateUtils } from '../../../../utils';
import I18n from '../../../../I18n';
import * as routes from '../../../../nav/routes';
import styles from './styles';

interface WeightInputScreenProps {
  navigation: any;
}

const WeightInputScreen = (props: WeightInputScreenProps) => {
  const [weight, setWeight] = useState('');
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [weightValid, setWeightValid] = useState(false);
  const { navigation } = props;
  const dispatch = useDispatch();
  const { start } = DateUtils.getStartAndEndOfTheDay('');

  const [createEvent, { loading }] = useMutation(CREATE_EVENT);

  const { userId } = useShallowSelector(({ auth: { userId } }) => ({
    userId,
  }));

  const onSubmit = () => {
    createEvent({
      variables: {
        user_id: userId,
        type: 'measurement',
        start_time: time,
        end_time: time,
        category: '',
        source_type: 'manual',
        metrics: [
          {
            value: parseFloat(weight),
            origin: 'manual',
            unit: 'lbs',
            type: 'body_weight',
          },
        ],
        user_notes: notes
          ? [
              {
                type: 'notes',
                value: notes,
              },
            ]
          : undefined,
      },
    })
      .then((response) => {
        navigation.navigate(routes.MENU);
      })
      .catch((error) => {
        console.log('ASHIBKA: ', error);
      });
  };
  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        style={styles.container}>
        <Input
          layoutType="full-line"
          required={true}
          isValid={weightValid}
          validationRule={Validation.weightValidation}
          text={weight}
          onChange={(value, isValid) => {
            setWeightValid(isValid);
            setWeight(value);
          }}
          label={'Weight(lbs)'}
          placeholder={'Enter Weight'}
          keyboardType={'numeric'}
          maxLength={5}
        />
        <DateTimePicker
          date={time}
          onDateChange={setTime}
          mode="time"
          label={'Time'}
          modalTitle={'Time'}
          minDate={start}>
          <InputishButton
            label={'Time'}
            value={DateUtils.format(time, 'hh:mm A')}
            onPress={() => {}}
          />
        </DateTimePicker>
        <Input
          multiline={true}
          layoutType="full-line"
          text={notes}
          onChange={(value) => {
            setNotes(value);
          }}
          label={'Notes'}
          placeholder={'Enter Notes'}
          maxLength={140}
          inputHeight={200}
        />
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <Button
          buttonType="full-line"
          disabled={!weightValid}
          text={I18n.translate('buttons.submit')}
          onPress={onSubmit}
        />
      </View>
    </>
  );
};

export default WeightInputScreen;
