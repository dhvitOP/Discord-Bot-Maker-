import { Command, CommandContext, Permission } from './command';

export default class DashboardCommand implements Command {
    name = 'say';
    summary = `The bot will say what you will tell the bot`;
    precondition: Permission = 'MENTION_EVERYONE';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String", "Channel"];
    optionsname = ['sentence', 'channel']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give some words to say")
      }
        return ctx.channel.send(args?.join(' '));
    }
}
