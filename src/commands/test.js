const { voiceDiscord } = require('../util/client')
const { memberConnected } = require('../services/verifications')

function test(message) {

  if (!memberConnected(message.author.id)) {
    return message.reply('você nao ta em nenhum canal de voz seu bobolhudo!')
  }

  let channel = message.member.voice.channel

  voiceDiscord.joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  })
}

module.exports = {
  test
}