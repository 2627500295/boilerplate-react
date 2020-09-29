import React from 'react';
import {render} from 'react-dom';

import registerServiceWorker from './utils/registerServiceWorker';

import Root from '@/containers/Root';

render(<Root />, document.querySelector("#app"));

registerServiceWorker();
