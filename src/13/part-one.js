const
getDataFromInput = ({ input }) =>
{
  const
  [timestamp, buses] = require('fs')
            .readFileSync(input)
            .toString()
            .split('\n')

  return {
    timestamp : Number(timestamp),
    buses     : buses
                  .split(',')
                  .reduce((acc, line) =>
                  {
                    if(line !== 'x')
                      acc.push(Number(line))

                    return acc
                  }, [])
                  .sort((a, b) =>
                  {
                    return a - b
                  })
  }
},
findBus = ({ buses, timestamp }) =>
{
  let
  selectedBus,
  departureTime = timestamp

  do
  {
    for(let i=0; i < buses.length; i++)
    {
      if(departureTime % buses[i] === 0)
      {
        selectedBus = buses[i]
        break
      }
    }

    if(!selectedBus) departureTime++
  }
  while(!selectedBus)

  return { bus: selectedBus, departure: departureTime }
},
{ buses, timestamp } = getDataFromInput({ input: `${__dirname}/input.txt`}),
{ bus, departure }   = findBus({ buses, timestamp })

console.log(`${(departure - timestamp) * bus}`)



