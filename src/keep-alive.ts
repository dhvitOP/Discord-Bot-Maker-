import fetch from 'node-fetch';
import Log from './utils/log';

Log.info('Keeping self alive every 5 minutes', 'ping');

setInterval(async() => {
  await fetch("https://Music-bot.dhvitop.repl.co");
    try {
     await fetch("https://Music-botxd.dhvitop.repl.co"); 
     await fetch("https://Music-botxd1.dhvitop.repl.co");  
     await fetch("https://Music-botxd2.dhvitop.repl.co");  
     await fetch("https://Music-botxd3.dhvitop.repl.co");  
        } catch (error) {
            return console.log(error)
            }

}, 15000)