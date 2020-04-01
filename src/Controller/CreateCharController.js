import Database from '../Backend/Database.js'
import CharacterModel from '../Model/Character.js'

var CreateCharController = {
    createCharacter: function (data) {
        Database.addNewCharacter(data)
    },
    uploadAvatar: function (img, imgName, userName) {
        Database.uploadPhoto(img, imgName, userName);
    }
};

export default CreateCharController;