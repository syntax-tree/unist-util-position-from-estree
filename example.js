import {parse} from 'acorn'
import {positionFromEstree} from './index.js'

// Make acorn support line/column.
var node = parse('function x() { console.log(1) }', {locations: true})

console.log(positionFromEstree(node))
console.log(positionFromEstree(node.body[0].id))
console.log(positionFromEstree(node.body[0].body.body[0].expression))
