import { Command, CommandContext, Permission } from './command';
import weather from 'weather-js';
import Discord from 'discord.js';
export default class DashboardCommand implements Command {
    name = 'weather';
    summary = `The bot will give you your city's weather`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'General';
    usage = 'say words';
    options = ["String"];
    optionsname = ['city']
    
    async execute(ctx: CommandContext, ...args: string[]) {
      if (!args?.join(" "))
      {
            return ctx.channel.send("You have to give a city to find it's weather")
      }
     weather.find({search: args?.join(" "), degreeType: 'C'}, function(err, result) {
  
if(!result){
    let errorembed = new Discord.MessageEmbed()
    .setTitle("Error :cry:")
    .setDescription("Please enter a vaild location!")
	.setColor("FF5757")
    .setTimestamp()
  return ctx.channel.send({embeds: [errorembed]});
}

  var current = result[0].current;
  var location = result[0].location;
	if (err) {
	let errorembed = new Discord.MessageEmbed()
    .setTitle("Error :cry:")
    .setDescription("Please enter a vaild location!")
	.setColor("FF5757")
    .setTimestamp()
  return ctx.channel.send({embeds: [errorembed]});
	}

	
    let embed = new Discord.MessageEmbed()
    .setDescription(`**${current.skytext}**`)
    .setAuthor(`Weather for ${current.observationpoint}`)
    .setThumbnail(current.imageUrl)
    .setColor(0x00AE86)
    .addField('Timezone', `UTC${location.timezone}`, true)
    .addField('Degree Type', location.degreetype, true)
    .addField('Temperature', `${current.temperature} Degrees`, true)
    .addField('Feels Like', `${current.feelslike} Degrees`, true)
    .addField('Winds', current.winddisplay, true)
    .addField('Humidity', `${current.humidity}%`, true)
    return ctx.channel.send({embeds: [embed]});
});
    }
}
