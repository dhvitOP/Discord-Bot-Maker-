import { Command, CommandContext, Permission } from './command';
import { MessageEmbed } from 'discord.js';
import { getRoleFromMention } from '../utils/command-utils';

export default class RoleCommand implements Command {
  precondition: Permission = '';
  name = 'role';
  aliases = ['roleinfo', "ri"];
  summary = 'Get info about a specific role';
  cooldown = 1;
  usage = 'role [role]';
  module = 'General';
   options = ["Role"];
    optionsname = ['role']
  execute = async(ctx: CommandContext, roleMention: string) => {
    const role = ctx.msg.mentions.roles.first();
    
    const emojiBoolean = (condition) => condition ? '✅' : '❌';
   const embed = new MessageEmbed()
.setTitle(`@${role.name}`)

   embed.addFields(

        { name: 'ID', value: `\`${role.id}\``, inline: true },

        { name: 'Created', value: `\`${role.createdAt.toDateString()}\``, inline: true },

        { name: 'Position', value: `\`${role.position}\``, inline: true },

        { name: 'Members', value: `\`${role.members.size}\``, inline: true },

        { name: 'Mentionable', value: emojiBoolean(role.mentionable), inline: true },

        { name: 'Hoisted', value: emojiBoolean(role.hoist), inline: true },

        { name: 'Managed', value: emojiBoolean(role.managed), inline: true },

      );

    embed.setThumbnail(ctx.guild.iconURL());
    return ctx.channel.send({embeds: [embed]});
  }
}