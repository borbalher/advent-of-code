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
  run         = true

  while(run)
  {
    let operation = operations[pointer]

    if(pointer < 0 || operationsExecution[pointer] === true || !operation)
    {
      run = false
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

  return { accumulator, order: operationsOrder, execution: operationsExecution }
},
result = run({ operations })

console.log(`Accumulator: ${result.accumulator}`)



