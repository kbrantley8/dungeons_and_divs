import User from '../models/User'

export class userStorage {
  static storeUser = (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        localStorage.setItem("user", jsonValue);
      } catch (e) {
        console.error(e);
      }
  };

  static getUser = () => {
      try {
        const jsonValue = localStorage.getItem("user");
        var user = (jsonValue != null) ? JSON.parse(jsonValue) : null;
        if (user) {
          var new_user = new User(user.id, user.first_name, user.last_name, user.email, user.password, user.account_type, user.party_id, user.bio)
          return new_user;
        } else {
          return false;
        }
      } catch (e) {
        console.error(e);
      }
  };

  static removeUser = () => {
      try {
        localStorage.removeItem("user");
      } catch (e) {
        console.error(e);
      }
  };
}

export default userStorage
