import * as Cryptiles from '..';
import * as Lab from '@hapi/lab';


const { expect } = Lab.types;


// randomString()

Cryptiles.randomString(256);
Cryptiles.randomString(5 * 5);
Cryptiles.randomString(0);

expect.type<string>(Cryptiles.randomString(128))

expect.error(Cryptiles.randomString('some'));
expect.error(Cryptiles.randomString(true));
expect.error(Cryptiles.randomString({ foo: true }));
expect.error(Cryptiles.randomString(128, 256));


// randomDigits()

Cryptiles.randomDigits(256);
Cryptiles.randomDigits(5 * 5);
Cryptiles.randomDigits(0);

expect.type<string>(Cryptiles.randomDigits(128))

expect.error(Cryptiles.randomDigits('some'));
expect.error(Cryptiles.randomDigits(true));
expect.error(Cryptiles.randomDigits({ foo: true }));
expect.error(Cryptiles.randomDigits(128, 256));


// randomBits()

Cryptiles.randomBits(256);
Cryptiles.randomBits(5 * 5);

expect.type<Buffer>(Cryptiles.randomBits(128))

expect.error(Cryptiles.randomBits('some'));
expect.error(Cryptiles.randomBits(true));
expect.error(Cryptiles.randomBits({ foo: true }));
expect.error(Cryptiles.randomBits(128, 256));


// fixedTimeComparison()

Cryptiles.fixedTimeComparison(["foo"], ["bar"]);
Cryptiles.fixedTimeComparison("foo", "bar");
Cryptiles.fixedTimeComparison("foo", ["foo"]);

expect.type<boolean>(Cryptiles.fixedTimeComparison("foo", "foo"))

expect.error(Cryptiles.fixedTimeComparison('foo', 24));
expect.error(Cryptiles.fixedTimeComparison({ foo: "bar" }, "foo"));
expect.error(Cryptiles.fixedTimeComparison("foo", "bar", "foo"));
