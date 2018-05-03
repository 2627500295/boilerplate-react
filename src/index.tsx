import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';

import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('app') as HTMLElement
);

registerServiceWorker();
