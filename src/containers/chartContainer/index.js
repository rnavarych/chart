import React from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import {DIRECTION_LEFT, DIRECTION_RIGHT, ERROR_COEFFICIENT, OFFSET} from '../../constants/charConst';
import styles from './styles';
import {mockValues, mockValues1, mockValues2, mockValues3} from '../../utils/mock';
import GradientChart from '../../components/gradientChar';
import BottomChartModal from '../../components/bottomChartModal';

function ChartContainer(props) {
  const {} = props;
  const [char, setChar] = React.useState(null);
  const [listRef, setListRef] = React.useState(null);
  const [data, setData] = React.useState(mockValues);
  const [page, setPage] = React.useState(1);
  const [direction, setDirection] = React.useState('left');

  React.useEffect(() => {
    char?.moveViewToX(data.length);
  }, [char]);

  const handleSelect = ({nativeEvent}) => {
    if (!!nativeEvent.data && listRef?.props.data?.length > 0) {
      listRef?.scrollToIndex({animated: true, index: nativeEvent.data.x - 1 })
    }
  };


  const onChange = React.useCallback(({nativeEvent}) => {
    const leftPagination = () => {
      Math.random() > 0.5 ? setData([...mockValues2, ...data]):  setData([...mockValues3, ...data]);
      setPage(page + 1);
      setDirection(DIRECTION_LEFT);
    };

    const rightPagination = () => {
      Math.random() > 0.5 ?  setData([...data, ...mockValues2]) : setData([...data, ...mockValues3]);
      setPage(page + 1);
      setDirection(DIRECTION_RIGHT);
    };
    const {
      right, /*visible chart right X value*/
      left, /*visible chart left X value*/
    } = nativeEvent;

    if (Platform.OS === 'android') {
      if (nativeEvent.action === "chartGestureEnd") {
        if (left <= OFFSET) {
          leftPagination()
        }else if (right >= data.length + OFFSET) {
          rightPagination()
        }
      }
    } else {
      if (left >= OFFSET - ERROR_COEFFICIENT && left <= OFFSET + ERROR_COEFFICIENT) {
        leftPagination()
      } else if (right >= data.length + OFFSET - ERROR_COEFFICIENT) {
        rightPagination()
      }
    }
  }, [data, page]);

  return (
    <View style={ styles.container }>
      <View style={{width: '30%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 40}}>
        <TouchableOpacity
          style={{width: 30, height: 30, backgroundColor: '#fac', borderRadius: 30}}
          onPress={() => setData(mockValues2)}
        />
        <TouchableOpacity
          style={{width: 30, height: 30, backgroundColor: '#fd2', borderRadius: 30}}
          onPress={() => setData(mockValues3)}

        />
      </View>
      <GradientChart
        containerStyle={ styles.chartContainer }
        data={ data }
        setRef={ setChar }
        charRef={ char }
        handleSelect={ handleSelect }
        onChange={ onChange }
        page={ page }
        direction={ direction }
      />
      <BottomChartModal
        listRef={ setListRef }
        modalHeight={ 200 }
        duration={ 500 }
        content={ data }
      />
    </View>
  );
}

export default ChartContainer;
