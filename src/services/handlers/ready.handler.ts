import Log from '../../utils/log';
import EventHandler from './event-handler';
import Deps from '../../utils/deps';
import db from 'quick.db';
import { Client } from 'discord.js';
 import GlobalBots from '../../global-bots';
import Discord from 'discord.js';

export default class ReadyHandler implements EventHandler {
    startedBots: string[] = [];
    on = 'ready';

  
    
    async invoke(bot) {
        Log.info(`Bot '${bot.user.username}' is live!`, `events`);
        bot.guilds.cache.forEach(guild => {
             var prefix = db.fetch(`prefix_${guild.id}_${bot.user.id}`)
        if(!prefix) {
            db.set(`prefix_${guild.id}_${bot.user.id}`, ".");
             prefix = ".";
            }
        })
       
        if (this.startedBots.includes(bot.user.id)) return;
        await bot.user?.setPresence({ activities: [{ name: `Made from Star Bot Builder | .help for my Commands` }] });
       // await bot.user?.setPresence({ activities: [{ name: `Made from Star Bot Builder | .help for my Commands`, type: "Listening" }] });
        this.startedBots.push(bot.user.id);
       
       
      //this.music.initialize();

        GlobalBots.add(bot);
    }
}
