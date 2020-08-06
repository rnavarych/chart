import React from 'react';
import {AppRegistry, StyleSheet, Text, View, processColor} from 'react-native';

import _ from 'lodash';
import {LineChart} from 'react-native-charts-wrapper';
import {OFFSET} from '../../constants/charConst';
import {generateAxisValues} from '../../utils/utils';

class TimeSeriesLineChartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},
      legend: {
        enabled: true,
        textColor: processColor('red'),
        textSize: 12,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        custom: {
          colors: [processColor('red'), processColor('red')],
          labels: ['REFER', 'USER'],
        },
      },
      marker: {
        enabled: false,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
        markerFontSize: 14,
      },

      selectedEntry: '',
      yAxis: {left: {axisMaximum: 300}, right: {enabled: false}},
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: {
          dataSets: [
            {
              values: [
                {
                  x: 1,
                  y: 200,
                  marker:
                    'a very long long long long long long long long \nmarker at top left',
                },
                {x: 1, y: 90, marker: 'eat eat eat, never\n stop eat'},
              ],

              label: 'user',
              config: {
                lineWidth: 1,
                drawValues: true,
                circleRadius: 5,
                highlightEnabled: true,
                drawHighlightIndicators: true,
                color: processColor('red'),
                circleColors: [processColor('red'), processColor('green')],
                drawFilled: true,
                valueTextSize: 10,
                fillColor: processColor('red'),
                fillAlpha: 45,
                valueFormatter: '$###.0',
                circleColor: processColor('red'),
              },
            },
            {
              values: [
                {
                  x: 2,
                  y: 150,
                  marker:
                    'a very long long long long long long long long \nmarker at top left',
                },
                {x: 2, y: 20, marker: 'eat eat eat, never\n stop eat'},
              ],

              label: 'user',
              config: {
                lineWidth: 1,
                drawValues: true,
                circleRadius: 5,
                highlightEnabled: true,
                drawHighlightIndicators: true,
                color: processColor('red'),
                drawFilled: true,
                valueTextSize: 10,
                fillColor: processColor('red'),
                fillAlpha: 45,
                valueFormatter: '$###.0',
                circleColor: processColor('red'),
              },
            },
            {
              values: [
                {
                  x: 3,
                  y: 210,
                  marker:
                    'a very long long long long long long long long \nmarker at top left',
                },
                {x: 3, y: 200, marker: 'eat eat eat, never\n stop eat'},
              ],

              label: 'user',
              config: {
                lineWidth: 1,
                drawValues: true,
                circleRadius: 5,
                highlightEnabled: true,
                drawHighlightIndicators: true,
                color: processColor('red'),
                drawFilled: true,
                valueTextSize: 10,
                fillColor: processColor('red'),
                fillAlpha: 45,
                valueFormatter: '$###.0',
                circleColor: processColor('red'),
              },
            },
            {
              values: [
                {
                  x: 4,
                  y: 300,
                  marker:
                    'a very long long long long long long long long \nmarker at top left',
                },
                {x: 4, y: 10, marker: 'eat eat eat, never\n stop eat'},
              ],

              label: 'user',
              config: {
                lineWidth: 1,
                drawValues: true,
                circleRadius: 5,
                highlightEnabled: true,
                drawHighlightIndicators: true,
                color: processColor('red'),
                drawFilled: true,
                valueTextSize: 10,
                fillColor: processColor('red'),
                fillAlpha: 45,
                valueFormatter: '$###.0',
                circleColor: processColor('red'),
              },
            },
          ],
        },
      });
    }, 1000);
  }

  render() {
    let borderColor = processColor('red');
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            marker={this.state.marker}
            drawGridBackground={true}
            borderColor={borderColor}
            borderWidth={1}
            drawBorders={true}
            yAxis={this.state.yAxis}
            xAxis={{
              position: 'BOTTOM',
              axisMinimum: OFFSET,
              textSize: 10,
              fontWeight: 'bold',
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 2,
    backgroundColor: 'rgba(50, 177, 200, 0.2)',
  },
  chart: {
    height: 260,
    backgroundColor: 'white',
  },
});

export default TimeSeriesLineChartScreen;
