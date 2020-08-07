import React from 'react';
import {Text, View, processColor, Platform} from 'react-native';

import {LineChart} from 'react-native-charts-wrapper';

import {
  CHART_INTERVALS,
  CHART_BLOOD_PRESSURE_MIN_Y,
  CHART_BLOOD_PRESSURE_MAX_Y,
} from '../../constants';

import {fetchBloodPressureDataForDays} from '../../utils/mock';
import {sortBloodPressureData} from '../../utils/utils';

import styles from './styles';

const getDataItemConfig = (color, colors) => ({
  lineWidth: 2,
  drawValues: false,
  circleRadius: Platform.OS === 'ios' ? 6 : 5,
  highlightEnabled: true,
  drawHighlightIndicators: true,
  color: processColor(color),
  circleColors: [processColor(colors[0]), processColor(colors[1])],
});

class BloodPressureFragment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    setTimeout(() => {
      fetchBloodPressureDataForDays().then((data) => {
        const sorted = sortBloodPressureData(data);

        let inc = 0;

        const res = sorted.map((item) => ({
          values: [
            {x: ++inc, y: item.value[0]},
            {x: inc, y: item.value[1]},
          ],
          label: '',
          config: getDataItemConfig(item.color, item.colors),
        }));

        res.push({
          values: [{x: ++inc, y: 40}],
          label: '',
          config: getDataItemConfig('transparent', [
            'transparent',
            'transparent',
          ]),
        });

        this.setState({
          data: {
            dataSets: res,
          },
        });
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader} />
          <View style={styles.cardHeaderWorkaround} />
          <Text style={styles.cardFooterWorkaround}>1</Text>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            legend={{enabled: false}}
            marker={{
              enabled: true,
              markerColor: processColor('#f4f5f8'),
              textColor: processColor('#8093b0'),
            }}
            chartDescription={{text: ''}}
            yAxis={{
              left: {
                enabled: false,
              },
              right: {
                axisMaximum: CHART_BLOOD_PRESSURE_MAX_Y,
                axisMinimum: CHART_BLOOD_PRESSURE_MIN_Y,
                drawAxisLine: false,
                drawAxisLines: false,
                labelCount: 7,
                gridColor: processColor('rgba(128, 147, 176, 0.2)'),
                textSize: 10,
                textColor: processColor('#8093b0'),
              },
            }}
            xAxis={{
              position: 'BOTTOM',
              textSize: 10,
              textColor: processColor('#8093b0'),
              gridColor: processColor('transparent'),
            }}
          />
        </View>
      </View>
    );
  }
}

export default BloodPressureFragment;
