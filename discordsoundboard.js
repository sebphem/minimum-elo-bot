const Discord = require('discord.js');
const client = new Discord.Client();
const path = require(`path`);

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async msg => {
    if(msg.author.bot) return;
    if(!msg.guild) return;
    let args = msg.content.split(` `);
    console.log(args)
    if(msg.content == 'wingmanJOIN'){
        if(msg.member.voice.channel){
            try{
                msg.member.voice.channel.join().then( (connection) => {
                    const dispatcher = connection.play(path.join(__dirname, `joinvc.m4a`));
                });
            }
            catch{
                console.error();
            }
        }
    }
    if(msg.content == 'wingmanLEAVE'){
        if(msg.member.voice.channel){
            try{
                msg.member.voice.channel.leave();
            }
            catch{
                console.error();
            }
        }
    }
    if(args[0] == 'wingmanPLAY'){
        let vc = msg.member.voice.channel;
        if(!vc){
            msg.channel.send(`youre not in vc`);
        }
        else{
            switch(args[1]){
                case `prompt1`:
                    msg.member.voice.channel.join().then( (connection) => {
                        const dispatcher = connection.play('.\prompt1.m4a');
                    });
                    break;
                case `prompt2`:
                    msg.member.voice.channel.join().then( (connection) => {
                        const dispatcher = connection.play('.\prompt2.m4a');
                    });
                    break;
                case `yes`:
                    msg.member.voice.channel.join().then( (connection) => {
                        const dispatcher = connection.play('.\yes.m4a');
                    });
                    break;
                case `no`:
                    msg.member.voice.channel.join().then( (connection) => {
                        const dispatcher = connection.play('.\no.m4a');
                    });
                    break;
            }
        }
    }
})

client.login(`client-token`);
