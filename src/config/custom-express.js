const express = require('express');
const app = express();

const rotas = require('../app/rotas/rotas.js');
rotas(app);

require('marko/node-require').install();
require('marko/express');


module.exports = app;