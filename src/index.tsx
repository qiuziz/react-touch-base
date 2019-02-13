import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './common/global-data';
import './index.less';
import './assets/style/iconfont.css';

// import registerServiceWorker from './registerServiceWorker';
import Router from './router';
ReactDOM.render(
	<Router />,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
