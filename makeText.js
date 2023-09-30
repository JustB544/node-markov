/** Command-line tool to generate Markov text. */

const {MarkovMachine} = require("./markov");
const fs = require("fs");
const axios = require("axios");


if (process.argv[2] === "file"){
    fs.readFile(process.argv[3], "utf8", (err, data) => {
        if (err){
            console.log(err.message);
            process.exit(1);
        }
        const test = new MarkovMachine(data);
        console.log(test.makeText());
        process.exit(0);
    });
}
else if (process.argv[2] === "url"){
    axios.get(process.argv[3])
    .then(({data}) => {
        const test = new MarkovMachine(data);
        console.log(test.makeText());
        process.exit(0);
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
}
else {
    console.log("Invalid selector");
    process.exit(1);
}