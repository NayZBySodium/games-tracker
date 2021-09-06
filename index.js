// connect to mysql
require(`./config/database`);

setInterval(() => {
    console.log(`[INFO]: Updating Rocket League statistics, next update at ${getNextUpdate()}...`);
    require(`./trackers/rocketleague.tracker`);
    console.log(`[INFO]: Updating Rocket League statistics finished!`);
}, 1000 * 60 * 5);

setInterval(() => {
    console.log(`[INFO]: Updating Warzone statistics, next update at ${getNextUpdate()}`);
    require(`./trackers/warzone.tracker`);
    console.log(`[INFO]: Updating Warzone League warzone finished!`);
}, 1000 * 60 * 5);

console.log(`[INFO]: App started at ${getHours()}. The stats while be updating all ${5} minutes. (test docker)`);

function getNextUpdate() {
    var d = new Date();
    var min = d.getMinutes();
    var hours = d.getHours();
    var sec = d.getSeconds();

    min = min + 5;

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