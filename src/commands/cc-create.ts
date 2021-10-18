import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
let error = 'https://cdn.discordapp.com/emojis/887026280745291857.png?v=1';
let success = 'https://cdn.discordapp.com/emojis/887029158830567554.png?v=1';
import { MessageEmbed } from 'discord.js';
export default class CccreateCommand implements Command {
    name = 'cc-create';
    summary = `This will create custom command`;
    precondition: Permission = 'MANAGE_GUILD';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String", "String"];
    optionsname = ['command_name', 'command_response']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
           
          let embed1 = new MessageEmbed()
          .setDescription(`You need to give a Response and Command Name`)
          .setColor('RED')
          ctx.channel.send({embeds: [embed1]});
          return;
      }
        const name = args[0];
        const response = args?.join(" ").replace(name, "");
        if(!args[1])
        {
        
            let embed2 = new MessageEmbed()
          .setDescription(`You need to give a Response for your Custom Command`)
          .setColor('RED')
            ctx.channel.send({embeds: [embed2]});
             return;
        }
        db.set(`${name}_${ctx.bot.user.id}_${ctx.guild.id}`, response);
  
        let embed3 = new MessageEmbed()
          .setDescription(`Custom Command Created Successfully`)
          .setColor('GREEN')
        ctx.channel.send({embeds: [embed3]});
         return;
    }
}
