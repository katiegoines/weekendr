import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import 'milligram'
// import 'uikit'
// import 'bulma'
// import 'foundation'
// import 'bootstrap'
import './index.css';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
// registerServiceWorker();
