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
  const node = value || {}
  /** @type {LocLike} */
  const loc = node.loc || {}
  /** @type {RangeLike} */
  const range = node.range || [0, 0]
  const startOffset = range[0] || node.start
  const endOffset = range[1] || node.end

  return {
    start: {
      // @ts-expect-error: return no point / no position next major.
      line:
        loc.start && loc.start.line !== undefined && loc.start.line > -1
          ? loc.start.line
          : undefined,
      // @ts-expect-error: return no point / no position next major.
      column:
        loc.start && loc.start.column !== undefined && loc.start.column > -1
          ? loc.start.column + 1
          : undefined,
      offset:
        startOffset !== undefined && startOffset > -1 ? startOffset : undefined
    },
    end: {
      // @ts-expect-error: return no point / no position next major.
      line:
        loc.end && loc.end.line !== undefined && loc.end.line > -1
          ? loc.end.line
          : undefined,
      // @ts-expect-error: return no point / no position next major.
      column:
        loc.end && loc.end.column !== undefined && loc.end.column > -1
          ? loc.end.column + 1
          : undefined,
      offset: endOffset !== undefined && endOffset > -1 ? endOffset : undefined
    }
  }
}
