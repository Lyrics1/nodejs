## Mongolass

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Elegant MongoDB driver for Node.js.

## Installation

```bash
$ npm i mongolass --save
```

## Usage

Just like mongoose:

```javascript
'use strict';

const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:27017/test');// const mongolass = new Mongolass('mongodb://localhost:27017/test');

const User = mongolass.model('User');

User
  .find()
  .select({ name: 1, age: 1 })
  .sort({ name: -1 })
  .exec()
  .then(console.log)
  .catch(console.error);
```

or use optional schema:

```javascript
'use strict';
 
const Mongolass = require('mongolass');
const Schema = Mongolass.Schema;
const mongolass = new Mongolass('mongodb://localhost:27017/test');

const UserSchema = new Schema('UserSchema', {
  name: { type: 'string' },
  age: { type: 'number' }
});
const User = mongolass.model('User', UserSchema);
 
/*
equal to:
const User = mongolass.model('User', {
  name: { type: 'string' },
  age: { type: 'number' }
});
will create inner schema named `UserSchema`.
*/
 
User
  .insertOne({ name: 'nswbmw', age: 'wrong age' })
  .exec()
  .then(console.log)
  .catch(console.error);
/*
{ TypeError: ($.age: "wrong age") ✖ (type: number)
    at Model.insertOne (/Users/nswbmw/Desktop/test/node_modules/mongolass/lib/query.js:105:16)
    at Object.<anonymous> (/Users/nswbmw/Desktop/test/app.js:23:4)
    at Module._compile (module.js:573:30)
    at Object.Module._extensions..js (module.js:584:10)
    at Module.load (module.js:507:32)
    at tryModuleLoad (module.js:470:12)
    at Function.Module._load (module.js:462:3)
    at Function.Module.runMain (module.js:609:10)
    at startup (bootstrap_node.js:158:16)
    at bootstrap_node.js:598:3
  validator: 'type',
  actual: 'wrong age',
  expected: { type: 'number' },
  path: '$.age',
  schema: 'UserSchema',
  model: 'User',
  op: 'insertOne',
  args: [ { name: 'nswbmw', age: 'wrong age' } ],
  pluginName: 'MongolassSchema',
  pluginOp: 'beforeInsertOne',
  pluginArgs: [] }
*/
```

ObjectId schema:

```javascript
'use strict';

const Mongolass = require('mongolass');
const Schema = Mongolass.Schema;
const mongolass = new Mongolass('mongodb://localhost:27017/test');

const Post = mongolass.model('Post', {
  author: { type: Mongolass.Types.ObjectId }
}, { collName: 'post' });

Post.insertOne({ author: '111111111111111111111111' })
  .then(function () {
    return Post.find({ author: '111111111111111111111111' });
  })
  .then(console.log);
/*
[ { _id: 57caed24ecda6ffb15962591,
    author: 111111111111111111111111 } ]
 */
```
**NB:** You can pass `collName` as collection name.

## API

Same as [node-mongodb-native](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html).

## Mongolass vs Mongoose

知乎：[从零开始写一个 Node.js 的 MongoDB 驱动库](https://zhuanlan.zhihu.com/p/24308524)

----------------------------

I've been using Mongoose for years, it's great but complex sucks, so i wrote Mongolass. Mongolass is not simply mimicking Mongoose, but rather draw on the advantages of mongoose redesigned the architecture. Mongolass has some exciting features different from Mongoose:

1. Pure Schema. In Mongoose, Schema and Model and Entity are confused.

  > Schemas not only define the structure of your document and casting of properties, they also define document instance methods, static Model methods, compound indexes and document lifecycle hooks called middleware.

  In Mongolass, Schema is only used for defining the structure of your document and casting of properties, Model used for retrievaling data from mongodb and register plugins, Entity(as result) is plain object. Schema is also optional.

2. Awesome plugin system. Mongoose plugin system is not strong enough, eg: `.pre`, `.post`, use async `next()`. In Mongolass, we can register a plugin for Model or global mongolass instance. like:

  ```javascript
  User.plugin('xx', {
    beforeFind: function (...args) {},// or function return Promise
    afterFind: function* (result, ...args) {
      console.log(result, args);
      ...
    },
    // afterFind: async function (result, ...args) {
    //   console.log(result, args);
    //   ...
    // }
  });
  ```

  Above added two hook functions for `User`, when `User.find().xx().exec()` is called, the execution order is as follows:

  ```
  beforeFind(handle query args) -> retrieve data from mongodb -> afterFind(handle query result)
  ```

  Mongolass's plugins could be substituted for Mongoose's (document instance methods + static Model methods + plugins).

3. Detailed error informations. see [usage](https://github.com/mongolass/mongolass#usage).

  ```javascript
  User
    .insertOne({ name: 'nswbmw', age: 'wrong age' })
    .exec()
    .then(console.log)
    .catch(console.error);
  /*
  { TypeError: ($.age: "wrong age") ✖ (type: number)
      at Model.insertOne (/Users/nswbmw/Desktop/test/node_modules/mongolass/lib/query.js:105:16)
      at Object.<anonymous> (/Users/nswbmw/Desktop/test/app.js:23:4)
      at Module._compile (module.js:573:30)
      at Object.Module._extensions..js (module.js:584:10)
      at Module.load (module.js:507:32)
      at tryModuleLoad (module.js:470:12)
      at Function.Module._load (module.js:462:3)
      at Function.Module.runMain (module.js:609:10)
      at startup (bootstrap_node.js:158:16)
      at bootstrap_node.js:598:3
    validator: 'type',
    actual: 'wrong age',
    expected: { type: 'number' },
    path: '$.age',
    schema: 'UserSchema',
    model: 'User',
    op: 'insertOne',
    args: [ { name: 'nswbmw', age: 'wrong age' } ],
    pluginName: 'MongolassSchema',
    pluginOp: 'beforeInsertOne',
    pluginArgs: [] }
  */
  ```

  According to the error instance, esay to know `age` expect a number but got a string, from error stack know it's broken on `app.js:23:4` and the operator is `Model.insertOne`.

## Schema

see [another-json-schema](https://github.com/nswbmw/another-json-schema).

## Plugins

```
mongolass.plugin(pluginName, hooks);// register global plugin
User.plugin(pluginName, hooks);// register model plugin
```

example:

```javascript
const co = require('co');
const moment = require('moment');
const Mongolass = require('mongolass');
const mongolass = new Mongolass('mongodb://localhost:27017/test');
const User = mongolass.model('User');

mongolass.plugin('addCreatedAt', {
  beforeInsert: function (format) {
    console.log('beforeInsert', this._op, this._args, format);
    // beforeInsert insert [ { firstname: 'san', lastname: 'zhang' } ] YYYY-MM-DD
    this._args[0].createdAt = moment().format(format);
  }
});

User.plugin('addFullname', {
  afterFindOne: function* (user, opt) {
    console.log('afterFindOne', this._op, this._args, opt);
    // afterFindOne findOne [] { sep: '-' }
    if (!user) return user;
    user.fullname = user.firstname + opt.sep + user.lastname;
    return user;
  },
  afterFind: async function (users, opt) {
    console.log('afterFind', this._op, this._args, opt);
    // afterFind find [ { firstname: 'san' } ] { sep: ' ' }
    if (!users.length) return users;
    return users.map(user => {
      user.fullname = user.firstname + opt.sep + user.lastname;
      return user;
    });
  }
});

co(function* () {
  // when use yield, .exec() is omissible.
  yield User.insert({ firstname: 'san', lastname: 'zhang' }).addCreatedAt('YYYY-MM-DD');
  console.log(yield User.findOne().addFullname({ sep: '-' }));
  // { _id: 5850186544c3b82d23a82e45,
  //   firstname: 'san',
  //   lastname: 'zhang',
  //   createdAt: '2016-12-13',
  //   fullname: 'san-zhang' }
  console.log(yield User.find({ firstname: 'san' }).addFullname({ sep: ' ' }));
  // [ { _id: 5850186544c3b82d23a82e45,
  //     firstname: 'san',
  //     lastname: 'zhang',
  //     createdAt: '2016-12-13',
  //     fullname: 'san zhang' } ]
}).catch(console.error.bind(console));
```

**NOTE**: Different order of calling plugins will output different results. The priority of Model's plugins is greater than global's.

example:

```javascript
const co = require('co');
const Mongolass = require('mongolass');
const mongolass = new Mongolass('mongodb://localhost:27017/test');
const User = mongolass.model('User');

User.plugin('add2', {
  afterFindOne: function* (user) {
    if (!user) return user;
    user.name = `${user.name}2`;
    return user;
  }
});
User.plugin('add3', {
  afterFindOne: function* (user) {
    if (!user) return user;
    user.name = `${user.name}3`;
    return user;
  }
});

co(function* () {
  yield User.insert({ name: '1' });
  console.log(yield User.findOne().add2().add3());
  // { _id: 58501a8a7cc264af259ca691, name: '123' }
  console.log(yield User.findOne().add3().add2());
  // { _id: 58501a8a7cc264af259ca691, name: '132' }
}).catch(console.error.bind(console));
```

see [mongolass-plugin-populate](https://github.com/mongolass/mongolass-plugin-populate).

### Built-in plugins

Mongolass has some built-in plugins, only for `find` and `findOne`.

- [limit](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [sort](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [fields(alias: select)](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [skip](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [hint](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [populate]()
- [explain](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [snapshot](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [timeout](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [tailable](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [tailableRetryInterval](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [numberOfRetries](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [awaitdata](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [oplogReplay](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [exhaust](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [batchSize](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [returnKey](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [maxScan](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [min](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [max](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [showDiskLoc](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [comment](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [raw](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [readPreference](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [partial](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [maxTimeMS](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)

example:

```javascript
const co = require('co');
const Mongolass = require('mongolass');
const mongolass = new Mongolass('mongodb://localhost:27017/test');
const User = mongolass.model('User');

co(function* () {
  yield User.insert({ name: '1' });
  yield User.insert({ name: '2' });
  const result = yield User
    .find()
    .skip(1)
    .limit(1);
  console.log(result);
  // [ { _id: 58501c1281ea915a2760a2ee, name: '2' } ]
}).catch(console.error.bind(console));
```

## Test

```bash
$ npm test (coverage 100%)
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/mongolass.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mongolass
[travis-image]: https://img.shields.io/travis/mongolass/mongolass.svg?style=flat-square
[travis-url]: https://travis-ci.org/mongolass/mongolass
[david-image]: http://img.shields.io/david/mongolass/mongolass.svg?style=flat-square
[david-url]: https://david-dm.org/mongolass/mongolass
[license-image]: http://img.shields.io/npm/l/mongolass.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/mongolass.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/mongolass
