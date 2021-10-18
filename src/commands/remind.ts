import { Command, CommandContext, Permission } from './command';
import ms from 'ms';

export default class DashboardCommand implements Command {
    name = 'reminder';
    aliases = ['remind', 'remindme'];
    summary = `The bot will remind you after your given time is completed`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String", "String"];
    optionsname = ['time', 'reason']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give time and reason of reminder");
      }
       let time = args[0]
        if(ms(time) > ms("1w")){

 
         return ctx.channel.send("Give me a time which is lower than 1 week (1w)");
        }
        let reason = args.join(" ").replace(time, "");
        if(!reason)
        {
         return ctx.channel.send("Give a reason for reminder");
        }
        ctx.channel.send("Done Your timer/reminder has been set i will remind you whenever timer goes off");
        setTimeout(async() => {
        ctx.user.send(`Your time for ${reason} of ${time} has been completed`);
        }, ms(time))
        
    }
}
