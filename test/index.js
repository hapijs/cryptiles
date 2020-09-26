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

    it('generates equal digits distribution', { timeout: 10000 }, () => {

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
});
