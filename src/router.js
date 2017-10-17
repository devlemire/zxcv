import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Start from './components/Start/Start';
import Question from './components/Question/Question';
import Submit from './components/Submit/Submit';
import Results from './components/Results/Results';
import Download from './components/Download/Download';

export default (
  <Switch>
    <Route path="/" exact component={ Start } />
    <Route path="/question/:index" component={ Question } />
    <Route path="/submit" component={ Submit } />
    <Route path="/results" component={ Results } />
    <Route path="/admin" component={ Download } />
  </Switch>
)