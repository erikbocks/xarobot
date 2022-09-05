const { client } = require('./src/util/client')
require('dotenv').config()

const { createCommands } = require('./src/util/commands')
const { commandConnect } = require('./src/commands/commandConnect')
const { autoConnect } = require('./src/commands/scheduledCommands/autoConnect')
const { help } = require('./src/commands/help')
const { test } = require('./src/commands/test')
const { audiosArray, audioResources } = require('./src/util/audio')

client.on("ready", () => {
  console.log('Rapaiz')
  createCommands(client.guilds.cache.map(guild => guild.id))
  console.log('Comandos criados')
})

// autoConnect
client.on("ready", () => {
  try {
    autoConnect()
  } catch (e) {
    console.error(e)
  }
})

// audio por comando
client.on("interactionCreate", interaction => {
  if (interaction.commandName === "fale") {

    let audioName = interaction.options._hoistedOptions[0].value
    let chosenAudio = audiosArray.filter(sound => sound.name.toLowerCase() == audioName)
    chosenAudio = audioResources[chosenAudio[0].name]
    let userId = interaction.member.id

    try {
      commandConnect(interaction, chosenAudio, userId)
    } catch (e) {
      console.error(e)
    }
  }
})

// ajuda
client.on("interactionCreate", interaction => {
  if (interaction.commandName === 'ajuda') {
    try {
      help(interaction)
    } catch (e) {
      console.error(e)
    }

  }
})

// interação mention
client.on('messageCreate', message => {
  if (message.mentions.has(process.env.botId)) {
    message.reply('oi! para ter acesso aos meus comandos, use a `/`')
  }
})

// teste
client.on('messageCreate', message => {
  if (message.content == "&teste") {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('esse é um comando pra administradores!')
    }
    try {
      test(message)
    } catch (e) {
      console.error(e)
    }
  }
})

client.login(process.env.TOKEN)
