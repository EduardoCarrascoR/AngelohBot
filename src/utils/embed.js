const { EmbedBuilder } = require("discord.js");

const getEmbed = (data) =>{
    // imagen y texto condition
    if(data.image !== null && data.image !== Array.isArray(data.image) && data.text !== ""){
        const message = new EmbedBuilder()
            .setColor("#6A4219")
            .setURL(data.postLink)
            .setTitle(data.title)
            .setAuthor({ name: data.author })   
            .setDescription(data.text)
            .setImage(data.image)
            .setTimestamp()
            .setFooter({
                text: "ToyChiquito®",
                iconURL:
                "https://64.media.tumblr.com/3193254363a59faca67dff7e4201cf1c/f04117d939002c9d-e2/s128x128u_c1/e1025fe9ca31f90e60c5c506f66301b2b2b1c31d.jpg",
            });
        return message;
    } 

    //  TODO: probablemente vienen un post con video y no muestra, buscar como implementar
    // no imagen y texto condition
    if(data.image == null && data.image !== Array.isArray(data.image) && data.text !== ""){
        const message = new EmbedBuilder()
            .setColor("#6A4219")
            .setURL(data.postLink)
            .setTitle(data.title)
            .setAuthor({ name: data.author })
            .setDescription(data.text)
            .setTimestamp()
            .setFooter({
                text: "ToyChiquito®",
                iconURL:
                "https://64.media.tumblr.com/3193254363a59faca67dff7e4201cf1c/f04117d939002c9d-e2/s128x128u_c1/e1025fe9ca31f90e60c5c506f66301b2b2b1c31d.jpg",
            });
        return message;
    } 
    // imagen y no texto condition
    if(data.image !== null && data.image !== Array.isArray(data.image) && data.text == ""){
        const message = new EmbedBuilder()
            .setColor("#6A4219")
            .setURL(data.postLink)
            .setTitle(data.title)
            .setAuthor({ name: data.author })
            .setImage(data.image)
            .setTimestamp()
            .setFooter({
                text: "ToyChiquito®",
                iconURL:
                "https://64.media.tumblr.com/3193254363a59faca67dff7e4201cf1c/f04117d939002c9d-e2/s128x128u_c1/e1025fe9ca31f90e60c5c506f66301b2b2b1c31d.jpg",
            });
        return message;
    } 
}

module.exports = {
    getEmbed
}