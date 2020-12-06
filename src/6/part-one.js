const
fs                 = require('fs'),
input              = fs.readFileSync(`${__dirname}/input.txt`),
affirmativeAnswers = input
  .toString()
  .split(/\n\n/g)
  .map((groupAnswers) =>
  {
    return groupAnswers.split(/\n/g)
  })
  .reduce((acc, groupAnswers) =>
  {
    let affirmativeAnswers = {}

    for(const answers of groupAnswers)
    {
      for(const answer of answers)
      {
        affirmativeAnswers[answer] = true
      }
    }

    return acc + Object.keys(affirmativeAnswers).length
  }, 0)

console.log(`${affirmativeAnswers} affirmative answers`)