#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const { install } = require("source-map-support");
install({ hookRequire: true });
require("./dist/cli");
