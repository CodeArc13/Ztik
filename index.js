const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js')
const pets = require('./pet_names.js')
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const petNames = pets.petArray


client.on('ready', () => {
  console.log('I\'m in');
  console.log(client.user.username);
});

//client.on('message', message => {
//  if (message.content.includes('changeNick')) {
//      if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return                   message.channel.send('I don\'t have permission to change your nickname!');
//      message.member.setNickname(message.content.replace('changeNick ', ''));
//  }
//});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
  console.log(`${newPresence.user.username} ${newPresence.user.presence.status}`);
  var user = newPresence.user.username
  if (user == 'Arc' || user == 'Muroidea') {
    console.log(oldPresence.status);
    console.log(newPresence.user.presence.status);
    if (newPresence.user.presence.status == 'online') {
      if (oldPresence.status == 'offline') {
        try { //catches error when user is server owner or higher role than bot
          var randomNumber = Math.floor(Math.random()*petNames.length);
          var newNick = petNames[randomNumber]
          await newPresence.member.setNickname(newNick);
          client.channels.cache.find(channel => channel.name === 'nerds-hangout').send('Hehehe cackle cackle, someone just cast a new pet!... ' + newNick + ' appears!');
        } catch (e) {
          //console.error(e);
          return client.channels.cache.find(channel => channel.name === 'nerds-hangout').send('I am not worthy master.');
        }
      };
    };
  };
});
// Arc online


client.login(token);