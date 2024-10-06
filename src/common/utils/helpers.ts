export function arrayToSet<T>(arr: T[], field: keyof T) {
  const set = new Set();
  for (let i = 0; i < arr.length; i++) {
    set.add(arr[i][field]);
  }
  return set;
}

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
export function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}
