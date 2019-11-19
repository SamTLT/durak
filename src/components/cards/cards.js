import React from 'react';

import styles from './cards.module.css';

import Card from '../card';

const Cards = (prop) => {

    const cardsArr = prop.cards.map(card => {
        return <li key={card.key}><Card card={card} /></li>
    })

    return (
        <ul className={styles['cards']}>
            {cardsArr}
        </ul>
    )
}

export default Cards;