const list = require('./input')

let answer, i, j

for(i = 0; i < list.length; i++)
{
  for(j = 0; j < list.length; j++)
  {
    if(i !== j)
    {
      const sum = list[i] + list[j]

      console.log(`${list[i]} + ${list[j]} = ${sum}`)

      if(sum === 2020)
      {
        answer = list[i] * list[j]
        break
      }
    }
  }

  if(answer) break
}

if(answer)
  console.log(`Answer is ${answer} (${list[i]}*${list[j]})`)
else
  console.log('No answer found')