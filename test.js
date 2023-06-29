import assert from 'node:assert/strict'
import test from 'node:test'
import {parse} from 'acorn'
import {positionFromEstree} from './index.js'

test('positionFromEstree', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'positionFromEstree'
    ])
  })

  await t.test('should support a missing node', async function () {
    assert.deepEqual(positionFromEstree(), undefined)
  })

  await t.test('should support node w/o `loc`s', async function () {
    assert.deepEqual(
      positionFromEstree(parse('x', {ecmaVersion: 2020})),
      undefined
    )
  })

  await t.test('should support node w/ `loc`s', async function () {
    assert.deepEqual(
      positionFromEstree(parse('x', {ecmaVersion: 2020, locations: true})),
      {
        start: {line: 1, column: 1, offset: 0},
        end: {line: 1, column: 2, offset: 1}
      }
    )
  })

  await t.test('should support node w/ `range`s', async function () {
    assert.deepEqual(
      positionFromEstree(parse('x', {ecmaVersion: 2020, ranges: true})),
      undefined
    )
  })

  await t.test('should handle points w/o line/column', async function () {
    assert.deepEqual(positionFromEstree({loc: {start: {}, end: {}}}), undefined)
  })

  await t.test('should handle points w/ too low values', async function () {
    assert.deepEqual(
      positionFromEstree({
        loc: {start: {line: -1, column: -1}, end: {line: 1, column: 0}}
      }),
      undefined
    )
  })
})
