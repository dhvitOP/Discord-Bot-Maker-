import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
let error = 'https://cdn.discordapp.com/emojis/887026280745291857.png?v=1';
let success = 'https://cdn.discordapp.com/emojis/887029158830567554.png?v=1';
import { MessageEmbed } from 'discord.js';
export default class CcdeleteCommand implements Command {
    name = 'cc-delete';
    summary = `This will delete custom command`;
    precondition: Permission = 'MANAGE_GUILD';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String"];
    optionsname = ['command_name']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
             
          let embed1 = new MessageEmbed()
          .setDescription(`Required A Custom Command Name to Delete`)
          .setColor('RED');
         
          return  ctx.channel.send({embeds: [embed1]});
      }
        const name = args[0];
        if(db.has(`${name}_${ctx.bot.user.id}_${ctx.guild.id}`))
        {
            db.delete(`${name}_${ctx.bot.user.id}_${ctx.guild.id}`);
             
            let embed2 = new MessageEmbed()
          .setDescription(`Successfully Deleted Custom Command`)
          .setColor('GREEN');
           
           return   ctx.channel.send({embeds: [embed2]});
         } else {
         
             let embed3 = new MessageEmbed()
          .setDescription(`Invalid Custom Command`)
          .setColor('RED');
             
             return  ctx.channel.send({embeds: [embed3]});
         }
     
       
    }
}
