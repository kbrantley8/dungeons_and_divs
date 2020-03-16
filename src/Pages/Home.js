import React, { Component } from 'react'
import '../Style/Home.css'
import {Link} from 'react-router-dom'
import background_img from '../dnd_background.webp'
import Database from '../Backend/Database.js'

class Home extends Component {

    constructor(props) {

        super(props);

        this.state={
            characters: [],
            spells: []
        }
    }

    async componentDidMount() {
        var characters = Database.getCharacterInformation();
        var spells = Database.getListOfSpells();
        var tempThis = this;
        window.setTimeout(function () {
            // characters.forEach((character) => {
            //     console.log(character)
            // })
            // spells.forEach((spell) => {
            //     console.log(spell)
            // })
            tempThis.setState({characters: characters, spells: spells})
        }, 1000)
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