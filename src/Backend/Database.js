import firebase from './firebase.js' // TODO: only what we need
import uuidv4 from 'uuid/v4'

const Database = {
    
    async getCharacterInformation () {
        var chars = [];
        var promise = new Promise(function(resolve, reject) {
            firebase
            .firestore()
            .collection("characters")
            .get()
            .then((querySnapshot) => {
                var characters = [];
                querySnapshot.forEach((doc) => {
                    var id = doc.id;
                    var data = doc.data();
                    characters.push({'id': id, 'data': data});
                })
                resolve(characters);
            });
        });
        await promise.then(function(characters) {
            chars = characters;
        });
        return chars;
    },
    addNewCharacter (data) {
        var newId = uuidv4();
        firebase
            .firestore()
            .collection("characters")
            .doc(newId)
            .set(data)
    },
    editCharacter (id, data) {
        firebase
            .firestore()
            .collection("characters")
            .doc(id)
            .update(data)
    },
    deleteCharacter (id) {
        firebase
            .firestore()
            .collection("characters")
            .doc(id)
            .delete()
    },
    uploadPhoto(img) {
        console.log(firebase.storage());
    },
    async getListOfSpells() {
        var spellsList = [];
        var promise = new Promise(function(resolve, reject) {
            firebase
                .firestore()
                .collection("spells")
                .get()
                .then((querySnapshot) => {
                    var spells = [];
                    querySnapshot.forEach((doc) => {
                        var id = doc.id;
                        var data = doc.data();
                        spells.push({'id': id, 'data': data});
                    })
                    resolve(spells)
                })
        });
        await promise.then(function(spells) {
            spellsList = spells;
        });
        return spellsList;
    }


};

export default Database;

//EXAMPLES DATA
// var data = {
//     name: 'Hocus Pocus',
//     race: 'Orc',
//     class: [
//         {'name': 'Cleric', 'level': 3},
//         {'name': 'Sorcerer', 'level': 3}
//     ],
//     experience_points: 550,
//     alignment: 'Chaotic Evil',
//     abilities: {
//         'strength': {
//             'modifier': 3,
//             'score': 13
//         },
//         'dexterity': {
//             'modifier': 3,
//             'score': 13
//         },
//         'constitution': {
//             'modifier': 3,
//             'score': 13
//         },
//         'intelligence': {
//             'modifier': 3,
//             'score': 13
//         },
//         'wisdom': {
//             'modifier': 3,
//             'score': 13
//         },
//         'charisma': {
//             'modifier': 3,
//             'score': 13
//         }
//     },
//     skills: {
//         'acrobatics': 2,
//         'animal_handling': 2,
//         'arcana': 2,
//         'athletics': 2,
//         'deception': 2,
//         'history': 2,
//         'insight': 2,
//         'intimidation': 2,
//         'investigation': 2,
//         'medicine': 2,
//         'nature': 2,
//         'perception': 2,
//         'performance': 2,
//         'persuasion': 2,
//         'religion': 2,
//         'sleight_of_hand': 2,
//         'stealth': 2,
//         'survival': 2,
//     },
//     armor_rating: 20,
//     speed: 30,
//     hit_points: {
//         'current': 10,
//         'maximum': 14
//     },
//     initiative: 3,
//     inventory: 'N/A',
//     gold: 143,
//     spell_slots: [
//         {'total': 2, 'used': 1},
//         {'total': 3, 'used': 0}
//     ],
//     death_saves: {
//         'successful': 1,
//         'failures': 0
//     },
//     saving_throws: {
//         'strength': {
//             'modifier': 3,
//             'proficient': true
//         },
//         'dexterity': {
//             'modifier': 3,
//             'proficient': true
//         },
//         'constitution': {
//             'modifier': 3,
//             'proficient': true
//         },
//         'intelligence': {
//             'modifier': 3,
//             'proficient': true
//         },
//         'wisdom': {
//             'modifier': 3,
//             'proficient': true
//         },
//         'charisma': {
//             'modifier': 3,
//             'proficient': true
//         }
//     }
// }