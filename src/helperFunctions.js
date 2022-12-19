export function generateGrid(num,mapper) {
  return Array(num)
    .fill()
    .map(() => Array(num).fill().map(mapper))
}

export function generatePossibleWin(number){
    let possibleWin = []
    let rowWins = []
    let columnWins = []
    let diagonal1wins = []
    let diagonal2wins = []

    for (let i = 0; i < number; i++) {
      for (let j = 0; j < number; j++) {
        rowWins.push('' + i + j)
        columnWins.push('' + j + i)
      }

      possibleWin.push(rowWins, columnWins)
      rowWins = []
      columnWins = []
      diagonal1wins.push('' + i + i)
    }

    if(number%2!==0){
     let j = 0,
     k = parseInt(number / 2)
    for (let i = parseInt(number / 2); i >= 0; i--) {
      if (i === parseInt(number / 2)) diagonal2wins[i] = diagonal1wins[i]
      else {
        j += 2
        diagonal2wins[i] =
          diagonal1wins[i].split('')[0] +
          Number(Number(diagonal1wins[i].split('')[1]) + j)

        diagonal2wins[k] =
          diagonal1wins[k].split('')[0] +
          Number(Number(diagonal1wins[k].split('')[1]) - j)
      }
      k++
    }
   }
   else{
      let j = number-1;
      let k = parseInt(number / 2)
      let l = 1;
      for(let i = 0; i < number/2;i++){
         diagonal2wins[i] =
           diagonal1wins[i].split('')[0] +
           Number(Number(diagonal1wins[i].split('')[1]) + j)
           j-=2;
         
         diagonal2wins[k] =
           diagonal1wins[k].split('')[0] +
           Number(Number(diagonal1wins[k].split('')[1]) - l)  
           l+=2
         k++;
      }
     
   }
   possibleWin.push(diagonal1wins, diagonal2wins)
   return possibleWin
}


export const WinningLogic = (
  possibleWin,
  gameState,
  totalTurn,
  number,
  player1,
  player2
) => {
  let winner
  for (let i = 0; i < possibleWin.length; i++) {
    if (
      isSubset(
        gameState?.player1,
        possibleWin[i],
        gameState?.player1.length,
        possibleWin[i].length
      )
    ) {
      winner = player1 + ' won! '
      break
    } else if (
      isSubset(
        gameState?.player2,
        possibleWin[i],
        gameState?.player2.length,
        possibleWin[i].length
      )
    ) {
      winner = player2 + ' won! '
      break
    }
  }
  if (winner) {
    return winner
  } else if (totalTurn === number * number) {
    return 'Match Drawn!'
  }
}

function isSubset(arr1, arr2, m, n) {
  let hset = new Set()

  for (let i = 0; i < m; i++) {
    if (!hset.has(arr1[i])) hset.add(arr1[i])
  }

  for (let i = 0; i < n; i++) {
    if (!hset.has(arr2[i])) return false
  }
  return true
}