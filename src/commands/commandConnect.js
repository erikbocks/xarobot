const { connect } = require('../util/connect')
const { memberConnected, botConnected} = require('../services/verifications')

function commandConnect(message, audio, userId) {

  if (memberConnected(userId)) {
    if (botConnected()) {
      return
    }
    return message.reply('você nao ta em nenhum canal de voz seu bobolhudo!')
  }
  
  let channel = message.member.voice.channel

  connect(audio, channel)
}

module.exports = {
  commandConnect 
}