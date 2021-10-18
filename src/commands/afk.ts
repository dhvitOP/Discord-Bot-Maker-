import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
import { MessageEmbed } from 'discord.js';
let error = 'https://cdn.discordapp.com/emojis/887026280745291857.png?v=1';
let success = 'https://cdn.discordapp.com/emojis/887029158830567554.png?v=1';
export default class DashboardCommand implements Command {
    name = 'afk';
    summary = `Afk with message in mention`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String"];
    optionsname = ['reason']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            
          let embed1 = new MessageEmbed()
                    .setDescription(` Required a AFK Reason`)
                    
          ctx.channel.send({ embeds: [embed1] })
          return;
      }
      if(db.has(`afk_${ctx.user.id}_${ctx.bot.user.id}_${ctx.guild.id}`))
      {
       
          let embed2 = new MessageEmbed()
                    .setDescription(`  You are currently AFK`)
                    
          ctx.channel.send({ embeds: [embed2] });
          return;
      }
     
        db.set(`afk_${ctx.member.id}_${ctx.bot.user.id}_${ctx.guild.id}`, args?.join(" "));
         
         
        let afk = new MessageEmbed()
                    .setDescription(`  You have been marked as AFK!`)
        .setFooter(`Reason: ${args?.join(" ")}`)
                   
        ctx.channel.send({ embeds: [afk] })
        return;
    }
}
