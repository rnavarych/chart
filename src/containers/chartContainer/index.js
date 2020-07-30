import React from 'react';
import {View, Text} from 'react-native';
import {DIRECTION_LEFT, DIRECTION_RIGHT, OFFSET} from '../../constants/charConst';
import styles from './styles';
import {mockValues, mockValues2} from '../../utils/mock';
import GradientChart from '../../components/gradientChar';
import BottomChartModal from '../../components/bottomChartModal';

function ChartContainer(props) {
  const {} = props;
  const [char, setChar] = React.useState(null);
  const [dateRange, setDateRange] = React.useState('');
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

  const onChange = ({nativeEvent}) => {
    const {
      right, /*visible chart right X value*/
      left, /*visible chart left X value*/
    } = nativeEvent;
    if (left >= OFFSET-0.2 && left <= OFFSET+0.2) {
      setData([...mockValues2, ...data]);
      setPage(page + 1);
      setDirection(DIRECTION_LEFT);
    } else if (right <= data.length && right >= data.length) {
      setData([...data, ...mockValues2]);
      setPage(page + 1);
      setDirection(DIRECTION_RIGHT);
    }
  };

  return (
    <View style={ styles.container }>
      <Text style={ {
        alignSelf: 'center',
        marginVertical: 10,
      } }>{ dateRange }</Text>
      <GradientChart
        containerStyle={ styles.chartContainer }
        data={ data }
        charRef={ setChar }
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
