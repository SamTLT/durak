import React from 'react';
import { connect } from 'react-redux';

import styles from './enemy-cards.module.css';

import Card from '../card';

const EnemyCards = ({ num, cardSize }) => {

    const setStyle = (index, num, width) => {
        return {
            zIndex: index,
            marginLeft: calcMargin(index, num, width)
        }
    }

    const calcMargin = (index, num, width) => {

        if (index === 0) {
            return `0px`;
        }

        let margin = -20;
        let base = (width / 100) * 450;
        if (num > 6) {
            // margin = Math.floor(((base + Math.round(width / 20 * cards.length)) - cards.length * width) / ((cards.length - 1)));
            // margin = Math.floor((base - cards.length * width) / ((cards.length - 1))) + Math.round(cards.length / 8);
            margin = Math.floor((base - num * width) / ((num - 1)));
        }
        return `${margin}px`;

    }

    const getCards = () => {
        const cardsArr = [];

        for (let i = 0; i < 6; i++) {
            const li = <li key={i}
                className={styles['card']}
                style={setStyle(i, num, cardSize.width)}>
                <Card type={"back"} />
            </li>
            cardsArr.push(li);
        }

        return cardsArr;
    }

    return (
        <ul className={styles['cards']} >
            {getCards()}
        </ul>
    )
}

const mapStateToPros = state => {
    return {
        cardSize: state.cardSize
    }
}

export default connect(mapStateToPros)(EnemyCards);