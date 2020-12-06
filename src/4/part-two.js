const
fs              = require('fs'),
isBirthYearValid = ({ byr }) =>
{
  return byr && Number(byr) >= 1920 && Number(byr) <= 2002
},
isIssueYearValid = ({ iyr }) =>
{
  return iyr && Number(iyr) >= 2010 && Number(iyr) <= 2020
},
isExpirationYearValid = ({ eyr }) =>
{
  return eyr && Number(eyr) >= 2020 && Number(eyr)<= 2030
},
isHeightValid = ({ hgt }) =>
{
  const regexp = new RegExp(/([0-9]{2,3})(in|cm)/gi)

  let match
  if(hgt && (match = regexp.exec(hgt)))
  {
    const
    height  = match[1],
    measure = match[2]

    switch(measure)
    {
    case 'in':
      return Number(height) >= 59 && Number(height)<= 76
    case 'cm':
      return Number(height) >= 150 && Number(height)<= 193
    default:
      return false
    }
  }

  return false
},
isHairColorValid = ({ hcl }) =>
{
  const regexp = new RegExp(/#[a-f0-9]{6}/gi)

  if(hcl && regexp.exec(hcl))
    return true

  return false
},
isEyeColorValid = ({ ecl }) =>
{
  return ecl && ['amb','blu','brn','gry','grn','hzl','oth'].includes(ecl)
},
isPassportIdValid = ({ pid }) =>
{
  return pid && pid.length === 9 && !isNaN(pid)
},
isCountryIdValid = ({ cid }) =>
{
  return true
},
isPassportValid = (passport) =>
{
  return isBirthYearValid(passport)      &&
         isIssueYearValid(passport)      &&
         isExpirationYearValid(passport) &&
         isHeightValid(passport)         &&
         isHairColorValid(passport)      &&
         isEyeColorValid(passport)       &&
         isPassportIdValid(passport)     &&
         isCountryIdValid(passport)
},
valid = fs
  .readFileSync(`${__dirname}/test-input.txt`)
  .toString()
  .split(/\n\n/g)
  .map((passport) => passport.replace(/\n/g, ' '))
  .reduce((acc, str) =>
  {
    const regex = /([a-z]+):([#a-zA-Z0-9]+)/gm

    let match, passport = {}

    while((match = regex.exec(str)) !== null)
    {
      if(match.index === regex.lastIndex)
        regex.lastIndex++

      passport[match[1]] = match[2]
    }

    if(isPassportValid(passport))
      acc++

    return acc
  }, 0)


console.log(`${valid} passports are valid`)