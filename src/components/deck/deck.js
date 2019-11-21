import React from 'react';
import { connect } from 'react-redux';

import Card from '../card';
import Button from '../button';

import styles from './deck.module.css';
// import * as actions from '../../action';

const Deck = ({ trump, cardsLeft }) => {

    const cardsLeftToShow = (cardsLeft) => {
        return (
            <div className={styles['cards-left']}>
                {cardsLeft}
            </div>
        )
    }

    return (
        <div className='deck'>
            <div className={styles['deck-full']}>
                <div className={`${styles['deck-closed']}`}>
                    {cardsLeft > 1 ? <Card card={trump} type="back" /> : null}
                </div>
                <div className={styles['trump']}>
                    {cardsLeft > 0 ? <Card card={trump} type="trump" /> : null}
                    {cardsLeft === 0 ? <Card card={trump} type={trump.type} /> : null}
                </div>
                {cardsLeft > 1 ? cardsLeftToShow(cardsLeft) : null}

            </div>
        </div>
    )
}

const mapStateToPros = state => {
    return {
        trump: state.trump,
        cardsLeft: state.deck.length
    }
}

export default connect(mapStateToPros)(Deck);