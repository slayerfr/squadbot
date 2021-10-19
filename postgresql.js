const { Pool, Client } = require('pg')

try{


const pool = new Pool({
  user: 'squadbot',
  host: 'localhost',
  database: 'sq_data',
  password: 'FANthebg',
  port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
    user: 'squadbot',
    host: 'localhost',
    database: 'sq_data',
    password: 'FANthebg',
  port: 5432,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

function pools(){
  return pool;
}
}catch(error){
  console.log(error.stack)
}