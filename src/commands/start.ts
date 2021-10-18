import { Command, CommandContext, Permission } from './command';
import Bots from '../data/bots';
import Deps from '../utils/deps';
import EventsService from '../services/events.service';
import GlobalBots from '../global-bots';
import CryptoJS, { AES } from 'crypto-js';
import db from 'quick.db';
export default class stopBotCommand implements Command {

    name = 'start';

    summary = `The bot will start your bot again`;

    precondition: Permission = '';

    cooldown = 3;

    module = 'General';

    usage = 'say wos';

    options = ["String"];

    optionsname = ["botid"]

    

    async execute(ctx: CommandContext, ...args: string[]) {

     
        
        const bots = Deps.get<Bots>(Bots);
        const service = Deps.get<EventsService>(EventsService);
        let tokenxd = db.fetch(`stopped_${args.join(" ")}`);
        if(!tokenxd)
        {
          return ctx.channel.send("Your bot is not stopped or doesn't exist otherwise you didn't gave me a bot ID");
        }
       const token = AES
                .decrypt(tokenxd.tokenHash || '', "JKGNFDNBIOFNBOGN")
                .toString(CryptoJS.enc.Utf8);
        
        if(tokenxd.ownerId === ctx.member.id)
                {
           
      
            
        try {
         
         let botxd = service.startBot(token)
        
         ctx.channel.send("Done Bot is Online now");
              
            
            } catch(error) { ctx.channel.send(`${error}`); }
                } else {
                     ctx.channel.send("You are not owner of this bot");
                }

    }

}

