# type-detection
Detect type of variable - string, integer, array, geolocation, float, repeatable_string etc

## usage

```js
var detector = require('type-detection')

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

detector.detectFieldType('path/path.jpg')
// image

detector.detectFieldType(5.6)
// float

detector.detectFieldType(['Drama', 'Crime fiction'])
// array
```


## installation
`npm install type-detection --save`

