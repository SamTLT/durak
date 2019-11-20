import React from 'react';

import styles from './cards.module.css';

import Card from '../card';

const lowToHigh = (a, b) => {
    return a.rank - b.rank;
}

const setStyle = (index, cards) => {

    return {
        zIndex: index,
        marginLeft: calcMargin(cards)
    }
}

const calcMargin = (cards) => {

    const base = 324;
    const cardWidth = 108;
    let margin = -54;
    if (cards.length > 6) {
        margin = -Math.floor(cardWidth - base / cards.length);
    }
    return `${margin}px`;

}

const Cards = (props) => {

    const cardsArr = props.cards.sort(lowToHigh).map((card, i) => {
        return <li key={card.key}
            className={styles['card']}
            style={setStyle(i, props.cards)}>
            <Card card={card} type={props.type} />
        </li>
    })

    return (
        <ul className={styles['cards']}>
            {cardsArr}
        </ul>
    )
}

export default Cards;