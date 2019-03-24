# cryptiles

General purpose crypto utilities

[![Build Status](https://travis-ci.org/hapijs/cryptiles.svg?branch=v3-commercial)](https://travis-ci.org/hapijs/cryptiles)

## License

This version of the package requires a commercial license. You may not use, copy, or distribute it without first acquiring a commercial license from Sideway Inc. Using this software without a license is a violation of US and international law. To obtain a license, please contact [sales@sideway.com](mailto:sales@sideway.com). The open source version of this package can be found [here](https://github.com/hapijs/cryptiles).

## Methods

### `randomString(<Number> size)`
Returns a cryptographically strong pseudo-random data string. Takes a size argument for the length of the string.

### `randomDigits(<Number> size)`
Returns a cryptographically strong pseudo-random data string consisting of only numerical digits (0-9). Takes a size argument for the length of the string.

### `fixedTimeComparison(<String> a, <String> b)`
Compare two strings using fixed time algorithm (to prevent time-based analysis of MAC digest match). Returns `true` if the strings match, `false` if they differ.
