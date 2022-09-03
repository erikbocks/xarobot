const {botConnected} = require('../../services/verifications')
const {shuffle} = require('../shuffle')
const {getChannel} = require('../../util/channel')
const {connect} = require('../../util/connect')
const {client} = require('../../util/client')
const {audiosArray, audioResources} = require('../../util/audio')

let allChannels = client.channels.cache;

function autoConnect() {

  if (botConnected()) {
    return
  }

  let activeChannels = getChannel(allChannels)
  let randomChannel = shuffle(activeChannels.length)
  let randomAudio = audiosArray[shuffle(audiosArray.length)]

  let channel = activeChannels[randomChannel]

  let audio = audioResources[randomAudio.name]

  console.log(`Entrei na call: ${randomChannel}`)
  console.log(`Reproduzi o áudio: ${randomAudio.name}`)
  console.log(`No servidor ${channel.guild.name}`)

  connect(audio, channel)

  setTimeout(autoConnect, 1200000)
}

module.exports = {
  autoConnect
}