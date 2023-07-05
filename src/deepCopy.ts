/*
Implement a utility function that accepts an array of objects and returns a deep copy of the input array.
The input objects may contain nested objects, arrays, or primitive data types.
Use TypeScript to ensure the function is type-safe.
*/

function copyObject<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((obj) => copyObject(obj)) as T;
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, copyObject(value)]),
    ) as T;
  }
  return obj;
}

export function deepCopy<T>(arr: T[]): T[] {
  return arr.map((obj) => copyObject(obj));
}
