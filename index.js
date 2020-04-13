
const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js')
const pets = require('./pet_names.js')
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const petNames = pets.petArray

var userArray = ['Arc','Muroidea','ArcsBotTester','honswlos']
//user == 'Arc' || user == 'Muroidea' || user == 'ArcsBotTester'
var responses1 = ['Hello! It is I! ','Sup ','How you doin ']
var responses2 = ['Love you too ','Sorry, just no ','Hmmmm I don\'t know ']

async function getNewNick(newPresence) {
  var chatChannel = client.channels.cache.find(channel => channel.name === 'nerds-hangout')
  try { //catches error when user is server owner or higher role than bot
    var randomNumber = Math.floor(Math.random()*petNames.length);
    var newNick = petNames[randomNumber]
    await newPresence.member.setNickname(newNick);
    chatChannel.send('Hehehe cackle cackle, someone just cast a new pet!... ' + newNick + ' appears!');
  } catch (e) {
    //console.error(e);
    chatChannel.send('I am not worthy master.');
  } 
} 

client.on('ready', () => {
  console.log('I\'m in');
  console.log(client.user.username);
});


client.on('message', message => { 
  if (message.content.includes('ztik') || message.content.includes('Ztik') || message.content.includes('ZTIK')) {
    if (message.content.includes('love') || message.content.includes('Love') || message.content.includes('LOVE')) {
      var randomNumber = Math.floor(Math.random()*responses2.length);   
      message.channel.send(responses2[randomNumber] + message.member.displayName);  
  } else {
      var randomNumber = Math.floor(Math.random()*responses1.length);   
      message.channel.send(responses1[randomNumber] + message.member.displayName);
    }    
  } 
});


client.on('presenceUpdate', (oldPresence, newPresence) => {
  console.log(`${newPresence.user.username} ${newPresence.user.presence.status}`);
  var user = newPresence.user.username
  if (userArray.includes(user)) {
    if (newPresence.user.presence.status == 'online') { //these if statements check to see the user was comming from offline to online
      if (typeof oldPresence === 'undefined' || oldPresence.status == 'offline') {
        getNewNick(newPresence);
      };
    };
  };
});

// Arc online
client.login(token);