const axios = require(`axios`);
const db = require(`../config/database`);

db.query(`CREATE TABLE IF NOT EXISTS rocket_league (id INT (11) AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR (255) NOT NULL, date DATETIME DEFAULT (CURRENT_TIMESTAMP) NOT NULL, rating FLOAT NOT NULL, rank_name VARCHAR (255) NOT NULL)`);

// get statistics and put into database
module.exports.updateStatistics = function updateStatistics(platform, username) {
    axios.get(`https://api.tracker.gg/api/v2/rocket-league/standard/profile/${platform}/${username.replace(` `, `%20`)}`)
        .then((res) => {
            let segments = res.data.data.segments;

            segments.forEach(segment => {
                if (segment.metadata) {
                    if (segment.metadata.name === `Ranked Doubles 2v2`) {
                        let rating = segment.stats.rating.value;
                        let rank = `${segment.stats.tier.metadata.name} ${segment.stats.division.metadata.name}`;

                        db.query(`INSERT INTO rocket_league (username, rating, rank_name) VALUES ('${username}', ${rating}, '${rank}')`);

                        console.log(`[INFO]: Rocket League stats got for ${username}!`);
                        console.log(rating, rank);
                    }
                }
            });
        }).catch((err) => console.log(err));
}