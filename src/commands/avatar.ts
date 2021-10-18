import { Command, CommandContext, Permission } from './command';
import { MessageEmbed } from 'discord.js';
let error = 'https://cdn.discordapp.com/emojis/887026280745291857.png?v=1';
let success = 'https://cdn.discordapp.com/emojis/887029158830567554.png?v=1';
export default class DashboardCommand implements Command {
    name = 'avatar';
    aliases = ['av'];
    summary = `The bot will give you your avatar`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
  
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
           var user = ctx.user;
      } else {
      var user = ctx.msg.mentions.users.first();
      if(!user)
      {
       
          let embed1 = new MessageEmbed()
          .setDescription(`Mention a User or don't for your Avatar`)
          .setColor('RED');
          return 
          ctx.channel.send({embeds: [embed1]});
      }
      }
        const png = this.getAvatar(user, "png");
    const webp = this.getAvatar(user, "webp");
    const jpg = this.getAvatar(user, "jpg");
    const gif = this.getAvatar(user, "gif");

    const embed = new MessageEmbed()
      .setTitle(`${user.username}`)
      .setDescription(`[PNG](${png}) | [WEBP](${webp}) | [JPG](${jpg}) | [GIF](${gif})`)
      .setImage(`${webp}`)
        .setColor('RED');
        return ctx.channel.send({embeds: [embed]});
    }
     getAvatar(user, format) {
    return user.displayAvatarURL({
      dynamic: true,
      size: 4096,
      format: format,
    });
  }
}
