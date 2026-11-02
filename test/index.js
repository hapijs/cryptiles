import { describe, expect, it } from 'vitest';

import * as Cryptiles from '../src/index.js';

describe('randomString()', () => {
    it('should generate the right length string', () => {
        for (let i = 1; i <= 1000; ++i) {
            expect(Cryptiles.randomString(i).length).toBe(i);
        }
    });

    it('returns an error on invalid bits size', () => {
        expect(() => Cryptiles.randomString(99999999999999999999)).toThrow(/Failed generating random bits/);
    });
});

describe('randomAlphanumString()', () => {
    it('should generate the right length string', () => {
        for (let i = 1; i <= 1000; ++i) {
            const string = Cryptiles.randomAlphanumString(i);
            expect(string.length).toBe(i);
            expect(string).toMatch(/^[a-zA-Z0-9]+$/);
        }
    });

    it('returns an error on invalid bits size', () => {
        expect(() => Cryptiles.randomAlphanumString(99999999999999999999)).toThrow(/Failed generating random bits/);
    });
});

describe('randomDigits()', () => {
    it('should generate the right length string', () => {
        for (let i = 1; i <= 1000; ++i) {
            const string = Cryptiles.randomDigits(i);
            expect(string.length).toBe(i);
            expect(string).toMatch(/^\d+$/);
        }
    });

    it('returns an error on invalid bits size', () => {
        expect(() => Cryptiles.randomDigits(99999999999999999999)).toThrow(/Failed generating random bits/);
    });

    it('generates equal digits distribution', { timeout: 30000 }, () => {
        const digits = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        for (let i = 0; i < 1000000; ++i) {
            digits[Cryptiles.randomDigits(1)] += 1;
        }

        for (const digit in digits) {
            expect(digits[digit]).toBeGreaterThan(99000);
            expect(digits[digit]).toBeLessThan(101000);
        }
    });
});

describe('randomBits()', () => {
    it('returns an error on invalid input', () => {
        expect(() => Cryptiles.randomBits(0)).toThrow(/^Invalid random bits count$/);
        expect(() => Cryptiles.randomBits(-1)).toThrow(/^Invalid random bits count$/);
    });
});

describe('fixedTimeComparison()', () => {
    it('validates strings', () => {
        expect(Cryptiles.fixedTimeComparison('asdasd', 'asdasd')).toBe(true);
        expect(Cryptiles.fixedTimeComparison('', '')).toBe(true);
        expect(Cryptiles.fixedTimeComparison('asdas', 'asdasd')).toBe(false);
    });

    it('should not throw if buffer size differs', () => {
        expect(() => Cryptiles.fixedTimeComparison('a', 'ab')).not.toThrow();
        expect(() => Cryptiles.fixedTimeComparison('abc', 'a')).not.toThrow();
        expect(() => Cryptiles.fixedTimeComparison('', 'a')).not.toThrow();
        expect(() => Cryptiles.fixedTimeComparison('a', '')).not.toThrow();
    });

    it('returns false when lengths differ', () => {
        expect(Cryptiles.fixedTimeComparison('a', 'ab')).toBe(false);
        expect(Cryptiles.fixedTimeComparison('abc', 'a')).toBe(false);
        expect(Cryptiles.fixedTimeComparison('', 'a')).toBe(false);
        expect(Cryptiles.fixedTimeComparison('a', '')).toBe(false);
    });

    it('returns false on inputs a buffer cannot be built from', () => {
        expect(Cryptiles.fixedTimeComparison(null, 'a')).toBe(false);
        expect(Cryptiles.fixedTimeComparison('a', undefined)).toBe(false);
        expect(Cryptiles.fixedTimeComparison(24, 24)).toBe(false);
    });

    it('compares arrays by byte value', () => {
        expect(Cryptiles.fixedTimeComparison([1, 2], [1, 2])).toBe(true);
        expect(Cryptiles.fixedTimeComparison([1, 2], [1, 3])).toBe(false);
        expect(Cryptiles.fixedTimeComparison('a', [97])).toBe(true);
    });
});
