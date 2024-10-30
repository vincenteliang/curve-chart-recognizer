import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 引入 Arco Design 样式
import '@arco-design/web-react/dist/css/arco.css';

// ReactDOM.render(<App />, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
