import assert from 'node:assert/strict'
import test from 'node:test'
import {parse} from 'acorn'
import {positionFromEstree} from './index.js'
import * as mod from './index.js'

test('positionFromEstree', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['positionFromEstree'],
    'should expose the public api'
  )

  assert.deepEqual(
    positionFromEstree(),
    {
      start: {line: undefined, column: undefined, offset: undefined},
      end: {line: undefined, column: undefined, offset: undefined}
    },
    'should support a missing node'
  )

  assert.deepEqual(
    positionFromEstree(parse('x', {ecmaVersion: 2020})),
    {
      start: {line: undefined, column: undefined, offset: 0},
      end: {line: undefined, column: undefined, offset: 1}
    },
    'should support node w/o `loc`s'
  )

  assert.deepEqual(
    positionFromEstree(parse('x', {ecmaVersion: 2020, locations: true})),
    {
      start: {line: 1, column: 1, offset: 0},
      end: {line: 1, column: 2, offset: 1}
    },
    'should support node w/ `loc`s'
  )

  assert.deepEqual(
    positionFromEstree(parse('x', {ecmaVersion: 2020, ranges: true})),
    {
      start: {line: undefined, column: undefined, offset: 0},
      end: {line: undefined, column: undefined, offset: 1}
    },
    'should support node w/ `range`s'
  )
})
