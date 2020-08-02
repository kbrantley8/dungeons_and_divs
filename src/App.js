import React, { Component } from 'react'
import Routes from './Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider as AppProvider } from "./context/appContext";

class App extends Component {
    render() {return (
        <AppProvider>
            <div>
                <Routes/>
            </div>
        </AppProvider>
    )}
}

export default App;