import { Command, CommandContext, Permission } from './command';
import { MessageEmbed } from 'discord.js';
export default class HelpCommand implements Command {
    name = 'help';
    summary = 'Send help...';
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    
    execute = async(ctx: CommandContext) => {
         const embed = new MessageEmbed()
       .setTitle('Commands List')
       .addField('Moderation', '`warn`, `warnings`, `ban`, `clear`, `kick`, `lock`, `unlock`, `prefix`, `say`, `poll`, `announce`', true)
       .addField('Verification', '`verification`, `verify`')
       .addField("Custom Commands", '`cc-create`, `cc-delete`', true)
       .addField("Anti Link", "`antilink-enable`, `antilink-disable`", true)
       .addField('Auto Role', '`auto-role`', true)
       .addField("Anti Swear", "`anti-swear`", true)
       .addField('Welcome and Leave', '`welcome`, `leave`', true)
       .addField('General', '`help`, `ping`, `invite`, `stats`', true)
       .addField('Utility', ' `flip`, `roleinfo`, `serverinfo`, `afk`, `avatar`, `calc`, `translate`, `wiki`, `remind`, `weather`, `messages`', true)
         .addField('Economy', '`balance`')
         .addField('Music', '`play`, `skip`, `queue`, `shuffle`, `resume`, `pause`, `volume`, `stop`, `np`, `lyrics`', true)
         .addField('Bot Customization', '`create`, `delete`, `status`, `stop`, `start`', true)
        .setFooter('Music Added');
      
        await ctx.channel.send({ embeds: [embed] });
    }
}
