import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import App from '@/components/App';

@hot(module)
export default class Root extends Component {
  public render(): React.ReactNode {
    return (
      <App />
    );
  }
}
