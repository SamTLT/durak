import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './card.module.css';
import * as actions from '../../action';

const CardToShow = ({ onClick, card }) => {
    return <div className={styles['card']} onClick={() => onClick(card)}>{card.name}</div>
}

const Card = ({ card, putCardOnTable, beatCardOnTable, cardsToUse, status }) => {

    const canIUse = cardsToUse.findIndex(item => item.key === card.key);

    if (canIUse === -1 || status === 'hold') {
        return <div className={styles['card-unavable']} >{card.name}</div>
    }

    let onClick;
    if (status === 'attack') {
        onClick = putCardOnTable;
    }
    if (status === 'defense') {
        onClick = beatCardOnTable;
    }

    return <CardToShow onClick={onClick} card={card} />
}

const mapStateToPros = state => {
    return {
        table: state.table,
        cardsToUse: state.cardsToUse,
        status: state.status
    }
}

const mapDispatchToProps = dispatch => {
    const { putCardOnTable, removeCard, sendCardOnServer, beatCardOnTable } = bindActionCreators(actions, dispatch);

    return {
        putCardOnTable: (card) => {
            putCardOnTable(card);
            removeCard(card);
            sendCardOnServer(card);
        },

        beatCardOnTable: (card) => {
            beatCardOnTable(card);
            removeCard(card);
            sendCardOnServer(card);
        }
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(Card);