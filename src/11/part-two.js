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
  let str = ''
  for(let row=0; row < matrix.length; row++)
  {
    str+= `${matrix[row].join('')}\n`
  }
  return str
},
getAdjacentSeats = ({ matrix, row, col }) =>
{
  const
  columns = matrix[0].length - 1,
  rows    = matrix.length - 1

  let
  up         = undefined,
  down       = undefined,
  left       = undefined,
  right      = undefined,
  upperLeft  = undefined,
  upperRight = undefined,
  lowerLeft  = undefined,
  lowerRight = undefined

  for(let i=row - 1; i >= 0; i--)
  {
    if(['L','#'].includes(matrix[i][col]))
    {
      up = matrix[i][col]
      break
    }
  }

  for(let i=row + 1; i <= rows; i++)
  {
    if(['L','#'].includes(matrix[i][col]))
    {
      down = matrix[i][col]
      break
    }
  }

  for(let i=col - 1; i >= 0; i--)
  {
    if(['L','#'].includes(matrix[row][i]))
    {
      left = matrix[row][i]
      break
    }
  }

  for(let i=col + 1; i <= columns; i++)
  {
    if(['L','#'].includes(matrix[row][i]))
    {
      right = matrix[row][i]
      break
    }
  }

  let i = 1
  while(col + i <= columns && row - i >= 0)
  {
    if(['L','#'].includes(matrix[row - i][col + i]))
    {
      upperRight = matrix[row - i][col + i]
      break
    }
    i++
  }

  i = 1
  while(col + i <= columns && row + i <= rows)
  {
    if(['L','#'].includes(matrix[row + i][col + i]))
    {
      lowerRight = matrix[row + i][col + i]
      break
    }
    i++
  }

  i = 1
  while(col - i >= 0 && row + i <= rows)
  {
    if(['L','#'].includes(matrix[row + i][col - i]))
    {
      lowerLeft = matrix[row + i][col - i]
      break
    }
    i++
  }

  i = 1
  while(col - i >= 0 && row - i >= 0)
  {
    if(['L','#'].includes(matrix[row - i][col - i]))
    {
      upperLeft = matrix[row - i][col - i]
      break
    }
    i++
  }

  return [
    up,
    down,
    left,
    right,
    upperLeft,
    upperRight,
    lowerLeft,
    lowerRight,
  ]
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
      adjacentSeats = getAdjacentSeats({ matrix, row, col }),
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
          if(occupiedSeats >= 5)
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
  seats   = deepCopyMatrix({ matrix }),
  it      = 1

  do
  {
    console.log(matrixToString({ matrix: seats }))
    console.log('==================================================')
    changes = false
    const newSeats = iterateSeats({ matrix: seats })

    if(matrixToString({ matrix: seats }) === matrixToString({ matrix: newSeats }))
      changes = false
    else
    {
      changes = true
      seats   = deepCopyMatrix({ matrix: newSeats })
    }

    it++
  }while(changes)

  return seats
}


const total = getTotalSeats({ matrix: iterateUntilStable({ matrix })  })
console.log(`There are ${total} seats occupied`)
