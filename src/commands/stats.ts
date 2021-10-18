import { Command, CommandContext, Permission } from './command';
import { MessageEmbed } from 'discord.js';

import moment from 'moment';
export default class StatsCommand implements Command {
  aliases = ['bot']
  name = 'stats';
  summary = 'List bot statistics in a message embed.';
  precondition: Permission = '';
  cooldown = 3;
  module = 'General';
  
  execute = async(ctx: CommandContext) => {
    
const embed = new MessageEmbed()
//const duration = moment.duration(ctx.bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      embed.setTitle(`${ctx.bot.user.username} Stats`);
   
      embed.addFields(

        { name: 'Guilds', value: `\`${ctx.bot.guilds.cache.size}\``, inline: true },
        {name: 'Uptime', value: `${this.convertTime(Date.now()+ctx.bot.uptime, "from", true)}`},
        { name: 'Users', value: `\`${ctx.bot.users.cache.size}\``, inline: true },

        { name: 'Channels', value: `\`${ctx.bot.channels.cache.size}\``, inline: true },

        { name: 'Created At', value: `\`${ctx.bot.user.createdAt.toDateString()}\``, inline: true }

       

       

      );

    
    await ctx.channel.send({embeds: [embed]});
  }
    convertTime(time, type, noPrefix){
		if(!type) time = "to";
	
		const languageData = "en";
		const m = moment(time)
			.locale(languageData);
		return (type === "to" ? m.toNow(noPrefix) : m.fromNow(noPrefix));
	}
}