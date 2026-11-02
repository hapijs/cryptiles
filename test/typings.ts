import { describe, expectTypeOf, it } from 'vitest';

import * as Cryptiles from '../src/index.js';

describe('typings', () => {
    describe('randomString', () => {
        it('returns a string', () => {
            Cryptiles.randomString(256);
            Cryptiles.randomString(5 * 5);
            expectTypeOf(Cryptiles.randomString(128)).toEqualTypeOf<string>();
        });

        it('invalid calls rejected', () => {
            try {
                // @ts-expect-error size must be a number
                Cryptiles.randomString('some');
            } catch {}

            try {
                // @ts-expect-error size must be a number
                Cryptiles.randomString(true);
            } catch {}

            try {
                // @ts-expect-error size must be a number
                Cryptiles.randomString({ foo: true });
            } catch {}

            // @ts-expect-error takes one argument
            Cryptiles.randomString(128, 256);
        });
    });

    describe('randomAlphanumString', () => {
        it('returns a string', () => {
            Cryptiles.randomAlphanumString(256);
            Cryptiles.randomAlphanumString(5 * 5);
            expectTypeOf(Cryptiles.randomAlphanumString(128)).toEqualTypeOf<string>();
        });

        it('invalid calls rejected', () => {
            try {
                // @ts-expect-error size must be a number
                Cryptiles.randomAlphanumString('some');
            } catch {}

            try {
                // @ts-expect-error size must be a number
                Cryptiles.randomAlphanumString(true);
            } catch {}

            try {
                // @ts-expect-error size must be a number
                Cryptiles.randomAlphanumString({ foo: true });
            } catch {}

            // @ts-expect-error takes one argument
            Cryptiles.randomAlphanumString(128, 256);
        });
    });

    describe('randomDigits', () => {
        it('returns a string', () => {
            Cryptiles.randomDigits(256);
            Cryptiles.randomDigits(5 * 5);
            expectTypeOf(Cryptiles.randomDigits(128)).toEqualTypeOf<string>();
        });

        it('invalid calls rejected', () => {
            try {
                // @ts-expect-error size must be a number
                Cryptiles.randomDigits('some');
            } catch {}

            try {
                // @ts-expect-error size must be a number
                Cryptiles.randomDigits(true);
            } catch {}

            try {
                // @ts-expect-error size must be a number
                Cryptiles.randomDigits({ foo: true });
            } catch {}

            // @ts-expect-error takes one argument
            Cryptiles.randomDigits(128, 256);
        });
    });

    describe('randomBits', () => {
        it('returns a buffer', () => {
            Cryptiles.randomBits(256);
            Cryptiles.randomBits(5 * 5);
            expectTypeOf(Cryptiles.randomBits(128)).toEqualTypeOf<Buffer>();
        });

        it('invalid calls rejected', () => {
            try {
                // @ts-expect-error bits must be a number
                Cryptiles.randomBits('some');
            } catch {}

            try {
                // @ts-expect-error bits must be a number
                Cryptiles.randomBits(true);
            } catch {}

            try {
                // @ts-expect-error bits must be a number
                Cryptiles.randomBits({ foo: true });
            } catch {}

            // @ts-expect-error takes one argument
            Cryptiles.randomBits(128, 256);
        });
    });

    describe('fixedTimeComparison', () => {
        it('returns a boolean', () => {
            Cryptiles.fixedTimeComparison(['foo'], ['bar']);
            Cryptiles.fixedTimeComparison('foo', 'bar');
            Cryptiles.fixedTimeComparison('foo', ['foo']);
            expectTypeOf(Cryptiles.fixedTimeComparison('foo', 'foo')).toEqualTypeOf<boolean>();
        });

        it('invalid calls rejected', () => {
            // @ts-expect-error b must be a string or an array
            Cryptiles.fixedTimeComparison('foo', 24);

            // @ts-expect-error a must be a string or an array
            Cryptiles.fixedTimeComparison({ foo: 'bar' }, 'foo');

            // @ts-expect-error takes two arguments
            Cryptiles.fixedTimeComparison('foo', 'bar', 'foo');
        });
    });
});
