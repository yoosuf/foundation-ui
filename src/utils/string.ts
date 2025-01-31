/**
 * Convert a string to kebab-case
 * @param str - The input string to convert
 * @returns The kebab-case version of the string
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}
