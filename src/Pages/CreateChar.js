import React, { Component } from 'react'
import '../Style/CreateChar.css'
import {Link} from 'react-router-dom'
import background_img from '../dnd_background.webp'

class CreateChar extends Component {

    constructor(props) {

        super(props);

        this.state={}
    }

    render() {
        return (
            <div>
                <form>
                    <div className="background">
                        <div className="container">

                            {/* Name Class and Race Div*/}
                            <div className="form-div">

                                <div style={{height:"100%", width:"33%", float:"left", overflow:"hidden"}}>
                                    <h4>Race</h4>
                                    <input placeholder="Race"></input>      
                                </div>

                                <div style={{overflow: "hidden", marginLeft:"33%"}}>

                                    <div style={{width:"50%", float:"left", overflow:"hidden"}}>
                                        <h2>Name</h2>
                                        <input placeholder="Name"></input>

                                    </div>

                                    <div style={{overflow: "hidden", marginLeft:"50%"}}>
                                        <h4>Class</h4>
                                        <input placeholder="Class"></input>    
                                    </div>
                                </div>
                                
                                
                            </div>


                            {/* Modifiers and Skills Div*/}
                            <div className="form-div">

                                {/* 6 Main attributes and their modifiers */}
                                <div style={{width:"50%", float:"left", overflow:"auto"}}>
                                    <div>
                                        <input type="number" className="modifier-big" placeholder="Str"></input>
                                        <input type="number" className="modifier-small" placeholder="Str"></input>

                                        <input type="number" className="modifier-big" placeholder="Dex"></input>
                                        <input type="number" className="modifier-small" placeholder="Dex"></input>

                                        <input type="number" className="modifier-big" placeholder="Wis"></input>
                                        <input type="number" className="modifier-small" placeholder="Wis"></input>
                                    </div>
                                    
                                    <div>
                                        <input type="number" className="modifier-big" placeholder="Int"></input>
                                        <input type="number" className="modifier-small" placeholder="Int"></input>

                                        <input type="number" className="modifier-big" placeholder="Cha"></input>
                                        <input type="number" className="modifier-small" placeholder="Cha"></input>

                                        <input type="number" className="modifier-big" placeholder="Con"></input>    
                                        <input type="number" className="modifier-small" placeholder="Con"></input>
                                    </div>
                                    
                                </div>

                                {/* All 18 Skills */}
                                <div style={{overflow: "hidden", marginLeft:"50%"}}>

                                    <div className="skills-left">

                                        <div className="skills-label">
                                            <label>Acrobatics </label>
                                            <input className="skills-input" type="number"></input>    
                                        </div>
                                        

                                        <div className="skills-label">
                                            <label>Animal Handling </label>
                                            <input className="skills-input" type="number"></input>    
                                        </div>

                                        <div className="skills-label">
                                            <label>Arcana </label>
                                            <input className="skills-input" type="number"></input>    
                                        </div>

                                        <div className="skills-label">
                                            <label>Athletics </label>
                                            <input className="skills-input" type="number"></input>    
                                        </div>

                                        <div className="skills-label">
                                            <label>Deception </label>
                                            <input className="skills-input" type="number"></input>    
                                        </div>

                                        <div className="skills-label">
                                            <label>History </label>
                                            <input className="skills-input" type="number"></input>    
                                        </div> 
                                    </div>

                                    <div style={{marginLeft:"33%", overflow:"hidden"}}>
                                        <div className="skills-middle">

                                            <div className="skills-label">
                                                <label>Insight </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>
                                            

                                            <div className="skills-label">
                                                <label>Intimidation </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Investigation </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Medicine </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Nature </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Perception </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>   
                                        </div>
                                        
                                        <div className="skills-right">
                                            <div className="skills-label">
                                                <label>Performance </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>
                                            

                                            <div className="skills-label">
                                                <label>Persuasion </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Religion </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Sleight of Hand </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Stealth </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Survival </label>
                                                <input className="skills-input" type="number"></input>    
                                            </div>  
                                        </div>    
                                    </div>
                                    
                                    
                                </div>
                            </div>


                            {/* Basic Info Div */}
                            <div className="form-div">
                                <input className="basic-info" placeholder="Armor"></input>
                                <input className="basic-info" placeholder="Speed"></input>
                                <input className="basic-info" placeholder="Hit Points"></input>
                                <input className="basic-info" placeholder="Max HP"></input>
                                <input className="basic-info" placeholder="Initiative"></input>
                                <input className="basic-info" placeholder="Exp."></input>
                            </div>


                            {/* Misc Tracking Div */}
                            <div className="form-div">
                                <div style={{float:"left", overflow:"hidden", width: "50%"}}>
                                    <textarea placeholder="Inventory"></textarea>
                                </div>

                                <div style={{marginLeft:"50%", overflow:"hidden"}}>
                                    <div>
                                        <input placeholder="Gold"></input>
                                        <input placeholder="Spell Slots"></input>   
                                    </div>
                                    <div>
                                        <input placeholder="Saving Throws"></input>
                                        <input placeholder="Death Saves"></input>    
                                    </div>
                                </div>
                                
                            </div>
                            

                            {/* Spells, Attacks & Cantrips Div */}
                            <div className="form-div">
                                <div style={{float:"left", overflow:"hidden", width: "50%"}}>
                                    <textarea placeholder="Spells & Attacks"></textarea>
                                </div>

                                <div style={{marginLeft:"50%", overflow:"hidden"}}>
                                    <textarea placeholder="Cantrips"></textarea>
                                </div>
                            </div>


                            {/* Proficiencies & Languages Div */}
                            <div className="form-div">
                                <input placeholder="Armor"></input>
                                <input placeholder="Tools"></input>
                                <input placeholder="Weapons"></input>
                                <input placeholder="Languages"></input>
                                <input placeholder="Carrying Capacity"></input>
                                
                            </div>

                            <input type="submit"></input>
                        </div>
                        

                    </div>
                </form>
            </div>
        );
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}

export default CreateChar