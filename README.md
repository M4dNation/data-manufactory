# data-manufactory

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![npm version](https://badge.fury.io/js/data-manufactory.svg)](https://badge.fury.io/js/data-manufactory)
[![Build Status](https://travis-ci.com/M4dNation/data-manufactory.svg?branch=master)](https://travis-ci.com/M4dNation/data-manufactory) ![](https://david-dm.org/M4dNation/data-manufactory.svg) [![codecov](https://codecov.io/gh/M4dNation/data-manufactory/branch/develop/graph/badge.svg)](https://codecov.io/gh/M4dNation/data-manufactory)

## About

`data-manufactory` is a package for creating batch of objects.
It provides a simple factory class you can instanciate to generate the batches you need.

**Note: This package is based on `meteor-factory` written by [versolearning](https://github.com/versolearning).  
Most of the credits goes to them.  
If you don't need our trimmed version of the package, please use the original one.**

## Install

`npm install --save data-manufactory`  
`yarn add data-manufactory`

## Usage

`data-manufactory` exports a single `Factory` class you can import :

```javascript
// ES6
import Factory from "data-manufactory";

// ES5
const Factory = require("data-manufactory");
```

Once imported, you just have to instanciate it to have an exportable factory you can use to generate data.

```javascript
import Factory from "data-manufactory";

// In order to differentiate your factories, we advise you to name them as the data being generated
export const DataFactory = new Factory({
  name: "factory", // The name of your factory
  schema: {}, // The schema to apply and generate the data
  after: [], // An array of function to apply each time an object is generated during build
  afterBuild: [], // An array of function to apply after the build is completed
  enableLogging: false, // Whether or not the logging should be enabled for this seeder
});
```

You can read the `README.md` of [versolearning](https://github.com/versolearning/meteor-factory/blob/master/README.md) for more information and documentation.

## Authors

`data-manufactory` is maintained by M4dNation Company.
First version written by [axelvaindal](https://github.com/axelvaindal).

## Contributors

There is actually no other contributors for this project.
If you want to contribute, feel free to make any suggestions or to contact us.

### Contributing to the package

We try to keep `data-manufactory` as simple as possible, this is why we decided to clone the package created by [versolearning](https://github.com/versolearning).  
Before proposing a PR or opening an issue, please keep in mind :

    - This package is meant to be as simple as possible
    - This package tries to respect the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
    - This package tries to use the minimum of dependencies possible

Taking into account the previous points leads us to **NOT** merge proposed pull-request if those :

    - Integrate changes that are too far from the initial purpose of the package
    - Integrate changes that are adding additional dependencies
    - Integrate changes that are not unit tested and motivationated

This being said, we **really** welcome pull-request and bug report, so feel free to start a contribution.

Moreover, Pull Requests should always come with related unit tests, and won't be considered if tests aren't included.

### Testing

`data-manufactory` uses jest for unit testing.  
If you don't know about jest yet, you can check out their [documentation](https://jestjs.io/en/).

To run the tests, just run :

`yarn test`

Note that we are using [codecov](https://codecov.io) to keep track of code coverage related to our tests and you shouldn't affect negatively the current coverage of the code by removing tests or not covering new features with new unit tests.

## Licence

`data-manufactory` is available under the terms of the MIT LICENSE.  
Check the licence file for more information.
