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

function autoConnect() {
  let channels = client.channels.cache;

  let activeChannels = getChannel(channels)

  let audios = getAudios()

  let randomChannel = shuffle(activeChannels.length)
  let randomAudio = shuffle(audios.length)
  console.log(`Entrei na call ${randomChannel}`)
  console.log(`Reproduzi o áudio ${randomAudio}`)

  let channel = activeChannels[0]

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

  setTimeout(autoConnect, 1800000)
}

function commandConnect(message) {
  let userChannel = message.member.voice.channel

  let audio = getAudios()[0]

  const player = voiceDiscord.createAudioPlayer()

  const resource = voiceDiscord.createAudioResource(audio)

  const connection = voiceDiscord.joinVoiceChannel({
    channelId: userChannel.id,
    guildId: userChannel.guild.id,
    adapterCreator: userChannel.guild.voiceAdapterCreator,
  })

  player.play(resource);
  connection.subscribe(player);

  // saída automatica

  player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
    connection.disconnect()
  });
}

client.once("ready", () => {
  console.log('Rapaiz')
})

client.on("ready", () => {
  autoConnect()
})

client.on("messageCreate", message => {
  if (message.content.startsWith('!')) {
    if (message.content.substring(1) == "rapaz" && message.channel.id == "890742579388383273") {
      commandConnect(message)
    }
  }
})

client.login(TOKEN)