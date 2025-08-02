export const BASE62_CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function customCompare(a?: string, b?: string): number {
  if (!a) return 1;
  if (!b) return -1;

  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; ) {
    const charA = a[i] ?? '';
    const charB = b[i] ?? '';

    const indexA = BASE62_CHARSET.indexOf(charA);
    const indexB = BASE62_CHARSET.indexOf(charB);

    if (indexA < indexB) return -1;
    if (indexA > indexB) return 1;
    i += 1;
  }
  return 0;
}

export function getIntegerLength(head: string): number {
  if (head >= 'a' && head <= 'z') {
    return head.charCodeAt(0) - 'a'.charCodeAt(0) + 2;
  }
  if (head >= 'A' && head <= 'Z') {
    return 'Z'.charCodeAt(0) - head.charCodeAt(0) + 2;
  }
  throw new Error(`invalid order key head: ${head}`);
}

export function validateInteger(int: string): void {
  if (int.length !== getIntegerLength(int[0])) {
    throw new Error(`invalid integer part of order key: ${int}`);
  }
}

export function getIntegerPart(key: string): string {
  const integerPartLength = getIntegerLength(key[0]);
  if (integerPartLength > key.length) {
    throw new Error(`invalid order key: ${key}`);
  }
  return key.slice(0, integerPartLength);
}

function validateOrderKey(key: string, digits: string): void {
  if (key === `A${digits[0].repeat(26)}`) {
    throw new Error(`invalid order key: ${key}`);
  }

  const i = getIntegerPart(key);
  const f = key.slice(i.length);
  if (f.slice(-1) === digits[0]) {
    throw new Error(`invalid order key: ${key}`);
  }
}

export function midpoint(a: string, b: string | null | undefined, digits: string): string {
  const zero = digits[0];
  if (b != null && a >= b) {
    throw new Error(`${a} >= ${b}`);
  }
  if (a.slice(-1) === zero || (b && b.slice(-1) === zero)) {
    throw new Error('trailing zero');
  }
  if (b) {
    let n = 0;
    while ((a[n] || zero) === b[n]) {
      n += 1;
    }
    if (n > 0) {
      return b.slice(0, n) + midpoint(a.slice(n), b.slice(n), digits);
    }
  }

  const digitA = a ? digits.indexOf(a[0]) : 0;
  const digitB = b != null ? digits.indexOf(b[0]) : digits.length;
  if (digitB - digitA > 1) {
    const midDigit = Math.round(0.5 * (digitA + digitB));
    return digits[midDigit];
  }

  if (b && b.length > 1) {
    return b.slice(0, 1);
  }
  return digits[digitA] + midpoint(a.slice(1), null, digits);
}

export function incrementInteger(x: string, digits: string): string | null {
  validateInteger(x);
  const [head, ...digs] = x.split('');
  let carry = true;
  for (let i = digs.length - 1; carry && i >= 0; i -= 1) {
    const d = digits.indexOf(digs[i]) + 1;
    if (d === digits.length) {
      const [firstDigit] = Array.from(digits);
      digs[i] = firstDigit;
    } else {
      digs[i] = digits[d];
      carry = false;
    }
  }
  if (carry) {
    if (head === 'Z') {
      return `a${digits[0]}`;
    }
    if (head === 'z') {
      return null;
    }
    const h = String.fromCharCode(head.charCodeAt(0) + 1);
    if (h > 'a') {
      digs.push(digits[0]);
    } else {
      digs.pop();
    }
    return h + digs.join('');
  }
  return head + digs.join('');
}

export function decrementInteger(x: string, digits: string): string | null {
  validateInteger(x);
  const [head, ...digs] = x.split('');
  let borrow = true;
  for (let i = digs.length - 1; borrow && i >= 0; i -= 1) {
    const d = digits.indexOf(digs[i]) - 1;
    if (d === -1) {
      digs[i] = digits.slice(-1);
    } else {
      digs[i] = digits[d];
      borrow = false;
    }
  }
  if (borrow) {
    if (head === 'a') {
      return `Z${digits.slice(-1)}`;
    }
    if (head === 'A') {
      return null;
    }
    const h = String.fromCharCode(head.charCodeAt(0) - 1);
    if (h < 'Z') {
      digs.push(digits.slice(-1));
    } else {
      digs.pop();
    }
    return h + digs.join('');
  }
  return head + digs.join('');
}

export function generateRankBetweenTwoTickets(
  a: string | null | undefined,
  b: string | null | undefined,
  digits = BASE62_CHARSET
): string {
  if (a != null) {
    validateOrderKey(a, digits);
  }
  if (b != null) {
    validateOrderKey(b, digits);
  }
  if (a != null && b != null && a >= b) {
    throw new Error(`${a} >= ${b}`);
  }
  if (a == null) {
    if (b == null) {
      return `a${digits[0]}`;
    }

    const ib = getIntegerPart(b);
    const fb = b.slice(ib.length);
    if (ib === `A${digits[0].repeat(26)}`) {
      return ib + midpoint('', fb, digits);
    }
    if (ib < b) {
      return ib;
    }
    const res = decrementInteger(ib, digits);
    if (res == null) {
      throw new Error('cannot decrement any more');
    }
    return res;
  }

  if (b == null) {
    const ia = getIntegerPart(a);
    const fa = a.slice(ia.length);
    const i = incrementInteger(ia, digits);
    return i == null ? ia + midpoint(fa, null, digits) : i;
  }

  const ia = getIntegerPart(a);
  const fa = a.slice(ia.length);
  const ib = getIntegerPart(b);
  const fb = b.slice(ib.length);
  if (ia === ib) {
    return ia + midpoint(fa, fb, digits);
  }
  const i = incrementInteger(ia, digits);
  if (i == null) {
    throw new Error('cannot increment any more');
  }
  if (i < b) {
    return i;
  }
  return ia + midpoint(fa, null, digits);
}

export function generateNRanksBetweenTwoTickets(
  a: string | null | undefined,
  b: string | null | undefined,
  n: number,
  digits = BASE62_CHARSET
): string[] {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [generateRankBetweenTwoTickets(a, b, digits)];
  }
  if (b == null) {
    let c = generateRankBetweenTwoTickets(a, b, digits);
    const result = [c];
    for (let i = 0; i < n - 1; i += 1) {
      c = generateRankBetweenTwoTickets(c, b, digits);
      result.push(c);
    }
    return result;
  }
  if (a == null) {
    let c = generateRankBetweenTwoTickets(a, b, digits);
    const result = [c];
    for (let i = 0; i < n - 1; i += 1) {
      c = generateRankBetweenTwoTickets(a, c, digits);
      result.push(c);
    }
    result.reverse();
    return result;
  }
  const mid = Math.floor(n / 2);
  const c = generateRankBetweenTwoTickets(a, b, digits);
  return [
    ...generateNRanksBetweenTwoTickets(a, c, mid, digits),
    c,
    ...generateNRanksBetweenTwoTickets(c, b, n - mid - 1, digits)
  ];
}

export function rebalanceRanks(ranks?: string[]): string[] {
  if (!ranks) {
    return [];
  }
  const newRanks = generateNRanksBetweenTwoTickets(null, null, ranks.length);
  return newRanks;
}
