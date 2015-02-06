# angular-numeric-directive
AngularJS numeric directive

This angular directive prevents the user from entering non-numeric values.

There are checks on min and max values. When the value falls below the minumum the value is set to the minumum value. When the value exceeds the maxiumum, the value is set to the maximum.

Formatting is done on thousand separator and decimal ased on the current Angular locale.

The number of decimals can be set.

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
