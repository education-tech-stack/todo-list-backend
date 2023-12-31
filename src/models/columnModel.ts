//Column model
module.exports = (sequelize, DataTypes) => {
  const Column = sequelize.define(
    'Column',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taskIds: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      }
    },
    { timestamps: true }
  )
  return Column
}
