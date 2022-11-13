var Nsfw = require("../index");

var filter = new Nsfw.Filter(process.env.Key);

filter.get("https://media.discordapp.net/attachments/1026208224036261939/1041140542345596988/image0.jpg").then(function(result) {
    console.log(result);
}).catch(function(error) {
    var censoredError = error;
    censoredError.request._header = "<hidden>";
    console.error(censoredError);
    process.exit(1);
});