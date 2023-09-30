/** Command-line tool to generate Markov text. */

const {MarkovMachine} = require("./markov");
const fs = require("fs");


fs.readFile("eggs.txt", "utf8", (err, data) => {
    if (err){
        console.log(err.message);
        process.exit(1);
    }
    const test = new MarkovMachine(data);
    console.log(test.makeText());
    process.exit(0);
});