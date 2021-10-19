const postmain = require("../postgresql.js")
const pg = require('pg')

function inserToServer(guildID, guildName){

    try{

    const Client = new pg.Client({
        user: 'squadbot',
        host: 'localhost',
        database: 'sq_data',
        password: 'FANthebg',
        port: 5432,
    });

    client.connect();

    client.query(`INSERT INTO server (serverID, serverName, serverLang, serverPrefix) VALUES (${guildID}, '${guildName}', 'fr', '-')`, (err, res) => {
        console.log(err, res)
        client.end()
    })
    }catch(err){
        console.log(err.stack)
    }

}