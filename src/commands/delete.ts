import { Command, CommandContext, Permission } from './command';
import Bots from '../data/bots';
import Deps from '../utils/deps';
import db from 'quick.db';
import GlobalBots from '../global-bots';
import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
export default class DeleteBotCommand implements Command {

    name = 'delete';

    summary = `The Given bot id's bot will be deleted`;

    precondition: Permission = '';

    cooldown = 3;

    module = 'General';

    usage = 'say wos';

    options = ["String"];

    optionsname = ['botid']

    

    async execute(ctx: CommandContext, ...args: string[]) {

      if (!args?.join(" "))

      {

            return ctx.channel.send("You have to give a bot's ID to deleted that bot")

      }
        if(ctx.bot.user.id === args.join(" ")){
        const bots = Deps.get<Bots>(Bots);
              const breh = await bots.get(ctx.bot.user);
        const id = args?.join(" ");
            if(breh.ownerId === ctx.member.id)
                {
        try {
         

        let idxd = ctx.bot.user.id;
            var requestOptions = {
  method: 'POST', // Choose the appropriate method
  headers: {
     'auth': 'HIUGHIHFIUHUIUIGUIGUYGYUSDYFCG',
    'Content-Type': 'application/json',
  },
  body:  JSON.stringify({
     "botid": `${ctx.bot.user.id}`,
   
     }), // Replace this number with the server count
};
          fetch("https://Music-bot.dhvitop.repl.co/delete", requestOptions) 
             let embed1 = new MessageEmbed()
                    .setDescription('Your Bot has been Deleted Permanently!')
                    .setFooter('You can re add you bot with create command!')
         ctx.channel.send({ embeds: [embed1] }).then(async(msg) => {
             db.delete(`stopped_${breh.id}`)
             await  ctx.bot.destroy();
            await bots.delete(id);
         })
            
            } catch(error) { ctx.channel.send(`${error}`); }
                } else {
                    let embed = new MessageEmbed()
                    .setDescription('You are not the Owner of this Bot!')
                     ctx.channel.send({ embeds: [embed] });
                }
} else {
    ctx.channel.send('You need to use this command from your bot!');
}
    }

}

