// interleave([1,2,3], 0) => [1,0,2,0,3]
export function interleave(xs: any[], x: any) {
  let result = [];

  for (let i = 0; i < (xs || []).length; i++) {
    result.push(xs[i]);
    const _x = typeof x === 'function' ? x() : x;
    result.push(_x);
  }

  result.pop();

  return result;
}

let code = 0;
export function nextKey() {
  return `key${code++}`;
}
