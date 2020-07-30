import React from 'react';
import {processColor, Text, View} from 'react-native';
import styles from './styles';
import {LineChart} from 'react-native-charts-wrapper';
import {MAX_Y, MIN_Y, OFFSET} from '../../constants/charConst';
import {generateAxisValues, generateCharValues, zoom} from '../../utils/utils';


function GradientChart(props) {
  const {data, handleSelect, onChange, charRef, containerStyle, page, direction} = props;

  const chartData =  ({
    dataSets: [{
      values: generateCharValues(data),
      label: '',
      config: {
        mode: 'HORIZONTAL_BEZIER',
        drawValues: false,
        drawCircles: false,
        lineWidth: 2,
      },
    }],
  });

  const xAxis = {
    position: 'BOTTOM',
    axisMinimum: OFFSET,
    axisMaximum: data.length + OFFSET,
    textColor: processColor('#8093b0'),
    textSize: 10,
    fontWeight: 'bold',
    valueFormatter: generateAxisValues(data, true),
  };

  const yAxis = {
    left: {
      enabled: false
    },
    right: {
      drawAxisLine: false,
      axisMinimum: MIN_Y,
      axisMaximum: MAX_Y,
      labelCount: 7,
      labelCountForce: true,
      granularityEnabled: true,
      granularity: 1,
    },
  };

  const marker = {
    enabled: true,
    markerColor: processColor("white"),
    textColor: processColor("black")
  }

  return (
    <View style={ containerStyle }>
      <LineChart
        maxVisibleValueCount={6}
        marker={ marker }
        ref={ charRef }
        xAxis={ xAxis }
        yAxis={ yAxis }
        heightGradient={ MAX_Y }
        style={ styles.chart }
        data={ chartData }
        touchEnabled={ true }
        dragEnabled={ true }
        scaleEnabled={ false }
        scaleXEnabled={ false }
        scaleYEnabled={ false }
        pinchZoom={ false }
        chartDescription={ {text: ''} }
        zoom={ zoom(data, page, direction) }
        onSelect={ handleSelect }
        onChange={ onChange }
        legend={ {
          enabled: false,
        } }
      />
    </View>
  );
}

export default GradientChart;
