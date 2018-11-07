const Factory = require('./factory');

const someSchema = 
{
    someFunction: ({index}) => `run ${index}`,
    someString: "azerty123",
    someBoolean: false
};

const someFactory = new Factory({
    schema: someSchema
});

describe('data-manufactory', () => 
{
    test('Instanciate without params should throw', () => 
    {
        expect(() => new Factory()).toThrow();
    });

    test('Instanciate with empty params should not throw', () => 
    {
        let factory = new Factory({});

        expect(factory.name).toBe("factory");
    });

    test('Instanciate with params should apply params', () => 
    {
        let factory = new Factory({
            name: "my-factory",
            schema: someSchema
        });

        expect(factory.name).toBe("my-factory");
        expect(factory.schema).toMatchObject(someSchema);
    });

    test('Build with no param should return only one object in an array', () => 
    {
        const data = someFactory.build();

        expect(data).toHaveLength(1);
        expect(data[0]).toEqual({
            someString: "azerty123",
            someBoolean: false,
            someFunction: "run 0"
        });
    });

    test('Build with no number param should throw', () => 
    {
        expect(() => someFactory.build("titi")).toThrow();
    });

    test('Build with number param should return number of object in an array', () => 
    {
        const afterFunction = jest.fn();

        let factory = new Factory({
            schema: someSchema,
            after: [afterFunction]
        });

        const data = factory.build(10);

        expect(data).toHaveLength(10);
        expect(afterFunction).toHaveBeenCalledTimes(10);
        expect(data[0]).toEqual({
            someString: "azerty123",
            someBoolean: false,
            someFunction: "run 0"
        });
    });

    test('Build with after hook should launch hook each time build is done', () => 
    {
        const afterFunction = jest.fn();

        let factory = new Factory({
            schema: someSchema,
            afterBuild: [afterFunction]
        });

        const data = factory.build(10);

        expect(data).toHaveLength(10);
        expect(afterFunction).toHaveBeenCalledTimes(1);
        expect(data[0]).toEqual({
            someString: "azerty123",
            someBoolean: false,
            someFunction: "run 0"
        });
    });

    test('Build with afterBuild hook should launch hook once all build are completed', () => 
    {
        let data = someFactory.build(10);

        expect(data).toHaveLength(10);
        expect(data[0]).toEqual({
            someString: "azerty123",
            someBoolean: false,
            someFunction: "run 0"
        });
    });
});
