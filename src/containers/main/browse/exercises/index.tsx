import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';

import Text from '../../../../components/text';
import Separator from '../../../../components/separator';

import { ExerciseCategory, Exercise } from '../../../../dto/exercises';
import images from '../../../../configs/images';
import log from '../../../../utils/log';
import videos from '../../../../configs/videos';
import * as routes from '../../../../nav/routes';

import styles from './styles';

interface Props {
  navigation: any;
}

function ExercisesScreen(props: Props) {
  const { navigation } = props;
  const [activeListSections, setActiveListSections] = useState([]);

  const openExercise = (item: Exercise) => {
    log.debug('Open exercise:', item);
    navigation.navigate(routes.EXERCISE_DETAILS, { exercise: item });
  };

  const ListRow = ({ item }) => {
    return (
      <View style={styles.categoryRowContainer}>
        <Text style={styles.rowText}>{item.name}</Text>
      </View>
    );
  };

  const ExerciseRow = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.exerciseRowContainer}
        onPress={() => openExercise(item)}>
        <Text style={styles.rowText}>{item.name}</Text>
        <Image source={images.arrowRightBrowse} style={styles.rowIcon} />
      </TouchableOpacity>
    );
  };

  const renderCategoryRow = (content: ExerciseCategory, index: number) => {
    return (
      <View>
        {index !== 0 && <Separator />}
        <ListRow item={content} />
      </View>
    );
  };

  const renderExercisesList = (content: ExerciseCategory) => {
    //TODO: retrieve exercises list based on category
    const categoryExercises = fakeExercises;
    return (
      <View>
        {categoryExercises.map((value, index, array) => (
          <ExerciseRow item={value} />
        ))}
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveListSections(activeSections);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Exercises</Text>
      <Accordion
        containerStyle={styles.listContainer}
        sectionContainerStyle={{ width: '100%' }}
        activeSections={activeListSections}
        sections={fakeCategories}
        renderHeader={renderCategoryRow}
        renderContent={renderExercisesList}
        onChange={updateSections}
      />
    </ScrollView>
  );
}

export default ExercisesScreen;

// TODO: replace with actual exercise categories data
const fakeCategories: ExerciseCategory[] = [
  new ExerciseCategory('0', 'Cardio/Aerobic Exercises'),
  new ExerciseCategory('1', 'Resistance Exercises'),
  new ExerciseCategory('2', 'Warm Up Exercises'),
  new ExerciseCategory('3', 'Stretching Exercises'),
  new ExerciseCategory('4', 'Yoga and Balance Exercises'),
  new ExerciseCategory('5', 'Suggested Work Outs'),
];

// TODO: replace with actual exercise categories data
const fakeExercises: Exercise[] = [
  new Exercise(
    '0',
    'Push ups',
    'Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best! Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best! Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best! Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best!',
    30,
    videos.short,
  ),
  new Exercise(
    '1',
    'Push downs',
    'Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best!',
    30,
    videos.short,
  ),
  new Exercise(
    '2',
    'Push lefts',
    'Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best!',
    30,
    videos.long,
  ),
  new Exercise(
    '3',
    'Push rights',
    'Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best!',
    30,
    videos.long,
  ),
  new Exercise(
    '4',
    'Push arounds',
    'Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best!',
    30,
    videos.short,
  ),
  new Exercise(
    '5',
    'Jump around',
    'Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best!',
    30,
    videos.short,
  ),
  new Exercise(
    '6',
    'Jump around',
    'Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best!',
    30,
    videos.short,
  ),
  new Exercise(
    '7',
    'Jump up',
    'Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best!',
    30,
    videos.long,
  ),
  new Exercise(
    '8',
    'Jump up',
    'Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best!',
    30,
    videos.long,
  ),
  new Exercise(
    '9',
    'And get down',
    'Get on the floor on all fours, positioning your hands slightly wider than your shoulders. Then just do your best!',
    30,
    videos.short,
  ),
];
