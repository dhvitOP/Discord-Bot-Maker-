import { Command, CommandContext, Permission } from './command';
import wiki from "wikijs";
import { MessageEmbed } from 'discord.js';
export default class DashboardCommand implements Command {
    name = 'wiki';
    summary = `The bot will Search your query in wiki`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String"];
    optionsname = ['anything']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
          let embed1 = new MessageEmbed()
          .setDescription(`You Need to give me something to search in WikiPedia`)
          .setColor('RED');
            return ctx.msg.reply({embeds: [embed1]});
      }
      const search = await wiki().search(args?.join(" "));
      if (!search.results[0]) {
      return ctx.channel.send("No results Found");
    }
     const result = await wiki().page(search.results[0]);
     const description = await result.summary();

    const title = result.raw.title;
    const url = result.raw.fullurl;
     const embed = new MessageEmbed()
      .setTitle(`${title} (Read More)`)
      .setURL(url)
      .setDescription(`${description.slice(0, 2045)}${description.length > 2048 ? "..." : ""}`);
        return ctx.channel.send({embeds: [embed]});
    }
}
