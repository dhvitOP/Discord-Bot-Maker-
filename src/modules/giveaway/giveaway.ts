import { TextChannel, VoiceChannel, Client } from 'discord.js';
import { GiveawaysManager } from 'discord-giveaways';

export default class Music {
  

    initialize(client: Client) {
       

giveawaysManager = new GiveawaysManager(client, {
    storage: "./json db/giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: config1.botsCanWin,
        embedColor: config1.embedColor,
        embedColorEnd: config1.embedColorEnd,
        reaction: config1.reaction
    }
});


  
        
        this.hookEvents();
    }

    private hookEvents() {
       client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    if (member.id !== client.user.id){
        console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
    }
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    if (member.id !== client.user.id){
        console.log(`${member.user.tag} left giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
    }
});
    }
    }