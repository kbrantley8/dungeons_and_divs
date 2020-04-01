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
            <div style={{backgroundImage: 'URL(https://i.pinimg.com/originals/be/22/94/be2294d961358cf8ae34fa78353534af.jpg)'}}>
                <div>
                    <img alt="" src={background_img} style={{width: '100%', height: '450px'}}></img>
                </div>
                <div>
                    <div class="search-bar-container">
                        <input placeholder="Search..." class="search-bar"></input>
                    </div>
                    <div>
                        <button onClick={() => this.changePage("/CreateChar")} id="add-new-char-btn"> Add New Character </button>
                    </div>
                </div>
                
            </div>
        );
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}

export default Home