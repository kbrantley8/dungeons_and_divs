// import { userStorage } from "../local_storage/userStorage";

const messageService = require("../services/messageService");
// const Task = require("../model_data/Task");

module.exports = class Message {
  constructor(
    id,
    text,
    user_id,
    party_id,
    date_created
  ) {
    this.id = id;
    this.text = text;
    this.user_id = user_id;
    this.party_id = party_id;
    this.date_created = date_created;
  }
};
