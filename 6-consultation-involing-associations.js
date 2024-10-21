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

// Example of lazy loading
const awesomeCaptain = await Captain.findOne({

})
