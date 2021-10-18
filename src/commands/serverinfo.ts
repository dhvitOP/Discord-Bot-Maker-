import { Command, CommandContext, Permission } from './command';
import { MessageEmbed } from 'discord.js';

export default class ServerCommand implements Command {
  precondition: Permission = '';
  name = 'server';
  aliases = ['serverinfo', "si"];
  summary = 'Get stats about your server';
  cooldown = 1;
  module = 'General';
  
  execute = async(ctx: CommandContext) => {
      const embed = new MessageEmbed()
        
      embed.setTitle(`**__${ctx.guild.name}__**`)

      embed.addFields(

        { name: 'Channels', value: `\`${ctx.guild.channels.cache.size}\``, inline: true },

        { name: 'Created', value: `\`${ctx.guild.createdAt.toDateString()}\``,  inline: true },

        { name: 'ID', value: `\`${ctx.guild.id}\``, inline: true },

        { name: 'Members', value: `\`${ctx.guild.approximateMemberCount}\``, inline: true },

        { name: 'Owner', value: `<@!${ctx.guild.ownerId}>`, inline: true },

        { name: 'Roles', value: `\`${ctx.guild.roles.cache.size}\``, inline: true }

      );

      

    embed.setThumbnail(ctx.guild.iconURL())
    return ctx.channel.send({embeds: [embed]});
  }
}