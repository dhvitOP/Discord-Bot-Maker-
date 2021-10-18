import { Command, CommandContext, Permission } from './command';
import Bots from '../data/bots';
import Discord from 'discord.js';
import Deps from '../utils/deps';
import EventsService from '../services/events.service';
import CryptoJS, { AES } from 'crypto-js';
import { Client } from "discord-slash-commands-client";
import Cooldowns from '../services/cooldowns';
import Validators from '../services/validators';
import { promisify } from 'util';
import { resolve } from 'path';
import fs from 'fs';
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
import { MessageEmbed } from 'discord.js';
export default class CreateCommand implements Command {
    name = 'create';
    summary = `To create a bot`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    options = ["String"];
    optionsname = ['token'];
    
    async execute(ctx: CommandContext, ...args: string[]) {
     
     //   let token = args?.join(" ");
      
        let embed1 = new MessageEmbed()
                    .setDescription('You have to use Slash Command for Creating Bot!')
                    .setFooter('This is for Security of your Bot')
          ctx.channel.send({ embeds: [embed1] });
        
            
        
    }
}
