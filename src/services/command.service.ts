import fs from 'fs';
import { Message,  TextChannel } from 'discord.js';
import { Command, CommandContext } from '../commands/command';
import Log from '../utils/log';
import Deps from '../utils/deps';
import Commands from '../data/commands';
import Logs from '../data/logs';
import { BotDocument } from '../data/models/bot';
import Cooldowns from './cooldowns';
import Validators from './validators';
import { promisify } from 'util';
import { resolve } from 'path';
import db from 'quick.db';



const readdir = promisify(fs.readdir);

export default class CommandService {
    public commands = new Map<string, Command>();

    constructor(
        private logs = Deps.get<Logs>(Logs),
        private cooldowns = Deps.get<Cooldowns>(Cooldowns),
        private validators = Deps.get<Validators>(Validators),
        private savedCommands = Deps.get<Commands>(Commands)) {}

    async init() {
        const directory = resolve(`./src/commands`);
        const files = await readdir(directory);
        
        for (const file of files) {            
            const { default: Command } = await import(`../commands/${file}`);
            if (!Command) continue;
            
            const command = new Command();
            this.commands.set(command.name, command);
           if(command.aliases){
               command.aliases.forEach(alias => this.commands.set(alias, command))
           }
            await this.savedCommands.get(command);
        
        }
        Log.info(`Loaded: ${this.commands.size} commands`, `cmds`);
    }

    async handle(msg, savedGuild: BotDocument) {
        if (!(msg.content || msg.author.bot || msg.guild)) return;

        return this.handleCommand(msg, savedGuild);
    }
    private async handleCommand(msg, savedGuild: BotDocument) {
        const content = msg.content.toLowerCase();
        try {
            this.validators.checkChannel(msg.channel as TextChannel, savedGuild);
            let prefix = db.fetch(`prefix_${msg.guild.id}_${msg.guild.client.user.id}`);
            const command = this.findCommand(prefix, content);
            if (!command || this.cooldowns.active(msg.author, command)) return;

            this.validators.checkCommand(command, savedGuild, msg);
            this.validators.checkPreconditions(command, msg.member);

            await this.findAndExecute(msg, savedGuild);

            this.cooldowns.add(msg.author, command);

            await this.logs.logCommand(msg, command);
        } catch (error) {
            const content = error?.message ?? 'Un unknown error occurred';          
            msg.channel.send(':warning: ' + content);
        }
    }

    async findAndExecute(msg, savedGuild: BotDocument) {
        const prefix = db.fetch(`prefix_${msg.guild.id}_${msg.guild.client.user.id}`);  
      
        var command = this.findCommand(prefix, msg.content);
       try {
        await command.execute(new CommandContext(msg), 
            ...this.getCommandArgs(prefix, msg.content));
           } catch (error) {
               return msg.channel.send(error); }
        
    }

    private findCommand(prefix: string, content: string) {        
        const name = content
            .split(' ')[0]
            .substring(prefix.length, content.length);

        return this.commands.get(name);
    }
    private getCommandArgs(prefix: string, content: string) {
        let args = content.split(' ');
      
        let argsxd = content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
        let trimxd = argsxd.shift().toLowerCase();
        return argsxd;
    }
}
