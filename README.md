 by JavaScript
# nsfw-filter 
 [![Build Status](https://img.shields.io/badge/Build-NoBuild-blueviolet?logo=github&logoColor=blue&style=social)](https://travis-ci.org/virgel1995/Nsfw-filter)
 [![GitHub package.json version](https://img.shields.io/github/package-json/v/virgel1995/Nsfw-filter?color=aqua&logo=v&logoColor=yellow)](https://gitHub.com/virgel1995/Nsfw-filter)
 [![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/virus-nsfw?color=blue&label=npmDownloads&logo=npm&style=social)](https://www.npmjs.com/package/virus-nsfw)
 [![discord](https://img.shields.io/discord/827294479479472149?color=blue&label=discord&logo=discord&logoColor=aqua&style=social)](https://discord.gg/eenQW67QWp)

A simplified wrapper around Clarifai's NSFW detection.
# Get api key 
[clarifai](https://clarifai.com)

# Features

 * Simplified result, so you don't need to deal with complex objects and arrays.
 * Automatic data recognition, whether it's Base64, a Data URL, or a URL.

# Example

```js
var virusNsfw = require('virus-nsfw');

var filter = new virusNsfw.Filter("YOUR_CLARIFAI_API_KEY_HERE");

function handleResult(result) {
    if (result.sfw) {
        console.log(`This image is A-OK with a confidence of ${result.confidence}.`);
    } else {
        console.log(`This image is NSFW with a confidence of ${result.confidence}.`);
    }
}

function handleError(error) {
    console.error(error);
}

filter.get("https://example.com/example.png").then(handleResult).catch(handleError); // URL
// or // 
filter.get("data:image/png;base64,dGhpc2lzbm90YW5pbWFnZQ==").then(handleResult).catch(handleError); // Data URL
// or // 
filter.get("dGhpc2lzbm90YW5pbWFnZQ==", handleResult).then(handleResult).catch(handleError); // Base64
```


## Setting up your project

First, you'll need to install virus-nsfw via NPM. Use the `--save-dev` flag, so it gets saved into your `package.json` file.

```
npm install --save-dev virus-nsfw
```
Or without save into devDependencies 
```
npm install virus-nsfw
```

First, you'll need to require and initialize FILTER in your code. Use `require('virus-nsfw')`, and then, you'll need to create a new FILTER instance. Here's where your API key comes in.

For security reasons, you shouldn't hardcode your API key into your code, because if you upload it to GitHub, or someone gets the code, they can just read out the key. What we recommend, is storing it in your environment variables. You know, that place where `PATH`, and stuff like that is.

Go ahead and save your API key in an environment variable. Now, when you push the code to GitHub, or upload is somewhere, people can't see it.

After you've securely saved your API key into an environment variable, we can create the virus-nsfw instance. Use `new Filter(process.env.YOUR_ENVIRONMENT_VARIABLE_NAME_HERE)` for that.

```js
var { Filter } = require('virus-nsfw');

var filter = new FILTER(process.env.MYAPP_CLARIFAI_KEY);

```
```kt
Or you can do else 
```
```js
var Nsfw = require("virus-nsfw")
var filter = new Nsfw.Filter(process.env.MYAPP_CLARIFAI_KEY)

```

Congratulations! Now you can predict the NSFWness of images. Let's see an example of how to do that!

```js
var { Filter } = require('virus-nsfw'); 
var filter = new Filter(process.env.MYAPP_CLARIFAI_KEY);
/**
you can do else 
var Nsfw = require("virus-nsfw")
var filter = new Nsfw.Filter("your key")
*/
filter.get("https://example.com/image.png").then(function(result) {
    if (result.sfw) { // If the result is safe for work:
        console.log(`This image is safe for work, with a confidence of ${result.confidence}!`);
    } else { // If the result is not safe for work:
        console.log(`This image is not safe for work, with a confidence of ${result.confidence}!`);
    }
}).catch(function(error) {
    console.error(error); // Print the error to the console.
});
```
# Works with discord

## messages Content
to catch every attachment send or url send 
you need messageCreate message to catch content `interaction` is api endpoint so thats didn't have content just `request, response`
oky let we give you example to do that 
```js
require("dotenv").config();
var { Filter } = require('virus-nsfw'); 
var filter = new Filter(process.env.MYAPP_CLARIFAI_KEY);
//get Client, GatewayIntentBits from discord package 
const { Client, GatewayIntentBits } = require('discord.js');
// create client 
//make sure this intents required to get message content
const client = new Client({ intents: [
GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent] });
// ready event (not required )
client.on("ready", () => {
	console.log(client.user.tag + "is ready")
})
// create messageCreate event (required) to get content
client.on("messageCreate", async (message)=>{
// mage regx to test if content has url
			let regx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
// define content as vaiable
let con = message.content.toLowerCase().replace(/\s+/g, '')
//test function to check content if have url or not
let cdu = regx.test(con)
	//if message has upload attachment
if (message.attachments.size > 0) {
	// get upload attchments if more than or 1
  const [attachments] = message.attachments.values();
	//get attachment url 
const url = attachments ? attachments.url : null;
	// testImage function to check if attachment is nsfw or not
	let test= await testImage(url)
	//if attachment is not nsfw
	if(test.sfw){
		message.channel.send("congratulations your imgae is safe")
	}else {
		//if attachment is nfsw
message.channel.send("sorry your image is not safe")
	}
	console.log(test)
}
//if message has link 
else if (cdu){
	// testImage function to check if content url is nsfw or not
let test = await testImage(con)
if(test.sfw){
// do what you need this image is safe
}
	//do what you need more
console.log(test)
		}
})
// function to test nsfw or not to use it whare i need 
const testImage= async(url)=>{
	let res= filter.get(url).then(function(resulet){
	//console.log(resulet)
	return resulet;
})
	return res;
}
//login your bot 
client.login("your token")
```
## interaction use 

when you need to use it with interactions 
its very easy to make 
you just need to get that target 
`interaction.options.getString("target")`
this gives you the user input or upload from interction options

Example use 
```js
require("dotenv").config();
var { Filter } = require('virus-nsfw'); 
var filter = new Filter(process.env.MYAPP_CLARIFAI_KEY);
interction.run(interaction){
	// get input value from options
let url = interaction.options.getString("url") ;
// filter image url or attachment uploaded from interactions option

filter.get(url).then(function(resulet){
	//if url or attachment is not nsfw
if(resulet.sfw){
	// do what you need 😜
} 
	//if url or attachment is nsfw
else {
	//do what you need 😜
}
});
};
```

if you need more help join our [discord server](https://discord.gg/eenQW67QWp)

# My outhor packages

° [Discord-Virus package](https://www.npmjs.com/package/discord-virus)
° [Bot-Genrator package](https://www.npmjs.com/package/bot-genrator)



made with 💗 by JavaScript
