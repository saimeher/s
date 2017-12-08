require('dotenv').config()
export default require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'timetable',
    charset: 'utf8'
   // socketPath: '/opt/lampp/var/mysql/mysql.sock'
  }
})
