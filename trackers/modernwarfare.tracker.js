const axios = require(`axios`);
const db = require(`../config/database`);

db.query("CREATE TABLE IF NOT EXISTS modern_warfare (id INT (11) AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR (255) NOT NULL, date DATETIME DEFAULT (CURRENT_TIMESTAMP) NOT NULL, kd_ratio FLOAT NOT NULL)");

// get statistics and put into database
module.exports.updateStatistics = function updateStatistics(platform, username) {
    axios.get(`https://api.tracker.gg/api/v2/modern-warfare/standard/profile/${platform}/${username.replace(`#`, `%23`)}`)
        .then((res) => {
            let kdRatio = res.data.data.segments.find(segment => segment.type === "overview").stats.kdRatio.value;

            db.query("INSERT INTO modern_warfare (username, kd_ratio) VALUE ('" + username + "', '" + kdRatio + "')");

            console.log(`[INFO]: Modern Warfare stats got for ${username}!`);
            console.log(kdRatio);
        }).catch((err) => console.log(err));
}