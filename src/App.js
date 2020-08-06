import React from 'react';
import {SafeAreaView} from 'react-native';

import DataHistoryScreen from './containers/dataHistory';

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <DataHistoryScreen />
    </SafeAreaView>
  );
}

export default App;
