import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './App';
import '@atlaskit/css-reset';
import GanttChart from './pages/schedule/ganttchart/GanttChart';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
