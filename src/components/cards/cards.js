import React from 'react';

import styles from './cards.module.css';

import Card from '../card';

const Cards = (props) => {

    const cardsArr = props.cards.map(card => {
        return <li key={card.key}><Card card={card} type={props.type} /></li>
    })

    return (
        <ul className={styles['cards']}>
            {cardsArr}
        </ul>
    )
}

export default Cards;