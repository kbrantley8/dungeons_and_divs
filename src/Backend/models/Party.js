// import { userStorage } from "../local_storage/userStorage";

const partyService = require("../services/partyService");
// const Task = require("../model_data/Task");

module.exports = class Party {
  constructor(
    id,
    name,
    members,
    owner_id
  ) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.owner_id = owner_id;
  }

  editPartyName = async function (name) {
    var data = {
      name: name
    }

    try {
      var party = await partyService
        .editParty(this.id, data)
        .then((party) => {
          return party;
        });
        this.name = party.name;
      // this.updateUser();
      return this;
    } catch (e) {
      console.log(e);
      return false;
    }
  } 

  getMembersById = async function () {
    try {
      var users = await partyService
        .getPartyMembersById(this.id)
        .then((users) => {
          return users;
        });
      // this.updateUser();
      return users;
    } catch (e) {
      console.log(e);
      return false;
    }
  } 

  getMembersByName = async function () {
    try {
      var users = await partyService
        .getPartyMembersByName(this.name)
        .then((users) => {
            return users;
          });
        // this.updateUser();
        return users;
    } catch (e) {
      console.log(e);
      return false;
    }
  } 

  addMember = async function (new_member) {
    try {
      var party = await partyService
        .addMember(this.id, [new_member])
        .then((party) => {
            return party;
          });
        // this.updateUser();
        this.members = party.members;
        return party;
    } catch (e) {
      console.log(e);
      return false;
    }
  } 

  addMembers = async function (new_members) {
    try {
      var party = await partyService
        .addMember(this.id, new_members)
        .then((party) => {
            return party;
          });
        // this.updateUser();
        this.members = party.members;
        return party;
    } catch (e) {
      console.log(e);
      return false;
    }
  } 

  removeMember = async function (old_member) {
    try {
      var party = await partyService
        .removeMember(this.id, [old_member])
        .then((party) => {
            return party;
          });
        // this.updateUser();
        this.members = party.members;
        return party;
    } catch (e) {
      console.log(e);
      return false;
    }
  } 

  removeMembers = async function (old_members) {
    try {
      var party = await partyService
        .removeMember(this.id, old_members)
        .then((party) => {
            return party;
          });
        // this.updateUser();
        this.members = party.members;
        return party;
    } catch (e) {
      console.log(e);
      return false;
    }
  } 

}
