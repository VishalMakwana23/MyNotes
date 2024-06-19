import React from 'react';
import {Provider} from 'react-redux';
import NotesScreen from './src/components/NotesScreen';
import store from './src/redux/store';
import {SafeAreaView} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <NotesScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
