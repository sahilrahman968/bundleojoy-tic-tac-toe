import React from 'react'
import "./Square.css"
function Square({ i, j, value }) {
  return (
    <div className='square' id={`${i}${j}`}>
      {value}
    </div>
  )
}

export default React.memo(Square)