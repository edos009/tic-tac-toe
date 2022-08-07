import React from 'react';
import Square from '../Square';
import styles from "./Board.module.scss";

const Board = ({squares, click}) => {
  return (
    <div className={styles.board}>
      {squares.map((square, index) => (
        <Square key={index} value={square} click={() => click(index)} />
      ))}
    </div>
  );
}

export default Board;
