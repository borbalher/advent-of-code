const list = require('./input')

console.log(list)


let answer, i, j, k

for(i = 0; i < list.length; i++)
{
  for(j = 0; j < list.length; j++)
  {
    for(k = 0; k < list.length; k++)
    {
      if(i !== j && i !== k && j!== k)
      {
        const sum = list[i] + list[j] + list[k]

        console.log(`${list[i]} + ${list[j]} + ${list[k]} = ${sum}`)

        if(sum === 2020)
        {
          answer = list[i] * list[j] * list[k]
          break
        }
      }
    }
    if(answer) break
  }

  if(answer) break
}

if(answer)
  console.log(`Answer is ${answer} (${list[i]}*${list[j]}*${list[k]})`)
else
  console.log('No answer found')