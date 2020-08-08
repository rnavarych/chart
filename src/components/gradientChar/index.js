import React from 'react';
import {processColor, Platform, View, Text} from 'react-native';
import styles from './styles';
import {LineChart} from 'react-native-charts-wrapper';
import {MAX_Y, OFFSET} from '../../constants/charConst';
import {generateAxisValues, generateCharValues, zoom} from '../../utils/utils';
import ChartDateSwitcher from '../chartDateSwithcher';

function GradientChart(props) {
  const {data, handleSelect, onChange, setRef, charRef, dateDescription, nextDate, prevDate, page, direction} = props;

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

  const dataSwitcherContainer = React.useMemo(() => (
    <ChartDateSwitcher
      containerStyle={ styles.cardHeader }
      title={ dateDescription }
      nextDate={ nextDate }
      prevDate={ prevDate }
    />
  ), [dateDescription]);

  const chartContainer = React.useMemo(() => (
    <LineChart
      visibleRange={ {x: {min: 6, max: 6}} }
      maxVisibleValueCount={ 6 }
      marker={ marker }
      ref={ setRef }
      xAxis={ xAxis }
      yAxis={ yAxis }
      heightGradient={ {
        height: MAX_Y,
        colors: ['#f54336', '#8bc34a', '#feeb39', '#f54336'],
        positions: [0, 69, 180, 240],
      } }
      style={ styles.chart }
      data={ chartData }
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
      dragDecelerationEnabled={ false }
      dragDecelerationFrictionCoef={ 0.99 }
      legend={ {
        enabled: false,
      } }
    />
  ), [data]);

  return (
    <View style={ {
      flex: 1,
      padding: 20,
    } }>
      <View style={ styles.card }>
        <View style={ styles.cardHeaderWorkaround }/>
        <Text style={ styles.cardFooterWorkaround }>1</Text>
        {dataSwitcherContainer}
        {chartContainer}
      </View>
    </View>
  );
}

export default GradientChart;
