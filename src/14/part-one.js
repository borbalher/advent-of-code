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
      binary       = instruction.value.toString(2).padStart(36, '0'),
      maskedBinary =  [...mask]
        .reduce((acc, char, index) =>
        {
          if(char === 'X')
          {
            return `${acc}${binary[index]}`
          }
          else if(char === '1')
          {
            return `${acc}1`
          }
          else if(char === '0')
          {
            return `${acc}0`
          }
        },'')

      memory[instruction.address] = parseInt(maskedBinary, 2)
      break
    case 'mask':
      mask = instruction.mask
      break
    }
  }

  return memory
},
calculateMemory = ({ memory }) =>
{
  return Object
    .entries(memory)
    .reduce((acc, [address, value]) =>
    {
      return value ? acc + value : acc
    }, 0)
}


const
memory = fillMemory({ instructions }),
answer = calculateMemory({ memory})

console.log(answer)

