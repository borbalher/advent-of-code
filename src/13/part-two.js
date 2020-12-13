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
                  .reduce((acc, bus, index) =>
                  {
                    if(bus !== 'x')
                      acc.push({ value: Number(bus), offset: index })

                    return acc
                  }, [])
  }
},
getValidBuses = ({ timestamp, buses }) =>
{
  let validBuses = []

  for(let i=0; i < buses.length; i++)
  {
    if((timestamp + buses[i].offset) % buses[i].value === 0)
    {
      validBuses.push(buses[i])
    }
  }

  return validBuses
},
mcd = (a, b) =>
{
  return a ? mcd(b % a, a) : b
},
mcm = (a, b) =>
{
  return a * b / mcd(a, b)
},
findTimestamp = ({ buses, start = 1}) =>
{
  let
  departure,
  isValid = false,
  range   = buses[0].value,
  limit   = buses.reduce((acc, bus) =>
  {
    return acc * bus.value
  }, 1)

  while(!isValid)
  {
    for(let timestamp = start; timestamp < limit; timestamp+=range)
    {
      const validBuses = getValidBuses({ buses, timestamp })

      if(validBuses === buses.length)
      {
        isValid   = true
        departure = timestamp
        break
      }
      else if(validBuses.length)
      {
        range = validBuses
          .map((bus) => bus.value)
          .reduce(mcm)

        start = timestamp + range
        break
      }
    }
  }

  return departure
},
{ buses } = getDataFromInput({ input: `${__dirname}/input.txt`}),
timestamp = findTimestamp({ buses, start: 100000000000000 })

console.log(`${timestamp}`)



