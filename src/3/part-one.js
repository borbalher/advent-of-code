const
list  = require('./input'),
slope = [['right', 3], ['down', 1]]
start = { col: 0, row: 0 }

getNextPos = (pos) =>
{
  let { col, row } = pos

  for(const [direction, movement] of slope)
  {
    switch(direction)
    {
    case 'right':
      col += movement
      break
    case 'left':
      col -= movement
      break;
    case 'down':
      row += movement
      break
    case 'up':
      row -= movement
      break
    }
  }

  return {
    col,
    row
  }
},
getCharacterAt = (str, pos) =>
{
  const length = str.length

  if(pos < length)
  {
    return str[pos]
  }
  else
  {
    return str[pos % length]
  }

}

let
trees    = 0,
open     = 0,
sequence = '',
pos      = getNextPos(start)

while(pos.row < list.length)
{
  const
  terrain   = list[pos.row],
  character = getCharacterAt(terrain, pos.col)

  sequence += character

  switch(character)
  {
    case '#':
      trees++
      break
    case '.':
      open++
      break
  }

  pos = getNextPos(pos)
}

console.log(`Answer is ${sequence.replace(/#/gi, 'X').replace(/\./gi, 'O')} (${trees} trees and ${open} open spaces)`)
