import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
import { MessageEmbed } from 'discord.js';

export default class DashboardCommand implements Command {
    name = 'anti-swear';
    aliases = ['antiswear']
    summary = `The bot will delete swear words whenever some sends it`;
    precondition: Permission = 'MANAGE_GUILD';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String"];
    optionsname = ["option"];
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
             
          let embed = new MessageEmbed()
          .setDescription(`You need to give wether you need to **enable** or **disable**`)
          .setColor('RED');
         
           return ctx.channel.send({embeds: [embed]}) 
      }
       if(args[0] === 'enable')
       {
       db.set(`anti-swear_${ctx.guild.id}_${ctx.bot.user.id}`, true);
        
           let embed2 = new MessageEmbed()
          .setDescription(`Successfully Enabled Anti-Swear`)
          .setColor('GREEN')
           ctx.channel.send({embeds: [embed2]}) 
           return;
       }
       if(args[0] === 'disable')
       {
       db.delete(`anti-swear_${ctx.guild.id}_${ctx.bot.user.id}`);
        
           let embed3 = new MessageEmbed()
          .setDescription(`Successfully disabled Anti-Swear`)
          .setColor('GREEN');
           
          return ctx.channel.send({embeds: [embed3]}); 
           
       }
       
        let embed4 = new MessageEmbed()
          .setDescription(`You need to give wether you need to **enable** or **disable**`)
          .setColor('RED');
    
        return  ctx.channel.send({embeds: [embed4]});
    }
}
