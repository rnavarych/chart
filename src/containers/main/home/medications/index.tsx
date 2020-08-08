import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { useShallowSelector } from '../../../../hooks';

import Input from '../../../../components/inputNeomorph';
import Button from '../../../../components/buttons/buttonNeomorph';
import InputishButton from '../../../../components/buttons/inputishButton';
import DateTimePicker from '../../../../components/pickers/datetimePicker';
import RadioButtonGroup from '../../../../components/buttons/radioButtonGroup';

import { CREATE_EVENT } from '../../../../requests/deviceQL';
import { DateUtils } from '../../../../utils';
import I18n from '../../../../I18n';
import * as routes from '../../../../nav/routes';
import styles from './styles';

interface MedicationInputScreenProps {
  navigation: any;
}

const MedicationInputScreen = (props: MedicationInputScreenProps) => {
  const [taken, setTaken] = useState(true);
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
        type: 'measurement',
        start_time: time,
        end_time: time,
        category: 'adherence',
        source_type: 'manual',
        metrics: [
          {
            origin: 'manual',
            type: 'medication',
            unit: 'boolean',
            value: taken ? 1 : 0,
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
        <RadioButtonGroup
          value={taken}
          label={'Medications'}
          positiveTitle={'Taken'}
          negativeTitle={'Not Taken'}
          onChange={(value) => setTaken(value)}
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
        <Button text={I18n.translate('buttons.submit')} onPress={onSubmit} />
      </View>
    </>
  );
};

export default MedicationInputScreen;
