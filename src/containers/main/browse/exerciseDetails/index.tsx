import React, { useState, useRef } from 'react';
import { View, ScrollView } from 'react-native';

import Text from '../../../../components/text';
import VideoWithControls from '../../../../components/videoWithControls';
import CountdownTimer, { TCountDownTimer } from '../../../../components/countdownTimer';
import Button from '../../../../components/buttons/button';

import { Exercise } from '../../../../dto/exercises';
import images from '../../../../configs/images';
import log from '../../../../utils/log';
import videos from '../../../../configs/videos';
import * as I18n from '../../../../I18n';
import styles from './styles';

interface Route {
  params: {
    exercise: Exercise;
  };
}

interface Props {
  navigation: any;
  route: Route;
}

function ExerciseDetailsScreen(props: Props) {
  const { navigation } = props;
  const { exercise } = props.route.params;
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [exercisePaused, setExercisePaused] = useState(false);
  const [exerciseFinished, setExerciseFinished] = useState(false);
  const countdownTimer = useRef<TCountDownTimer>();

  const startExercise = () => {
    log.debug('ExerciseDetails: startExercise()');
    setExerciseStarted(true);
  };

  const pauseExercise = () => {
    log.debug('ExerciseDetails: pauseExercise()');
    setExercisePaused(true);
  };

  const resumeExercise = () => {
    log.debug('ExerciseDetails: resumeExercise()');
    setExercisePaused(false);
  };

  const restartExercise = () => {
    log.debug('ExerciseDetails: restartExercise()');
    setExerciseFinished(false);
    setExercisePaused(false);
    countdownTimer.current && countdownTimer.current.restart();
  };

  const onExerciseFinished = () => {
    log.debug('ExerciseDetails: onExerciseFinished()');
    setExerciseFinished(true);
  };

  const onDoneButtonPressed = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.categoryTitle}>{exercise.name}</Text>
      <VideoWithControls source={exercise.video} repeat={true} muted={true} />
      <View style={styles.descriptionContainer}>
        <View style={styles.timerContainer}>
          <CountdownTimer
            ref={countdownTimer}
            duration={exercise.duration}
            running={exerciseStarted && !exercisePaused && !exerciseFinished}
            onFinished={onExerciseFinished}
          />
          <View style={styles.timerButtonsContainer}>
            <Button
              text={
                !exerciseStarted
                  ? I18n.strings('buttons.start')
                  : I18n.strings('buttons.restart')
              }
              onPress={!exerciseStarted ? startExercise : restartExercise}
              containerStyle={styles.timerButton}
            />
            <Button
              text={
                exercisePaused
                  ? I18n.strings('buttons.resume')
                  : I18n.strings('buttons.pause')
              }
              onPress={exercisePaused ? resumeExercise : pauseExercise}
              disabled={!exerciseStarted || exerciseFinished}
              containerStyle={styles.timerButton}
            />
          </View>
        </View>
        <Text style={styles.directionsTitle}>
          {I18n.strings('screens.exercises.directions')}
        </Text>
        <Text style={styles.directions}>{exercise.description}</Text>
        <Button
          text={I18n.strings('screens.exercises.buttons.done')}
          onPress={onDoneButtonPressed}
          disabled={!exerciseFinished}
        />
      </View>
    </ScrollView>
  );
}

export default ExerciseDetailsScreen;
