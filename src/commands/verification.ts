import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
export default class DashboardCommand implements Command {
    name = 'verification';
    summary = `The bot will set your guild/server for verification of new join users`;
    precondition: Permission = 'MANAGE_GUILD';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String", "Role"];
    optionsname = ['option', 'role']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give a module of enable or disable");
      }
      if(args[0] === "enable" || ctx.msg.content.includes("enable"))
      {
       
       let role = ctx.msg.mentions.roles.first();
       if(!role)
       {
        return ctx.channel.send("Give me Valid Role Mention");
       }
       db.set(`verification_${ctx.guild.id}_${ctx.bot.user.id}`, role.id);
       return ctx.channel.send("Done Your Given Role have been set in database");
      } 
      if(args[0] === "disable")
      {
      db.delete(`verification_${ctx.guild.id}_${ctx.bot.user.id}`);
      return ctx.channel.send("Done Deleted Your Database of Verification")
      }
        return ctx.channel.send("Give a Valid Module enable or disable");
    }
}
