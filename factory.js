const { Obj } = require("jstoolbox");

class Factory {
  /**
   * Instanciate a factory.
   * @return   {Factory}   A new factory
   */
  constructor({
    name = "factory",
    schema = {},
    after = [],
    afterBuild = [],
    enableLogging = false,
  }) {
    if (!Obj.isString(name) || Obj.isFalsy(name)) {
      throw new TypeError("Factory name must be a nom empty string");
    }

    if (!Obj.isPlainObject(schema)) {
      throw new TypeError("schema must be a plain object");
    }

    if (!Obj.isArray(after)) {
      throw new TypeError("after must be an array of function");
    }

    if (!Obj.isArray(afterBuild)) {
      throw new TypeError("afterBuild must be an array of function");
    }

    if (!Obj.isBool(enableLogging)) {
      throw new TypeError("enableLogging must be a boolean");
    }

    this.name = name;
    this.schema = schema;
    this.after = after;
    this.afterBuild = afterBuild;
    this.enableLogging = enableLogging;
  }

  /**
   * Build data based on provided schema.
   * @param   {Number}     The number of data to build
   * @return   {Array}     An array with all generated data
   */
  build(count = 1) {
    if (!Obj.isNumber(count)) {
      throw new TypeError("count must be a number");
    }

    count = count < 1 ? 1 : count;

    let result = [];

    for (let i = 0; i < count; i++) {
      let obj = {};

      if (this.enableLogging) {
        console.log(`Starting building item ${i}...`);
      }

      for (const [index, value] of Object.entries(this.schema)) {
        if (Obj.isFunction(value)) obj[index] = value({ index: i });
        else obj[index] = value;
      }

      if (this.enableLogging) {
        console.log(`Item ${i} has been built.`);
      }

      for (const after of this.after) {
        if (this.enableLogging) {
          console.log("Starting after object build hook...");
        }

        after(obj);

        if (this.enableLogging) {
          console.log("After object build hook completed.");
        }
      }

      result.push(obj);
    }

    for (const after of this.afterBuild) {
      if (this.enableLogging) {
        console.log("Starting after build hook...");
      }

      after(result);

      if (this.enableLogging) {
        console.log("After build hook completed.");
      }
    }

    return result;
  }

  /**
   * Extend an existing factory and return a new one.
   * @see constructor
   * @return   {Factory}   A new extended factory
   */
  extend({
    name = "extended factory",
    schema = {},
    after = [],
    afterBuild = [],
  }) {
    if (this.enableLogging) {
      console.log(`Starting to extend factory ${this.name}...`);
    }

    const extendedFactory = new Factory({
      name,
      schema: {
        ...this.schema,
        ...schema,
      },
      after: this.after.concat(after),
      afterBuild: this.afterBuild.concat(afterBuild),
    });

    if (this.enableLogging) {
      console.log(
        `Finished to extend factory ${this.name}.\nFactory ${
          extendedFactory.name
        } has been built.`
      );
    }

    return extendedFactory;
  }
}

module.exports = Factory;
