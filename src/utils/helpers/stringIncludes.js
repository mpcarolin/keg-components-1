import { pipeline, isStr, validate } from 'jsutils'

/**
 * Returns true if aString includes bString as a substring after applying the functions in transformFuncs 
 * @param {String} aString
 * @param {String} bString 
 * @param {Array} transformFuncs functions which transform aString and bString before the substring check
 * @example stringIncludes("I can say my abcs all day", "ÁBC", [ignoreCase, ignoreAccents]) // returns true
 */
export const stringIncludes = (aString, bString, transformFuncs=[]) => {
  const [ valid ] = validate({ aString, bString }, { $default: isStr })
  if (!valid) return

  const a = pipeline(aString, ...transformFuncs)
  const b = pipeline(bString, ...transformFuncs)
  return a.includes(b)
}

/**
 * @param {String} s - string
 * @returns {String} s in lower case
 */
export const toLowerCase = (s) => s.toLowerCase()

/** Returns 
/**
 * @param {*} s 
 * @returns {String} s without accents
 */
export const ignoreAccents = (s) => s
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')