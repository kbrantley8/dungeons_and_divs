import firebase from './firebase.js' // TODO: only what we need
import uuidv4 from 'uuid/v4'

const Database = {
    
    getCharacterInformation () {
        var characters = [];
        firebase
            .firestore()
            .collection("characters")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var id = doc.id;
                    var data = doc.data();
                    characters.push({'id': id, 'data': data});
                })
            });
        return characters;
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
    getListOfSpells() {
        var spells = [];
        firebase
            .firestore()
            .collection("spells")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var id = doc.id;
                    var data = doc.data();
                    spells.push({'id': id, 'data': data});
                })
            });
        return spells;
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
//         'acrobatics': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'animal_handling': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'arcana': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'athletics': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'deception': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'history': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'insight': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'intimidation': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'investigation': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'medicine': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'nature': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'perception': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'performance': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'persuasion': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'religion': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'sleight_of_hand': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'stealth': {
//             'modifier': 2,
//             'proficient': true
//         },
//         'survival': {
//             'modifier': 2,
//             'proficient': true
//         },
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