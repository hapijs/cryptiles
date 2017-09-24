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

    it('should generate the right length string', async () => {

        for (let i = 1; i <= 1000; ++i) {
            expect(Cryptiles.randomString(i).length).to.equal(i);
        }
    });

    it('returns an error on invalid bits size', async () => {

        expect(() => Cryptiles.randomString(99999999999999999999)).to.throw(/Failed generating random bits/);
    });
});

describe('randomDigits()', () => {

    it('should generate the right length string', async () => {

        for (let i = 1; i <= 1000; ++i) {
            const string = Cryptiles.randomDigits(i);
            expect(string.length).to.equal(i);
            expect(string).to.match(/^\d+$/);
        }
    });

    it('returns an error on invalid bits size', async () => {

        expect(() => Cryptiles.randomDigits(99999999999999999999)).to.throw(/Failed generating random bits/);
    });
});

describe('randomBits()', () => {

    it('returns an error on invalid input', async () => {

        expect(() => Cryptiles.randomBits(0)).to.throw('Invalid random bits count');
    });
});
