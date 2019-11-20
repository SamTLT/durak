import React from 'react';

import styles from './cards.module.css';

import Card from '../card';

const lowToHigh = (a, b) => {
    return a.rank - b.rank;
}

const zIndex = (index) => {
    return {
        zIndex: index
    }
}

const Cards = (props) => {

    const cardsArr = props.cards.sort(lowToHigh).map((card, i) => {
        return <li key={card.key}
            className={styles['card']}
            style={zIndex(i)}>
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