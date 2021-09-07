const axios = require(`axios`);
const db = require(`../config/database`);

db.query("CREATE TABLE IF NOT EXISTS warzone (id INT (11) AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR (255) NOT NULL, date DATETIME DEFAULT (CURRENT_TIMESTAMP) NOT NULL, kd_ratio FLOAT NOT NULL)");

// get statistics and put into database
module.exports.updateStatistics = function updateStatistics(platform, username) {
    axios.get(`https://api.tracker.gg/api/v2/warzone/standard/profile/${platform}/${username.replace(`#`, `%23`)}`)
        .then((res) => {
            let kdRatio = res.data.data.segments.find(segment => segment.type === "overview").stats.kdRatio.value;

            db.query("INSERT INTO warzone (username, kd_ratio) VALUE ('" + username + "', '" + kdRatio + "')");

            console.log(`[INFO]: Warzone stats got for ${username}!`);
            console.log(kdRatio);
        }).catch((err) => console.log(err));
}