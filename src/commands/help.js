const { Discord } = require('../util/client')

function help(message) {
  const help = new Discord.MessageEmbed()
  .setColor("YELLOW")
  .setTitle("**Ajuda do Xarobot**")
  .setDescription(`Oi, eu sou o Xarobot! Fui feito apenas para ser algo engraçado, sendo assim, eu conto com alguns comandos básicos.
  
       !fale rapaz : entra na call, reproduz o famoso audio "rapazz" e desconecta
       !fale tome : entra na call, reproduz o áudio "tome" e desconecta 
       !fale filho : entra na call, reproduz o áudio "que isso meu filho, calma" e desconecta 
       !fale gosta : entra na call, reproduiz o audio "ele gostaa" e desconecta 
       !fale ui : entra na call, fala o "uiii" e desconecta`)
  return message.reply({ embeds: [help] })
}

module.exports = {
  help
}