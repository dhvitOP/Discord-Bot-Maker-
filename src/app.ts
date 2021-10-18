import { config } from 'dotenv';
config();
import raw_body_1 from 'raw-body';
import querystring_1 from 'querystring';
import xdbruh from 'socket.io';
import httpxd from 'http';
import mongoose from 'mongoose';
import Deps from './utils/deps';
import express from 'express';
import EventsService from './services/events.service';
import session from 'express-session';
import GlobalBots from './global-bots';
import CommandService from './services/command.service';
import AutoMod from './modules/auto-mod/auto-mod';

Deps.build( EventsService, GlobalBots);

Deps.get<EventsService>(EventsService).init();
Deps.get<CommandService>(CommandService).init();
Deps.get<AutoMod>(AutoMod).init();

const xdstart = Deps.get<EventsService>(EventsService);



mongoose.connect("mongodb+srv://bot-list-lol:SzRpE6eXNegtLRvs@cluster0.jme3y.mongodb.net/nothingxd?retryWrites=true&w=majority", { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false 
});





import bodyParser from 'body-parser';
import cors from 'cors';




import './keep-alive';

/** Used to prevent the app from sleeping (on Heroku, Glitch etc.) */

