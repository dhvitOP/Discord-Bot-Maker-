import EventHandler from './event-handler';
import Deps from '../../utils/deps';
import CommandService from '../command.service';
import Bots from '../../data/bots';
import AutoMod from '../../modules/auto-mod/auto-mod';
import Leveling from '../../modules/xp/leveling';
import { Message } from 'discord.js';
import db from 'quick.db';
import profanity from 'profanity-hindi';
import list from 'badwords-list';
import { MessageEmbed } from 'discord.js';

import fetch from 'node-fetch';
export default class MessageHandler implements EventHandler {
    on = 'message';

    constructor(
        private autoMod = Deps.get<AutoMod>(AutoMod),
        private commands = Deps.get<CommandService>(CommandService),
        private bots = Deps.get<Bots>(Bots),
        private leveling = Deps.get<Leveling>(Leveling)) {}

    async invoke(msg) {
        if (msg.author.bot) return;
 /*       if(db.has(`chatbot_${msg.guild.id}_${msg.client.user.id}`))
            {
                let chekxd = db.fetch(`chatbot_${msg.guild.id}_${msg.client.user.id}`);
                if(chekxd === msg.channel.id)
                    {
                       
                       let respo = this.chat(msg.content, msg.client.user.username);
                        console.log(respo)
                        if(respo)
                            {
                        return msg.channel.send(respo);
                            }
                    }
            } */
try {
        const savedBot = await this.bots.get(msg.client.user);
        msg.mentions.users.forEach(user => {
            var breh = 0;
            breh = breh + 1;
            if(breh > 3)
                {
            msg.delete();
            msg.channel.send(`:alert: Mass Mention by <@${msg.author.id}> :alert:`);
                   
                    return;
                }
        })
        db.add(`msg_${msg.author.id}_${msg.client.user.id}_${msg.guild.id}`, 1);
        try {
        if(db.has(`anti-swear_${msg.guild.id}_${msg.client.user.id}`)){ 
            if(!msg.content)
                {
                    
                } else {
    var words = list.array;
    
    var customwords = ["bc", "mc", "bhosda", "lond", "loda", "louda", "lund", "randi", "mkc", "mkb", "tmkc", "bsdk", "bhosdike"];
  
    for (let i = 0; i < words.length; i++) {
        if(msg.content.includes(words[i])){
      msg.delete();
            return;
        
          break;
    }
          
        
    }
                      for (let i = 0; i < customwords.length; i++) {
        if(msg.content.includes(customwords[i])){
      return msg.delete();
         return;
          break;
    }
          
        
    }
                }
  
} } catch (error)
    {
    msg.channel.send(error); 
    }
           var prefix = db.fetch(`prefix_${msg.guild.id}_${msg.guild.client.user.id}`)
        if(!prefix) {
            db.set(`prefix_${msg.guild.id}_${msg.guild.client.user.id}`, ".");
             prefix = ".";
            }
         if (db.has(`afk_${msg.author.id}_${msg.guild.client.user.id}_${msg.guild.id}`)) {
   
      msg.reply(`Welcome Back **${msg.author.username}**, I've Removed your AFK!`);
        db.delete(`afk_${msg.author.id}_${msg.guild.client.user.id}_${msg.guild.id}`)
        db.delete(`afk_${msg.author.id}_${msg.guild.client.user.id}_${msg.guild.id}`)
      }
       msg.mentions.users.forEach(user => {
           if(user.id == msg.guild.client.user.id){
               let embed4 = new MessageEmbed()
               .setTitle(`Hey, ${msg.author.username}`)
               .setThumbnail(msg.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setDescription(`My Prefix in **${msg.guild.name}** is \`${prefix}\` \n For More Informating type \`${prefix}help\` `)
          .setColor('BLUE');
             return msg.channel.send({embeds: [embed4]})
           }
        if (db.has(`afk_${user.id}_${msg.guild.client.user.id}_${msg.guild.id}`)) 
        {
            let messageafk2 =  db.fetch(`afk_${user.id}_${msg.guild.client.user.id}_${msg.guild.id}`);
            let embed3 = new MessageEmbed()
          .setDescription(`${user.tag} is currently AFK! \n Reason: ${messageafk2}`)
          .setColor('RED');
             
            msg.reply({embeds: [embed3]});
        }
    })   
        if(!msg.member.permissions.has('MANAGE_MESSAGES'))
            {
            if(db.has(`antilink_${msg.guild.id}_${msg.guild.client.user.id}`))
                {
                  
 
    if (msg.content.includes("discord.gg/")) {
       msg.channel.send("No Server Invites Allowed")
       msg.delete();
  }
                     if (msg.content.includes("dsc.gg/")) {
       msg.channel.send("No  Server Invites Allowed")
       msg.delete();
  }
                     if (msg.content.includes("Dsc.gg/")) {
       msg.channel.send("No  Server Invites Allowed")
       msg.delete();
  }
  if (msg.content.includes("Discord.gg/")) {
       msg.channel.send("No  Server Invites Allowed")
       msg.delete();
  
     }
                }
            }
       
const argsxd = msg.content.split(' ');
		if(!msg.content.includes(prefix))
            {
        argsxd.forEach(arg => {
            if(db.has(`${arg}_${msg.guild.client.user.id}_${msg.guild.id}`))
                {
                    if(db.has(`xdlel_${msg.guild.client.user.id}_${msg.guild.id}`))
                        {
                           return;
                        }
                    let replyxd = db.fetch(`${arg}_${msg.guild.client.user.id}_${msg.guild.id}`);
                    if(replyxd)
                        {
                            db.add(`xdlel_${msg.guild.client.user.id}_${msg.guild.id}`, 1)
                      return  msg.channel.send(replyxd); 
                        }
                    
                }
        })
            
                db.delete(`xdlel_${msg.guild.client.user.id}_${msg.guild.id}`);
            
       
               
            }
        const isCommand = msg.content.startsWith(prefix);
        
        if (isCommand)
          
            return await this.commands.handle(msg, savedBot);        

        
        if (savedBot.autoMod.enabled)
            await this.autoMod.validateMsg(msg, savedBot); } catch (error) { return msg.channel.send(error) }
       
    }
    async chat(message, username){
        if(!message) throw new Error("Error. No message provided")
        let chatbot_gender = "Male";
        const res =  await fetch(`https://api.udit.gq/api/chatbot?message=${encodeURIComponent(message)}&gender=Male&name=${encodeURIComponent(username)}`).catch(e => {
            throw new Error(`Ran into an Error. ${e}`);
        });
        console.log(res.json());
        const response = await res.json().catch(e =>{
            throw new Error(`Ran into an Error. ${e}`);
        });
        console.log(response);
        console.log(response.message);
        return response.message.replace('CleverChat', username).replace('male', chatbot_gender);
    }
}