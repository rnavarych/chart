import React, { useMemo } from 'react';
import { Animated, View } from 'react-native';

import Svg, { Defs, Circle, Path, G } from 'react-native-svg';
import { TextPath, Text } from 'react-native-svg';

import NeomorphWrapper from '../../../../../components/neomorphWrapper';
import { interpolate } from '../../../../../utils/palette';

import WheelPaths from '../../constants';
import { COORD_OF_CENTER, FIELD_SIZE, OUTER_RADIUS, BACK_RADIUS } from '../../constants';
import { INNER_RADIUS_BIG, INNER_RADIUS_SMALL, TEXT_FONT } from '../../constants';

import Colors from '../../../../../configs/colors';
import { Entry } from '../../../../../interfaces/entities';
import { generatePath } from '../../utils';
import { TimeSection } from '../../../../../interfaces/entities';
import { getAngleForATimeZone } from '../../utils';

import styles from './styles';

const AnimatedG = Animated.createAnimatedComponent(G);

interface Props {
  gradientAnimatedValue: Animated.Value;
  morningEntries: Entry[];
  afternoonEntries: Entry[];
  eveningEntries: Entry[];
  showGradient: boolean;
  timeSection: TimeSection;
  onPress: () => void;
}

const RADIUS = (OUTER_RADIUS + INNER_RADIUS_BIG) / 2;
const STROKE_WIDTH = OUTER_RADIUS - INNER_RADIUS_BIG;
const greyPlaceholder = { color: Colors.wheel.activeSection };
const ANGLE_WIDTH = 2;

function Wheel(props: Props) {
  // TODO: gradientAnimatedValue not used right now because of the native fps dropped
  // Need to investigate why
  const { showGradient, onPress, timeSection, gradientAnimatedValue } = props;
  const { morningEntries, afternoonEntries, eveningEntries } = props;
  const radianAngle = getAngleForATimeZone(timeSection, true);
  const angleWidth = ANGLE_WIDTH;
  const sampling = 120 / angleWidth + (timeSection * 120) / angleWidth;
  let palette: any;

  switch (timeSection) {
    case TimeSection.MORNING: {
      palette = useMemo(() => {
        const colors = addPlaceholdersIfNeeded(morningEntries);
        return interpolate(
          colors.map((i) => i.color),
          [colors.length],
          TimeSection.MORNING,
        );
      }, [morningEntries, timeSection]);
      break;
    }
    case TimeSection.AFTERNOON: {
      palette = useMemo(() => {
        const colors1 = addPlaceholdersIfNeeded(morningEntries);
        const colors2 = addPlaceholdersIfNeeded(afternoonEntries);
        return interpolate(
          [...colors1, ...colors2].map((i) => i.color),
          [colors1.length, colors2.length],
          TimeSection.AFTERNOON,
        );
      }, [morningEntries, afternoonEntries, timeSection]);
      break;
    }
    case TimeSection.EVENING: {
      palette = useMemo(() => {
        const colors1 = addPlaceholdersIfNeeded(morningEntries);
        const colors2 = addPlaceholdersIfNeeded(afternoonEntries);
        const colors3 = addPlaceholdersIfNeeded(eveningEntries);
        return interpolate(
          [...colors1, ...colors2, ...colors3].map((i) => i.color),
          [colors1.length, colors2.length, colors3.length],
          TimeSection.EVENING,
        );
      }, [morningEntries, afternoonEntries, eveningEntries, timeSection]);
      break;
    }
    default:
      return null;
  }
  const arcs = useMemo(() => calcArcPaths(sampling, angleWidth), [sampling, angleWidth]);
  const currentTimezoneArc = generatePath(INNER_RADIUS_BIG, OUTER_RADIUS, 0, radianAngle);

  return (
    <View style={{ marginBottom: 20 }}>
      <NeomorphWrapper
        width={2 * BACK_RADIUS}
        height={2 * BACK_RADIUS}
        style={styles.backCircle}
      />
      <Svg height={FIELD_SIZE.height} width={FIELD_SIZE.width}>
        <Defs>
          <Path d={WheelPaths.text1()} id="text1" />
          <Path d={WheelPaths.text2()} id="text2" />
          <Path d={WheelPaths.text3()} id="text3" />
        </Defs>
        <G x={COORD_OF_CENTER.x} y={COORD_OF_CENTER.y}>
          <Path
            d={WheelPaths.backgroundBigCircle()}
            fill={Colors.wheel.inactiveSection}
          />
          <Path d={currentTimezoneArc()} fill={Colors.wheel.activeSection} />
          <Text
            dy={15}
            fill={Colors.wheel.sectionTitle}
            fontSize={TEXT_FONT}
            textAnchor="middle">
            <TextPath href="#text1" startOffset="25%">
              MORNING
            </TextPath>
          </Text>
          <Text
            dy={-5}
            fill={Colors.wheel.sectionTitle}
            fontSize={TEXT_FONT}
            textAnchor="middle">
            <TextPath href="#text2" startOffset="25%">
              AFTERNOON
            </TextPath>
          </Text>
          <Text
            dy={15}
            fill={Colors.wheel.sectionTitle}
            fontSize={TEXT_FONT}
            textAnchor="middle">
            <TextPath href="#text3" startOffset="25%">
              EVENING
            </TextPath>
          </Text>
          <Circle r={INNER_RADIUS_SMALL} onPress={onPress} />
          <AnimatedG
            pointerEvents="none"
            // opacity={gradientAnimatedValue}
            opacity={showGradient ? 1 : 0}>
            {arcs.map((d, index) => {
              return (
                <Path
                  key={index}
                  {...{ d }}
                  stroke={palette(index / sampling)}
                  fill="transparent"
                  strokeWidth={STROKE_WIDTH}
                />
              );
            })}
          </AnimatedG>
        </G>
      </Svg>
    </View>
  );
}

const addPlaceholdersIfNeeded = (array: any[]) => {
  let colors = [...array];
  if (colors.length === 0) {
    colors = Array(5).fill(greyPlaceholder);
  }
  if (colors.length === 1) {
    colors = [
      ...Array(2).fill(greyPlaceholder),
      colors[0],
      ...Array(2).fill(greyPlaceholder),
    ];
  }
  if (colors.length === 2) {
    colors = [
      ...Array(2).fill(greyPlaceholder),
      colors[0],
      ...Array(2).fill(greyPlaceholder),
      colors[1],
      ...Array(2).fill(greyPlaceholder),
    ];
  }
  return colors;
};

const calc = (angle: number) => {
  const radianAngle = ((90 - angle) * Math.PI) / 180;
  return {
    x: Math.cos(radianAngle) * RADIUS,
    y: Math.sin(radianAngle) * RADIUS,
  };
};

const calcArcPaths = (amount: number, angleWidth: number) => {
  const arcsArray = [];
  for (let i = 0; i < amount; i++) {
    const { x, y } = calc(i * angleWidth);
    const { x: nextX, y: nextY } = calc((i + 1) * angleWidth);
    arcsArray.push(`M${x},${-y}A${RADIUS},${RADIUS},0,0,1,${nextX},${-nextY}`);
  }
  return arcsArray;
};

export default Wheel;
