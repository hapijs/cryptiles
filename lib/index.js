'use strict';

// Load modules

const Crypto = require('crypto');

const Boom = require('boom');


// Declare internals

const internals = {};


// Generate a cryptographically strong pseudo-random data

exports.randomString = function (size) {

    const buffer = exports.randomBits((size + 1) * 6);
    const string = buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
    return string.slice(0, size);
};


// Return a random string of digits

exports.randomDigits = function (size) {

    const buffer = exports.randomBits(size * 8);
    const digits = [];
    for (let i = 0; i < buffer.length; ++i) {
        digits.push(Math.floor(buffer[i] / 25.6));
    }

    return digits.join('');
};


// Generate a buffer of random bits

exports.randomBits = function (bits) {

    if (!bits ||
        bits < 0) {

        throw Boom.internal('Invalid random bits count');
    }

    const bytes = Math.ceil(bits / 8);
    try {
        return Crypto.randomBytes(bytes);
    }
    catch (err) {
        throw Boom.internal('Failed generating random bits: ' + err.message);
    }
};


exports.fixedTimeComparison = function (a, b) {

    try {
        return Crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
    }
    catch (err) {
        return false;
    }
};
