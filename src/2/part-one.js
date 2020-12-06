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
      min       : Number(match[1]),
      max       : Number(match[2]),
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
  min,
  max,
  character,
  password
}) =>
{
  const validity = new RegExp(`${character}`, 'gi')
  let match, matches = 0
  while((match = validity.exec(password)) !== null)
  {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === validity.lastIndex)
      validity.lastIndex++

    matches++
  }

  if(matches && matches >= min && matches <= max)
    return true

  return false
}

let validPasswords = 0

for(const policy of list)
{
  if(isPolicyValid(parsePolicy(policy)))
    validPasswords++
}

console.log(`${validPasswords} are valid passwords of ${policies.length}`)