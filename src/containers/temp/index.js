import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Platform,
} from 'react-native';

import _ from 'lodash';
import {LineChart} from 'react-native-charts-wrapper';
import {OFFSET} from '../../constants/charConst';
import {generateAxisValues} from '../../utils/utils';
import {mockBloodPressure} from '../../utils/mock';

const getDataItemConfig = (colors) => {
  return {
    lineWidth: 2,
    drawValues: false,
    circleRadius: Platform.OS === 'ios' ? 6 : 5,
    highlightEnabled: true,
    drawHighlightIndicators: true,
    color: processColor(colors[1]),
    circleColors: [processColor(colors[0]), processColor(colors[1])],
  };
};

class TimeSeriesLineChartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const data = mockBloodPressure(2, 4);
      let inc = 0;

      const res = data.map((item) => ({
        values: [
          {x: ++inc, y: item.value[0]},
          {x: inc, y: item.value[1]},
        ],
        label: '',
        config: getDataItemConfig(item.colors),
      }));

      res.push({
        values: [{x: inc + 0.5, y: 40}],
        label: '',
        config: getDataItemConfig(['transparent', 'transparent']),
      });

      this.setState({
        data: {
          dataSets: res,
        },
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
            marker={{enabled: false}}
            chartDescription={{text: ''}}
            yAxis={{
              left: {
                enabled: false,
                drawAxisLines: false,
                drawGridLines: false,
              },
              right: {
                axisMaximum: 200,
                axisMinimum: 50,
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
              axisMinimum: 0.5,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'violet',
  },
  card: {
    height: 360,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  cardHeader: {
    height: 40,
    width: '100%',
    backgroundColor: '#f4f5f8',
  },
  cardHeaderWorkaround: {
    position: 'absolute',
    width: '100%',
    height: 10,
    backgroundColor: '#f4f5f8',
    top: 40,
  },
  cardFooterWorkaround: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    fontSize: 10,
    color: '#f4f5f8',
    backgroundColor: '#f4f5f8',
    paddingTop: Platform.OS === 'ios' ? 4 : 1,
    paddingBottom: 20,
  },
  chart: {
    height: 300,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 10,
    color: '#8093b0',
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 4,
    right: 50,
  },
});

export default TimeSeriesLineChartScreen;
