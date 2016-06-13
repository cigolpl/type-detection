# type-detection
Detect type of variable - string, integer, array, geolocation, float, repeatable_string etc

## usage

```js
var detector = require('type-detection')

// there is detectFieldType (single variable) and detectFieldsType (array of variables) 

detector.detectFieldsType(['a', 'a,b,c,d', 'c'])
// array

detector.detectFieldType('81.36, 16.40')
// geo

detector.detectFieldsType(['a', 'a', 'c'])
// repeatable_string

detector.detectFieldsType(['a', 'b', 'c'])
// string

detector.detectFieldsType(['a', 'b', 'c', '', '', ''])
// string

detector.detectFieldType(false)
// boolean

detector.detectFieldType('06/22/2015')
// date
```


## installation
`npm install type-detection --save`

