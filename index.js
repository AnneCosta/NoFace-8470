const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const bot = new Discord.Client();

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const activities_list = [
    "with Anne's mind 😈",
    "with food! 🍕",
    "with money! 💰",
    "with BMO 🤖😛",
    "*list-commands",
    "*help comes soon"
];

bot.on('ready', ()=>{
    console.log("Hey, NoFace is on!");
    setInterval(() => {
        const index = Math.floor(Math.random() * activities_list.length);
        bot.user.setActivity(activities_list[index]);
    }, 10000);
});

bot.login(token);

bot.on('message', msg =>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case 'hallo':
            msg.channel.send('hey, ma friend!');
        break;
        case 'serverinfo':
            msg.channel.send(`Nome do Server: ${msg.guild.name}\nTotal de membros: ${msg.guild.memberCount}`);
        break;
        case 'userinfo':
            msg.channel.send(`Seu username: ${msg.author.username}\nSeu ID: ${msg.author.id}`);
        break;
        case 'eu':
            if (!args.length){
                return msg.channel.send(`Você não digitou nenhum argumento, ${msg.author}!`);
            } else if(args[0] === 'quero'){
                return msg.channel.send('melão!').then(sentEmoji=>{
                    sentEmoji.react('🍈');
                });
            } else if(msg.author.id === '516423474097553417' && args[0] === 'amo'){
                msg.channel.send('<@337007366601965578> ♥').then(loveEmoji =>{
                    loveEmoji.react('♥');
                });
            } else if(msg.author.id === '337007366601965578' && args[0] === 'amo'){
                msg.channel.send('<@516423474097553417> ♥').then(loveEmoji =>{
                    loveEmoji.react('♥');
                });
            }
        break;
        case 'list':
            if (!args.length){
                return msg.channel.send(`Você não digitou nenhum argumento, ${msg.author}!`);
            } else if(args[0] === 'emojis'){
                const emojiList = msg.guild.emojis.map(emojis=>emojis.toString()).join(" ");
                return msg.channel.send(emojiList);
            }
        break;
        case 'react':
            msg.react('😄');
        break;
        case 'list-commands':
            msg.channel.send(`${msg.author}, esta é a minha lista de comandos, por ora:\n1. hallo\n2. serverinfo\n3. userinfo\n4. react\n\nE uma referência das antigas...\n5. eu quero\n\n
            Todos esses comandos precisam estar acompanhados do prefixo *`);
        break;
        case 'avatar':
            if (!msg.mentions.users.size) {
                return msg.channel.send(`${msg.author.displayAvatarURL}`);
            }
    
            const avatarList = msg.mentions.users.map(user => {
                return `${user.displayAvatarURL}`;
            });
    
            msg.channel.send(avatarList);
        break;
        case 'kick':
            const taggedUser = msg.mentions.users.first();
            if (!msg.mentions.users.size) {
                return msg.reply('you need to tag a user in order to kick them!');
            }
            else{
                msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
            }
        break;    
    }

    
});

