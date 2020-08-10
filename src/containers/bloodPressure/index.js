import React from 'react';
import {
  Text,
  View,
  processColor,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {LineChart} from 'react-native-charts-wrapper';

import {
  CHART_INTERVALS,
  CHART_BLOOD_PRESSURE_MIN_Y,
  CHART_BLOOD_PRESSURE_MAX_Y,
  DAYS_NUMBER_FOR_INTERVAL,
} from '../../constants';

import * as configs from './config';

import {fetchBloodPressureDataForDays} from '../../utils/mock';
import {fillDaysDataWithBearingItemsAndSort, sameDate} from '../../utils/utils';

import styles from './styles';

const getDataItemConfig = (isBearing, color, colors) => ({
  lineWidth: 2,
  drawValues: false,
  circleRadius: Platform.OS === 'ios' ? 6 : 5,
  highlightEnabled: true,
  drawHighlightIndicators: true,
  color: processColor(color),
  circleColors: [processColor(colors[0]), processColor(colors[1])],
  mode: 'HORIZONTAL_BEZIER',
  circleHoleColor: isBearing
    ? processColor('transparent')
    : processColor('white'),
  highlightColor: isBearing ? processColor('transparent') : undefined,
});

class BloodPressureFragment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: '',
      zero: 0,
      data: {},
      left: null,
      right: null,
    };

    this.onChartViewChange = this.onChartViewChange.bind(this);
    this.handleLeftPress = this.handleLeftPress.bind(this);
    this.handleRightPress = this.handleRightPress.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      fetchBloodPressureDataForDays(DAYS_NUMBER_FOR_INTERVAL.DAY).then(
        (data) => {
          const sorted = fillDaysDataWithBearingItemsAndSort(
            data,
            DAYS_NUMBER_FOR_INTERVAL.DAY,
          );

          const res = sorted.map((item) => ({
            values: [
              {
                x: item.index,
                y: item.value[0],
                marker: item.bearing ? '' : undefined,
              },
              {
                x: item.index,
                y: item.value[1],
                marker: item.bearing ? '' : undefined,
              },
            ],
            label: '',
            config: getDataItemConfig(item.bearing, item.color, item.colors),
          }));

          const formatter = sorted.map((item) => item.label);

          this.setState(
            {
              data: {
                dataSets: res,
              },
              interval: 'Today',
              zero: sorted[0].time,
              right: null,
              left: 1440 * (DAYS_NUMBER_FOR_INTERVAL.DAY - 2),
              // formatter,
            },
            () => {
              setTimeout(() => {
                this.chartRef.moveViewToX(
                  1440 * (DAYS_NUMBER_FOR_INTERVAL.DAY - 1),
                );
              }, 0);
            },
          );
        },
      );
    }, 1000);
  }

  onChartViewChange(event) {
    if (
      event &&
      event.nativeEvent &&
      event.nativeEvent.left !== undefined &&
      event.nativeEvent.right !== undefined
    ) {
      const now = new Date();
      let left = new Date(
        this.state.zero + Math.floor(event.nativeEvent.left + 10) * 60 * 1000,
      );
      let right = new Date(
        this.state.zero + Math.floor(event.nativeEvent.right - 10) * 60 * 1000,
      );

      left = sameDate(now, left)
        ? 'Today'
        : `${left.getDate()}.${left.getMonth() + 1}`;
      right = sameDate(now, right)
        ? 'Today'
        : `${right.getDate()}.${right.getMonth() + 1}`;

      const result = left === right ? `${left}` : `${left} - ${right}`;
      if (result !== this.state.interval) {
        this.setState({interval: result}); // todo add setting new left right values
      }
    }
  }

  handleLeftPress() {
    if (this.state.left !== null && this.chartRef) {
      this.chartRef.moveViewToX(this.state.left);
    }
  }

  handleRightPress() {
    if (this.state.right !== null && this.chartRef) {
      this.chartRef.moveViewToX(this.state.right);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <TouchableOpacity
              style={[
                styles.arrow,
                this.state.left === null ? styles.opacity : null,
              ]}
              onPress={this.handleLeftPress}
              disabled={this.state.left === null}
            />
            <Text>{this.state.interval}</Text>
            <TouchableOpacity
              style={[
                styles.arrow,
                this.state.right === null ? styles.opacity : null,
              ]}
              onPress={this.handleRightPress}
              disabled={this.state.right === null}
            />
          </View>
          <View style={styles.cardHeaderWorkaround} />
          <Text style={styles.cardFooterWorkaround}>{'1\nA'}</Text>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            scaleEnabled={false}
            scaleXEnabled={false}
            scaleYEnabled={false}
            pinchZoom={false}
            visibleRange={configs.visibleRangeConfig}
            legend={configs.legengConfig}
            marker={configs.markerConfig}
            chartDescription={configs.chartDescription}
            yAxis={configs.yAxisConfig}
            xAxis={{
              ...configs.xAxisConfig,
              valueFormatter: this.state.formatter,
            }}
            ref={(ref) => {
              this.chartRef = ref;
            }}
            onChange={this.onChartViewChange}
          />
        </View>
      </View>
    );
  }
}

export default BloodPressureFragment;
