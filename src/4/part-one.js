const
fs              = require('fs'),
input           = fs.readFileSync(`${__dirname}/input.txt`),
isPassportValid = ({
  byr,
  iyr,
  eyr,
  hgt,
  hcl,
  ecl,
  pid,
  cid
}) =>
{
  if(
    !byr ||
    !iyr ||
    !eyr ||
    !hgt ||
    !hcl ||
    !ecl ||
    !pid
  )
    return false

  return true
},
valid = input
  .toString()
  .split(/\n\n/g)
  .map((passport) =>
  {
    return passport.replace(/\n/g, ' ')
  })
  .reduce((acc, str) =>
  {

    const regex = /([a-z]+):([#a-zA-Z0-9]+)/gm

    let match, passport = {}

    while((match = regex.exec(str)) !== null)
    {
      // This is necessary to avoid infinite loops with zero-width matches
      if(match.index === regex.lastIndex)
        regex.lastIndex++

      passport[match[1]] = match[2]
    }

    if(isPassportValid(passport))
      acc++

    return acc
  }, 0)


console.log(`${valid} passports are valid`)