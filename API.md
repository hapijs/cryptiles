

## Methods


### `randomString(size: number): string`

Returns a cryptographically strong pseudo-random data string. Takes a size argument for the length of the string.

### `randomAlphanumString(size: number): string`

Returns a cryptographically strong pseudo-random alphanumeric data string. Takes a size argument for the length of the string.

### `randomDigits(size: number): string`

Returns a cryptographically strong pseudo-random data string consisting of only numerical digits (0-9). Takes a size argument for the length of the string.

### `randomBits(bits: number): Buffer`

Returns a Buffer of cryptographically strong pseudo-random bits. Takes a bits argument for the number of bits to generate.

### `fixedTimeComparison(a: string, b: string): boolean`

Performs a constant-time comparison of two strings to prevent timing attacks. Returns `true` if the strings are equal, `false` otherwise. Safe to use with strings of different lengths.
