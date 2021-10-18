import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
export default class DashboardCommand implements Command {
    name = 'chatbot-enable';
    summary = `To enable chatbot in your server`;
    precondition: Permission = 'ADMINISTRATOR';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["Channel"];
    optionsname = ['channel']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give a channel to save in database");
      }
        let channel = ctx.msg.mentions.channels.first();
        if(!channel) return ctx.channel.send("Give me a valid channel mention");
       db.set(`chatbot_${ctx.guild.id}_${ctx.bot.user.id}`, channel.id);
       ctx.channel.send("Your ChatBot Is Online Now");
    }
}
