import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import AutoMod from '../modules/auto-mod/auto-mod';
import duh from '../utils/command-utils';
let error = 'https://cdn.discordapp.com/emojis/887026280745291857.png?v=1';
let success = 'https://cdn.discordapp.com/emojis/887029158830567554.png?v=1';
import { MessageEmbed } from 'discord.js';
export default class implements Command {
  name = 'ban';
  summary = `Ban a member`;
  precondition: Permission = 'BAN_MEMBERS';
  cooldown = 3;
  module = 'Auto-mod';
   options = ["String", "User"];
    optionsname = ['reason', 'user']
  constructor(private autoMod = Deps.get<AutoMod>(AutoMod)) {}
  
  execute = async(ctx: CommandContext, ...reasonArgs: string[]) => {
      let targetMention = ctx.msg.mentions.members.first();
    if(!targetMention)
      {
         ctx.channel.send("Please Give a User to Ban");
         return;
      }
    const targetxd = ctx.msg.mentions.users.first();
      let target = ctx.msg.mentions.members.first();
  
    let breh = await this.autoMod.validateAction(target, ctx.member);
if(breh === "xd")
    {
        return ctx.channel.send("Your Given Role have the same role as you have or You are trying to ban yourself");
    }
    const reason = reasonArgs.join(' ');
      if(!reason)
          {
              
              let embed1 = new MessageEmbed()
          .setDescription(`You need to Provide a Reason`)
          .setColor('RED')
             return ctx.channel.send({embeds: [embed1]});
          }
      let embed2 = new MessageEmbed()
          .setDescription(`${target} Successfully Banned!`)
          .setColor('RED')
    ctx.channel.send("The Given User Has Been Banned");
    await target.ban({ reason });
      return;
  }
}