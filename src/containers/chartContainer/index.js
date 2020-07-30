import React from 'react';
import {View, Text, Platform} from 'react-native';
import {DIRECTION_LEFT, DIRECTION_RIGHT, ERROR_COEFFICIENT, OFFSET} from '../../constants/charConst';
import styles from './styles';
import {mockValues} from '../../utils/mock';
import GradientChart from '../../components/gradientChar';
import BottomChartModal from '../../components/bottomChartModal';

function ChartContainer(props) {
  const {} = props;
  const [char, setChar] = React.useState(null);
  const [selectedX, setSelectedX] = React.useState(null);
  const [data, setData] = React.useState(mockValues);
  const [page, setPage] = React.useState(1);
  const [direction, setDirection] = React.useState('left');

  React.useEffect(() => {
    char?.moveViewToX(data.length);
  }, [char]);

  const handleSelect = React.useCallback(({nativeEvent}) => {
    if (!!nativeEvent.x) {
      setSelectedX(nativeEvent.x);
      //   // char.current.moveViewToAnimated(nativeEvent.x - OFFSET, 0, 'left', 1000);
    }
  }, [char]);

  const leftPagination = () => {
    setData([...mockValues, ...data]);
    setPage(page + 1);
    setDirection(DIRECTION_LEFT);
  };

  const rightPagination = () => {
    setData([...data, ...mockValues]);
    setPage(page + 1);
    setDirection(DIRECTION_RIGHT);
  }

  const onChange = ({nativeEvent}) => {
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
  };

  return (
    <View style={ styles.container }>
      <Text style={ {
        alignSelf: 'center',
        marginVertical: 10,
      } }>{ "" }</Text>
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
        scrollToIndex={ selectedX }
        modalHeight={ 200 }
        duration={ 500 }
        content={ data }
      />
    </View>
  );
}

export default ChartContainer;
