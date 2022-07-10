const { voiceDiscord} = require('./client')

function connect(audio = null, channel = null) {

  const player = voiceDiscord.createAudioPlayer() 

  const connection = voiceDiscord.joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
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