const
bags                = require('./input'),
getBagSpecification = ({ contents }) =>
{
  const
  bags     = contents.replace(/\./gi, '').split(', '),
  contains = []

  if(bags[0] !== 'no other bags')
  {

    for(const bag of bags)
    {
      const
      regexp = new RegExp(/(\d+)\s([\w\s]+)/gi),
      match  = regexp.exec(bag)

      if(match)
      {
        const
        qty   = Number(match[1]),
        color = match[2]

        contains.push({
          color,
          qty
        })
      }
    }
  }

  return contains
},
getBagSpecifications = ({ bags }) =>
{
  const specifications = {}

  for(const bag of bags)
  {
    const
    info          = bag.replace(/ bag(s){0,1}/gi, '').split(' contain '),
    color         = info[0],
    specification = getBagSpecification({
      contents : info[1]
    })

    specifications[color] = specification
  }

  return specifications
},
howManyShinyGoldBagsCanHold = ({ specifications, bag }) =>
{
  const contents = specifications[bag]

  let total = 0
  for(const { color, qty } of contents)
  {
    if(color === 'shiny gold')
    {
      total+= qty
    }
    else
    {
      total += qty * howManyShinyGoldBagsCanHold({ specifications, bag: color })
    }
  }

  return total
},
getHowManyBagsContainsABag = ({ specifications, bag }) =>
{
  const specification = specifications[bag]

  let total = 0
  for(const { color, qty } of specification)
  {
    const innerBags =  getHowManyBagsContainsABag({ specifications, bag: color })
    total += qty + (qty * innerBags)
  }

  return total
},
specifications               = getBagSpecifications({ bags }),
bagsThatCanHoldAShinyGoldBag = getHowManyBagsContainsABag({ specifications, bag: 'shiny gold' })


console.log(`Shiny gold bags hold ${bagsThatCanHoldAShinyGoldBag} bags`)