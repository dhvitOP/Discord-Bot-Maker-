import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
export default class DashboardCommand implements Command {
    name = 'verify';
    summary = `To verify yourself in this server`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = [];
    optionsname = []
    
    async execute(ctx: CommandContext, ...args: string[]) {
         let rolexd = db.fetch(`verification_${ctx.guild.id}_${ctx.bot.user.id}`);
          if(!rolexd)
        {
        return;
        }
         if (ctx.member?.roles.cache.has(rolexd)) {
          return ctx.msg.delete();
        }
        ctx.member?.roles.add(rolexd);
       let user = ctx.bot.users.cache.get(ctx.member.id);
        user.send(`You have been Successfully Verified in ${ctx.guild.name}`);
        ctx.msg.delete();
    }
}
