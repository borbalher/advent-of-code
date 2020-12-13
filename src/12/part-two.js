const
instructions = require('./input'),

moveBoat     = ({ boat, instruction }) =>
{
  const
  regexp               = new RegExp(/(\w)(\d+)/gi),
  [full, type, value]  = regexp.exec(instruction)

  switch(type)
  {
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
    break
  }
},
moveBoatWithWaypoint = ({ boat, instruction }) =>
{
  const
  regexp               = new RegExp(/(\w)(\d+)/gi),
  [full, type, value]  = regexp.exec(instruction)

  switch(type)
  {
    case 'F':
      let
      copy = JSON.parse(JSON.stringify(boat))

      if(boat.waypoint.north * Number(value))
        copy = moveBoat({ boat: copy, instruction: `N${boat.waypoint.north * Number(value)}` })
      if(boat.waypoint.south * Number(value))
        copy = moveBoat({ boat: copy, instruction: `S${boat.waypoint.south * Number(value)}` })
      if(boat.waypoint.east * Number(value))
        copy = moveBoat({ boat: copy, instruction: `E${boat.waypoint.east * Number(value)}` })
      if(boat.waypoint.west * Number(value))
        copy = moveBoat({ boat: copy, instruction: `W${boat.waypoint.west * Number(value)}` })

      return copy
    case 'N':
      if(boat.waypoint.south)
      {
        const remainder = boat.waypoint.south - Number(value)

        return {
          ...boat,
          waypoint :
          {
            ...boat.waypoint,
            south : remainder > 0 ? remainder           : 0,
            north : remainder < 0 ? Math.abs(remainder) : 0
          }
        }
      }
      else
      {
        return {
          ...boat,
          waypoint :
          {
            ...boat.waypoint,
            north : boat.waypoint.north + Number(value)
          }
        }
      }
    case 'S':
      if(boat.waypoint.north)
      {
        const remainder = boat.waypoint.north - Number(value)

        return {
          ...boat,
          waypoint :
          {
            ...boat.waypoint,
            north : remainder > 0 ? remainder           : 0,
            south : remainder < 0 ? Math.abs(remainder) : 0
          }
        }
      }
      else
      {
        return {
          ...boat,
          waypoint :
          {
            ...boat.waypoint,
            south : boat.waypoint.south + Number(value)
          }
        }
      }
    case 'E':
      if(boat.waypoint.west)
      {
        const remainder = boat.waypoint.west - Number(value)

        return {
          ...boat,
          waypoint :
          {
            ...boat.waypoint,
            west : remainder > 0 ? remainder           : 0,
            east : remainder < 0 ? Math.abs(remainder) : 0
          }
        }
      }
      else
      {
        return {
          ...boat,
          waypoint :
          {
            ...boat.waypoint,
            east : boat.waypoint.east + Number(value)
          }
        }
      }
    case 'W':
      if(boat.waypoint.east)
      {
        const remainder = boat.waypoint.east - Number(value)

        return {
          ...boat,
          waypoint :
          {
            ...boat.waypoint,
            east : remainder > 0 ? remainder           : 0,
            west : remainder < 0 ? Math.abs(remainder) : 0
          }
        }
      }
      else
      {
        return {
          ...boat,
          waypoint :
          {
            ...boat.waypoint,
            west : boat.waypoint.west + Number(value)
          }
        }
      }
    case 'L':
    {
      const
      turnLeft = ({ turns, waypoint }) =>
      {
        const
        rotatedWaypoint =
        {
          north : waypoint.east,
          south : waypoint.west,
          east  : waypoint.south,
          west  : waypoint.north
        }

        return turns > 1 ? turnLeft({ turns: turns - 1, waypoint: rotatedWaypoint }) : rotatedWaypoint
      }

      return {
        ...boat,
        waypoint : turnLeft({
          turns    : Number(value)/90,
          waypoint : boat.waypoint
        })
      }
    }
    case 'R':
    {
      const
      turnRight = ({ turns, waypoint }) =>
      {
        const
        rotatedWaypoint =
        {
          north : waypoint.west,
          south : waypoint.east,
          east  : waypoint.north,
          west  : waypoint.south
        }

        return turns > 1 ? turnRight({ turns: turns - 1, waypoint: rotatedWaypoint }) : rotatedWaypoint
      }

      return {
        ...boat,
        waypoint : turnRight({
          turns    : Number(value)/90,
          waypoint : boat.waypoint
        })
      }
    }
  }
}

let
boat =
{
  waypoint    : { north : 1, east: 10, west: 0, south:0 },
  orientation : 'east',
  position    : { north : 0, east: 0, west: 0, south:0 }
}


instructions.forEach((instruction) =>
{
  boat = moveBoatWithWaypoint({ boat, instruction })
})

const distance = Object.entries(boat.position).reduce((acc, [key, value]) =>
{
  return acc + value
}, 0)

console.log(`Manhattan distance ${distance}`)