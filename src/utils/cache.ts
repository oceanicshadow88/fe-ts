const cache = new Map();

export function addToCache(key, value) {
  cache.set(key, value);
  return cache.get(key);
}

export async function mutation(key, cb) {
  return addToCache(key, await cb());
}

export async function query(key, cb) {
  return cache.has(key) ? cache.get(key) : addToCache(key, await cb());
}

// function removeFromCache(key) {
//   cache.delete(key);
// }
