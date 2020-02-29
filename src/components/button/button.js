import React from "react";
import styles from "./button.module.css";
import cn from "classnames";

const Button = ({ status, endTurn, toBeat, isActive }) => {
  let label = status === "defense" ? "Take" : "End Turn";
  let onClick = isActive ? () => endTurn(status) : () => {};

  if (toBeat === 0) {
    onClick = null;
    label = "Your Turn";
  }

  const stylezz = cn({
    [styles["button"]]: true,
    [styles["button-inactive"]]: toBeat === 0
  });

  return (
    <button className={stylezz} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
