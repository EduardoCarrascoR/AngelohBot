const reddit = require("reddit.images");

const memeRedditEng = async() => {
    const data = await reddit.FetchRandomMeme({ searchType: "top" });
    if (data !== undefined && data.image !== Array.isArray(data.image) && data.postLink !== null && ((data.image !== null && data.text === "")||(data.image === null || data.text !== ""))) {
        return await data;
    } else {
        console.log("error en data", data)
    }
}
const memeRedditEsp = async() => {

}
const memeApiMeme = async() => {
    
}

module.exports = {
    memeRedditEng
}