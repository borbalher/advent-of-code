const
operations = require('./input'),
run        = ({
  operations
}) =>
{
  const
  operationsOrder     = new Array(),
  operationsExecution = new Array(operations.length).fill(false)

  let
  accumulator = 0,
  pointer     = 0,
  run         = true,
  loop        = true

  while(run)
  {
    let operation = operations[pointer]

    if(pointer === operations.length)
    {
      run  = false
      loop = false
    }
    else if(pointer < 0 || !operation || operationsExecution[pointer] === true)
    {
      run  = false
      loop = true
    }
    else
    {
      operationsExecution[pointer] = true
      operationsOrder.push(pointer)

      const
      regex = new RegExp(/(nop|acc|jmp)\s(\+|-)(\d+)/gi),
      match = regex.exec(operation),
      type  = match[1],
      sign  = match[2],
      value = Number(match[3])

      switch(type)
      {
        case 'acc':
          switch(sign)
          {
            case '+':
              accumulator += value
              break
            case '-':
              accumulator -= value
              break
          }
          pointer += 1
          break
        case 'nop':
          pointer += 1
          break
        case 'jmp':
          switch(sign)
          {
            case '+':
              pointer += value
              break
            case '-':
              pointer -= value
              break
          }
          break
      }
    }
  }

  return { accumulator, order: operationsOrder, execution: operationsExecution, loop }
},
antiCorruptionRun = ({ corruptedOperations }) =>
{
  let
  result,
  operations         = [...corruptedOperations],
  operationsReplaced = new Array(corruptedOperations.length).fill(false)

  do
  {
    result     = run({ operations })

    if(result.loop)
    {
      const { order } = result

      operations = [...corruptedOperations]

      let operationHasBeenReplaced

      for(let i = (order.length - 1); i > 0; i--)
      {
        const
        operationIndex = order[i],
        operation      = operations[operationIndex]

        if(!operationsReplaced[operationIndex])
        {
          const
          regex = new RegExp(/(nop|acc|jmp)\s(\+|-)(\d+)/gi),
          match = regex.exec(operation),
          type  = match[1],
          sign  = match[2],
          value = Number(match[3])

          if(type === 'acc')
          {
            operationsReplaced[operationIndex] = true
          }
          else if(type === 'nop')
          {
            operations[operationIndex]         = `jmp ${sign}${value}`
            operationsReplaced[operationIndex] = true
            operationHasBeenReplaced           = true
            break
          }
          else if(type === 'jmp')
          {
            operations[operationIndex]         = `nop ${sign}${value}`
            operationsReplaced[operationIndex] = true
            operationHasBeenReplaced           = true
            break
          }
        }
      }

      if(!operationHasBeenReplaced) throw new Error('Corrupted operations could not been fixed')
    }
  }
  while(result.loop)

  return result
},
result = antiCorruptionRun({ corruptedOperations: operations })

console.log(`Accumulator: ${result.accumulator}`)



