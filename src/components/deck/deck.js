import React from 'react';
import { connect } from 'react-redux';

import Card from '../card';
import Button from '../button';

import styles from './deck.module.css';
// import * as actions from '../../action';

const Deck = ({ trump, restCards }) => {

    return (
        <div className='deck'>
            <div className={styles['deck-full']}>
                <div className={`${styles['deck-closed']}`}>
                    {restCards > 1 ? <Card card={trump} type="back" /> : null}
                </div>
                <div className={styles['trump']}>
                    {restCards > 0 ? <Card card={trump} type="trump" /> : null}
                    {restCards === 0 ? <Card card={trump} type={trump.type} /> : null}

                </div>
            </div>
            <div className='rest-cards'>
                {restCards} cards left
            </div>
            <Button title="Конец хода" />
        </div>
    )
}

const mapStateToPros = state => {
    return {
        trump: state.trump,
        restCards: state.deck.length
    }
}

export default connect(mapStateToPros)(Deck);