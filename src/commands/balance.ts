import { Command, CommandContext, Permission } from './command';
import { MessageEmbed } from 'discord.js';
import db from 'quick.db';
export default class DashboardCommand implements Command {
    name = 'balance';
    summary = `The bot will show you your balance`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    
    
    async execute(ctx: CommandContext, ...args: string[]) {
    
       let bank = db.fetch(`bank_${ctx.guild.id}_${ctx.bot.user.id}_${ctx.member.id}`);
       let money = db.fetch(`money_${ctx.guild.id}_${ctx.bot.user.id}_${ctx.member.id}`);
       const embed = new MessageEmbed()
       .setTitle(`Balance of ${ctx.member.tag}`)
       .addField("Wallet", `${money}`)
       .addField("Bank", `${bank}`)
       .addField("Total", `${bank + money}`)
       .setColor('BLUE')
       ctx.channel.send({embeds: [embed]});
       }
}
