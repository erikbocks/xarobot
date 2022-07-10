const { voiceDiscord } = require('./client')
const { createReadStream } = require('node:fs')

let audiosArray =
  [
    { "name": "rapaz", "sound": "src/audios/xaropinho.ogg" },
    { "name": "tome", "sound": "src/audios/tome.ogg" },
    { "name": "filho", "sound": "src/audios/filho.ogg" },
    { "name": "gosta", "sound": "src/audios/gosta.ogg" },
    { "name": "ui", "sound": "src/audios/ui.ogg" }
  ]

// recebe uma stream de audio e retorna um audio resource
function createAudioResource(audioStream) {
  return voiceDiscord.createAudioResource(audioStream, {
    inputType: voiceDiscord.StreamType.OggOpus // desativa a conversão da lib
  })
}

let audioResources = audiosArray.reduce((acc, audio) => {
  const audioStream = createReadStream(audio.sound) // le o arquivo do disco e cria uma stream

  // { chave: 'valor' }
  // atribui pra uma chave um objeto com uma stream de audio e uma função para
  // gerar um audio resource
  acc[audio.name] = {
    audioStream, // próxima stream a ser usada
    generate: () => { // função que gera uma stream
      const resource = createAudioResource(acc[audio.name].audioStream) // gera o resource com a stream existente
      acc[audio.name].audioStream = createReadStream(audio.sound) // lê o arquivo do disco de novo e salva a stream

      return resource
    }
  }
  return acc
}, {})

module.exports = {
  audiosArray,
  audioResources
}