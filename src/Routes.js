import React from 'react'
import { Switch, Route } from 'react-router-dom' //This is the routing dom that allows a button press to navigate the different pages
import Home from "./Pages/Home"
import CharacterCreation from "./Pages/CreateChar"

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/CreateChar' component={CharacterCreation}/>
        </Switch>
    </main>
);

export default Main