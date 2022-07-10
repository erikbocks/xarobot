const { voiceDiscord } = require('../util/client')

function test(message) {
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