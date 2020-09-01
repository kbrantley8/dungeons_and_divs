import React from 'react'
import { Switch, Route } from 'react-router-dom' //This is the routing dom that allows a button press to navigate the different pages
import WelcomeScreen from "./Pages/WelcomeScreen"
import CharacterCreation from "./Pages/CreateChar"
import RegisterScreen from "./Pages/RegisterScreen"
import UserHomeScreen from "./Pages/UserHomeScreen"
import UserProfileScreen from "./Pages/UserProfileScreen"
import EditProfileScreen from "./Pages/EditProfileScreen"
import CreateCharacterSheet from "./Pages/CreateCharacterSheet"
import EditCharacterSheet from "./Pages/EditCharacterSheet"
import PartyScreen from "./Pages/PartyScreen"
import HomeDM from "./Pages/HomeDM"

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={WelcomeScreen}/>
            <Route path='/CreateChar' component={CharacterCreation}/>
            <Route path='/register' component={RegisterScreen}/>
            <Route path='/home' component={UserHomeScreen}/>
            <Route path='/profilePage' component={UserProfileScreen}/>
            <Route path='/editProfile' component={EditProfileScreen}/>
            <Route path='/createCharacterSheet' component={CreateCharacterSheet}/>
            <Route path='/editCharacterSheet' component={EditCharacterSheet}/>
            <Route path='/party' component={PartyScreen}/>
            <Route path='/home-dm' component={HomeDM}/>
        </Switch>
    </main>
);

export default Main