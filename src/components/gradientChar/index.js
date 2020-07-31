import React from 'react';
import {processColor, Platform, View} from 'react-native';
import styles from './styles';
import {LineChart} from 'react-native-charts-wrapper';
import {MAX_Y, OFFSET} from '../../constants/charConst';
import {generateAxisValues, generateCharValues, zoom} from '../../utils/utils';
import {mockValues} from '../../utils/mock';


function GradientChart(props) {
  const {data, handleSelect, onChange, setRef, charRef, containerStyle, page, direction} = props;

  React.useEffect(() => {
    if (!!charRef && Platform.OS === 'android') {
      charRef.setDataAndLockIndex({
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
      })
    }
  }, [data]);

  const chartData = ({
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
    drawGridLines: false,
  };

  const yAxis = {
    left: {
      enabled: false,
    },
    right: {
      enabled: true,
      drawAxisLine: false,
      labelCount: 7,
      drawGridLines: true,
      gridColor: processColor('#ddddddf3'),
      drawLimitLinesBehindData: true,
    },
  };

  const marker = {
    enabled: true,
    markerColor: processColor('white'),
    textColor: processColor('black'),
  };

  return (
    <View style={ containerStyle }>
      <LineChart
        visibleRange={ {x: {min: 6, max: 6}} }
        maxVisibleValueCount={ 6 }
        marker={ marker }
        ref={ setRef }
        xAxis={ xAxis }
        yAxis={ yAxis }
        heightGradient={ MAX_Y }
        style={ styles.chart }
        data={ Platform.OS === 'ios' ? chartData : {
          dataSets: [{
            values: generateCharValues(mockValues),
            label: '',
            config: {
              mode: 'HORIZONTAL_BEZIER',
              drawValues: false,
              drawCircles: false,
              lineWidth: 2,
            },
          }],
        } }
        touchEnabled={ true }
        dragEnabled={ true }
        scaleEnabled={ false }
        scaleXEnabled={ false }
        scaleYEnabled={ false }
        pinchZoom={ false }
        chartDescription={ {text: ''} }
        onSelect={ handleSelect }
        onChange={ onChange }
        zoom={ zoom(data, page, direction) }
        dragDecelerationEnabled={Platform.OS === 'ios'}
        dragDecelerationFrictionCoef={Platform.OS === 'ios' ? 0.9 : 0.9}
        legend={ {
          enabled: false,
        } }
      />
    </View>
  );
}

//
export default GradientChart;
