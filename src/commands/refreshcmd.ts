import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';

import CommandService from '../services/command.service';
export default class DashboardCommand implements Command {
    name = 'refreshcmds';
    summary = `You dont need to know this one`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    
    
    async execute(ctx: CommandContext, ...args: string[]) {
     if(ctx.user.id === "720632216236851260" || ctx.user.id === "613311607858266133")
     {
       let xd = Deps.get<CommandService>(CommandService);
       xd.init();
       ctx.channel.send("Refreshed Cache of all commands");
     }
    }
}
