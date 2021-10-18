import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
let error = 'https://cdn.discordapp.com/emojis/887026280745291857.png?v=1';
let success = 'https://cdn.discordapp.com/emojis/887029158830567554.png?v=1';
import { MessageEmbed } from 'discord.js';
export default class WelcomeCommand implements Command {
    name = 'antilink-enable';

    summary = `The bot will disable sending links in server`;
    precondition: Permission = 'MANAGE_GUILD';
    cooldown = 3;
    module = 'General';
    usage = 'say words';

    
    async execute(ctx: CommandContext, ...args: string[]) {
     db.set(`antilink_${ctx.guild.id}_${ctx.bot.user.id}`, true);
   
        let embed = new MessageEmbed()
        .setDescription(`Successfully Enabled Anti-link`)
        .setColor('GREEN');
      
        
         return ctx.channel.send({embeds: [embed]});
    }
}
