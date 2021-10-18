import { Command, CommandContext, Permission } from './command';
import googleTranslate from "@iamtraction/google-translate";
import { MessageEmbed } from 'discord.js';
export default class DashboardCommand implements Command {
    name = 'translate';
    summary = `The bot will translate your sentence in given language`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String", "String"];
    optionsname = ['sentence', 'language']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give a sentence to translate\n e.g - .translate hindi coward brother");
      }
       const language = args[0];
    const sentence = args.join(" ").replace(language, "");
    if(!sentence)
    {
    return ctx.channel.send("Give a sentence to translate not only language");
    }
        try {
      const result = await googleTranslate(sentence, { to: language });
      const embed = new MessageEmbed()
      .setDescription(result.text)
      .setTitle(`Result of Translation`);
        return ctx.channel.send({embeds: [embed]});
              } catch (error)
                      {
                          return ctx.channel.send("This Language does not exist");
                      }
    }
}
