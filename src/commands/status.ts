import { Command, CommandContext, Permission } from './command';
import Bots from '../data/bots';
import Deps from '../utils/deps';
export default class DashboardCommand implements Command {
    name = 'status';
    summary = `The bot will change status to your given`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String"];
    optionsname = ['status']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give something to set it in status")
      }
        const bots = Deps.get<Bots>(Bots);
         const breh = await bots.get(ctx.bot.user);
          if(breh.ownerId === ctx.member.id)
          {
           await ctx.bot.user?.setPresence({ activities: [{ name: `${args?.join(" ")}` }] });
              ctx.channel.send("status changed");
          } else {
          ctx.channel.send("You should be owner of this bot to change the status")
          }
    }
}
