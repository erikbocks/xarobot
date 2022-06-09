const Discord = require('discord.js')

const { getChannel } = require('./src/services/channel')

const { TOKEN } = require('./src/services/token')

const voiceDiscord = require('@discordjs/voice')

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES"
  ]
})

client.on("ready", () => {
  console.log('Rapaiz')
})

client.on("ready", () => {
  let channels = client.channels.cache;

  let activeChannels = getChannel(channels)

  let random = Math.floor(Math.random() * activeChannels.length)
  console.log(random)

  let channel = activeChannels[0]

  const player = voiceDiscord.createAudioPlayer()

  const resource = voiceDiscord.createAudioResource('C:\\Users\\erikb_8d4r3um\\OneDrive\\Área de Trabalho\\projetos teste\\xarobot\\src\\audio\\uepa.mp3')

  const connection = voiceDiscord.joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  })

  player.play(resource);
  connection.subscribe(player);

  // saída automatica

  player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
    connection.destroy()
  });
}
)
client.login(TOKEN)