const axios = require('axios');
const urlbase = 'https://dungeons-and-divs-server.herokuapp.com';

exports.createCharacterSheet = async (
    user_id,
    date_created,
    name,
    race,
    class_1,
    class_2 = undefined,
    experience_points = undefined,
    strength, dexterity = undefined,
    constitution = undefined,
    intelligence = undefined,
    wisdom = undefined,
    charisma = undefined,
    acrobatics = undefined,
    animal_handling = undefined,
    arcana = undefined,
    athletics = undefined,
    deception = undefined,
    history = undefined,
    insight = undefined,
    intimidation = undefined,
    investigation = undefined,
    medicine = undefined,
    nature = undefined,
    perception = undefined,
    performance = undefined,
    persuasion = undefined,
    religion = undefined,
    sleight_of_hand = undefined,
    stealth = undefined,
    survival = undefined,
    armor_rating = undefined,
    speed = undefined,
    max_hit_points = undefined,
    current_hit_points = undefined,
    initiative = undefined,
    hit_dice = undefined
    ) => {

  try {
    var characterSheet = await axios.post(urlbase + '/createCharacterSheet', 
      { user_id,
        date_created,
        name,
        race,
        class_1,
        class_2,
        experience_points,
        strength, dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        acrobatics,
        animal_handling,
        arcana,
        athletics,
        deception,
        history,
        insight,
        intimidation,
        investigation,
        medicine,
        nature,
        perception,
        performance,
        persuasion,
        religion,
        sleight_of_hand,
        stealth,
        survival,
        armor_rating,
        speed,
        max_hit_points,
        current_hit_points,
        initiative,
        hit_dice
      }).then(response => {
        return response.data;
      })

      return characterSheet;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error})
    return {status: e.response.status, message: e.response.data.error};
  }
}

exports.editCharacterSheet = async (
    sheet_id,
    data
  ) => {
  try {

    var characterSheet = await axios.post(urlbase + '/editCharacterSheet', 
      { 
        sheet_id,
        data
      }
      ).then(response => {
        return response.data
      })

      return characterSheet;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error, location: "userService.editUser()"})
    return {status: e.response.status, message: e.response.data.error, location: "userService.editUser()"};
  }
}

exports.getCharacterSheet = async (sheet_id) => {
    try {
      var characterSheet = await axios.get(urlbase + '/getCharacterSheet', 
        { 
          params: {
            sheet_id
          }
        }
        ).then(response => {
          return response.data
        })
  
        return characterSheet;
  
    } catch (e) {
      console.log({status: e.response.status, message: e.response.data.error, location: "userService.getUser()"})
      return {status: e.response.status, message: e.response.data.error, location: "userService.getUser()"};
    }
}

exports.getUsersCharacterSheetsById = async (user_id) => {
  try {
    var characterSheets = await axios.get(urlbase + '/getUsersCharacterSheet', 
      { 
        params: {
          user_id
        }
      }
      ).then(response => {
        return response.data
      })

      return characterSheets;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error, location: "userService.getUser()"})
    return {status: e.response.status, message: e.response.data.error, location: "userService.getUser()"};
  }
}

exports.getUsersCharacterSheetsByEmail = async (email) => {
  try {
    var characterSheets = await axios.get(urlbase + '/getUsersCharacterSheet', 
      { 
        params: {
          email
        }
      }
      ).then(response => {
        return response.data
      })

      return characterSheets;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error, location: "userService.getUser()"})
    return {status: e.response.status, message: e.response.data.error, location: "userService.getUser()"};
  }
}