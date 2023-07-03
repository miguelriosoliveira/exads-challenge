export function deepCopy<T>(arr: T[]): T[] {
  return structuredClone(arr);
}
