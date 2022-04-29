const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { embedColor } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guildname')
        .setDescription('Rename the current guild')
        .addStringOption(option => option.setName('name').setDescription('Enter a name (max 100 characters)').setRequired(true)),
    cooldown: '20',
    guildOnly: true,
    execute (interaction) {
        if (!interaction.guild.me.permissions.has('MANAGE_GUILD')) return interaction.reply({ content: 'Error: Bot permission denied. Enable **MANAGE_GUILD** permission in `Server Settings > Roles` to use this command.' });
        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({ content: 'Error: You have no permission to use this command.' });

        const nameField = interaction.options.getString('name');
            if (nameField.length > '100') return interaction.reply({ content: 'Error: Channel name must be 100 characters or fewer.' });

        const embed = new MessageEmbed()
            .setDescription(`Successfully renamed guild to **${nameField}**`)
            .setColor(embedColor);
        interaction.reply({ embeds: [embed] }).then(interaction.guild.setName(nameField));
    }
};