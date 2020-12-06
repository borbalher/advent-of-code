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
        affirmativeAnswers[answer] = affirmativeAnswers[answer] ? affirmativeAnswers[answer] + 1 : 1
      }
    }

    for(const answer in affirmativeAnswers)
    {
      if(affirmativeAnswers[answer] === groupAnswers.length) acc++
    }

    return acc
  }, 0)

console.log(`${affirmativeAnswers} affirmative answers`)