import { DataTypes } from 'sequelize'
import { sequelize } from './1-config.js'

const Foo = sequelize.define('Foo', { name: DataTypes.STRING })
const Bar = sequelize.define('Bar', { name: DataTypes.STRING })

/** TIP
 * Las relaciones se utilizan a menudo en pares, con el fin de permitir un mejor uso con Sequelize
 */

// ----- ----- One-To-One ----- -----
Foo.hasOne(Bar)
Bar.belongsTo(Foo) // Sequelize inferirá que la foreign key (fooId) debe agregarse a 'Bar'

// Pasar opciones como segundo parámetro
Foo.hasOne(Bar, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
})
Bar.belongsTo(Foo)

// Personalizar la foreign key
Foo.hasOne(Bar)
Bar.belongsTo(Foo, {
  foreignKey: 'foo_id'
})

// Para el tipo de dato UUID
Foo.hasOne(Bar)
Bar.belongsTo(Foo, {
  foreignKey: {
    name: 'foo_id',
    type: DataTypes.UUID
  }
})

// Asociaciones obligatorias: por defecto, la asociación se considera opcional. El 'fooId' se permite que sea nulo lo que significa
// que 'Bar' puede existir sin 'Foo'. Para cambiar el comportamiento solo se debe agregar 'alloNull: false' en las opciones de foreign key
Foo.hasOne(Bar)
Bar.belongsTo(Foo, {
  foreignKey: {
    name: 'foo_id',
    type: DataTypes.UUID,
    allowNull: false
  }
})
