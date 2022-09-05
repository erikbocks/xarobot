const {client} = require('../util/client')
const { getChannel, getMembers } = require('../util/channel')

let allChannels = client.channels.cache
require('dotenv').config()

function memberConnected(userId) {
  let retorno = false
  let activeChannels = getChannel(allChannels)
  let members = getMembers(activeChannels)

  members.forEach(m => {
    m.forEach(p => {
      if (p[0] == userId) {
        retorno = true
      }
    }
    )
  })

  return retorno
}

function botConnected() {
  let retorno = false
  let activeChannels = getChannel(allChannels)
  let members = getMembers(activeChannels)

  if (!activeChannels.length) {
    return 
  }

  //verificação do bot
  members.forEach(m => {
    m.forEach(p => {
      if (p[0] == process.env.botId) {
        retorno = true
      }
    }
    )
  })

  return retorno
}

module.exports = {
  botConnected,
  memberConnected
}