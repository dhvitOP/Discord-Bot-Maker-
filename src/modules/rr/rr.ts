import { TextChannel, VoiceChannel, Client } from 'discord.js';

import db from 'quick.db';
import ReactionRolesManager from './index';
export default class rr {
  
constructor(private reactionRoleManager) {}
    initialize(client: Client) {
       

  const reactionRoleManager = class extends ReactionRolesManager {
  async getAllReactionRoles(botID) {
   return db.get(`reaction-role_${botID}`);
  }
 
  async saveReactionRole(messageID, reactionRoleData, botID) {
    db.push(`reaction-role_${botID}`, reactionRoleData);
    return true;
  }
 
  async deleteReactionRole(messageID,reaction, botID){
    const array = db.get(`reaction-role_${botID}`).filter((r) => r.messageID !== messageID || r.reaction !== reaction)
    
    db.set("reaction-role", array)
 
    return true;
  }
};
 
this.reactionRoleManager = new reactionRoleManager(client,{
  storage: false
})


  
        
        this.hookEvents();
    }

    private hookEvents() {
   this.reactionRoleManager.on('reactionRoleAdded',(reactionRole,member,role,reaction) => {
  console.log(`${member.user.username} added his reaction \`${reaction}\` and won the role : ${role.name}`);
})
        this.reactionRoleManager.on("reactionRoleRemoved", (reactionRole, member, role, reaction) => {
  console.log(`${member.user.username} removed his reaction \`${reaction}\` and lost the role : ${role.name}`)
});
    }
     async createrr(messageID, roleID, message, reaction) {
         try {
       this.reactionRoleManager.create({
      messageID: messageID,
      channel: message.channel,
      reaction: reaction,
      role: message.guild.roles.cache.get(roleID)
})
         } catch (error)
             {
                 message.channel.send("An Error Occured :alert: Did you Gave a Valid Message ID or Role?");
             }
    }
    }