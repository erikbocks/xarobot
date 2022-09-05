const {shuffle} = require('../shuffle')
const {getChannel} = require('../../util/channel')
const {connect} = require('../../util/connect')
const {botConnected} = require('../../services/verifications')
const {client} = require('../../util/client')
const {audiosArray, audioResources} = require('../../util/audio')

let allChannels = client.channels.cache;

function autoConnect() {

  let activeChannels = getChannel(allChannels)
  
  if (!activeChannels.length) {
    console.log("não tinha ninguem")
    return setTimeout(autoConnect, 60000)
  }

  if (botConnected()) {
    console.log('bot conectado')
    return setTimeout(autoConnect, 10000)
  }

  let randomChannel = shuffle(activeChannels.length)
  let randomAudio = audiosArray[shuffle(audiosArray.length)]

  let channel = activeChannels[randomChannel]
  let audio = audioResources[randomAudio.name]

  console.log(`Entrei na call: ${channel.name}`)
  console.log(`No servidor: ${channel.guild.name}`)
  console.log(`Reproduzi o áudio: ${randomAudio.name}`)

  connect(audio, channel.id, channel.guild)

  setTimeout(autoConnect, 1200000)
}

module.exports = {
  autoConnect
}