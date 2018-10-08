const { Obj } = require("jstoolbox");

class Factory
{
    /**
    * Instanciate a factory.
    * @return   {Factory}   A new factory
    */
    constructor({name = "factory", schema = {}, after = [], afterBuild = []})
    {
        if (!Obj.isString(name) || Obj.isFalsy(name))
            throw new Error("Factory name must be a nom empty string");

        if (!Obj.isPlainObject(schema))
            throw new Error("schema must be a plain object");    

        if (!Obj.isArray(after))
            throw new Error("after must be an array of function");

        if (!Obj.isArray(afterBuild))
            throw new Error("afterBuild must be an array of function")

        this.name = name;
        this.schema = schema;
        this.after = after;
        this.afterBuild = afterBuild;
    }

    /**
    * Build data based on provided schema.
    * @param   {Number}     The number of data to build
    * @return   {Array}     An array with all generated data 
    */
    build(count = 1)
    {
        count = count < 1 ? 1 : count;

        let result = [];

        for (let i = 0; i < count; i++)
        {
            let obj = {};

            for (const [index, value] of Object.entries(this.schema))
            {
                if (Obj.isFunction(value))
                    obj[index] = value({index: i});
                else obj[index] = value;
            }

            for (const after of this.after)
            {
                after(obj);
            }

            result.push(obj);
        }

        for (const after of this.afterBuild)
        {
            after(result);
        }

        return result;
    }

    /**
    * Extend an existing factory and return a new one.
    * @see constructor
    * @return   {Factory}   A new extended factory
    */
    extend({name = "extended factory", schema = {}, after = [], afterBuild = []})
    {
        return new Factory({
            name,
            schema: {
                ...this.schema,
                ...schema
            },
            after: this.after.concat(after),
            afterBuild: this.afterBuild.concat(afterBuild)
        });
    }
};

module.exports = Factory; 