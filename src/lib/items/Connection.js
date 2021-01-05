import React from 'react'

function arrow(endPoint){
    const [x, y] = endPoint
    const size = 4
    const top = [x - size, y - size]
    const bottom = [x - size, y + size]
    return `
    ${[x - 2,y]}
    M ${top}
    L ${endPoint}
    ${bottom}`
}

function arc(x,y){
  return `a 5,5 0 0 1 ${x},${y}`
}

function cubic(startPoint,controlPoint,controlPoint2,endPoint){
  return `
  M ${startPoint}
  C ${controlPoint}
  ${controlPoint2}
  ${arrow(endPoint)}
`
}

function rectangular(startPoint,endPoint,width){
  return `
  M ${startPoint}
  l 7, 0
  ${arc(5,5)}
  l 0, 22
  ${arc(-5,5)}
  h ${-(width + 16)}
  ${arc(-5,-5)}
  l 0, -22
  ${arc(5,-5)}
  l 8, 0
  m -4,4
  l 4,-4
  -4,-4
`
}

const Connection = ({startPoint, width, horizontallyAligned, controlPoint, controlPoint2, endPoint, selected, warning, onClick, onMouseOver}) => {
return <path onClick={onClick} onMouseOver={onMouseOver}
    d={ horizontallyAligned && warning
      ? rectangular(startPoint,endPoint,width)
      : cubic(startPoint,controlPoint,controlPoint2,endPoint)
    }
    fill="none"
    stroke={warning ? `#FF534D` : selected ? '#00a0fc' : '#d5dbe6'}
    strokeWidth={2}
/>}


export default Connection
