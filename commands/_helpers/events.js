const ical = require('node-ical');
const { config } = require('../../.env.js');
const { getMessageEmote } = require('./emotes.js');

async function getEvents(eventArgs){
    let events = await ical.async.fromURL(config.guilds.frukost.calendar.icsURL);
    let today = new Date();
    let tomorrow_start = new Date()
    let tomorrow_end = new Date();
    let this_week = new Date(today);
    let today_start = new Date(today);
    let today_end = new Date(today);
    
    this_week.setDate(this_week.getDate() + 7);
    today_start.setHours(0, 0, 0, 0);
    today_end.setHours(23, 59, 59, 999);

    tomorrow_start.setDate(today_start.getDate() + 1);
    tomorrow_end.setDate(today_end.getDate() + 1);
    tomorrow_start.setHours(0);
    tomorrow_end.setHours(23, 59, 59, 999);

    let sendEvents = [];

    for (const event of Object.values(events)) {
        switch(eventArgs){
            case 'today':
                if(event.start >= today && event.start <= today_end){
                    sendEvents.push(event);
                }
                break;
            case 'tomorrow':
                if(event.start >= tomorrow_start && event.start <= tomorrow_end){
                    sendEvents.push(event);
                }
                break;
            case 'week':
                if(event.start >= today && event.start <= this_week){
                    let index = getDate(event.start);
                    if(!sendEvents[index])
                        sendEvents[index] = [];
                    sendEvents[index].push(event);
                }
                break;
        }
    };
    return sendEvents;
}

function formatDayCourses(message, heading, courses, custom_date = false, compressed = false){
    let day_date = (custom_date !== false) ? ' (' + custom_date + ')' : '';
    let msg = heading + day_date + ':\n';
    
    if(courses.length >= 1){        
        for(course of courses){
            msg += '\n`' + getTime(course.start) + ' - ' + getTime(course.end) + '`\n';
            msg += '```\n';
            msg += 'Kurs: ' + course.summary;
            if(!compressed){
                msg += '\n\nSal: ' + course.location;
                msg += '\n\nBeskrivning: ' + course.description;
            }
            msg += '\n```';
        }
    }else{
        msg += '\n`Inga kurser denna dag` ';
        let emt = getMessageEmote(message, config.guilds.frukost.emotes.PepeSmug);
        if(emt !== false)
            msg += emt;
    }
    
    
    return msg;
}

function getTime(date){
    return date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
}

function getDate(date){
    return date.toISOString().split('T')[0];
}

function sortWeekEvents(events){
    let sorted = [];
    for(var day in events){
        sorted.push(
            {
                day: day,
                courses: events[day]
            }
        );
    }
    sortDayEvents(sorted, true);
    for(day of sorted){
        day.courses = sortDayEvents(day.courses);
    }
    return sorted;
}

function sortDayEvents(events, week = false){
    if(week){
        events.sort((a, b) => {
            return new Date(a.day) - new Date(b.day);
        });
    }else{
        events.sort((a, b) => {
            return a.start - b.start;
        });
    }
    
    return events;
}

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

module.exports = {
    getEvents,
    formatDayCourses,
    getTime,
    getDate,
    sortWeekEvents,
    sortDayEvents
};