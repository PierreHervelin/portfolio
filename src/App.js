import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/test" component={Test}/>
        </Switch>
    );
};

export default App;
