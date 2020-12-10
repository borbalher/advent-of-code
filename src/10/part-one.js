const
adapters            = require('./input'),
findJoltDifferences = ({ adapters }) =>
{
  const diff =
  {
    1 : 0,
    2 : 0,
    3 : 1
  }

  let previousAdapter = 0

  adapters.forEach((adapter) =>
  {
    const difference = Math.abs(previousAdapter - adapter)

    switch(difference)
    {
      case 1:
        diff['1']++
        break
      case 2:
        diff['2']++
        break
      case 3:
        diff['3']++
        break
    }

    previousAdapter = adapter
  })


  return diff
}

const differences = findJoltDifferences({ adapters })

console.log(`Answer is ${differences['1'] * differences['3']}`)