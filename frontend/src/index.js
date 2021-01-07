import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  // <React.StrictMode>
    <App /> 
    // {/* <Example width={800} height={500}/> */}
    // {/* <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize> */}
  // </React.StrictMode>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
