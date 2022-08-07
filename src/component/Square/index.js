import React from "react";
import styles from "./Square.module.scss";

const Square = (props) => {
  return <button className={styles.square} onClick={props.click}>{props.value}</button>;
};

export default Square;
