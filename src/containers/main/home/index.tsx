import React, { useRef, useLayoutEffect, useMemo, useReducer } from 'react';
import { useState, useEffect } from 'react';
import { Animated as RNAnimated, useWindowDimensions } from 'react-native';
import { UIManager, Text, LayoutAnimation, Image } from 'react-native';
import { View, Platform, ScrollView } from 'react-native';

import moment from 'moment';
import * as Animatable from 'react-native-animatable';

import { useHeaderHeight } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useShallowSelector, useDidUpdateEffect, usePrevious } from '../../../hooks';

import Wheel from './components/wheel';
import RoundButton from '../../../components/buttons/roundButton';
import WheelBubble from './components/bubble';
import WheelListItem from './components/listItem';
import NewBubble from './components/newBubble';
import BottomNotification from './components/notification';
import WidgetPanel from './components/widgetPanel';

import { GET_ENTRIES_BY_TYPES, MARK_AS_SEEN } from '../../../requests/deviceQL';
import { Entry, TimeSection } from '../../../interfaces/entities';
import * as routes from '../../../nav/routes';
import styles from './styles';
import { INNER_RADIUS_SMALL, CY, CX, FIELD_SIZE, TOP_HEIGHT } from './constants';
import { bubbleR, duration } from './constants';
import { DEFAULT_TABBAR_HEIGHT } from '../../../constants';
import { calcBubbleCoordsForASection } from './utils';
import { EntryUtils, DateUtils } from '../../../utils';

// TO BE DELETED
import { processAndFilterData, filterPressureAndSteps } from '../browse/temp';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface SummaryScreenProps {
  navigation: any;
}

interface Coord {
  x: number;
  y: number;
}

interface State {
  seenEntries: Entry[];
  unseenEntries: Entry[];
}

const initialState = {
  seenEntries: [],
  unseenEntries: [],
};

const actionTypes = {
  ADD_ONE_TO_THE_WHEEL: 'ADD_ONE_TO_THE_WHEEL',
  ADD_ALL_TO_THE_WHEEL: 'ADD_ALL_TO_THE_WHEEL',
  UPDATE_ENTRIES: 'UPDATE_ENTRIES',
  CLEAN_LAST_NEW_ENTRY: 'CLEAN_LAST_NEW_ENTRY',
  CLEAN_ALL_NEW_ENTRIES: 'CLEAN_ALL_NEW_ENTRIES',
};

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_ONE_TO_THE_WHEEL:
      return {
        ...state,
        seenEntries: [
          ...state.seenEntries,
          state.unseenEntries[state.unseenEntries.length - 1],
        ].sort((a, b) => DateUtils.compareTime(a.time, b.time, 'HH:mm:ss')),
      };
    case actionTypes.ADD_ALL_TO_THE_WHEEL:
      return {
        ...state,
        seenEntries: [...state.seenEntries, ...state.unseenEntries].sort((a, b) =>
          DateUtils.compareTime(a.time, b.time, 'HH:mm:ss'),
        ),
      };
    case actionTypes.UPDATE_ENTRIES:
      return {
        ...state,
        seenEntries: [...action.seenEntries].sort((a, b) =>
          DateUtils.compareTime(a.time, b.time, 'HH:mm:ss'),
        ),
        unseenEntries: [...action.unseenEntries],
      };
    case actionTypes.CLEAN_LAST_NEW_ENTRY:
      return {
        ...state,
        unseenEntries: state.unseenEntries.slice(0, state.unseenEntries.length - 1),
      };
    case actionTypes.CLEAN_ALL_NEW_ENTRIES:
      return {
        ...state,
        unseenEntries: [],
      };
    default:
      throw new Error();
  }
};

const useNativeDriver = true;

function SummaryScreen(props: SummaryScreenProps) {
  const { height, width } = useWindowDimensions();
  const { navigation } = props;
  const insets = useSafeArea();
  const headerHeight = useHeaderHeight();
  const isFocused = useIsFocused();
  // const isInitialRender = useRef(true);
  const [state, dispatchState] = useReducer(reducer, initialState);

  const mapListRefs = useRef(new Map());
  const mapUnseenAnimatedValues = useRef(new Map());
  // Contains coords for list bubbles
  const arrayCoords = useRef<Coord[] | []>([]);
  // Contains animated values for details animations
  const arrayOfAnimatedValues = useRef([]);
  const gradientOpacityAnim = useRef(new RNAnimated.Value(0)).current;

  // WARNING: A trick to switch between plain coords and animated values to allow LayoutAnimation to work.
  // Without the workaround LayoutAnimation does not affect views controlled by transform props.
  // Everytime when the screen wants to open detailsMode this flag should be toggled to false
  //    and should be toggled to true when detailsMode if off
  // As an alternative we could migrate to Reanimated probably
  //    and use top and left style props to position the bubbles
  // Note: looks like Reanimated doesn't have an alternative to Animated.parallel
  const [shouldUseCoordInsteadAnimValue, setShouldUseCoordInsteadAnimValue] = useState(
    true,
  );

  const { userId, timeSection, blocked, notification } = useShallowSelector(
    ({ app: { timeSection, blocked }, notifications: { main }, auth: { userId } }) => ({
      userId,
      timeSection,
      blocked,
      notification: main,
    }),
  );

  const now = moment();
  // TODO: change to day
  const start_date = now.startOf('day').toISOString(true);
  const end_date = now.endOf('day').toISOString(true);

  const [getEntriesRequest, { data, loading }] = useLazyQuery(GET_ENTRIES_BY_TYPES, {
    fetchPolicy: 'no-cache',
    variables: {
      user_id: userId,
      types: ['body_weight', 'blood_glucose', 'carbohydrate', 'medication'],
      start_date,
      end_date,
    },
  });

  const [markAsSeenRequest] = useMutation(MARK_AS_SEEN);

  useEffect(() => {
    getEntriesRequest();
  }, []);

  const prevLoading = usePrevious(loading);
  useEffect(() => {
    if (prevLoading && !loading && data) {
      mapUnseenAnimatedValues.current.clear();
      let entriesUnfiltered = processAndFilterData(
        data.results.metrics,
        filterPressureAndSteps,
      );
      if (!entriesUnfiltered.length) {
        dispatchState({
          type: actionTypes.UPDATE_ENTRIES,
          seenEntries: [],
          unseenEntries: [],
        });
        return;
      }
      let seenEntries = entriesUnfiltered.filter((i) => i.seen_at !== null);
      let unseenEntries = entriesUnfiltered.filter((i) => i.seen_at === null);
      seenEntries = seenEntries.map(EntryUtils.composeEntry);
      unseenEntries = unseenEntries.map(EntryUtils.composeEntry);
      unseenEntries.map((item: Entry) => {
        mapUnseenAnimatedValues.current.set(item.id, [
          new RNAnimated.ValueXY({
            y: CY - INNER_RADIUS_SMALL,
            x: 0,
          }),
          new RNAnimated.Value(1),
        ]);
      });
      dispatchState({ type: actionTypes.UPDATE_ENTRIES, seenEntries, unseenEntries });
    }
  }, [loading]);

  const newEntries = state.unseenEntries;

  const currentlyDisplayedNewBubble = newEntries[newEntries.length - 1];
  const dispatch = useDispatch();
  const [detailsMode, setDetailsMode] = useState(false);
  const [detailAnimationInProgress, setDetailAnimationInProgress] = useState(false);
  const [shouldAnimateNewEntries, setShouldAnimateNewEntries] = useState(false);
  const [newBubbleAnimationInProgress, setNewEntryAnimationStatus] = useState(false);
  const bubbles1 = useMemo(
    () =>
      state.seenEntries.filter((item: Entry) => item.timeSection === TimeSection.MORNING),
    [state.seenEntries.length],
  );
  const bubbles2 = useMemo(
    () =>
      state.seenEntries.filter(
        (item: Entry) => item.timeSection === TimeSection.AFTERNOON,
      ),
    [state.seenEntries.length],
  );
  const bubbles3 = useMemo(
    () =>
      state.seenEntries.filter((item: Entry) => item.timeSection === TimeSection.EVENING),
    [state.seenEntries.length],
  );

  const [wheelReadyForInteraction, setWheelReadyForInteraction] = useState(false);
  const listRef = useRef();
  const prevEntriesLength = usePrevious(state.seenEntries.length);

  const heightContainer =
    height -
    FIELD_SIZE.height -
    20 - // TODO: add this margin
    headerHeight -
    DEFAULT_TABBAR_HEIGHT -
    insets.bottom -
    TOP_HEIGHT;

  const bubblesInitialCoords1 = useMemo(
    () => calcBubbleCoordsForASection(bubbles1, TimeSection.MORNING, CX, CY),
    [bubbles1.length],
  );
  const bubblesInitialCoords2 = useMemo(
    () => calcBubbleCoordsForASection(bubbles2, TimeSection.AFTERNOON, CX, CY),
    [bubbles2.length],
  );
  const bubblesInitialCoords3 = useMemo(
    () => calcBubbleCoordsForASection(bubbles3, TimeSection.EVENING, CX, CY),
    [bubbles3.length],
  );
  const bubblesInitialCoords = [
    ...bubblesInitialCoords1,
    ...bubblesInitialCoords2,
    ...bubblesInitialCoords3,
  ];

  const checkIfCoordsAreInvalid = () => {
    return arrayCoords.current.some((item) => item.x < 0 || item.y < 0);
  };

  const scheduleNewListMeasurements = () => {
    setWheelReadyForInteraction(false);
    setTimeout(() => {
      measureListBubblesCoords();
    }, 1000);
  };

  useMemo(() => {
    if (state.seenEntries.length === 0) {
      arrayOfAnimatedValues.current = [];
      return;
    }
    if (prevEntriesLength < state.seenEntries.length) {
      const amountChange = state.seenEntries.length - prevEntriesLength;
      bubblesInitialCoords.map((item, i) => {
        if (i < state.seenEntries.length - amountChange) {
          arrayOfAnimatedValues.current[i].setValue({
            x: item.x,
            y: item.y,
          });
        } else {
          arrayOfAnimatedValues.current.push(
            new RNAnimated.ValueXY({
              x: item.x,
              y: item.y,
            }),
          );
        }
      });
    } else {
      setDetailsMode(false);
      arrayOfAnimatedValues.current = [];
      bubblesInitialCoords.map((item, i) => {
        arrayOfAnimatedValues.current.push(
          new RNAnimated.ValueXY({
            x: item.x,
            y: item.y,
          }),
        );
      });
      scheduleNewListMeasurements()
    }
  }, [state.seenEntries.length]);

  // TODO: Maybe need a better way?
  const getCoordsArray = (timeSection: TimeSection) => {
    switch (timeSection) {
      case TimeSection.MORNING: {
        return bubblesInitialCoords1;
      }
      case TimeSection.AFTERNOON: {
        return bubblesInitialCoords2;
      }
      case TimeSection.EVENING: {
        return bubblesInitialCoords3;
      }
      default:
        return []; // null
    }
  };

  const startNewEntryAnimation = ({ multiple }: { multiple: boolean }) => {
    const animatableEntries = multiple ? newEntries : [newEntries[newEntries.length - 1]];
    const animatedValues = animatableEntries.map((item) =>
      mapUnseenAnimatedValues.current.get(item.id),
    );
    setNewEntryAnimationStatus(true);
    RNAnimated.parallel([
      ...newEntries.map((item, i) => {
        const coordsArray = getCoordsArray(item.timeSection);
        const indexInCoordArray = coordsArray.findIndex(
          (coordItem) => coordItem.id === item.id,
        );
        const [translateValue, scaleValue] = animatedValues[i];
        return RNAnimated.parallel([
          RNAnimated.timing(translateValue, {
            toValue: {
              x: coordsArray[indexInCoordArray].x,
              y: coordsArray[indexInCoordArray].y - INNER_RADIUS_SMALL + bubbleR,
            },
            duration,
            useNativeDriver,
          }),
          RNAnimated.timing(scaleValue, {
            toValue: bubbleR / INNER_RADIUS_SMALL,
            duration,
            useNativeDriver,
          }),
        ]);
      }),
    ]).start(() => {
      setShouldAnimateNewEntries(false);
      setNewEntryAnimationStatus(false);
      markAsSeenRequest({
        variables: {
          user_id: userId,
          metric_ids: animatableEntries.map((item) => parseInt(item.id)),
        },
      });
      dispatchState({
        type: multiple
          ? actionTypes.CLEAN_ALL_NEW_ENTRIES
          : actionTypes.CLEAN_LAST_NEW_ENTRY,
      });
      animatableEntries.map((item) => mapUnseenAnimatedValues.current.delete(item.id));
    });
  };

  useDidUpdateEffect(() => {
    if (currentlyDisplayedNewBubble !== undefined && detailsMode) {
      setDetailsMode(false);
      arrayOfAnimatedValues.current.map((_, i) =>
        arrayOfAnimatedValues.current[i].setValue({
          x: bubblesInitialCoords[i].x,
          y: bubblesInitialCoords[i].y,
        }),
      );
    }
  }, [newEntries.length]);

  useDidUpdateEffect(() => {
    if (state.seenEntries.length === 0) {
      mapListRefs.current.clear();
      arrayCoords.current = [];
      setWheelReadyForInteraction(false);
      return;
    }
    if (prevEntriesLength < state.seenEntries.length) {
      const amountChange = state.seenEntries.length - prevEntriesLength;
      shouldAnimateNewEntries && startNewEntryAnimation({ multiple: amountChange !== 1 });
      scheduleNewListMeasurements();
    } else {
      // scheduleNewListMeasurements();
    }
  }, [state.seenEntries.length]);

  const prevIsFocused = usePrevious(isFocused);
  useEffect(() => {
    // Check on negative x (now) or y coords
    if (isFocused && checkIfCoordsAreInvalid()) {
      scheduleNewListMeasurements();
    }
    if (!prevIsFocused && isFocused) {
      getEntriesRequest();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!blocked && checkIfCoordsAreInvalid()) {
      scheduleNewListMeasurements();
    }
  }, [blocked]);

  useLayoutEffect(() => {
    // CVS-110: this call, somehow, fixes it (?!)
    navigation.setParams({});
  }, [navigation]);

  const startBackwardDetailsAnimation = (callback?: () => void) => {
    setDetailAnimationInProgress(true);
    RNAnimated.parallel([
      ...arrayOfAnimatedValues.current.map((item, i) =>
        RNAnimated.timing(arrayOfAnimatedValues.current[i], {
          toValue: {
            x: bubblesInitialCoords[i].x,
            y: bubblesInitialCoords[i].y,
          },
          duration,
          useNativeDriver,
        }),
      ),
      RNAnimated.timing(gradientOpacityAnim, {
        toValue: 0,
        duration,
        useNativeDriver,
      }),
    ]).start(() => {
      setDetailsMode(false);
      setDetailAnimationInProgress(false);
      callback && callback();
    });
  };

  const measureListBubblesCoords = () => {
    arrayCoords.current = [];
    state.seenEntries.map((item, index) => {
      const reversedIndex = state.seenEntries.length - 1 - index;
      const ref = mapListRefs.current.get(item.id);
      ref.measureInWindow((x: number, y: number) => {
        // __DEV__ && console.log('MEASURE: ', { x, y });
        arrayCoords.current[reversedIndex] = { x, y };
        if (index === state.seenEntries.length - 1) setWheelReadyForInteraction(true);
      });
    });
  };

  const startDetailsAnimation = () => {
    if (arrayCoords.current.length) {
      setDetailAnimationInProgress(true);
      RNAnimated.parallel([
        ...arrayOfAnimatedValues.current.map((item, i) =>
          RNAnimated.timing(arrayOfAnimatedValues.current[i], {
            toValue: {
              x: arrayCoords.current[i].x - CX + bubbleR,
              y: arrayCoords.current[i].y - headerHeight,
            },
            duration,
            useNativeDriver,
          }),
        ),
        RNAnimated.timing(gradientOpacityAnim, {
          toValue: 1,
          duration,
          useNativeDriver,
        }),
      ]).start(() => {
        setDetailsMode(true);
        setDetailAnimationInProgress(false);
      });
    }
  };

  const onPlusPress = () => {
    navigation.navigate(routes.MENU);
  };

  useEffect(() => {
    if (!shouldUseCoordInsteadAnimValue) {
      startDetailsAnimation();
    }
  }, [shouldUseCoordInsteadAnimValue]);

  useEffect(() => {
    if (!detailsMode) {
      setShouldUseCoordInsteadAnimValue(true);
    }
  }, [detailsMode]);

  const onWheelPress = () => {
    if (detailAnimationInProgress) return;
    if (!detailsMode) {
      listRef.current && listRef.current.scrollTo({ animated: false, y: 0 });
      setShouldUseCoordInsteadAnimValue(false);
    } else {
      startBackwardDetailsAnimation();
    }
  };

  const onNewBubblePress = () => {
    listRef.current && listRef.current.scrollTo({ animated: false, y: 0 });
    LayoutAnimation.spring();
    setShouldAnimateNewEntries(true);
    dispatchState({ type: actionTypes.ADD_ALL_TO_THE_WHEEL });
  };

  const renderTop = () => {
    return (
      <View style={styles.topContainer}>
        <RoundButton
          animated={false}
          onPress={onPlusPress}
          containerStyle={styles.addNewMeasurement}
        />
      </View>
    );
  };

  const renderSummary = () => {
    const glucose = '160';
    const pressure = '120 / 80';
    const steps = '5434';
    const activeMinutes = '45';
    const exerciseMinutes = '23';
    return (
      <WidgetPanel
        containerStyle={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
        height={heightContainer}
        {...{ glucose, pressure, steps, activeMinutes, exerciseMinutes }}
      />
    );
  };

  const renderList = () => {
    return (
      <ScrollView
        pointerEvents={detailsMode ? 'auto' : 'none'}
        ref={(ref) => (listRef.current = ref)}
        style={[
          styles.listContainer,
          {
            opacity: detailsMode && !detailAnimationInProgress ? 1 : 0,
          },
        ]}
        contentContainerStyle={styles.listContent}>
        {state.seenEntries.map((item: Entry, index: number) => {
          const lastIndex = state.seenEntries.length - 1 - index;
          const entry = state.seenEntries[lastIndex];
          const nextEntry = state.seenEntries[lastIndex - 1];
          const isLast = index === state.seenEntries.length - 1;
          const key = entry.id;
          return (
            <WheelListItem
              {...{ isLast, entry, nextEntry, key }}
              ref={(ref) => mapListRefs.current.set(item.id, ref)}
            />
          );
        })}
      </ScrollView>
    );
  };

  const renderBottomNotification = () => {
    return <BottomNotification height={heightContainer} {...{ notification }} />;
  };

  const renderCircleNotification = () => {
    return (
      <Animatable.View
        animation={'zoomIn'}
        pointerEvents={'none'}
        style={{
          position: 'absolute',
          top: CY - INNER_RADIUS_SMALL,
          borderRadius: INNER_RADIUS_SMALL,
        }}>
        <Image
          source={notification?.wheelImage}
          style={{
            width: 2 * INNER_RADIUS_SMALL,
            height: 2 * INNER_RADIUS_SMALL,
            borderRadius: INNER_RADIUS_SMALL,
          }}
        />
      </Animatable.View>
    );
  };

  const decideZIndex = (id: string, index: number) => {
    return index > state.seenEntries.findIndex((item: Entry) => item.id === id);
  };

  const renderBubbles = state.seenEntries.map((item: Entry, index: number) => {
    let shouldIncreasezIndex: boolean;
    if (currentlyDisplayedNewBubble) {
      shouldIncreasezIndex = decideZIndex(currentlyDisplayedNewBubble.id, index);
    } else {
      shouldIncreasezIndex = false;
    }
    return (
      <WheelBubble
        key={item.id}
        entry={item}
        notVisible={detailsMode && !detailAnimationInProgress}
        isAppearingOne={
          currentlyDisplayedNewBubble &&
          newBubbleAnimationInProgress &&
          newEntries.some((newEntry) => item.id === newEntry.id)
        }
        style={
          shouldUseCoordInsteadAnimValue
            ? {
                top: bubblesInitialCoords[index].y,
                left: bubblesInitialCoords[index].x + CX - bubbleR,
                zIndex: shouldIncreasezIndex ? 9999 : 0,
              }
            : {}
        }
        transform={
          !shouldUseCoordInsteadAnimValue
            ? [
                { translateX: arrayOfAnimatedValues.current[index].x },
                { translateY: arrayOfAnimatedValues.current[index].y },
              ]
            : []
        }
      />
    );
  });

  const renderNewBubble = (entry: Entry) => {
    if (mapUnseenAnimatedValues.current.get(entry.id) === undefined) return null;
    const [translateValue, scaleValue] = mapUnseenAnimatedValues.current.get(entry.id);
    return (
      <NewBubble
        key={entry.id}
        animatedValue={scaleValue}
        bubble={entry}
        onPress={!newBubbleAnimationInProgress ? onNewBubblePress : () => {}}
        transform={[
          { translateX: translateValue.x },
          { translateY: translateValue.y },
          { scale: scaleValue },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderTop()}
      <Wheel
        // gradientAnimatedValue (Not used right now (performance))
        gradientAnimatedValue={gradientOpacityAnim}
        timeSection={timeSection}
        onPress={wheelReadyForInteraction ? onWheelPress : () => {}}
        showGradient={detailsMode && !detailAnimationInProgress}
        morningEntries={bubbles1}
        afternoonEntries={bubbles2}
        eveningEntries={bubbles3}
      />
      {/* {renderSummary()} */}
      {renderList()}
      {notification !== null &&
        !detailsMode &&
        !detailAnimationInProgress &&
        renderBottomNotification()}
      {notification !== null &&
        notification.wheelImage !== null &&
        !currentlyDisplayedNewBubble &&
        renderCircleNotification()}
      {notification === null &&
        currentlyDisplayedNewBubble &&
        !newBubbleAnimationInProgress && (
          <View
            style={{
              height: heightContainer,
              width,
              ...styles.bottomNote,
            }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              {currentlyDisplayedNewBubble.note}
            </Text>
          </View>
        )}
      {renderBubbles}
      {state.unseenEntries.map(renderNewBubble)}
    </View>
  );
}

export default SummaryScreen;
