function getChannel(channels) {

  var array = [];

  for (const c of channels.values()) {
    if (c.type == "GUILD_VOICE" && c.members.size > 0) {
      array.push(c);
    }
  }

  return array
}

module.exports = {
  getChannel
}