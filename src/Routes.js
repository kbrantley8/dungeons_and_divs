import React from 'react'
import { Switch, Route } from 'react-router-dom' //This is the routing dom that allows a button press to navigate the different pages
import Home from "./Pages/Home"

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>  
        </Switch>
    </main>
);

export default Main