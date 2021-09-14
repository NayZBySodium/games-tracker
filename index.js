// se connecter à la BDD MySQL
require(`./config/database`);

// importer le ficher contenant les utilisateurs à tracker
const users = require(`./config/users.json`);

// importer les trackers
const rocketLeagueTracker = require(`./trackers/rocketleague.tracker`);
const warzoneTracker = require(`./trackers/warzone.tracker`);
const moderWarfareTracker = require(`./trackers/modernwarfare.tracker`);

console.log(`[INFO]: Updating Rocket League statistics...`);
users.rocketLeague.forEach(user => rocketLeagueTracker.updateStatistics(user.platform, user.username));
console.log(`[INFO]: Updating Rocket League statistics finished!`);
console.log(`[INFO]: Updating Warzone statistics...`);
users.warzone.forEach(user => warzoneTracker.updateStatistics(user.platform, user.username));
console.log(`[INFO]: Updating Warzone statistics finished!`);
console.log(`[INFO]: Updating Modern Warfare statistics...`);
users.modernwarfare.forEach(user => moderWarfareTracker.updateStatistics(user.platform, user.username));
console.log(`[INFO]: Updating Modern Warfare statistics finished!`);

// toutes les 5 minutes 
setInterval(() => {
    console.log(`[INFO]: Updating Rocket League statistics...`);
    users.rocketLeague.forEach(user => rocketLeagueTracker.updateStatistics(user.platform, user.username));
    console.log(`[INFO]: Updating Rocket League statistics finished!`);
    console.log(`[INFO]: Updating Warzone statistics...`);
    users.warzone.forEach(user => warzoneTracker.updateStatistics(user.platform, user.username));
    console.log(`[INFO]: Updating Warzone statistics finished!`);
    console.log(`[INFO]: Updating Modern Warfare statistics...`);
    users.modernwarfare.forEach(user => moderWarfareTracker.updateStatistics(user.platform, user.username));
    console.log(`[INFO]: Updating Modern Warfare statistics finished!`);
}, 1000 * 60 * 5);

function getHours() {
    var d = new Date();
    var min = d.getMinutes();
    var hours = d.getHours();
    var sec = d.getSeconds();

    return `${hours}:${min}:${sec}`;
}

console.log(`[INFO]: Games Tracker started at ${getHours()}. The stats while be updating every 5 minutes.`);