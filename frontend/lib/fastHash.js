
// it's a string hashCode, two similar strings have similar hash code -> use xxhash instead
// https://www.npmjs.com/package/xxhashjs
export const fastHash = (str) => {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash; // Convert to 32bit integer
  }
  return `${hash}`; // Cast to string
};

export default fastHash;
