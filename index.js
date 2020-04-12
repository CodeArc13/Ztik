
const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js')
const pets = require('./pet_names.js')
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const petNames = pets.petArray

var userArray = ['Arc','Muroidea','ArcsBotTester','honswlos']
//user == 'Arc' || user == 'Muroidea' || user == 'ArcsBotTester'

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

/* prototype command code
client.on('message', message => {
  if (message.content.includes('changeNick')) {
      if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return                   
      message.channel.send('I don\'t have permission to change your nickname!');
      message.member.setNickname(message.content.replace('changeNick ', ''));
  }
});
*/

client.on('presenceUpdate', (oldPresence, newPresence) => {
  console.log(`${newPresence.user.username} ${newPresence.user.presence.status}`);
  var user = newPresence.user.username
  if (userArray.includes(user)) {
    if (newPresence.user.presence.status == 'online') { //these if statements check to see the user was comming from offline to online
      if (typeof oldPresence.status === 'undefined' || oldPresence.status == 'offline') {
        getNewNick(newPresence);
      };
    };
  };
});
// Arc online
client.login(token);