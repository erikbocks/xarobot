const {client} = require('./src/util/client')
require('dotenv').config()

const {commandConnect} = require('./src/commands/commandConnect')
const {autoConnect} = require('./src/commands/scheduledCommands/autoConnect')
const {help} = require('./src/commands/help')
const {test} = require('./src/commands/test')

const {audiosArray, audioResources} = require('./src/util/audio')

client.on("ready", () => {
  console.log('Rapaiz')
})

// // autoConnect
// client.on("ready", () => {
//   autoConnect()
// })

client.on("messageCreate", message => {
  if (message.content.startsWith('!auto')) {
    autoConnect()
  }
})

// audio por comando
client.on("messageCreate", message => {
  if (message.content.startsWith('!fale')) {
    if (message.guild.id == process.env.idAnjos && message.channel.id != process.env.idComandosAnjos && !message.member.permissions.has('ADMINISTRATOR')) {
      message.reply('você está usando o comando no canal errado! o certo é `💻・comandos`')
      return
    }

    let audioName = message.content.substring(6).toLowerCase()
    let chosenAudio = audiosArray.filter(sound => sound.name.toLowerCase() == audioName)
    if (!chosenAudio.length) {
      return message.reply('não encontrei seu comando pateta, se precisar de ajuda digite: `!ajuda`')
    }
    chosenAudio = audioResources[chosenAudio[0].name]
    let userId = message.author.id

    commandConnect(message, chosenAudio, userId)
  }
})

// !ajuda
client.on("messageCreate", message => {
  if (message.content == '!ajuda') {
    help(message)
  }
})

// interação mention
client.on('messageCreate', message => {
  if (message.mentions.has(process.env.botId)) {
    message.reply('oi! meu prefixo é `!`')
  }
})

// !teste
client.on('messageCreate', message => {
  if (message.content == "&teste") {
    if (message.guild.id == '890734333055365162' && !message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('esse é um comando pra administradores!')
    }
    test(message)
  }})

client.login(process.env.TOKEN)
