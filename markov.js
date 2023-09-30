/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.dict = {};
    this.sentence_start = [];
    const dict = this.dict;
    const sentence_start = this.sentence_start;
    let prev = null;
    for (let word of this.words){
      if (dict[word] === undefined){
        dict[word] = [];
        if (word[0].toUpperCase() === word[0]){
          sentence_start.push(word);
        }
      }
      if (prev){
        dict[prev].push(word);
      }
      prev = word;
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let text = this.sentence_start[Math.floor(Math.random() * (this.sentence_start.length))];
    let prev = text;
    for (let i = 1; i < numWords; i++){
      let word;
      try {
        word = this.dict[prev][Math.floor(Math.random() * (this.dict[prev].length))];
      }
      catch {
        console.log(word);
        console.log(prev);
        console.log(this.dict[prev]);
        process.exit(0);
      }
      prev = word;
      text += ` ${word}`;
    }
    return text;
  }
}


module.exports = {
  MarkovMachine: MarkovMachine
};
