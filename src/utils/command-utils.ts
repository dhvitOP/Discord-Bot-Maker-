import { GuildMember } from "discord.js";

export function getRoleFromMention(mention: string, guild) {
  const id = getIdFromMention(mention);
  const role = guild.roles.cache.get(id);
  if (!role)
  throw new TypeError('Role not found.');
  
  return role;
}
function getIdFromMention(mention: string) {
  return mention?.match(/\d+/g)[0];
}
export default class CommandUtils {
    static getMemberFromMention(mention: string, guild: any): GuildMember {    
      
     
        const id = mention.replace(/^<@!?(\d+)>$/gm, '$1') ?? '';
        const member = guild.members.cache.get(id);
        if (!member)
            throw new TypeError('Member not found.');
        
        return member;
      
    }
    
}