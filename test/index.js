// Load modules

var Chai = require('chai');
var Cryptiles = process.env.TEST_COV ? require('../lib-cov') : require('../lib');


// Declare internals

var internals = {};


// Test shortcuts

var expect = Chai.expect;


describe('Cryptiles', function () {

    describe('#fixedTimeComparison', function () {

        var a = Cryptiles.randomString(50000);
        var b = Cryptiles.randomString(150000);

        it('should take the same amount of time comparing different string sizes', function (done) {

            var now = Date.now();
            Cryptiles.fixedTimeComparison(b, a);
            var t1 = Date.now() - now;

            now = Date.now();
            Cryptiles.fixedTimeComparison(b, b);
            var t2 = Date.now() - now;

            expect(t2 - t1).to.be.within(-2, 2);
            done();
        });

        it('should return true for equal strings', function (done) {

            expect(Cryptiles.fixedTimeComparison(a, a)).to.equal(true);
            done();
        });

        it('should return false for different strings (size, a < b)', function (done) {

            expect(Cryptiles.fixedTimeComparison(a, a + 'x')).to.equal(false);
            done();
        });

        it('should return false for different strings (size, a > b)', function (done) {

            expect(Cryptiles.fixedTimeComparison(a + 'x', a)).to.equal(false);
            done();
        });

        it('should return false for different strings (size, a = b)', function (done) {

            expect(Cryptiles.fixedTimeComparison(a + 'x', a + 'y')).to.equal(false);
            done();
        });
    });
});


