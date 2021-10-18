import { Command, CommandContext, Permission } from './command';
import { create, all } from "mathjs";
import { codeBlock } from "@discordjs/builders";
import { MessageEmbed } from 'discord.js';
export default class DashboardCommand implements Command {
    name = 'calc';
    aliases = ['calculation', 'calculate'];
    summary = `The bot will say what you will tell the bot`;
    precondition: Permission = 'MENTION_EVERYONE';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String"];
    optionsname = ['calculation']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give a calculation to calculate it");
      }
        try {
      const math = create(all);
      let calc = args?.join(" ");
      const result = math?.evaluate?.(calc);
       const embed = new MessageEmbed()
      .setTitle("Calculation")
      .addField("Calculation", codeBlock("js", calc))
      .addField("Result", codeBlock("js", result));

        return ctx.channel.send({embeds: [embed]});
        } catch (error)
            {
                return ctx.channel.send("Something went wrong");
            }
    }
}
