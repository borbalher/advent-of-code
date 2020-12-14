const
fs           = require('fs'),
instructions = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .split('\n')
  .reduce((acc, instruction) =>
  {
    const
    maskRegexp = new RegExp(/mask\s+\=\s+([0,1,X]{36})/gi),
    changeMask = maskRegexp.exec(instruction),
    memRegexp  = new RegExp(/mem\[(\d+)\]\s+\=\s+(\d+)/gi),
    setMem     = memRegexp.exec(instruction)

    if(changeMask)
      acc.push({ type: 'mask', mask: changeMask[1]})
    else if(setMem)
      acc.push({ type: 'mem', address: Number(setMem[1]), value: Number(setMem[2])})

    return acc
  }, []),
fillMemory = ({ instructions }) =>
{
  const memory = {}

  let mask
  for(const instruction of instructions)
  {
    switch(instruction.type)
    {
    case 'mem':
      const
      binary       = instruction.address.toString(2).padStart(36, '0'),
      maskedBinary =  [...mask]
        .reduce((acc, char, index) =>
        {
          if(char === 'X')
          {
            return `${acc}X`
          }
          else if(char === '1')
          {
            return `${acc}1`
          }
          else if(char === '0')
          {
            return `${acc}${binary[index]}`
          }
        },''),
      addresses = getMemoryAddresses({ address: maskedBinary })

      for(const address of addresses)
      {
        memory[address] = instruction.value
      }

      break
    case 'mask':
      mask = instruction.mask
      break
    }
  }

  return memory
},
getMemoryAddresses = ({ address }) =>
{
  const
  xs           = address.match(/X/gi, '').length,
  limit        = parseInt(new Array(xs).fill(1).join(''), 2),
  replacements = []

  for(let i = 0; i <= limit; i++)
  {
    replacements.push(i.toString(2).padStart(xs, '0'))
  }

  const addresses = []
  for(const replacement of replacements)
  {
    let base = `${address}`

    replacement
      .split('')
      .forEach((digit) =>
      {
        base = base.replace(/X/i, digit)
      })

    addresses.push(parseInt(base, 2))
  }

  return addresses
},
calculateMemory = ({ memory }) =>
{
  return Object
    .entries(memory)
    .reduce((acc, [address, value]) =>
    {
      return acc + value
    }, 0)
}


const
memory = fillMemory({ instructions }),
answer = calculateMemory({ memory})

console.log(answer)

