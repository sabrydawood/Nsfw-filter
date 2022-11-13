var FILTER = require("../index");

var filter = new FILTER(process.env.Key);

filter.predict("https://media.discordapp.net/attachments/1026208224036261939/1041140542345596988/image0.jpg").then(function(result) {
    console.log(result);
}).catch(function(error) {
    var censoredError = error;
    censoredError.request._header = "<hidden>";
    console.error(censoredError);
    process.exit(1);
});