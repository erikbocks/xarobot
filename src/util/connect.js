const { voiceDiscord} = require('./client')

function connect(audio = null, channelId = null, channelGuild = null) {

  const player = voiceDiscord.createAudioPlayer() 

  const connection = voiceDiscord.joinVoiceChannel({
    channelId: channelId,
    guildId: channelGuild.id,
    adapterCreator: channelGuild.voiceAdapterCreator,
  })

  connection.subscribe(player);
  player.play(audio.generate());

  // saída automatica

  player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
    connection.destroy()
  });
}

module.exports = {
  connect
}