import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./Home.css"

function Home() {
 const [playerNames , setPlayerNames] = useState({player1:"",player2:""})
 const [showInputs , setShowInputs] = useState({input1:true,input2:true})
 const [gridNumber,setGridNumber] = useState(0)
 const inputRef1 = useRef()
 const inputRef2 = useRef()
 const inputRef3 = useRef()

 const navigate = useNavigate()

 useEffect(()=>{
  inputRef1.current.focus()
 },[])

 const inputHandler = (e,i) => {
   if(e.keyCode === 13 && e.target.value){
     i === 1 ?
         setPlayerNames((prev) => {
           return { ...prev, player1: e.target.value }
         })
       : setPlayerNames((prev) => {
           return { ...prev, player2: e.target.value }
         })

      if(i===1 && !inputRef2.current.value){
        inputRef2.current.focus()
      }
      else if(i===2 && !inputRef3.current.value){
        inputRef3.current.focus()
      }   
   }
 }

 const gridInputHandler = (e) => {
    if(e.keyCode === 13 && Number(e.target.value)>2){
      setGridNumber(e.target.value)
    }
 }
 
 useEffect(()=>{
  if(playerNames?.player1){
   setShowInputs((prev)=>{return{...prev , input1:false}})
  }

  if (playerNames?.player2) {
    setShowInputs((prev) => {
      return { ...prev, input2: false }
    })
  }
  
 },[playerNames])

  return (
    <div className='m-s s'>
      <h1>Welcome!</h1>
      <div>
        <div>
          <h3>
            {showInputs?.input1 ? 'Player 1:' : playerNames?.player1 + '👍'}
          </h3>
          {showInputs?.input1 ? (
            <input
              ref={inputRef1}
              type='text'
              placeholder='enter your name'
              onKeyDown={(e) => {
                inputHandler(e, 1)
              }}
            />
          ) : null}
        </div>
        <div>
          <h3>
            {showInputs?.input2 ? 'Player 2:' : playerNames?.player2 + '👍'}
          </h3>
          {showInputs?.input2 ? (
            <input
              ref={inputRef2}
              type='text'
              placeholder='enter your name'
              onKeyDown={(e) => {
                inputHandler(e, 2)
              }}
            />
          ) : null}
        </div>
        <div>
          <h3>
            {gridNumber
              ? 'Grid selected : ' + gridNumber + '*' + gridNumber + '✅'
              : 'Select grid size (m*m):'}
          </h3>
          {gridNumber ? null : (
            <input
              ref={inputRef3}
              placeholder='select grid larger than 2x2'
              type='number'
              onKeyDown={(e) => {
                gridInputHandler(e)
              }}
            />
          )}
        </div>
        <button
          disabled={
            playerNames.player1 && playerNames.player2 && gridNumber
              ? false
              : true
          }
          onClick={() => {
            navigate('/game', {
              state: {
                number: gridNumber,
                player1: playerNames?.player1,
                player2: playerNames?.player2,
              },
            })
          }}
          style={{
            margin: '20px 0px',
            width: '170px',
            height: '50px',
            fontSize: '20px',
            color: 'white',
          }}
          className={
            playerNames.player1 && playerNames.player2 && gridNumber
              ? 'not-disabled button'
              : 'disabled button'
          }
        >
          Start Game 🎮
        </button>
      </div>
    </div>
  )
}

export default Home