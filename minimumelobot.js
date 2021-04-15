var apiKey = "amkfmvNNJ9M7aCfj"
'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('https');
var ign;
var api;

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if(msg.author.bot) return;
  else if (msg.content.substring(0,4) == '=ign'){
    // get their ranked stats
    ign = msg.content.substring(5,msg.content.length)
    https.get('https://statsify.net/api/ranked/player?key=' + apiKey + '&player=' + ign, (resp) => {
    let data = '';
    
    resp.on("data", (chunk) =>{
      data += chunk;
    })
    
    resp.on("end", () => {
      api = JSON.parse(data);
      try{
        api.player.username
        if(api.player.stats.elo <= 600 && api.player.username != "Kelvin_prankz"){
          msg.channel.send(api.player.username + " has less than 600 elo");
          msg.member.kick();
          try{
            msg.author.send(`You got kicked for having ${api.player.stats.elo} elo`)
          } 
          catch(err){
            console.log(err)
            msg.channel.send(`Unable to message ${msg.author} that they had ${api.player.stats.elo}`)
          }
        }
        else{
          let bedwars = msg.guild.roles.cache.find(r => r.name === "bedwars");
          msg.member.roles.add(bedwars).catch(console.error);
          msg.channel.send(`you are loved in the world <3`)
        }
      }
      catch(Error) {
        console.log(Error)
        console.log("invalid ign (you might not be rank bedwars verified)")
      }
    })

  }).on("error", (err) => {
    msg.channel.send(err)
  })
  }
});

client.on('guildMemberAdd', async member => {
  client.channels.cache.get("enter-desired-channel-id").send(`Welcome to the server, ${member} do =ign and then your ign to get the bedwars role in this server`);
});

client.login('client-token');
