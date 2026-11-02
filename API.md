## Methods

### `randomString(size: number): string`

Returns a cryptographically strong pseudo-random data string. Takes a size argument for the length of the string.

### `randomAlphanumString(size: number): string`

Returns a cryptographically strong pseudo-random alphanumeric data string. Takes a size argument for the length of the string.

### `randomDigits(size: number): string`

Returns a cryptographically strong pseudo-random data string consisting of only numerical digits (0-9). Takes a size argument for the length of the string.

### `randomBits(bits: number): Buffer`

Returns a Buffer of cryptographically strong pseudo-random bits. Takes a bits argument for the number of bits to generate.

### `fixedTimeComparison(a: string | Array<any>, b: string | Array<any>): boolean`

Compares two strings or byte arrays to prevent timing attacks. Returns `true` if they hold the same bytes, `false` otherwise. Inputs of equal length compare in constant time. A length mismatch returns `false` early, so the length of an input is observable.
