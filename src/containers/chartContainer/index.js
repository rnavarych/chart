import React from 'react';
import {View, Platform} from 'react-native';
import {DIRECTION_LEFT, DIRECTION_RIGHT, ERROR_COEFFICIENT, OFFSET} from '../../constants/charConst';
import styles from './styles';
import {mockBloodGlucose} from '../../utils/mock';
import GradientChart from '../../components/gradientChar';
import BottomChartModal from '../../components/bottomChartModal';
import {dataByWeek, descriptionDate} from '../../utils/utils';

/**
 * bloodGlucose - list of values (change to props.data mb)
 * */
function ChartContainer(props) {
  const {} = props;
  const [char, setChar] = React.useState(null);
  const [listRef, setListRef] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [direction, setDirection] = React.useState('left');

  const dateByWeek = React.useMemo(() => dataByWeek(mockBloodGlucose(62, 3)), [mockBloodGlucose]);
  const [rightIndex, setRightIndex] = React.useState(dateByWeek.length - 1);
  const [leftIndex, setLeftIndex] = React.useState(dateByWeek.length - 1);
  const [data, setData] = React.useState(dateByWeek[leftIndex]);
  const [dateDescription, setDateDescription] = React.useState(descriptionDate(data[0].end_time, data[5].end_time));

  const prevWeek = React.useCallback(() => {
    if (leftIndex > 0 && dateByWeek.length > leftIndex - 1) {
      let prevWeek = dateByWeek[leftIndex - 1];
      setData([...prevWeek, ...data]);
      if (prevWeek.length > 0) {
        setLeftIndex(leftIndex - 1);
        setPage(page + 1);
      }
    }
  }, [data, leftIndex, page]);

  const nextWeek = React.useCallback(() => {
    if (dateByWeek.length > rightIndex + 1) {
      let nextWeek = dateByWeek[rightIndex + 1];
      setData([...data, ...nextWeek]);
      if (nextWeek.length > 0) {
        setRightIndex(rightIndex + 1);
        setPage(page + 1);
      }
    }
  }, [data, rightIndex, page]);

  const scrollToEnd = React.useCallback(() => {
    setTimeout(() => {
      !!char && char.moveViewToX(data.length);
    }, 50);
  }, [char, data]);

  React.useEffect(() => {
    scrollToEnd()
  }, [char]);

  const handleSelect = React.useCallback(({nativeEvent}) => {
    if (!!nativeEvent.data && listRef?.props.data?.length > 0) {
      listRef?.scrollToIndex({animated: true, index: nativeEvent.data.x - 1});
    }
  }, [listRef]);

  const onChange = React.useCallback(({nativeEvent}) => {
    const leftPagination = () => {
      prevWeek();
      setDirection(DIRECTION_LEFT);
    };

    const rightPagination = () => {
      nextWeek();
      setDirection(DIRECTION_RIGHT);
    };

    const {
      right, /*visible chart right X value*/
      left, /*visible chart left X value*/
    } = nativeEvent;

    if (Platform.OS === 'android') {
      if (nativeEvent.action === 'chartGestureEnd') {
        if (left <= OFFSET) {
          leftPagination(left);
        } else if (right >= data.length + OFFSET) {
          rightPagination(right);
        }
      }
    } else {
      setDateDescription(descriptionDate(data[Math.round(left)]?.end_time, data[Math.round(right)]?.end_time))
      if (left >= OFFSET - ERROR_COEFFICIENT && left <= OFFSET + ERROR_COEFFICIENT) {
        leftPagination();
      } else if (right >= data.length + OFFSET - ERROR_COEFFICIENT) {
        rightPagination();
      }
    }
  }, [data, page, rightIndex, leftIndex]);

  const errorScroll = React.useCallback((error) => {
    listRef?.scrollToIndex({animated: true, index: error.highestMeasuredFrameIndex});
    listRef?.scrollToIndex({animated: true, index: error.index - 1});
  }, [listRef]);

  const showNextPage = React.useCallback(() => {
    let date = dateByWeek[rightIndex + 1];
    setData(dateByWeek[rightIndex + 1]);
    setLeftIndex(leftIndex + 1);
    setRightIndex(rightIndex + 1);
    setDateDescription(descriptionDate(date[0].end_time, date[date.length - 1].end_time));
    scrollToEnd();
  }, [rightIndex, leftIndex, data, char]);

  const showPrevPage = React.useCallback(() => {
    let date = dateByWeek[leftIndex - 1];
    setData(dateByWeek[leftIndex - 1]);
    setLeftIndex(leftIndex - 1);
    setRightIndex(rightIndex - 1);
    setDateDescription(descriptionDate(date[0].end_time, date[date.length - 1].end_time));
    scrollToEnd();
  }, [rightIndex, leftIndex, data, char]);

  return (
    <View style={ styles.container }>
        <GradientChart
          dateDescription={ dateDescription }
          nextDate={ dateByWeek.length > rightIndex + 1 ? showNextPage : null }
          prevDate={ leftIndex - 1 > 0 ? showPrevPage : null }
          data={ data }
          setRef={ setChar }
          charRef={ char }
          handleSelect={ handleSelect }
          onChange={ onChange }
          page={ page }
          direction={ direction }
        />
        <BottomChartModal
          errorScroll={ errorScroll }
          listRef={ setListRef }
          modalHeight={ 200 }
          duration={ 500 }
          content={ data }
        />


    </View>
  );
}

export default ChartContainer;
