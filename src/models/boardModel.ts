//Column model
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    'Board',
    {
      tasks: {
        type: DataTypes.JSONB,
        allow_null: false,
      },
      columns: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      columnOrder: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    },
    { timestamps: true }
  )
  return Board
}
