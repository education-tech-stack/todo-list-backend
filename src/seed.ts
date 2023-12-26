const dotenv = require('dotenv').config()
import db from './models'

const usersSeedData = [
  {
    userName: 'user1',
    email: 'user1@gmail.com',
    password: '$2b$10$o8HL2RuoVXYxugA/Mvy/fuKODMEi3kuHARukZSOvwqbCujpY6oBRO',
  },
  {
    userName: 'user2',
    email: 'user2@gmail.com',
    password: '$2b$10$AwnLKz3rQTpRhr9C0CzWHuFW/.w5tDKxb9JkTPpt5m9QrvWK0V7Xm',
  },
]

const boardsSeedData = [
  {
    tasks: { task1: { id: 'task1', content: 'Task 1' }, task2: { id: 'task2', content: 'Task 2' } },
    columns: {
      column1: { id: 'column1', title: 'Column 1', taskIds: ['task1', 'task2'] },
    },
    columnOrder: ['column1'],
    userId: 1,
  },
  {
    tasks: { task2: { id: 'task3', content: 'Task 3' } },
    columns: {
      column2: { id: 'column2', title: 'Column 2', taskIds: ['task3'] },
    },
    columnOrder: ['column2'],
    userId: 2,
  },
]

async function seedData() {
  try {
    await db.sequelize.sync({ force: true }) // Sync models and recreate tables

    // Seed Users
    const users = await db.User.bulkCreate(usersSeedData, { returning: true })

    // Seed Boards
    const boardsWithUser = boardsSeedData.map((board) => ({
      ...board,
      userId: users.find((user) => user.id === board.userId).id,
    }))
    await db.Board.bulkCreate(boardsWithUser)

    console.log('Seed data inserted successfully.')
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await db.sequelize.close() // Close the connection when done
  }
}

seedData()
