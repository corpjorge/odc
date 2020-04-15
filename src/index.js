import React from 'react';
import {render} from 'react-dom';
import './index.css';
//import MasterClassList from './views/masterClass/';
import Home from './pages/home';
import ErrorHandle from './components/errorHandle/errorHandle';


render(<ErrorHandle><Home/></ErrorHandle>, document.getElementById('root'));


