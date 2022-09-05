const { Discord } = require('../util/client')

function help(message) {
  const help = new Discord.MessageEmbed()
  .setColor("YELLOW")
  .setTitle("**Ajuda do Xarobot**")
  .setDescription(`Oi, eu sou o Xarobot! Fui criado apenas para ser um bot engraçado que reproduz áudios de programas da tv brasileira, sendo assim, eu conto com apenas uma função.
  
       /fale : abre um seletor onde o usuário escolhe um áudio para tocar na call.`)
  return message.reply({ embeds: [help] })
}

module.exports = {
  help
}