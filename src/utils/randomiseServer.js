const servers = require("../enums/memeServers")

const randomServer = () => {

    const random = Math.floor(Math.random() * Object.keys(servers.MemeServers).length)
    console.log("datos", servers.MemeServers,"largo:", Object.keys(servers.MemeServers).length,"random: ", random, "server: ",Object.keys(servers.MemeServers).find((key) => {
        if(servers.MemeServers[key] === random) return key
    }));


}
module.exports = {
    randomServer
}