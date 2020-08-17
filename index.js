require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: false });
client.login("TOKEN");
const fetch = require("node-fetch");
const fs = require('fs')

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return;
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Ping yollandı! Cevap bekleniyor...")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`u!uptime + u!davet • Database temizlendi!`) //${db.get("linkler").length} Bot uptime ediliyor.`)
  console.log(`Logined`)
})

const ekli = new discord.RichEmbed()
.setColor("RED")
.setDescription("**:x: Bu bot zaten sistemde mevcut!**")
const linkyok = new discord.RichEmbed()
.setColor("RED")
.setDescription("**:x: Bir link belirtmelisin!**")
const ekle = new discord.RichEmbed()
.setColor("GREEN")
.setDescription(":white_check_mark: **Bot başarıyla sisteme eklendi!**")
client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u!uptime") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send(ekli)
    message.channel.send(ekle);
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send(linkyok)
  })
  }
})

const uptime = new discord.RichEmbed()
.setColor("GRAY")
.setDescription(`:arrows_counterclockwise: **${db.get("linkler").length}** adet bot şuan uptime ediliyor.`)
.setFooter("Uptimer")
.setThumbnail(client.avatarURL)
client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u!say") {
  var link = spl[1]
 message.channel.send(uptime)
}})
const davet = new discord.RichEmbed()
.setDescription("**» [Beni Ekle](https://discordapp.com/oauth2/authorize?client_id=739461377563033722&scope=bot&permissions=8)\n» [Destek Sunucum](https://discord.gg/Tw7kMJ9)**")
.setTitle("Uptimer")
.setThumbnail(client.avatarURL)
client.on("message", message => {
  if(message.author.bot) return;
  var davet2 = message.content.split(" ");
  if(davet2[0] == "u!davet") {
  var davet2 = davet2[1]
 message.channel.send(davet)
}})

const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "u!yardım") {
let embed = new Discord.RichEmbed()
.setThumbnail(client.avatarURL)
.addField(`Uptimer | Komutlar`,`
u!yardım \`•\` Yardım menüsünü görüntüler.
u!uptime \`•\` Belirttiğiniz bağlantıyı sisteme ekler.
u!say \`•\` Sistemdeki bağlantı sayısını gösterir.
u!davet \`•\` Botu sunucunuza eklmenizi sağlar.`)
.setColor("BLACK")
return message.channel.send(embed);
    }
 
})
