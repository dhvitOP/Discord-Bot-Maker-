import Log from '../../utils/log';
import EventHandler from './event-handler';
import Deps from '../../utils/deps';
// import Music from '../../modules/music/music';
import RR from '../../modules/rr/rr';
import { Client } from 'discord.js';
 import GlobalBots from '../../global-bots';
import Discord from 'discord.js';
import db from 'quick.db';
export default class MessageReactionAddHandler implements EventHandler {
 
    on = 'messageReactionAdd';

   constructor() {}

    async invoke(reaction, user, bot) {
      /* console.log(reaction._emoji.name);
        let getrct = db.fetch(`messageID_${reaction.message.guildId}_${bot.user.id}_${reaction._emoji}`);
        console.log(reaction._emoji.id);
        console.log(bot)
       let getmsg = db.fetch(`roleID_${reaction.message.guildId}_${bot.user.id}_${reaction.message.id}_${reaction._emoji}`)
       if(getmsg)
           {
               let guild = bot.guilds.cache.get(reaction.message.guildId);
               let userxd = guild.members.cache.get(user.id);
               userxd.roles.add(getmsg);
           }*/
    }
}
