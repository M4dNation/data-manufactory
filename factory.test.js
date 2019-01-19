const Factory = require("./factory");

const someSchema = {
  someFunction: ({ index }) => `run ${index}`,
  someString: "azerty123",
  someBoolean: false,
};

const someFactory = new Factory({
  schema: someSchema,
});

describe("data-manufactory", () => {
  test("Instanciate without a valid name parameter should throw.", () => {
    expect(() => new Factory({ name: "" })).toThrow(
      "Factory name must be a nom empty string"
    );
  });

  test("Instanciate without a valid schema parameter should throw.", () => {
    expect(() => new Factory({ schema: "" })).toThrow(
      "schema must be a plain object"
    );
  });

  test("Instanciate without a valid after parameter should throw.", () => {
    expect(() => new Factory({ after: "" })).toThrow(
      "after must be an array of function"
    );
  });

  test("Instanciate without a valid afterBuild parameter should throw.", () => {
    expect(() => new Factory({ afterBuild: "" })).toThrow(
      "afterBuild must be an array of function"
    );
  });

  test("Instanciate without a valid enableLogging parameter should throw.", () => {
    expect(() => new Factory({ enableLogging: "" })).toThrow(
      "enableLogging must be a boolean"
    );
  });

  test("Instanciate without params should throw", () => {
    expect(() => new Factory()).toThrow();
  });

  test("Instanciate with empty params should not throw", () => {
    let factory = new Factory({});

    expect(factory.name).toBe("factory");
  });

  test("Instanciate with params should apply params", () => {
    let factory = new Factory({
      name: "my-factory",
      schema: someSchema,
    });

    expect(factory.name).toBe("my-factory");
    expect(factory.schema).toMatchObject(someSchema);
  });

  test("Build with no param should return only one object in an array", () => {
    const data = someFactory.build();

    expect(data).toHaveLength(1);
    expect(data[0]).toEqual({
      someString: "azerty123",
      someBoolean: false,
      someFunction: "run 0",
    });
  });

  test("Build with no number param should throw", () => {
    expect(() => someFactory.build("titi")).toThrow();
  });

  test("Build with number param should return number of object in an array", () => {
    const afterFunction = jest.fn();

    let factory = new Factory({
      schema: someSchema,
      after: [afterFunction],
    });

    const data = factory.build(10);

    expect(data).toHaveLength(10);
    expect(afterFunction).toHaveBeenCalledTimes(10);
    expect(data[0]).toEqual({
      someString: "azerty123",
      someBoolean: false,
      someFunction: "run 0",
    });
  });

  test("Build with after hook should launch hook each time build is done", () => {
    const afterFunction = jest.fn();

    let factory = new Factory({
      schema: someSchema,
      afterBuild: [afterFunction],
    });

    const data = factory.build(10);

    expect(data).toHaveLength(10);
    expect(afterFunction).toHaveBeenCalledTimes(1);
    expect(data[0]).toEqual({
      someString: "azerty123",
      someBoolean: false,
      someFunction: "run 0",
    });
  });

  test("Build with afterBuild hook should launch hook once all build are completed", () => {
    let data = someFactory.build(10);

    expect(data).toHaveLength(10);
    expect(data[0]).toEqual({
      someString: "azerty123",
      someBoolean: false,
      someFunction: "run 0",
    });
  });

  test("Extend a factory provide a new factory we can build from", () => {
    const someAfterFunction = jest.fn();
    const someAfterBuildFunction = jest.fn();

    let extendedFactory = someFactory.extend({
      name: "extended-factory",
      schema: {
        ...someSchema,
        someExtendedValue: "value",
      },
      after: [someAfterFunction],
      afterBuild: [someAfterBuildFunction],
    });

    expect(extendedFactory.name).toBe("extended-factory");
    expect(extendedFactory.schema).toMatchObject({
      ...someSchema,
      someExtendedValue: "value",
    });

    const data = extendedFactory.build(4);
    expect(data).toHaveLength(4);
    expect(data[0]).toEqual({
      someString: "azerty123",
      someBoolean: false,
      someFunction: "run 0",
      someExtendedValue: "value",
    });
  });

  test("Building should log information when enableLogging is true", () => {
    console.log = jest.fn();

    let logFactory = new Factory({
      schema: someSchema,
      enableLogging: true,
      after: [() => {}],
      afterBuild: [() => {}],
    });

    const data = logFactory.build(1);

    logFactory.extend({});

    expect(data).toHaveLength(1);
    expect(data[0]).toEqual({
      someString: "azerty123",
      someBoolean: false,
      someFunction: "run 0",
    });
    expect(console.log).toHaveBeenCalledTimes(8);
  });
});
