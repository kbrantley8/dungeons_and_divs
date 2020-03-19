class Spell {
    constructor(id, data) {
        this.id = id;
        this.casting_time = data.casting_time;
        this.class = data.class;
        this.components = data.components;
        this.concentration = data.concentration;
        this.desc = data.desc;
        this.duration = data.duration;
        this.higher_level = data.higher_level;
        this.level = data.level;
        this.material = data.material;
        this.name = data.name;
        this.page = data.page;
        this.range = data.range;
        this.ritual = data.ritual;
        this.school = data.school;
    }
}

export default Spell;