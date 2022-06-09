const Discord = require('discord.js')

const voiceDiscord = require('@discordjs/voice')

const TOKEN = 'OTg0MjI3NDQ0MTM3NTQ1ODE4.GmNGZN.T7_jcwpN-_7FtGzTVenKvPH9ySXCMW7ltpYFV8'

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
  let channel = client.channels.cache.get('890762496665853973');

  const player = voiceDiscord.createAudioPlayer()

  const resource = voiceDiscord.createAudioResource('C:\\Users\\erikb_8d4r3um\\OneDrive\\Área de Trabalho\\projetos teste\\xarobot\\src\\audio\\xaropinho.mp3')
  
  if(channel.members.size >= 1) {
    const connection = voiceDiscord.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    })

    player.play(resource);
    connection.subscribe(player);

    // saída automatica

    player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });
  } else {
    console.log("nao tinha ninguem")
  }
})
client.login(TOKEN)