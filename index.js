const Discord = require('discord.js')

const voiceDiscord = require('@discordjs/voice')

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES"
  ]
})

const { getChannel, getMembers } = require('./src/services/channel')

const { audiosArray } = require('./src/services/audio')

const { TOKEN } = require('./src/services/token')

let allChannels = client.channels.cache;

let botId = '984227444137545818'

function isConnected() {

  let activeChannels = getChannel(allChannels)
  if (!activeChannels.length) {
    console.log("não tinha ninguem")
    setTimeout(autoConnect, 30000)
    return
  }

  let members = getMembers(activeChannels)

  let retorno = false

  members.forEach(m => {
    m.forEach(p => {
      if (p[0] == botId) {
        retorno = true
      }
    })
  })
  return retorno
}

function shuffle(max) {
  return Math.floor(Math.random() * max)
}

function connect(audio = null, channel = null) {

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
    connection.destroy()
  });
}

function autoConnect() {

  if (isConnected()) {
    return
  }

  let activeChannels = getChannel(allChannels)
  let randomChannel = shuffle(activeChannels.length)
  let randomAudio = shuffle(audiosArray.length)

  let channel = activeChannels[randomChannel]

  let audio = audiosArray[randomAudio].sound

  console.log(`Entrei na call: ${randomChannel}`)
  console.log(`Reproduzi o áudio: ${randomAudio}`)
  console.log(`No servidor ${channel.guild.name}`)

  connect(audio, channel)

  setTimeout(autoConnect, 1800000)
}

function commandConnect(message, chosenAudio) {
  if (isConnected()) {
    return
  }

  let channel = message.member.voice.channel

  let audio = chosenAudio[0].sound

  connect(audio, channel)
}

client.on("ready", () => {
  console.log('Rapaiz')
})


client.on("ready", () => {
  autoConnect()
})

client.on("messageCreate", message => {
  if (message.content.startsWith('!')) {
    if (!message.member.permissions.has('ADMINISTRATOR') && message.channel.id != "890742579388383273") {
      message.reply('você está usando o comando no canal errado! o certo é `💻・comandos`')
      return
    }

    let audioName = message.content.substring(1)
    let chosenAudio = audiosArray.filter(sound => sound.name.toLowerCase() == audioName)

    if (!chosenAudio.length) {
      return message.reply('não encontrei seu comando pateta, se precisar de ajuda digite: `!ajuda`')
    }

    commandConnect(message, chosenAudio)
  }
})

client.on('messageCreate', message => {
  if (message.content.startsWith('!') && message.content.substring(1) == "teste") {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.reply('você não tem permissão pra utilizar esse comando')
      return
    } else if (message.channel.id != "890742579388383273") {
      message.reply('você está usando o comando no canal errado! o certo é `💻・comandos`')
      return
    }
    let channel = message.member.voice.channel

    voiceDiscord.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    })
  }
})

client.login(TOKEN)