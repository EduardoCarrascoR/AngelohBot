const service = require("../services/service");
const embed = require("../utils/embed");
require("dotenv").config();

const postMeme = async(serverMeme, client) => {

    switch (serverMeme) {
        // Reddit Meme 
        case "Reddit":
            await service.memeReddit()
                .then(async (data) => {
                    let message
                    if(data !== undefined){
                        message = embed.getEmbed(data, serverMeme);
                        await client.channels.cache
                            .get(process.env.CHANNEL_ID)
                            .send({ embeds: [message] });
                    }
                })
                .catch(err => console.log(err));

            break;
        // Jaidefinichon Meme 
        case "Jaidefinichon":
            await service.memeJaidefinichon()
                .then(async (data) => {
                    let message
                    if(data !== undefined){
                        message = embed.getEmbed(data, serverMeme);
                        await client.channels.cache
                            .get(process.env.CHANNEL_ID)
                            .send({ embeds: [message] });
                    }
                })
                .catch(err => console.log("error en consulta: ", err));
            
            break;
    }
};

module.exports = {
    postMeme
}
