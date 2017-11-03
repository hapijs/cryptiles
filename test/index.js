'use strict';

// Load modules

const Code = require('code');
const Cryptiles = require('..');
const Lab = require('lab');


// Declare internals

const internals = {};


// Test shortcuts

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
});

describe('randomBits()', () => {

    it('returns an error on invalid input', () => {

        expect(() => Cryptiles.randomBits(0)).to.throw('Invalid random bits count');
    });
});

describe('fixedTimeComparison()', () => {

    it('validates strings', () => {

        expect(Cryptiles.fixedTimeComparison('asdasd', 'asdasd')).to.be.true();
        expect(Cryptiles.fixedTimeComparison('', '')).to.be.true();
        expect(Cryptiles.fixedTimeComparison('asdas', 'asdasd')).to.be.false();
    });
});
