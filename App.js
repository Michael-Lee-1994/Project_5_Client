import React from 'react';
import NewApp from './NewApp'

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//Functions

const App = () => {
  return (
    <Provider store={store}>
      <NewApp/>
    </Provider>
  );
}

export default App;