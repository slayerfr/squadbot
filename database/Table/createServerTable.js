const postmain = require("../postgresql.js")
const pg = require('pg')

function createServerTable(){

    const pool = new pg.Pool({
        user: 'squadbot',
        host: 'localhost',
        database: 'sq_data',
        password: 'FANthebg',
        port: 5432,
    });

    pool.query(`CREATE TABLE server ( serverID int, serverName varchar, serverLang varchar, create serverPrefix)`)

}