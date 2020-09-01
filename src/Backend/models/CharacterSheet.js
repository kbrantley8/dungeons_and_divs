// import { userStorage } from "../local_storage/userStorage";

const characterSheetService = require("../services/characterSheetService");
// const Task = require("../model_data/Task");

module.exports = class CharacterSheet {
  constructor(
    sheet_id,
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
  ) {
    this.id = sheet_id;
    this.user_id = user_id;
    this.date_created = date_created;
    this.name = name;
    this.race = race;
    this.class_1 = class_1;
    this.class_2 = class_2;
    this.experience_points = experience_points;
    this.strength = strength;
    this.dexterity = dexterity;
    this.constitution = constitution;
    this.intelligence = intelligence;
    this.wisdom = wisdom;
    this.charisma = charisma;
    this.acrobatics = acrobatics;
    this.animal_handling = animal_handling;
    this.arcana = arcana;
    this.athletics = athletics;
    this.deception = deception;
    this.history = history;
    this.insight = insight;
    this.intimidation = intimidation;
    this.investigation = investigation;
    this.medicine = medicine;
    this.nature = nature;
    this.perception = perception;
    this.performance = performance;
    this.persuasion = persuasion;
    this.religion = religion;
    this.sleight_of_hand = sleight_of_hand;
    this.stealth = stealth;
    this.survival = survival;
    this.armor_rating = armor_rating;
    this.speed = speed;
    this.max_hit_points = max_hit_points;
    this.current_hit_points = current_hit_points;
    this.initiative = initiative;
    this.hit_dice = hit_dice;
  }

  editCharacterSheet = async function (    
    user_id,
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
    ) {
    var data = {
        user_id: user_id,
        date_created: date_created,
        name: name,
        race: race,
        class_1: class_1,
        class_2: class_2,
        experience_points: experience_points,
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelligence: intelligence,
        wisdom: wisdom,
        charisma: charisma,
        acrobatics: acrobatics,
        animal_handling: animal_handling,
        arcana: arcana,
        athletics: athletics,
        deception: deception,
        history: history,
        insight: insight,
        intimidation: intimidation,
        investigation: investigation,
        medicine: medicine,
        nature: nature,
        perception: perception,
        performance: performance,
        persuasion: persuasion,
        religion: religion,
        sleight_of_hand: sleight_of_hand,
        stealth: stealth,
        survival: survival,
        armor_rating: armor_rating,
        speed: speed,
        max_hit_points: max_hit_points,
        current_hit_points: current_hit_points,
        initiative: initiative,
        hit_dice: hit_dice
    }

    try {
      var characterSheet = await characterSheetService
        .editCharacterSheet(this.id, data)
        .then((response) => {
          return response;
        });

        this.user_id = characterSheet.user_id;
        this.date_created = characterSheet.date_created;
        this.name = characterSheet.name;
        this.race = characterSheet.race;
        this.class_1 = characterSheet.class_1;
        this.class_2 = characterSheet.class_2;
        this.experience_points = characterSheet.experience_points;
        this.strength = characterSheet.strength;
        this.dexterity = characterSheet.dexterity;
        this.constitution = characterSheet.constitution;
        this.intelligence = characterSheet.intelligence;
        this.wisdom = characterSheet.wisdon;
        this.charisma = characterSheet.charisma;
        this.acrobatics = characterSheet.acrobatics;
        this.animal_handling = characterSheet.animal_handling;
        this.arcana = characterSheet.arcana;
        this.athletics = characterSheet.athletics;
        this.deception = characterSheet.deception;
        this.history = characterSheet.history;
        this.insight = characterSheet.insight;
        this.intimidation = characterSheet.intimidation;
        this.investigation = characterSheet.investigation;
        this.medicine = characterSheet.medicine;
        this.nature = characterSheet.nature;
        this.perception = characterSheet.perception;
        this.performance = characterSheet.performance;
        this.persuasion = characterSheet.persuasion;
        this.religion = characterSheet.religion;
        this.sleight_of_hand = characterSheet.sleight_of_hand;
        this.stealth = characterSheet.stealth;
        this.survival = characterSheet.survival;
        this.armor_rating = characterSheet.armor_rating;
        this.speed = characterSheet.speed;
        this.max_hit_points = characterSheet.max_hit_points;
        this.current_hit_points = characterSheet.current_hit_points;
        this.initiative = characterSheet.initiative;
        this.hit_dice = characterSheet.hit_dice;
      // this.updateUser();
      return this;
    } catch (e) {
      console.log(e);
      return false;
    }
  } 
};
