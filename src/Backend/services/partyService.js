const axios = require('axios');
const urlbase = 'https://dungeons-and-divs-server.herokuapp.com';

exports.getAllParties = async () => {
  try {
    var parties = await axios.get(urlbase + '/parties')
    .then((response) => {

      return response.data;
      
    });

    return parties;
  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error})
  }
}

exports.getPartyByName = async (name) => {
    try {
      var party = await axios.get(urlbase + '/getParty', 
        { 
          params: {
            name
          }
        }
        ).then(party => {
          return party.data
        })
  
        return party;
  
    } catch (e) {
      console.log({status: e.response.status, message: e.response.data.error, location: "partyService.getUser()"})
      return {status: e.response.status, message: e.response.data.error, location: "partyService.getUser()"};
    }
  }
  
  exports.getPartyById = async (party_id) => {
    try {
      var party = await axios.get(urlbase + '/getParty', 
        { 
          params: {
            party_id
          }
        }
        ).then(party => {
          return party.data
        })
  
        return party;
  
    } catch (e) {
      console.log({status: e.response.status, message: e.response.data.error, location: "partyService.getUser()"})
      return {status: e.response.status, message: e.response.data.error, location: "partyService.getUser()"};
    }
  }

exports.createParty = async (name, owner_id, members = undefined) => {

  try {
    var party = await axios.post(urlbase + '/createParty', 
      { name,
        owner_id,
        members
      }).then(party => {
        return party.data;
      })

      return party;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error})
    return {status: e.response.status, message: e.response.data.error};
  }
}

exports.editParty = async (
    party_id,
    data
  ) => {
  try {

    var party = await axios.post(urlbase + '/editParty', 
      { 
        party_id,
        data
      }
      ).then(party => {
        return party.data
      })

      return party;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error, location: "partyService.editParty()"})
    return {status: e.response.status, message: e.response.data.error, location: "partyService.editParty()"};
  }
}

exports.deletePartyByName = async (party_name) => {
    try {
      var val = await axios.delete(urlbase + '/deleteParty', 
        { 
          data: {
            party_name
          }
        }).then(val => {
          return val.data
        })
      return val;
  
    } catch (e) {
      console.log({status: e.response.status, message: e.response.data.error})
    }
}

exports.deletePartyById = async (party_id) => {
  try {
    var val = await axios.delete(urlbase + '/deleteParty', 
      { 
        data: {
          party_id
        }
      }).then(val => {
        return val.data
      })
    return val;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error})
  }
}

exports.getPartyMembersById = async (party_id) => {
    try {
      var party = await axios.get(urlbase + '/getPartyMembers', 
        { 
          params: {
            party_id
          }
        }
        ).then(party => {
          return party.data
        })
  
        return party;
  
    } catch (e) {
      console.log({status: e.response.status, message: e.response.data.error, location: "partyService.getUser()"})
      return {status: e.response.status, message: e.response.data.error, location: "partyService.getUser()"};
    }
  }

  exports.getPartyMembersByName = async (party_name) => {
    try {
      var party = await axios.get(urlbase + '/getPartyMembers', 
        { 
          params: {
            party_name
          }
        }
        ).then(party => {
          return party.data
        })
  
        return party;
  
    } catch (e) {
      console.log({status: e.response.status, message: e.response.data.error, location: "partyService.getUser()"})
      return {status: e.response.status, message: e.response.data.error, location: "partyService.getUser()"};
    }
  }

  exports.addMember = async (
    party_id,
    data
  ) => {
  try {

    var party = await axios.post(urlbase + '/addMember', 
      { 
        party_id,
        data
      }
      ).then(party => {
        return party.data
      })

      return party;

  } catch (e) {
    console.log({status: e.response.status, message: e.response.data.error, location: "partyService.editParty()"})
    return {status: e.response.status, message: e.response.data.error, location: "partyService.editParty()"};
  }
}

exports.removeMember = async (
        party_id,
        data
    ) => {
    try {

        var party = await axios.post(urlbase + '/removeMember', 
        { 
            party_id,
            data
        }
        ).then(party => {
            return party.data
        })

        return party;

    } catch (e) {
        console.log({status: e.response.status, message: e.response.data.error, location: "partyService.editParty()"})
        return {status: e.response.status, message: e.response.data.error, location: "partyService.editParty()"};
    }
}