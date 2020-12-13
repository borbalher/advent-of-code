const
fs     = require('fs'),
matrix = []
input  = fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n').forEach((line) =>
{
  matrix.push([...line])
}),
deepCopyMatrix  = ({ matrix }) =>
{
  return JSON.parse(JSON.stringify(matrix))
},
matrixToString  = ({ matrix }) =>
{
  let str
  for(let row=0; row < matrix.length; row++)
  {
    str+= `${matrix[row].join('')}\n`
  }
  return str
},
iterateSeats = ({ matrix }) =>
{
  const copy = deepCopyMatrix({ matrix })

  for(let row=0; row < matrix.length; row++)
  {
    for(let col=0; col < matrix[row].length; col++)
    {
      const
      seat          = matrix[row][col],
      adjacentSeats = [
        matrix[row - 1] ? matrix[row - 1][col]     : undefined,
        matrix[row + 1] ? matrix[row + 1][col]     : undefined,
        matrix[row]     ? matrix[row]    [col - 1] : undefined,
        matrix[row]     ? matrix[row]    [col + 1] : undefined,
        matrix[row + 1] ? matrix[row + 1][col + 1] : undefined,
        matrix[row + 1] ? matrix[row + 1][col - 1] : undefined,
        matrix[row - 1] ? matrix[row - 1][col + 1] : undefined,
        matrix[row - 1] ? matrix[row - 1][col - 1] : undefined
      ],
      occupiedSeats = adjacentSeats.reduce((acc, seat) =>
      {
        if(seat === '#')
          return acc + 1
        else
          return acc
      }, 0)

      switch(seat)
      {
        case 'L':
        {
          if(occupiedSeats === 0)
            copy[row][col] = '#'
          break
        }
        case '#':
        {
          if(occupiedSeats >= 4)
            copy[row][col] = 'L'
          break
        }
      }
    }
  }

  return copy
},
getTotalSeats = ({ matrix }) =>
{
  let total = 0
  for(let row=0; row < matrix.length; row++)
  {
    const line = matrix[row]
    for(let col=0; col < line.length; col++)
    {
      if(matrix[row][col] === '#')
        total++
    }
  }

  return total
},
iterateUntilStable = ({ matrix }) =>
{
  let
  changes = false,
  seats   = deepCopyMatrix({ matrix })

  do
  {
    changes = false
    const newSeats = iterateSeats({ matrix: seats })

    if(matrixToString({ matrix: seats }) === matrixToString({ matrix: newSeats }))
      changes = false
    else
    {
      changes = true
      seats   = deepCopyMatrix({ matrix: newSeats })
    }

  }while(changes)

  return seats
}


const total = getTotalSeats({ matrix: iterateUntilStable({ matrix })  })

console.log(`There are ${total} seats occupied`)