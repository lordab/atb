import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App.js';
import AccountsSummary from '../views/AccountsSummary/AccountsSummary';
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/accountsSummary" exact component={AccountsSummary} />
    </Switch>
  </BrowserRouter>
);
