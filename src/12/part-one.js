const
instructions = require('./input'),
moveBoat     = ({ boat, instruction }) =>
{
  const
  regexp               = new RegExp(/(\w)(\d+)/gi),
  [full, type, value]  = regexp.exec(instruction)

  switch(type)
  {
    case 'F':
      return moveBoat({
        boat,
        instruction : `${boat.orientation.toUpperCase()[0]}${value}`
      })
    case 'N':
      if(boat.position.south)
      {
        const remainder = boat.position.south - Number(value)

        return {
          ...boat,
          position :
          {
            ...boat.position,
            south : remainder > 0 ? remainder           : 0,
            north : remainder < 0 ? Math.abs(remainder) : 0
          }
        }
      }
      else
      {
        return {
          ...boat,
          position :
          {
            ...boat.position,
            north : boat.position.north + Number(value)
          }
        }
      }
    case 'S':
      if(boat.position.north)
      {
        const remainder = boat.position.north - Number(value)

        return {
          ...boat,
          position :
          {
            ...boat.position,
            north : remainder > 0 ? remainder           : 0,
            south : remainder < 0 ? Math.abs(remainder) : 0
          }
        }
      }
      else
      {
        return {
          ...boat,
          position :
          {
            ...boat.position,
            south : boat.position.south + Number(value)
          }
        }
      }
    case 'E':
      if(boat.position.west)
      {
        const remainder = boat.position.west - Number(value)

        return {
          ...boat,
          position :
          {
            ...boat.position,
            west : remainder > 0 ? remainder           : 0,
            east : remainder < 0 ? Math.abs(remainder) : 0
          }
        }
      }
      else
      {
        return {
          ...boat,
          position :
          {
            ...boat.position,
            east : boat.position.east + Number(value)
          }
        }
      }
    case 'W':
      if(boat.position.east)
      {
        const remainder = boat.position.east - Number(value)

        return {
          ...boat,
          position :
          {
            ...boat.position,
            east : remainder > 0 ? remainder           : 0,
            west : remainder < 0 ? Math.abs(remainder) : 0
          }
        }
      }
      else
      {
        return {
          ...boat,
          position :
          {
            ...boat.position,
            west : boat.position.west + Number(value)
          }
        }
      }
    case 'L':
    {
      const
      orientations = ['east', 'north', 'west', 'south'],
      current      = orientations.findIndex((o) => boat.orientation === o),
      next         = current + Number(value)/90

      return {
        ...boat,
        orientation : next < orientations.length ? orientations[next] : orientations[Math.abs(orientations.length - next)]
      }
    }
    case 'R':
    {
      const
      orientations = ['east', 'south', 'west', 'north'],
      current      = orientations.findIndex((o) => boat.orientation === o),
      next         = current + Number(value)/90

      return {
        ...boat,
        orientation : next < orientations.length ? orientations[next] : orientations[Math.abs(orientations.length - next)]
      }
    }
  }
}

let
boat =
{
  orientation : 'east',
  position    : { north : 0, east: 0, west: 0, south:0 }
}


instructions.forEach((instruction) =>
{
  boat = moveBoat({ boat, instruction })
})

const distance = Object.entries(boat.position).reduce((acc, [key, value]) =>
{
  return acc + value
}, 0)

console.log(`Manhattan distance ${distance}`)