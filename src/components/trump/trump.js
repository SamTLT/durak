import React from 'react';
import { connect } from 'react-redux';

import Card from '../card';
import Button from '../button';

import styles from './trump.module.css';
// import * as actions from '../../action';

const Trump = ({ trump, restCards }) => {

    return (
        <div className='trump'>
            <Card card={trump} type="trump" />
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

export default connect(mapStateToPros)(Trump);