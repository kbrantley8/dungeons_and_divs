import Database from '../Backend/Database.js'
import CharacterModel from '../Model/Character.js'

var AllCharacterController = {
    characters: [],
    getAllCharacters: async function () {
        if (this.characters.length === 0) {
            var tempThis = this;
            await Database.getCharacterInformation().then(function(chars) {
                chars.forEach((character) => {
                    var char = new CharacterModel(character.id, character.data, character.imageSrc);
                    tempThis.characters.push(char);
                })
            });
            return this.characters;
        } else {
            return this.characters;
        }
        
    },
    setAvatar: async function(char) {
        if (window.localStorage.getItem(char.name) == null) {
            var promise  = new Promise(async function(resolve, reject) {
                resolve(await Database.getAvatar(char.imageSrc))
            });
            await promise.then(function(img) {
                window.localStorage.setItem(char.name, img)
                char.setAvatar()
            });
        } else {
            char.setAvatar()
        }
    },
    getCharacters: function() {
        return this.characters
    },
    addCharacter: async function(data, newId) {
        var tempThis = this;
        var char = new CharacterModel(newId, data, null); 
        var promise  = new Promise(function(resolve, reject) {
            resolve(tempThis.setAvatar(char))
        });
        await promise.then(function(temp) {
            tempThis.characters.push(char)
        });
    }
};

export default AllCharacterController;