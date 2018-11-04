# data-manufactory

## About

`data-manufactory` is a package for creating batch of objects.
It provides a simple factory class you can instanciate to generate the batches you need.

**Note: This package is based on `meteor-factory` written by [versolearning](https://github.com/versolearning). Most of the credits goes to them.  
If you don't need our trimmed version of the package, please use the original one.**

## Install

`npm install --save data-manufactory`

## Usage

`data-manufactory` exports a single `Factory` class you can import :

```javascript
// ES6
import Factory from 'data-manufactory';

// ES5
const Factory = require('data-manufactory');
```

Once imported, you just have to instanciate to have an exportable factory you can use to generate data.

```javascript
import Factory from 'data-manufactory';

// In order to differentiate your factories, we advise you to name them as the data being seeded
export const DataFactory = new Factory({
    name: "factory", // The name of your factory
    schema: {}, // The schema to apply and generate the data
    after: [], // An array of function to apply each time an object is generated during build
    afterBuild: [], // An array of function to apply after the build is completed
    enableLogging: false // Whether or not the logging should be enabled for this seeder
});

```