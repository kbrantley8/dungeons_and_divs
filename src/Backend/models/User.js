// import { userStorage } from "../localStorage/userStorage";

const userService = require("../services/userService");
// const Task = require("../model_data/Task");

module.exports = class User {
  constructor(
    id,
    first_name,
    last_name,
    email,
    password,
    account_type,
    party_id = undefined,
    bio = undefined
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.account_type = account_type;
    this.party_id = party_id;
    this.bio = bio;
  }

  editUser = async function (first_name, last_name, email, password, account_type = this.account_type, party_id = this.party_id, bio = this.bio) {
    var data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      account_type: account_type,
      party_id: party_id,
      bio: bio
    }

    try {
      var user = await userService
        .editUser(this.id, data)
        .then((user) => {
          return user;
        });

      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.email = user.email;
      this.password = user.password;
      this.account_type = user.account_type;
      this.party_id = user.party_id;
      this.bio = user.bio;
      return this;
    } catch (e) {
      console.log(e);
      return false;
    }
  } 

  // updateUser = function () {
  //   let userJson = {
  //     id: this.id,
  //     first_name: this.first_name,
  //     last_name: this.last_name,
  //     account_type: this.account_type,
  //     email: this.email,
  //     points: this.points,
  //   };

  //   userStorage.storeUser(userJson);
  // };

  updateFirstName = async function (new_name) {
    try {
      var user = await userService
        .updateFirstName(this.email, new_name)
        .then((user) => {
          return user;
        });

      this.first_name = user.first_name;
      this.updateUser();
      return this;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  updateEmail = async function (new_email, input_password) {
    try {
      var user = await userService
        .updateEmail(this.email, new_email, input_password)
        .then((user) => {
          return user;
        });

      this.email = user.email;
      this.updateUser();
      return this;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  updateLastName = async function (new_name) {
    try {
      var user = await userService
        .updateLastName(this.email, new_name)
        .then((user) => {
          return user;
        });

      this.last_name = user.last_name;

      return this;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
};
