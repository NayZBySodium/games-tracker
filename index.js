// connect to mysql
require(`./config/database`);

setInterval(() => {
    console.log(`[INFO]: Updating Rocket League statistics, next update at ${getNextUpdate()}...`);
    require(`./trackers/rocketleague.tracker`);
    console.log(`[INFO]: Updating Rocket League statistics finished!`);
}, 1000 * 60 * process.env.UPDATE_INTERVAL);

setInterval(() => {
    console.log(`[INFO]: Updating Warzone statistics, next update at ${getNextUpdate()}`);
    require(`./trackers/warzone.tracker`);
    console.log(`[INFO]: Updating Rocket League warzone finished!`);
}, 1000 * 60 * process.env.UPDATE_INTERVAL);

console.log(`[INFO]: App started at ${getHours()}. The stats while be updating all ${process.env.UPDATE_INTERVAL} minutes.`);

function getNextUpdate() {
    var d = new Date();
    var min = d.getMinutes();
    var hours = d.getHours();
    var sec = d.getSeconds();

    min = min + process.env.UPDATE_INTERVAL;

    if (min >= 60) {
        hours = hours + 1;
        min = min - 60;
    }

    return `${hours}:${min}:${sec}`;
}

function getHours() {
    var d = new Date();
    var min = d.getMinutes();
    var hours = d.getHours();
    var sec = d.getSeconds();

    return `${hours}:${min}:${sec}`;
}