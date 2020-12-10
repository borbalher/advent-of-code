const
input                 = require('./input'),
max                   = input[input.length - 1] + 3,
adapters              = [0, ...input, max],
calculateArrangements = ({
  adapters,
  memo = {},
  output,
}) =>
{
  if(memo[output])
  {
    return memo[output]
  }
  else if(output === 0)
  {
    memo[output] = 1
    return 1
  }
  else if(output < 0 || !adapters.includes(output))
  {
    memo[output] = 0
    return 0
  }

  memo[output] = (
    calculateArrangements({
      adapters,
      memo,
      output : output - 1,
    })
    +
    calculateArrangements({
      adapters,
      memo,
      output : output - 2,
    })
    +
    calculateArrangements({
      adapters,
      memo,
      output : output - 3,
    })
  )

  return memo[output]
},
arrangements = calculateArrangements({
  output: max,
  adapters
})

console.log(`There are ${arrangements} possible arrangements`)