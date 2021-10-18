import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
let error = 'https://cdn.discordapp.com/emojis/887026280745291857.png?v=1';
let success = 'https://cdn.discordapp.com/emojis/887029158830567554.png?v=1';
import { MessageEmbed } from 'discord.js';
export default class DashboardCommand implements Command {
    name = 'auto-role';
    aliases = ['ar'];
    summary = `The bot will give the given role whenever a user joins the server`;
    precondition: Permission = 'MANAGE_GUILD';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["Role"];
    optionsname = ['role']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            
          let embed1 = new MessageEmbed()
          .setDescription(`You need to Provide a Role`)
          .setColor('RED');
        
         return   ctx.channel.send({embeds: [embed1]});
      }
        var role = ctx.msg.mentions.roles.first();
        if(!role)
            {
                
                let embed2 = new MessageEmbed()
          .setDescription(`You need to Provide a Valid Role`)
          .setColor('RED');
               
               return   ctx.channel.send({embeds: [embed2]});
            }
        db.set(`roleaj_${ctx.guild.id}_${ctx.bot.user.id}`, role.id);
        
        let embed3 = new MessageEmbed()
          .setDescription(`${role} will be provided when anyone joins`)
          .setColor('GREEN');
       
        return  ctx.channel.send({embeds: [embed3]});
    }
}
