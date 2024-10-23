import { sequelize } from './1-config.js'
import { DataTypes } from 'sequelize'
/**
 * Cuando se define una asociación entre dos modelos, las instancias de esos modelos obtienen métodos especiales
 * con sus contrapartes asociadas. Dichos métodos están formados por un prefijo (Por ejemplo: get, add, set)
 * concatenado con el nombre del modelo.
 * Si se definió un alias, se usará en lugar del nombre del modelo para formar los nombres de los métodos
 */

const Foo = sequelize.define('Foo', { name: DataTypes.STRING })
const Bar = sequelize.define('Bar', { name: DataTypes.STRING })

const foo = await Foo.create({ name: 'the-foo' })
const bar1 = await Bar.create({ name: 'some-bar' })
const bar2 = await Bar.create({ name: 'another-bar' })

/** ----- ----- ----- Para las asociaciones Foo.hasOne(Bar) y Foo.belongsTo(Bar) ----- ----- -----
 * getBar()
 * serBar()
 * createBar()
 */
// Ejemplo con Foo.hasOne(Bar):
console.log(await foo.getBar()) // null
await foo.setBar(bar1)
console.log(await foo.getBar().name) // 'some-bar'

await foo.createBar({ name: 'yet-another-bar' })
const newlyAssociateBar = await foo.getBar()
console.log(newlyAssociateBar.name) // 'yet-another-bar'
await foo.setBar(null) // Desasociar
console.log(await foo.getBar()) // null

/** ----- ----- ----- Para las asociaciones Foo.hasMany(Bar) y Foo.belongsToMany(Bar, { through: fooBar})  ----- ----- -----
 * getBars()
 * countBars()
 * hasBar()
 * hasBars()
 * setBars()
 * addBar()
 * addBars()
 * removeBar()
 * removeBars()
 * createBar()
*/
// Ejemplo con Foo.hasMany(Bar):
console.log(await foo.getBars()) // []
console.log(await foo.countBars()) // 0
console.log(await foo.hasBar(bar1)) // false

await foo.addBars([bar1, bar2])
console.log(await foo.countBars()) // 2

await foo.addBar(bar1)
console.log(await foo.countBars()) // 2
console.log(await foo.hasBar(bar1)) // true

await foo.removeBar(bar2)
console.log(await foo.hasBar(bar1)) // true
console.log(await foo.countBars()) // 1

await foo.createBar({ name: 'yet-another-bar' })
console.log(await foo.countBars()) // 2

await foo.setBars([]) // Desasociar todos los Bar
console.log(await foo.countBars()) // 0
