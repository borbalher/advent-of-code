
const
boardingPasses = require('./input'),
getSeatId      = ({ row, col }) =>
{
  return row * 8 + col
},
getHalf        = ({ a, b }) =>
{
  return Math.floor((a + b) / 2)
},
getRow         = ({
  boardingPass,
  start = 0,
  end   = 127
}) =>
{

  const half = getHalf({ a: start, b: end })

  switch(boardingPass[0])
  {
    case 'F':
      if(boardingPass.length === 1)
      {
        return start
      }
      else
      {
        return getRow({
          boardingPass : boardingPass.substring(1),
          start        : start,
          end          : half - 1
        })
      }
    case 'B':
      if(boardingPass.length === 1)
      {
        return start + 1
      }
      else
      {
        return getRow({
          boardingPass : boardingPass.substring(1),
          start        : half + 1,
          end          : end
        })
      }
  }
},
getCol         = ({
  boardingPass,
  start = 0,
  end   = 7
}) =>
{
  const half = getHalf({ a: start, b: end })

  switch(boardingPass[0])
  {
    case 'L':
      if(boardingPass.length === 1)
      {
        return start
      }
      else
      {
        return getCol({
          boardingPass : boardingPass.substring(1),
          start        : start,
          end          : half - 1
        })
      }
    case 'R':
      if(boardingPass.length === 1)
      {
        return start + 1
      }
      else
      {
        return getCol({
          boardingPass : boardingPass.substring(1),
          start        : half + 1,
          end          : end
        })
      }
  }
}


let hightestSeat = 0
for(const boardingPass of boardingPasses)
{
  const
  row     = getRow({
    boardingPass : boardingPass.substring(0, 7)
  }),
  col     = getCol({
    boardingPass : boardingPass.substring(7)
  }),
  id      = getSeatId({ row, col })

  console.log(`${boardingPass} row ${row} col ${col} (${id})`)

  if(id > hightestSeat)
    hightestSeat = id
}


console.log(`Highest seat is ${hightestSeat}`)