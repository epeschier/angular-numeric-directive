# angular-numeric-directive

[![NPM](https://nodei.co/npm/angular-numeric-directive.png)](https://nodei.co/npm/angular-numeric-directive/)

[![Build Status](https://travis-ci.org/epeschier/angular-numeric-directive.svg?branch=master)](http://travis-ci.org/epeschier/angular-numeric-directive)
[![Code Climate](https://codeclimate.com/github/epeschier/angular-numeric-directive/badges/gpa.svg)](https://codeclimate.com/github/epeschier/angular-numeric-directive)
[![Test Coverage](https://codeclimate.com/github/epeschier/angular-numeric-directive/badges/coverage.svg)](https://codeclimate.com/github/epeschier/angular-numeric-directive)
 [![NPM](https://img.shields.io/npm/v/angular-numeric-directive.svg)](https://www.npmjs.com/package/angular-numeric-directive)

This angular directive prevents the user from entering non-numeric values.

- There are checks on min and max values. When the value falls below the minumum the value is set to the minumum value. When the value exceeds the maxiumum, the value is set to the maximum.
- Formatting is done on the blur event; thousand separator and decimal are based on the current Angular locale.
- The number of decimals can be set.

## Usage:

1. Include the numeric-directive as a dependency for your app.

    ```js
    angular.module('myApp', ['purplefox.numeric'])
    ```
    
2. Use the directive in your view:

  ```html
  <input numeric min="-20" max="100" decimals="3" />
  ```
  
## Attributes

**`max`**: maximum input value. Default undefined (no max)

**`min`**: minimum input value. Default 0.

**`decimals`**: number of decimals. Default 2.

**`formatting`**: apply thousand separator formatting. Default true.
