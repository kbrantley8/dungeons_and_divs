import React, { Component } from 'react'
import '../Style/Home.css'
import {Link} from 'react-router-dom'
import background_img from '../dnd_background.webp'
// import Database from '../Backend/Database.js'
import HomePageController from '../Controller/HomePageController.js'

class Home extends Component {

    constructor(props) {

        super(props);

        this.state={
            characters: [],
            spells: []
        }
    }

    async componentDidMount() {
        var characters = await HomePageController.getAllCharacters();
        this.setState({characters: characters});
    }

    render() {
        return (
            <div>
                <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                    <img alt="" src={background_img} style={{width: '100%'}}></img>
                    <Link to="/CreateChar"> Hello </Link>
                </div>
            </div>
        );
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}

export default Home