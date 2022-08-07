import React, { useState, useEffect } from "react";
import Board from "../Board";
import styles from "./TicTacToe.module.scss";
import { calculatedWinner } from "../../common/calculatedWinner";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winX, setWinX] = useState(0);
  const [winO, setWinO] = useState(0);
  const [draw, setDraw] = useState(0);
  const winner = calculatedWinner(board);

  const handlerClick = (index) => {
    const copyBoard = [...board];
    //Определить был ли клик по ячейке или игра окончека
    if (winner || copyBoard[index]) {
      return null;
    }
    //Определить чей ход: Х ? О
    copyBoard[index] = isXNext ? "X" : "O";
    //Обновить стэйт
    setBoard(copyBoard);
    setIsXNext(!isXNext);
  };

  const handlerNewGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handlerResetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinX(0);
    setWinO(0);
    setDraw(0);
  };

  useEffect(() => {
    if (winner) {
      if (winner === "X") {
        setWinX((prevState) => prevState + 1);
      } else {
        setWinO((prevState) => prevState + 1);
      }
    }
  }, [winner]);

  useEffect(() => {
    if (!board.includes(null) && !winner) {
      setDraw((prevState) => prevState + 1);
    }
  }, [winner, board]);

  const showMessage = winner
    ? "Победили: " + winner
    : !board.includes(null)
    ? "Ничья"
    : "Сейчас ходит " + (isXNext ? "X" : "O");

  return (
    <section className={styles.game}>
      <h1 className={styles.game_title}>Tic Tac Toe</h1>
      <div className={styles.table_score}>
        <div className={styles.table_score_win}>
          <p className={styles.table_score_win_text}>X</p>
          <span className={styles.table_score_win_num}>{winX}</span>
        </div>
        <div className={styles.table_score_win}>
          <p className={styles.table_score_win_text}>O</p>
          <span className={styles.table_score_win_num}>{winO}</span>
        </div>
        <div className={styles.table_score_win}>
          <p className={styles.table_score_win_text}>Ничья</p>
          <span className={styles.table_score_win_num}>{draw}</span>
        </div>
      </div>
      <Board squares={board} click={handlerClick} />
      <p className={styles.show_message}>{showMessage}</p>
      <button className={styles.btn_new_game} onClick={handlerNewGame}>
        Новая Игра
      </button>
      <button className={styles.btn_reset_score} onClick={handlerResetGame}>
        Cбросить счет
      </button>
    </section>
  );
};

export default TicTacToe;
