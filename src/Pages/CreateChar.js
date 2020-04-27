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
            imageChange: false
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
                                    <input></input>
                                </div>
                                <div className="second-entry">
                                    <div className="label">CLASS</div>
                                    <input></input>
                                </div>
                            </div>
                            <div className="traits-column">
                                <div className="first-entry">
                                    <div className="label">BACKGROUND</div>
                                    <input></input>
                                </div>
                                <div className="second-entry">
                                    <div className="label">EXPERIENCE</div>
                                    <input></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '7%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <div style={{fontWeight: '700'}}>
                            STR
                        </div>
                        <div style={{border: '2px solid darkgrey', borderRadius: '15px 0', height: '70px', backgroundColor: 'lightgrey'}}>
                            <input style={{fontSize: '51px', backgroundColor: 'lightgrey', border: 'unset', width: '60px', textAlign: 'center', outline: 'none'}}></input>
                        </div>
                        <div style={{border: '2px solid darkgrey', borderRadius: '50px', width: '60%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'white', bottom: '12px', position: 'relative'}}>
                            7
                        </div>
                    </div>
                    {/* <button type="button" onClick={() => this.genRandomChar()}>Generate Random Character</button> */}
                </div>

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