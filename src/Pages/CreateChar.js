import React, { Component } from 'react'
import '../Style/CreateChar.css'
import {Link} from 'react-router-dom'
import background_img from '../dnd_background.webp'
import $ from 'jquery'

class CreateChar extends Component {

    constructor(props) {

        super(props);

        this.state={}
    }

    render() {
        const classNum = 1;
        return (
            <div>
                <form action="/action_page.php">
                    <div className="background">
                        <div className="container">

                            {/* Name Class and Race Div*/}
                            <div className="form-div">

                                <div style={{height:"100%", width:"33%", float:"left", overflow:"hidden"}}>
                                    <h4>Race</h4>
                                    <input name="race" id="race" placeholder="Race"></input>      
                                </div>

                                <div style={{overflow: "hidden", marginLeft:"33%"}}>

                                    <div style={{width:"50%", float:"left", overflow:"hidden"}}>
                                        <h2>Name</h2>
                                        <input name="name" id="name" placeholder="Name"></input>

                                    </div>

                                    <div id="classDiv"style={{overflow: "hidden", marginLeft:"50%"}}>
                                        <div style={{marginTop: 21}}>
                                            <h4 style={{margin: "0", float: "left", width: "50%", overflow: "hidden", textAlign:"right"}}>Class</h4>
                                            <div style={{marginLeft: "52%", overflow:"hidden", textAlign:"left"}}>
                                                <button type="button" onClick={() => this.addClass(classNum)}>+</button>
                                                <button type="button" onClick={() => this.removeClass(classNum)}>-</button>        
                                            </div>
                                        </div>
                                        
                                        <input name="class" id="class" placeholder="Class"></input>
                                        <input name="class-1-level" id="level" placeholder="Lvl" style={{width:"2vw"}}></input>
                                    </div>
                                </div>
                                
                                
                            </div>


                            {/* Modifiers and Skills Div*/}
                            <div className="form-div">

                                {/* 6 Main attributes and their modifiers */}
                                <div style={{width:"50%", float:"left", overflow:"auto"}}>
                                    <div>
                                        <input name="modifier-big-str" id="modifier-big" type="number" className="modifier-big" placeholder="Str"></input>
                                        <input name="modifier-small-str" id="modifier-small" type="number" className="modifier-small" placeholder="Str"></input>

                                        <input name="modifier-big-dex" id="modifier-big" type="number" className="modifier-big" placeholder="Dex"></input>
                                        <input name="modifier-small-dex" id="modifier-small" type="number" className="modifier-small" placeholder="Dex"></input>

                                        <input name="modifier-big-wis"id="modifier-big" type= "number" className="modifier-big" placeholder="Wis"></input>
                                        <input name="modifier-small-wis" id="modifier-small" type="number" className="modifier-small" placeholder="Wis"></input>
                                    </div>
                                    
                                    <div>
                                        <input name="modifier-big-int" id="modifier-big" type="number" className="modifier-big" placeholder="Int"></input>
                                        <input name="modifier-small-int" id="modifier-small" type="number" className="modifier-small" placeholder="Int"></input>

                                        <input name="modifier-big-cha" id="modifier-big" type="number" className="modifier-big" placeholder="Cha"></input>
                                        <input name="modifier-small-cha" id="modifier-small" type="number" className="modifier-small" placeholder="Cha"></input>

                                        <input name="modifier-big-con" id="modifier-big" type="number" className="modifier-big" placeholder="Con"></input>    
                                        <input name="modifier-small-con" id="modifier-small" type="number" className="modifier-small" placeholder="Con"></input>
                                    </div>
                                    
                                </div>

                                {/* All 18 Skills */}
                                <div style={{overflow: "hidden", marginLeft:"50%"}}>

                                    <div className="skills-left">

                                        <div className="skills-label">
                                            <label>Acrobatics </label>
                                            <input name="acrobatics" className="skills-input" type="number"></input>    
                                        </div>
                                        

                                        <div className="skills-label">
                                            <label>Animal Handling </label>
                                            <input name="animal-handling" className="skills-input" type="number"></input>    
                                        </div>

                                        <div className="skills-label">
                                            <label>Arcana </label>
                                            <input name="arcana" className="skills-input" type="number"></input>    
                                        </div>

                                        <div className="skills-label">
                                            <label>Athletics </label>
                                            <input name="athletics" className="skills-input" type="number"></input>    
                                        </div>

                                        <div className="skills-label">
                                            <label>Deception </label>
                                            <input name="deception" className="skills-input" type="number"></input>    
                                        </div>

                                        <div className="skills-label">
                                            <label>History </label>
                                            <input name="history" className="skills-input" type="number"></input>    
                                        </div> 
                                    </div>

                                    <div style={{marginLeft:"33%", overflow:"hidden"}}>
                                        <div className="skills-middle">

                                            <div className="skills-label">
                                                <label>Insight </label>
                                                <input name="insight" className="skills-input" type="number"></input>    
                                            </div>
                                            

                                            <div className="skills-label">
                                                <label>Intimidation </label>
                                                <input name="intimidation" className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Investigation </label>
                                                <input name="investigation" className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Medicine </label>
                                                <input name="medicine" className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Nature </label>
                                                <input name="nature" className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Perception </label>
                                                <input name="perception" className="skills-input" type="number"></input>    
                                            </div>   
                                        </div>
                                        
                                        <div className="skills-right">
                                            <div className="skills-label">
                                                <label>Performance </label>
                                                <input name="performance" className="skills-input" type="number"></input>    
                                            </div>
                                            

                                            <div className="skills-label">
                                                <label>Persuasion </label>
                                                <input name="persuasion" className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Religion </label>
                                                <input name="religion" className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Sleight of Hand </label>
                                                <input name="sleight-of-hand" className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Stealth </label>
                                                <input name="stealth" className="skills-input" type="number"></input>    
                                            </div>

                                            <div className="skills-label">
                                                <label>Survival </label>
                                                <input name="survival" className="skills-input" type="number"></input>    
                                            </div>  
                                        </div>    
                                    </div>
                                    
                                    
                                </div>
                            </div>


                            {/* Basic Info Div */}
                            <div className="form-div">
                                <input name="armor" className="basic-info" placeholder="Armor"></input>
                                <input name="speed" className="basic-info" placeholder="Speed"></input>
                                <input name="hit-dice" className="basic-info" placeholder="Hit Dice"></input>
                                <input name="hit-points" className="basic-info" placeholder="Hit Points"></input>
                                <input name="max-hp" className="basic-info" placeholder="Max HP"></input>
                                <input name="initiative" className="basic-info" placeholder="Initiative"></input>
                                <input name="exp" className="basic-info" placeholder="Exp."></input>
                            </div>


                            {/* Misc Tracking Div */}
                            {/* <div className="form-div">
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
                                
                            </div> */}
                            

                            {/* Spells, Attacks & Cantrips Div */}
                            {/* <div className="form-div">
                                <div style={{float:"left", overflow:"hidden", width: "50%"}}>
                                    <textarea placeholder="Spells & Attacks"></textarea>
                                </div>

                                <div style={{marginLeft:"50%", overflow:"hidden"}}>
                                    <textarea placeholder="Cantrips"></textarea>
                                </div>
                            </div> */}


                            {/* Proficiencies & Languages Div */}
                            {/* <div className="form-div">
                                <input placeholder="Armor"></input>
                                <input placeholder="Tools"></input>
                                <input placeholder="Weapons"></input>
                                <input placeholder="Languages"></input>
                                <input placeholder="Carrying Capacity"></input>
                                
                            </div> */}

                            <input type="submit" value="Submit"></input>
                        </div>
                        

                    </div>
                </form>
            </div>
        );
    }

    addClass = (classNum) => {
        var dummy = 
        '<div name="multiclass" id="multiClass"><input type="text" placeholder=Class></input><input name="level" id="level" placeholder="Lvl" style={{width:"2vw"}}></input></div>\r\n';
        $('#classDiv').append(dummy)
        classNum += 1;
    }

    removeClass = (classNum) => {
        $('#multiClass').remove()
        classNum -= 1;
    }
    changePage = (page) => {
        this.props.history.push(page)
    }
}

export default CreateChar