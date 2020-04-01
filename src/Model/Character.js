class CharacterModel {
    constructor(id, data, img) {
        this.id = id;
        this.img = img;
        this.name = data.name;
        this.race = data.race;
        this.class = data.class;
        this.experience_points = data.experience_points;
        this.alignment = data.alignment;
        this.abilities = data.abilities;
        this.skills = data.skills;
        this.armor_rating = data.armor_rating;
        this.speed = data.speed;
        this.hit_points = data.hit_points;
        this.initiative = data.initiative;
        this.hit_dice = data.hit_dice;
    }
}

export default CharacterModel;