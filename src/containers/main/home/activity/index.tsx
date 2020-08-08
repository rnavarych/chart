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
import { DateUtils } from '../../../../utils';
import I18n from '../../../../I18n';
import * as routes from '../../../../nav/routes';
import styles from './styles';

interface ActivityInputScreenProps {
  navigation: any;
}

const ActivityInputScreen = (props: ActivityInputScreenProps) => {
  const [steps, setSteps] = useState('');
  const [stepsValid, setStepsValid] = useState(false);
  const [activeMinutes, setActiveMinutes] = useState('');
  const [activeMinutesValid, setActiveMinutesValid] = useState(false);
  const [exerciseMinutes, setExerciseMinutes] = useState('');
  const [exerciseMinutesValid, setExerciseMinutesValid] = useState(false);
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState('');
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
        type: 'workout',
        start_time: time,
        end_time: time,
        category: 'walking',
        source_type: 'manual',
        metrics: [
          {
            value: parseFloat(steps),
            origin: 'manual',
            unit: 'count',
            type: 'steps',
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
          notShowRequired={true}
          isValid={stepsValid}
          validationRule={() => ({ isValid: true, error: '' })}
          text={steps}
          onChange={(value, isValid) => {
            setSteps(value);
            setStepsValid(isValid);
          }}
          label={'Steps'}
          placeholder={'Enter Steps'}
          keyboardType={'numeric'}
        />
        <Input
          layoutType="full-line"
          required={true}
          notShowRequired={true}
          isValid={activeMinutesValid}
          validationRule={() => ({ isValid: true, error: '' })}
          text={activeMinutes}
          onChange={(value, isValid) => {
            setActiveMinutes(value);
            setActiveMinutesValid(isValid);
          }}
          label={'Active Minutes'}
          placeholder={'Enter Active Minutes'}
          keyboardType={'numeric'}
        />
        <Input
          layoutType="full-line"
          required={true}
          notShowRequired={true}
          isValid={exerciseMinutesValid}
          validationRule={() => ({ isValid: true, error: '' })}
          text={exerciseMinutes}
          onChange={(value, isValid) => {
            setExerciseMinutes(value);
            setExerciseMinutesValid(isValid);
          }}
          label={'Exercise Minutes'}
          placeholder={'Enter Exercise Minutes'}
          keyboardType={'numeric'}
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
          disabled={!stepsValid}
          text={I18n.translate('buttons.submit')}
          onPress={onSubmit}
        />
      </View>
    </>
  );
};

export default ActivityInputScreen;
