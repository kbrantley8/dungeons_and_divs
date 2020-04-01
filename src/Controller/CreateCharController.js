import Database from '../Backend/Database.js'
import CharacterModel from '../Model/Character.js'

var CreateCharController = {
    createCharacter: function (data) {
        Database.addNewCharacter(data)
    },
    uploadAvatar: function (img) {
        Database.uploadPhoto(img);
    }
};

export default CreateCharController;