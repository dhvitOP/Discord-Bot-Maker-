import { Command, CommandContext, Permission } from './command';
import { MessageEmbed } from 'discord.js';
let error = 'https://cdn.discordapp.com/emojis/887026280745291857.png?v=1';
let success = 'https://cdn.discordapp.com/emojis/887029158830567554.png?v=1';
export default class DashboardCommand implements Command {
    name = 'announce';
    summary = `The bot will announce your given statement in embed`;
    precondition: Permission = 'ADMINISTRATOR';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String", "Channel"];
    optionsname = ['statement', 'channel']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
          let embed = new MessageEmbed()
          .setDescription(`You have to give me a statement to announce`)
          .setColor('RED')
            return ctx.channel.send({embeds: [embed]});
      }
        try {
       const embed = new MessageEmbed()
       .setTitle("Announcement")
       .setDescription(`**${args?.join(" ")}**`)
       
       ctx.msg.delete();
        return ctx.channel.send({embeds: [embed]});
        } catch (err)
            {
                ctx.channel.send(err)
            }
    }
}
