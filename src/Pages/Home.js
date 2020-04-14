import React, { Component } from 'react'
import '../Style/Home.css'
import background_img from '../dnd_background.webp'
import $ from 'jquery'
import HomePageController from '../Controller/HomePageController.js'

class Home extends Component {

    constructor(props) {

        super(props);

        this.state={
            characters: [],
            displayCharacters: [],
            spells: []
        }
    }

    async componentDidMount() {
        var tempThis = this;
        window.setTimeout(async function() {
            var characters = await HomePageController.getAllCharacters();
            var promise  = new Promise(function(resolve, reject) {
                characters.forEach(character => {
                    resolve(HomePageController.setAvatar(character))
                });
            });
            await promise.then(function(temp) {
                tempThis.setState({characters: characters});
                tempThis.setState({displayCharacters: characters});
            });
        }, 100)
    }

    render() {
        var users = this.state.displayCharacters.map((char) => (
            <div className="user" key={char.id}>
                <div className="user-outline" onClick={() => this.handleCharacterClick(char)}>
                    <div className="avatar-container">
                        <img src={char.img} alt="" className="avatar-preview"></img>
                    </div>
                    <div style={{marginTop: '8px'}}>Name: {char.name}</div>
                    <div>Race: {char.race}</div>
                    {char.class.map((c) => (
                        <div key={c.name}>
                            <span>Class: {c.name}</span>
                            <span style={{marginLeft: '10px'}}>Level: {c.level}</span>
                        </div>
                    ))}
                </div>
            </div>
        ))
        return (
            <div>
                <div>
                    <img alt="" src={background_img} style={{width: '100%', height: '450px'}}></img>
                </div>
                <div style={{width: '100%'}}>
                    <div>
                        <button onClick={() => this.changePage("/CreateChar")} id="add-new-char-btn"> Add New Character </button>
                    </div>
                    <div className="search-bar-container">
                        <input placeholder="Search..." className="search-bar" onChange={() => this.search()}></input>
                    </div>
                </div>
                <div id="list-of-users-container">
                    <div className="list-of-users-row">
                        {users}
                    </div>
                </div>
            </div>
        );
    }
    handleCharacterClick = (char) => {
        console.log(char)
    }

    search = () => {
        var text = $(".search-bar").val();
        text = text.toLowerCase();
        if (text === '') {
            this.setState({displayCharacters: this.state.characters})
        } else {
            var temp = [];
            for (var i = 0; i < this.state.characters.length; i++) {
                var char = this.state.characters[i];
                var name = char.name.toLowerCase();
                if (name.includes(text)) {
                    temp.push(char)
                }
            }
            this.setState({displayCharacters: temp})
        }
    }
    changePage = (page) => {
        this.setState({characters: []})
        this.props.history.push(page)
    }
}

export default Home