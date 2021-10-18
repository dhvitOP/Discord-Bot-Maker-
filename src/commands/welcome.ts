import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
export default class WelcomeCommand implements Command {
    name = 'welcome';
    aliases = ['welcome-set', 'set-welcome'];
    summary = `The bot will send your given message in given channel whenever a user joins the server`;
    precondition: Permission = 'MANAGE_GUILD';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String", "String", 'String', 'Channel'];
    optionsname = [ 'option', 'enable-or-disable', 'message', 'channel'];
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give message and channel\n Types are -- image-enable, disable, image-disable without an type you can set Channel and message e.g - .welcome #channel {user} Joined this server \n Message Modules are -- user, server and memberscount\n Example - {user} Just Joined {server} Now Total Members are {memberscount}");
      }
        if(args[0] === "disable")
            {
            db.delete(`joinchan_${ctx.guild.id}_${ctx.bot.user.id}`);
        db.delete(`joinmsg_${ctx.guild.id}_${ctx.bot.user.id}`);
               return ctx.channel.send("Done Deleted Welcome Database");
            }
        if(args[0] === "image-enable")
            {
             db.set(`joinimg_${ctx.guild.id}_${ctx.bot.user.id}`, "yes");
                return ctx.channel.send("Done Now Image will also send whenever User Joins the server");
            }
         if(args[0] === "image-disable")
            {
             db.delete(`joinimg_${ctx.guild.id}_${ctx.bot.user.id}`);
                return ctx.channel.send("Done Deleted Image Database");
            }
        var channel = ctx.msg.mentions.channels.first();
        if(!channel)
            {
                return ctx.channel.send("Give me a Valid Channel in Mention");
            }
            var message = args?.join(" ").replace(`<#${channel.id}>`, "");
            if(!message)
            {
             return ctx.channel.send("You have to give a message");
            }
        
        db.set(`joinchan_${ctx.guild.id}_${ctx.bot.user.id}`, channel.id);
        db.set(`joinmsg_${ctx.guild.id}_${ctx.bot.user.id}`, message);
        return ctx.channel.send(`Done Now I will Send Your Message in <#${channel.id}> Whenever someone joins this server`);
    }
}
