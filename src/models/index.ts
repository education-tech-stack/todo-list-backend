import { Sequelize, DataTypes } from 'sequelize'

// const sequelize = new Sequelize(process.env.SEQUELIZE_DATABASE, {
//   dialect: 'postgres',
// })
// const sequelize = new Sequelize('sqlite::memory:')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
})

sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {
  Sequelize,
  sequelize,
  users: require('./userModel')(sequelize, DataTypes),
  tasks: require('./taskModel')(sequelize, DataTypes),
  columns: require('./columnModel')(sequelize, DataTypes),
}

db.users.hasMany(db.columns)
db.columns.hasMany(db.tasks)

export default db;
