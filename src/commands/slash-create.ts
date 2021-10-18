import { Command, CommandContext, Permission } from './command';
import db from 'quick.db';
export default class DashboardCommand implements Command {
    name = 'slash-create';
    aliases = ['slashcreate']
    summary = `The bot will create a slash command for your own bot`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String", "String", "String", "String"];
    optionsname = ["command_name", "command_description", "option", "command_response_text"];

    async execute(ctx: CommandContext, ...args: string[]) {
    ctx.channel.send("Currently This Commmand Can only run from Slash Commands");
    }
}
