const
input             = require('./input'),
target            = 552655238,
findContiguousSet = ({ input, target }) =>
{
  let range

  for(let i=0; i < input.length; i++)
  {
    range = []

    let
    pos   = i,
    total = 0

    while(total < target)
    {
      range.push(input[pos])

      total = range.reduce((acc, number) =>
      {
        return acc + number
      }, 0)

      pos++
    }

    if(total === target)
      break
  }

  range.sort((a, b) => a - b)

  return {
    min : range[0],
    max : range[range.length - 1]
  }
},
{ min, max } = findContiguousSet({ input, target })

console.log(`Answer is ${ min + max }`)