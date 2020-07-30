import React from 'react';
import {SafeAreaView} from 'react-native';
import ChartContainer from './containers/chartContainer';

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ChartContainer/>
    </SafeAreaView>
  );
}

export default App;
