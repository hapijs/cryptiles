'use strict';

// Load modules

const Code = require('code');
const Cryptiles = require('..');
const Lab = require('lab');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('randomString()', () => {

    it('should generate the right length string', (done) => {

        for (let i = 1; i <= 1000; ++i) {
            expect(Cryptiles.randomString(i).length).to.equal(i);
        }

        done();
    });

    it('returns an error on invalid bits size', (done) => {

        expect(Cryptiles.randomString(99999999999999999999).message).to.match(/Failed generating random bits/);
        done();
    });
});

describe('randomDigits()', () => {

    it('should generate the right length string', (done) => {

        for (let i = 1; i <= 1000; ++i) {
            const string = Cryptiles.randomDigits(i);
            expect(string.length).to.equal(i);
            expect(string).to.match(/^\d+$/);
        }

        done();
    });

    it('generates equal digits distribution', (done) => {

        const digits = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        for (let i = 0; i < 1000000; ++i) {
            digits[Cryptiles.randomDigits(1)] += 1;
        }

        for (const digit in digits) {
            expect(digits[digit]).to.be.between(99000, 101000);
        }

        done()
    });

    it('returns an error on invalid bits size', (done) => {

        expect(Cryptiles.randomDigits(99999999999999999999).message).to.match(/Failed generating random bits/);
        done();
    });
});

describe('randomBits()', () => {

    it('returns an error on invalid input', (done) => {

        expect(Cryptiles.randomBits(0).message).to.equal('Invalid random bits count');
        done();
    });
});

describe('fixedTimeComparison()', () => {

    const a = Cryptiles.randomString(50000);
    const b = Cryptiles.randomString(150000);

    it('should take the same amount of time comparing different string sizes', (done) => {

        let now = Date.now();
        Cryptiles.fixedTimeComparison(b, a);
        const t1 = Date.now() - now;

        now = Date.now();
        Cryptiles.fixedTimeComparison(b, b);
        const t2 = Date.now() - now;

        expect(t2 - t1).to.be.within(-20, 20);
        done();
    });

    it('should return true for equal strings', (done) => {

        expect(Cryptiles.fixedTimeComparison(a, a)).to.equal(true);
        done();
    });

    it('should return false for different strings (size, a < b)', (done) => {

        expect(Cryptiles.fixedTimeComparison(a, a + 'x')).to.equal(false);
        done();
    });

    it('should return false for different strings (size, a > b)', (done) => {

        expect(Cryptiles.fixedTimeComparison(a + 'x', a)).to.equal(false);
        done();
    });

    it('should return false for different strings (size, a = b)', (done) => {

        expect(Cryptiles.fixedTimeComparison(a + 'x', a + 'y')).to.equal(false);
        done();
    });

    it('should return false when not a string', (done) => {

        expect(Cryptiles.fixedTimeComparison('x', null)).to.equal(false);
        done();
    });

    it('should return false when not a string (left)', (done) => {

        expect(Cryptiles.fixedTimeComparison(null, 'x')).to.equal(false);
        done();
    });
});
