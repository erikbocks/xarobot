const { connect } = require('../util/connect')
const { memberConnected, botConnected} = require('../services/verifications')

function commandConnect(interaction, audio, userId) {

  if (!memberConnected(userId)) {
    if (botConnected()) {
      return 
    }
    interaction.reply("você nao tá em nenhum canal de voz seu bobolhudo")
    return
  }
  
  let channel = interaction.member.voice

  connect(audio, channel.channelId, channel.guild)
  return interaction.reply({ content: "executado!", ephemeral: true })
}

module.exports = {
  commandConnect 
}