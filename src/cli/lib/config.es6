const fs = require("fs");

let argv = process.argv.splice(2);
// Extract the data
let [GROUP, PROP] = argv.shift().split(":");
let root = '../../../';

let group_error = `error: \`${GROUP}\` is not a valid group name.`;
if (GROUP.contains("/")) {
    console.error(group_error);
    process.exit(1);
}

fs.readFile(root + GROUP + '/data.txt', 'utf-8', function(txt, er) {
    if (!er) {


    } else {
        console.error(group_error);
    }
});