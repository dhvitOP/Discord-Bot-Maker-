import AnnounceHandler from './announce-handler';
import { GuildMember } from 'discord.js';
import { EventType } from '../../data/models/bot';
import EventVariables from '../../modules/announce/event-variables';
import db from 'quick.db';
import Canvas from 'discord-canvas';
import Discord from 'discord.js';
 import { loadImage, createCanvas, registerFont } from 'canvas';
export default class MemberJoinHandler extends AnnounceHandler {
    on = 'guildMemberAdd';
    event = EventType.MemberJoin;

    async invoke(member) {
        await super.announce(member.guild, [ member ]);
        if(db.has(`roleaj_${member.guild.id}_${member.guild.client.user.id}`))
            {
                let rolexd = db.fetch(`roleaj_${member.guild.id}_${member.guild.client.user.id}`);
                
       
                await member.roles.add(rolexd);
            }
         let channelto = db.fetch(`joinchan_${member.guild.id}_${member.guild.client.user.id}`);
               let channel = await member.guild.channels.cache.get(channelto);
       
        if(db.has(`joinchan_${member.guild.id}_${member.guild.client.user.id}`))
            {
             
                const pfp =  member.user.displayAvatarURL({
      format: 'png',
    })
                
             
                
                  let guild = member.guild.client.guilds.cache.get(member.guild.id);
                await guild.members.fetch();
                   const username = member.user.tag.replace(`#${member.user.discriminator}`, "");
              
                const image = await new Canvas.Welcome()
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
                 
                const attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
 

               
                
                var message = db.fetch(`joinmsg_${member.guild.id}_${member.guild.client.user.id}`);
                 message = message
    .replace("{user}", `<@${member}>`)
    .replace("{memberscount}", `${guild.members.cache.size}`)
    .replace("{server}", `${member.guild.name}`);
              try {  
                channel.send(message);
              } catch(error) {
                  return;
                  }
                if(db.has(`joinimg_${member.guild.id}_${member.guild.client.user.id}`))
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
      
    private async addAutoRoles(member: GuildMember) {
        const savedConfig = await this.bots.get(member.guild.client.user);

        const roles = savedConfig.general.autoRoleNames
            .map(name => member.guild.roles.cache
                .find(r => r.name === name));
        await member.roles.add(roles, 'Auto role');
    }

    protected applyEventVariables(content: string, member: GuildMember) {
        return new EventVariables(content)
            .user(member.user)
            .guild(member.guild)
            .memberCount(member.guild)
            .toString();
    }
}