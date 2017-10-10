import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Start from './components/Start/Start';
import Question from './components/Question/Question';
import SubmitEmail from './components/SubmitEmail/SubmitEmail';
import Results from './components/Results/Results';

export default (
  <Switch>
    <Route path="/" exact component={ Start } />
    <Route path="/question/:index" component={ Question } />
    <Route path="/submit" component={ SubmitEmail } />
    <Route path="/results" component={ Results } />
  </Switch>
)