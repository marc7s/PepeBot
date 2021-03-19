const { CommandHandler, Action } = require('../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../command_handler/command-handler-config');
const { config } = require('../../.env.js');

const { sortDayEvents, formatDayCourses, getDate, getEvents, sortWeekEvents } = require('../_helpers/events.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.schema
    ],
    [
        'schema',
        'kurser'
    ],
    async (message, cmd, args) => {
        let eventArgs = 'today';
        let heading = '**DAGENS KOMMANDE KURSER**';
        if(args.length == 1){
            switch(args[0]){
                case 'idag':
                    eventArgs = 'today';
                    break;
                case 'imorgon':
                    eventArgs = 'tomorrow';
                    heading = '**MORGONDAGENS KOMMANDE KURSER**';
                    break;
                case 'vecka':
                    eventArgs = 'week';
                    heading = '**VECKANS KOMMANDE KURSER**';
                    break;
            }
        }
        getEvents(eventArgs).then((evts) => {
            let msg = '';
            let sorted_evts;
            let dayDate = new Date();
            switch(eventArgs){
                case 'tomorrow':
                    dayDate.setUTCHours(0, 0, 0, 0);
                    dayDate.setDate(dayDate.getDate() + 1);
                case 'today':
                    sorted_evts = sortDayEvents(evts);
                    msg = formatDayCourses(message, heading, sorted_evts, getDate(dayDate));
                    message.channel.send(msg);
                    break;
                case 'week':
                    sorted_evts = sortWeekEvents(evts);
                    messages = [];
                    for(day_events of sorted_evts){
                        msg = '\n\n' + formatDayCourses(message, '**' + day_events.day + '**', day_events.courses, false, true);
                        message.channel.send(msg);
                    }
                    break;
            }
        });
        console.log('Showed schedule');
        return Action.messageSent;
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};