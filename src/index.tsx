import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import render from '@microld/render';

import registerServiceWorker from './utils/registerServiceWorker';

import Root from '@/containers/Root';

@render(null, ReactDOM.render)
export class Bootstrap extends Component {
  public render(): React.ReactNode {
    return <Root />;
  }
}

registerServiceWorker();
