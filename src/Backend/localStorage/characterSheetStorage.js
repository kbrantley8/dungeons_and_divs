import CharacterSheet from '../models/CharacterSheet'

export class characterSheetStorage {
  static storeCharacterSheet = (value) => {
      try {
        const jsonValue1 = localStorage.getItem("character_sheets");
        var character_sheet = (jsonValue1 != null) ? JSON.parse(jsonValue1) : null;
        console.log(character_sheet)
        if (character_sheet) {
            var arr = [];
            character_sheet.forEach(function(val, ind) {
                var id = val.id;
                if (value.id !== id) {
                    arr.push(val)
                }
            })
            var jsonVal = JSON.stringify(arr);
            localStorage.setItem("character_sheets", jsonVal)
        } else {
            const jsonValue = JSON.stringify(value);
            localStorage.setItem("character_sheets", [jsonValue]);
        }
      } catch (e) {
        console.error(e);
      }
  };

  static getChracterSheets = () => {
      try {
        const jsonValue = localStorage.getItem("character_sheets");
        var character_sheet = (jsonValue != null) ? JSON.parse(jsonValue) : null;
        console.log(character_sheet)
        if (character_sheet) {
            var arr = [];
            character_sheet.forEach(function(val, ind) {
                var new_sheet = new CharacterSheet(val.id, val.user_id, val.date_created, val.name, val.race, val.class_1)
                arr.push(new_sheet)
            })
            return arr;
        } else {
          return false;
        }
      } catch (e) {
        console.error(e);
      }
  };

  static removeCharacterSheets = () => {
      try {
        localStorage.removeItem("character_sheets");
      } catch (e) {
        console.error(e);
      }
  };
}

export default characterSheetStorage
