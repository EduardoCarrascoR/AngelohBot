const servers = require("../enums/memeServers");

const randomServer = () => {
  const random = Math.floor(
    Math.random() * Object.keys(servers.MemeServers).length
  );
  const server = Object.keys(servers.MemeServers).find((key) => {
    if (servers.MemeServers[key] === random) return key;
  });
  return server;
};
module.exports = {
  randomServer,
};
