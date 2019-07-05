import React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './redux/store';

import MainPage from './page/main_page';
import './App.css';
import 'antd/dist/antd.css';

axios.defaults.baseURL = 'http://localhost:8000/api/v1';

const App = () => {
  return(
    <Provider store={store}>
      <MainPage />
    </Provider>
  )
}

export default App;
