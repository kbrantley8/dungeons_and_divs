import React, { Component } from 'react'
import '../Style/Home.css'
import background_img from '../dnd_background.webp'

class Home extends Component {

    constructor(props) {

        super(props);

        this.state={}
    }

    render() {
        return (
            <div>
                <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                    <img alt="" src={background_img} style={{width: '100%'}}></img>
                </div>
            </div>
        );
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}

export default Home