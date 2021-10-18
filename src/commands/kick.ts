import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import AutoMod from '../modules/auto-mod/auto-mod';
import duh from '../utils/command-utils';

export default class KickCommand implements Command {
  name = 'kick';
  summary = `kick a member`;
  precondition: Permission = 'KICK_MEMBERS';
  cooldown = 3;
  module = 'Auto-mod';
   options = ["String", "User"];
    optionsname = ['reason', 'user']
  constructor(private autoMod = Deps.get<AutoMod>(AutoMod)) {}
  
  execute = async(ctx: CommandContext, targetMention: string, ...reasonArgs: string[]) => {
    if(!targetMention)
      {
         ctx.channel.send("Please Give a User to Kick");
         return;
      }
    const targetxd = ctx.msg.mentions.users.first();
      const target = ctx.guild.members.cache.get(targetxd.id);
  if(!target){
      ctx.channel.send("give me a member mention");
      return;
      }
      
        let breh = await this.autoMod.validateAction(target, ctx.member);
if(breh === "xd")
    {
        return ctx.channel.send("Your Given Role have the same role as you have or You are trying to ban yourself");
    }
      
    const reason = reasonArgs.join(' ');
      if(!reason)
          {
              return ctx.channel.send("No Reason?????");
          }
    ctx.channel.send("The Given User Has Been Kicked");
    return target.kick( reason );
  }
}