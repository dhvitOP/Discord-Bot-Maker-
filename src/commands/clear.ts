import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import AutoMod from '../modules/auto-mod/auto-mod';
import duh from '../utils/command-utils';

export default class ClearCommand implements Command {
 precondition: Permission = 'MANAGE_MESSAGES';
    name = 'clear';
    usage = 'clear [count = 100]';
    summary = 'Clear all messages that are less than 2 weeks old.';
    cooldown = 5;
    module = 'Auto-mod';

  constructor(private autoMod = Deps.get<AutoMod>(AutoMod)) {}
  
  execute = async(ctx: CommandContext, count = '100') => {
    const msgs = await ctx.channel.bulkDelete(+count);
        const reminder = await ctx.channel.send(`Successfully Deleted \`${msgs.size}\` messages`);
        setTimeout(() => reminder.delete(), 3 * 1000);
  }
}