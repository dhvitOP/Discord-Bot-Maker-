import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
import { MessageEmbed } from 'discord.js'
;export default class DashboardCommand implements Command {
    name = 'messages';
    summary = `The bot will show you your total messages in the messaged server`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';

    
    async execute(ctx: CommandContext, ...args: string[]) {
     let messages = db.fetch(`msg_${ctx.user.id}_${ctx.bot.user.id}_${ctx.guild.id}`)
     let embed = new MessageEmbed()
     .setTitle(`${ctx.user.tag} Messages in ${ctx.guild.name}`)
     .setDescription(`${!messages ? 0 : messages} Messages Sent in ${ctx.guild.name} by ${ctx.user.tag}`)
     ctx.channel.send({embeds: [embed]});
    }
}
