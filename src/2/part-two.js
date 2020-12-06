const
policies    = require('./input'),
parsePolicy = (str) =>
{
  const
  regexp = /^(\d+)-(\d+)\s+([a-z]):\s([a-z]+)$/i,
  match  = regexp.exec(str)

  if(match)
  {
    return {
      first     : Number(match[1]),
      second    : Number(match[2]),
      character : match[3],
      password  : match[4]
    }
  }
  else
  {
    throw new Error(`No match: ${str}`)
  }
},
isPolicyValid = ({
  first,
  second,
  character,
  password
}) =>
{
  const
  existsFirst  = password[first - 1]  === character,
  existsSecond = password[second - 1] === character

  if(( existsFirst || existsSecond ) && !( existsFirst && existsSecond ))
    return true

  return false
}

let validPasswords = 0

for(const policy of policies)
{
  if(isPolicyValid(parsePolicy(policy)))
    validPasswords++
}

console.log(`${validPasswords} are valid passwords of ${policies.length}`)