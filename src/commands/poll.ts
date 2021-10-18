import { Command, CommandContext, Permission } from './command';
import { MessageEmbed } from 'discord.js';
export default class DashboardCommand implements Command {
    name = 'poll';
    summary = `The bot will send a poll on your given statement`;
    precondition: Permission = 'MANAGE_GUILD';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String"];
    optionsname = ['statement']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give a statement to poll on it");
      }
      const question = args?.join(" ");

    const embed = new MessageEmbed()
      .setAuthor(`Created By ${ctx.user.tag}`)
      .setDescription(question);
      embed.footer = null;
        return ctx.channel.send({embeds: [embed]}).then(msg => {
       msg.react("👍");
     msg.react("👎");
      msg.react("🤷");
        })
    }
}
