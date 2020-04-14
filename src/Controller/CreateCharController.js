import Database from '../Backend/Database.js'
import HomePageController from '../Controller/HomePageController.js'

var CreateCharController = {
    createCharacter: async function (data) {
        var promise  = new Promise(function(resolve, reject) {
            resolve(Database.addNewCharacter(data))
        });
        await promise.then(function(newId) {
            HomePageController.addCharacter(data, newId);
        });

    },
    uploadAvatar: async function (img, imgName, userName) {
        await Database.uploadPhoto(img, imgName, userName);
    }
};

export default CreateCharController;