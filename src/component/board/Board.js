import React, { useEffect, useReducer, useRef, useState } from 'react'
import { generateGrid, generatePossibleWin, WinningLogic } from '../../helperFunctions'
import {useNavigate, useLocation} from "react-router-dom"
import Square from '../square/Square'
import "./Board.css"

const initialState = {
  gameState: {
    turn: '1',
    player1: [],
    player2: [],
  },
  end: false,
}

const reducer = (state,action) => {
    switch (action.type) {
      case 'click':
        return {
          ...state,
          gameState: action.payload,
        }

      case 'gameOverCheck':
        return {
          ...state,
          end: action.payload,
        }

      case 'gridUpdate':
        return {
          ...state,
          grid: action.payload,
        }

      case 'reset':
        return initialState
    }
}

function Board() {
  const location = useLocation()
  const { number, player1, player2 } = location.state
  const [state, dispatch] = useReducer(reducer, initialState)
  const { gameState, end } = state
  const [grid, setGrid] = useState([])
  const [possibleWin, setPossibleWin] = useState(generatePossibleWin(number))
  const totalTurnRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    totalTurnRef.current = 0
    setGrid(generateGrid(Number(number), () => ''))
  }, [])

  const clickHandler = (e) => {
    let X_coordinate = Number(e.target.id.split('')[0])
    let Y_coordinate = Number(e.target.id.split('')[1])
    const gridClone = JSON.parse(JSON.stringify(grid))

    if (!e.target.innerText.length) {
      totalTurnRef.current += 1
      let gameStateClone = JSON.parse(JSON.stringify(gameState))
      if (gameState?.turn === '1') {
        gameStateClone.player1.push(e.target.id)
        gameStateClone.turn = '2'
        gridClone[X_coordinate][Y_coordinate] = '❌'
      } else {
        gameStateClone.player2.push(e.target.id)
        gameStateClone.turn = '1'
        gridClone[X_coordinate][Y_coordinate] = '⭕'
      }

      setGrid([...gridClone])
      dispatch({ type: 'click', payload: gameStateClone })
    }
  }

  useEffect(() => {
    if (
      gameState?.player1?.length >= Number(number) ||
      gameState?.player2?.length >= Number(number)
    ) {
      const result = WinningLogic(
        possibleWin,
        gameState,
        totalTurnRef.current,
        number,
        player1,
        player2
      )
      if (result) {
        dispatch({ type: 'gameOverCheck', payload: result })
      }
    }
  }, [gameState])

  return (
    <div className='m-s' style={{ marginTop: '100px' }}>
      {end ? (
        <div>
          <span className='result'>{end?.includes('won') ? '🥳' : '🤝'}</span>
          <h1>{end}</h1>
          <div>
            <span
              className='button-span'
              onClick={() => {
                dispatch({ type: 'reset' })
                totalTurnRef.current = 0
                setGrid(generateGrid(Number(number), () => ''))
              }}
            >
              🔁
            </span>

            <span
              onClick={() => {
                navigate('/')
                dispatch({ type: 'reset' })
                totalTurnRef.current = 0
              }}
              className='button-span'
            >
              ⏭️
            </span>
          </div>
        </div>
      ) : (
        <div>
          {grid.map((arr, i) => {
            return (
              <div
                className='board'
                style={{ display: 'flex' }}
                onClick={(e) => {
                  clickHandler(e)
                }}
                key={i}
              >
                {arr.map((num, j) => {
                  return (
                    <div key={j}>
                      <Square i={i} j={j} value={grid[i][j]} />
                    </div>
                  )
                })}
              </div>
            )
          })}
          <h3>Next up, </h3>
          <h2 style={{ color: 'red' }}>
            {gameState?.turn === '1' ? player1 : player2}
          </h2>
        </div>
      )}
    </div>
  )
}

export default Board