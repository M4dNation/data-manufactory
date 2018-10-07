const { Obj } = require("jstoolbox");

exports.default = Factory;

class Factory
{
    constructor({name = "factory", schema = {}, after = [], afterBuild = (() => {})})
    {
        if (!Obj.isString(name) || Obj.isFalsy(name))
            throw new Error("Factory name must be a nom empty string");

        if (!Obj.isPlainObject(schema))
            throw new Error("schema must be a plain object");    

        if (!Obj.isArray(after))
            throw new Error("after must be an array");

        if (!Obj.isFunction(afterBuild))
            throw new Error("afterBuild must be a function")

        this.name = name;
        this.schema = schema;
        this.after = after;
        this.afterBuild = afterBuild;
    }

    build(count = 1)
    {
        count = count < 1 ? 1 : count;

        if (!Obj.isPlainObject(options))
            throw new Error("options must be a plain object");

        let result = [];

        for (let i = 0; i < count; i++)
        {
            let obj = {};

            for (const [index, value] of Object.entries(this.schema))
            {
                if (Obj.isFunction(value))
                    obj[index] = value();
                else obj[index] = value;
            }

            for (const after of this.after)
            {
                after(obj);
            }

            result.push(obj);
        }

        this.afterBuild(result);

        return result;
    }

    extend({name = "extended factory", schema = {}, after = []})
    {

    }
};