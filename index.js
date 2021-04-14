/**
 * @typedef {import('unist').Position} Position
 *
 * @typedef {[number, number]} RangeLike
 *
 * @typedef {Object} PointLike
 * @property {number} [line]
 * @property {number} [column]
 *
 * @typedef {Object} LocLike
 * @property {PointLike} [start]
 * @property {PointLike} [end]
 *
 * @typedef {Object} NodeLike
 * @property {LocLike} [loc]
 * @property {RangeLike} [range]
 * @property {number} [start]
 * @property {number} [end]
 */

/**
 * Given an estree `node`, returns a unist `position`.
 * @param {NodeLike} [value]
 * @returns {Position}
 */
export function positionFromEstree(value) {
  /** @type {NodeLike} */
  var node = value || {}
  /** @type {LocLike} */
  var loc = node.loc || {}
  /** @type {RangeLike} */
  var range = node.range || [0, 0]
  var startOffset = range[0] || node.start
  var endOffset = range[1] || node.end

  return {
    start: {
      line: loc.start && loc.start.line > -1 ? loc.start.line : null,
      column: loc.start && loc.start.column > -1 ? loc.start.column + 1 : null,
      offset: startOffset > -1 ? startOffset : null
    },
    end: {
      line: loc.end && loc.end.line > -1 ? loc.end.line : null,
      column: loc.end && loc.end.column > -1 ? loc.end.column + 1 : null,
      offset: endOffset > -1 ? endOffset : null
    }
  }
}
