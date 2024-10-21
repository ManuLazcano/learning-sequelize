import { DataTypes } from 'sequelize'
import { sequelize } from './1-config.js'

const Ship = sequelize.define('Ship', {
  name: DataTypes.TEXT,
  crewCapacity: DataTypes.INTEGER,
  amountOfSails: DataTypes.INTEGER
}, { timestamps: false })

const Captain = sequelize.define('Captain', {
  name: DataTypes.TEXT,
  skillLevel: {
    type: DataTypes.TEXT,
    validate: { min: 1, max: 10 }
  }
}, { timestamps: false })

Captain.hasOne(Ship)
Ship.belongsTo(Captain)

await sequelize.sync({ force: true })

// ------ ------ Example of lazy loading ------ ------
const awesomeCaptain = await Captain.findOne({
  where: {
    name: 'Jack Sparrow'
  }
})
console.log('Name: ', awesomeCaptain?.name)
console.log('Skill Level: ', awesomeCaptain?.skillLevel)

// Ahora necesitamos la información de su barco
const hisShip = await awesomeCaptain?.getShip()
console.log('Ship Name: ', hisShip?.name)
console.log('Amount of Sails: ', hisShip?.amountOfSails)

// ------ ------ Example for eager loading ------ ------
const anotherAwesomeCaptain = await Captain.findOne({
  where: {
    name: 'Jack Sparrow'
  },
  include: Ship
})
// Ahora la información del barco viene con el capitan
console.log('Name: ', anotherAwesomeCaptain?.name)
console.log('Skill Level: ', anotherAwesomeCaptain?.skillLevel)
console.log('Ship Name: ', anotherAwesomeCaptain?.ship?.name)
console.log('Amount of Sails: ', anotherAwesomeCaptain?.ship?.amountOfSails)
