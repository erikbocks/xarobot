function getChannel(channels) {

  let array = []

  for (const c of channels.values()) {
    if (c.type == "GUILD_VOICE" && c.members.size > 0) {
      array.push(c);
    }
  }

  return array
}

function getMembers(activeChannels) {

  let members = []

  for (const m of activeChannels.values()) {
    members.push(Array.from(m.members))
  }

  return members
}

module.exports = {
  getChannel,
  getMembers
}