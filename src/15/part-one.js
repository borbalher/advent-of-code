let
starters         = require('./input'),
limit            = 30000000,
spoken           = new Map(),
lastNumberSpoken = 0


starters.forEach((starter, index) =>
{
  lastNumberSpoken = starter
  spoken.set(lastNumberSpoken, index+1)
})

for(let turn=starters.length; turn < limit; turn++)
{
  if(!(spoken.has(lastNumberSpoken)))
  {
    spoken.set(lastNumberSpoken, turn)
    lastNumberSpoken = 0
  }
  else
  {
    let previosTurn = spoken.get(lastNumberSpoken)
    spoken.set(lastNumberSpoken, turn)
    lastNumberSpoken = turn - previosTurn
  }
}

console.log(lastNumberSpoken)