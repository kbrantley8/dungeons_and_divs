import Database from '../Backend/Database.js'
import CharacterModel from '../Model/Character.js'

var AllCharacterController = {
    characters: [],
    getAllCharacters: async function () {
        var tempThis = this;
        await Database.getCharacterInformation().then(function(chars) {
            chars.forEach((character) => {
                var char = new CharacterModel(character.id, character.data);
                tempThis.characters.push(char);
            })
        });
        return this.characters;
    }
};

export default AllCharacterController;