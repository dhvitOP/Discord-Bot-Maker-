import EventHandler from './event-handler';
import { Guild, TextChannel } from 'discord.js';

export default class GuildCreateHandler implements EventHandler {
    on = 'guildCreate';

    invoke(guild: Guild | null): Promise<any> {
        try {
        return this.sendWelcomeMessage(guild?.systemChannel);
        } catch(error)
    {
        return;
    }
    }

    private sendWelcomeMessage(channel: TextChannel | null) {
        return channel?.send(`Hey, I'm a Bot which is made from Star Bot Builder!`);
    }    
}