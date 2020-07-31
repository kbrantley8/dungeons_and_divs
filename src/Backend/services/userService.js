const axios = require('axios');
const urlbase = 'https://dungeons-and-divs-server.herokuapp.com';

exports.getAllUsers = async () => {
  try {
    var users = await axios.get(urlbase + '/users')
    .then((response) => {

      return response.data;
      
    });

    return users;
  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error})
  }
}

exports.createUser = async (first_name, last_name, email, password, account_type = 0, party_id = undefined, bio = undefined) => {

  try {
    var user = await axios.post(urlbase + '/createUser', 
      { first_name,
        last_name,
        email,
        password,
        account_type,
        party_id,
        bio
      }).then(user => {
        return user.data;
      })

      return user;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error})
    return {status: e.response.status, message: e.response.data.error};
  }
}

exports.getUserByEmail = async (email) => {
  try {
    var user = await axios.get(urlbase + '/getUser', 
      { 
        params: {
          email
        }
      }
      ).then(user => {
        return user.data
      })

      return user;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error, location: "userService.getUser()"})
    return {status: e.response.status, message: e.response.data.error, location: "userService.getUser()"};
  }
}

exports.getUserById = async (user_id) => {
  try {
    var user = await axios.get(urlbase + '/getUser', 
      { 
        params: {
          user_id
        }
      }
      ).then(user => {
        return user.data
      })

      return user;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error, location: "userService.getUser()"})
    return {status: e.response.status, message: e.response.data.error, location: "userService.getUser()"};
  }
}

exports.editUser = async (
    user_id,
    data
  ) => {
  try {

    var user = await axios.post(urlbase + '/editUser', 
      { 
        user_id,
        data
      }
      ).then(user => {
        return user.data
      })

      return user;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error, location: "userService.editUser()"})
    return {status: e.response.status, message: e.response.data.error, location: "userService.editUser()"};
  }
}

exports.deleteUserByEmail = async (email) => {
    try {
      var val = await axios.delete(urlbase + '/deleteUser', 
        { 
          data: {
            email
          }
        }).then(val => {
          return val.data
        })
      return val;
  
    } catch (e) {
      console.log({status: e.response.status, message: e.response.data.error})
    }
}

exports.deleteUserById = async (user_id) => {
  try {
    var val = await axios.delete(urlbase + '/deleteUser', 
      { 
        data: {
          user_id
        }
      }).then(val => {
        return val.data
      })
    return val;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error})
  }
}

exports.loginUser = async (email, password, user_id = undefined) => {
  try {
    var user = await axios.get(urlbase + '/loginUser', 
      { 
        params: {
          email,
          user_id,
          password
        }
      }
      ).then(user => {
        return user.data
      })

      return user;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error, location: "userService.loginUser()"})
    return {status: e.response.status, message: e.response.data.error, location: "userService.loginUser()"};
  }
}
