import React from "react"
import { FaBomb, FaFlag } from "react-icons/fa"

const cellStyle = {
  height: 50,
  width: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const Cell = ({ cell, clickCell, flagCell }) => {
  return (
    <div
      style={{
        ...cellStyle,
        backgroundColor: "black",
        border: "1px solid white",
      }}
      onClick={() => clickCell(cell.x, cell.y)}
      onContextMenu={(e) => flagCell(cell.x, cell.y, e)}
    >
      <div
        style={{
          ...cellStyle,
          backgroundColor: cell.isClicked && !cell.isBomb && "green",
        }}
      >
        <div
          style={{ ...cellStyle, backgroundColor: cell.isFlagged && "blue" }}
        >
          <div
            style={{
              ...cellStyle,

              backgroundColor: cell.isClicked && cell.isBomb && "red",
            }}
          >
            {cell.isClicked && cell.isBomb && <FaBomb size={25} />}
            {cell.isFlagged && <FaFlag size={25} />}
            {cell.isClicked && !cell.isBomb && cell.count}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cell
