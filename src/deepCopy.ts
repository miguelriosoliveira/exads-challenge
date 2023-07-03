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
