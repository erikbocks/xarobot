const { client } = require('./client')

function createCommands(id) {
  const guild = client.guilds.cache.get(id)
  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application.commands
  }

  // fale 
  commands.create({
    name: "fale",
    description: "Reproduz frases famosas da sonoplastia brasileira!",
    options: [
      {
        name: "audio",
        description: "Escolha um dos áudios acima:",
        required: true,
        type: 3,
        choices: [
          {
            name: "Rapaiz",
            value: "rapaz"
          },
          {
            name: "Tome",
            value: "tome"
          },
          {
            name: "Que isso meu filho, calma",
            value: "filho"
          },
          {
            name: "Ele gosta",
            value: "gosta"
          },
          {
            name: "Uii",
            value: "ui"
          },
        ]
      }
    ]
  })

  // ajuda
  commands.create({
    name: "ajuda",
    description: "Exibe um texto listando todas as funções do bot."
  })
}

module.exports = {
  createCommands
}