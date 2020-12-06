const
list   = require('./input'),
slopes = [
  [['right', 1], ['down', 1]],
  [['right', 3], ['down', 1]],
  [['right', 5], ['down', 1]],
  [['right', 7], ['down', 1]],
  [['right', 1], ['down', 2]]
],
sequences       = [],
totalTrees      = [],
totalOpenSpaces = [],
start           = { col: 0, row: 0 }

getNextPos = (pos, slope) =>
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


for(const slope of slopes)
{
  let
  trees    = 0,
  open     = 0,
  sequence = '',
  pos      = getNextPos(start, slope)

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

    pos = getNextPos(pos, slope)
  }

  sequences.push(sequence)
  totalTrees.push(trees)
  totalOpenSpaces.push(open)

  console.log(`Answer for slope ${JSON.stringify(slope)} is ${sequence.replace(/#/gi, 'X').replace(/\./gi, 'O')} (${trees} trees and ${open} open spaces)`)
}

const multiplication = totalTrees.reduce((acc, total) =>
{
  return acc * total
}, 1)

console.log(`Multiplication is ${multiplication}`)

