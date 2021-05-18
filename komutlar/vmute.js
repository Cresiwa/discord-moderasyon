const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ms = require('ms');
const ayarlar = require("../ayarlar.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

const permError = new MessageEmbed()
    .setColor('RED')
    .setTitle('Başarısız')
    .setAuthor(message.author.tag, message.author.avatarURL({ size:1024, dynamic:true, format: "png"}))
    .setDescription(`Bu Komutu Kullanmak İçin <@&${ayarlar.vmuteYetkilisiRolID}> Yetkisine Sahip Olmalısın!`)

if (!message.member.roles.cache.has(ayarlar.vmuteYetkilisiRolID)) return message.channel.send(permError);

const mutelog = message.guild.channels.cache.find(c => c.id === ayarlar.vmuteLogKanalID)

let kullanici = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, bir kullanıcı etiketle.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini sunucudan mute atılamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir botu sunucudan mute atılamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini sunucudan mute atılamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
let muteler = jdb.get(`voicemute`) || [];
let sure = args[1];
let sebep = args.splice(2).join(" ");
if(!sure) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir zaman belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.voice.channel) kullanici.voice.setMute(true).catch();
let zaman1 = args[1]
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
//
var vakit = zaman1
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");
db.set(`seslide2.${kullanici.user.id}.${message.guild.id}`, vakit)
if (!muteler.some(j => j.id == kullanici.id)) {
kdb.add(`kullanici.${message.author.id}.mute`, 1);
moment.locale("tr");


message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp().setDescription(`${message.author} tarafından ${kullanici} \`${sebep}\` sebebiyle seste susturuldu.`));
message.react('✅')
mutelog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Sesli Odalarda Susturuldu !**\n**Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Kullanıcı:** ${kullanici.user} (\`${kullanici.user.id}\`)\n**Süre:** \`${zaman1}\`\n**Sebep**: \`${sebep}\` \n**Tarih:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\``));
setTimeout(async function() {
kullanici.voice.setMute(false);
mutelog.send(new MessageEmbed().setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`**Sesli Odalarda Susuturlması Kalktı !** \n**Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Kullanıcı:** ${kullanici.user} (\`${kullanici.user.id}\`)\n**Süre:** \`${zaman1}\`\n**Sebep**: \`${sebep}\` \n**Tarih:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\``))}, ms(zaman1));}

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vmute", "seslisustur"],
  permLevel: 0,
}

exports.help = {
  name: "vmute"
};
