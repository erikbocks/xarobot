const Discord = require('discord.js')

const voiceDiscord = require('@discordjs/voice')

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES"
  ]
})

module.exports = {
  Discord,
  voiceDiscord,
  client
}