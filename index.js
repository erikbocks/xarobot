const Discord = require('discord.js')

const { getChannel } = require('./src/services/channel')

const { getAudios } = require('./src/services/audio')

const { TOKEN } = require('./src/services/token')

const voiceDiscord = require('@discordjs/voice')

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES"
  ]
})

function shuffle(max) {
  return Math.floor(Math.random() * max)
}

function connect( ) {
  let channels = client.channels.cache;

  let activeChannels = getChannel(channels)

  let audios = getAudios()

  let randomChannel = shuffle(activeChannels.length)
  let randomAudio = shuffle(audios.length)
  console.log(`Entrei na call ${randomChannel}`)
  console.log(`Reproduzi o áudio ${randomAudio}`)

  let channel = activeChannels[randomChannel]

  let audio = audios[randomAudio]

  const player = voiceDiscord.createAudioPlayer()

  const resource = voiceDiscord.createAudioResource(audio)

  const connection = voiceDiscord.joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  })

  player.play(resource);
  connection.subscribe(player);

  // saída automatica

  player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
    connection.disconnect()
  });

  setTimeout(connect, 600000)
}

client.on("ready", () => {
  console.log('Rapaiz')
})

client.on("ready", () => {
  connect()
})

client.login(TOKEN)