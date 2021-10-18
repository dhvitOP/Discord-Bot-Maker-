import { GuildMember, TextChannel } from 'discord.js';
import { EventType } from '../../data/models/bot';
import AnnounceHandler from './announce-handler';
import EventVariables from '../../modules/announce/event-variables';
import db from 'quick.db';
import Discord from 'discord.js';
import Canvas from 'discord-canvas';
import { loadImage, createCanvas, registerFont } from 'canvas';
export default class MemberLeaveHandler extends AnnounceHandler {
    on = 'guildMemberRemove';
    event = EventType.MemberLeave;

    async invoke(member) {
        await super.announce(member.guild, [ member ]);
          if(db.has(`levchan_${member.guild.id}_${member.guild.client.user.id}`))
            {
                let channelto = db.fetch(`levchan_${member.guild.id}_${member.guild.client.user.id}`);
                let guild = member.guild.client.guilds.cache.get(member.guild.id);
                await guild.members.fetch();
                   const username = member.user.tag.replace(`#${member.user.discriminator}`, "");
                               const pfp =  member.user.displayAvatarURL({ format: 'png' });
  
              
               
                
                const image = await new Canvas.Goodbye()
  .setUsername(username)
  .setDiscriminator(member.user.discriminator)
  .setMemberCount(guild.members.cache.size)
  .setGuildName(member.guild.name)
  .setAvatar(pfp)
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .setBackground("https://raw.githubusercontent.com/Androz2091/AtlantaBot/master/assets/img/greetings_background.png")
  .toAttachment();
                const attachment = new Discord.MessageAttachment(image.toBuffer(), "bye-image.png");
                var message = db.fetch(`levmsg_${member.guild.id}_${member.guild.client.user.id}`);
                 message = message
    .replace("{user}", `<@${member}>`)
    .replace("{memberscount}", `${guild.members.cache.size}`)
    .replace("{server}", `${member.guild.name}`);
                let channel = await member.guild.channels.cache.get(channelto);
                try {  

                channel.send(message);

              } catch(error) {

                  return;

                  };
                if(db.has(`levimg_${member.guild.id}_${member.guild.client.user.id}`))
                    {
                                 try{

                channel.send({

						files: [attachment],

						

					});

                            } catch (error) {

                 return

}
                    }
            }
    }

    protected applyEventVariables(content: string, member) {
        return new EventVariables(content)
            .user(member.user)
            .guild(member.guild)
            .memberCount(member.guild)
            .toString();
    }
}
