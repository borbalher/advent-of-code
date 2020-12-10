const
preambleSize      = 25,
input             = require('./input'),
numberIsNotASumOfPreviousTwoNumbers = ({ preamble, number }) =>
{
  for(let i=0; i < preamble.length; i++)
  {
    for(let j=0; j < preamble.length; j++)
    {
      if(j !== i && preamble[i] + preamble[j] === number)
        return number
    }
  }
},
findVulnerability = ({ input }) =>
{
  let
  start = 0,
  end   = preambleSize

  do
  {
    number = input[end]

    if(numberIsNotASumOfPreviousTwoNumbers({
      preamble : [...input].splice(start, preambleSize),
      number
    }) === undefined)
      return number

    start++
    end++

  }
  while(number)
},
vulnerability = findVulnerability({ input })

console.log(`Vulnerability is ${vulnerability}`)