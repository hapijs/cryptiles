/// <reference types="node" />

/**
 * Generate a cryptographically strong pseudo-random data
 *
 * @param size - Size of the string
 * @returns A cryptographically strong pseudo-random data
 */

export function randomString(size: number): string;

/**
 * Generate a cryptographically strong pseudo-random alphanumeric data
 *
 * @param size - Size of the string
 * @returns A cryptographically strong pseudo-random alphanumeric data
 */

export function randomAlphanumString(size: number): string;

/**
 * Return a random string of digits
 *
 * @param size - Size of the digits
 * @returns A random string of digits
 */

export function randomDigits(size: number): string;

/**
 * Generate a buffer of random bits
 *
 * @param bits - Number of bits
 * @returns A buffer of random bits
 */

export function randomBits(bits: number): Buffer;

/**
 * Compare two values without leaking where they differ. Equal-length inputs compare in constant time; a length mismatch
 * returns false early, so length is observable.
 *
 * @param a - Data to compare
 * @param b - Data to compare
 * @returns True if a and b hold the same bytes, false otherwise
 */

export function fixedTimeComparison(a: string | Array<any>, b: string | Array<any>): boolean;
