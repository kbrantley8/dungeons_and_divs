import React, { Component } from 'react'
import '../Style/CreateChar.css'
import CreateCharController from '../Controller/CreateCharController.js'
import background_img from '../dnd_background.webp'
import $ from 'jquery'

class CreateChar extends Component {

    constructor(props) {

        super(props);

        this.state={
            classNum: 1,
            image: background_img,
            imageName: 'dnd_avatar.webp',
            race: ''
        }
    }

    async componentDidMount() {
        var parentThis = this;
        $("#edit-avatar-input").on('change', function() {
            var image = this.files[0];
            var imageName = image.name;
            parentThis.setState({image: image, imageName: imageName})
            $(".avatar-preview").attr('src', (URL.createObjectURL(image)))
        })
    }

    render() {
        return (
            <div>
                <div className="growl-modal">
                    <div className="growl-content">
                        <span id="growl-message"></span>
                    </div>
                </div>
                <form>
                    <div className="background">
                        <div className="container">

                            {/* Name Class and Race Div*/}
                            <div className="form-div">
                                <div className="avatar-container">
                                    <img src={background_img} alt="" className="avatar-preview"></img>
                                    <input id="edit-avatar-input" type="file" style={{display: 'none'}}></input>
                                    <button id="edit-avatar" type="button" onClick={() => this.handleEditAvatar()}>Edit Avatar</button>
                                </div>
                                <div>
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
                                                    <button type="button" onClick={() => this.addClass()}>+</button>
                                                    <button type="button" onClick={() => this.removeClass()}>-</button>        
                                                </div>
                                            </div>
                                            
                                            <input name="class" id="class0" placeholder="Class"></input>
                                            <input name="class-1-level" id="level0" type="number" placeholder="Lvl" style={{width:"2vw"}}></input>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                
                            </div>


                            {/* Modifiers and Skills Div*/}
                            <div className="form-div">

                                {/* 6 Main attributes and their modifiers */}
                                <div id="main-attr-container" style={{width:"50%", float:"left", overflow:"auto"}}>
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
                                <div id="skills-container" style={{overflow: "hidden", marginLeft:"50%"}}>

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
                                <input name="armor" className="basic-info" placeholder="Armor" type="number"></input>
                                <input name="speed" className="basic-info" placeholder="Speed" type="number"></input>
                                <input name="hit-dice" className="basic-info" placeholder="Hit Dice" type="number"></input>
                                <input name="hit-points" className="basic-info" placeholder="Hit Points" type="number"></input>
                                <input name="max-hp" className="basic-info" placeholder="Max HP" type="number"></input>
                                <input name="initiative" className="basic-info" placeholder="Initiative" type="number"></input>
                                <input name="exp" className="basic-info" placeholder="Exp." type="number"></input>
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

                            {/* <input type="submit" value="Submit"></input> */}
                            <button id="back-btn" type="button" onClick={() => this.changePage('/')}>Back</button>
                            <button id="submit-btn" type="button" onClick={() => this.handleSubmit()}>Submit</button>
                        </div>
                        <button type="button" onClick={() => this.genRandomChar()}>Generate Random Character</button>
                    </div>
                </form>
            </div>
        );
    }

    handleSubmit = async () => {
        var classes = [];
        for (var i = 0; i < this.state.classNum; i++) {
            var elClass = $("#class" + i);
            var elLevel = $("#level" + i);
            classes.push({'name': elClass.val(), 'level': parseInt(elLevel.val())})
        }
        var userName = $("#name").val();
        var check = this.checkForEmptyInputs();
        if (check) {
            var data = {
                imageSrc: 'avatars/' + $("#name").val().split(' ').join('_') + '/' + this.state.imageName,
                name: $("#name").val(),
                race: $("#race").val(),
                class: classes,
                experience_points: parseInt($("input[name='exp']").val()),
                abilities: {
                    'strength': {
                        'modifier': parseInt($("input[name='modifier-big-str']").val()),
                        'score': parseInt($("input[name='modifier-small-str']").val())
                    },
                    'dexterity': {
                        'modifier': parseInt($("input[name='modifier-big-dex']").val()),
                        'score': parseInt($("input[name='modifier-small-dex']").val())
                    },
                    'constitution': {
                        'modifier': parseInt($("input[name='modifier-big-con']").val()),
                        'score': parseInt($("input[name='modifier-small-con']").val())
                    },
                    'intelligence': {
                        'modifier': parseInt($("input[name='modifier-big-int']").val()),
                        'score': parseInt($("input[name='modifier-small-int']").val())
                    },
                    'wisdom': {
                        'modifier': parseInt($("input[name='modifier-big-wis']").val()),
                        'score': parseInt($("input[name='modifier-small-wis']").val())
                    },
                    'charisma': {
                        'modifier': parseInt($("input[name='modifier-big-cha']").val()),
                        'score': parseInt($("input[name='modifier-small-cha']").val())
                    }
                },
                skills: {
                    'acrobatics': parseInt($("input[name='acrobatics']").val()),
                    'animal_handling': parseInt($("input[name='animal-handling']").val()),
                    'arcana': parseInt($("input[name='arcana']").val()),
                    'athletics': parseInt($("input[name='athletics']").val()),
                    'deception': parseInt($("input[name='deception']").val()),
                    'history': parseInt($("input[name='history']").val()),
                    'insight': parseInt($("input[name='insight']").val()),
                    'intimidation': parseInt($("input[name='intimidation']").val()),
                    'investigation': parseInt($("input[name='investigation']").val()),
                    'medicine': parseInt($("input[name='medicine']").val()),
                    'nature': parseInt($("input[name='nature']").val()),
                    'perception': parseInt($("input[name='perception']").val()),
                    'performance': parseInt($("input[name='performance']").val()),
                    'persuasion': parseInt($("input[name='persuasion']").val()),
                    'religion': parseInt($("input[name='religion']").val()),
                    'sleight_of_hand': parseInt($("input[name='sleight-of-hand']").val()),
                    'stealth': parseInt($("input[name='stealth']").val()),
                    'survival': parseInt($("input[name='survival']").val()),
                },
                armor_rating: parseInt($("input[name='armor']").val()),
                speed: parseInt($("input[name='speed']").val()),
                hit_points: {
                    'current': parseInt($("input[name='hit-points']").val()),
                    'maximum': parseInt($("input[name='max-hp']").val())
                },
                initiative: parseInt($("input[name='initiative']").val()),
                hit_dice: parseInt($("input[name='hit-dice']").val())
            }
            var tempThis = this;
            var promise  = new Promise(async function(resolve, reject) {
                resolve(await CreateCharController.uploadAvatar(tempThis.state.image, tempThis.state.imageName, userName))
            });
            await promise.then(async function(temp) {
                var nextpromise  = new Promise(async function(resolve, reject) {
                    resolve(await CreateCharController.createCharacter(data))
                });
                await nextpromise.then(function(temp) {
                    tempThis.changePage('/')
                    // window.location.reload(false);
                });
            });
        }
    }

    checkForEmptyInputs = () => {
        var showModal = function(msg) {
            $(".growl-modal").show(500, function() {
                $("#growl-message").text(msg)
            })
            window.setTimeout(function() {
                $(".growl-modal").hide(500)
            }, 3000)
        }
        var classCheck = true;
        for (var i = 0; i < this.state.classNum; i++) {
            var elClass = $("#class" + i);
            var elLevel = $("#level" + i);
            if (elClass.val() === '' || elLevel.val() === '') {
                classCheck = false;
            }
        }
        if ($("#name").val() === '' ||
            $("#race").val() === '' || !classCheck) {
            showModal("One of the character traits are blank (name, race, class)")
            return false;
        } else if ($("input[name='modifier-big-str']").val() === '' ||
            $("input[name='modifier-small-str']").val() === '' ||
            $("input[name='modifier-big-dex']").val() === '' ||
            $("input[name='modifier-small-dex']").val() === '' ||
            $("input[name='modifier-big-con']").val() === '' ||
            $("input[name='modifier-small-con']").val() === '' ||
            $("input[name='modifier-big-int']").val() === '' ||
            $("input[name='modifier-small-int']").val() === '' ||
            $("input[name='modifier-big-wis']").val() === '' ||
            $("input[name='modifier-small-wis']").val() === '' ||
            $("input[name='modifier-big-cha']").val() === '' ||
            $("input[name='modifier-small-cha']").val() === '') {
                showModal("One of the main 6 are blank")
                return false;
        } else if ($("input[name='acrobatics']").val() === '' ||
            $("input[name='animal-handling']").val() === '' ||
            $("input[name='arcana']").val() === '' ||
            $("input[name='athletics']").val() === '' ||
            $("input[name='deception']").val() === '' ||
            $("input[name='history']").val() === '' ||
            $("input[name='insight']").val() === '' ||
            $("input[name='intimidation']").val() === '' ||
            $("input[name='investigation']").val() === '' ||
            $("input[name='medicine']").val() === '' ||
            $("input[name='nature']").val() === '' ||
            $("input[name='perception']").val() === '' ||
            $("input[name='performance']").val() === '' ||
            $("input[name='persuasion']").val() === '' ||
            $("input[name='religion']").val() === '' ||
            $("input[name='sleight-of-hand']").val() === '' ||
            $("input[name='stealth']").val() === '' ||
            $("input[name='survival']").val() === '') {
                showModal("One of the skills is blank")
                return false;
        } else if ($("input[name='exp']").val() === '' ||
            $("input[name='armor']").val() === '' ||
            $("input[name='speed']").val() === '' ||
            $("input[name='hit-points']").val() === '' ||
            $("input[name='max-hp']").val() === '' ||
            $("input[name='initiative']").val() === '' ||
            $("input[name='hit-dice']").val() === '') {
                showModal("One of the armor/HP is blank")
                return false;
        } else {
            return true;
        }
    }

    handleEditAvatar = () => {
        $("#edit-avatar-input").click();
    }

    addClass = () => {
        var dummy = 
            '<div name="multiclass" id="multiClass"><input type="text" placeholder=Class id="class' + this.state.classNum + '" ></input><input name="level" id="level' + this.state.classNum + '" type="number" placeholder="Lvl" style=width:2vw;></input></div>\r\n';
        $('#classDiv').append(dummy);
        this.setState({classNum: this.state.classNum + 1})
    }

    removeClass = () => {
        if (this.state.classNum > 1) {
            $('#class' + (this.state.classNum - 1)).parent().remove()
            this.setState({classNum: this.state.classNum - 1})
        }
    }
    changePage = (page) => {
        this.props.history.push(page)
    }
    genRandomChar = () => {
        $('input[type=number]').each(function(){
            $(this).val(1)
        })
    }
}

export default CreateChar