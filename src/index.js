import * as Crypto from 'node:crypto';

import * as Boom from '@hapi/boom';

// Generate a cryptographically strong pseudo-random data

export function randomString(size) {
    return randomBits((size + 1) * 6)
        .toString('base64url')
        .slice(0, size);
}

// Generate a cryptographically strong pseudo-random alphanum data

export function randomAlphanumString(size) {
    let result = '';

    while (result.length < size) {
        const buffer = randomBits((size + 1) * 6);
        result += buffer.toString('base64').replace(/[^a-zA-Z0-9]/g, '');
    }

    return result.slice(0, size);
}

// Return a random string of digits

export function randomDigits(size) {
    const digits = [];

    let buffer = random(size * 2); // Provision twice the amount of bytes needed to increase chance of single pass
    let pos = 0;

    while (digits.length < size) {
        if (pos >= buffer.length) {
            buffer = random(size * 2);
            pos = 0;
        }

        if (buffer[pos] < 250) {
            digits.push(buffer[pos] % 10);
        }

        ++pos;
    }

    return digits.join('');
}

// Generate a buffer of random bits

export function randomBits(bits) {
    if (!bits || bits < 0) {
        throw Boom.internal('Invalid random bits count');
    }

    const bytes = Math.ceil(bits / 8);
    return random(bytes);
}

export function fixedTimeComparison(a, b) {
    try {
        return Crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
    } catch {
        return false;
    }
}

function random(bytes) {
    try {
        return Crypto.randomBytes(bytes);
    } catch (err) {
        throw Boom.internal('Failed generating random bits: ' + err.message);
    }
}
