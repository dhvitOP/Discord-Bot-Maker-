import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
export default class DashboardCommand implements Command {
    name = 'chatbot-disable';
    summary = `To disable chatbot in your server`;
    precondition: Permission = 'ADMINISTRATOR';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = [];
    optionsname = []
    
    async execute(ctx: CommandContext, ...args: string[]) {
  
        
       db.delete(`chatbot_${ctx.guild.id}_${ctx.bot.user.id}`);
       ctx.channel.send("Your ChatBot Is Offline Now");
    }
}
