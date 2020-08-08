import React from 'react';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import { View } from 'react-native';
import * as shape from 'd3-shape';
import { Circle } from 'react-native-svg';
import log from '../../utils/log';

import styles from './styles';

const data1 = [
  [1, 50],
  [2, 55],
  [3, 40],
  [4, 95],
  [5, 64],
  [6, 85],
  [7, 91],
];
const data2 = [
  [1, 60],
  [2, 60],
  [3, 60],
  [4, 60],
  [5, 60],
  [6, 60],
  [7, 60],
];

// TODO: just a simple example chart for now
export default function Chart() {
  const verticalContentInset = { top: 10, bottom: 10 };
  const horizontalContentInset = { right: 10, left: 10 };
  const xAxisHeight = 30;
  const axesSvg = { fontSize: 10, fill: 'grey' };

  const data = [
    { data: data1, svg: { stroke: '#6666cc' } },
    { data: data2, svg: { stroke: '#cc3333' } },
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const Points = ({ x, y, data }) => {
    log.debug('POINTS:', data[0].data);
    return data[0].data.map((value, index) => (
      <Circle
        key={index}
        cx={x(value[0])}
        cy={y(value[1])}
        r={4}
        stroke={'#6666cc'}
        fill={'white'}
      />
    ));
  };

  return (
    <View style={{ height: 400, padding: 20, flexDirection: 'row' }}>
      <YAxis
        style={{ marginBottom: xAxisHeight }}
        data={data1.map((item) => item[1])}
        contentInset={verticalContentInset}
        svg={axesSvg}
        numberOfTicks={12}
        formatLabel={(value, index) => `${value} kg`}
      />
      <View style={{ flex: 1, marginLeft: 15 }}>
        <LineChart
          yAccessor={({ item }) => item[1]}
          xAccessor={({ item }) => item[0]}
          style={{ height: '100%', flex: 1 }}
          contentInset={{ ...verticalContentInset, ...horizontalContentInset }}
          data={data}
          svg={{
            stroke: 'rgb(134, 65, 244)',
            strokeWidth: 4,
            strokeLinecap: 'round',
          }}
          curve={shape.linear}>
          <Grid direction={Grid.Direction.HORIZONTAL} svg={{ fill: '#111' }} />
          <Points />
        </LineChart>
        <XAxis
          style={{ height: xAxisHeight }}
          data={data1.map((item) => item[0])}
          formatLabel={(value, index) => daysOfWeek[value]}
          contentInset={horizontalContentInset}
          svg={axesSvg}
        />
      </View>
    </View>
  );
}
