const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../ayarlar.json')

module.exports = client => {
  var cresiwa = [

    " cresiwa` ❤️",
    "Şapşik` ❤️ "

  ]

  setInterval(function() {
    var degisenOynuyor1 = cresiwa[Math.floor(Math.random() * (cresiwa.length))]
    client.user.setActivity(`${degisenOynuyor1}`);

}, 2 * 30000);

  client.user.setStatus("online"); //dnd, idle, online, offline


  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`);
  console.log(`• Cresiwa Altyapı Başlatılıyor...`);
  console.log(`• Komutlar Başarıyla Yüklendi!`);
  console.log(`• Discorda Başarıyla Bağlandı!`);
  console.log(`• Oynuyor Başarıyla Ayarlandı!`);
  console.log(
    `• ` +
      client.channels.size +
      ` Kanala, ` +
      client.guilds.cache.size +
      ` Sunucuya ve ` +
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString() +
      ` Kullanıcıya Hizmet Veriliyor!`
  );
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`);
};

