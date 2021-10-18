import { Command, CommandContext, Permission } from './command';


export default class InviteCommand implements Command {
  name = 'invite';
  summary = 'Get a link to invite the bot.';
  precondition: Permission = '';
  cooldown = 3;
  module = 'General';
  
  execute = async(ctx: CommandContext) => {
     ctx.channel.send(`https://discord.com/oauth2/authorize?client_id=${ctx.bot.user.id}&permissions=8&scope=bot%20applications.commands`);
  }
}