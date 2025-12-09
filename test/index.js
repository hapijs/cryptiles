'use strict';

const Code = require('@hapi/code');
const Cryptiles = require('..');
const Lab = require('@hapi/lab');


const internals = {};


const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;


describe('randomString()', () => {

    it('should generate the right length string', () => {

        for (let i = 1; i <= 1000; ++i) {
            expect(Cryptiles.randomString(i).length).to.equal(i);
        }
    });

    it('returns an error on invalid bits size', () => {

        expect(() => Cryptiles.randomString(99999999999999999999)).to.throw(/Failed generating random bits/);
    });
});

describe('randomAlphanumString()', () => {

    it('should generate the right length string', () => {

        for (let i = 1; i <= 1000; ++i) {
            const string = Cryptiles.randomAlphanumString(i);
            expect(string.length).to.equal(i);
            expect(string).to.match(/^[a-zA-Z0-9]+$/);
        }
    });

    it('returns an error on invalid bits size', () => {

        expect(() => Cryptiles.randomAlphanumString(99999999999999999999)).to.throw(/Failed generating random bits/);
    });
});

describe('randomDigits()', () => {

    it('should generate the right length string', () => {

        for (let i = 1; i <= 1000; ++i) {
            const string = Cryptiles.randomDigits(i);
            expect(string.length).to.equal(i);
            expect(string).to.match(/^\d+$/);
        }
    });

    it('returns an error on invalid bits size', () => {

        expect(() => Cryptiles.randomDigits(99999999999999999999)).to.throw(/Failed generating random bits/);
    });

    it('generates equal digits distribution', { timeout: 30000 }, () => {

        const digits = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        for (let i = 0; i < 1000000; ++i) {
            digits[Cryptiles.randomDigits(1)] += 1;
        }

        for (const digit in digits) {
            expect(digits[digit]).to.be.between(99000, 101000);
        }
    });
});

describe('randomBits()', () => {

    it('returns an error on invalid input', () => {

        expect(() => Cryptiles.randomBits(0)).to.throw('Invalid random bits count');
        expect(() => Cryptiles.randomBits(-1)).to.throw('Invalid random bits count');
    });
});

describe('fixedTimeComparison()', () => {

    it('validates strings', () => {

        expect(Cryptiles.fixedTimeComparison('asdasd', 'asdasd')).to.be.true();
        expect(Cryptiles.fixedTimeComparison('', '')).to.be.true();
        expect(Cryptiles.fixedTimeComparison('asdas', 'asdasd')).to.be.false();
    });

    it('should not throw if buffer size differs', () => {

        expect(() => Cryptiles.fixedTimeComparison('a', 'ab')).to.not.throw();
        expect(() => Cryptiles.fixedTimeComparison('abc', 'a')).to.not.throw();
        expect(() => Cryptiles.fixedTimeComparison('', 'a')).to.not.throw();
        expect(() => Cryptiles.fixedTimeComparison('a', '')).to.not.throw();
    });

    it('should provide constant time regardless of the size of the right-most argument', { timeout: 10000 },  () => {

        // Test that comparison time is based on left argument, not right
        // When lengths differ, we compare left to itself (constant time based on left)
        const largeLeft = 'a'.repeat(100000);
        const smallLeft = 'b'.repeat(10);
        const smallRight = 'x'.repeat(10);
        const largeRight = 'y'.repeat(100000);

        const iterations = 10000;

        // Warm up
        for (let i = 0; i < 1000; ++i) {
            Cryptiles.fixedTimeComparison(largeLeft, smallRight);
            Cryptiles.fixedTimeComparison(smallLeft, largeRight);
        }

        // Measure large left + small right (timing should be based on large left)
        const startLargeLeft = process.hrtime.bigint();
        for (let i = 0; i < iterations; ++i) {
            Cryptiles.fixedTimeComparison(largeLeft, smallRight);
        }

        const endLargeLeft = process.hrtime.bigint();
        const largeLeftTime = Number(endLargeLeft - startLargeLeft);

        // Measure small left + large right (timing should be based on small left)
        const startSmallLeft = process.hrtime.bigint();
        for (let i = 0; i < iterations; ++i) {
            Cryptiles.fixedTimeComparison(smallLeft, largeRight);
        }

        const endSmallLeft = process.hrtime.bigint();
        const smallLeftTime = Number(endSmallLeft - startSmallLeft);

        // Large left should take longer than small left, proving timing is based on left
        // Even though small left has a much larger right argument
        expect(largeLeftTime).to.be.above(smallLeftTime);
    });
});
