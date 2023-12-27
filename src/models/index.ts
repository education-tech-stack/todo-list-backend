import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(process.env.SEQUELIZE_DATABASE, {
  dialect: 'postgres',
})

sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {
  Sequelize,
  sequelize,
  User: require('./userModel')(sequelize, DataTypes),
  Task: require('./taskModel')(sequelize, DataTypes),
  Column: require('./columnModel')(sequelize, DataTypes),
  Board: require('./boardModel')(sequelize, DataTypes),
}

db.Board.hasMany(db.Task, { foreignKey: 'boardId'})
db.Task.belongsTo(db.Board, { foreignKey: 'boardId' })
db.Column.belongsTo(db.Board, { foreignKey: 'boardId' })
db.Board.hasMany(db.Column, { foreignKey: 'boardId' })
db.User.hasMany(db.Board, { foreignKey: 'userId' })
db.Board.belongsTo(db.User, { foreignKey: 'userId' })

export default db;
