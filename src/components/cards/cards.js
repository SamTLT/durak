import React from "react";
import styles from "./cards.module.css";

import Card from "../card";

const Cards = ({ cards, cardSize, type }) => {
  const lowToHigh = (a, b) => {
    return a.rank - b.rank;
  };

  const setStyle = (index, cards, width) => {
    return {
      zIndex: index,
      marginLeft: calcMargin(index, cards, width)
    };
  };

  const calcMargin = (index, cards, width) => {
    if (index === 0) {
      return `0px`;
    }

    let margin = -20;
    let base = (width / 100) * 450;
    if (cards.length > 6) {
      // margin = Math.floor(((base + Math.round(width / 20 * cards.length)) - cards.length * width) / ((cards.length - 1)));
      // margin = Math.floor((base - cards.length * width) / ((cards.length - 1))) + Math.round(cards.length / 8);
      margin = Math.floor((base - cards.length * width) / (cards.length - 1));
    }
    return `${margin}px`;
  };

  const cardsArr = cards.sort(lowToHigh).map((card, i) => {
    return (
      <li
        key={card.key}
        className={styles["card"]}
        style={setStyle(i, cards, cardSize.width)}
      >
        <Card card={card} type={type} />
      </li>
    );
  });

  return <ul className={styles["cards"]}>{cardsArr}</ul>;
};

export default Cards;
