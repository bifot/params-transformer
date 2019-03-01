# params-transformer

Transform params in a needed format.

## Install

```sh
$ npm i params-transformer
```

## Usage

### Express

```js
const express = require('express');
const bodyParser = require('body-parser');
const paramsCollector = require('params-collector');
const transform = require('params-transformer');

const app = express();

app.use(bodyParser.json());
app.use(paramsCollector);

app.post(
  '/users',
  transform(params => ({
    ...params,
    name: `${params.first_name} ${params.last_name}`,
    userId: params.id_user,
  })),
  (req, res) => {
    console.log(req.params.name);     // 'Mikhail Semin'
    console.log(req.params.userId);   // 10
  },
);

app.listen(process.env.PORT);
```

### Koa

```js
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const paramsCollector = require('params-collector');
const transform = require('params-transformer');

const app = new Koa();
const router = new Router();

router.post(
  '/users',
  transform(params => ({
    ...params,
    name: `${params.first_name} ${params.last_name}`,
    userId: params.id_user,
  })),
  (ctx) => {
    console.log(ctx.params.name);     // 'Mikhail Semin'
    console.log(ctx.params.userId);   // 10
  },
);

app.use(bodyParser());
app.use(paramsCollector);
app.use(router.routes());

app.listen(process.env.PORT);
```

