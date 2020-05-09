import React, { Component } from 'react'
import '../Style/CreateChar.css'
import CreateCharController from '../Controller/CreateCharController.js'
import background_img from '../dnd_background.webp'
import background_img_up from '../dnd_background_updated.png'
import '../Style/Temp.css'
import $ from 'jquery'

class CreateChar extends Component {

    constructor(props) {

        super(props);

        this.state={
            classNum: 1,
            image: background_img,
            imageName: 'dnd_avatar.webp',
            race: '',
            imageChange: false,
            skillProficiencies: {},
            extraClass: false
        }
    }

    async componentDidMount() {
        var parentThis = this;
        $("#edit-avatar-input").on('change', function() {
            var image = this.files[0];
            if (image) {
                var imageName = image.name;
                parentThis.setState({image: image, imageName: imageName})
                parentThis.setState({imageChange: true})
                $(".avatar-preview").attr('src', (URL.createObjectURL(image)))
            }
            
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
                <div className="create-char-body-container">
                    <div className="create-char-traits-container">
                        <div className="create-char-traits-left-side">
                            <img className="create-char-dnd-emblem" alt="" src={background_img_up}></img>
                            <div className="create-char-traits-input-container">
                                <div className="right-arrow"></div>
                                <input id="name" className="create-char-name"></input>
                            </div>
                        </div>
                        <div className="create-char-traits-right-side">
                            <div className="traits-column">
                                <div className="first-entry">
                                    <div className="label">RACE</div>
                                    <input id="race"></input>
                                </div>
                                <div className="second-entry">
                                    <div className="label">EXPERIENCE</div>
                                    <input name="exp"></input>
                                </div>
                            </div>
                            <div className="traits-column move-top">
                                <div className="first-entry">
                                    <div className="label">BACKGROUND</div>
                                    <input id="background"></input>
                                </div>
                            </div>
                            <div className="traits-column move-top">
                                <div className="first-entry">
                                    <div className="traits-class">
                                        <div className="label">CLASS</div>
                                        <input></input>
                                    </div>
                                    <div className="traits-level">
                                        <div className="label">LEVEL</div>
                                        <input onChange={(e) => this.controlNumberInput(e, false)}></input>
                                    </div>
                                </div>
                                <div className="second-entry" id="extra_class" style={{display: 'none'}}>
                                    <div className="traits-class">
                                        <div className="label">CLASS</div>
                                        <input></input>
                                    </div>
                                    <div className="traits-level">
                                        <div className="label">LEVEL</div>
                                        <input onChange={(e) => this.controlNumberInput(e, false)}></input>
                                    </div>
                                </div>
                                <button className="hover-remove" onClick={(e) => this.handleClassClick(e)}><span>+</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="create-char-main-container">
                        <div className="section">
                            PROF.
                            <div className="avatar">
                            </div>
                        </div>
                        <div className="section">
                            STR
                            <div className="attr-background">
                                <input maxLength="2" name="modifier-big-str" onChange={(e) => this.controlNumberInput(e, false)}></input>
                            </div>
                            <div className="attr-modifier">
                                <input maxLength="2" name="modifier-small-str" onChange={(e) => this.controlNumberInput(e, true)}></input>
                            </div>
                        </div>
                        <div className="section">
                            DEX
                            <div className="attr-background">
                                <input maxLength="2" name="modifier-big-dex" onChange={(e) => this.controlNumberInput(e, false)}></input>
                            </div>
                            <div className="attr-modifier">
                                <input maxLength="2" name="modifier-small-dex" onChange={(e) => this.controlNumberInput(e, true)}></input>
                            </div>
                        </div>
                        <div className="section">
                            CON
                            <div className="attr-background">
                                <input maxLength="2" name="modifier-big-con" onChange={(e) => this.controlNumberInput(e, false)}></input>
                            </div>
                            <div className="attr-modifier">
                                <input maxLength="2" name="modifier-small-con" onChange={(e) => this.controlNumberInput(e, true)}></input>
                            </div>
                        </div>
                        <div className="section">
                            INT
                            <div className="attr-background">
                                <input maxLength="2" name="modifier-big-int" onChange={(e) => this.controlNumberInput(e, false)}></input>
                            </div>
                            <div className="attr-modifier">
                                <input maxLength="2" name="modifier-small-int" onChange={(e) => this.controlNumberInput(e, true)}></input>
                            </div>
                        </div>
                        <div className="section">
                            WIS
                            <div className="attr-background">
                                <input maxLength="2" name="modifier-big-wis" onChange={(e) => this.controlNumberInput(e, false)}></input>
                            </div>
                            <div className="attr-modifier">
                                <input maxLength="2" name="modifier-small-wis" onChange={(e) => this.controlNumberInput(e, true)}></input>
                            </div>
                        </div>
                        <div className="section">
                            CHA
                            <div className="attr-background">
                                <input maxLength="2" name="modifier-big-cha" onChange={(e) => this.controlNumberInput(e, false)}></input>
                            </div>
                            <div className="attr-modifier">
                                <input maxLength="2" name="modifier-small-cha" onChange={(e) => this.controlNumberInput(e, true)}></input>
                            </div>
                        </div>
                        <div className="section">
                            AC
                            <div className="attr-background">
                                <input maxLength="2" name="armor" onChange={(e) => this.controlNumberInput(e, false)}></input>
                            </div>
                        </div>
                        <div className="section">
                            HP
                            <div className="attr-background">
                                <input name="hit-points" onChange={(e) => this.controlNumberInput(e, false)}></input>
                            </div>
                            <div className="attr-modifier">
                                <input name="max-hp" onChange={(e) => this.controlNumberInput(e, true)}></input>
                            </div>
                        </div>
                    </div>
                    {/* <button type="button" onClick={() => this.genRandomChar()}>Generate Random Character</button> */}
                    <div className="create-char-skills-container">
                        <h1>SKILLS</h1>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 1, 'Acrobatics')}></div>
                            <input></input>
                            <div className="title">Acrobatics</div>
                            <div className="symbol">(DEX)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 2, 'Animal Handling')}></div>
                            <input></input>
                            <div className="title">Animal Handling</div>
                            <div className="symbol">(WIS)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 3, 'Arcana')}></div>
                            <input></input>
                            <div className="title">Arcana</div>
                            <div className="symbol">(INT)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 4, 'Atheletics')}></div>
                            <input></input>
                            <div className="title">Atheletics</div>
                            <div className="symbol">(STR)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 5, 'Deception')}></div>
                            <input></input>
                            <div className="title">Deception</div>
                            <div className="symbol">(CHA)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 6, 'History')}></div>
                            <input></input>
                            <div className="title">History</div>
                            <div className="symbol">(INT)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 7, 'Insight')}></div>
                            <input></input>
                            <div className="title">Insight</div>
                            <div className="symbol">(WIS)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 8, 'Intimidation')}></div>
                            <input></input>
                            <div className="title">Intimidation</div>
                            <div className="symbol">(CHA)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 9, 'Investigation')}></div>
                            <input></input>
                            <div className="title">Investigation</div>
                            <div className="symbol">(INT)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 10, 'Medicine')}></div>
                            <input></input>
                            <div className="title">Medicine</div>
                            <div className="symbol">(WIS)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 11, 'Nature')}></div>
                            <input></input>
                            <div className="title">Nature</div>
                            <div className="symbol">(INT)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 12, 'Perception')}></div>
                            <input></input>
                            <div className="title">Perception</div>
                            <div className="symbol">(WIS)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 13, 'Performance')}></div>
                            <input></input>
                            <div className="title">Performance</div>
                            <div className="symbol">(CHA)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 14, 'Persuasion')}></div>
                            <input></input>
                            <div className="title">Persuasion</div>
                            <div className="symbol">(CHA)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 15, 'Religion')}></div>
                            <input></input>
                            <div className="title">Religion</div>
                            <div className="symbol">(INT)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 16, 'Sleight of Hand')}></div>
                            <input></input>
                            <div className="title">Sleight of Hand</div>
                            <div className="symbol">(DEX)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 17, 'Stealth')}></div>
                            <input></input>
                            <div className="title">Stealth</div>
                            <div className="symbol">(DEX)</div>
                        </div>
                        <div className="create-char-skills-row">
                            <div className="bullet" onClick={(e) => this.handleProficiencyClick(e, 18, 'Survival')}></div>
                            <input></input>
                            <div className="title">Survival</div>
                            <div className="symbol">(WIS)</div>
                        </div>
                    </div>
                    <div className="remainder-skills-container move-top">
                        <div className="remainder-skill">
                            <h1>SPEED</h1>
                            <input maxLength="2" name="speed" onChange={(e) => this.controlNumberInput(e, false)}></input>
                        </div>
                        <div className="remainder-skill">
                            <h1>INITIATIVE</h1>
                            <input maxLength="2" name="initiative" onChange={(e) => this.controlNumberInput(e, false)}></input>
                        </div>
                        <div className="remainder-skill">
                            <h1>HIT DICE</h1>
                            <input maxLength="2" name="hit-dice" onChange={(e) => this.controlNumberInput(e, false)}></input>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    handleClassClick = (event) => {
        if (this.state.extraClass) {
            $(".hover-remove").css('background-color', 'lightgreen');
            $(".hover-remove").children().text('+');
            $("#extra_class").hide();
            this.setState({extraClass: false})
        } else {
            $(".hover-remove").css('background-color', 'red');
            $(".hover-remove").children().text('x');
            $("#extra_class").show();
            this.setState({extraClass: true})
        }
    }

    handleProficiencyClick = (event, num, title) => {
        var arr = this.state.skillProficiencies;
        if (arr[num]) {
            delete arr[num];
            $(event.target).css('background-color', 'white');
        } else {
            if (Object.keys(arr).length < 2) {
                arr[num] = title;
                $(event.target).css('background-color', 'red');
            }
        }
        this.setState({skillProficiencies: arr});
    }

    controlNumberInput = (event, negatives = false) => {
        var val = event.target.value;
        val = (negatives) ? val.replace(/[^0-9-]+/, '') : val.replace(/\D/, '');
        $(event.target).val(val)
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
        if (!this.state.imageChange) {
            showModal("You must upload an image for your avatar")
            return false;
        } else if ($("#name").val() === '' ||
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