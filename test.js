import test from 'tape'
import {parse} from 'acorn'
import {positionFromEstree} from './index.js'

test('unist-util-position-from-estree', (t) => {
  t.deepEqual(
    positionFromEstree(),
    {
      start: {line: undefined, column: undefined, offset: undefined},
      end: {line: undefined, column: undefined, offset: undefined}
    },
    'should support a missing node'
  )

  t.deepEqual(
    positionFromEstree(parse('x', {ecmaVersion: 2020})),
    {
      start: {line: undefined, column: undefined, offset: 0},
      end: {line: undefined, column: undefined, offset: 1}
    },
    'should support node w/o `loc`s'
  )

  t.deepEqual(
    positionFromEstree(parse('x', {ecmaVersion: 2020, locations: true})),
    {
      start: {line: 1, column: 1, offset: 0},
      end: {line: 1, column: 2, offset: 1}
    },
    'should support node w/ `loc`s'
  )

  t.deepEqual(
    positionFromEstree(parse('x', {ecmaVersion: 2020, ranges: true})),
    {
      start: {line: undefined, column: undefined, offset: 0},
      end: {line: undefined, column: undefined, offset: 1}
    },
    'should support node w/ `range`s'
  )

  t.end()
})
