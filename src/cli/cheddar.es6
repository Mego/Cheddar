#!/usr/bin/env node

const pjson = require('../../package.json');
const nopt = require('nopt');
const child_process = require('child_process');
const tty = require('tty');
const fs = require('fs');

if (!module.parent) {
    /*== Handle / piping REPL Seperately ==*/
    if (!process.argv[3]) {
        child_process.fork(__dirname + (tty.isatty(0) ? '/repl.js' : '/prog.js'), process.argv.slice(2));
    }

    let commands = ["config"];
    if (commands.includes(process.argv[3])) {
        child_process.fork(__dirname + '/lib/' + process.argv[3] + '.js', process.argv.slice(2));
    } else {

    }

} else {
    module.exports = require('./prog');
}