const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.on('message', message => {
  if (message.content === '!avatar') {
    message.reply(message.author.avatarURL);
  }
});

client.on('message', message => {
  if (message.content === '!info') {
    const embed = new RichEmbed()
      .setTitle('RetriesBot')
      .setColor(0xFF0000)
      .setDescription('**Discord** - https://discord.gg/wHM9K56');
      .setFooter('Created by BradenTheAngel.')
    message.channel.send(embed);
  }
});

client.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith('!kick')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to kick the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this guild!');
      }
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});

client.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith('!ban')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to ban the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this guild!');
      }
    } else {
      message.reply('You didn\'t mention the user to ban!');
    }
  }
});

client.login('CENSORED');
