import React, { useState, useEffect } from "react"
import Cell from "./Cell"

const neighbors = [
  [1, 0],
  [1, 1],
  [1, -1],
  [0, 1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
]

const Board = () => {
  const [grid, setGrid] = useState([])
  const [rows, setRows] = useState(0)
  const [columns, setColumns] = useState(0)
  const [bombs, setBombs] = useState(0)
  const [uncovered, setUncovered] = useState(0)
  useEffect(() => {
    setBoard(10, 10, 5)
  }, [])
  useEffect(() => {
    if (uncovered && uncovered >= rows * columns - bombs) {
      uncoverBoard()
      alert("You Win!")
    }
  }, [uncovered])
  const setBoard = (rows, columns, bombs) => {
    const newGrid = [...grid]
    setRows(rows)
    setColumns(columns)
    setBombs(bombs)
    for (let x = 0; x < rows; x++) {
      newGrid.push([])
      for (let y = 0; y < columns; y++) {
        newGrid[x].push({
          x,
          y,
          isClicked: false,
          isBomb: false,
          isFlagged: false,
          count: 0,
        })
      }
    }
    for (let i = 0; i < bombs; i++) {
      const x = Math.floor(Math.random() * rows)
      const y = Math.floor(Math.random() * columns)
      if (newGrid[x][y].isBomb) {
        i--
      } else {
        newGrid[x][y].isBomb = true
      }
    }
    setGrid(newGrid)
  }
  const checkNeighbors = (x, y) => {
    let count = 0
    const newGrid = [...grid]
    neighbors.forEach(([nX, nY]) => {
      if (x + nX >= 0 && x + nX < rows && y + nY >= 0 && y + nY < columns) {
        if (newGrid[x + nX][y + nY].isBomb) {
          count++
        }
      }
    })
    return count
  }
  const uncoverBoard = () => {
    const newGrid = [...grid]
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        newGrid[x][y].isClicked = true
      }
    }
    setGrid(newGrid)
  }
  const clickCell = (x, y) => {
    const newGrid = [...grid]
    if (newGrid[x][y].isClicked || newGrid[x][y].isFlagged) return
    if (newGrid[x][y].isBomb) {
      uncoverBoard()
      return
    }
    newGrid[x][y].count = checkNeighbors(x, y)
    newGrid[x][y].isClicked = true
    setUncovered((u) => u + 1)
    if (newGrid[x][y].count === 0) {
      neighbors.forEach(([nX, nY]) => {
        if (x + nX >= 0 && x + nX < rows && y + nY >= 0 && y + nY < columns) {
          clickCell(x + nX, y + nY)
        }
      })
    }
  }
  const flagCell = (x, y, e) => {
    e.preventDefault()
    const newGrid = [...grid]
    newGrid[x][y].isFlagged = !newGrid[x][y].isFlagged
    setGrid(newGrid)
  }

  return (
    <div
      style={{
        display: "grid",
        height: `${columns * 10 + columns * 2}`,
        width: `${rows * 10 + rows * 2}`,
        margin: 0,
        padding: 0,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridColumnGap: 0,
        gridRowGap: 0,
      }}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              cell={cell}
              clickCell={clickCell}
              flagCell={flagCell}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
