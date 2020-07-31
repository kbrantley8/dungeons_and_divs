const axios = require('axios');
const urlbase = 'https://dungeons-and-divs-server.herokuapp.com';

exports.getPartyMessages = async (party_id) => {
  try {
    var messages = await axios.get(urlbase + '/getPartyMessages', { 
        params: {
          party_id
        }
      })
    .then((response) => {

      return response.data;
      
    });

    return messages;
  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error})
  }
}

exports.createMessage = async ( text, user_id, party_id, date_created ) => {

    try {
      var message = await axios.post(urlbase + '/createMessage', 
        {   text,
            user_id,
            party_id,
            date_created
        }).then(message => {
          return message.data;
        })
  
        return message;
  
    } catch (e) {
      console.log({status: e.response.status, message: e.response.data.error})
      return {status: e.response.status, message: e.response.data.error};
    }
  }