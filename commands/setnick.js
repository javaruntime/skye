const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'setnick',
    description: 'Change other user\'s nickname',
    cooldown: '3',
    usage: '{@user} {nickname}',
    execute (message, args) {
		if (!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('You have no permission to use this command.');
			const user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
                if (user.hasPermission('MANAGE_NICKNAMES')) return message.reply('You have no permission to use this command.');

            const nickname = args.join(' ').slice(22);
            if (!nickname) {
                return message.channel.send('Please enter a valid username to change.');
            }

            const embed = new MessageEmbed()
                .setDescription(`User ${user}'s nickname has been changed!`)
                .setColor(message.guild.me.displayHexColor)
                .setTimestamp();
            message.channel.send(embed).then(user.setNickname(nickname));
        }
    };