const Discord = require('discord.js');
 
exports.run = (client, message, args) => {
if(!message.member.hasPermission('MANAGE_CHANNELS')) return;

let channel = message.mentions.channels.first() || message.channel;
message.channel.send(`${channel} Adlı Kanalın Kilidi Açıldı.`).then(m => m.delete({timeout: 7000}));

let everyone = message.guild.roles.cache.find(a => a.name === '@everyone');
channel.updateOverwrite(everyone, { 'SEND_MESSAGES': null }, message.author.tag+ ' Tarafında Kilit Açıldı');
channel.send(new Discord.MessageEmbed()
.setColor('GREEN')
.setTitle(channel.name+' Adlı Kanalın Kilidi Açıldı')
.setDescription(`Yetkililer Bu Kanalın Kilidini Kaldırdı!`));

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["unlock"],
  permLevel: 0
};
 
exports.help = {
  name: 'kilitaç'
};