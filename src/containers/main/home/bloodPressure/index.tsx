import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { useShallowSelector } from '../../../../hooks';

import Input from '../../../../components/inputNeomorph';
import Button from '../../../../components/buttons/buttonNeomorph';
import InputishButton from '../../../../components/buttons/inputishButton';
import DateTimePicker from '../../../../components/pickers/datetimePicker';

import { CREATE_EVENT } from '../../../../requests/deviceQL';
import { Validation, DateUtils } from '../../../../utils';
import I18n from '../../../../I18n';
import * as routes from '../../../../nav/routes';
import styles from './styles';

interface BlooPressureInputScreenProps {
  navigation: any;
}

const BlooPressureInputScreen = (props: BlooPressureInputScreenProps) => {
  const [upperPressure, setUpperPressure] = useState('');
  const [lowerPressure, setLowerPressure] = useState('');
  const [upperPressureValid, setUpperPressureValid] = useState(false);
  const [lowerPressureValid, setLowerPressureValid] = useState(false);
  const [notes, setNotes] = useState('');
  const [time, setTime] = useState(new Date());
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
            origin: 'manual',
            type: 'diastolic',
            unit: 'mmHg',
            value: parseInt(lowerPressure),
          },
          {
            origin: 'manual',
            type: 'systolic',
            unit: 'mmHg',
            value: parseInt(upperPressure),
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
          isValid={upperPressureValid}
          text={upperPressure}
          onChange={(value, isValid) => {
            setUpperPressureValid(isValid);
            setUpperPressure(value);
          }}
          label={'Systolic(mmHg)'}
          placeholder={'Systolic'}
          keyboardType={'numeric'}
          maxLength={3}
          validationRule={Validation.bloodPressureValidation}
        />
        <Input
          layoutType="full-line"
          required={true}
          isValid={lowerPressureValid}
          text={lowerPressure}
          onChange={(value, isValid) => {
            setLowerPressureValid(isValid);
            setLowerPressure(value);
          }}
          label={'Diastolic(mmHg)'}
          placeholder={'Diastolic'}
          keyboardType={'numeric'}
          maxLength={3}
          validationRule={Validation.bloodPressureValidation}
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
          disabled={!upperPressureValid || !lowerPressureValid}
          text={I18n.translate('buttons.submit')}
          onPress={onSubmit}
        />
      </View>
    </>
  );
};

export default BlooPressureInputScreen;
