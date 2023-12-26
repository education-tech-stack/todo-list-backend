//Task model
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'task',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
			order: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
    },
    { timestamps: true }
  )
  return Task
}
