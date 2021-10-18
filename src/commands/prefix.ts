import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
import fetch from 'node-fetch';
export default class PrefixCommand implements Command {
    name = 'prefix';
    summary = `The bot will say what you will tell the bot`;
    precondition: Permission = 'MENTION_EVERYONE';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String"];
    optionsname = ['prefix']
    
    async execute(ctx: CommandContext, ...args: string[]) {
        console.log(args.join(" "));
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give prefix to set in database");
      }
      let chek = db.fetch(`prefix_${ctx.guild.id}_${ctx.bot.user.id}`);
      if(chek === args?.join(" "))
      {
        return ctx.channel.send("You have to give a new Prefix this Prefix is already being used");
      }
        var requestOptions = {
  method: 'POST', // Choose the appropriate method
  headers: {
     'auth': 'HIUGHIHFIUHUIUIGUIGUYGYUSDYFCG',
    'Content-Type': 'application/json',
  },
  body:  JSON.stringify({
     "prefix": `${args?.join(" ")}`,
     "botid": `${ctx.bot.user.id}`,
      "guildid": `${ctx.guild.id}`,
     }), // Replace this number with the server count
};
          fetch("https://Music-bot.dhvitop.repl.co/prefix", requestOptions) 
      db.set(`prefix_${ctx.guild.id}_${ctx.bot.user.id}`, args?.join(" "));
        return ctx.channel.send("Done , Your Prefix is now saved in database");
    }
}
